import { LEGAL_SECTIONS } from "./legal-sections";

export interface VerifiedCitation {
  original: string;
  sectionId: string;
  verified: boolean;
  actualText: string | null;
  law: string;
}

export function verifyCitations(aiResponse: string): {
  text: string;
  citations: VerifiedCitation[];
} {
  const citations: VerifiedCitation[] = [];
  const sectionPattern =
    /(?:Section|Sec\.?|S\.?)\s+(\d+[A-Z]?(?:\(\d+\))?)\s+(?:of\s+(?:the\s+)?)?(?:BNS|BNSS|BSA|IPC|CrPC|Indian Penal Code|Consumer Protection Act|Right to Information Act|RTI Act|Model Tenancy Act|IT Act|Information Technology Act|Payment of Wages Act|Industrial Disputes Act|POSH Act|Advocates Act|NI Act|Negotiable Instruments Act)/gi;

  let match;
  while ((match = sectionPattern.exec(aiResponse)) !== null) {
    const fullMatch = match[0];
    const sectionNum = match[1];

    const lawName = extractLawName(fullMatch);
    const key = normalizeSectionKey(lawName, sectionNum);
    const knownSection = LEGAL_SECTIONS[key];

    citations.push({
      original: fullMatch,
      sectionId: `${lawName} S.${sectionNum}`,
      verified: !!knownSection,
      actualText: knownSection?.summary ?? null,
      law: lawName,
    });
  }

  return { text: aiResponse, citations };
}

function extractLawName(match: string): string {
  const lower = match.toLowerCase();
  if (lower.includes("bns")) return "BNS";
  if (lower.includes("bnss")) return "BNSS";
  if (lower.includes("bsa")) return "BSA";
  if (lower.includes("ipc") || lower.includes("indian penal code"))
    return "IPC";
  if (lower.includes("crpc")) return "CrPC";
  if (lower.includes("consumer protection")) return "CPA";
  if (lower.includes("right to information") || lower.includes("rti"))
    return "RTI";
  if (lower.includes("model tenancy")) return "MTA";
  if (lower.includes("information technology") || lower.includes("it act"))
    return "ITA";
  if (lower.includes("payment of wages")) return "PWA";
  if (lower.includes("industrial disputes")) return "IDA";
  if (lower.includes("posh")) return "POSH";
  if (lower.includes("advocates")) return "AA";
  if (lower.includes("negotiable") || lower.includes("ni act")) return "NIA";
  return "UNKNOWN";
}

function normalizeSectionKey(law: string, section: string): string {
  return `${law}:${section}`.toUpperCase();
}

export function stripUnverifiedCitations(
  text: string,
  citations: VerifiedCitation[]
): string {
  let result = text;
  for (const c of citations) {
    if (!c.verified) {
      result = result.replace(
        c.original,
        `${c.original} [⚠ unverified reference]`
      );
    }
  }
  return result;
}

export function getVerificationSummary(citations: VerifiedCitation[]): string {
  if (citations.length === 0) return "";
  const verified = citations.filter((c) => c.verified).length;
  const total = citations.length;
  if (verified === total) return `✓ All ${total} legal citations verified`;
  return `⚠ ${verified}/${total} citations verified — unverified references marked`;
}
