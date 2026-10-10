"use client";

import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Activity, Download, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { DateRangeFilter } from "./types";

interface ActivityHeaderProps {
  selectedDateRange: DateRangeFilter;
  onDateRangeChange: (range: DateRangeFilter) => void;
  onExportCSV: () => void;
  totalLogsCount: number;
}

export const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  selectedDateRange,
  onDateRangeChange,
  onExportCSV,
  totalLogsCount,
}) => {
  const dateOptions: DateRangeFilter[] = ["Today", "This Week", "All Time"];

  const handleExportClick = () => {
    onExportCSV();
    toast.success("Sales Activity Audit CSV exported successfully!", {
      icon: "📥",
      style: {
        borderRadius: "16px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "700",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8"
    >
      {/* Decorative background ambient glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-linear-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Title & Metadata */}
        <div className="flex items-start gap-4 sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
            <Activity className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                Salesperson Activity Stream
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                Audit Live: {totalLogsCount} Logs
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
              Real-time audit log tracking calls, emails, WhatsApp updates, demos, and stage changes
              for WebXode OS.
            </p>
          </div>
        </div>

        {/* Controls: Date Filter Buttons & CSV Export */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter Segmented Controls */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200/90 bg-slate-100/80 p-1 text-xs font-bold shadow-2xs">
            <Calendar className="ml-2 h-3.5 w-3.5 text-slate-400" />
            {dateOptions.map((range) => {
              const isActive = selectedDateRange === range;
              return (
                <button
                  key={range}
                  onClick={() => onDateRangeChange(range)}
                  className={`rounded-xl px-3 py-1.5 transition-all active:scale-95 ${
                    isActive
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>

          {/* One-Click CSV Export CTA */}
          <button
            onClick={handleExportClick}
            className="inline-flex items-center gap-2 rounded-2xl border border-indigo-500/30 bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm shadow-indigo-500/25 transition-all hover:brightness-110 active:scale-98"
          >
            <Download className="h-4 w-4" />
            Export CSV Log
          </button>
        </div>
      </div>
    </motion.div>
  );
};
