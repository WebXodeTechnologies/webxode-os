"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TimeFilter = "This year" | "Month" | "Week";

const MOCK_BAR_DATA = [
  { label: "Feb", value: 420 },
  { label: "Mar", value: 680 },
  { label: "Apr", value: 610 },
  { label: "May", value: 580 },
  { label: "Jun", value: 450 },
  { label: "July", value: 520 },
  { label: "Aug", value: 580 },
  { label: "Sep", value: 690 },
  { label: "Oct", value: 780 },
  { label: "Nov", value: 600 },
  { label: "Dec", value: 640 },
];

interface PerformanceTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function PerformanceTooltip({ active, payload, label }: PerformanceTooltipProps) {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md">
        <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-indigo-600"></span>
          <span className="text-xs font-semibold text-slate-700">Revenue:</span>
          <span className="text-base font-black text-slate-900">${val}k</span>
        </div>
      </div>
    );
  }
  return null;
}

export function BusinessPerformanceChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("This year");

  return (
    <div className="space-y-4">
      {/* Header matching Image 2: "Revenue Status" with Purple Dot & Rounded Dropdown */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></span>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Revenue Status</h3>
        </div>

        {/* Time Selector Dropdown matching Image 2 */}
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
            className="cursor-pointer appearance-none rounded-xl border border-slate-200/90 bg-white px-3.5 py-1.5 pr-8 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none"
          >
            <option value="This year">This year</option>
            <option value="Month">This month</option>
            <option value="Week">This week</option>
          </select>
          <span className="pointer-events-none absolute top-2.5 right-2.5 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>

      {/* Main Bar Chart matching Oura Image 2 */}
      <div className="h-72 w-full pt-2 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip content={<PerformanceTooltip />} />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
