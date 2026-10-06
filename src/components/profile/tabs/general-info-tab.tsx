// src/components/profile/tabs/general-info-tab.tsx
"use client";

import { User, Mail, Building, Phone, MapPin, Sparkles, Save } from "lucide-react";
import { UserProfile } from "../types";

interface GeneralInfoTabProps {
  user: UserProfile;
  onChangeUser: (updated: UserProfile) => void;
  onSave: (e: React.FormEvent) => void;
  saving: boolean;
}

export function GeneralInfoTab({ user, onChangeUser, onSave, saving }: GeneralInfoTabProps) {
  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
          <p className="text-xs text-slate-500">
            Update your account credentials and personal metadata.
          </p>
        </div>
        <Sparkles className="h-5 w-5 text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">Full Name</label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={user.name}
              onChange={(e) => onChangeUser({ ...user, name: e.target.value })}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-4 pl-10 text-xs font-semibold text-slate-900 placeholder-slate-400 shadow-2xs transition-all focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            Email Address (Read-Only)
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100/80 py-3 pr-4 pl-10 text-xs font-semibold text-slate-500 shadow-2xs sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">Department</label>
          <div className="relative flex items-center">
            <Building className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <select
              value={user.department}
              onChange={(e) => onChangeUser({ ...user, department: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-4 pl-10 text-xs font-semibold text-slate-900 shadow-2xs transition-all focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
            >
              <option value="development">Development & Engineering</option>
              <option value="design">UI/UX & Branding</option>
              <option value="sales">Sales & Growth</option>
              <option value="finance">Revenue & Finance</option>
              <option value="management">Executive Leadership</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">Phone Number</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={user.phone}
              onChange={(e) => onChangeUser({ ...user, phone: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-4 pl-10 text-xs font-semibold text-slate-900 shadow-2xs transition-all focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            Location / Headquarters
          </label>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={user.location}
              onChange={(e) => onChangeUser({ ...user, location: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-4 pl-10 text-xs font-semibold text-slate-900 shadow-2xs transition-all focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            Professional Summary / Bio
          </label>
          <textarea
            rows={4}
            value={user.bio}
            onChange={(e) => onChangeUser({ ...user, bio: e.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-xs font-medium text-slate-900 shadow-2xs transition-all focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-xs font-medium text-slate-400">Last synced: Today at 07:55 AM</p>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 sm:text-sm"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
        </button>
      </div>
    </form>
  );
}
