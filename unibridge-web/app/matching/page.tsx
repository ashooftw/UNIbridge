"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Cpu,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Building2,
  ArrowRight,
  RefreshCw,
  Award,
  Layers,
  Zap,
  AlertTriangle,
  ShieldCheck,
  Download,
  Check,
  XCircle,
  Plus,
  X,
  AlertCircle,
  Tag,
} from "lucide-react";

function SVGScoreGauge({ score }: { score: number }) {
  const radius = 52;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  let gaugeColorClass = "text-emerald-500 stroke-emerald-500";
  let labelText = "Direct NEP Credit Alignment";
  let badgeClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

  if (score < 50) {
    gaugeColorClass = "text-indigo-500 stroke-indigo-500";
    labelText = "Elective R&D Track";
    badgeClass = "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
  } else if (score < 75) {
    gaugeColorClass = "text-amber-500 stroke-amber-500";
    labelText = "Mandatory Internship Alignment";
    badgeClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-card border border-border shadow-md">
      {/* SVG Radial Gauge */}
      <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="stroke-muted"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={`${gaugeColorClass} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black tracking-tight text-foreground">{score}%</span>
          <span className="text-[10px] uppercase font-extrabold text-muted-fg tracking-wider">Match Score</span>
        </div>
      </div>

      <div className="space-y-2 text-center sm:text-left">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
          <Award className="w-3.5 h-3.5" />
          <span>{labelText}</span>
        </div>
        <h3 className="text-lg font-bold text-foreground">
          {score >= 75 ? "Direct NEP 2020 Capstone Credit Approved" : score >= 50 ? "Internship Credit Pipeline Recommended" : "Elective R&D / Course Pre-requisite Needed"}
        </h3>
        <p className="text-xs text-muted-fg leading-relaxed max-w-md">
          Calculated via 384-dimensional cosine similarity across Ministry of Ayush project specs and student skill vector space.
        </p>
      </div>
    </div>
  );
}

function MatchingContent() {
  const searchParams = useSearchParams();
  const queryProblemId = searchParams.get("problemId");

  const [problems, setProblems] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  
  // Interactive Student Skill Drawer State
  const [studentSkills, setStudentSkills] = useState<string[]>([
    "Python",
    "PyTorch",
    "C++",
    "Next.js",
    "PostgreSQL",
    "OpenCV",
  ]);
  const [newSkillInput, setNewSkillInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [probRes, courseRes] = await Promise.all([
        fetch("/api/problems"),
        fetch("/api/courses"),
      ]);

      const probData = await probRes.json();
      const courseData = await courseRes.json();

      if (probData.success && probData.data.length > 0) {
        setProblems(probData.data);
        const targetProbId =
          queryProblemId && probData.data.some((p: any) => p.id === queryProblemId)
            ? queryProblemId
            : probData.data[0].id;
        setSelectedProblemId(targetProbId);

        if (courseData.success && courseData.data.length > 0) {
          setCourses(courseData.data);
          setSelectedCourseId(courseData.data[0].id);
          runMatching(targetProbId, courseData.data[0].id, studentSkills);
        }
      }
    } catch (err) {
      console.error("Failed to load matching data:", err);
    }
  };

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (trimmed && !studentSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...studentSkills, trimmed];
      setStudentSkills(updated);
      setNewSkillInput("");
      if (selectedProblemId && selectedCourseId) {
        runMatching(selectedProblemId, selectedCourseId, updated);
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = studentSkills.filter((s) => s !== skillToRemove);
    setStudentSkills(updated);
    if (selectedProblemId && selectedCourseId) {
      runMatching(selectedProblemId, selectedCourseId, updated);
    }
  };

  const runMatching = async (problemId: string, courseId: string, skillsArray?: string[]) => {
    setLoading(true);
    const targetSkills = skillsArray || studentSkills;

    // Simulate 1-second pulse calculation experience if network response is fast
    const startTime = Date.now();
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId,
          courseId,
          studentSkills: targetSkills,
        }),
      });
      const json = await res.json();
      
      const elapsed = Date.now() - startTime;
      const minWait = 1000;
      if (elapsed < minWait) {
        await new Promise((r) => setTimeout(r, minWait - elapsed));
      }

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
      {/* Header Banner */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
          <Cpu className="w-4 h-4 text-primary" />
          AI Multi-Dimensional Matching Engine (PS 26044)
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Ayush & AIIA Academic Alignment Workspace
        </h1>
        <p className="text-sm text-muted-fg max-w-3xl leading-relaxed">
          Vectorizes Ayush industry problem specifications into 384-dimensional space using{" "}
          <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs font-mono">
            sentence-transformers/all-MiniLM-L6-v2
          </code>{" "}
          to compute credit alignment, skill-gap matrices, and curriculum feedback for university Board of Studies.
        </p>
      </div>

      {/* Two-Column Split Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Card Selector for Problem Statements */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <label className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-primary" />
                1. Select Industry Problem Challenge
              </label>
              <span className="text-[11px] font-semibold text-muted-fg">
                {problems.length} Challenges Available
              </span>
            </div>

            {/* Problem Selector Dropdown / Cards */}
            <div className="space-y-3">
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
                    [{p.difficulty}] {p.companyName}: {p.title}
                  </option>
                ))}
              </select>

              {activeProblem && (
                <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-foreground">{activeProblem.title}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        activeProblem.difficulty === "BEGINNER"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : activeProblem.difficulty === "ADVANCED"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {activeProblem.difficulty}
                    </span>
                  </div>

                  <div className="text-xs text-primary font-bold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Sponsor: {activeProblem.companyName}</span>
                  </div>

                  <p className="text-xs text-muted-fg leading-relaxed">
                    {activeProblem.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-muted-fg uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3 text-primary" />
                      Target Required Skills:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProblem.requiredSkills.split(",").map((s: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary"
                        >
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Course Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider border-b border-border pb-3">
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
                    {c.department} - {c.courseName} (Sem {c.semester})
                  </option>
                ))}
              </select>

              {activeCourse && (
                <div className="p-4 rounded-xl bg-muted/40 border border-border/80 text-xs space-y-2">
                  <div className="font-bold text-foreground">{activeCourse.courseName}</div>
                  <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                    Department: {activeCourse.department} (Semester {activeCourse.semester})
                  </div>
                  <p className="text-muted-fg leading-relaxed">
                    {activeCourse.learningOutcomes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Student Skill Drawer & Match Engine */}
        <div className="lg:col-span-6 space-y-6">
          {/* Interactive Skill Drawer Container */}
          <div className="rounded-2xl bg-card border border-border p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <label className="text-xs font-bold text-foreground flex items-center gap-2 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-amber-500" />
                3. Student Learner Skill Inventory Drawer
              </label>
              <span className="text-[11px] font-semibold text-muted-fg">
                {studentSkills.length} Skills Added
              </span>
            </div>

            {/* Input Pill to add custom skills on the fly */}
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Add custom skill (e.g. Docker, ROS2, FHIR)..."
                  className="w-full pl-3.5 pr-4 py-2 rounded-xl bg-background border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </form>

            {/* Dismissible Skill Chips Drawer */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-muted-fg uppercase tracking-wider">
                Active Candidate Skills (Click × to remove):
              </div>
              <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-muted/30 border border-border/80 min-h-[70px]">
                {studentSkills.length > 0 ? (
                  studentSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-foreground text-xs font-semibold shadow-sm hover:border-rose-400 transition-all group"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-muted-fg group-hover:text-rose-500 transition-colors p-0.5 rounded-full hover:bg-rose-500/10"
                        title={`Remove ${skill}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-fg font-medium italic">
                    No skills added yet. Use the input field above to add skills.
                  </span>
                )}
              </div>
            </div>

            {/* Calculate Alignment CTA */}
            <button
              onClick={() => runMatching(selectedProblemId, selectedCourseId)}
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Zap className="w-4 h-4" />
              <span>
                {loading
                  ? "Vectorizing Competencies into 384-dimensional Space..."
                  : "Calculate Academic & Skill Alignment"}
              </span>
            </button>
          </div>

          {/* Interactive Loading State */}
          {loading ? (
            <div className="p-10 text-center rounded-2xl bg-card border border-border space-y-4 pulse-glow">
              <RefreshCw className="w-9 h-9 text-primary animate-spin mx-auto" />
              <div className="space-y-1">
                <div className="text-sm font-bold text-foreground">
                  Vectorizing competencies into 384-dimensional space...
                </div>
                <div className="text-xs text-muted-fg font-mono">
                  Running PyTorch cosine similarity matrix across Ayush requirements & student chips
                </div>
              </div>
            </div>
          ) : matchResult ? (
            <div className="space-y-6">
              {/* Score SVG Gauge */}
              <SVGScoreGauge score={matchResult.match_score} />

              {/* Dynamic Skill-Gap Chips (Possessed vs Missing Target Skills) */}
              {matchResult.skill_gap_analysis && (
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-5">
                  <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between border-b border-border pb-3">
                    <span>Curriculum Skill Matrix Breakdown</span>
                    <span className="text-[11px] text-muted-fg font-normal">NEP 2020 Credit Audit</span>
                  </div>

                  <div className="space-y-4">
                    {/* Possessed Skills (Green badges with checkmark ✓) */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>
                          Possessed Student Skills ({matchResult.skill_gap_analysis.possessed?.length || 0}):
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.skill_gap_analysis.possessed &&
                        matchResult.skill_gap_analysis.possessed.length > 0 ? (
                          matchResult.skill_gap_analysis.possessed.map((skill: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold"
                            >
                              <Check className="w-3 h-3" />
                              <span>{skill}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-fg italic">No matching skills detected.</span>
                        )}
                      </div>
                    </div>

                    {/* Missing Target Skills (Soft rose badges with dashed borders & alert icons) */}
                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          Missing Target Skills - Curriculum Delta ({matchResult.skill_gap_analysis.missing?.length || 0}):
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.skill_gap_analysis.missing &&
                        matchResult.skill_gap_analysis.missing.length > 0 ? (
                          matchResult.skill_gap_analysis.missing.map((skill: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-dashed border-rose-400 dark:border-rose-500/50 text-xs font-semibold"
                            >
                              <AlertCircle className="w-3 h-3" />
                              <span>{skill}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Zero Skill Deficits! Student fully meets Ayush project requirements.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Algorithmic Vector Reasoning */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Algorithmic Vector Reasoning
                </div>
                <p className="text-xs text-muted-fg leading-relaxed bg-muted/40 p-3.5 rounded-xl border border-border/50 font-medium">
                  {matchResult.reasoning}
                </p>
              </div>

              {/* Academician Telemetry Feed */}
              {matchResult.academician_telemetry_note && (
                <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                  <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Automated Telemetry Note for College Board of Studies:
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {matchResult.academician_telemetry_note}
                  </p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AIIA & Ayush Accredited Match Result</span>
                </div>
                <button className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-2 shadow-md">
                  <span>Claim for Degree Capstone</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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
    <Suspense
      fallback={
        <div className="p-12 text-center text-sm font-bold text-muted-fg">
          Loading AI Matching Engine Workspace...
        </div>
      }
    >
      <MatchingContent />
    </Suspense>
  );
}

