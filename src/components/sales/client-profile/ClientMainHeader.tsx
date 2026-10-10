"use client";

import React from "react";
import {
  Star,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FolderKanban,
} from "lucide-react";

export function ClientMainHeader({
  lead,
  activeTab,
  onTabChange,
}: {
  lead?: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const tabs = [
    "Overview",
    "Projects",
    "Subscriptions",
    "Invoices",
    "Payments",
    "Statement",
    "Orders",
    "Estimates",
    "Proposals",
    "Contracts",
    "Files",
    "Expenses",
  ];

  const stats = [
    { label: "Projects", value: 4, icon: FolderKanban, color: "text-emerald-500" },
    { label: "Subscriptions", value: 2, icon: TrendingUp, color: "text-rose-500" },
    { label: "Orders", value: 0, icon: CheckCircle2, color: "text-slate-400" },
    { label: "Estimates", value: 3, icon: FileText, color: "text-blue-500" },
    { label: "Proposals", value: 2, icon: FileText, color: "text-amber-500" },
  ];

  return (
    <div className="rounded-t-[2.5rem] bg-white px-8 pt-8">
      {/* Top Title Bar */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex w-full items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h1 className="truncate text-xl font-black tracking-tight text-slate-900 md:text-2xl">
            {lead?.companyName || "Demo Client"}
          </h1>
          <button className="shrink-0 text-amber-400 transition hover:text-amber-500">
            <Star className="h-5 w-5 fill-current" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex scrollbar-none overflow-x-auto border-b border-slate-200">
        <div className="flex gap-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-4 text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab
                  ? "border-b-2 border-slate-900 text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex scrollbar-none justify-start gap-6 overflow-x-auto border-b border-slate-100 py-6 md:justify-between md:gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex min-w-20 flex-1 flex-col items-center text-center">
            <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="mt-1 text-[10px] font-bold text-slate-500 md:text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Alert Bar */}
      <div className="mt-6 flex flex-col justify-between gap-2 rounded-xl bg-blue-50 px-4 py-3 md:flex-row md:items-center">
        <p className="text-xs font-semibold text-blue-900 md:text-sm">
          There are 2 estimate requests awaiting your attention.
        </p>
        <button className="self-start text-xs font-bold text-blue-600 hover:text-blue-700 md:self-auto md:text-sm">
          View
        </button>
      </div>
    </div>
  );
}
