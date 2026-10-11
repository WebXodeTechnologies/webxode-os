"use client";

import React from "react";
import { Plus, Download, Sparkles, Layers, Clock, TrendingUp } from "lucide-react";

interface PresalesHeaderProps {
  totalPipelineValue: number;
  activeDecksCount: number;
  averageTurnaroundDays: number;
  onExport: () => void;
  onNewRequirement: () => void;
}

export function PresalesHeader({
  totalPipelineValue,
  activeDecksCount,
  averageTurnaroundDays,
  onExport,
  onNewRequirement,
}: PresalesHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white px-8 py-10 shadow-xs">
      {/* Subtle Background Radial / Linear Glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-linear-to-bl from-indigo-50/70 via-slate-50/30 to-transparent opacity-80" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-50/50 blur-2xl" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Titles & Context */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-indigo-200/70 bg-indigo-50/80 px-3.5 py-1 text-[10px] font-black tracking-widest text-indigo-700 uppercase shadow-2xs">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              Solution & Presales Hub
            </span>
            <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Enterprise Presales{" "}
            <span className="bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
              Engine
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed font-medium text-slate-600">
            Technical requirement scoping, modular effort estimation, formal SOW proposal drafting,
            and commercial quotation negotiations. Bridge qualified sales deals directly into
            production-ready execution.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Layers className="h-4 w-4 text-indigo-500" />
              <span>
                <strong className="text-slate-800">{activeDecksCount}</strong> Active Solution Decks
              </span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Clock className="h-4 w-4 text-emerald-500" />
              <span>
                <strong className="text-slate-800">{averageTurnaroundDays}d</strong> Avg. Proposal
                Turnaround
              </span>
            </div>
          </div>
        </div>

        {/* Right: Metrics & Actions */}
        <div className="flex flex-wrap items-center gap-5 lg:justify-end">
          {/* Presales Pipeline Metric Widget */}
          <div className="group relative flex w-full items-center gap-5 rounded-3xl border border-indigo-100 bg-linear-to-b from-white to-indigo-50/40 p-3 shadow-sm transition-all hover:shadow-md hover:shadow-indigo-500/10 sm:w-auto sm:pr-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-inner transition-transform group-hover:scale-105">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-indigo-600/90 uppercase">
                Proposal Pipeline Value
              </p>
              <p className="bg-linear-to-r from-indigo-700 to-blue-600 bg-clip-text text-3xl font-black tracking-tighter text-transparent">
                ₹{totalPipelineValue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={onExport}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-6 text-sm font-bold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
            >
              <Download className="h-4.5 w-4.5 text-slate-400" />
              <span>Export SOW</span>
            </button>

            <button
              type="button"
              onClick={onNewRequirement}
              className="flex h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95 sm:flex-none"
            >
              <Plus className="h-5 w-5" />
              <span>New Requirement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
