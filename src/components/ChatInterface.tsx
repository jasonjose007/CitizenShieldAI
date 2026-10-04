"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileText, Shield, User, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CrisisAlert from "@/components/CrisisAlert";
import CitationBadge from "@/components/CitationBadge";
import type { ChatMessage, CrisisAlertInfo, CitationInfo } from "@/types";
import { API_BASE } from "@/lib/utils";
import { getStateNames } from "@/lib/jurisdiction";

interface ChatInterfaceProps {
  onActionSuggested?: (action: string) => void;
}

export default function ChatInterface({ onActionSuggested }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta" | "hi">("en");
  const [jurisdiction, setJurisdiction] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversation_history: messages.map((m) => ({ role: m.role, content: m.content })),
          language,
          jurisdiction: jurisdiction || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
        sources: data.sources,
        suggested_actions: data.suggested_actions,
        citations: data.citations,
        crisisAlert: data.crisis_alert,
        confidence: data.confidence,
        verificationSummary: data.verification_summary,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please check your connection and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    { text: "My landlord won't return my security deposit", tag: "Tenant" },
    { text: "I want to file an RTI about road construction funds", tag: "RTI" },
    { text: "Defective product, shop refusing refund", tag: "Consumer" },
    { text: "Someone hacked my UPI — what do I do?", tag: "Cyber" },
    { text: "My employer fired me without notice", tag: "Labour" },
    { text: "Am I eligible for PM-KISAN scheme?", tag: "Schemes" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-foreground">Legal Chat</h2>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            PII Protected
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All India</option>
            {getStateNames().map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <div className="flex items-center bg-muted rounded-md p-0.5">
            {([["en", "EN"], ["ta", "TA"], ["hi", "HI"]] as const).map(([code, label]) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-2.5 py-1 text-xs rounded transition-all ${language === code ? "bg-background shadow-sm text-foreground font-medium" : "text-muted-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {language === "ta" ? "எந்த சட்டப் பிரச்சனையில் உதவ வேண்டும்?" : language === "hi" ? "मैं किस कानूनी मुद्दे में मदद कर सकता हूं?" : "What legal issue can I help with?"}
            </h3>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              {language === "ta"
                ? "உங்கள் நிலையை எளிய வார்த்தைகளில் விவரிக்கவும். உங்கள் உரிமைகளை அடையாளம் கண்டு அடுத்த நடவடிக்கைகளை பரிந்துரைப்பேன்."
                : language === "hi"
                ? "अपनी स्थिति सरल शब्दों में बताएं। मैं आपके अधिकारों की पहचान करूंगा और अगले कदम सुझाऊंगा।"
                : "Describe your situation in plain words. I'll identify your rights and suggest next steps."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
              {quickPrompts.map((p) => (
                <button
                  key={p.text}
                  onClick={() => setInput(p.text)}
                  className="text-left text-sm p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-foreground group"
                >
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{p.tag}</span>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors mt-0.5">{p.text}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index}>
            {message.role === "assistant" && message.crisisAlert && (
              <CrisisAlert alert={message.crisisAlert} />
            )}
            <div className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div className={`max-w-[75%] ${message.role === "user"
                ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5"
                : "bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3"
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>

                {message.confidence && (
                  <div className="mt-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      message.confidence === "high" ? "bg-emerald-100 text-emerald-700"
                        : message.confidence === "medium" ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {message.confidence.toUpperCase()} confidence
                    </span>
                  </div>
                )}

                {message.citations && message.citations.length > 0 && message.verificationSummary && (
                  <CitationBadge citations={message.citations} verificationSummary={message.verificationSummary} />
                )}

                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {message.sources.map((s) => s.replace(".txt", "").replace(/_/g, " ")).join(", ")}
                    </p>
                  </div>
                )}

                {message.suggested_actions && message.suggested_actions.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/50 flex flex-wrap gap-1">
                    {message.suggested_actions.map((action) => (
                      <button key={action} onClick={() => onActionSuggested?.(action)} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded font-medium hover:bg-primary/20 transition-colors">
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                <span className="text-xs text-muted-foreground">Analyzing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4">
        <p className="text-[10px] text-muted-foreground mb-2 text-center">
          CitizenShield AI provides legal information, not legal advice.
        </p>
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === "ta" ? "உங்கள் சட்டப் பிரச்சனையை விவரிக்கவும்..." : language === "hi" ? "अपना कानूनी मुद्दा बताएं..." : "Describe your legal issue..."}
            rows={1}
            className="flex-1 resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            style={{ minHeight: "42px", maxHeight: "120px" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "42px";
              target.style.height = target.scrollHeight + "px";
            }}
          />
          <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="icon" className="rounded-lg h-[42px] w-[42px]">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
