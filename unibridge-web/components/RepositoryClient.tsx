"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Cpu,
  Calendar,
  Tag,
  CheckCircle2,
  HeartPulse,
  PlusCircle,
  Search,
  X,
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";

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

const CATEGORIES = [
  "All Challenges",
  "Computer Vision & AI",
  "IoT & Embedded",
  "Health Informatics",
  "Supply Chain",
] as const;

type Category = (typeof CATEGORIES)[number];

function getProblemCategory(problem: Problem): Category {
  const text = `${problem.title} ${problem.description} ${problem.requiredSkills} ${problem.companyName}`.toLowerCase();

  if (text.includes("vision") || text.includes("image") || text.includes("ai") || text.includes("pytorch") || text.includes("botanical") || text.includes("detection")) {
    return "Computer Vision & AI";
  }
  if (text.includes("iot") || text.includes("sensor") || text.includes("embedded") || text.includes("mqtt") || text.includes("telemetry") || text.includes("fermentation")) {
    return "IoT & Embedded";
  }
  if (text.includes("fhir") || text.includes("abdm") || text.includes("clinical") || text.includes("health") || text.includes("informatics") || text.includes("ehr")) {
    return "Health Informatics";
  }
  if (text.includes("supply") || text.includes("chain") || text.includes("traceability") || text.includes("logistics") || text.includes("herb")) {
    return "Supply Chain";
  }

  return "Computer Vision & AI";
}

export function RepositoryClient({ initialProblems, initialSearchQuery = "" }: RepositoryClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeCategory, setActiveCategory] = useState<Category>("All Challenges");

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const filteredProblems = useMemo(() => {
    return initialProblems.filter((p) => {
      // Category filter
      if (activeCategory !== "All Challenges") {
        const cat = getProblemCategory(p);
        if (cat !== activeCategory) return false;
      }

      // Search query filter
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
  }, [initialProblems, activeCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header & Post CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <HeartPulse className="w-4 h-4 text-primary" />
            Ministry of Ayush & AIIA Industry Repository (PS 26044)
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Operational Ayush & R&D Challenges
          </h1>
          <p className="text-sm text-muted-fg max-w-3xl leading-relaxed">
            Real-world operational bottlenecks from Ministry of Ayush labs, AIIA research centers, and corporate Ayush R&D partners. Match your profile directly against open challenges.
          </p>
        </div>

        <Link
          href="/problems/new"
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-2 self-start sm:self-auto shadow-md hover:shadow-lg shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Challenge</span>
        </Link>
      </div>

      {/* Real-time Filter & Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input Pill */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Real-time search challenges, skills, sponsors..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-fg hover:text-foreground transition-colors"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Active Challenge Count Counter */}
          <div className="flex items-center gap-2 text-xs font-bold text-muted-fg shrink-0 px-3 py-2 rounded-xl bg-muted/40 border border-border/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              Showing <strong className="text-foreground">{filteredProblems.length}</strong> of{" "}
              <strong className="text-foreground">{initialProblems.length}</strong> challenges
            </span>
          </div>

        </div>

        {/* Quick Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
          <span className="text-xs font-bold text-muted-fg uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-primary" />
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-fg shadow-sm font-bold"
                    : "bg-muted/50 text-muted-fg hover:text-foreground hover:bg-muted border border-border/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge Grid */}
      {filteredProblems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-3">
          <Search className="w-8 h-8 text-muted-fg mx-auto" />
          <div className="text-base font-bold text-foreground">No matching challenges found</div>
          <p className="text-xs text-muted-fg max-w-sm mx-auto">
            Try adjusting your search terms or category selection to discover open Ayush problem statements.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All Challenges");
            }}
            className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProblems.map((problem) => {
            const skillsList = problem.requiredSkills.split(",").map((s) => s.trim());

            // Difficulty color coding per requirement: Green for Beginner, Amber for Intermediate, Rose for Advanced
            const difficultyBadge =
              problem.difficulty === "BEGINNER"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                : problem.difficulty === "ADVANCED"
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25";

            const categoryTag = getProblemCategory(problem);

            return (
              <div
                key={problem.id}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Metadata Chips Row 1 */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-primary truncate">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span className="truncate">{problem.companyName}</span>
                    </div>
                    {/* Difficulty Pill */}
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold border shrink-0 ${difficultyBadge}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    {problem.title}
                  </h3>

                  {/* Pills Row: Target Audience & Category */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-muted text-[11px] font-semibold text-muted-fg border border-border/60">
                      Target: {problem.targetAudience}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-teal-500/10 text-[11px] font-semibold text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      {categoryTag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-fg leading-relaxed line-clamp-3">
                    {problem.description}
                  </p>

                  {/* Deliverables */}
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                    <div className="text-[11px] font-bold text-foreground">Target Deliverables:</div>
                    <div className="text-xs text-muted-fg leading-relaxed line-clamp-2">
                      {problem.targetDeliverables}
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-muted-fg uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3 text-primary" />
                      Required Competencies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-border/70 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-muted-fg">
                    <span className="flex items-center gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      {problem.timelineWeeks}w Sprint
                    </span>
                    {problem.mentorshipAvailable && (
                      <span className="hidden sm:flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        AIIA Mentorship
                      </span>
                    )}
                  </div>

                  {/* Direct Action: Prominent Match with Profile button */}
                  <Link
                    href={`/matching?problemId=${problem.id}`}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-fg hover:opacity-90 font-bold transition-all flex items-center gap-1.5 shadow-sm hover:shadow"
                  >
                    <Cpu className="w-3.5 h-3.5" />
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
