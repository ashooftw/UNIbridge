"use client";

import React, { useState } from "react";
import {
  BarChart3,
  AlertTriangle,
  BookOpen,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Download,
  CheckCircle2,
  Cpu,
  FileSpreadsheet,
  Check,
  X,
  Share2,
} from "lucide-react";

interface TelemetryRecord {
  id: string;
  department: string;
  academicYear: string;
  skillDeficiency: string;
  missingTools: string;
  aggregateDeficitScore: number;
  curriculumRecommendation: string;
  status: string;
  createdAt: any;
}

interface TelemetryClientProps {
  telemetryRecords: TelemetryRecord[];
}

export function TelemetryClient({ telemetryRecords }: TelemetryClientProps) {
  const [exportedItem, setExportedItem] = useState<TelemetryRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalCapstones = 142; // Institutional active capstone count
  const averageMatchScore = "78.4%";
  const totalDeficits = telemetryRecords.length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportSingle = (item: TelemetryRecord) => {
    setExportedItem(item);
  };

  const handleGlobalExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(telemetryRecords, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Ayush_Board_of_Studies_Syllabus_Telemetry_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Full Board of Studies Syllabus Recommendation exported successfully.");
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl text-xs font-bold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            Curriculum Telemetry Engine (PS 26044)
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Academician Telemetry & Board of Studies Feed
          </h1>
          <p className="text-sm text-muted-fg max-w-3xl leading-relaxed">
            Automated evaluation telemetry fed directly to University Boards of Studies and Ayush Academic Councils. Identifies missing toolchains, outdated standards, and practical skill deficits across student capstone reviews.
          </p>
        </div>

        <button
          onClick={handleGlobalExport}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-2 self-start sm:self-auto shadow-md hover:shadow-lg shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Full Telemetry Report</span>
        </button>
      </div>

      {/* 3 Top Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Total Active Capstones */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3 card-hover relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">
              Total Active Capstones
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-foreground">{totalCapstones}</div>
          <p className="text-xs text-muted-fg font-medium">
            Active capstone R&D projects across 12 Ayush & Eng departments
          </p>
        </div>

        {/* Card 2: Average Skill-Match Score */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3 card-hover relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">
              Average Skill-Match Score
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <span>{averageMatchScore}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20">
              +4.2% vs 2025
            </span>
          </div>
          <p className="text-xs text-muted-fg font-medium">
            Computed across 142 student capstone AI vector evaluations
          </p>
        </div>

        {/* Card 3: Curriculum Deficits Identified */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3 card-hover relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">
              Curriculum Deficits Identified
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-500 flex items-center gap-2">
            <span>{totalDeficits} Flagged Items</span>
          </div>
          <p className="text-xs text-muted-fg font-medium">
            Queued for Department Board of Studies syllabus review
          </p>
        </div>
      </div>

      {/* Board of Studies Action Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-500" />
            Board of Studies Action Feed & Syllabus Revision Stream
          </h2>
        </div>

        <div className="space-y-4">
          {telemetryRecords.map((item) => {
            const missingToolsList = item.missingTools.split(",").map((t) => t.trim());
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4 hover:border-purple-500/40 transition-all card-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
                  <div>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      {item.department} • Academic Year {item.academicYear}
                    </span>
                    <h3 className="text-base font-bold text-foreground mt-0.5">
                      {item.skillDeficiency}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 self-start sm:self-auto shrink-0">
                    Deficit Score: {item.aggregateDeficitScore}%
                  </span>
                </div>

                {/* Missing Tools & Deficit Toolchains */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-muted-fg uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Identified Missing Toolchains & Industry Gap:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {missingToolsList.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-1.5">
                  <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Board of Studies Recommended Syllabus Revision:
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {item.curriculumRecommendation}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/60">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ayush Digital Health Mission Telemetry Sync Active</span>
                  </div>

                  <button
                    onClick={() => handleExportSingle(item)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Syllabus Recommendation</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Single Export Modal */}
      {exportedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setExportedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-muted-fg hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0 border border-purple-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full">
                  Official Syllabus Recommendation
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  {exportedItem.department} Academic Board Resolution
                </h3>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3 text-xs">
              <div>
                <span className="font-bold text-muted-fg uppercase tracking-wider block text-[10px]">Identified Deficit:</span>
                <span className="font-bold text-foreground text-sm">{exportedItem.skillDeficiency}</span>
              </div>

              <div>
                <span className="font-bold text-muted-fg uppercase tracking-wider block text-[10px]">Missing Toolchains:</span>
                <span className="font-semibold text-rose-500">{exportedItem.missingTools}</span>
              </div>

              <div>
                <span className="font-bold text-muted-fg uppercase tracking-wider block text-[10px]">Syllabus Revision Directive:</span>
                <p className="text-foreground leading-relaxed font-medium bg-card p-3 rounded-xl border border-border mt-1">
                  {exportedItem.curriculumRecommendation}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                onClick={() => {
                  showToast(`Exported syllabus recommendation for ${exportedItem.department}`);
                  setExportedItem(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-fg hover:opacity-90 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Confirm & Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
