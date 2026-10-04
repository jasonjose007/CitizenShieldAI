import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/knowledge";
import { stripPii, restorePii } from "@/lib/pii-stripper";
import { detectCrisis } from "@/lib/crisis-detector";
import { verifyCitations, getVerificationSummary } from "@/lib/citation-verifier";

const ANALYZE_PROMPT = `You are CitizenShield AI, an AI legal information assistant for Indian citizens.

The user has shared a conversation or text that may have legal implications. Your job is to:

1. ANALYZE the conversation for any legal issues, rights violations, or situations where the user needs to know their rights
2. IDENTIFY specific legal provisions (using BNS/BNSS/BSA — the new codes, NOT IPC/CrPC) that apply
3. FLAG any concerning language — threats, harassment, illegal demands, coercion, or manipulation
4. SUGGEST concrete next steps the user can take
5. WARN about anything the user said that could hurt their legal position

Format your response as:
**Legal Issues Identified:**
(bulleted list)

**Your Rights in This Situation:**
(specific rights with law citations)

**Recommended Next Steps:**
(numbered, actionable steps)

**Things to Be Careful About:**
(warnings about what NOT to do or say)

RULES:
- Only cite section numbers you are 100% certain about
- Frame as information, not advice
- Be empathetic but direct
- Mention relevant helplines
- End with [Confidence: HIGH/MEDIUM/LOW]`;

export async function POST(request: NextRequest) {
  try {
    const { text, context, jurisdiction, language } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "No text provided for analysis" },
        { status: 400 }
      );
    }

    const crisisResult = detectCrisis(text);

    const piiResult = stripPii(text);
    const cleanText = piiResult.cleaned;

    const genai = new GoogleGenerativeAI(apiKey);
    const model = genai.getGenerativeModel({
      model: "gemini-3.8-flash",
      systemInstruction: ANALYZE_PROMPT,
    });

    const contextDocs = searchKnowledge(cleanText);
    const contextKnowledge = contextDocs.join("\n\n---\n\n");

    const jurisdictionNote = jurisdiction
      ? `The user is in ${jurisdiction}. Reference state-specific laws where applicable.`
      : "";

    const userContext = context
      ? `\nAdditional context from the user: ${stripPii(context).cleaned}`
      : "";

    const prompt = `Analyze the following conversation/text for legal implications.

LEGAL KNOWLEDGE BASE:
${contextKnowledge}

${jurisdictionNote}
${userContext}

TEXT TO ANALYZE:
---
${cleanText}
---

Provide a thorough legal analysis.${language === "ta" ? " Respond in Tamil (தமிழ் script). Keep legal references and act names in English." : language === "hi" ? " Respond in Hindi (Devanagari script). Keep legal references in English." : ""}`;

    const result = await model.generateContent(prompt);
    let responseText =
      result.response.text() ||
      "Unable to analyze the provided text. Please try again.";

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

    const legalIssues: string[] = [];
    const issuesMatch = responseText.match(
      /\*\*Legal Issues Identified:\*\*([\s\S]*?)(?=\*\*|$)/
    );
    if (issuesMatch) {
      const bullets = issuesMatch[1].match(/[-•]\s*(.+)/g);
      if (bullets) {
        legalIssues.push(...bullets.map((b) => b.replace(/^[-•]\s*/, "").trim()));
      }
    }

    const suggestedActions: string[] = [];
    const lower = text.toLowerCase();
    if (lower.match(/landlord|tenant|rent|deposit/))
      suggestedActions.push("Generate Legal Notice");
    if (lower.match(/consumer|product|refund|defective/))
      suggestedActions.push("Draft Consumer Complaint");
    if (lower.match(/employer|salary|fired|terminated/))
      suggestedActions.push("Draft Labour Complaint");
    if (lower.match(/threat|harass|stalk|abuse/))
      suggestedActions.push("File FIR");

    return NextResponse.json({
      analysis: responseText,
      legalIssues,
      suggestedActions,
      citations: citations.map((c) => ({
        sectionId: c.sectionId,
        verified: c.verified,
        actualText: c.actualText,
        law: c.law,
      })),
      crisis_alert: crisisResult.isCrisis
        ? {
            type: crisisResult.type,
            helplines: crisisResult.helplines,
            safetyWarning: crisisResult.safetyWarning,
          }
        : null,
      confidence,
      verification_summary: verificationSummary,
    });
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze text. Please try again." },
      { status: 500 }
    );
  }
}
