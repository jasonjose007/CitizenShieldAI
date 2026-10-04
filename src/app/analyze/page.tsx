"use client";

import { useState } from "react";
import {
  Shield,
  ArrowLeft,
  Send,
  Loader2,
  FileText,
  Clipboard,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CrisisAlert from "@/components/CrisisAlert";
import CitationBadge from "@/components/CitationBadge";
import { getStateNames } from "@/lib/jurisdiction";
import type { CrisisAlertInfo, CitationInfo } from "@/types";
import { API_BASE } from "@/lib/utils";
import Link from "next/link";

interface AnalysisResult {
  analysis: string;
  legalIssues: string[];
  suggestedActions: string[];
  citations: CitationInfo[];
  crisisAlert: CrisisAlertInfo | null;
  confidence: "high" | "medium" | "low";
  verificationSummary: string;
}

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [context, setContext] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [language, setLanguage] = useState<"en" | "ta" | "hi">("en");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      setText(clipText);
    } catch {
      setError("Could not read clipboard. Please paste manually.");
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, context: context || undefined, jurisdiction: jurisdiction || undefined, language }),
      });

      if (!response.ok) throw new Error("Failed to analyze");

      const data = await response.json();
      setResult({
        analysis: data.analysis,
        legalIssues: data.legalIssues || [],
        suggestedActions: data.suggestedActions || [],
        citations: data.citations || [],
        crisisAlert: data.crisis_alert || null,
        confidence: data.confidence || "medium",
        verificationSummary: data.verification_summary || "",
      });
    } catch {
      setError("Failed to analyze. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center gap-4">
        <Link href="/" className="p-1.5 rounded-md hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-sm tracking-tight">Analyze Conversation</h1>
            <p className="text-[10px] text-muted-foreground">Paste any text for legal analysis</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="bg-card border border-border rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
            <ShieldCheck className="w-4 h-4" />
            Personal information is automatically removed before AI processing
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Text to Analyze</label>
              <Button variant="outline" size="sm" onClick={handlePaste} className="text-xs h-7">
                <Clipboard className="w-3 h-3 mr-1" />
                Paste
              </Button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your WhatsApp chat, email, message, or any text here..."
              rows={8}
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Additional Context <span className="text-muted-foreground font-normal">(optional)</span></label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., 'This is my landlord messaging me about returning my deposit'"
              rows={2}
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Jurisdiction</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All India</option>
                {getStateNames().map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Language</label>
              <div className="flex items-center bg-muted rounded-md p-0.5">
                {([["en", "English"], ["ta", "தமிழ்"], ["hi", "हिंदी"]] as const).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`px-3 py-1.5 text-sm rounded transition-all ${language === code ? "bg-background shadow-sm text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleAnalyze} disabled={!text.trim() || isLoading} className="w-full h-11">
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Analyzing...</>
            ) : (
              <><Send className="w-4 h-4 mr-2" /> Analyze for Legal Issues</>
            )}
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-2 text-destructive text-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {result.crisisAlert && <CrisisAlert alert={result.crisisAlert} />}

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Legal Analysis
                </h2>
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                  result.confidence === "high" ? "bg-emerald-100 text-emerald-700"
                    : result.confidence === "medium" ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {result.confidence.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{result.analysis}</p>

              {result.citations.length > 0 && result.verificationSummary && (
                <CitationBadge citations={result.citations} verificationSummary={result.verificationSummary} />
              )}
            </div>

            {result.suggestedActions.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Suggested Actions</h3>
                <div className="flex flex-wrap gap-2">
                  {result.suggestedActions.map((action) => (
                    <Link key={action} href="/" className="text-sm px-3 py-1.5 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors font-medium">
                      {action}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-muted rounded-lg p-4">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                This analysis provides general legal information based on Indian law. It does not constitute legal advice. Free legal aid: NALSA (15100).
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
