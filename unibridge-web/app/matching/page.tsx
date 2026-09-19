"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Cpu, BookOpen, CheckCircle2, Sparkles, Building2, ArrowRight, RefreshCw, Award, Layers, Zap, AlertTriangle, ShieldCheck, Download, Check, XCircle } from "lucide-react";

function MatchingContent() {
  const searchParams = useSearchParams();
  const queryProblemId = searchParams.get("problemId");

  const [problems, setProblems] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [studentSkillsInput, setStudentSkillsInput] = useState<string>("Python, PyTorch, C++, Next.js, PostgreSQL");
  const [loading, setLoading] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [probRes, courseRes] = await Promise.all([
        fetch("/api/problems"),
        fetch("/api/courses")
      ]);

      const probData = await probRes.json();
      const courseData = await courseRes.json();

      if (probData.success && probData.data.length > 0) {
        setProblems(probData.data);
        const targetProbId = (queryProblemId && probData.data.some((p: any) => p.id === queryProblemId))
          ? queryProblemId
          : probData.data[0].id;
        setSelectedProblemId(targetProbId);

        if (courseData.success && courseData.data.length > 0) {
          setCourses(courseData.data);
          setSelectedCourseId(courseData.data[0].id);
          runMatching(targetProbId, courseData.data[0].id, "Python, PyTorch, C++, Next.js, PostgreSQL");
        }
      }
    } catch (err) {
      console.error("Failed to load matching data:", err);
    }
  };

  const runMatching = async (problemId: string, courseId: string, customSkills?: string) => {
    setLoading(true);
    try {
      const skillsArr = (customSkills || studentSkillsInput).split(",").map((s) => s.trim()).filter(Boolean);

      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId,
          courseId,
          studentSkills: skillsArr,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setMatchResult(json);
      }
    } catch (err) {
      console.error("Match calculation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const activeProblem = problems.find((p) => p.id === selectedProblemId);
  const activeCourse = courses.find((c) => c.id === selectedCourseId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
          <Cpu className="w-4 h-4" />
          Pillar 2 AI Multi-Dimensional Matching Engine
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Ayush & AIIA Academic Match Workspace (PS 26044)
        </h1>
        <p className="text-sm text-muted-fg max-w-3xl">
          Powered by Python FastAPI with <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs font-mono">sentence-transformers/all-MiniLM-L6-v2</code>. Vectorizes Ayush problem specifications, calculates credit alignment, skill gap matrices, and empirical feedback for syllabus committees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Selection Controls */}
        <div className="lg:col-span-5 space-y-6 rounded-2xl bg-card border border-border p-6 shadow-sm">
          
          {/* Problem Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              1. Select Ayush / Industry Problem Statement
            </label>
            <select
              value={selectedProblemId}
              onChange={(e) => {
                setSelectedProblemId(e.target.value);
                if (selectedCourseId) runMatching(e.target.value, selectedCourseId);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {problems.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.companyName}: {p.title}
                </option>
              ))}
            </select>
          </div>

          {activeProblem && (
            <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-xs space-y-2">
              <div className="font-bold text-foreground">{activeProblem.title}</div>
              <p className="text-muted-fg leading-relaxed line-clamp-3">
                {activeProblem.description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {activeProblem.requiredSkills.split(",").map((s: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Course Selector */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-foreground flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-500" />
              2. Select University Course Outcome Module
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                if (selectedProblemId) runMatching(selectedProblemId, e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.courseName}
                </option>
              ))}
            </select>
          </div>

          {activeCourse && (
            <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-xs space-y-2">
              <div className="font-bold text-foreground">{activeCourse.courseName}</div>
              <div className="text-[11px] text-primary font-semibold">
                Department: {activeCourse.department} (Semester {activeCourse.semester})
              </div>
              <p className="text-muted-fg leading-relaxed">
                {activeCourse.learningOutcomes}
              </p>
            </div>
          )}

          {/* Student Skills Input */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-foreground flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              3. Student Learner Skill Inventory (Comma-separated)
            </label>
            <input
              type="text"
              value={studentSkillsInput}
              onChange={(e) => setStudentSkillsInput(e.target.value)}
              placeholder="e.g. Python, PyTorch, C++, MQTT"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Trigger Button */}
          <button
            onClick={() => runMatching(selectedProblemId, selectedCourseId)}
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Zap className="w-4 h-4" />
            <span>{loading ? "Encoding Sentence Vectors & Skill Gap Matrix..." : "Calculate Academic & Skill Alignment"}</span>
          </button>

        </div>

        {/* Right Column: AI Live Result Display */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-foreground">
                AI Match Matrix & Telemetry Output
              </h2>
            </div>
            {matchResult?.engine && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                {matchResult.engine}
              </span>
            )}
          </div>

          {loading ? (
            <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-3">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
              <div className="text-sm font-bold text-foreground">Vectorizing 384-dimensional Sentence Embeddings...</div>
              <div className="text-xs text-muted-fg">FastAPI sentence-transformers performing skill matrix cross-multiplication</div>
            </div>
          ) : matchResult ? (
            <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-6">
              
              {/* Score & Classification Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">
                    Curriculum Credit Classification (NEP 2020)
                  </span>
                  <div className="text-base font-extrabold text-foreground leading-snug">
                    {matchResult.classification}
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/25 text-primary self-start sm:self-auto shrink-0">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-black">{matchResult.match_score}%</span>
                </div>
              </div>

              {/* Match Score Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-muted-fg">
                  <span>Semantic Vector Cosine Similarity</span>
                  <span className="text-primary">{matchResult.match_score}% / 100%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(matchResult.match_score, 100)}%` }}
                  />
                </div>
              </div>

              {/* Reasoning */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Algorithmic Vector Reasoning:
                </div>
                <p className="text-xs text-muted-fg leading-relaxed bg-muted/30 p-3.5 rounded-xl border border-border/50 font-medium">
                  {matchResult.reasoning}
                </p>
              </div>

              {/* Skill Gap Analysis Section (Part 4 requirement) */}
              {matchResult.skill_gap_analysis && (
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-3">
                  <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Student Skill Gap Analysis (vs Ayush R&D Partner)</span>
                    <span className="text-[10px] text-muted-fg font-normal">Empirical Skill Matrix</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Possessed Skills */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Possessed Student Skills ({matchResult.skill_gap_analysis.possessed?.length || 0}):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.skill_gap_analysis.possessed && matchResult.skill_gap_analysis.possessed.length > 0 ? (
                          matchResult.skill_gap_analysis.possessed.map((skill: string, idx: number) => (
                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-fg font-medium">No matching skills detected.</span>
                        )}
                      </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Missing Target Skills ({matchResult.skill_gap_analysis.missing?.length || 0}):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.skill_gap_analysis.missing && matchResult.skill_gap_analysis.missing.length > 0 ? (
                          matchResult.skill_gap_analysis.missing.map((skill: string, idx: number) => (
                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">0 Skill Deficits! Ready for R&D.</span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Academician Telemetry Note (Part 4 requirement) */}
              {matchResult.academician_telemetry_note && (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
                  <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Automated Empirical Telemetry Note for University Syllabus Committee:</span>
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {matchResult.academician_telemetry_note}
                  </p>
                </div>
              )}

              {/* Matched Outcomes */}
              {matchResult.matched_outcomes && matchResult.matched_outcomes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Matched UGC Course Learning Outcomes:
                  </div>
                  <div className="space-y-2">
                    {matchResult.matched_outcomes.map((outcome: string, i: number) => (
                      <div key={i} className="text-xs text-muted-fg flex items-start gap-2 bg-muted/40 p-3 rounded-xl border border-border/50 font-medium">
                        <span className="text-primary font-bold">•</span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions & Verified Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AIIA & Ayush Verified Credential Candidate</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Telemetry PDF</span>
                  </button>
                  <button className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm">
                    <span>Claim for Degree Capstone</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : null}

        </div>

      </div>

    </div>
  );
}

export default function MatchingPage() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center text-sm font-bold text-muted-fg">
        Loading AI Matching Engine Workspace...
      </div>
    }>
      <MatchingContent />
    </Suspense>
  );
}
