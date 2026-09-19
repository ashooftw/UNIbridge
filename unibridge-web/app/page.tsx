"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, Building2, Cpu, GraduationCap, CheckCircle2, ShieldCheck, Layers, Award, BarChart3, ArrowUpRight, HeartPulse } from "lucide-react";

export default function LandingPage() {
  const [openStudentBenefit, setOpenStudentBenefit] = useState<number | null>(0);
  const [openDifferenceAccordion, setOpenDifferenceAccordion] = useState<boolean>(true);
  const [activeTabRole, setActiveTabRole] = useState<"STUDENT" | "FACULTY" | "INDUSTRY">("STUDENT");

  const studentBenefits = [
    {
      title: "Real-World Operational Constraints in Ayush & Health Tech",
      desc: "Work on authentic challenges like botanical herb adulteration detection, ABDM FHIR clinical data interoperability, and fermentation IoT telemetry rather than synthetic textbook assignments.",
    },
    {
      title: "Verifiable Digital Portfolios & Accredited Internship Placement",
      desc: "Graduate with immutable, industry-endorsed cryptographic credentials showcasing code reviews, capstone credit validation, and direct Pre-Placement Offers (PPOs).",
    },
    {
      title: "Curriculum-Aligned Credit Earning under NEP 2020",
      desc: "Tackle real engineering problems across Ayush Informatics, Computer Vision, and Embedded IoT during semesters 3-7 to earn 3-4 degree credits.",
    },
    {
      title: "Direct Mentorship from Ayush & Corporate R&D Leads",
      desc: "Build direct technical relationships with senior scientists at AIIA, Dabur R&D, Baidyanath, and Ministry of Ayush Digital Health Mission.",
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Banner */}
      <section className="relative pt-12 pb-16 border-b border-border bg-gradient-to-b from-background via-card/40 to-background overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/25">
              <Sparkles className="w-3.5 h-3.5" />
              SIH 2026 Problem Statement 26044
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <HeartPulse className="w-3.5 h-3.5" />
              Ministry of Ayush & All India Institute of Ayurveda (AIIA)
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground max-w-4xl mx-auto">
            Bridge Academia & Industry for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-amber-500">
              Skill Mapping, Internships & Placements
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-fg max-w-2xl mx-auto leading-relaxed">
            UniBridge operationalizes NEP 2020 by connecting university course learning outcomes with real operational challenges from the Ministry of Ayush, AIIA, and Indian R&D partners.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/repository"
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-primary text-primary-fg hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <span>Explore Ayush & Industry Repository</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/matching"
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-card border border-border text-foreground hover:bg-muted transition-all flex items-center gap-2 shadow-sm"
            >
              <Cpu className="w-4 h-4 text-primary" />
              <span>Launch AI Match Engine</span>
            </Link>
            <Link
              href="/pipeline"
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Placement Pipeline</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Tri-Partite Portal Role Architecture Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Tri-Partite Portal Architecture (PS 26044)
          </h2>
          <p className="text-xs sm:text-sm text-muted-fg max-w-2xl mx-auto">
            Tailored interfaces for Students, Academicians, and Industry Partners to close the university-industry skill gap.
          </p>
        </div>

        {/* Role Tab Switcher Buttons */}
        <div className="flex justify-center border-b border-border max-w-md mx-auto p-1 bg-card rounded-2xl border">
          <button
            onClick={() => setActiveTabRole("STUDENT")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTabRole === "STUDENT"
                ? "bg-primary text-primary-fg shadow"
                : "text-muted-fg hover:text-foreground"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student</span>
          </button>
          <button
            onClick={() => setActiveTabRole("FACULTY")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTabRole === "FACULTY"
                ? "bg-primary text-primary-fg shadow"
                : "text-muted-fg hover:text-foreground"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Academician</span>
          </button>
          <button
            onClick={() => setActiveTabRole("INDUSTRY")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTabRole === "INDUSTRY"
                ? "bg-primary text-primary-fg shadow"
                : "text-muted-fg hover:text-foreground"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Industry</span>
          </button>
        </div>

        {/* Role Detail Banner */}
        <div className="p-8 rounded-3xl bg-card border border-border shadow-md space-y-6">
          {activeTabRole === "STUDENT" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="text-base font-bold text-foreground">Skill Mapping & Matching</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Map your course credits and personal skills against live R&D challenges from Ministry of Ayush & AIIA.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="text-base font-bold text-foreground">Capstone & Internship Applications</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Claim problem statements for NEP degree capstones with dedicated corporate R&D mentorship.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="text-base font-bold text-foreground">Verified Portfolio & PPO Pipeline</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Convert evaluated capstone projects into accredited internships and direct corporate job offers.
                </p>
              </div>
            </div>
          )}

          {activeTabRole === "FACULTY" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="text-base font-bold text-foreground">Curriculum Telemetry Stream</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Receive empirical feedback on missing tools, libraries, and standards across student submissions.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="text-base font-bold text-foreground">Syllabus-to-Industry Alignment</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Present data-driven curriculum recommendations to university Boards of Studies every academic year.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="text-base font-bold text-foreground">Joint Capstone Mentorship</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Co-guide capstone projects alongside industry engineers for academic-industry knowledge transfer.
                </p>
              </div>
            </div>
          )}

          {activeTabRole === "INDUSTRY" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="text-base font-bold text-foreground">Post Operational Challenges</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Publish real industry bottlenecks with exact skill prerequisites, timelines, and dataset access.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="text-base font-bold text-foreground">Skill Matrix Verification</h4>
                <p className="text-xs text-muted-fg leading-relaxed">
                  Review student AI match scores and skill gap analyses before assigning capstone sponsorships.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="text-base font-bold text-foreground">Direct Placement Pipeline</h4>
                <p className="text-xs text-muted-flow leading-relaxed">
                  Convert top-performing capstone students directly into paid interns and accredited PPO candidates.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Three Pillar Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-primary/50 transition-all card-hover">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Pillar 1: Industry & Ayush Repository
            </h3>
            <p className="text-xs text-muted-fg leading-relaxed">
              Ministry of Ayush, AIIA, Dabur, & Baidyanath post operational R&D challenges with skill requirements and target deliverables.
            </p>
            <Link href="/repository" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
              <span>Browse Ayush Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-primary/50 transition-all card-hover">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Pillar 2: AI Match Engine & Skill Gap
            </h3>
            <p className="text-xs text-muted-fg leading-relaxed">
              FastAPI engine uses <code className="px-1 rounded bg-muted text-[10px]">all-MiniLM-L6-v2</code> sentence-transformers to calculate match scores and skill gap breakdowns.
            </p>
            <Link href="/matching" className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
              <span>Test AI Match Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-primary/50 transition-all card-hover">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Pillar 3: Curriculum Telemetry & PPO
            </h3>
            <p className="text-xs text-muted-fg leading-relaxed">
              Empirical feedback notes stream to Academic Boards of Studies while evaluated capstones convert into accredited internships and PPOs.
            </p>
            <Link href="/telemetry" className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
              <span>View Telemetry Stream</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Interactive Accordions (FAQ Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Module A */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-foreground text-center">
            How Does This Benefit a Student Learner?
          </h2>

          <div className="space-y-3">
            {studentBenefits.map((item, index) => {
              const isOpen = openStudentBenefit === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-card border border-border overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenStudentBenefit(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-bold text-foreground">{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-fg transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs text-muted-fg leading-relaxed border-t border-border/40 bg-muted/20">
                      {item.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Module B */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-card border border-border shadow-md space-y-4">
          <button
            onClick={() => setOpenDifferenceAccordion(!openDifferenceAccordion)}
            className="w-full text-left flex items-center justify-between gap-4 focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <h3 className="text-base font-bold text-foreground">
                What Makes UniBridge Different from a Normal Internship Job Board?
              </h3>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-muted-fg transition-transform duration-200 ${
                openDifferenceAccordion ? "rotate-180 text-amber-500" : ""
              }`}
            />
          </button>

          {openDifferenceAccordion && (
            <div className="text-xs text-muted-fg space-y-3 leading-relaxed border-t border-border/50 pt-4">
              <p>
                Standard job portals only list listings for existing graduates. UniBridge integrates directly into ongoing university degree coursework (Semesters 3–7) under NEP 2020 guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                <li>Translates raw industrial problems into NEP capstone credit deliverables.</li>
                <li>Uses vector NLP AI matching to evaluate curriculum alignment before enrollment.</li>
                <li>Feeds skill deficit telemetry back to university syllabus committees for continuous modernization.</li>
                <li>Provides verifiable cryptographic proof of student code evaluation for direct campus placement.</li>
              </ul>
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
