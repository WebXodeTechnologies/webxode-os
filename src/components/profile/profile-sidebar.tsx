// src/components/profile/profile-sidebar.tsx
"use client";

import {
  User,
  Activity,
  Globe,
  Lock,
  Briefcase,
  Folder,
  Clock,
  FileText,
  Coffee,
  DollarSign,
  Sliders,
  Menu as MenuIcon,
} from "lucide-react";
import { TabCategory } from "./types";

export const TAB_CATEGORIES: TabCategory[] = [
  {
    group: "ACCOUNT & IDENTITY",
    items: [
      { id: "general", label: "General Info", icon: User },
      { id: "timeline", label: "Activity Log", icon: Activity, badge: "New" },
      { id: "social", label: "Social Links", icon: Globe },
      { id: "account", label: "Security & Passwords", icon: Lock },
    ],
  },
  {
    group: "WORK & TEAM",
    items: [
      { id: "job", label: "Job & Hierarchy", icon: Briefcase },
      { id: "projects", label: "My Projects", icon: Briefcase, badge: "3" },
      { id: "files", label: "Documents & Files", icon: Folder, badge: "12" },
    ],
  },
  {
    group: "TIME & FINANCE",
    items: [
      { id: "timesheets", label: "Timesheets", icon: Clock },
      { id: "timecards", label: "Time Cards", icon: FileText },
      { id: "leave", label: "Leave Balance", icon: Coffee, badge: "14d" },
      { id: "expenses", label: "Expenses & Receipts", icon: DollarSign },
    ],
  },
  {
    group: "PREFERENCES",
    items: [
      { id: "preferences", label: "System Preferences", icon: Sliders },
      { id: "menu", label: "Navigation Menu", icon: MenuIcon },
    ],
  },
];

// Flat list of all items for mobile/laptop horizontal pill bar
const ALL_TABS = TAB_CATEGORIES.flatMap((c) => c.items);

interface ProfileSidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export function ProfileSidebar({ activeTab, onSelectTab }: ProfileSidebarProps) {
  return (
    <>
      {/* MOBILE & LAPTOP SCREEN (< 1280px): Sticky Horizontal Pill Bar with Smooth X-Axis Scroll */}
      <div className="sticky top-16 z-20 mb-2 block w-full scrollbar-none overflow-x-auto border-b border-slate-200/60 bg-white/90 px-1 py-2.5 backdrop-blur-md [-ms-overflow-style:none] lg:top-20 xl:hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-2 px-1">
          {ALL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md ring-2 shadow-indigo-600/25 ring-indigo-600/20"
                    : "border border-slate-200/80 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-indigo-500/30 text-white"
                        : "border border-indigo-200/80 bg-indigo-50 text-indigo-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP SCREEN (>= 1280px): Vertical Sidebar */}
      <div className="hidden space-y-6 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm xl:block">
        {TAB_CATEGORIES.map((cat) => (
          <div key={cat.group} className="space-y-1.5">
            <p className="px-3 text-[10px] font-black tracking-wider text-slate-400 uppercase">
              {cat.group}
            </p>
            <div className="space-y-1">
              {cat.items.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectTab(tab.id)}
                    className={`group flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-xs font-bold transition-all duration-150 sm:text-sm ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon
                        className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                        }`}
                      />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? "bg-indigo-500/30 text-white"
                            : "border border-indigo-100 bg-indigo-50 text-indigo-700"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
