"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Award,
  PhoneCall,
  DollarSign,
  PieChart,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

interface ReportsHeaderProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  selectedRep: string;
  onRepChange: (rep: string) => void;
  onExportReport: () => void;
  stats: {
    totalRevenue: string;
    revenueGrowth: string;
    conversionRate: string;
    conversionGrowth: string;
    touchpoints: number;
    avgCycleDays: string;
  };
}

export function ReportsHeader({
  timeRange,
  onTimeRangeChange,
  selectedRep,
  onRepChange,
  onExportReport,
  stats,
}: ReportsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs md:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          {/* Title & Icon */}
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 to-purple-100 text-indigo-600 shadow-2xs">
              <BarChart3 className="h-6.5 w-6.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  Sales Performance & Client Reports
                </h1>
                <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide text-purple-700 uppercase">
                  Analytics Hub
                </span>
              </div>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                Track revenue performance, sales rep touchpoints, deal conversion velocity & client
                engagement
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onExportReport}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-98"
            >
              <Download className="h-4 w-4" /> Export Report (PDF/CSV)
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 md:flex-row md:items-center">
          {/* Time Range Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-bold text-slate-700">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Period:</span>
            </div>
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/70 p-1">
              {["This Month", "This Quarter", "Year to Date", "Last 30 Days"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onTimeRangeChange(r)}
                  className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    timeRange === r
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Sales Representative Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-bold text-slate-700">
              <Users className="h-4 w-4 text-slate-400" />
              <span>Representative:</span>
            </div>
            <select
              value={selectedRep}
              onChange={(e) => onRepChange(e.target.value)}
              className="min-w-48 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs outline-none focus:border-indigo-600"
            >
              <option value="all">All Sales Team Members</option>
              <option value="Karthik Raja">Karthik Raja (Senior Rep)</option>
              <option value="Ananya M.">Ananya M. (Account Exec)</option>
              <option value="Siddharth V.">Siddharth V. (Sales Lead)</option>
            </select>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
          {/* Card 1: Revenue Closed */}
          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950">Closed Revenue</span>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-700">{stats.totalRevenue}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>{stats.revenueGrowth} vs prev period</span>
            </div>
          </motion.div>

          {/* Card 2: Conversion Rate */}
          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950">Win Conversion Rate</span>
              <TrendingUp className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-indigo-700">{stats.conversionRate}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-indigo-700">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>{stats.conversionGrowth} deal velocity</span>
            </div>
          </motion.div>

          {/* Card 3: Touchpoints Logged */}
          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-950">Client Touchpoints</span>
              <PhoneCall className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-purple-700">{stats.touchpoints}</div>
            <div className="mt-1 text-[11px] font-semibold text-purple-600">
              Calls, emails & demos logged
            </div>
          </motion.div>

          {/* Card 4: Avg Deal Cycle */}
          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950">Avg Deal Cycle</span>
              <Award className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-amber-700">{stats.avgCycleDays}</div>
            <div className="mt-1 text-[11px] font-semibold text-amber-600">Lead to win average</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
