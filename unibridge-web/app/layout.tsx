import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "UniBridge | University-Industry Collaboration Platform",
  description:
    "Next-Generation University-Industry Collaboration & Continuous Curriculum Modernization Platform. NEP 2020 & UGC Guidelines Aligned.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-6 text-xs text-muted-fg bg-card/40 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="font-bold text-foreground">UniBridge Systems</div>
                <div>Operationalizing NEP 2020 & UGC Industry-Linkage Guidelines</div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
