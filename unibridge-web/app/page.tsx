"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

/* ── Animated Counter Hook ──────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, suffix = "") {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value: `${count}${suffix}` };
}

export default function LandingPage() {
  const [openStudentBenefit, setOpenStudentBenefit] = useState<number | null>(0);
  const [activeTabRole, setActiveTabRole] = useState<"STUDENT" | "FACULTY" | "INDUSTRY">("STUDENT");

  /* Animated stat counters */
  const stat1 = useCountUp(24, 1600, "+");
  const stat2 = useCountUp(100, 1400, "%");
  const stat3 = useCountUp(384, 2000, "D");
  const stat4 = useCountUp(142, 1800, "");

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

  const pillarCards = [
    {
      href: "/repository",
      icon: "dataset",
      title: "Industry Problem Repository",
      desc: "Curated MSME, Ayush, and enterprise bottlenecks with dataset access flags, target deliverables, and required skill matrices.",
      cta: "Explore 24 Challenges",
      iconColor: "text-[#f59e0b]",
      hoverBorder: "hover:border-[#f59e0b]/50",
      hoverText: "group-hover:text-[#f59e0b]",
      ctaColor: "text-[#f59e0b]",
      glowClass: "card-glow-amber",
      accentClass: "card-accent-amber",
      animDelay: "animate-fade-in-up-delay-1",
    },
    {
      href: "/matching",
      icon: "psychology",
      title: "AI Academic Matcher",
      desc: "PyTorch transformer vector engine calculating cosine alignment between problem statements and course outcomes.",
      cta: "Launch Match Engine",
      iconColor: "text-[#4edea3]",
      hoverBorder: "hover:border-[#4edea3]/50",
      hoverText: "group-hover:text-[#4edea3]",
      ctaColor: "text-[#4edea3]",
      glowClass: "card-glow-emerald",
      accentClass: "card-accent-emerald",
      animDelay: "animate-fade-in-up-delay-2",
    },
    {
      href: "/telemetry",
      icon: "radar",
      title: "BoS Skill Telemetry",
      desc: "Empirical deficit analytics flagging syllabus gaps to University Boards of Studies for annual curriculum modernization.",
      cta: "View Radar Telemetry",
      iconColor: "text-[#a3b18a]",
      hoverBorder: "hover:border-[#a3b18a]/50",
      hoverText: "group-hover:text-[#a3b18a]",
      ctaColor: "text-[#a3b18a]",
      glowClass: "card-glow-sage",
      accentClass: "card-accent-sage",
      animDelay: "animate-fade-in-up-delay-3",
    },
    {
      href: "/pipeline",
      icon: "verified",
      title: "Placement & Credit Pipeline",
      desc: "Capstone sprint tracking with dual corporate-faculty mentorship, PPO conversion, and Academic Bank of Credits (ABC) validation.",
      cta: "Track PPO Pipeline",
      iconColor: "text-[#ffc174]",
      hoverBorder: "hover:border-[#ffc174]/50",
      hoverText: "group-hover:text-[#ffc174]",
      ctaColor: "text-[#ffc174]",
      glowClass: "card-glow-gold",
      accentClass: "card-accent-gold",
      animDelay: "animate-fade-in-up-delay-4",
    },
  ];

  const roleData = {
    STUDENT: [
      { num: "01", color: "text-[#ffc174]", borderColor: "border-amber-500/30", title: "AI Skill Matching", desc: "Select your completed course modules to instantly match with high-priority industry challenges aligned with your degree requirements." },
      { num: "02", color: "text-[#4edea3]", borderColor: "border-emerald-500/30", title: "Capstone Fellowship", desc: "Work in guided sprints with corporate engineers and university faculty to solve real R&D bottlenecks and build verified portfolio code." },
      { num: "03", color: "text-[#a3b18a]", borderColor: "border-[#588157]/40", title: "Degree Credit & PPO", desc: "Automatically transfer earned project credits into the Academic Bank of Credits (ABC) ledger and convert capstones into direct Pre-Placement Offers." },
    ],
    FACULTY: [
      { num: "01", color: "text-[#4edea3]", borderColor: "border-emerald-500/30", title: "Syllabus Deficit Analytics", desc: "Review real-time skill gaps aggregated from enterprise challenges to pinpoint outdated modules in your departmental syllabus." },
      { num: "02", color: "text-[#ffc174]", borderColor: "border-amber-500/30", title: "Automated BoS Reports", desc: "Generate instant Board of Studies feedback reports with 1-click recommendations to add missing industry toolchains." },
      { num: "03", color: "text-[#a3b18a]", borderColor: "border-[#588157]/40", title: "Dual Mentorship Tracking", desc: "Co-supervise student capstones alongside industry leads with transparent code milestone checks and verified assessment rubrics." },
    ],
    INDUSTRY: [
      { num: "01", color: "text-[#ffc174]", borderColor: "border-amber-500/30", title: "Post Bottlenecks", desc: "Publish real engineering challenges, dataset specifications, and target deliverables directly to top university engineering cohorts." },
      { num: "02", color: "text-[#4edea3]", borderColor: "border-emerald-500/30", title: "Targeted Talent Pipeline", desc: "Discover pre-vetted student teams with verified vector match scores exceeding 80% alignment for your tech stack." },
      { num: "03", color: "text-[#a3b18a]", borderColor: "border-[#588157]/40", title: "Direct PPO Conversion", desc: "Extend accredited internships and Pre-Placement Offers based on empirical sprint deliverables rather than standard resumes." },
    ],
  };

  const tabIndicatorPos = activeTabRole === "STUDENT" ? "left-0" : activeTabRole === "FACULTY" ? "left-1/3" : "left-2/3";

  return (
    <div className="space-y-20 pb-24">

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-24 overflow-hidden">

        {/* ── Animated Background Orbs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/4 w-[36rem] h-[36rem] rounded-full bg-emerald-500/[0.07] blur-[140px] animate-orb-1" />
          <div className="absolute -top-20 right-1/4 w-[32rem] h-[32rem] rounded-full bg-amber-500/[0.08] blur-[130px] animate-orb-2" />
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-[#a3b18a]/[0.05] blur-[120px] animate-orb-3" />
        </div>

        {/* ── Dot Grid Overlay ── */}
        <div className="absolute inset-0 dot-grid-bg pointer-events-none" aria-hidden="true" />

        {/* ── Decorative Glow Ring ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#f59e0b]/[0.06] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-8 rounded-full border border-[#4edea3]/[0.04]" />
          <div className="absolute inset-16 rounded-full border border-[#a3b18a]/[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">

          {/* Logo */}
          <div className="flex items-center justify-center animate-fade-in-up mb-2">
            <Image
              src="/logo.png"
              alt="UniBridge Logo"
              width={220}
              height={76}
              className="h-20 w-auto object-contain"
              priority
            />
          </div>

          {/* Badge */}
          <div className="flex items-center justify-center animate-fade-in-up">
            <span className="shimmer-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-semibold rounded-full bg-[#161e2e] text-[#a3b18a] border border-[#222e40]">
              <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
              SIH 2026 Problem Statement 26044 • Ministry of Ayush & AIIA Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up-delay-1 font-headline text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl mx-auto" style={{ textShadow: '0 2px 40px rgba(245,158,11,0.12)' }}>
            From Academic Knowledge to Industry R&D Solutions with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#4edea3] hero-text-shimmer">
              AI Curriculum Modernization
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 font-body text-sm sm:text-base lg:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
            UniBridge operationalizes NEP 2020 & UGC NCrF guidelines by linking university course outcomes directly with real-world enterprise & Ayush R&D bottlenecks through 384-dimensional sentence transformer embeddings.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up-delay-3 flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/repository"
              className="btn-hover-lift btn-glow-amber px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 transition-all shadow-lg flex items-center gap-2.5"
            >
              <span>Explore Problem Repository</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/matching"
              className="btn-hover-lift px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#121824] border border-[#a3b18a]/40 text-[#a3b18a] hover:text-white hover:border-[#4edea3]/60 transition-all flex items-center gap-2.5 shadow-sm backdrop-blur-sm"
            >
              <span className="relative w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] ping-ring" />
              <span>AI Match Engine</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="animate-fade-in-up-delay-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
            {[
              { ref: stat1.ref, value: stat1.value, label: "Verified MSME Challenges", color: "text-white" },
              { ref: stat2.ref, value: stat2.value, label: "NEP 2020 & UGC Audited", color: "text-[#4edea3]" },
              { ref: stat3.ref, value: stat3.value, label: "Vector Transformer Embeddings", color: "text-[#ffc174]" },
              { ref: stat4.ref, value: stat4.value, label: "Active Capstone Fellowships", color: "text-[#a3b18a]" },
            ].map((stat, i) => (
              <div
                key={i}
                ref={stat.ref}
                className="stat-card-glow p-4 rounded-xl bg-[#121824] border border-[#222e40] text-center group hover:border-[#f59e0b]/30 transition-all duration-300"
              >
                <div className={`font-mono text-2xl lg:text-3xl font-bold ${stat.color} transition-colors`}>
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] text-[#94a3b8] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom separator gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. FOUR-PILLAR ARCHITECTURE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 animate-fade-in-up">
          <span className="px-3 py-1 rounded-full bg-[#161e2e] text-[#a3b18a] border border-[#222e40] font-mono text-[11px] uppercase tracking-wider">
            Closed-Loop Platform Architecture
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            The 4 Operational Pillars of UniBridge
          </h2>
          <p className="font-body text-sm text-[#94a3b8] max-w-2xl mx-auto">
            Connecting industry challenges with course outcome modules and automated board-of-studies telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillarCards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={`group card-hover-glow card-accent-top ${card.glowClass} ${card.accentClass} ${card.animDelay} p-6 rounded-xl bg-[#161e2e] border border-[#222e40] ${card.hoverBorder} transition-all flex flex-col justify-between space-y-4 shadow-md`}
            >
              <div className="space-y-3">
                <div className={`w-11 h-11 rounded-xl bg-[#121824] border border-[#222e40] flex items-center justify-center ${card.iconColor} shadow-inner`}>
                  <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                </div>
                <h3 className={`font-headline font-bold text-lg text-white ${card.hoverText} transition-colors leading-snug`}>
                  {idx + 1}. {card.title}
                </h3>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className={`font-mono text-[11px] ${card.ctaColor} flex items-center gap-1.5 font-semibold group-hover:gap-2.5 transition-all`}>
                <span>{card.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. TRI-PARTITE ROLE TABS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 animate-fade-in-up">
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="font-body text-sm text-[#94a3b8] max-w-2xl mx-auto">
            Streamlined workflows designed specifically for Students, Faculty Advisors, and Corporate R&D Leads.
          </p>
        </div>

        {/* Tab Switcher with sliding indicator */}
        <div className="relative max-w-md mx-auto p-1 bg-[#121824] border border-[#222e40] rounded-xl">
          {/* Sliding indicator */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(33.333%-4px)] rounded-lg bg-[#1a2538] border border-amber-500/30 shadow-lg transition-all duration-300 ease-out ${tabIndicatorPos}`}
            style={{ marginLeft: '4px' }}
          />
          <div className="relative flex z-10">
            {(["STUDENT", "FACULTY", "INDUSTRY"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setActiveTabRole(role)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 ${
                  activeTabRole === role
                    ? "text-[#ffc174]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {role === "STUDENT" ? "Student" : role === "FACULTY" ? "Academician" : "Industry Lead"}
              </button>
            ))}
          </div>
        </div>

        {/* Role Detail Panel */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#161e2e] border border-[#222e40] shadow-xl relative overflow-hidden">
          {/* Decorative left gradient stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f59e0b] via-[#4edea3] to-[#a3b18a] rounded-l-2xl" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roleData[activeTabRole].map((item, idx) => (
              <div key={`${activeTabRole}-${idx}`} className={`space-y-3 animate-fade-in-up-delay-${idx + 1}`}>
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br from-[#121824] to-[#161e2e] ${item.color} border ${item.borderColor} flex items-center justify-center font-mono font-bold text-xs shadow-inner`}>
                  {item.num}
                </div>
                <h4 className="font-headline font-bold text-base text-white">{item.title}</h4>
                <p className="font-body text-xs text-[#94a3b8] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. STUDENT BENEFITS & KEY DIFFERENTIATORS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left: Accordion */}
        <div className="space-y-5 animate-fade-in-up">
          <div className="space-y-1.5">
            <span className="font-mono text-[11px] text-[#ffc174] uppercase tracking-wider">
              Student Value Proposition
            </span>
            <h3 className="font-headline text-2xl lg:text-3xl font-bold text-white">
              How Does UniBridge Empower Students?
            </h3>
          </div>

          <div className="space-y-3">
            {studentBenefits.map((item, idx) => {
              const isOpen = openStudentBenefit === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl bg-[#161e2e] border transition-all duration-300 ${
                    isOpen ? "border-[#f59e0b]/30 shadow-lg shadow-amber-500/5" : "border-[#222e40]"
                  }`}
                >
                  <button
                    onClick={() => setOpenStudentBenefit(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 font-headline font-semibold text-sm text-white flex items-center justify-between gap-3 hover:text-[#ffc174] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold shrink-0 transition-colors ${
                        isOpen
                          ? "bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-slate-950"
                          : "bg-[#121824] text-[#94a3b8] border border-[#222e40]"
                      }`}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{item.title}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#f59e0b] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#94a3b8] shrink-0" />
                    )}
                  </button>
                  <div
                    className="accordion-content"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 pl-[3.75rem] font-body text-xs text-[#94a3b8] leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key Differentiator Box */}
        <div className="animate-fade-in-up-delay-2 p-7 sm:p-8 rounded-2xl bg-[#121824] border border-[#222e40] space-y-6 shadow-xl relative overflow-hidden">

          {/* Decorative ambient glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-500/[0.06] blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-amber-500/[0.05] blur-[70px] pointer-events-none" />

          <div className="space-y-2 relative">
            <span className="px-2.5 py-0.5 rounded-full bg-[#161e2e] text-[#4edea3] border border-emerald-500/30 font-mono text-[10px] uppercase tracking-wider">
              SIH 2026 Competitive Advantage
            </span>
            <h3 className="font-headline text-xl lg:text-2xl font-bold text-white">
              What Makes UniBridge Unique?
            </h3>
          </div>

          <ul className="space-y-5 font-body text-xs text-[#dfe2ee] relative">
            {[
              {
                icon: "check_circle",
                color: "text-[#4edea3]",
                title: "Empirical Vector Cosine Matching:",
                desc: "We use 384-dimensional PyTorch embeddings instead of simple keyword tag searching to compute true semantic alignment between syllabus outcomes and industrial engineering problems.",
              },
              {
                icon: "check_circle",
                color: "text-[#ffc174]",
                title: "Board of Studies Dynamic Feedback Loop:",
                desc: "Automatically sends skill deficit telemetry to university syllabus committees, reducing curriculum revision cycles from 4 years to continuous feedback.",
              },
              {
                icon: "check_circle",
                color: "text-[#a3b18a]",
                title: "Full NEP 2020 & UGC NCrF Alignment:",
                desc: "Direct credit mapping formulas convert capstone deliverables into official degree credits and verified Academic Bank of Credits ledger entries.",
              },
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`material-symbols-outlined text-[20px] ${feature.color} mt-0.5 shrink-0`}>
                  {feature.icon}
                </span>
                <div>
                  <strong className="text-white">{feature.title}</strong>{" "}
                  {feature.desc}
                </div>
              </li>
            ))}
          </ul>

          <div className="pt-3 relative">
            <Link
              href="/matching"
              className="btn-hover-lift btn-glow-amber inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg"
            >
              <span>Test AI Matching Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
