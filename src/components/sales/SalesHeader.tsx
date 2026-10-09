"use client";

import React from "react";
import Link from "next/link";
import { Plus, Download, TrendingUp, Sparkles } from "lucide-react";

interface SalesHeaderProps {
  activeLeadsCount: number;
  totalPipelineValue: number;
  onExport: () => void;
}

export function SalesHeader({ activeLeadsCount, totalPipelineValue, onExport }: SalesHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white px-8 py-10 shadow-xs">
      {/* Subtle Background Pattern */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-linear-to-bl from-slate-50 to-transparent opacity-60"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Titles */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-700 uppercase">
              <Sparkles className="h-3 w-3 text-emerald-500" />
              Sales CRM
            </span>
            <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Enterprise Sales{" "}
            <span className="bg-indigo-400 bg-clip-text text-transparent">Engine</span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed font-medium text-slate-900">
            Multi-source lead acquisition, requirement checklists, qualification tracking, and
            seamless Presales handovers. Complete control of your active business opportunities.
          </p>
        </div>

        {/* Right: Metrics & Actions */}
        <div className="flex flex-wrap items-center gap-5 lg:justify-end">
          {/* Pipeline Value Metric */}
          <div className="group relative flex w-full items-center gap-5 rounded-3xl border border-emerald-100 bg-linear-to-b from-white to-emerald-50/50 p-3 shadow-sm transition-all hover:shadow-md hover:shadow-emerald-500/10 sm:w-auto sm:pr-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 shadow-inner">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-emerald-600/80 uppercase">
                Pipeline Value
              </p>
              <p className="bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-3xl font-black tracking-tighter text-transparent">
                ₹{totalPipelineValue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={onExport}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-6 text-sm font-bold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
            >
              <Download className="h-4.5 w-4.5 text-slate-400" />
              <span>Export</span>
            </button>

            <Link
              href="/dashboard/sales/leads/new"
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95 sm:flex-none"
            >
              <Plus className="h-5 w-5" />
              <span>New Lead</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
