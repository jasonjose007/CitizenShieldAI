import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/knowledge";
import { stripPii, restorePii } from "@/lib/pii-stripper";
import { detectCrisis, type CrisisResult } from "@/lib/crisis-detector";
import { verifyCitations, getVerificationSummary } from "@/lib/citation-verifier";

const SYSTEM_PROMPT = `You are CitizenShield AI, an AI-powered legal information assistant for Indian citizens.

CRITICAL RULES:
1. You provide LEGAL INFORMATION, never legal advice. Frame responses as "people in similar situations typically..." or "the law provides for..." — never "you should sue" or "you will win".
2. ALWAYS cite specific law sections when relevant. Use the NEW laws: BNS (not IPC), BNSS (not CrPC), BSA (not Evidence Act) — these replaced the old codes on 1 July 2024.
3. If you are not confident about a specific section number, say "the relevant provision of [Act Name]" instead of guessing a section number. NEVER fabricate section numbers.
4. For complex matters involving multiple jurisdictions, property disputes, family law, or criminal defence, strongly recommend consulting a qualified lawyer.
5. Always mention relevant helpline numbers and online portals.
6. If asked in Hindi, respond in Hindi. If asked in Tamil, respond in Tamil. If in English, respond in English. Always keep legal section numbers and act names in English regardless of language.
7. Be empathetic — acknowledge the person's situation before diving into legal details.
8. When suggesting actions, provide concrete steps with timelines.
9. If the user mentions a state, reference that state's specific laws where applicable.

BLOCKED TOPICS — Do NOT help with:
- Planning illegal activities or finding legal loopholes to harm others
- Evading court orders or law enforcement
- Hiding assets in divorce/legal proceedings
- Drafting threats or harassment

CONFIDENCE SCORING:
- HIGH: Question is about well-established rights with clear legal provisions (RTI, consumer complaints, basic tenant rights)
- MEDIUM: Question involves state-specific law variations, recent amendments, or multiple applicable laws
- LOW: Question involves complex litigation strategy, conflicting laws, or fact-dependent outcomes

End every response with your confidence level in brackets: [Confidence: HIGH/MEDIUM/LOW]`;

function buildCrisisPayload(crisisResult: CrisisResult) {
  if (!crisisResult.isCrisis) return null;
  return {
    type: crisisResult.type,
    helplines: crisisResult.helplines,
    safetyWarning: crisisResult.safetyWarning,
  };
}

export async function POST(request: NextRequest) {
  let message = "";
  let conversationHistory: { role: string; content: string }[] = [];
  let language = "en";
  let jurisdiction = "";
  let crisisResult: CrisisResult = { isCrisis: false, type: null, helplines: [], safetyWarning: null };

  try {
    const body = await request.json();
    message = body.message || "";
    conversationHistory = body.conversation_history || [];
    language = body.language || "en";
    jurisdiction = body.jurisdiction || "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  crisisResult = detectCrisis(message);
  const crisisPayload = buildCrisisPayload(crisisResult);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "API key not configured",
        response: "The service is temporarily unavailable. Please try again later.",
        crisis_alert: crisisPayload,
        citations: [],
        confidence: null,
        verification_summary: "",
        sources: [],
        suggested_actions: [],
      },
      { status: 500 }
    );
  }

  try {
    const piiResult = stripPii(message);
    const cleanMessage = piiResult.cleaned;

    const genai = new GoogleGenerativeAI(apiKey);
    const model = genai.getGenerativeModel({
      model: "gemini-3.8-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const contextDocs = searchKnowledge(cleanMessage);
    const contextText = contextDocs.join("\n\n---\n\n");

    const jurisdictionNote = jurisdiction
      ? `\n\nThe user is located in ${jurisdiction}. Reference state-specific laws for ${jurisdiction} where applicable.`
      : "";

    const augmentedPrompt = `Based on the following legal knowledge base, answer the user's question.
If the context doesn't contain relevant information, use your general knowledge about Indian law but clearly state that and recommend verification.
IMPORTANT: Only cite section numbers you are certain about. If unsure, describe the provision without a specific number.

CONTEXT FROM KNOWLEDGE BASE:
${contextText}
${jurisdictionNote}

USER'S QUESTION: ${cleanMessage}

Provide a helpful, empathetic response with specific actionable guidance.${language === "ta" ? " Respond in Tamil (தமிழ் script). Keep legal section numbers and act names in English." : language === "hi" ? " Respond in Hindi (Devanagari script). Keep legal section references in English." : ""}`;

    const cleanHistory = conversationHistory.map(
      (msg) => {
        const { cleaned } = stripPii(msg.content);
        return {
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: cleaned }],
        };
      }
    );

    const chat = model.startChat({ history: cleanHistory });
    const result = await chat.sendMessage(augmentedPrompt);
    let responseText =
      result.response.text() ||
      "I apologize, I could not generate a response. Please try again.";

    responseText = restorePii(responseText, piiResult.replacements);

    const { citations } = verifyCitations(responseText);
    const verificationSummary = getVerificationSummary(citations);

    let confidence: "high" | "medium" | "low" = "medium";
    const confidenceMatch = responseText.match(
      /\[Confidence:\s*(HIGH|MEDIUM|LOW)\]/i
    );
    if (confidenceMatch) {
      confidence = confidenceMatch[1].toLowerCase() as "high" | "medium" | "low";
      responseText = responseText
        .replace(/\[Confidence:\s*(HIGH|MEDIUM|LOW)\]/i, "")
        .trim();
    }

    const suggestedActions: string[] = [];
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.match(/rti|information|government data|public authority/))
      suggestedActions.push("Generate RTI Application");
    if (lowerMessage.match(/consumer|product|defective|refund|seller|shop/))
      suggestedActions.push("Draft Consumer Complaint");
    if (lowerMessage.match(/landlord|tenant|rent|deposit|eviction/))
      suggestedActions.push("Generate Legal Notice");
    if (lowerMessage.match(/scheme|yojana|benefit|subsidy|eligible/))
      suggestedActions.push("Check Scheme Eligibility");
    if (lowerMessage.match(/salary|employer|fired|terminated|wages|pf/))
      suggestedActions.push("Draft Labour Complaint");
    if (lowerMessage.match(/cyber|online fraud|hacking|upi|phishing/))
      suggestedActions.push("Report Cyber Crime");

    return NextResponse.json({
      response: responseText,
      sources: contextDocs.length > 0 ? ["Legal Knowledge Base"] : [],
      suggested_actions: suggestedActions,
      citations: citations.map((c) => ({
        sectionId: c.sectionId,
        verified: c.verified,
        actualText: c.actualText,
        law: c.law,
      })),
      crisis_alert: crisisPayload,
      confidence,
      verification_summary: verificationSummary,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request. Please try again.",
        response:
          "I'm sorry, I encountered a technical issue. Please try again in a moment.",
        crisis_alert: crisisPayload,
        citations: [],
        confidence: null,
        verification_summary: "",
        sources: [],
        suggested_actions: [],
      },
      { status: 500 }
    );
  }
}
