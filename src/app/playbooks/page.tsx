"use client";

import { Shield, ArrowLeft, Search, WifiOff } from "lucide-react";
import { useState } from "react";
import { PLAYBOOKS } from "@/lib/playbooks";
import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  criminal: "Criminal Law",
  tenant: "Tenant Rights",
  workplace: "Workplace",
  consumer: "Consumer",
  financial: "Financial",
  cyber: "Cyber Crime",
  civic: "Civic Rights",
  emergency: "Emergency",
};

const URGENCY_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  emergency: { bg: "bg-red-50 border-red-200", text: "text-red-700", dot: "bg-red-500" },
  high: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
  medium: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700", dot: "bg-blue-500" },
  low: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
};

export default function PlaybooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(PLAYBOOKS.map((p) => p.category))];

  const filtered = PLAYBOOKS.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-sm tracking-tight">Legal Playbooks</h1>
              <p className="text-[10px] text-muted-foreground">Step-by-step guides for common situations</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-700 text-[10px] font-medium">
          <WifiOff className="w-3 h-3" />
          Works Offline
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search playbooks..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All" : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((playbook) => {
            const urgency = URGENCY_STYLES[playbook.urgency];
            return (
              <Link
                key={playbook.id}
                href={`/playbooks/${playbook.id}`}
                className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{playbook.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {playbook.title}
                      </h3>
                      <div className={`flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded border font-medium flex-shrink-0 ${urgency.bg} ${urgency.text}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />
                        {playbook.urgency}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                      {playbook.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground">{CATEGORY_LABELS[playbook.category] || playbook.category}</span>
                      <span className="text-[10px] text-muted-foreground">{playbook.steps.length} steps</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No playbooks found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
