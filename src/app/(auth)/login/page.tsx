"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { PasswordInput } from "@/components/auth/password-input";
import { Mail, ArrowRight, Loader2, AlertCircle, Sparkles, KeyRound } from "lucide-react";
import { toast } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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

      toast.success("Welcome Back to Webxode OS!", {
        description: `Authenticated as ${data.user?.name || formData.email}`,
      });

      router.push("/dashboard");
    } catch (err: any) {
      const errorMsg = err.message || "An unexpected error occurred. Please try again.";
      setError(errorMsg);
      toast.error("Authentication Error", { description: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({
      email: "demo@webxode.com",
      password: "Password123!",
    });
    toast.info("Demo Credentials Pre-filled", {
      description: "Click 'Authenticate & Enter OS' to log in or test the API.",
    });
  };

  return (
    <AuthWrapper
      title="Welcome Back"
      subtitle="Authenticate your credentials to access internal CRM pipelines and workspace tools."
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

      {/* 1-Click Demo Fill Banner */}
      <div className="mb-5 flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-transparent p-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5 text-xs font-medium text-indigo-200">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/20 text-indigo-400">
            <KeyRound className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Testing Mode?</span>
            <span className="text-[11px] text-indigo-300/80">Load 1-click test credentials</span>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Work Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-bold tracking-wider text-slate-300 uppercase"
          >
            Work Email Address
          </label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 transition-colors group-focus-within:text-indigo-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
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

        {/* Password Input Component */}
        <PasswordInput
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          label="Password"
          placeholder="••••••••"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="group flex cursor-pointer items-center gap-2 text-xs text-slate-400 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded-md border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/40 focus:ring-offset-0"
            />
            <span className="transition-colors group-hover:text-slate-200">Remember 30 days</span>
          </label>
          <Link
            href={"/forgot-password" as any}
            className="text-xs font-bold text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Dynamic CTA Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-600 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-indigo-600/50 active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              <span>Authenticating with MongoDB...</span>
            </>
          ) : (
            <>
              <span>Authenticate & Enter OS</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* Alternative Link */}
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
