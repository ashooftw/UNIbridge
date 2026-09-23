"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, PlusCircle, Search, X } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  companyName: string;
  description: string;
  requiredSkills: string;
  targetDeliverables: string;
  difficulty: string;
  timelineWeeks: number;
  mentorshipAvailable: boolean;
  targetAudience: string;
}

interface RepositoryClientProps {
  initialProblems: Problem[];
  initialSearchQuery?: string;
}

const DIFFICULTY_OPTIONS = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export function RepositoryClient({ initialProblems, initialSearchQuery = "" }: RepositoryClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeDifficulty, setActiveDifficulty] = useState<string>("ALL");
  const [selectedTechStack, setSelectedTechStack] = useState<string | null>(null);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const filteredProblems = useMemo(() => {
    return initialProblems.filter((p) => {
      // Difficulty Filter
      if (activeDifficulty !== "ALL" && p.difficulty.toUpperCase() !== activeDifficulty) {
        return false;
      }

      // Tech Stack Filter
      if (selectedTechStack && !p.requiredSkills.toLowerCase().includes(selectedTechStack.toLowerCase())) {
        return false;
      }

      // Text Search Query Filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        p.companyName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.requiredSkills.toLowerCase().includes(q) ||
        p.targetAudience.toLowerCase().includes(q)
      );
    });
  }, [initialProblems, activeDifficulty, selectedTechStack, searchQuery]);

  return (
    <div className="space-y-8 bg-[#0b0f17] text-[#dfe2ee] pb-16">
      
      {/* 1. Authority Header & Metadata Strip */}
      <div className="flex flex-col gap-6 border-b border-[#222e40] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#94a3b8]">
            <span className="px-2 py-0.5 rounded bg-[#161e2e] text-[#a3b18a] border border-[#588157]/40 font-semibold tracking-wider">
              UGC / NCrF FRAMEWORK
            </span>
            <span>/</span>
            <span className="text-white">AYUSH-INDUSTRY SYNERGY REPOSITORY</span>
            <span>/</span>
            <span className="text-[#f59e0b] font-mono">SIH 2026 : PS 26044</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#121824] border border-[#222e40] font-mono text-[11px] text-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
              </span>
              <span>{initialProblems.length} VERIFIED BOTTLENECKS LIVE</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#588157]/15 border border-[#588157]/40 font-mono text-[11px] text-[#a3b18a]">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>100% NEP 4.0 CR AUDITED</span>
            </div>
          </div>
        </div>

        {/* Master Title & Action Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] font-mono text-[11px] font-semibold">
                Engineering Cohort Intake 2026
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#161e2e] border border-[#222e40] text-[#94a3b8] font-mono text-[11px]">
                Tier-1 MSME & Ayush Clusters
              </span>
            </div>
            <h1 className="font-headline text-[32px] sm:text-[36px] font-bold text-white tracking-tight">
              Industry Problem Repository
            </h1>
            <p className="font-body text-sm text-[#94a3b8] max-w-3xl leading-relaxed">
              Curated MSME, Ayush, and Enterprise Engineering Bottlenecks mapped directly to UGC learning outcomes and National Credit Framework standards.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2.5">
            <Link
              href="/problems/new"
              className="btn-hover-lift inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1c2638] hover:bg-[#151d2c] text-white hover:text-[#f59e0b] border border-[#222e40] hover:border-[#f59e0b]/50 font-bold text-[13px] transition-all shadow-md group"
            >
              <PlusCircle className="w-4 h-4 text-[#f59e0b] group-hover:scale-110 transition-transform" />
              <span>Submit Industry Challenge (+)</span>
            </Link>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#94a3b8] px-1">
              <span className="material-symbols-outlined text-[14px] text-[#a3b18a]">policy</span>
              <span>MoU Pre-Approved • Direct IPR Sharing</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Real-Time Search & Filter Workbench */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#151d2c] border border-[#222e40] shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94a3b8]">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges by sponsor, keyword, or tech stack (e.g. OpenCV, PyTorch, IoT, ESP32, MQTT)..."
              className="w-full h-11 pl-10 pr-10 rounded-lg bg-[#0b0f17] border border-[#222e40] text-white placeholder:text-[#64748b] font-body text-xs focus:outline-none focus:border-[#f59e0b] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94a3b8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex items-center gap-1 bg-[#0b0f17] p-1 rounded-lg border border-[#222e40] font-mono text-[11px] shrink-0">
            {DIFFICULTY_OPTIONS.map((diff) => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  activeDifficulty === diff
                    ? "bg-[#1c2638] text-[#ffc174] border border-[#f59e0b]/40 shadow-sm"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack Chip Filter Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#222e40]/70 font-mono text-[11px]">
          <span className="text-[#94a3b8] font-semibold flex items-center gap-1 mr-1">
            <span className="material-symbols-outlined text-[14px] text-[#f59e0b]">filter_alt</span>
            Filter Tech Stack:
          </span>
          {["PyTorch", "OpenCV", "IoT", "TensorRT", "MQTT", "Blockchain", "Python", "Rust"].map((tech) => {
            const isSelected = selectedTechStack === tech;
            return (
              <button
                key={tech}
                onClick={() => setSelectedTechStack(isSelected ? null : tech)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  isSelected
                    ? "bg-[#f59e0b] text-slate-950 font-bold border border-[#f59e0b]"
                    : "bg-[#0b0f17] text-[#a3b18a] hover:text-white border border-[#222e40]"
                }`}
              >
                {tech}
              </button>
            );
          })}
          {(selectedTechStack || searchQuery || activeDifficulty !== "ALL") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveDifficulty("ALL");
                setSelectedTechStack(null);
              }}
              className="ml-auto text-[#f59e0b] hover:underline font-semibold text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 3. Challenge Cards Grid */}
      {filteredProblems.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#151d2c] border border-[#222e40] space-y-3">
          <Search className="w-8 h-8 text-[#94a3b8] mx-auto" />
          <div className="text-base font-bold text-white">No matching challenges found</div>
          <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
            Try resetting your search query or selecting a different technology stack filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProblems.map((problem) => {
            const skillsList = problem.requiredSkills.split(",").map((s) => s.trim());

            const difficultyBadge =
              problem.difficulty.toUpperCase() === "BEGINNER"
                ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30"
                : problem.difficulty.toUpperCase() === "ADVANCED"
                ? "bg-[#ffb4ab]/15 text-[#ffb4ab] border-[#ffb4ab]/30"
                : "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30";

            return (
              <div
                key={problem.id}
                className="p-6 rounded-xl bg-[#151d2c] border border-[#222e40] hover:border-[#f59e0b]/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  {/* Top Sponsor & Difficulty Row */}
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-[#ffc174] font-bold truncate">
                      <span className="material-symbols-outlined text-[16px]">domain</span>
                      <span className="truncate">{problem.companyName}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded border font-bold ${difficultyBadge}`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline font-bold text-lg text-white group-hover:text-[#ffc174] transition-colors leading-snug">
                    {problem.title}
                  </h3>

                  {/* Target Audience Pill */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#111827] text-[#a3b18a] border border-[#222e40] font-mono text-[11px]">
                      Target: {problem.targetAudience}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#111827] text-[#94a3b8] border border-[#222e40] font-mono text-[11px]">
                      {problem.timelineWeeks}w Sprint
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs text-[#94a3b8] leading-relaxed line-clamp-3">
                    {problem.description}
                  </p>

                  {/* Deliverables Box */}
                  <div className="p-3 rounded-lg bg-[#0b0f17] border border-[#222e40] space-y-1">
                    <div className="font-mono text-[10px] font-bold uppercase text-[#a3b18a]">
                      Target Deliverables:
                    </div>
                    <div className="font-body text-xs text-[#dfe2ee] leading-relaxed line-clamp-2">
                      {problem.targetDeliverables}
                    </div>
                  </div>

                  {/* Required Competencies */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] uppercase text-[#94a3b8] font-bold">
                      Required Tech Competencies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#1c2638] text-[#ffc174] border border-[#f59e0b]/20 font-mono text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#222e40] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a3b18a]">
                    <span className="material-symbols-outlined text-[14px] text-[#10b981]">verified</span>
                    <span>AIIA Mentored</span>
                  </div>

                  <Link
                    href={`/matching?problemId=${problem.id}`}
                    className="btn-hover-lift inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 font-bold text-xs shadow-md"
                  >
                    <span>Match with Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

