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
    <html lang="en" suppressHydrationWarning>
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
      <body className="font-body antialiased selection:bg-amber-500/30 selection:text-amber-200 min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 w-full pt-16">{children}</main>
            <footer className="gradient-border-top relative border-t border-[#222e40]/50 py-8 text-xs text-[#94a3b8] backdrop-blur-md transition-colors" style={{backgroundColor: 'var(--footer-bg)'}}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#f59e0b] to-[#4edea3] text-slate-950 font-black text-[10px] flex items-center justify-center shadow-sm">
                    UB
                  </div>
                  <span className="font-headline font-bold text-sm" style={{color: 'var(--text-on-dark)'}}>UniBridge Platform</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#161e2e] text-[#a3b18a] border border-[#222e40] font-mono text-[10px]">
                    SIH 2026 • PS 26044
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-[#94a3b8]">
                    Ministry of Ayush & AIIA Collaboration • Operationalizing NEP 2020 & UGC NCrF
                  </span>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-emerald-500/10 text-[#4edea3] border border-emerald-500/20 font-mono text-[9px] uppercase tracking-wider font-bold">
                    Built for SIH 2026
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

