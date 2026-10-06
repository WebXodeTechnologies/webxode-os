// src/app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { PasswordInput } from "@/components/auth/password-input";
import { Mail, ArrowRight, Loader2, AlertCircle, KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2FA Challenge States
  const [requires2FA, setRequires2FA] = useState(false);
  const [userId, setUserId] = useState("");
  const [totpToken, setTotpToken] = useState("");

  // Step 1: Handle Email & Password Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Check your credentials.");
      }

      // Check if server demands 2FA verification
      if (data.requires2FA) {
        setRequires2FA(true);
        setUserId(data.userId);
        toast.info("2FA Required", { description: "Please enter your Google Authenticator code." });
        setLoading(false);
        return;
      }

      toast.success("Welcome Back to Webxode OS!", {
        description: `Authenticated as ${data.user?.name || formData.email}`,
      });

      router.push("/dashboard");
    } catch (err: any) {
      const errorMsg = err.message || "An unexpected error occurred. Please try again.";
      setError(errorMsg);
      toast.error("Authentication Error", { description: errorMsg });
      setLoading(false);
    }
  };

  // Step 2: Handle 6-Digit Code Submit
  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token: totpToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid 2FA verification code.");
      }

      toast.success("2FA Verification Successful!", {
        description: `Welcome back, ${data.user?.name || "Administrator"}`,
      });

      router.push("/dashboard");
    } catch (err: any) {
      const errorMsg = err.message || "Verification failed.";
      setError(errorMsg);
      toast.error("2FA Error", { description: errorMsg });
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({
      email: "demo@webxode.com",
      password: "Password123!",
    });
    toast.info("Demo Credentials Pre-filled");
  };

  return (
    <AuthWrapper
      title={requires2FA ? "Security Verification" : "Welcome Back"}
      subtitle={
        requires2FA
          ? "Enter the 6-digit code from your Google Authenticator app."
          : "Authenticate your credentials to access internal CRM pipelines and workspace tools."
      }
      activeTab="login"
    >
      {error && (
        <div className="animate-in fade-in mb-5 flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-300 backdrop-blur-md duration-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <div className="flex-1">
            <span className="block font-bold">Authentication Failure</span>
            <span className="text-slate-300">{error}</span>
          </div>
        </div>
      )}

      {!requires2FA ? (
        <>
          {/* 1-Click Demo Fill Banner */}
          <div className="mb-5 flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-transparent p-3.5 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-xs font-medium text-indigo-200">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/20 text-indigo-400">
                <KeyRound className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Testing Mode?</span>
                <span className="text-[11px] text-indigo-300/80">
                  Load 1-click test credentials
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-3 py-1.5 text-xs font-bold text-indigo-300 shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-600 hover:text-white"
            >
              Fill Demo
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase">
                Work Email Address
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 transition-colors group-focus-within:text-indigo-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@webxode.com"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3.5 pr-3.5 pl-10 text-sm text-white placeholder-slate-600 shadow-inner transition-all duration-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>
            </div>

            <PasswordInput
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              label="Password"
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between pt-1">
              <label className="group flex cursor-pointer items-center gap-2 text-xs text-slate-400 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded-md border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/40"
                />
                <span className="transition-colors group-hover:text-slate-200">
                  Remember 30 days
                </span>
              </label>
              <Link
                href={"/forgot-password" as any}
                className="text-xs font-bold text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-600 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter OS</span>
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Step 2: 2FA Verification Form */
        <form onSubmit={handle2FASubmit} className="space-y-5">
          <div className="flex items-center justify-center py-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-inner">
              <ShieldCheck className="h-8 w-8" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase">
              Google Authenticator Code
            </label>
            <div className="relative flex items-center">
              <KeyRound className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                maxLength={6}
                required
                placeholder="123456"
                value={totpToken}
                onChange={(e) => setTotpToken(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-4 pr-4 pl-10 text-center font-mono text-xl font-extrabold tracking-widest text-white placeholder:font-sans placeholder:font-normal placeholder:tracking-normal focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setRequires2FA(false);
                setTotpToken("");
              }}
              className="w-1/3 rounded-2xl border border-slate-800 bg-slate-900 py-3.5 text-xs font-bold text-slate-300 transition-all hover:bg-slate-800"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading || totpToken.length < 6}
              className="flex w-2/3 items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Confirm & Login</span>
              )}
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 text-center text-xs text-slate-400">
        New to Webxode OS?{" "}
        <Link
          href={"/register" as any}
          className="font-bold text-indigo-400 underline underline-offset-4 hover:text-indigo-300"
        >
          Create an account
        </Link>
      </div>
    </AuthWrapper>
  );
}
