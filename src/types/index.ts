export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  suggested_actions?: string[];
  citations?: CitationInfo[];
  crisisAlert?: CrisisAlertInfo | null;
  confidence?: "high" | "medium" | "low";
  verificationSummary?: string;
}

export interface CitationInfo {
  sectionId: string;
  verified: boolean;
  actualText: string | null;
  law: string;
}

export interface CrisisAlertInfo {
  type: string;
  helplines: { name: string; number: string; description: string; available: string }[];
  safetyWarning: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  required_fields: string[];
}

export interface SchemeResult {
  name: string;
  description: string;
  eligibility: string;
  how_to_apply: string;
  relevance_score: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface AnalyzeRequest {
  text: string;
  context?: string;
  jurisdiction?: string;
  language?: "en" | "ta" | "hi";
}

export interface AnalyzeResponse {
  analysis: string;
  legalIssues: string[];
  suggestedActions: string[];
  citations: CitationInfo[];
  crisisAlert: CrisisAlertInfo | null;
  confidence: "high" | "medium" | "low";
  verificationSummary: string;
}
