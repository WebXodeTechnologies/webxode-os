"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";

const PIPELINE_DISTRIBUTION = [
  { name: "New Leads", value: 24.0, count: 128, color: "#3b82f6" }, // Blue
  { name: "Qualified", value: 14.2, count: 42, color: "#6366f1" }, // Indigo
  { name: "Requirements", value: 9.8, count: 26, color: "#8b5cf6" }, // Violet
  { name: "Proposals", value: 6.4, count: 18, color: "#ec4899" }, // Pink
  { name: "Negotiation", value: 3.2, count: 8, color: "#f59e0b" }, // Amber
  { name: "Won Deals", value: 1.8, count: 5, color: "#10b981" }, // Emerald
];

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-xl backdrop-blur-md"
      >
        <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2">
          <span
            className="h-2.5 w-2.5 rounded-full shadow-xs"
            style={{ backgroundColor: data.color }}
          ></span>
          <span className="text-xs font-extrabold text-slate-800">{data.name}</span>
        </div>
        <div className="space-y-0.5 text-xs">
          <p className="font-bold text-slate-900">Value: ₹{data.value}L</p>
          <p className="font-semibold text-slate-500">Volume: {data.count} active deals</p>
        </div>
      </motion.div>
    );
  }
  return null;
}

export function PipelineDonutChart() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-4">
      {/* Header & Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></span>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Pipeline Valuation Mix</h3>
        </div>

        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-slate-200/90 bg-white px-3.5 py-1.5 pr-8 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none"
          >
            <option value="All">All Stages</option>
            <option value="Active">Active Only</option>
            <option value="Won">Won Deals</option>
          </select>
          <span className="pointer-events-none absolute top-2.5 right-2.5 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>

      {/* Semi-Circle Arc Donut Chart Container */}
      <div className="relative mx-auto h-56 w-full max-w-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={PIPELINE_DISTRIBUTION}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="75%"
              startAngle={180}
              endAngle={0}
              innerRadius={75}
              outerRadius={105}
              paddingAngle={4}
              cornerRadius={8}
            >
              {PIPELINE_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Semi-Circle Text Overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-3 text-center">
          <span className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            ₹59.4L
          </span>
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Total Pipeline Valuation
          </span>
        </div>
      </div>

      {/* Bottom Interactive Pill Legend */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {PIPELINE_DISTRIBUTION.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-white"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
