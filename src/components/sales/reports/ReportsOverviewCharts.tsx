"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  PhoneCall,
  Mail,
  Video,
  FileCheck,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";

export function ReportsOverviewCharts() {
  const monthlyData = [
    { month: "May 2026", revenue: "₹8,50,000", heightPct: 45, deals: 6 },
    { month: "Jun 2026", revenue: "₹10,20,000", heightPct: 60, deals: 8 },
    { month: "Jul 2026", revenue: "₹9,80,000", heightPct: 55, deals: 7 },
    { month: "Aug 2026", revenue: "₹12,40,000", heightPct: 75, deals: 11 },
    { month: "Sep 2026", revenue: "₹13,10,000", heightPct: 82, deals: 12 },
    { month: "Oct 2026", revenue: "₹14,80,000", heightPct: 95, deals: 14 },
  ];

  const funnelStages = [
    { stage: "New Lead", count: 48, pct: 100, color: "bg-slate-300 text-slate-800" },
    { stage: "Contacted", count: 38, pct: 79, color: "bg-blue-400 text-white" },
    { stage: "Discovery Call", count: 29, pct: 60, color: "bg-indigo-500 text-white" },
    { stage: "Proposal Sent", count: 22, pct: 45, color: "bg-purple-500 text-white" },
    { stage: "Contract Negotiation", count: 18, pct: 37, color: "bg-amber-500 text-white" },
    { stage: "Closed Won", count: 14, pct: 29, color: "bg-emerald-600 text-white" },
  ];

  const touchpointBreakdown = [
    {
      channel: "Follow-up Calls",
      count: 68,
      pct: "48%",
      icon: PhoneCall,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      channel: "Sales Emails",
      count: 42,
      pct: "30%",
      icon: Mail,
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      channel: "Product Demos",
      count: 20,
      pct: "14%",
      icon: Video,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      channel: "SOW Reviews",
      count: 12,
      pct: "8%",
      icon: FileCheck,
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Visual Chart 1: Revenue & Deals Trend (2 cols) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Revenue Growth & Deal Velocity
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Monthly closed revenue trends for WebXode OS
              </p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
            +18.4% MoM
          </span>
        </div>

        {/* Visual Bar Graph */}
        <div className="mt-6 flex h-56 items-end justify-between gap-3 px-2 pt-8">
          {monthlyData.map((item) => (
            <div key={item.month} className="group flex flex-1 flex-col items-center gap-2">
              <div className="text-[10px] font-extrabold text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                {item.deals} deals
              </div>
              <div className="relative flex w-full justify-center">
                <div
                  style={{ height: `${item.heightPct * 1.8}px` }}
                  className="w-full max-w-14 rounded-2xl bg-linear-to-t from-indigo-600 to-indigo-400 shadow-xs transition-all group-hover:scale-105 group-hover:from-emerald-600 group-hover:to-emerald-400"
                />
              </div>
              <div className="text-center">
                <div className="text-[11px] font-black text-slate-800">{item.revenue}</div>
                <div className="text-[10px] font-bold text-slate-400">{item.month}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Chart 2: Touchpoint Breakdown (1 col) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-600">
              <PieIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Activity Breakdown</h3>
              <p className="text-xs font-semibold text-slate-500">Total 142 logged actions</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {touchpointBreakdown.map((tp) => {
            const Icon = tp.icon;
            return (
              <div
                key={tp.channel}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-all hover:bg-white hover:shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border ${tp.color}`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">{tp.channel}</div>
                    <div className="text-[11px] font-semibold text-slate-500">
                      {tp.count} logged
                    </div>
                  </div>
                </div>
                <span className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-black text-slate-800">
                  {tp.pct}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Section 3: Funnel Stage Velocity (Full width) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Sales Funnel Conversion & Drop-off Analysis
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Lead conversion efficiency across sales stages
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500">29.1% Total Funnel Conversion</span>
        </div>

        {/* Funnel Progress Bars */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {funnelStages.map((st, idx) => (
            <div
              key={st.stage}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:bg-white hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-black text-slate-500">
                  <span>STAGE {idx + 1}</span>
                  <span>{st.pct}%</span>
                </div>
                <div className="mt-1.5 text-xs leading-tight font-black text-slate-900">
                  {st.stage}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-xl font-black text-slate-800">{st.count} Leads</div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    style={{ width: `${st.pct}%` }}
                    className={`h-full rounded-full ${st.color}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
