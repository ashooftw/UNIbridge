"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import { AutomationDemoModal } from "@/components/AutomationDemoModal";

export default function LandingPage() {
  const [openStudentBenefit, setOpenStudentBenefit] = useState<number | null>(0);
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);
  const [activeTabRole, setActiveTabRole] = useState<"STUDENT" | "FACULTY" | "INDUSTRY">("STUDENT");

  const studentBenefits = [
    {
      title: "Real-World Engineering Challenges in Ayush & Industry",
      desc: "Work on authentic bottlenecks like herb quality computer vision, ABDM FHIR interoperability, and fermentation IoT telemetry rather than synthetic textbook assignments.",
    },
    {
      title: "Verifiable Portfolios & Accredited Placement Pipeline",
      desc: "Graduate with immutable, industry-endorsed credentials showcasing verified capstone code reviews, credit transfer, and direct Pre-Placement Offers (PPOs).",
    },
    {
      title: "Curriculum-Aligned Credit Earning under NEP 2020 & UGC NCrF",
      desc: "Tackle real industry problems during semesters 3–8 to satisfy capstone requirements and claim 3–4 NEP degree credits.",
    },
    {
      title: "Direct R&D Mentorship from Corporate Engineers",
      desc: "Build direct technical connections with senior scientists at AIIA, Dabur R&D, Baidyanath, and Ministry of Ayush Digital Health Mission.",
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#0b0f17] text-[#dfe2ee]">
      
      {/* 1. Hero Banner */}
      <section className="relative pt-10 pb-16 border-b border-[#222e40] bg-[#0b0f17] overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 left-1/4 w-[32rem] h-[32rem] rounded-full bg-emerald-950/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute -top-24 right-1/4 w-[30rem] h-[30rem] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono font-semibold rounded-full bg-[#161e2e] text-[#a3b18a] border border-[#222e40]">
              <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
              SIH 2026 Problem Statement 26044 • Ministry of Ayush & AIIA Platform
            </span>
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl mx-auto">
            From Academic Knowledge to Industry R&D Solutions with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#4edea3]">
              AI Curriculum Modernization
            </span>
          </h1>

          <p className="font-body text-sm sm:text-base text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
            UniBridge operationalizes NEP 2020 & UGC NCrF guidelines by linking university course outcomes directly with real-world enterprise & Ayush R&D bottlenecks through 384-dimensional sentence transformer embeddings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsDemoOpen(true)}
              className="btn-hover-lift px-6 py-3 rounded-lg font-bold text-xs sm:text-sm bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 transition-all shadow-[0_2px_14px_rgba(245,158,11,0.3)] flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>⚡ Run Automated PS 26044 Pipeline</span>
            </button>

            <Link
              href="/repository"
              className="btn-hover-lift px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm bg-[#161e2e] text-white border border-[#222e40] hover:border-[#f59e0b]/50 transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Explore Problem Repository</span>
              <ArrowRight className="w-4 h-4 text-[#f59e0b]" />
            </Link>
            
            <Link
              href="/matching"
              className="btn-hover-lift px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm bg-[#121824] border border-[#a3b18a]/40 text-[#a3b18a] hover:text-white transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
              <span>AI Match Engine</span>
            </Link>
          </div>

          {/* Platform Telemetry Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#222e40]/80">
            <div className="p-3 rounded-lg bg-[#121824] border border-[#222e40] text-center">
              <div className="font-mono text-2xl font-bold text-white">24+</div>
              <div className="font-mono text-[11px] text-[#94a3b8]">Verified MSME Challenges</div>
            </div>
            <div className="p-3 rounded-lg bg-[#121824] border border-[#222e40] text-center">
              <div className="font-mono text-2xl font-bold text-[#4edea3]">100%</div>
              <div className="font-mono text-[11px] text-[#94a3b8]">NEP 2020 & UGC Audited</div>
            </div>
            <div className="p-3 rounded-lg bg-[#121824] border border-[#222e40] text-center">
              <div className="font-mono text-2xl font-bold text-[#ffc174]">384D</div>
              <div className="font-mono text-[11px] text-[#94a3b8]">Vector Transformer Embeddings</div>
            </div>
            <div className="p-3 rounded-lg bg-[#121824] border border-[#222e40] text-center">
              <div className="font-mono text-2xl font-bold text-[#a3b18a]">142</div>
              <div className="font-mono text-[11px] text-[#94a3b8]">Active Capstone Fellowships</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Core 4-Pillar Platform Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-2.5 py-0.5 rounded bg-[#161e2e] text-[#a3b18a] border border-[#222e40] font-mono text-[11px] uppercase tracking-wider">
            Closed-Loop Platform Architecture
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white">
            The 4 Operational Pillars of UniBridge
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#94a3b8] max-w-2xl mx-auto">
            Connecting industry challenges with course outcome modules and automated board-of-studies telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <Link href="/repository" className="group p-6 rounded-xl bg-[#161e2e] border border-[#222e40] hover:border-[#f59e0b]/50 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-md">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#121824] border border-[#222e40] flex items-center justify-center text-[#f59e0b]">
                <span className="material-symbols-outlined text-[20px]">dataset</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-white group-hover:text-[#f59e0b] transition-colors">
                1. Industry Problem Repository
              </h3>
              <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                Curated MSME, Ayush, and enterprise bottlenecks with dataset access flags, target deliverables, and required skill matrices.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#f59e0b] flex items-center gap-1 font-semibold">
              <span>Explore 24 Challenges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Pillar 2 */}
          <Link href="/matching" className="group p-6 rounded-xl bg-[#161e2e] border border-[#222e40] hover:border-[#a3b18a]/50 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-md">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#121824] border border-[#222e40] flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-white group-hover:text-[#4edea3] transition-colors">
                2. AI Academic Matcher
              </h3>
              <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                PyTorch transformer vector engine calculating cosine alignment between problem statements and course outcomes.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#4edea3] flex items-center gap-1 font-semibold">
              <span>Launch Match Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Pillar 3 */}
          <Link href="/telemetry" className="group p-6 rounded-xl bg-[#161e2e] border border-[#222e40] hover:border-[#588157]/60 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-md">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#121824] border border-[#222e40] flex items-center justify-center text-[#a3b18a]">
                <span className="material-symbols-outlined text-[20px]">radar</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-white group-hover:text-[#a3b18a] transition-colors">
                3. BoS Skill Telemetry
              </h3>
              <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                Empirical deficit analytics flagging syllabus gaps to University Boards of Studies for annual curriculum modernization.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#a3b18a] flex items-center gap-1 font-semibold">
              <span>View Radar Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Pillar 4 */}
          <Link href="/pipeline" className="group p-6 rounded-xl bg-[#161e2e] border border-[#222e40] hover:border-[#f59e0b]/50 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-md">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#121824] border border-[#222e40] flex items-center justify-center text-[#ffc174]">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-white group-hover:text-[#ffc174] transition-colors">
                4. Placement & Credit Pipeline
              </h3>
              <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                Capstone sprint tracking with dual corporate-faculty mentorship, PPO conversion, and Academic Bank of Credits (ABC) validation.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#ffc174] flex items-center gap-1 font-semibold">
              <span>Track PPO Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Tri-Partite Portal Role Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#94a3b8] max-w-2xl mx-auto">
            Streamlined workflows designed specifically for Students, Faculty Advisors, and Corporate R&D Leads.
          </p>
        </div>

        {/* Role Tab Switcher */}
        <div className="flex justify-center border-b border-[#222e40] max-w-md mx-auto p-1 bg-[#121824] rounded-xl">
          <button
            onClick={() => setActiveTabRole("STUDENT")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTabRole === "STUDENT"
                ? "bg-[#1a2538] text-[#ffc174] border border-amber-500/30 shadow"
                : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setActiveTabRole("FACULTY")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTabRole === "FACULTY"
                ? "bg-[#1a2538] text-[#ffc174] border border-amber-500/30 shadow"
                : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Academician
          </button>
          <button
            onClick={() => setActiveTabRole("INDUSTRY")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTabRole === "INDUSTRY"
                ? "bg-[#1a2538] text-[#ffc174] border border-amber-500/30 shadow"
                : "text-[#94a3b8] hover:text-white"
            }`}
          >
            Industry Lead
          </button>
        </div>

        {/* Role Detail Grid */}
        <div className="p-8 rounded-xl bg-[#161e2e] border border-[#222e40] shadow-lg space-y-6">
          {activeTabRole === "STUDENT" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#ffc174] border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <h4 className="font-headline font-bold text-base text-white">AI Skill Matching</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Select your completed course modules to instantly match with high-priority industry challenges aligned with your degree requirements.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#4edea3] border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <h4 className="font-headline font-bold text-base text-white">Capstone Fellowship</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Work in guided sprints with corporate engineers and university faculty to solve real R&D bottlenecks and build verified portfolio code.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#a3b18a] border border-[#588157]/40 flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <h4 className="font-headline font-bold text-base text-white">Degree Credit & PPO</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Automatically transfer earned project credits into the Academic Bank of Credits (ABC) ledger and convert capstones into direct Pre-Placement Offers.
                </p>
              </div>
            </div>
          )}

          {activeTabRole === "FACULTY" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#4edea3] flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <h4 className="font-headline font-bold text-base text-white">Syllabus Deficit Analytics</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Review real-time skill gaps aggregated from enterprise challenges to pinpoint outdated modules in your departmental syllabus.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#ffc174] flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <h4 className="font-headline font-bold text-base text-white">Automated BoS Reports</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Generate instant Board of Studies feedback reports with 1-click recommendations to add missing industry toolchains.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#a3b18a] flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <h4 className="font-headline font-bold text-base text-white">Dual Mentorship Tracking</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Co-supervise student capstones alongside industry leads with transparent code milestone checks and verified assessment rubrics.
                </p>
              </div>
            </div>
          )}

          {activeTabRole === "INDUSTRY" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#ffc174] flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <h4 className="font-headline font-bold text-base text-white">Post Bottlenecks</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Publish real engineering challenges, dataset specifications, and target deliverables directly to top university engineering cohorts.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#4edea3] flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <h4 className="font-headline font-bold text-base text-white">Targeted Talent Pipeline</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Discover pre-vetted student teams with verified vector match scores exceeding 80% alignment for your tech stack.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#121824] text-[#a3b18a] flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <h4 className="font-headline font-bold text-base text-white">Direct PPO Conversion</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  Extend accredited internships and Pre-Placement Offers based on empirical sprint deliverables rather than standard resumes.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Student Benefit Accordion & Key Differentiators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Accordion */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="font-mono text-[11px] text-[#ffc174] uppercase tracking-wider">
              Student Value Proposition
            </span>
            <h3 className="font-headline text-2xl font-bold text-white">
              How Does UniBridge Empower Students?
            </h3>
          </div>

          <div className="space-y-3">
            {studentBenefits.map((item, idx) => {
              const isOpen = openStudentBenefit === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg bg-[#161e2e] border border-[#222e40] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenStudentBenefit(isOpen ? null : idx)}
                    className="w-full text-left p-4 font-headline font-semibold text-sm text-white flex items-center justify-between gap-3 hover:text-[#ffc174] transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="material-symbols-outlined text-[18px] text-[#a3b18a]">
                      {isOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 font-body text-xs text-[#94a3b8] leading-relaxed border-t border-[#222e40]/60 pt-3">
                      {item.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key Differentiator Box */}
        <div className="p-6 rounded-xl bg-[#121824] border border-[#222e40] space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1">
            <span className="px-2 py-0.5 rounded bg-[#161e2e] text-[#4edea3] border border-emerald-500/30 font-mono text-[10px] uppercase">
              SIH 2026 Competitive Advantage
            </span>
            <h3 className="font-headline text-xl font-bold text-white">
              What Makes UniBridge Unique?
            </h3>
          </div>

          <ul className="space-y-4 font-body text-xs text-[#dfe2ee]">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[18px] text-[#4edea3] mt-0.5">check_circle</span>
              <div>
                <strong className="text-white">Empirical Vector Cosine Matching:</strong> We use 384-dimensional PyTorch embeddings instead of simple keyword tag searching to compute true semantic alignment between syllabus outcomes and industrial engineering problems.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[18px] text-[#ffc174] mt-0.5">check_circle</span>
              <div>
                <strong className="text-white">Board of Studies Dynamic Feedback Loop:</strong> Automatically sends skill deficit telemetry to university syllabus committees, reducing curriculum revision cycles from 4 years to continuous feedback.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[18px] text-[#a3b18a] mt-0.5">check_circle</span>
              <div>
                <strong className="text-white">Full NEP 2020 & UGC NCrF Alignment:</strong> Direct credit mapping formulas convert capstone deliverables into official degree credits and verified Academic Bank of Credits ledger entries.
              </div>
            </li>
          </ul>

          <div className="pt-2">
            <Link
              href="/matching"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md"
            >
              <span>Test AI Matching Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Render Automation Demo Modal */}
      <AutomationDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
}

