import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CitizenShield AI - Legal Rights Assistant",
  description:
    "AI-powered legal information assistant for Indian citizens. Know your rights under BNS, BNSS & BSA. Analyze conversations, generate legal documents, find government schemes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CitizenShield AI",
  },
  openGraph: {
    title: "CitizenShield AI - Your Legal Rights Guardian",
    description:
      "Free AI-powered legal information for Indian citizens. Updated with India's new criminal law codes.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
