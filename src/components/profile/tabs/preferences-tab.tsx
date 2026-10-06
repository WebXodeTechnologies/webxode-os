// src/components/profile/tabs/preferences-tab.tsx
"use client";

import { useState } from "react";
import { Sliders, Bell, Eye, Volume2, Layout, Save, Check } from "lucide-react";
import { toast } from "@/lib/toast";

interface PreferencesTabProps {
  darkAccents: boolean;
  onToggleDarkAccents: () => void;
  emailAlerts: boolean;
  onToggleEmailAlerts: () => void;
}

export function PreferencesTab({
  darkAccents,
  onToggleDarkAccents,
  emailAlerts,
  onToggleEmailAlerts,
}: PreferencesTabProps) {
  const [compactLayout, setCompactLayout] = useState(false);
  const [desktopSound, setDesktopSound] = useState(true);
  const [digestFreq, setDigestFreq] = useState("instant");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">
          System Preferences & Workspace Settings
        </h2>
        <p className="text-xs text-slate-500 sm:text-sm">
          Customize interface density, alert frequencies, sound cues, and navigation layout.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Visual & Layout */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Visual & Layout Customization
          </h3>

          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold text-slate-900 sm:text-sm">
                High-Contrast Light Theme Accents
              </p>
              <p className="text-[11px] text-slate-500">
                Enable crisp slate borders and indigo highlights in dashboard cards.
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleDarkAccents}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                darkAccents ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                  darkAccents ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold text-slate-900 sm:text-sm">
                Compact Table & Card Density
              </p>
              <p className="text-[11px] text-slate-500">
                Reduce vertical padding across dashboard data tables for higher information density.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCompactLayout(!compactLayout);
                toast.success(compactLayout ? "Normal density set" : "Compact density enabled");
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                compactLayout ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                  compactLayout ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 2: Notifications & Sound */}
        <div className="space-y-4 border-t border-slate-100 pt-4">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Notifications & Alert Dispatch
          </h3>

          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold text-slate-900 sm:text-sm">
                Instant Email Notifications
              </p>
              <p className="text-[11px] text-slate-500">
                Receive immediate email alerts on high-value lead submissions and proposal
                approvals.
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleEmailAlerts}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                emailAlerts ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                  emailAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold text-slate-900 sm:text-sm">
                Audio Feedback & Sound Cues
              </p>
              <p className="text-[11px] text-slate-500">
                Play subtle audio chime when completing system tasks and generating PDF proposals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDesktopSound(!desktopSound);
                toast.success(desktopSound ? "Audio cues muted" : "Audio cues enabled");
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                desktopSound ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                  desktopSound ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
            <p className="text-xs font-bold text-slate-900 sm:text-sm">Digest Summary Frequency</p>
            <p className="text-[11px] text-slate-500">
              Choose how often administrative summary reports are delivered to your inbox.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: "instant", label: "Realtime" },
                { id: "daily", label: "Daily Digest" },
                { id: "weekly", label: "Weekly Summary" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setDigestFreq(opt.id);
                    toast.success("Digest frequency updated", { description: opt.label });
                  }}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                    digestFreq === opt.id
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-2xs"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
