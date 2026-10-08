"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const AUDIENCE_DATA = [
  { name: "Current", value: 520, color: "#6366f1" },
  { name: "New", value: 340, color: "#f43f5e" },
  { name: "Retargeted", value: 240, color: "#f59e0b" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: data.color }}></span>
          <span className="text-xs font-bold text-slate-800 sm:text-sm">{data.name}</span>
        </div>
        <p className="mt-1 text-xs font-extrabold text-slate-900">{data.value}k Users</p>
      </div>
    );
  }
  return null;
}

export function PipelineDonutChart() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-4">
      {/* Header matching Image 2: "Audience Overview" with Purple Dot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></span>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Audience Overview</h3>
        </div>

        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-slate-200/90 bg-white px-3.5 py-1.5 pr-8 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Leads">Leads</option>
            <option value="Clients">Clients</option>
          </select>
          <span className="pointer-events-none absolute top-2.5 right-2.5 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>

      {/* Semi-Circle Arc Donut Chart matching Image 2 */}
      <div className="relative mx-auto h-52 w-full max-w-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={AUDIENCE_DATA}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              cornerRadius={6}
            >
              {AUDIENCE_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Semi-Circle Text Overlay matching Image 2 */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-4 text-center">
          <span className="text-3xl font-black text-slate-900 sm:text-4xl">12M+</span>
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Total Amount
          </span>
        </div>
      </div>

      {/* Bottom Pill Legend matching Image 2 */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
          <span>New</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
          <span>Retargeted</span>
        </div>
      </div>
    </div>
  );
}
