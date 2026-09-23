"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("aarav.sharma@ayush.edu.in");
  const [password, setPassword] = useState("demo12345");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const roles = [
    { id: "STUDENT", label: "Student", demoEmail: "aarav.sharma@ayush.edu.in" },
    { id: "FACULTY", label: "Academician", demoEmail: "dr.ramanujan@aiia.gov.in" },
    { id: "INDUSTRY_PARTNER", label: "Industry Lead", demoEmail: "rd.lead@dabur-ayush.com" },
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
        localStorage.setItem("unibridge_user_role", role);
        localStorage.setItem("unibridge_user", JSON.stringify(data.user));

        setSuccessMsg(`Welcome back, ${data.user.name}! Authenticating...`);
        setTimeout(() => {
          if (role === "FACULTY") {
            router.push("/telemetry");
          } else if (role === "INDUSTRY_PARTNER") {
            router.push("/pipeline");
          } else {
            router.push("/repository");
          }
          router.refresh();
        }, 800);
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#0b0f17] text-[#dfe2ee]">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-2.5 py-0.5 rounded bg-[#161e2e] text-[#a3b18a] border border-[#222e40] font-mono text-[11px] uppercase font-semibold">
            SIH 2026 • PS 26044 Auth Portal
          </span>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-white">
            Log in to Uni<span className="text-[#f59e0b]">Bridge</span>
          </h1>
          <p className="font-body text-xs text-[#94a3b8] max-w-sm mx-auto">
            Access verified academic credentials, Ayush R&D project repositories, and AI match engine.
          </p>
        </div>

        {/* Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#121824] border border-[#222e40] shadow-xl space-y-6">
          
          {/* Role Selector */}
          <div className="space-y-2 font-mono text-[11px]">
            <label className="block text-[#94a3b8] uppercase tracking-wider font-bold">
              Select Active Portal Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => {
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      setEmail(r.demoEmail);
                    }}
                    className={`py-2 px-1 rounded-md text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-[#1a2538] text-[#ffc174] border border-[#f59e0b]/40 shadow-sm"
                        : "bg-[#161e2e] text-[#94a3b8] border border-[#222e40] hover:text-white"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-[#ffb4ab]/15 border border-[#ffb4ab]/30 text-[#ffb4ab] text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30 text-[#4edea3] text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 font-mono text-xs">
              <label className="block text-[#94a3b8]">Institutional Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3.5 rounded-lg bg-[#161e2e] border border-[#222e40] text-white focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <label className="block text-[#94a3b8]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 px-3.5 rounded-lg bg-[#161e2e] border border-[#222e40] text-white focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-hover-lift w-full py-3 rounded-lg bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-slate-950 font-bold text-xs shadow-md mt-2"
            >
              {loading ? "Authenticating..." : "Authenticate Portal Session"}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="pt-2 text-center font-mono text-xs text-[#94a3b8]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#ffc174] hover:underline font-bold">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

