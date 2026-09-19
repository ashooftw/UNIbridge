import React from "react";
import { prisma } from "@/lib/prisma";
import { Award, Building2, CheckCircle2, ShieldCheck, Briefcase, FileCheck, ArrowRight, UserCheck } from "lucide-react";

export const revalidate = 0;

export default async function PipelinePage() {
  const pipelineRecords = await prisma.placementPipeline.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest">
          <Award className="w-4 h-4" />
          Live Placement & Internship Pipeline (PS 26044)
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Capstone-to-Placement Conversion Pipeline
        </h1>
        <p className="text-sm text-muted-fg max-w-3xl">
          Tracks how evaluated student capstone projects convert into accredited industry internships and Pre-Placement Offers (PPOs) backed by verifiable cryptographic credentials.
        </p>
      </div>

      {/* Pipeline Lifecycle Stages Overview */}
      <div className="p-8 rounded-3xl bg-card border border-border shadow-md space-y-6">
        <div className="text-xs font-bold text-muted-fg uppercase tracking-wider">
          4-Step Accredited Placement Pathway
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <div className="font-bold text-xs text-foreground">AI Capstone Match</div>
            <p className="text-[11px] text-muted-fg leading-relaxed">
              Student matches course outcomes against live Ayush / Industry problem statement.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-500 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div className="font-bold text-xs text-foreground">Joint Evaluation</div>
            <p className="text-[11px] text-muted-fg leading-relaxed">
              Faculty advisor and Corporate R&D lead grade code quality, SLAs, and deliverables.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <div className="font-bold text-xs text-foreground">Accredited Internship</div>
            <p className="text-[11px] text-muted-fg leading-relaxed">
              Top evaluated project earns 3-4 NEP semester degree credits & paid corporate internship.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
              4
            </div>
            <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400">Pre-Placement Offer (PPO)</div>
            <p className="text-[11px] text-muted-fg leading-relaxed">
              Industry partner issues direct PPO job offer based on verified capstone metrics.
            </p>
          </div>

        </div>
      </div>

      {/* Live Candidates Table / Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          Active Student Candidate Placements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineRecords.map((item) => {
            const isPPO = item.ppoStatus === "PPO_OFFERED";
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 hover:border-primary/50 transition-all card-hover flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
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

                  {/* Candidate Name & Email */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {item.studentName}
                    </h3>
                    <p className="text-xs text-muted-fg">{item.studentEmail}</p>
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

                  {/* Evaluation Score */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                    <span className="text-xs font-bold text-muted-fg">Capstone Review Score:</span>
                    <span className="text-base font-extrabold text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {item.capstoneScore}%
                    </span>
                  </div>

                </div>

                {/* Footer with Hash */}
                <div className="pt-3 border-t border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-fg font-mono">
                    <span className="truncate">Hash: {item.verifiedHash}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>

                  <button className="w-full py-2 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all flex items-center justify-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>View Accredited PPO Letter</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
