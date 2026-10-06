// src/components/profile/tabs/security-tab.tsx
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
} from "lucide-react";
import { toast } from "@/lib/toast";

interface SecurityTabProps {
  twoFactorEnabled: boolean;
  onToggleTwoFactor: () => void;
}

export function SecurityTab({ twoFactorEnabled, onToggleTwoFactor }: SecurityTabProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
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
    setTimeout(() => {
      setUpdatingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password Updated Successfully", {
        description: "Your security credentials have been updated.",
      });
    }, 800);
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
                Two-Factor Authentication (2FA)
              </h3>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${twoFactorEnabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}
              >
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Require an authenticator code when logging into your administrative workspace.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTwoFactor}
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
                <p className="text-[11px] text-slate-500">Namakkal, TN, India • IP: 182.74.92.12</p>
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
                  iPhone 15 Pro • Safari Mobile
                </p>
                <p className="text-[11px] text-slate-500">
                  San Francisco, CA • Last active 4 hrs ago
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.success("iPhone session terminated")}
              className="self-end rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100 sm:self-center"
            >
              Revoke Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
