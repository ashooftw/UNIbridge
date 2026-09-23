"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Zap,
  CheckCircle2,
  Cpu,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  X,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  Building2,
  ShieldCheck,
  Check,
  UserCheck,
} from "lucide-react";

interface AutomationDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StepDetails {
  title?: string;
  sponsor?: string;
  difficulty?: string;
  requiredSkills?: string[];
  deliverable?: string;
  courseCode?: string;
  courseName?: string;
  department?: string;
  learningOutcomes?: string;
  prerequisites?: string[];
  matchScore?: number;
  classification?: string;
  statusTag?: string;
  reasoning?: string;
  possessed?: string[];
  missing?: string[];
  gapNote?: string;
  targetBoard?: string;
  telemetryAlert?: string;
  status?: string;
  candidateName?: string;
  studentEmail?: string;
  company?: string;
  credits?: string;
  hash?: string;
}

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  details: StepDetails;
}

const DEMO_STEPS: Step[] = [
  {
    id: 1,
    title: "1. Select Ayush Operational Challenge",
    subtitle: "Ministry of Ayush & AIIA Industry Challenge Ingestion",
    icon: Building2,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    details: {
      title: "Computer Vision Botanical Adulteration & Raw Herb Authentication",
      sponsor: "All India Institute of Ayurveda & Dabur R&D",
      difficulty: "ADVANCED",
      requiredSkills: ["Python", "PyTorch", "OpenCV", "Spectral Imaging", "ResNet"],
      deliverable: "Herb authentication model checkpoint, spectral image preprocessing pipeline",
    },
  },
  {
    id: 2,
    title: "2. Vectorize Course Syllabus CS308",
    subtitle: "384-dimensional Embedding Vector Mapping",
    icon: BookOpen,
    color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    details: {
      courseCode: "CS308",
      courseName: "CS308: Applied Computer Vision & Botanical Pattern Recognition",
      department: "Computer Science & AI (Semester 6)",
      learningOutcomes: "Train deep convolutional neural networks for botanical sample authentication; Preprocess imaging data for herbal adulteration detection.",
      prerequisites: ["Python", "PyTorch", "OpenCV"],
    },
  },
  {
    id: 3,
    title: "3. AI Alignment Engine Execution",
    subtitle: "PyTorch Cosine Similarity & NEP Credit Calculation",
    icon: Cpu,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    details: {
      matchScore: 88.0,
      classification: "Direct NEP Credit Alignment (4 Credits Approved)",
      statusTag: "Capstone Accreditation Passed",
      reasoning: "High semantic correlation (88.0%). Directly satisfies core degree capstone & Ayush industry outcome requirements.",
    },
  },
  {
    id: 4,
    title: "4. Dynamic Skill-Gap Matrix Analysis",
    subtitle: "Possessed Competencies vs Missing Target Skills",
    icon: Layers,
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    details: {
      possessed: ["Python", "PyTorch", "OpenCV"],
      missing: ["Spectral Imaging", "ResNet Architecture"],
      gapNote: "2 skill deficits identified. Student possesses core computer vision foundations but lacks hyperspectral image preprocessing experience.",
    },
  },
  {
    id: 5,
    title: "5. Board of Studies Curriculum Telemetry",
    subtitle: "Automated Feedback to Academic Revision Committee",
    icon: AlertTriangle,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    details: {
      targetBoard: "Computer Science & AI Board of Studies",
      telemetryAlert: "Board of Studies: Update CS308 syllabus to incorporate Spectral Imaging and PyTorch ResNet transfer learning modules.",
      status: "TELEMETRY_DISPATCHED",
    },
  },
  {
    id: 6,
    title: "6. Candidate Placement & PPO Issuance",
    subtitle: "Direct Transition to Corporate Placement Pipeline",
    icon: Award,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    details: {
      candidateName: "Aarav Sharma",
      studentEmail: "aarav.sharma@ayush.edu.in",
      company: "All India Institute of Ayurveda & Dabur R&D",
      status: "PPO ISSUED",
      credits: "4 NEP Credits (A+ Grade)",
      hash: "0x8F92A7C1E4B920A4DF1200A19842C3",
    },
  },
];

export function AutomationDemoModal({ isOpen, onClose }: AutomationDemoModalProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Defined as a module-level constant (below) to avoid recreation on every render.
  const steps = DEMO_STEPS;



  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && isPlaying && activeStep < DEMO_STEPS.length - 1) {
      timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, activeStep]);

  if (!isOpen) return null;

  const currentStepData = steps[activeStep];
  const CurrentIcon = currentStepData.icon;

  const handleGoToTelemetry = () => {
    onClose();
    router.push("/telemetry");
  };

  const handleGoToPipeline = () => {
    onClose();
    router.push("/pipeline");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-muted-fg hover:text-foreground hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              <Zap className="w-3.5 h-3.5" />
              SIH 2026 PS 26044 • Automated End-to-End Pipeline
            </div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              1-Click Automated AI Match & Placement Walkthrough
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-muted border border-border text-foreground hover:bg-muted/80 transition-all flex items-center gap-1.5"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pause Demo</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Play Demo</span>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveStep(0)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-muted border border-border text-foreground hover:bg-muted/80 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-primary" />
              <span>Restart</span>
            </button>
          </div>
        </div>

        {/* 6-Step Stepper Progress Bar */}
        <div className="grid grid-cols-6 gap-1.5">
          {steps.map((s, idx) => {
            const isCompleted = idx < activeStep;
            const isCurrent = idx === activeStep;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-primary ring-2 ring-primary/40 shadow-sm"
                    : isCompleted
                    ? "bg-emerald-500"
                    : "bg-muted"
                }`}
                title={s.title}
              />
            );
          })}
        </div>

        {/* Step Indicator Row */}
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-primary uppercase tracking-wider">
            Step {activeStep + 1} of {steps.length}
          </span>
          <span className="text-muted-fg font-semibold">{currentStepData.subtitle}</span>
        </div>

        {/* Main Animated Card */}
        <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-6 relative overflow-hidden transition-all duration-300">
          
          {/* Card Top Title Banner */}
          <div className="flex items-center gap-3 border-b border-border/80 pb-4">
            <div className={`p-3 rounded-2xl border ${currentStepData.color} shrink-0`}>
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{currentStepData.title}</h3>
              <p className="text-xs text-muted-fg">{currentStepData.subtitle}</p>
            </div>
          </div>

          {/* Dynamic Content Views based on activeStep */}
          {activeStep === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    Sponsor: {currentStepData.details.sponsor}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    {currentStepData.details.difficulty}
                  </span>
                </div>
                <div className="text-base font-bold text-foreground">
                  {currentStepData.details.title}
                </div>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Deep learning spectral pattern recognition & computer vision models to authenticate raw Ayurvedic botanical herbs and detect microscopic adulterants.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-fg uppercase tracking-wider">
                  Target Required Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStepData.details.requiredSkills?.map((sk: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-semibold"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  {currentStepData.details.department}
                </div>
                <div className="text-base font-bold text-foreground">
                  {currentStepData.details.courseName}
                </div>
                <p className="text-xs text-muted-fg leading-relaxed">
                  {currentStepData.details.learningOutcomes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-foreground font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-500 animate-pulse" />
                <span>Generating 384-dimensional dense vector embeddings via sentence-transformers/all-MiniLM-L6-v2...</span>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-card border border-border">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" className="stroke-muted" strokeWidth="10" fill="transparent" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className="stroke-emerald-500 text-emerald-500 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 50}
                      strokeDashoffset={2 * Math.PI * 50 * (1 - 0.88)}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-foreground">88%</span>
                    <span className="text-[9px] uppercase font-extrabold text-muted-fg">Match Score</span>
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <Award className="w-3.5 h-3.5" />
                    <span>{currentStepData.details.classification}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">
                    Direct NEP 2020 Capstone Credit Approved
                  </h4>
                  <p className="text-xs text-muted-fg leading-relaxed">
                    {currentStepData.details.reasoning}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-4 rounded-xl bg-card border border-border space-y-3">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Possessed Student Skills (3):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentStepData.details.possessed?.map((s: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-3">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Missing Target Skills - Curriculum Delta (2):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentStepData.details.missing?.map((s: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-dashed border-rose-400 text-xs font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-fg font-medium pt-1">
                  {currentStepData.details.gapNote}
                </p>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    {currentStepData.details.targetBoard}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    STATUS: DISPATCHED
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-card border border-border text-xs font-bold text-foreground leading-relaxed">
                  📢 &quot;{currentStepData.details.telemetryAlert}&quot;
                </div>

                <p className="text-xs text-muted-fg leading-relaxed">
                  This empirical telemetry note is automatically broadcasted to `/telemetry` for the Department Board of Studies syllabus committee review.
                </p>

                <button
                  onClick={handleGoToTelemetry}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-all flex items-center gap-1.5"
                >
                  <span>View in Telemetry Stream</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 5 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <ShieldCheck className="w-5 h-5" />
                    Verified Placement Offer Granted
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 shadow-sm animate-bounce">
                    ★ PPO ISSUED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-fg block">Candidate Student:</span>
                    <span className="font-bold text-foreground text-sm">{currentStepData.details.candidateName}</span>
                    <div className="text-muted-fg font-mono">{currentStepData.details.studentEmail}</div>
                  </div>
                  <div>
                    <span className="text-muted-fg block">Sponsoring Enterprise:</span>
                    <span className="font-bold text-primary text-sm">{currentStepData.details.company}</span>
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold">{currentStepData.details.credits}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border font-mono text-[11px] text-foreground flex items-center justify-between">
                  <span className="text-muted-fg font-sans font-semibold">Verification Hash:</span>
                  <span className="font-bold text-primary">{currentStepData.details.hash}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleGoToPipeline}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>View Candidate in Placement Pipeline</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            onClick={() => {
              if (activeStep > 0) setActiveStep(activeStep - 1);
            }}
            disabled={activeStep === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-muted border border-border text-foreground hover:bg-muted/80 disabled:opacity-40 transition-all"
          >
            Previous Step
          </button>

          <div className="flex items-center gap-3">
            {activeStep < steps.length - 1 ? (
              <button
                onClick={() => {
                  setActiveStep(activeStep + 1);
                  setIsPlaying(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Next Automated Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGoToPipeline}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Walkthrough & Open Pipeline</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
