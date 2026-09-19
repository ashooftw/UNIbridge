"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Layers, Cpu, Lock, Mail, CheckCircle2, AlertCircle, Sparkles, HeartPulse } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("aarav.sharma@ayush.edu.in");
  const [password, setPassword] = useState("demo12345");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const roles = [
    { id: "STUDENT", label: "Student Learner", icon: BookOpen, color: "text-blue-500", demoEmail: "aarav.sharma@ayush.edu.in" },
    { id: "FACULTY", label: "Academician / Faculty", icon: Layers, color: "text-teal-500", demoEmail: "dr.ramanujan@aiia.gov.in" },
    { id: "INDUSTRY_PARTNER", label: "Industry / Ayush Partner", icon: Cpu, color: "text-amber-500", demoEmail: "rd.lead@dabur-ayush.com" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg(`Welcome back, ${data.user.name}! Authenticated for UniBridge...`);
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      } else {
        setErrorMsg(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setErrorMsg("Network error during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
            <HeartPulse className="w-3.5 h-3.5" />
            Ministry of Ayush & AIIA SIH 2026 PS 26044
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Log in to Uni<span className="text-primary">Bridge</span>
          </h1>
          <p className="text-xs text-muted-fg max-w-sm mx-auto">
            Access verified academic credentials, Ayush R&D project repositories, and AI match engine.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6">
          
          {/* Role Selector Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-muted-fg uppercase tracking-wider">
              Select Your Tri-Partite Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => {
                const IconComp = r.icon;
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      setEmail(r.demoEmail);
                    }}
                    className={`p-2.5 rounded-xl border text-[11px] font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? "bg-primary/15 border-primary text-primary font-bold shadow-sm"
                        : "bg-background/50 border-border text-muted-fg hover:bg-muted"
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${r.color}`} />
                    <span className="truncate w-full text-center">{r.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alert Messages */}
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

          {/* Main Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Institutional / Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-muted-fg" />
                <input
                  type="email"
                  required
                  placeholder="name@ayush.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-muted-fg" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-primary text-primary-fg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? "Authenticating..." : "Log In to UniBridge"}</span>
            </button>
          </form>

          {/* Footer note */}
          <div className="text-center text-xs text-muted-fg pt-2 border-t border-border">
            Don&apos;t have an institutional account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Register Here
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
