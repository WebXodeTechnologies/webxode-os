"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, DollarSign } from "lucide-react";

type TimeFilter = "This year" | "Month" | "Week";

const DATASETS: Record<TimeFilter, { label: string; revenue: number; collections: number }[]> = {
  "This year": [
    { label: "Feb", revenue: 420, collections: 380 },
    { label: "Mar", revenue: 680, collections: 610 },
    { label: "Apr", revenue: 610, collections: 550 },
    { label: "May", revenue: 580, collections: 520 },
    { label: "Jun", revenue: 450, collections: 410 },
    { label: "July", revenue: 520, collections: 490 },
    { label: "Aug", revenue: 580, collections: 540 },
    { label: "Sep", revenue: 690, collections: 640 },
    { label: "Oct", revenue: 840, collections: 780 },
    { label: "Nov", revenue: 760, collections: 710 },
    { label: "Dec", revenue: 920, collections: 880 },
  ],
  Month: [
    { label: "Week 1", revenue: 190, collections: 175 },
    { label: "Week 2", revenue: 240, collections: 220 },
    { label: "Week 3", revenue: 210, collections: 195 },
    { label: "Week 4", revenue: 280, collections: 260 },
  ],
  Week: [
    { label: "Mon", revenue: 35, collections: 30 },
    { label: "Tue", revenue: 45, collections: 42 },
    { label: "Wed", revenue: 60, collections: 55 },
    { label: "Thu", revenue: 50, collections: 48 },
    { label: "Fri", revenue: 85, collections: 80 },
    { label: "Sat", revenue: 40, collections: 38 },
    { label: "Sun", revenue: 20, collections: 18 },
  ],
};

function PerformanceTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md"
      >
        <div className="mb-2 flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">{label}</span>
          <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-extrabold text-indigo-600">
            Live Metric
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-xs ring-2 ring-indigo-100"></span>
              <span className="text-xs font-semibold text-slate-600">Revenue</span>
            </div>
            <span className="text-sm font-black text-slate-900">₹{payload[0].value}k</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xs ring-2 ring-emerald-100"></span>
              <span className="text-xs font-semibold text-slate-600">Collections</span>
            </div>
            <span className="text-sm font-black text-slate-900">₹{payload[1].value}k</span>
          </div>
        </div>
      </motion.div>
    );
  }
  return null;
}

export function BusinessPerformanceChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("This year");
  const chartData = DATASETS[timeFilter];

  return (
    <div className="space-y-5">
      {/* Top Header & Live Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Revenue vs Collections
              </h3>
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Real-time financial trajectory analysis
            </p>
          </div>
        </div>

        {/* Time Segmented Selector Pill Buttons */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200/60 bg-slate-100/80 p-1">
          {(["This year", "Month", "Week"] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setTimeFilter(filter)}
              className={`relative rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                timeFilter === filter
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Infograph Area Chart Container with Micro-Animations */}
      <div className="h-72 w-full pt-2 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Gorgeous Indigo Gradient for Revenue */}
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              {/* Emerald Gradient for Collections */}
              <linearGradient id="collectionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
              tickFormatter={(val) => `₹${val}k`}
            />

            <Tooltip content={<PerformanceTooltip />} />

            {/* Revenue Area Curve */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#revenueGradient)"
              activeDot={{ r: 6, fill: "#6366f1", stroke: "#ffffff", strokeWidth: 3 }}
            />

            {/* Collections Area Curve */}
            <Area
              type="monotone"
              dataKey="collections"
              stroke="#10b981"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#collectionsGradient)"
              activeDot={{ r: 5, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend Footer */}
      <div className="flex items-center justify-center gap-6 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-md bg-indigo-600 shadow-2xs"></span>
          <span className="text-xs font-bold text-slate-700">Gross Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-md bg-emerald-500 shadow-2xs"></span>
          <span className="text-xs font-bold text-slate-700">Successful Collections</span>
        </div>
      </div>
    </div>
  );
}
