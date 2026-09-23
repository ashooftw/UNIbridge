"use client";

import React from "react";
import { BookOpen, CheckCircle, ArrowRight, Layers, Sparkles, Building2 } from "lucide-react";

interface OutcomeMapping {
  courseCode: string;
  courseName: string;
  learningOutcome: string;
  matchedDeliverable: string;
  matchScore: number;
}

interface SyllabusMapperProps {
  mappings?: OutcomeMapping[];
  problemTitle?: string;
  companyName?: string;
}

export function SyllabusMapper({
  problemTitle = "Computer Vision Metal Defect Detection",
  companyName = "Bharat Forge Labs",
  mappings = [
    {
      courseCode: "CS401",
      courseName: "Computer Vision & Pattern Recognition",
      learningOutcome: "Design convolutional neural networks for automated surface anomaly segmentation.",
      matchedDeliverable: "Real-time edge model inferencing at 60 FPS on factory camera feeds.",
      matchScore: 94,
    },
    {
      courseCode: "CS302",
      courseName: "Embedded Systems & Edge AI",
      learningOutcome: "Deploy quantized models on TensorRT GPU edge accelerators.",
      matchedDeliverable: "Quantized INT8 model telemetry pipeline.",
      matchScore: 88,
    },
    {
      courseCode: "CS305",
      courseName: "Industrial IoT & Sensor Networks",
      learningOutcome: "Implement low-latency MQTT message queues for telemetry alerts.",
      matchedDeliverable: "Factory floor warning trigger over MQTT protocol.",
      matchScore: 82,
    },
  ],
}: SyllabusMapperProps) {
  return (
    <div className="space-y-4 p-5 rounded-2xl bg-card border border-border">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{companyName}</span>
          </div>
          <h4 className="text-base font-extrabold text-foreground">{problemTitle}</h4>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0 self-start sm:self-auto flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          UGC Credit Mapped
        </span>
      </div>

      {/* Mappings Grid */}
      <div className="space-y-3 pt-1">
        {mappings.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-muted/40 border border-border/70 hover:border-primary/40 transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                {item.courseCode} — {item.courseName}
              </span>
              <span className="font-bold text-emerald-500 text-[11px] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {item.matchScore}% Vector Match
              </span>
            </div>

            {/* Side-by-Side Outcome vs Deliverable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-card border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-fg uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-primary" />
                  Syllabus Learning Outcome
                </div>
                <p className="text-foreground font-medium">{item.learningOutcome}</p>
              </div>

              <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 space-y-1">
                <div className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-primary" />
                  Matched Industry Deliverable
                </div>
                <p className="text-foreground font-medium">{item.matchedDeliverable}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
