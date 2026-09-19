import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Building2, Cpu, Calendar, Tag, CheckCircle2, HeartPulse, PlusCircle, Search } from "lucide-react";

export const revalidate = 0;

interface RepositoryPageProps {
  searchParams?: { search?: string };
}

export default async function RepositoryPage({ searchParams }: RepositoryPageProps) {
  const query = searchParams?.search?.trim() || "";

  const allProblems = await prisma.problemStatement.findMany({
    orderBy: { createdAt: "desc" },
  });

  const problems = query
    ? allProblems.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.companyName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.requiredSkills.toLowerCase().includes(q) ||
          p.targetAudience.toLowerCase().includes(q)
        );
      })
    : allProblems;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <HeartPulse className="w-4 h-4 text-primary" />
            Ministry of Ayush & AIIA Industry Problem Repository
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Operational Ayush & R&D Challenges (PS 26044)
          </h1>
          <p className="text-sm text-muted-fg max-w-3xl">
            Real-world operational bottlenecks from Ministry of Ayush labs, All India Institute of Ayurveda, and corporate Ayush R&D partners.
          </p>
          {query && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Search className="w-3.5 h-3.5" />
              <span>Filter: &quot;{query}&quot; ({problems.length} results)</span>
              <Link href="/repository" className="hover:underline font-bold ml-1 text-xs">
                Clear
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/problems/new"
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Challenge</span>
        </Link>
      </div>

      {/* Challenge Grid */}
      {problems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-3">
          <Search className="w-8 h-8 text-muted-fg mx-auto" />
          <div className="text-base font-bold text-foreground">No matching challenges found</div>
          <p className="text-xs text-muted-fg max-w-sm mx-auto">
            Try adjusting your search query or clear the filter to view all Ayush & Industry problem statements.
          </p>
          <Link
            href="/repository"
            className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all"
          >
            Reset Filter
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem) => {
            const skillsList = problem.requiredSkills.split(",").map((s) => s.trim());
            
            const difficultyColors: Record<string, string> = {
              BEGINNER: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
              INTERMEDIATE: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
              ADVANCED: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
            };

            return (
              <div
                key={problem.id}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between hover:border-primary/50 transition-all card-hover space-y-4"
              >
                <div className="space-y-3">
                  
                  {/* Header info */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-primary">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span className="truncate max-w-[240px]">{problem.companyName}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${difficultyColors[problem.difficulty] || difficultyColors.INTERMEDIATE}`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    {problem.title}
                  </h3>

                  {/* Target Audience Pill */}
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-muted text-[11px] font-semibold text-muted-fg border border-border/60">
                    Target: {problem.targetAudience}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-fg leading-relaxed line-clamp-3">
                    {problem.description}
                  </p>

                  {/* Deliverables */}
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                    <div className="text-[11px] font-bold text-foreground">Target Engineering Deliverables:</div>
                    <div className="text-xs text-muted-fg leading-relaxed line-clamp-2">{problem.targetDeliverables}</div>
                  </div>

                  {/* Skills tags */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-muted-fg uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3 text-primary" />
                      Required Skill Matrices:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-border/70 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-muted-fg">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {problem.timelineWeeks}w Sprint
                    </span>
                    {problem.mentorshipAvailable && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        AIIA Mentorship
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/matching?problemId=${problem.id}`}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-fg hover:opacity-90 font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Test AI Match</span>
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
