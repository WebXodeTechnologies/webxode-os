"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, Plus, FileCheck, Calendar, Users, ShieldCheck } from "lucide-react";
import { SalesRepActivitySummary } from "./types";

interface ActivityHeaderProps {
  reps: SalesRepActivitySummary[];
  selectedRep: string;
  onRepChange: (repId: string) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  onOpenLogModal: () => void;
  onOpenReviewModal: () => void;
  reviewReadinessScore: number;
}

export function ActivityHeader({
  reps,
  selectedRep,
  onRepChange,
  timeRange,
  onTimeRangeChange,
  onOpenLogModal,
  onOpenReviewModal,
  reviewReadinessScore,
}: ActivityHeaderProps) {
  const activeRepObj = reps.find((r) => r.id === selectedRep || r.name === selectedRep);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-linear-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <Activity className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  Sales Activity Audit Stream
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Audit Score: {reviewReadinessScore}%
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Unifying call logs, demo outcomes, proposal deliveries, and lead stage changes
                across WebXode OS.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-2.5 text-xs font-black text-slate-700 transition-all hover:border-indigo-200 hover:bg-indigo-50/60 hover:text-indigo-700 hover:shadow-2xs active:scale-98"
            >
              <FileCheck className="h-4 w-4 text-indigo-600" />
              Generate Audit Report
            </button>

            <button
              onClick={onOpenLogModal}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm shadow-indigo-500/25 transition-all hover:brightness-110 active:scale-98"
            >
              <Plus className="h-4 w-4" />
              Log Sales Activity
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Users className="h-3.5 w-3.5 text-indigo-500" />
              Sales Rep:
            </label>
            <div className="relative">
              <select
                value={selectedRep}
                onChange={(e) => onRepChange(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pr-8 pl-3.5 text-xs font-black tracking-tight text-slate-800 shadow-2xs transition-colors hover:border-slate-300 focus:border-indigo-500 focus:outline-hidden"
              >
                <option value="all">All Sales Reps ({reps.length})</option>
                {reps.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.name} — {rep.role}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {activeRepObj && (
              <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-bold text-indigo-700 md:flex">
                <Image
                  src={activeRepObj.avatar}
                  alt={activeRepObj.name}
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-full object-cover"
                />
                Target: {activeRepObj.activityTargetPct}%
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-indigo-500" />
              Timeframe:
            </label>
            <div className="flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 text-xs font-bold">
              {["this_month", "last_month", "quarter_q3"].map((range) => {
                const labels: Record<string, string> = {
                  this_month: "October 2026",
                  last_month: "September 2026",
                  quarter_q3: "Q3 Review",
                };
                const isActive = timeRange === range;
                return (
                  <button
                    key={range}
                    onClick={() => onTimeRangeChange(range)}
                    className={`rounded-lg px-3 py-1.5 transition-all ${
                      isActive
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {labels[range]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
