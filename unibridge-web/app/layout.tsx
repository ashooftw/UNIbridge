import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "UniBridge | Ayush & AIIA Industry-Academia Collaboration Platform",
  description:
    "Next-Generation University-Industry Collaboration & Continuous Curriculum Modernization Platform. Operationalizing NEP 2020 & UGC Guidelines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0b0f17] font-body text-[#dfe2ee] antialiased selection:bg-amber-500/30 selection:text-amber-200 min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-[#0b0f17] text-[#dfe2ee]">
            <Header />
            <main className="flex-1 w-full pt-16">{children}</main>
            <footer className="border-t border-[#222e40] py-6 text-xs text-[#94a3b8] bg-[#0f131c]/80 backdrop-blur-md transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-headline font-bold text-white text-sm">UniBridge Platform</span>
                  <span className="px-2 py-0.5 rounded bg-[#161e2e] text-[#a3b18a] border border-[#222e40] font-mono text-[10px]">
                    SIH 2026 • PS 26044
                  </span>
                </div>
                <div className="font-mono text-[11px] text-[#94a3b8]">
                  Ministry of Ayush & AIIA Collaboration • Operationalizing NEP 2020 & UGC NCrF
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

