"use client";

import { use } from "react";
import { Shield, ArrowLeft, Phone, AlertTriangle, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getPlaybookById } from "@/lib/playbooks";
import Link from "next/link";
import { notFound } from "next/navigation";

const URGENCY_STYLES: Record<string, string> = {
  emergency: "bg-red-100 text-red-700",
  high: "bg-amber-100 text-amber-700",
  medium: "bg-blue-100 text-blue-700",
  low: "bg-emerald-100 text-emerald-700",
};

export default function PlaybookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const playbook = getPlaybookById(id);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  if (!playbook) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/playbooks" className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-sm tracking-tight">{playbook.icon} {playbook.title}</h1>
              <p className="text-[10px] text-muted-foreground">{playbook.steps.length} steps</p>
            </div>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${URGENCY_STYLES[playbook.urgency]}`}>
          {playbook.urgency.toUpperCase()}
        </span>
      </header>

      <main className="max-w-3xl mx-auto p-6 space-y-4">
        {playbook.urgency === "emergency" && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-2">Emergency Situation</p>
              <p className="text-sm text-red-700 mb-3">If you are in immediate danger, call emergency services first.</p>
              <div className="flex flex-wrap gap-2">
                {playbook.importantNumbers.map((num) => (
                  <a key={num.number} href={num.number.match(/^[0-9-]+$/) ? `tel:${num.number.replace(/-/g, "")}` : `https://${num.number}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-md text-sm font-medium text-red-800 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    {num.name}: {num.number}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-lg p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{playbook.description}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-1 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            Step-by-Step Guide
          </h2>
          {playbook.steps.map((step, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              <button onClick={() => setExpandedStep(expandedStep === index ? null : index)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">{index + 1}</div>
                <span className="text-sm font-medium text-foreground flex-1">{step.title}</span>
                {expandedStep === index ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {expandedStep === index && (
                <div className="px-4 pb-4 pl-14 space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  {step.warning && (
                    <div className="flex items-start gap-2 bg-amber-50 rounded-md p-2.5 border border-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">{step.warning}</p>
                    </div>
                  )}
                  {step.contact && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">{step.contact}</span>
                    </div>
                  )}
                  {step.action && (
                    <Link href="/" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors font-medium">{step.action}</Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Legal Basis</h3>
          <ul className="space-y-1.5">
            {playbook.legalBasis.map((law, i) => (
              <li key={i} className="text-xs text-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">&#8226;</span>{law}
              </li>
            ))}
          </ul>
        </div>

        {playbook.urgency !== "emergency" && (
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Important Numbers</h3>
            <div className="flex flex-wrap gap-2">
              {playbook.importantNumbers.map((num) => (
                <a key={num.number} href={num.number.match(/^[0-9-]+$/) ? `tel:${num.number.replace(/-/g, "")}` : `https://${num.number}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-accent rounded-md text-sm font-medium text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5" />{num.name}: {num.number}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="bg-muted rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            This playbook provides general legal information. Laws vary by state. For complex matters, consult a qualified lawyer. Free legal aid: NALSA 15100.
          </p>
        </div>
      </main>
    </div>
  );
}
