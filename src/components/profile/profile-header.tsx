// src/components/profile/profile-header.tsx
"use client";

import Image from "next/image";
import { Mail, Building, Save, Camera, Download, Copy, MapPin, ShieldCheck } from "lucide-react";
import { toast } from "@/lib/toast";
import { getDefaultAvatar } from "@/lib/avatars";
import { UserProfile } from "./types";

interface ProfileHeaderProps {
  user: UserProfile;
  onEditClick: () => void;
}

export function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  const avatarConfig = getDefaultAvatar(user.role, user.department, user.name);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email);
    toast.success("Copied to Clipboard", { description: user.email });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-linear-to-r from-white via-indigo-50/40 to-slate-50 p-5 text-slate-900 shadow-sm sm:p-6 lg:p-8">
      {/* Soft Ambient Light Glow & Pattern */}
      <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -mb-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        {/* Avatar & User Details */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Avatar Frame with Camera Action */}
          <div className="group relative shrink-0">
            <div
              className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl sm:h-28 sm:w-28 ${avatarConfig.bgClass} border border-slate-200/80 shadow-md ring-4 ring-white`}
            >
              <Image
                src={avatarConfig.imageUrl}
                alt={user.name}
                width={112}
                height={112}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                toast.info("Avatar Editor", { description: "Select avatar in Workspace Settings" })
              }
              className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-indigo-600 shadow-sm transition-all hover:bg-indigo-50 hover:text-indigo-700"
              title="Change Avatar"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Meta Text */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {user.name}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-lg border border-indigo-200/80 bg-indigo-50 px-2.5 py-0.5 text-xs font-bold tracking-wide text-indigo-700 uppercase">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                {user.role}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                System Active
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Mail className="h-3.5 w-3.5 text-indigo-600" />
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-slate-400 transition-colors hover:text-slate-800"
                title="Copy email address"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                {user.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Building className="h-3.5 w-3.5 text-cyan-600" />
                <span className="capitalize">{user.department}</span>
              </span>
            </div>

            <p className="max-w-2xl pt-1 text-sm leading-relaxed font-normal text-slate-700 sm:text-base">
              {user.bio}
            </p>
          </div>
        </div>

        {/* Quick Header Actions */}
        <div className="flex flex-wrap items-center gap-3 xl:shrink-0">
          <button
            type="button"
            onClick={onEditClick}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
          <button
            type="button"
            onClick={() =>
              toast.success("Dossier Generated", {
                description: "Profile summary downloaded as PDF.",
              })
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC ROLE & WORKSPACE STATS STRIP */}
      <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200/80 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500">Account Authority</p>
          <p className="mt-0.5 truncate text-sm font-extrabold text-emerald-700 capitalize sm:text-base lg:text-lg">
            {user.role === "admin" ? "Super Administrator" : `${user.role} Member`}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500">Assigned Department</p>
          <p className="mt-0.5 truncate text-sm font-extrabold text-slate-900 capitalize sm:text-base lg:text-lg">
            {user.department || "Development"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500">Security & Governance</p>
          <p className="mt-0.5 truncate text-sm font-extrabold text-indigo-700 sm:text-base lg:text-lg">
            {user.role === "admin" ? "Full System Root" : "Standard User"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500">System Availability</p>
          <p className="mt-0.5 truncate text-sm font-extrabold text-cyan-700 sm:text-base lg:text-lg">
            99.98% Uptime
          </p>
        </div>
      </div>
    </div>
  );
}
