"use client";

import React, { useState } from "react";
import { CheckCircle2, X, Lock, Check } from "lucide-react";

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
  const [filterStage, setFilterStage] = useState<string>("ALL");

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const filteredCandidates = filterStage === "PPO"
    ? pipelineRecords.filter((r) => r.ppoStatus === "PPO_OFFERED")
    : pipelineRecords;

  return (
    <div className="space-y-8 bg-[#0b0f17] text-[#dad7cd] pb-16">
      
      {/* 1. Top Title Bar & System Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#588157]/25 pb-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[#182232] border border-[#588157]/50 text-[#a3b18a] uppercase font-semibold">
              SIH 2026 • PS 26044
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0e1522] border border-[#588157]/30 text-[#dad7cd]">
              NEP 2020 Framework
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0e1522] border border-[#588157]/40 text-[#a3b18a]">
              <span className="w-2 h-2 rounded-full bg-[#588157] animate-pulse"></span>
              <span>ABC Ledger Node #IND-9022 Active</span>
            </div>
          </div>
          <h1 className="font-headline text-[32px] sm:text-[36px] text-white tracking-tight font-bold">
            Capstone-to-Placement & Accreditation Pipeline
          </h1>
          <p className="font-body text-sm text-[#dad7cd]/80 max-w-3xl leading-relaxed">
            End-to-end NEP 2020 verification workflow converting academic capstones into accredited industry internships and Pre-Placement Offers (PPOs).
          </p>
        </div>

        {/* Quick Stage Filter */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <div className="flex items-center bg-[#080c13] border border-[#588157]/35 rounded-lg p-1 font-mono text-[11px]">
            <button
              onClick={() => setFilterStage("ALL")}
              className={`px-3 py-1.5 rounded transition-all font-semibold ${
                filterStage === "ALL"
                  ? "bg-[#182232] border border-[#588157]/50 text-white shadow-sm"
                  : "text-[#a3b18a] hover:text-white"
              }`}
            >
              All Cohorts ({pipelineRecords.length})
            </button>
            <button
              onClick={() => setFilterStage("PPO")}
              className={`px-3 py-1.5 rounded transition-all font-semibold ${
                filterStage === "PPO"
                  ? "bg-[#182232] border border-[#588157]/50 text-white shadow-sm"
                  : "text-[#a3b18a] hover:text-white"
              }`}
            >
              PPO Confirmed Only
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Stats Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-[#182232]/80 backdrop-blur-md border border-[#588157]/30 hover:border-[#588157] transition-all shadow-md space-y-1">
          <span className="text-[10px] uppercase text-[#a3b18a] tracking-wider font-semibold">Active Capstones</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-white font-bold tracking-tight">142</span>
            <span className="text-[10px] text-[#a3b18a] font-semibold">+18% MoM</span>
          </div>
          <div className="text-[10px] text-[#a3b18a] pt-1">AIIA & Ayush Institutional Labs</div>
        </div>

        <div className="p-4 rounded-xl bg-[#182232]/80 backdrop-blur-md border border-[#588157]/30 hover:border-[#588157] transition-all shadow-md space-y-1">
          <span className="text-[10px] uppercase text-[#a3b18a] tracking-wider font-semibold">PPO Conversion Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-[#4edea3] font-bold tracking-tight">84.2%</span>
            <span className="text-[10px] text-[#4edea3] font-semibold">+6.5% vs Target</span>
          </div>
          <div className="text-[10px] text-[#a3b18a] pt-1">Pre-Placement Offers Signed</div>
        </div>

        <div className="p-4 rounded-xl bg-[#182232]/80 backdrop-blur-md border border-[#588157]/30 hover:border-[#588157] transition-all shadow-md space-y-1">
          <span className="text-[10px] uppercase text-[#a3b18a] tracking-wider font-semibold">ABC Credit Nodes</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-[#ffc174] font-bold tracking-tight">568 CR</span>
          </div>
          <div className="text-[10px] text-[#a3b18a] pt-1">Transferred to UGC NCrF Ledger</div>
        </div>

        <div className="p-4 rounded-xl bg-[#182232]/80 backdrop-blur-md border border-[#588157]/30 hover:border-[#588157] transition-all shadow-md space-y-1">
          <span className="text-[10px] uppercase text-[#a3b18a] tracking-wider font-semibold">Corporate Partners</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-white font-bold tracking-tight">28 R&D</span>
          </div>
          <div className="text-[10px] text-[#a3b18a] pt-1">Dabur, Baidyanath, Patanjali</div>
        </div>
      </div>

      {/* 3. 4-Stage Stepper Banner */}
      <div className="p-6 rounded-xl bg-[#182232]/80 border border-[#588157]/35 shadow-lg space-y-5">
        <div className="flex items-center justify-between border-b border-[#588157]/25 pb-3">
          <span className="font-mono text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
            NEP 2020 4-Stage Capstone-to-PPO Journey
          </span>
          <span className="font-mono text-xs text-[#4edea3]">
            {filteredCandidates.length} Active Candidates Tracked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#0e1522] border border-[#588157]/30 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="w-6 h-6 rounded bg-[#182232] text-[#f59e0b] font-bold flex items-center justify-center border border-[#588157]/40">1</span>
              <span className="text-[#a3b18a] text-[10px]">STAGE 1</span>
            </div>
            <div className="font-headline font-bold text-sm text-white">1. AI Alignment Audit</div>
            <p className="font-body text-xs text-[#dad7cd]/80 leading-relaxed">
              Student matches course outcomes against live Ayush / Industry challenge.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0e1522] border border-[#588157]/30 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="w-6 h-6 rounded bg-[#182232] text-[#f59e0b] font-bold flex items-center justify-center border border-[#588157]/40">2</span>
              <span className="text-[#a3b18a] text-[10px]">STAGE 2</span>
            </div>
            <div className="font-headline font-bold text-sm text-white">2. Dual Evaluation</div>
            <p className="font-body text-xs text-[#dad7cd]/80 leading-relaxed">
              Faculty advisor and Corporate R&D lead grade code milestones & deliverables.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0e1522] border border-[#588157]/30 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="w-6 h-6 rounded bg-[#182232] text-[#f59e0b] font-bold flex items-center justify-center border border-[#588157]/40">3</span>
              <span className="text-[#a3b18a] text-[10px]">STAGE 3</span>
            </div>
            <div className="font-headline font-bold text-sm text-white">3. Accredited Internship</div>
            <p className="font-body text-xs text-[#dad7cd]/80 leading-relaxed">
              Earn 3–4 NEP semester degree credits & paid corporate fellowship.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0e1522] border border-[#4edea3]/40 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="w-6 h-6 rounded bg-[#4edea3] text-slate-950 font-bold flex items-center justify-center">4</span>
              <span className="text-[#4edea3] text-[10px] font-bold">FINAL STAGE</span>
            </div>
            <div className="font-headline font-bold text-sm text-[#4edea3]">4. Pre-Placement Offer</div>
            <p className="font-body text-xs text-[#dad7cd]/80 leading-relaxed">
              Industry partner extends direct PPO job offer based on verified deliverables.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Candidate Cards Grid */}
      <div className="space-y-4">
        <h2 className="font-headline text-xl font-bold text-white">
          Accredited Candidate Placements & Cryptographic Credentials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((item) => {
            const isPPO = item.ppoStatus === "PPO_OFFERED";
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#182232]/80 border border-[#588157]/35 hover:border-[#588157] transition-all shadow-lg flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Status Badges */}
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <span className="px-2.5 py-0.5 rounded bg-[#0e1522] text-[#a3b18a] border border-[#588157]/40 font-semibold">
                      {item.accreditedCredits}
                    </span>

                    {isPPO ? (
                      <span className="px-2.5 py-0.5 rounded bg-[#003824] text-[#4edea3] border border-emerald-500/40 font-bold animate-pulse">
                        PPO OFFERED
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded bg-[#2b2011] text-[#ffc174] border border-[#f59e0b]/40 font-bold">
                        INTERNSHIP ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Student Info */}
                  <div>
                    <h3 className="font-headline font-bold text-base text-white group-hover:text-[#ffc174] transition-colors">
                      {item.studentName}
                    </h3>
                    <p className="font-mono text-xs text-[#a3b18a]">{item.studentEmail}</p>
                  </div>

                  {/* Challenge Info */}
                  <div className="p-3 rounded-lg bg-[#0e1522] border border-[#588157]/25 space-y-1">
                    <div className="font-mono text-[11px] text-[#ffc174] font-bold">
                      {item.companyName}
                    </div>
                    <div className="font-body text-xs text-white line-clamp-2">
                      {item.challengeTitle}
                    </div>
                  </div>

                  {/* Capstone Score */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0e1522] border border-[#588157]/25 font-mono text-xs">
                    <span className="text-[#a3b18a]">Review Score:</span>
                    <span className="font-bold text-[#4edea3] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.capstoneScore}%
                    </span>
                  </div>
                </div>

                {/* Verification Hash Footer */}
                <div className="pt-3 border-t border-[#588157]/25 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#a3b18a]">Hash:</span>
                    <button
                      onClick={() => setSelectedCandidate(item)}
                      className="text-[#ffc174] hover:underline font-bold flex items-center gap-1 bg-[#0e1522] px-2 py-0.5 rounded border border-[#588157]/40"
                    >
                      <Lock className="w-3 h-3 text-[#f59e0b]" />
                      <span>{item.verifiedHash.substring(0, 10)}...</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedCandidate(item)}
                    className="btn-hover-lift w-full py-2 rounded-lg bg-[#588157]/20 hover:bg-[#588157]/30 text-[#f8fafc] font-bold text-xs border border-[#588157]/50 shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View Verified Transcript</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cryptographically Verified Transcript Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-xl bg-[#0e1522] border border-[#588157]/40 shadow-2xl p-6 space-y-6 relative max-h-[90vh] overflow-y-auto text-[#dad7cd]">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-5 right-5 p-1 text-[#a3b18a] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-[#588157]/30 pb-4">
              <span className="font-mono text-[10px] font-bold uppercase text-[#f59e0b] bg-[#182232] px-2.5 py-0.5 rounded border border-[#588157]/40">
                Cryptographically Verified Academic Transcript
              </span>
              <h3 className="font-headline font-bold text-xl text-white mt-1">
                Ministry of Ayush & AIIA Academic Transcript Certificate
              </h3>
            </div>

            <div className="p-5 rounded-lg bg-[#182232] border border-[#588157]/30 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[#a3b18a] text-[10px] uppercase block">Candidate Learner:</span>
                  <div className="font-bold text-white text-base">{selectedCandidate.studentName}</div>
                  <div className="text-[#a3b18a] text-[11px]">{selectedCandidate.studentEmail}</div>
                </div>

                <div>
                  <span className="text-[#a3b18a] text-[10px] uppercase block">Sponsoring Enterprise:</span>
                  <div className="font-bold text-[#ffc174] text-base">{selectedCandidate.companyName}</div>
                  <div className="text-[#4edea3] text-[11px] font-bold">
                    {selectedCandidate.ppoStatus === "PPO_OFFERED" ? "★ Pre-Placement Offer Issued" : "Accredited Internship Active"}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#588157]/25 pt-3">
                <span className="text-[#a3b18a] text-[10px] uppercase block">Verified Capstone Title:</span>
                <div className="font-headline font-bold text-white text-sm">{selectedCandidate.challengeTitle}</div>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-[#588157]/25 pt-3 text-center">
                <div className="p-2.5 rounded bg-[#0e1522] border border-[#588157]/30">
                  <span className="text-[10px] text-[#a3b18a] block">Score</span>
                  <span className="text-lg font-bold text-[#4edea3]">{selectedCandidate.capstoneScore}%</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e1522] border border-[#588157]/30">
                  <span className="text-[10px] text-[#a3b18a] block">NEP Credits</span>
                  <span className="text-sm font-bold text-white">{selectedCandidate.accreditedCredits}</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e1522] border border-[#588157]/30">
                  <span className="text-[10px] text-[#a3b18a] block">Status</span>
                  <span className="text-xs font-bold text-[#4edea3]">100% Valid</span>
                </div>
              </div>

              {/* SHA-256 Hash Box */}
              <div className="p-3.5 rounded bg-[#0e1522] border border-[#588157]/30 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#a3b18a]">SHA-256 Cryptographic Verification Hash:</span>
                  <button
                    onClick={() => handleCopyHash(selectedCandidate.verifiedHash)}
                    className="text-[#ffc174] hover:underline font-bold flex items-center gap-1"
                  >
                    {copiedHash ? (
                      <span className="text-[#4edea3]">Copied!</span>
                    ) : (
                      <span>Copy Hash</span>
                    )}
                  </button>
                </div>
                <div className="font-mono text-[11px] text-white bg-[#182232] p-2 rounded break-all select-all border border-[#588157]/30">
                  {selectedCandidate.verifiedHash}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-[#182232] text-white font-mono text-xs hover:bg-[#223046] transition-colors border border-[#588157]/40"
              >
                Print Transcript
              </button>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="btn-hover-lift px-5 py-2 rounded-lg bg-gradient-to-r from-[#588157] to-[#456b44] text-white font-mono font-bold text-xs shadow-md"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

