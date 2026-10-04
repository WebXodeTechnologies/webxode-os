"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { PasswordInput } from "@/components/auth/password-input";
import {
  User,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  Building2,
  Code2,
  Briefcase,
  UserCheck,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const ROLES = [
  { id: "user", label: "Team Staff", icon: UserCheck, desc: "Department Access" },
  { id: "admin", label: "Admin / Founder", icon: Shield, desc: "Full Unrestricted Access" },
];

const DEPARTMENTS = [
  { id: "development", label: "Development & Engineering" },
  { id: "sales", label: "Sales & Growth" },
  { id: "revenue", label: "Revenue & Finance" },
  { id: "hr", label: "HR & Operations" },
  { id: "general", label: "General Staff" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    department: "development",
  });
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please accept the workspace security agreement to proceed.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      toast.success("Account Provisioned Successfully!", {
        description: `Welcome to Webxode OS, ${data.user?.name || formData.name}!`,
      });

      router.push("/dashboard");
    } catch (err: any) {
      const errorMsg = err.message || "An error occurred during registration.";
      setError(errorMsg);
      toast.error("Registration Error", { description: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper
      title="Create Account"
      subtitle="Provision an enterprise account to join Webxode OS internal operations."
      activeTab="register"
    >
      {error && (
        <div className="animate-in fade-in mb-5 flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-300 backdrop-blur-md duration-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <div className="flex-1">
            <span className="block font-bold">Provisioning Error</span>
            <span className="text-slate-300">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-bold tracking-wider text-slate-300 uppercase"
          >
            Full Name
          </label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 transition-colors group-focus-within:text-indigo-400">
              <User className="h-4 w-4" />
            </div>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Akash S M"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3.5 pr-3.5 pl-10 text-sm text-white placeholder-slate-600 shadow-inner transition-all duration-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Work Email Address */}
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
              placeholder="akash@webxode.com"
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3.5 pr-3.5 pl-10 text-sm text-white placeholder-slate-600 shadow-inner transition-all duration-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Password Input Component with Strength Meter */}
        <PasswordInput
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          label="Password"
          placeholder="••••••••"
          showStrengthMeter={true}
          autoComplete="new-password"
        />

        {/* Interactive Visual Role Cards */}
        <div className="space-y-2 pt-1">
          <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase">
            Select Account Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const isSelected = formData.role === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setFormData({ ...formData, role: r.id })}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-500/90 bg-indigo-500/20 text-white shadow-lg ring-1 shadow-indigo-500/20 ring-indigo-400"
                      : "border-slate-800/90 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:bg-slate-900/70 hover:text-slate-200"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                      isSelected ? "text-indigo-400" : "text-slate-500"
                    }`}
                  />
                  <span className="mt-1.5 text-xs font-bold">{r.label}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{r.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Department Select */}
        <div className="space-y-1.5">
          <label
            htmlFor="department"
            className="block text-xs font-bold tracking-wider text-slate-300 uppercase"
          >
            Assigned Department (RBAC Scope)
          </label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 transition-colors group-focus-within:text-indigo-400">
              <Building2 className="h-4 w-4" />
            </div>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3.5 pr-3.5 pl-10 text-sm text-white shadow-inner transition-all duration-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id} className="bg-slate-900 text-white">
                  {dept.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Security Policy Agreement */}
        <div className="pt-1">
          <label className="group flex cursor-pointer items-start gap-2.5 text-xs text-slate-400 select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded-md border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/40 focus:ring-offset-0"
            />
            <span className="leading-relaxed transition-colors group-hover:text-slate-300">
              I agree to the{" "}
              <span className="font-bold text-indigo-400">Webxode OS Security Policy</span> and
              consent to JWT session cookie storage.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-600 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-indigo-600/50 active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              <span>Provisioning User in MongoDB...</span>
            </>
          ) : (
            <>
              <span>Provision Workspace Account</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* Alternative Link */}
      <div className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link
          href={"/login" as any}
          className="font-bold text-indigo-400 underline underline-offset-4 hover:text-indigo-300"
        >
          Sign in
        </Link>
      </div>
    </AuthWrapper>
  );
}
