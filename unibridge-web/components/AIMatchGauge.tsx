"use client";

import React, { useEffect, useState } from "react";
import { Award, CheckCircle, Sparkles, AlertCircle } from "lucide-react";

interface AIMatchGaugeProps {
  score: number; // 0 to 100
  classification?: string;
  size?: number; // gauge size in px
  showLabel?: boolean;
}

export function AIMatchGauge({
  score,
  classification,
  size = 220,
  showLabel = true,
}: AIMatchGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  // SVG Gauge calculations
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Determine color theme based on score
  let gradientId = "gauge-high";
  let statusText = "Excellent Alignment";
  let statusColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/30";
  let arcGradient = "from-emerald-500 to-teal-400";

  if (score < 50) {
    gradientId = "gauge-low";
    statusText = "Baseline Fellowship";
    statusColor = "text-amber-500 bg-amber-500/10 border-amber-500/30";
    arcGradient = "from-amber-500 to-orange-400";
  } else if (score < 75) {
    gradientId = "gauge-mid";
    statusText = "Internship Eligible";
    statusColor = "text-indigo-400 bg-indigo-500/10 border-indigo-500/30";
    arcGradient = "from-indigo-500 to-cyan-400";
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Ambient Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-20 bg-gradient-to-r ${arcGradient} pointer-events-none`}
        />

        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="gauge-high" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="gauge-mid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="gauge-low" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>

          {/* Background Arc Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-200 dark:text-slate-800/80"
          />

          {/* Animated Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            {animatedScore.toFixed(1)}%
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-fg flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-primary" />
            Vector Match
          </span>
        </div>
      </div>

      {/* Status Pill & Classification */}
      {showLabel && (
        <div className="text-center space-y-2 max-w-xs">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${statusColor}`}>
            {score >= 75 ? (
              <CheckCircle className="w-3.5 h-3.5" />
            ) : (
              <Award className="w-3.5 h-3.5" />
            )}
            <span>{statusText}</span>
          </div>

          {classification && (
            <p className="text-xs text-muted-fg font-medium line-clamp-2 px-2">
              {classification}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
