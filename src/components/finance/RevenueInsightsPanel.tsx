"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

interface MonthlyData {
  month: string;
  invoiced: number;
  collected: number;
  pending: number;
}

const monthly: MonthlyData[] = [
  { month: "May", invoiced: 9.2, collected: 7.4, pending: 1.8 },
  { month: "Jun", invoiced: 10.5, collected: 8.8, pending: 1.7 },
  { month: "Jul", invoiced: 11.1, collected: 9.3, pending: 1.8 },
  { month: "Aug", invoiced: 13.4, collected: 10.8, pending: 2.6 },
  { month: "Sep", invoiced: 15.0, collected: 12.4, pending: 2.6 },
  { month: "Oct", invoiced: 18.6, collected: 14.2, pending: 4.4 },
];

const approvalQueue = [
  {
    id: "INV-2026-003",
    client: "Visual Bridge Media",
    amount: "₹60,000",
    type: "Milestone",
    daysWaiting: 5,
  },
  {
    id: "INV-2026-005",
    client: "TechCorp Solutions",
    amount: "₹45,000",
    type: "Sprint",
    daysWaiting: 3,
  },
  {
    id: "INV-2026-008",
    client: "SmartHealth Systems",
    amount: "₹55,000",
    type: "Service",
    daysWaiting: 2,
  },
];

const clientRevenue = [
  { name: "FoundersROI", code: "FR", amount: "₹1,12,500", percent: 100, color: "bg-indigo-500" },
  {
    name: "TechCorp Solutions",
    code: "TC",
    amount: "₹95,000",
    percent: 84,
    color: "bg-emerald-500",
  },
  { name: "Annai Agro", code: "AT", amount: "₹85,000", percent: 75, color: "bg-blue-500" },
  { name: "NovaBuild Infra", code: "NB", amount: "₹70,000", percent: 62, color: "bg-teal-500" },
  { name: "SmartHealth", code: "SH", amount: "₹55,000", percent: 49, color: "bg-violet-500" },
];

export function RevenueInsightsPanel() {
  const maxInvoiced = Math.max(...monthly.map((m) => m.invoiced));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Monthly Revenue Chart */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:shadow-md sm:p-7 lg:col-span-2">
        <div className="mb-5 flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Monthly Revenue Trajectory
            </h3>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">
              Invoiced vs collected — rolling 6-month view
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            <TrendingUp className="h-3.5 w-3.5" />
            +24.1% MoM
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 flex items-center gap-5 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Invoiced
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Collected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Pending
          </span>
        </div>

        {/* Bar chart */}
        <div className="space-y-4">
          {monthly.map((m, i) => (
            <div key={m.month} className="group">
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                <span className="w-8 text-slate-600">{m.month}</span>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="text-indigo-600">₹{m.invoiced}L</span>
                  <span className="text-emerald-600">₹{m.collected}L</span>
                  <span className="text-amber-600">₹{m.pending}L</span>
                </div>
              </div>
              <div className="flex h-7 gap-1 overflow-hidden rounded-lg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(m.collected / maxInvoiced) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-lg bg-emerald-500 opacity-90"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(m.pending / maxInvoiced) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.1, ease: "easeOut" }}
                  className="h-full rounded-lg bg-amber-400 opacity-80"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary row */}
        <div className="mt-5 grid grid-cols-3 gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          {[
            { label: "Total Invoiced", value: "₹77.8L", icon: DollarSign, color: "text-slate-800" },
            {
              label: "Total Collected",
              value: "₹62.9L",
              icon: CheckCircle2,
              color: "text-emerald-700",
            },
            { label: "Total Pending", value: "₹14.9L", icon: Clock, color: "text-amber-700" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center">
                <Icon className={`mx-auto h-4 w-4 ${item.color}`} />
                <p className={`mt-1 text-sm font-black ${item.color}`}>{item.value}</p>
                <p className="text-[11px] font-semibold text-slate-500">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right column: Approval Queue + Client Breakdown */}
      <div className="flex flex-col gap-6">
        {/* Approval Queue */}
        <div className="rounded-3xl border border-amber-200/80 bg-linear-to-b from-amber-50/50 to-white p-5 shadow-xs">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100">
                <Clock className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Approval Queue</h4>
                <p className="text-[11px] font-semibold text-slate-500">Pending finance release</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-700">
              {approvalQueue.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {approvalQueue.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ x: 3 }}
                className="flex items-center justify-between rounded-xl border border-amber-200/60 bg-white p-3 shadow-xs"
              >
                <div>
                  <p className="text-xs font-extrabold text-slate-900">{item.client}</p>
                  <p className="text-[11px] font-semibold text-slate-500">
                    {item.id} · {item.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">{item.amount}</p>
                  <p className="text-[11px] font-bold text-amber-600">
                    {item.daysWaiting}d waiting
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            Review All Approvals
          </button>
        </div>

        {/* Top Client Revenue Breakdown */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Top Clients by Revenue</h4>
              <p className="text-[11px] font-semibold text-slate-500">
                Current quarter contribution
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {clientRevenue.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-700">
                      {c.code}
                    </span>
                    <span className="text-slate-800">{c.name}</span>
                  </div>
                  <span className="font-black text-slate-900">{c.amount}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.percent}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`h-full rounded-full ${c.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
