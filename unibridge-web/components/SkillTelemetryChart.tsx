"use client";

import React from "react";
import { AlertTriangle, TrendingUp, Cpu, Lightbulb, CheckCircle2, ShieldCheck } from "lucide-react";

interface SkillItem {
  skill: string;
  industryDemand: number;
  curriculumCoverage: number;
  status: "CRITICAL_GAP" | "MODERATE_GAP" | "ALIGNED";
}

interface SkillTelemetryChartProps {
  skills?: SkillItem[];
  department?: string;
  onProposeRevision?: () => void;
}

export function SkillTelemetryChart({
  skills = [
    { skill: "TensorRT Edge GPU Optimization", industryDemand: 92, curriculumCoverage: 28, status: "CRITICAL_GAP" },
    { skill: "MQTT Telemetry Protocols", industryDemand: 88, curriculumCoverage: 45, status: "MODERATE_GAP" },
    { skill: "ABDM FHIR Clinical Data Standards", industryDemand: 85, curriculumCoverage: 32, status: "CRITICAL_GAP" },
    { skill: "PyTorch Computer Vision", industryDemand: 95, curriculumCoverage: 80, status: "ALIGNED" },
    { skill: "Spring Boot Microservices", industryDemand: 90, curriculumCoverage: 75, status: "ALIGNED" },
  ],
  department = "Computer Science & Engineering",
  onProposeRevision,
}: SkillTelemetryChartProps) {
  return (
    <div className="space-y-6 bg-[#121927] border border-[#2b394f] p-5 rounded-xl shadow-lg">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2b394f] pb-4">
        <div>
          <h3 className="font-headline font-bold text-lg text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
            Curriculum Deficit Telemetry Radar
          </h3>
          <p className="font-body text-xs text-[#94a3b8] mt-0.5">
            Empirical telemetry comparison between active industry challenges and current {department} syllabus modules.
          </p>
        </div>

        <button
          onClick={onProposeRevision}
          className="btn-hover-lift px-3.5 py-2 rounded-lg font-bold text-xs bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 flex items-center gap-1.5 shrink-0 shadow-md"
        >
          <Lightbulb className="w-4 h-4" />
          <span>Propose BoS Revision</span>
        </button>
      </div>

      {/* Animated Radar Graphic + Skills Stack */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Animated Radar Sweep Graphic */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-[#0b0f17] border border-[#2b394f] relative overflow-hidden radar-grid-glow">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg width="180" height="180" viewBox="0 0 200 200" className="w-full h-full">
              {/* Radar Circles */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#2b394f" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="65" fill="none" stroke="#2b394f" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#2b394f" strokeWidth="1" />
              <circle cx="100" cy="100" r="15" fill="none" stroke="#2b394f" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="#2b394f" strokeWidth="1" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#2b394f" strokeWidth="1" />

              {/* Radar Sweep Arc */}
              <g className="animate-radar-sweep">
                <path d="M100,100 L190,100 A90,90 0 0,0 100,10 Z" fill="url(#radarSweep)" opacity="0.35" />
              </g>

              {/* Radar Target Points */}
              <circle cx="140" cy="65" r="4" fill="#f59e0b" className="animate-pulse-node" />
              <circle cx="70" cy="135" r="4" fill="#ffb4ab" className="animate-pulse-node" />
              <circle cx="150" cy="120" r="4" fill="#4edea3" />

              <defs>
                <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-mono text-[10px] text-[#a3b18a] uppercase tracking-wider mt-2">
            Live Deficit Radar • Active Scan
          </span>
        </div>

        {/* Skills Comparison List */}
        <div className="md:col-span-8 space-y-3">
          {skills.map((item, idx) => {
            const gap = item.industryDemand - item.curriculumCoverage;
            let gapBadge = (
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Aligned
              </span>
            );

            if (item.status === "CRITICAL_GAP") {
              gapBadge = (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30 flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="w-3 h-3" />
                  Deficit (-{gap}%)
                </span>
              );
            } else if (item.status === "MODERATE_GAP") {
              gapBadge = (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-[#f59e0b]/15 text-[#ffc174] border border-[#f59e0b]/30 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Gap (-{gap}%)
                </span>
              );
            }

            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#0b0f17] border border-[#2b394f] space-y-2 hover:border-[#f59e0b]/30 transition-all"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#94a3b8]" />
                    {item.skill}
                  </span>
                  {gapBadge}
                </div>

                <div className="space-y-1.5 pt-0.5 font-mono text-[11px]">
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[#94a3b8]">
                      <span>Industry Demand</span>
                      <span className="font-bold text-white">{item.industryDemand}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#172030] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#10b981]"
                        style={{ width: `${item.industryDemand}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[#94a3b8]">
                      <span>Syllabus Coverage</span>
                      <span className="font-bold text-[#ffc174]">{item.curriculumCoverage}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#172030] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#f59e0b]"
                        style={{ width: `${item.curriculumCoverage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendation Note */}
      <div className="p-3.5 rounded-lg bg-[#588157]/15 border border-[#588157]/40 text-xs space-y-1 font-body">
        <div className="font-headline font-bold text-[#ffc174] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#10b981]" />
          <span>Automated Board of Studies Feedback Note</span>
        </div>
        <p className="text-[#dfe2ee] leading-relaxed text-[12px]">
          Empirical data indicates a <strong>64% industry deficit</strong> in edge hardware tensor compilation and ABDM clinical data schemas. Incorporating practical lab modules for TensorRT and FHIR in Semester 6 can elevate university graduate placement readiness by <strong>+28%</strong>.
        </p>
      </div>
    </div>
  );
}

