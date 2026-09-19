"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Building2, Tag, Calendar, CheckCircle2, AlertCircle, Sparkles, HeartPulse } from "lucide-react";

export default function NewProblemPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("All India Institute of Ayurveda & Dabur R&D");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("Python, PyTorch, OpenCV, Spectral Imaging");
  const [targetDeliverables, setTargetDeliverables] = useState("Model checkpoint, API inference endpoint, dataset documentation");
  const [difficulty, setDifficulty] = useState("INTERMEDIATE");
  const [timelineWeeks, setTimelineWeeks] = useState(12);
  const [targetAudience, setTargetAudience] = useState("Undergraduate Capstone Team");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          companyName,
          description,
          requiredSkills,
          targetDeliverables,
          difficulty,
          timelineWeeks,
          targetAudience,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Challenge statement posted successfully to UniBridge Repository!");
        setTimeout(() => {
          router.push("/repository");
          router.refresh();
        }, 1200);
      } else {
        setErrorMsg(json.error || "Failed to post challenge.");
      }
    } catch (err) {
      setErrorMsg("Network error posting challenge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
          <HeartPulse className="w-4 h-4 text-primary" />
          Industry & Ministry R&D Portal (PS 26044)
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Post Operational Ayush / Industry Challenge
        </h1>
        <p className="text-sm text-muted-fg">
          Publish an authentic operational problem statement to be translated into credit-bearing student capstones and continuous curriculum telemetry.
        </p>
      </div>

      {/* Form Card */}
      <div className="p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6">
        
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 animate-bounce" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Challenge Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Automated Spectral Botanical Authentication Engine"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Organization / Corporate Name</label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-muted-fg" />
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Detailed Technical Problem Description</label>
            <textarea
              required
              rows={4}
              placeholder="Describe the real-world operational bottleneck, hardware constraints, datasets, and performance targets..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-medium leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Required Skill Matrix (Comma-separated)</label>
            <div className="relative">
              <Tag className="w-4 h-4 absolute left-3.5 top-3 text-muted-fg" />
              <input
                type="text"
                required
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Target Engineering Deliverables</label>
            <input
              type="text"
              required
              value={targetDeliverables}
              onChange={(e) => setTargetDeliverables(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-semibold"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Difficulty Rating</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground font-semibold"
              >
                <option value="BEGINNER">BEGINNER</option>
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="ADVANCED">ADVANCED</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Sprint (Weeks)</label>
              <input
                type="number"
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 pt-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{loading ? "Publishing Challenge..." : "Publish Challenge to Ayush Repository"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
