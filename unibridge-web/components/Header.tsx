"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Search,
  ChevronDown,
  GraduationCap,
  School,
  Briefcase,
  Award,
  PlusCircle,
  LogIn,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentRole, setCurrentRole] = useState("STUDENT");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem("unibridge_user_role");
    if (savedRole) {
      setCurrentRole(savedRole);
    }
  }, []);

  const handleRoleChange = (newRole: string) => {
    setCurrentRole(newRole);
    localStorage.setItem("unibridge_user_role", newRole);
    setIsRoleDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/repository?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/repository");
    }
  };

  const roles = [
    {
      id: "STUDENT",
      title: "Student",
      subtitle: "Skill Mapping, Internships & Portfolio",
      icon: GraduationCap,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "FACULTY",
      title: "Academician / Faculty",
      subtitle: "Curriculum Telemetry & Syllabus Revision",
      icon: School,
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    },
    {
      id: "INDUSTRY_PARTNER",
      title: "Industry Lead",
      subtitle: "Challenge Posting & Direct Placement Pipeline",
      icon: Briefcase,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ];

  const currentRoleObj = roles.find((r) => r.id === currentRole) || roles[0];
  const CurrentRoleIcon = currentRoleObj.icon;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0F1117]/80 border-b border-slate-200/80 dark:border-[#262B35]/80 transition-colors duration-200 shadow-sm">
      {/* Top Institutional Badge Banner */}
      <div className="bg-slate-900 dark:bg-[#0F1117] text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-center gap-2 border-b border-slate-800 dark:border-[#262B35]">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
          SIH 2026 • PS 26044
        </span>
        <span className="truncate text-slate-300 font-semibold">
          Ministry of Ayush & AIIA — Academia-Industry Collaboration Portal
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left-Aligned Clean Typographical Brand Mark "UniBridge" */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
              Uni<span className="text-primary">Bridge</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-muted-fg">
            <Link
              href="/"
              className={`hover:text-foreground transition-colors ${
                pathname === "/" ? "text-primary font-bold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/repository"
              className={`hover:text-foreground transition-colors ${
                pathname === "/repository" ? "text-primary font-bold" : ""
              }`}
            >
              Problem Repository
            </Link>
            <Link
              href="/matching"
              className={`hover:text-foreground transition-colors flex items-center gap-1.5 ${
                pathname === "/matching" ? "text-primary font-bold" : ""
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-primary" />
              <span>AI Match Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>
            <Link
              href="/telemetry"
              className={`hover:text-foreground transition-colors flex items-center gap-1.5 ${
                pathname === "/telemetry" ? "text-primary font-bold" : ""
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Academic Telemetry</span>
            </Link>
            <Link
              href="/pipeline"
              className={`hover:text-foreground transition-colors flex items-center gap-1.5 ${
                pathname === "/pipeline" ? "text-primary font-bold" : ""
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Placement Pipeline</span>
            </Link>
          </nav>
        </div>

        {/* Right-Aligned Controls & Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Functional Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <Search className="w-3.5 h-3.5 absolute left-3 text-muted-fg pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges, skills..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring w-48 lg:w-56 transition-all"
            />
          </form>

          {/* Post Problem CTA */}
          <Link
            href="/problems/new"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post Challenge</span>
          </Link>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Toggle Light / Dark Mode"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-teal-600" />
              )}
            </button>
          )}

          {/* Role Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-card border border-border text-foreground hover:border-primary/40 transition-all flex items-center gap-2 shadow-sm"
            >
              <CurrentRoleIcon className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline font-bold">{currentRoleObj.title}</span>
              <ChevronDown className="w-3 h-3 text-muted-fg" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-card border border-border shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl">
                <div className="px-3 py-2 text-[11px] font-bold text-muted-fg uppercase tracking-wider border-b border-border">
                  Switch Portal Role
                </div>
                {roles.map((r) => {
                  const IconComp = r.icon;
                  const isSelected = currentRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleRoleChange(r.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-start gap-2.5 transition-all ${
                        isSelected
                          ? "bg-primary/15 border border-primary/30 text-primary font-bold shadow-sm"
                          : "hover:bg-muted text-foreground border border-transparent"
                      }`}
                    >
                      <IconComp className={`w-4 h-4 mt-0.5 shrink-0 ${r.color.split(" ")[0]}`} />
                      <div>
                        <div className="font-bold text-xs">{r.title}</div>
                        <div className="text-[10px] text-muted-fg font-normal leading-tight">
                          {r.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portal Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

