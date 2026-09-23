"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "teal" | "amber" | "indigo" | "purple" | "none";
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  glowColor = "none",
  hoverEffect = true,
  onClick,
}: GlassCardProps) {
  let glowClasses = "";
  if (glowColor === "teal") {
    glowClasses = "hover:border-teal-500/50 hover:shadow-[0_0_25px_rgba(13,148,136,0.15)]";
  } else if (glowColor === "amber") {
    glowClasses = "hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]";
  } else if (glowColor === "indigo") {
    glowClasses = "hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(79,70,229,0.15)]";
  } else if (glowColor === "purple") {
    glowClasses = "hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]";
  }

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#161B26]/80 border border-slate-200/80 dark:border-white/10 p-6 transition-all duration-300 ${
        hoverEffect ? "hover:-translate-y-1 hover:shadow-xl" : ""
      } ${glowClasses} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
