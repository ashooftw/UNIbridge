"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Layers, Cpu, Mail, User, Building, CheckCircle2, AlertCircle, Sparkles, HeartPulse } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [institution, setInstitution] = useState("All India Institute of Ayurveda (AIIA)");
  const [department, setDepartment] = useState("Ayush Health Informatics");
  const [skills, setSkills] = useState("Python, Next.js, FHIR Standards");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, institution, department, skills }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Registration successful! Redirecting to UniBridge workspace...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
      } else {
        setErrorMsg(data.error || "Registration failed. Please check inputs.");
      }
    } catch (err) {
      setErrorMsg("Network error during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
            <HeartPulse className="w-3.5 h-3.5" />
            Institutional Portal Signup (SIH 2026 PS 26044)
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Register for Uni<span className="text-primary">Bridge</span>
          </h1>
          <p className="text-xs text-muted-fg max-w-sm mx-auto">
            Create your verified student, faculty, or industry partner profile.
          </p>
        </div>

        {/* Form Container Card */}
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

          <form onSubmit={handleSignup} className="space-y-4">
            
            {/* Role Radio */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">Select Profile Role</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRole("STUDENT")}
                  className={`p-2 rounded-xl border text-[11px] font-bold ${role === "STUDENT" ? "bg-primary text-primary-fg border-primary" : "bg-background border-border text-muted-fg"}`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("FACULTY")}
                  className={`p-2 rounded-xl border text-[11px] font-bold ${role === "FACULTY" ? "bg-primary text-primary-fg border-primary" : "bg-background border-border text-muted-fg"}`}
                >
                  Faculty
                </button>
                <button
                  type="button"
                  onClick={() => setRole("INDUSTRY_PARTNER")}
                  className={`p-2 rounded-xl border text-[11px] font-bold ${role === "INDUSTRY_PARTNER" ? "bg-primary text-primary-fg border-primary" : "bg-background border-border text-muted-fg"}`}
                >
                  Industry Lead
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-muted-fg" />
                <input
                  type="text"
                  required
                  placeholder="Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-muted-fg" />
                <input
                  type="email"
                  required
                  placeholder="aarav@ayush.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Skill Matrix (Comma-separated)</label>
              <input
                type="text"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? "Creating Profile..." : "Complete Institutional Registration"}</span>
            </button>
          </form>

          <div className="text-center text-xs text-muted-fg pt-2 border-t border-border">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
