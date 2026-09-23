"use client";

import React, { useState } from "react";
import { Download, FileSpreadsheet, CheckCircle2, X } from "lucide-react";
import { SkillTelemetryChart } from "./SkillTelemetryChart";

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
  const [activeDeptTab, setActiveDeptTab] = useState<string>("ALL");

  const totalCapstones = 142;
  const averageMatchScore = "78.4%";
  const totalDeficits = telemetryRecords.length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGlobalExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(telemetryRecords, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Ayush_Board_of_Studies_Syllabus_Telemetry_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Full Board of Studies Syllabus Recommendation report exported successfully.");
  };

  const filteredRecords = activeDeptTab === "ALL"
    ? telemetryRecords
    : telemetryRecords.filter((r) => r.department.toLowerCase().includes(activeDeptTab.toLowerCase()));

  return (
    <div className="space-y-8 bg-[#0b0f17] text-[#dfe2ee] pb-16">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-[#121927] text-white shadow-2xl font-mono text-xs font-bold flex items-center gap-2 border border-[#2b394f]">
          <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2b394f] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#a3b18a]">
            <span className="px-2 py-0.5 rounded bg-[#121927] border border-[#2b394f] text-[#ffc174] font-semibold">
              SIH 2026 : PS 26044
            </span>
            <span>/</span>
            <span>BOARD OF STUDIES TELEMETRY HUB</span>
          </div>
          <h1 className="font-headline text-[32px] sm:text-[36px] font-bold text-white tracking-tight">
            Curriculum Telemetry & BoS Feed
          </h1>
          <p className="font-body text-sm text-[#94a3b8] max-w-3xl leading-relaxed">
            Automated evaluation telemetry fed directly to University Boards of Studies and Ayush Academic Councils. Pinpoints missing toolchains, outdated standards, and practical skill deficits.
          </p>
        </div>

        <button
          onClick={handleGlobalExport}
          className="btn-hover-lift px-4 py-2.5 rounded-lg font-bold text-xs bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 flex items-center gap-2 self-start sm:self-auto shadow-md shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Full BoS Report</span>
        </button>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
        <div className="p-5 rounded-xl bg-[#121927] border border-[#2b394f] shadow-lg space-y-2">
          <span className="text-[11px] text-[#a3b18a] uppercase tracking-wider font-semibold">Active Capstones</span>
          <div className="text-3xl font-bold text-white">{totalCapstones}</div>
          <p className="text-[11px] text-[#94a3b8]">Across 12 Ayush & Engineering Departments</p>
        </div>

        <div className="p-5 rounded-xl bg-[#121927] border border-[#2b394f] shadow-lg space-y-2">
          <span className="text-[11px] text-[#a3b18a] uppercase tracking-wider font-semibold">Average Match Score</span>
          <div className="text-3xl font-bold text-[#4edea3]">{averageMatchScore}</div>
          <p className="text-[11px] text-[#94a3b8]">Computed across 142 AI vector evaluations</p>
        </div>

        <div className="p-5 rounded-xl bg-[#121927] border border-[#2b394f] shadow-lg space-y-2">
          <span className="text-[11px] text-[#a3b18a] uppercase tracking-wider font-semibold">Flagged Curriculum Deficits</span>
          <div className="text-3xl font-bold text-[#ffc174]">{totalDeficits} Deficits</div>
          <p className="text-[11px] text-[#94a3b8]">Queued for annual Board of Studies revision</p>
        </div>
      </div>

      {/* Embedded Radar Telemetry Chart Component */}
      <SkillTelemetryChart
        department={activeDeptTab === "ALL" ? "Computer Science & Ayush Informatics" : activeDeptTab}
        onProposeRevision={handleGlobalExport}
      />

      {/* Board of Studies Action Feed */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2b394f] pb-3">
          <h2 className="font-headline text-xl font-bold text-white">
            Board of Studies Action Feed & Syllabus Revision Directives
          </h2>

          {/* Department Filters */}
          <div className="flex items-center gap-1 bg-[#121927] p-1 rounded-lg border border-[#2b394f] font-mono text-[11px]">
            {["ALL", "Computer Science", "Ayush", "Electronics"].map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDeptTab(dept)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  activeDeptTab === dept
                    ? "bg-[#1f2b3e] text-[#ffc174] border border-[#f59e0b]/30 shadow-sm"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredRecords.map((item) => {
            const missingToolsList = item.missingTools.split(",").map((t) => t.trim());
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#121927] border border-[#2b394f] shadow-lg space-y-4 hover:border-[#f59e0b]/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2b394f] pb-3">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-[#ffc174] uppercase">
                      {item.department} • Academic Year {item.academicYear}
                    </span>
                    <h3 className="font-headline font-bold text-base text-white mt-0.5">
                      {item.skillDeficiency}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30 font-mono text-[11px] font-bold self-start sm:self-auto">
                    Deficit Score: {item.aggregateDeficitScore}%
                  </span>
                </div>

                {/* Missing Toolchains */}
                <div className="space-y-2">
                  <div className="font-mono text-[10px] font-bold text-[#94a3b8] uppercase">
                    Identified Missing Toolchains & Industry Gap:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {missingToolsList.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#1f2b3e] text-[#ffb4ab] border border-[#ffb4ab]/30 font-mono text-[11px]"
                      >
                        ⚠ {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-3.5 rounded-lg bg-[#588157]/15 border border-[#588157]/40 space-y-1">
                  <div className="font-mono text-[10px] font-bold text-[#a3b18a] uppercase">
                    Board of Studies Recommended Syllabus Revision Directive:
                  </div>
                  <p className="font-body text-xs text-[#dfe2ee] leading-relaxed">
                    {item.curriculumRecommendation}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#2b394f]">
                  <span className="font-mono text-[11px] text-[#4edea3] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span>
                    Ayush Digital Health Mission Telemetry Sync Active
                  </span>

                  <button
                    onClick={() => setExportedItem(item)}
                    className="btn-hover-lift px-3.5 py-1.5 rounded-lg bg-[#1f2b3e] hover:bg-[#2b394f] text-[#ffc174] font-mono text-xs font-bold border border-[#f59e0b]/30 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Directive PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Directive Modal */}
      {exportedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-xl bg-[#121927] border border-[#2b394f] shadow-2xl p-6 space-y-6 relative">
            <button
              onClick={() => setExportedItem(null)}
              className="absolute top-5 right-5 p-1 text-[#94a3b8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-[#2b394f] pb-3">
              <span className="font-mono text-[10px] uppercase font-bold text-[#f59e0b]">
                Official Board of Studies Resolution Directive
              </span>
              <h3 className="font-headline font-bold text-lg text-white">
                {exportedItem.department} Syllabus Update Directive
              </h3>
            </div>

            <div className="p-4 rounded-lg bg-[#0b0f17] border border-[#2b394f] space-y-3 font-mono text-xs">
              <div>
                <span className="text-[#94a3b8] block text-[10px] uppercase">Identified Skill Deficit:</span>
                <span className="font-bold text-white text-sm">{exportedItem.skillDeficiency}</span>
              </div>
              <div>
                <span className="text-[#94a3b8] block text-[10px] uppercase">Missing Toolchains:</span>
                <span className="text-[#ffb4ab]">{exportedItem.missingTools}</span>
              </div>
              <div>
                <span className="text-[#94a3b8] block text-[10px] uppercase">Board Directive:</span>
                <p className="font-body text-xs text-[#dfe2ee] leading-relaxed mt-1 p-3 rounded bg-[#161e2e] border border-[#2b394f]">
                  {exportedItem.curriculumRecommendation}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  showToast(`Downloaded Syllabus Recommendation PDF for ${exportedItem.department}`);
                  setExportedItem(null);
                }}
                className="btn-hover-lift px-5 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 flex items-center gap-1.5 shadow-md"
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

