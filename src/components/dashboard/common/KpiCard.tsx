"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export interface KpiCardData {
  id: string;
  label: string;
  value: string | number;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  visualType?:
    "sparkline_area" | "sparkline_bar" | "status_dots" | "progress_ring" | "progress_bar";
  sparklineData?: number[];
  progressValue?: number;
  statusDots?: { label: string; count: number; color: string }[];
}

interface KpiCardProps {
  data: KpiCardData;
}

export function KpiCard({ data }: KpiCardProps) {
  const Icon = data.icon;
  const isPositive = data.trendType !== "down";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-colors hover:border-indigo-300 hover:shadow-md"
    >
      {/* Top Row: Label & Colorful Interactive Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600 sm:text-sm">{data.label}</span>
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-xs transition-transform ${
            data.iconBg || "bg-indigo-50"
          } ${data.iconColor || "text-indigo-600"}`}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Middle Row: Big Bold Value with subtle pop animation */}
      <div className="my-3">
        <motion.h3
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
        >
          {data.value}
        </motion.h3>
      </div>

      {/* Bottom Row: Trend Badge & Subtitle */}
      {data.trend && (
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <span
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 ${
              isPositive
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {isPositive ? "▲" : "▼"} {data.trend}
          </span>
          <span className="text-xs font-semibold text-slate-500">{data.subtitle}</span>
        </div>
      )}

      {/* Optional Status Dots Interactive Micro-Display */}
      {data.statusDots && data.statusDots.length > 0 && (
        <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-2.5">
          {data.statusDots.map((dot, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600"
            >
              <span className={`h-2 w-2 rounded-full ${dot.color} animate-pulse`} />
              <span>
                {dot.count} {dot.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
