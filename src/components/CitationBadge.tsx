"use client";

import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import type { CitationInfo } from "@/types";

interface CitationBadgeProps {
  citations: CitationInfo[];
  verificationSummary: string;
}

export default function CitationBadge({
  citations,
  verificationSummary,
}: CitationBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  if (citations.length === 0) return null;

  const allVerified = citations.every((c) => c.verified);
  const someUnverified = citations.some((c) => !c.verified);

  return (
    <div className="mt-2 pt-2 border-t border-gray-200/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md transition-colors ${
          allVerified
            ? "text-green-700 bg-green-50 hover:bg-green-100"
            : someUnverified
            ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
            : "text-blue-700 bg-blue-50 hover:bg-blue-100"
        }`}
      >
        {allVerified ? (
          <CheckCircle className="w-3.5 h-3.5" />
        ) : someUnverified ? (
          <AlertCircle className="w-3.5 h-3.5" />
        ) : (
          <Info className="w-3.5 h-3.5" />
        )}
        {verificationSummary}
      </button>

      {expanded && (
        <div className="mt-2 space-y-1.5">
          {citations.map((citation, idx) => (
            <div
              key={idx}
              className={`text-xs px-2.5 py-1.5 rounded-md ${
                citation.verified
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {citation.verified ? (
                  <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-amber-600 flex-shrink-0" />
                )}
                <span className="font-medium">{citation.sectionId}</span>
                {!citation.verified && (
                  <span className="text-amber-600 ml-1">— could not verify</span>
                )}
              </div>
              {citation.verified && citation.actualText && (
                <p className="mt-1 text-green-700 pl-4.5 leading-relaxed">
                  {citation.actualText}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
