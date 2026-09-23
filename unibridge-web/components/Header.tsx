"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";


export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentRole, setCurrentRole] = useState("STUDENT");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem("unibridge_user_role");
    if (savedRole) {
      setCurrentRole(savedRole);
    }
    const savedUser = localStorage.getItem("unibridge_user");
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
  }, [pathname]);

  const handleRoleChange = (newRole: string) => {
    setCurrentRole(newRole);
    localStorage.setItem("unibridge_user_role", newRole);
    setIsRoleDropdownOpen(false);

    if (newRole === "FACULTY") {
      router.push("/telemetry");
    } else if (newRole === "INDUSTRY_PARTNER") {
      router.push("/pipeline");
    } else if (newRole === "STUDENT") {
      router.push("/repository");
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roles = [
    { id: "STUDENT", label: "Student", desc: "Skill Mapping & Internships" },
    { id: "FACULTY", label: "Academician", desc: "Curriculum & Telemetry" },
    { id: "INDUSTRY_PARTNER", label: "Industry Lead", desc: "Challenges & PPO Pipeline" },
  ];

  return (
      <header className="gradient-border-bottom fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#222e40]/50 shadow-[0_4px_30px_rgba(0,0,0,0.2)]" style={{backgroundColor: 'var(--header-bg)'}}>
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Authority Tag */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="UniBridge Logo"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <div className="hidden xl:flex flex-col justify-center border-l border-[#222e40] pl-3">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded bg-[#161e2e] text-[#a3b18a] border border-[#263346] font-mono text-[10px] uppercase tracking-wider">
                  SIH 2026 • PS 26044
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#94a3b8] mt-0.5">
                Ministry of Ayush & AIIA Collaboration
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#121824] border border-[#222e40] rounded-xl">
            <Link
              href="/"
              className={`px-3 py-1.5 font-body text-[13px] transition-all rounded-lg ${
                pathname === "/"
                  ? "bg-gradient-to-r from-[#1c2738] to-[#1e2f3d] text-white font-semibold shadow-sm border border-[#a3b18a]/50"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#1a2234]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/repository"
              className={`px-3 py-1.5 font-body text-[13px] transition-all rounded-lg ${
                pathname === "/repository"
                  ? "bg-gradient-to-r from-[#1c2738] to-[#1e2f3d] text-white font-semibold shadow-sm border border-[#f59e0b]/50"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#1a2234]"
              }`}
            >
              Problem Repository
            </Link>
            <Link
              href="/matching"
              className={`px-3 py-1.5 font-body text-[13px] transition-all rounded-lg flex items-center gap-1.5 ${
                pathname === "/matching"
                  ? "bg-gradient-to-r from-[#1c2738] to-[#1e2f3d] text-white font-semibold shadow-sm border border-[#a3b18a]/50"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#1a2234]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]"></span>
              <span>AI Matcher</span>
            </Link>
            <Link
              href="/telemetry"
              className={`px-3 py-1.5 font-body text-[13px] transition-all rounded-lg ${
                pathname === "/telemetry"
                  ? "bg-gradient-to-r from-[#1c2738] to-[#1e2f3d] text-white font-semibold shadow-sm border border-[#a3b18a]/50"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#1a2234]"
              }`}
            >
              BoS Telemetry
            </Link>
            <Link
              href="/pipeline"
              className={`px-3 py-1.5 font-body text-[13px] transition-all rounded-lg ${
                pathname === "/pipeline"
                  ? "bg-gradient-to-r from-[#1c2738] to-[#1e2f3d] text-white font-semibold shadow-sm border border-[#588157]/50 relative"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#1a2234]"
              }`}
            >
              Placement Pipeline
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 shrink-0">


            {/* Role Switcher Pill Bar */}
            <div className="hidden sm:inline-flex items-center p-0.5 rounded-lg bg-[#121824] border border-[#222e40] font-mono text-[11px]">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    currentRole === r.id
                      ? "bg-[#1a2538] text-[#ffc174] border border-amber-500/20 shadow-xs"
                      : "text-[#94a3b8] hover:text-white hover:bg-[#1a2234]"
                  }`}
                  type="button"
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle visual theme"
                className="p-1.5 rounded-lg bg-[#121824] border border-[#222e40] text-[#94a3b8] hover:text-amber-400 hover:bg-[#1a2234] transition-colors flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {resolvedTheme === "dark" ? "dark_mode" : "light_mode"}
                </span>
              </button>
            )}

            {/* Login / Profile CTA */}
            {userProfile ? (
              <div className="w-8 h-8 rounded-full bg-[#162132] border border-[#a3b18a]/40 flex items-center justify-center shrink-0 text-[#a3b18a] font-bold text-xs">
                {userProfile.name ? userProfile.name.substring(0, 2).toUpperCase() : "US"}
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-hover-lift inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-semibold text-[13px] transition-all border border-amber-400/40 shadow-[0_2px_12px_rgba(245,158,11,0.25)]"
              >
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Portal Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>


  );
}

