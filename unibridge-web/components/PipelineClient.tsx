"use client";

import React, { useState } from "react";
import {
  Award,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  FileCheck,
  ArrowRight,
  UserCheck,
  X,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Lock,
} from "lucide-react";

interface PlacementRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  challengeTitle: string;
  companyName: string;
  capstoneScore: number;
  internshipStatus: string;
  ppoStatus: string;
  accreditedCredits: string;
  verifiedHash: string;
  createdAt: any;
}

interface PipelineClientProps {
  pipelineRecords: PlacementRecord[];
}

export function PipelineClient({ pipelineRecords }: PipelineClientProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<PlacementRecord | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest">
          <Award className="w-4 h-4" />
          Live Placement & Internship Pipeline (PS 26044)
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Capstone-to-Placement Conversion Pipeline
        </h1>
        <p className="text-sm text-muted-fg max-w-3xl leading-relaxed">
          Tracks how evaluated student capstone projects convert into accredited industry internships and Pre-Placement Offers (PPOs) backed by verifiable cryptographic credentials.
        </p>
      </div>

      {/* 4-Stage Visual Stepper Kanban */}
      <div className="p-8 rounded-3xl bg-card border border-border shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-xs font-bold text-muted-fg uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Accredited NEP 2020 4-Stage Industry Linkage Journey
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {pipelineRecords.length} Active Candidates Tracked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Stage 1 */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-border/70 space-y-3 relative group hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 font-black text-sm flex items-center justify-center border border-blue-500/20">
                1
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                Phase I
              </span>
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">1. AI Capstone Match</div>
              <p className="text-xs text-muted-fg leading-relaxed mt-1">
                Student matches course outcomes against live Ayush / Industry problem statement.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-border/70 space-y-3 relative group hover:border-teal-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-500 font-black text-sm flex items-center justify-center border border-teal-500/20">
                2
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded-full">
                Phase II
              </span>
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">2. Joint Evaluation</div>
              <p className="text-xs text-muted-fg leading-relaxed mt-1">
                Faculty advisor and Corporate R&D lead grade code quality, SLAs, and deliverables.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-border/70 space-y-3 relative group hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 font-black text-sm flex items-center justify-center border border-amber-500/20">
                3
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Phase III
              </span>
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">3. Accredited Internship</div>
              <p className="text-xs text-muted-fg leading-relaxed mt-1">
                Top evaluated project earns 3-4 NEP semester degree credits & paid corporate internship.
              </p>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 relative group hover:border-emerald-500 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-sm">
                4
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                Final PPO
              </span>
            </div>
            <div>
              <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                4. Pre-Placement Offer (PPO)
              </div>
              <p className="text-xs text-muted-fg leading-relaxed mt-1">
                Industry partner issues direct PPO job offer based on verified capstone metrics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Accredited Candidate Placements & Verified Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineRecords.map((item) => {
            const isPPO = item.ppoStatus === "PPO_OFFERED";
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 hover:border-primary/50 transition-all card-hover flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Status Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      {item.accreditedCredits}
                    </span>

                    {isPPO ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse">
                        PPO OFFERED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        INTERNSHIP ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Student Info */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{item.studentName}</h3>
                    <p className="text-xs text-muted-fg font-medium">{item.studentEmail}</p>
                  </div>

                  {/* Challenge & Corporate */}
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                    <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{item.companyName}</span>
                    </div>
                    <div className="text-xs text-foreground font-semibold line-clamp-2">
                      {item.challengeTitle}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                    <span className="text-xs font-bold text-muted-fg">Capstone Review Score:</span>
                    <span className="text-base font-extrabold text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {item.capstoneScore}%
                    </span>
                  </div>
                </div>

                {/* Footer with Clickable Cryptographic Verification Hash */}
                <div className="pt-3 border-t border-border/60 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-fg font-semibold">Verification Hash:</span>
                    <button
                      onClick={() => setSelectedCandidate(item)}
                      className="font-mono text-primary font-bold hover:underline flex items-center gap-1 text-[11px] bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20"
                      title="Click to view verified transcript modal"
                    >
                      <Lock className="w-3 h-3" />
                      <span>{item.verifiedHash.substring(0, 10)}...</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedCandidate(item)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>View Verified Transcript Certificate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification Certificate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-muted-fg hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Badge */}
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Cryptographically Verified Transcript
                </span>
                <h3 className="text-xl font-extrabold text-foreground mt-1">
                  Ministry of Ayush & AIIA Academic Transcript
                </h3>
              </div>
            </div>

            {/* Certificate Body Card */}
            <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-primary pointer-events-none">
                <Award className="w-40 h-40" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-fg uppercase tracking-wider">Candidate Learner:</span>
                  <div className="text-base font-bold text-foreground">{selectedCandidate.studentName}</div>
                  <div className="text-xs text-muted-fg font-mono">{selectedCandidate.studentEmail}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-fg uppercase tracking-wider">Sponsoring Enterprise:</span>
                  <div className="text-base font-bold text-primary">{selectedCandidate.companyName}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    {selectedCandidate.ppoStatus === "PPO_OFFERED" ? "★ Pre-Placement Offer Issued" : "Accredited Internship Active"}
                  </div>
                </div>
              </div>

              <div className="border-t border-border/80 pt-4 space-y-1">
                <span className="text-[10px] font-bold text-muted-fg uppercase tracking-wider">Verified Capstone Title:</span>
                <div className="text-sm font-bold text-foreground">{selectedCandidate.challengeTitle}</div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-border/80 pt-4">
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <span className="text-[10px] font-bold text-muted-fg block uppercase">Score</span>
                  <span className="text-lg font-black text-emerald-500">{selectedCandidate.capstoneScore}%</span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <span className="text-[10px] font-bold text-muted-fg block uppercase">NEP Credits</span>
                  <span className="text-sm font-extrabold text-foreground">{selectedCandidate.accreditedCredits}</span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-muted-fg block uppercase">Verification Status</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    100% Valid
                  </span>
                </div>
              </div>

              {/* SHA-256 Hash Box */}
              <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-muted-fg">
                  <span>SHA-256 Cryptographic Verification Hash:</span>
                  <button
                    onClick={() => handleCopyHash(selectedCandidate.verifiedHash)}
                    className="text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hash</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs text-foreground bg-muted p-2.5 rounded-lg break-all select-all border border-border/60">
                  {selectedCandidate.verifiedHash}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Close Window</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
