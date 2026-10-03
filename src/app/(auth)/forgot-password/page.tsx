"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { PasswordInput } from "@/components/auth/password-input";
import { Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      const msg = "New password and confirmation password do not match.";
      setError(msg);
      toast.error("Validation Error", { description: msg });
      return;
    }

    if (formData.newPassword.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setError(msg);
      toast.error("Weak Password", { description: msg });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccess(true);
      toast.success("Password Updated Successfully!", {
        description: "Your password hash has been updated in MongoDB. Redirecting to login...",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: any) {
      const errorMsg = err.message || "An unexpected error occurred. Please try again.";
      setError(errorMsg);
      toast.error("Reset Failed", { description: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch =
    formData.confirmPassword.length > 0 && formData.newPassword === formData.confirmPassword;

  return (
    <AuthWrapper
      title="Reset Credentials"
      subtitle="Update your Webxode OS password securely using email account verification."
      activeTab="forgot-password"
    >
      {error && (
        <div className="animate-in fade-in mb-5 flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-300 backdrop-blur-md duration-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <div className="flex-1">
            <span className="block font-bold">Reset Error</span>
            <span className="text-slate-300">{error}</span>
          </div>
        </div>
      )}

      {success ? (
        <div className="animate-in zoom-in-95 space-y-6 py-6 text-center duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/10 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="h-9 w-9 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">Password Successfully Updated</h3>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-400">
              Your new password has been hashed with BCrypt and stored in MongoDB. You will now be
              redirected to the sign-in page.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-indigo-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Redirecting to Sign In...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="name@webxode.com"
                autoComplete="email"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3.5 pr-3.5 pl-10 text-sm text-white placeholder-slate-600 shadow-inner transition-all duration-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* New Password */}
          <PasswordInput
            id="newPassword"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            label="New Password"
            placeholder="Enter new password"
            showStrengthMeter={true}
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-bold tracking-wider text-slate-300 uppercase"
              >
                Confirm New Password
              </label>
              {formData.confirmPassword.length > 0 && (
                <span
                  className={`flex items-center gap-1 text-[11px] font-bold ${passwordsMatch ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {passwordsMatch ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <AlertCircle className="h-3 w-3" />
                  )}
                  {passwordsMatch ? "Passwords match" : "Mismatch"}
                </span>
              )}
            </div>
            <PasswordInput
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              label=""
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
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
                <span>Updating Password in MongoDB...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                <span>Update Credentials & Save</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Return to Sign In Link */}
      <div className="mt-6 text-center text-xs text-slate-400">
        Remembered your password?{" "}
        <Link
          href={"/login" as any}
          className="font-bold text-indigo-400 underline underline-offset-4 hover:text-indigo-300"
        >
          Return to Sign In
        </Link>
      </div>
    </AuthWrapper>
  );
}
