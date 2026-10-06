// src/components/profile/tabs/social-tab.tsx
"use client";

import { ExternalLink, Save } from "lucide-react";
import { UserProfile } from "../types";

interface SocialTabProps {
  user: UserProfile;
  onChangeUser: (updated: UserProfile) => void;
  onSave?: (e: React.FormEvent) => void;
  saving?: boolean;
}

export function SocialTab({ user, onChangeUser, onSave, saving }: SocialTabProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-900">Social Profiles & Portfolios</h2>
        <p className="text-xs text-slate-500">
          Connect your public developer and corporate profiles.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            GitHub Repository Profile
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={user.github}
              onChange={(e) => onChangeUser({ ...user, github: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 p-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
            />
            <a
              href={user.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 text-slate-700 hover:bg-slate-200"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            LinkedIn Corporate Profile
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={user.linkedin}
              onChange={(e) => onChangeUser({ ...user, linkedin: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 p-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
            />
            <a
              href={user.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 text-slate-700 hover:bg-slate-200"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-slate-100 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 sm:text-sm"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Saving Changes..." : "Save Social Links"}</span>
        </button>
      </div>
    </form>
  );
}
