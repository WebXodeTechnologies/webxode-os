"use client";

import React from "react";
import {
  Star,
  FileText,
  CheckCircle2,
  FolderKanban,
  CheckSquare,
  Building2,
  Sparkles,
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
    "Tasks",
    "Invoices",
    "Payments",
    "Orders",
    "Estimates",
    "Proposals",
    "Contracts",
    "Files",
    "Expenses",
  ];

  const stats = [
    {
      label: "Projects",
      value: lead?.projectsCount ?? 4,
      icon: FolderKanban,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Tasks",
      value: lead?.tasksCount ?? 8,
      icon: CheckSquare,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Orders",
      value: lead?.ordersCount ?? 3,
      icon: CheckCircle2,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Estimates",
      value: lead?.estimatesCount ?? 3,
      icon: FileText,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Proposals",
      value: lead?.proposalsCount ?? 2,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all md:p-8">
      {/* Top Title Bar */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-linear-to-br from-indigo-50 to-slate-100 text-indigo-600 shadow-2xs">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                {lead?.companyName || "Demo Client"}
              </h1>
              <button
                type="button"
                className="shrink-0 text-amber-400 transition hover:scale-110 hover:text-amber-500"
                title="Star Client"
              >
                <Star className="h-5 w-5 fill-current" />
              </button>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">
              ID: <span className="font-mono text-indigo-600">{lead?.id || "LD-98214"}</span> •{" "}
              {lead?.industry || "Software & Tech"}
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-2xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Active Account
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex scrollbar-none overflow-x-auto border-b border-slate-200/90">
        <div className="flex gap-2 sm:gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`relative px-3 pt-1 pb-3 text-xs font-bold whitespace-nowrap transition-all duration-150 sm:text-sm ${
                  isActive ? "font-black text-indigo-600" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full bg-indigo-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-3.5 transition-all hover:bg-white hover:shadow-sm"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-lg font-black tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="truncate text-xs font-semibold text-slate-500">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Bar */}
      <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl border border-indigo-100 bg-linear-to-r from-indigo-50/90 to-blue-50/80 px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 shrink-0 text-indigo-600" />
          <p className="text-xs font-semibold text-indigo-950 sm:text-sm">
            There are <span className="font-extrabold text-indigo-600">2 pending estimates</span>{" "}
            awaiting client approval.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onTabChange("Estimates")}
          className="self-start rounded-xl border border-indigo-200 bg-white px-3.5 py-1.5 text-xs font-bold text-indigo-600 shadow-2xs transition-all hover:bg-indigo-600 hover:text-white sm:self-auto"
        >
          View Estimates →
        </button>
      </div>
    </div>
  );
}
