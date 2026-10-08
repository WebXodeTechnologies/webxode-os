"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

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
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
      {/* Top Row: Label & Top-Right Icon matching Image 2 */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600 sm:text-sm">{data.label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-slate-50 text-slate-600">
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>

      {/* Middle Row: Big Bold Value matching Image 2 */}
      <div className="my-3">
        <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {data.value}
        </h3>
      </div>

      {/* Bottom Row: Trend Badge & Subtitle matching Image 2 */}
      {data.trend && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-100 bg-emerald-50 px-1.5 py-0.5">
            ▲ {data.trend}
          </span>
          <span className="text-xs font-semibold text-slate-500">{data.subtitle}</span>
        </div>
      )}
    </div>
  );
}
