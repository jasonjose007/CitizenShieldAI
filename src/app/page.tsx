"use client";

import { useState } from "react";
import {
  Shield,
  FileText,
  Search,
  MessageCircle,
  Home,
  Briefcase,
  ShieldCheck,
  Landmark,
  BookOpen,
  ScanText,
  WifiOff,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import DocumentGenerator from "@/components/DocumentGenerator";
import SchemeMatcherUI from "@/components/SchemeMatcherUI";
import LandingHero from "@/components/LandingHero";
import Link from "next/link";

type Tab = "chat" | "documents" | "schemes";

const sidebarItems = [
  { id: "rti", name: "RTI Applications", icon: FileText },
  { id: "consumer", name: "Consumer Rights", icon: ShieldCheck },
  { id: "tenant", name: "Tenant Rights", icon: Home },
  { id: "workplace", name: "Workplace Rights", icon: Briefcase },
  { id: "schemes", name: "Govt Schemes", icon: Landmark },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [showApp, setShowApp] = useState(false);

  const handleActionSuggested = (action: string) => {
    if (action.includes("Scheme") || action.includes("Eligibility")) {
      setActiveTab("schemes");
    } else {
      setActiveTab("documents");
    }
  };

  if (!showApp) {
    return <LandingHero onGetStarted={() => setShowApp(true)} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden lg:flex w-60 border-r border-border bg-sidebar flex-col shrink-0">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground text-sm tracking-tight">CitizenShield AI</h1>
              <p className="text-[10px] text-sidebar-foreground/50">Legal Rights Guardian</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 pt-2 pb-1.5">Main</p>
          <SidebarBtn active={activeTab === "chat"} onClick={() => setActiveTab("chat")} icon={MessageCircle} label="Legal Chat" />
          <SidebarBtn active={activeTab === "documents"} onClick={() => setActiveTab("documents")} icon={FileText} label="Documents" />
          <SidebarBtn active={activeTab === "schemes"} onClick={() => setActiveTab("schemes")} icon={Search} label="Scheme Finder" />

          <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 pt-4 pb-1.5">Tools</p>
          <Link href="/analyze" className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <ScanText className="w-4 h-4" />
            Analyze Text
          </Link>
          <Link href="/playbooks" className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <BookOpen className="w-4 h-4" />
            Playbooks
            <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <WifiOff className="w-2.5 h-2.5" />
              Offline
            </span>
          </Link>

          <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 pt-4 pb-1.5">Quick Topics</p>
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab("chat")} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <item.icon className="w-3.5 h-3.5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-sidebar-foreground/40 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-sidebar-foreground/40 leading-relaxed">
                Legal information only. Consult a lawyer for complex matters. Free aid: NALSA 15100.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden border-b border-border bg-card px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-sm">CitizenShield AI</span>
          </div>
          <div className="flex items-center gap-1">
            <MobileTab active={activeTab === "chat"} onClick={() => setActiveTab("chat")} icon={MessageCircle} />
            <MobileTab active={activeTab === "documents"} onClick={() => setActiveTab("documents")} icon={FileText} />
            <MobileTab active={activeTab === "schemes"} onClick={() => setActiveTab("schemes")} icon={Search} />
            <Link href="/analyze" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <ScanText className="w-4 h-4" />
            </Link>
            <Link href="/playbooks" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {activeTab === "chat" && <ChatInterface onActionSuggested={handleActionSuggested} />}
          {activeTab === "documents" && <DocumentGenerator />}
          {activeTab === "schemes" && <SchemeMatcherUI />}
        </main>
      </div>
    </div>
  );
}

function SidebarBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-foreground font-medium" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}>
      <Icon className="w-4 h-4" />
      {label}
      {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
    </button>
  );
}

function MobileTab({ active, onClick, icon: Icon }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button onClick={onClick} className={`p-2 rounded-lg transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
      <Icon className="w-4 h-4" />
    </button>
  );
}
