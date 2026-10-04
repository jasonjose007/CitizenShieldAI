"use client";

import {
  Shield,
  ArrowRight,
  ShieldCheck,
  FileText,
  Search,
  BookOpen,
  ScanText,
  Globe,
  Fingerprint,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LandingHeroProps {
  onGetStarted: () => void;
}

export default function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground text-lg tracking-tight">CitizenShield AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/playbooks" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Playbooks
          </Link>
          <Button size="sm" onClick={onGetStarted}>
            Launch App
          </Button>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            Updated with BNS, BNSS & BSA — India&apos;s new criminal codes
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
            Know your rights.
            <br />
            <span className="text-primary">Act on them.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            CitizenShield AI is your legal intelligence layer — paste any conversation for instant legal analysis, get step-by-step playbooks for emergencies, and generate documents ready to file.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-16">
            <Button size="lg" onClick={onGetStarted} className="text-base px-8 h-12">
              Start Legal Chat
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Link href="/analyze">
              <Button size="lg" variant="outline" className="text-base px-8 h-12 w-full">
                <ScanText className="w-4 h-4 mr-2" />
                Analyze a Conversation
              </Button>
            </Link>
            <Link href="/playbooks">
              <Button size="lg" variant="outline" className="text-base px-8 h-12 w-full">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Playbooks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">What you can do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ScanText, title: "Analyze Conversations", desc: "Paste any WhatsApp chat, email, or message. Get instant legal analysis with cited law sections.", accent: "bg-blue-500" },
              { icon: BookOpen, title: "Legal Playbooks", desc: "10 step-by-step guides for common situations — police stops, tenant disputes, cyber fraud. Work offline.", accent: "bg-emerald-500" },
              { icon: FileText, title: "Generate Documents", desc: "Auto-draft RTI applications, consumer complaints, legal notices, and labour complaints.", accent: "bg-violet-500" },
              { icon: Search, title: "Find Government Schemes", desc: "Discover which of India's welfare schemes you're eligible for. Get application steps.", accent: "bg-amber-500" },
              { icon: Globe, title: "Trilingual Support", desc: "Full support in English, Tamil, and Hindi. Legal terms explained in your language.", accent: "bg-rose-500" },
              { icon: Shield, title: "AI Legal Chat", desc: "Ask any legal question. Get clear, cited answers with jurisdiction-specific guidance.", accent: "bg-cyan-500" },
            ].map((f) => (
              <div key={f.title} className="group relative bg-background border border-border rounded-lg p-6 hover:border-primary/40 transition-all">
                <div className={`w-10 h-10 ${f.accent} rounded-lg flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Built-in safety</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Citation Verified</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Every law section the AI cites is verified against a database of 80+ provisions. Unverified references are flagged.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-lg">
              <Fingerprint className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">PII Stripped</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Phone numbers, Aadhaar, PAN, emails, and bank details are automatically removed before AI processing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-lg">
              <ShieldCheck className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Crisis Detection</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Detects domestic violence, self-harm, and emergencies. Shows helpline numbers instantly — even if the AI is down.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-xs text-muted-foreground">
            CitizenShield AI provides legal information, not legal advice. Updated with India&apos;s new criminal law codes (BNS, BNSS, BSA). For complex matters, consult a qualified lawyer. Free legal aid: NALSA 15100.
          </p>
        </div>
      </footer>
    </div>
  );
}
