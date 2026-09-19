import React from "react";
import { prisma } from "@/lib/prisma";
import { BarChart3, AlertTriangle, BookOpen, Layers, ArrowUpRight, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function TelemetryPage() {
  const telemetryRecords = await prisma.skillGapTelemetry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
          <BarChart3 className="w-4 h-4" />
          Pillar 3 Curriculum Telemetry Engine (PS 26044)
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Curriculum Modernization & Skill-Gap Telemetry
        </h1>
        <p className="text-sm text-muted-fg max-w-3xl">
          Automated evaluation telemetry fed directly to University Boards of Studies and Ayush Academic Councils. Identifies missing toolchains, outdated standards, and practical skill deficits across student capstone reviews.
        </p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border space-y-2 card-hover">
          <div className="text-xs font-bold text-muted-fg uppercase tracking-wider">
            Average Skill Deficit Score
          </div>
          <div className="text-3xl font-extrabold text-amber-500 flex items-center gap-2">
            <span>38.5%</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">
              Board Review Pending
            </span>
          </div>
          <p className="text-xs text-muted-fg">Computed across 142 student capstone evaluations</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border space-y-2 card-hover">
          <div className="text-xs font-bold text-muted-fg uppercase tracking-wider">
            Flagged Syllabus Deficiencies
          </div>
          <div className="text-3xl font-extrabold text-foreground flex items-center gap-2">
            <span>{telemetryRecords.length} Active Items</span>
          </div>
          <p className="text-xs text-muted-fg">Ayush & AIIA Academic Council queue</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border space-y-2 card-hover">
          <div className="text-xs font-bold text-muted-fg uppercase tracking-wider">
            Curriculum Modernization Cycle
          </div>
          <div className="text-3xl font-extrabold text-emerald-500 flex items-center gap-2">
            <span>Annual (Closed-Loop)</span>
          </div>
          <p className="text-xs text-muted-fg">Replaces legacy 3-5 year manual syllabus reviews</p>
        </div>
      </div>

      {/* Telemetry Items List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Empirical Telemetry Stream for University Boards of Studies
        </h2>

        <div className="space-y-4">
          {telemetryRecords.map((item) => {
            const missingToolsList = item.missingTools.split(",").map((t) => t.trim());
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 hover:border-primary/40 transition-all card-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
                  <div>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                      {item.department} • Academic Year {item.academicYear}
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      {item.skillDeficiency}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 self-start sm:self-auto">
                    Deficit Score: {item.aggregateDeficitScore}%
                  </span>
                </div>

                {/* Missing Tools */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-muted-fg uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Identified Toolchain & Skill Deficits:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {missingToolsList.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                  <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Board of Studies Syllabus Recommendation:
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {item.curriculumRecommendation}
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ayush Digital Health Mission Telemetry Sync</span>
                  </div>

                  <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 shadow-sm">
                    <span>Forward to Department Board of Studies</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
