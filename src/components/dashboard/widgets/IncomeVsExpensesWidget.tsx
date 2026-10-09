"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export function IncomeVsExpensesWidget() {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>("Oct");

  const financialData = [
    { month: "Jun", income: 6.2, expense: 2.8, net: 3.4 },
    { month: "Jul", income: 7.1, expense: 3.0, net: 4.1 },
    { month: "Aug", income: 7.8, expense: 3.1, net: 4.7 },
    { month: "Sep", income: 8.0, expense: 3.4, net: 4.6 },
    { month: "Oct", income: 8.4, expense: 3.2, net: 5.2 },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Income vs Expenses P&L"
        subtitle="Corporate cash inflow, operating outflow, and net operating margin"
        badge="61.9% Net Margin"
        badgeVariant="success"
        actions={
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>Real-time Ledger</span>
          </div>
        }
      />

      {/* Top Overview Metric Cards with Spring Hover Physics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Gross Income */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/60 to-white p-4 shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-wider text-emerald-800 uppercase">
              Gross Income
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <h4 className="mt-2 text-2xl font-black tracking-tight text-emerald-950 sm:text-3xl">
            ₹8.4L
          </h4>
          <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-emerald-700">
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px]">▲ Retainers</span>
            Client billing active
          </p>
        </motion.div>

        {/* Operating Expenses */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative overflow-hidden rounded-2xl border border-rose-200/80 bg-linear-to-b from-rose-50/60 to-white p-4 shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-wider text-rose-800 uppercase">
              Operating Exp
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <h4 className="mt-2 text-2xl font-black tracking-tight text-rose-950 sm:text-3xl">
            ₹3.2L
          </h4>
          <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-rose-700">
            <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px]">▼ Overhead</span>
            Payroll, cloud & ops
          </p>
        </motion.div>

        {/* Net Profit Margin */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative overflow-hidden rounded-2xl border border-indigo-200/80 bg-linear-to-b from-indigo-50/60 to-white p-4 shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-wider text-indigo-800 uppercase">
              Net Profit
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <h4 className="mt-2 text-2xl font-black tracking-tight text-indigo-950 sm:text-3xl">
            ₹5.2L
          </h4>
          <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-indigo-700">
            <span className="font-extxl rounded bg-indigo-100 px-1.5 py-0.5 text-[10px]">
              61.9% ratio
            </span>
            Healthy margin
          </p>
        </motion.div>
      </div>

      {/* Comparative Monthly P&L Breakdown */}
      <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-700">Monthly Trajectory (Income vs Expenses in ₹ Lakhs)</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xs"></span> Income
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-xs"></span> Expenses
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {financialData.map((d) => {
            const isHovered = hoveredMonth === d.month;
            return (
              <motion.div
                key={d.month}
                onHoverStart={() => setHoveredMonth(d.month)}
                onHoverEnd={() => setHoveredMonth(null)}
                className={`rounded-2xl border p-3.5 transition-all ${
                  isHovered
                    ? "border-indigo-300 bg-slate-50 shadow-xs"
                    : "border-slate-100 bg-slate-50/40"
                }`}
              >
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg border border-slate-200/80 bg-white px-2 py-0.5 shadow-2xs">
                      {d.month} 2026
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Net: <strong className="text-indigo-600">₹{d.net}L</strong>
                    </span>
                  </div>
                  <div className="space-x-3">
                    <span className="font-extxl text-emerald-600">Income: ₹{d.income}L</span>
                    <span className="font-extxl text-rose-600">Exp: ₹{d.expense}L</span>
                  </div>
                </div>

                {/* Dual Proportional Bar Graphic */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Income Bar */}
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200/70">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.income / 10) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 rounded-full bg-emerald-500 shadow-xs"
                    />
                  </div>
                  {/* Expense Bar */}
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200/70">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.expense / 10) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 rounded-full bg-rose-500 shadow-xs"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </WidgetCard>
  );
}
