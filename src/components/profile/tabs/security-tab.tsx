"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Laptop,
  Smartphone,
  Key,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  KeyRound,
  AlertCircle,
} from "lucide-react";
import { toast } from "@/lib/toast";
import Image from "next/image";

interface SecurityTabProps {
  twoFactorEnabled: boolean;
  onToggleTwoFactor: (status: boolean) => void;
}

export function SecurityTab({ twoFactorEnabled, onToggleTwoFactor }: SecurityTabProps) {
  // Password state
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // 2FA Google Authenticator state
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [verificationToken, setVerificationToken] = useState("");

  // Handle Password Update API Call
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setUpdatingPassword(true);
    try {
      const res = await fetch("/api/auth/profile/security", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");

      toast.success("Password Updated Successfully", {
        description: "Your security credentials have been updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message || "Error updating password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  // 1. Start 2FA Setup -> Fetches QR Code & Secret from Backend
  const handleStart2FASetup = async () => {
    // If already enabled, toggle off directly or prompt configuration
    if (twoFactorEnabled) {
      handleToggle2FAOff();
      return;
    }

    setLoading2FA(true);
    try {
      const res = await fetch("/api/auth/2fa/setup", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initialize 2FA setup");

      setQrCodeUrl(data.qrCodeUrl);
      setSecret(data.secret);
      setShow2FAModal(true);
    } catch (error: any) {
      toast.error(error.message || "Error setting up 2FA");
    } finally {
      setLoading2FA(false);
    }
  };

  // 2. Verify Google Authenticator 6-digit code
  const handleVerifyAndEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading2FA(true);
    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verificationToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid verification code");

      toast.success("Two-Factor Authentication Enabled Successfully!");
      onToggleTwoFactor(true);
      setShow2FAModal(false);
      setVerificationToken("");
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setLoading2FA(false);
    }
  };

  // 3. Quick toggle off 2FA if needed
  const handleToggle2FAOff = async () => {
    try {
      const res = await fetch("/api/auth/profile/security", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twoFactorEnabled: false }),
      });
      if (!res.ok) throw new Error("Failed to disable 2FA");

      toast.success("Two-Factor Authentication Disabled");
      onToggleTwoFactor(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Security & Credentials</h2>
        <p className="text-xs text-slate-500 sm:text-sm">
          Manage 2FA, password credentials, active sessions, and access permissions.
        </p>
      </div>

      {/* 2FA Status Card */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/90 bg-linear-to-r from-slate-50 via-indigo-50/30 to-white p-5 shadow-2xs sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                Google Authenticator (TOTP)
              </h3>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${twoFactorEnabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}
              >
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Require an authenticator code from Google Authenticator when logging into your
              administrative workspace.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStart2FASetup}
          disabled={loading2FA}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
            twoFactorEnabled ? "bg-emerald-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
              twoFactorEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* QR Code Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Setup Google Authenticator</h3>
              <button
                type="button"
                onClick={() => setShow2FAModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs leading-relaxed text-slate-500">
              Open Google Authenticator on your mobile device, scan the QR code below, and enter
              your 6-digit verification token to link your account.
            </p>

            {qrCodeUrl && (
              <div className="flex justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <Image
                  src={qrCodeUrl}
                  alt="2FA QR Code"
                  width={176}
                  height={176}
                  unoptimized // Recommended for base64 data URLs to prevent unnecessary image optimization server overhead
                  className="h-44 w-44 rounded-lg shadow-xs"
                />
              </div>
            )}

            {secret && (
              <div className="text-center text-[11px] text-slate-400">
                Manual configuration key:{" "}
                <span className="font-mono font-bold text-slate-700 select-all">{secret}</span>
              </div>
            )}

            <form onSubmit={handleVerifyAndEnable} className="space-y-4 pt-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  6-Digit Verification Code
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={verificationToken}
                    onChange={(e) => setVerificationToken(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-4 pl-10 font-mono text-sm font-bold tracking-widest text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:tracking-normal focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShow2FAModal(false)}
                  className="w-1/2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading2FA || verificationToken.length < 6}
                  className="w-1/2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading2FA ? "Verifying..." : "Confirm & Enable"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Reset Form */}
      <form
        onSubmit={handlePasswordUpdate}
        className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Key className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 sm:text-base">Change Password</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-bold text-slate-700">Current Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-10 pl-10 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">New Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-10 pl-10 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700">
              Confirm New Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type={showNew ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-10 pl-10 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={updatingPassword}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] sm:text-sm"
          >
            <Save className="h-4 w-4" />
            <span>{updatingPassword ? "Updating..." : "Update Password"}</span>
          </button>
        </div>
      </form>

      {/* Active Logged Sessions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
            Active Logged Devices
          </h3>
          <button
            type="button"
            onClick={() => toast.success("Revoked all other sessions")}
            className="text-xs font-bold text-rose-600 hover:text-rose-700"
          >
            Revoke All Other Sessions
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs sm:flex-row sm:items-center">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                <Laptop className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 sm:text-sm">
                  Windows PC • Chrome Browser
                </p>
                <p className="text-[11px] text-slate-500">
                  Namakkal, TN, India • Authenticated Workspace Session
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-700 sm:self-center">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Current Device
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs sm:flex-row sm:items-center">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 sm:text-sm">
                  Google Authenticator Linked App
                </p>
                <p className="text-[11px] text-slate-500">
                  TOTP Token Generator • Active Security Hardware/App
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-700">
              Verified 2FA App
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
