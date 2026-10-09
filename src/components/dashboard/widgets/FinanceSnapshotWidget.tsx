"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { DollarSign, ArrowUpRight, Clock, Plus, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";

export function FinanceSnapshotWidget() {
  return (
    <WidgetCard>
      <WidgetHeader
        title="Financial Snapshot & Cashflow"
        subtitle="Revenue collected, outstanding client balances, and invoice health"
        badge="81% Collection Rate"
        badgeVariant="success"
        actions={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Invoice</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Billed Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition hover:border-slate-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
              Total Billed
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
          </div>
          <h4 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            ₹8.4L
          </h4>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5">
              ▲ 14.2%
            </span>
            <span className="font-semibold text-slate-500">vs last month</span>
          </div>
        </motion.div>

        {/* Cash Collected Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/60 to-white p-4 shadow-2xs transition hover:border-emerald-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-wider text-emerald-800 uppercase">
              Cash Collected
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <h4 className="mt-2 text-2xl font-black tracking-tight text-emerald-950 sm:text-3xl">
            ₹6.8L
          </h4>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Bank & UPI verified
            </span>
          </div>
        </motion.div>

        {/* Outstanding Balance Card */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative overflow-hidden rounded-2xl border border-amber-200/80 bg-linear-to-b from-amber-50/60 to-white p-4 shadow-2xs transition hover:border-amber-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-wider text-amber-800 uppercase">
              Outstanding
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <h4 className="mt-2 text-2xl font-black tracking-tight text-amber-950 sm:text-3xl">
            ₹1.6L
          </h4>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700">
            <span className="rounded-md border border-amber-200 bg-amber-100 px-1.5 py-0.5">
              3 pending
            </span>
            <span className="font-semibold text-amber-800">Due this week</span>
          </div>
        </motion.div>
      </div>

      {/* Animated Collection Progress Bar & Goal Status */}
      <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-xs font-bold sm:text-sm">
          <span className="text-slate-700">Monthly Cash Collection Goal</span>
          <span className="flex items-center gap-1 font-extrabold text-emerald-600">
            <span>₹6.8L / ₹8.4L</span>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-black text-emerald-700">
              81%
            </span>
          </span>
        </div>

        {/* Progress Track with Animated Width */}
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "81%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-linear-to-r from-emerald-500 to-teal-400 shadow-xs"
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-slate-400">
          <span>Target: ₹8.4L milestone</span>
          <span className="flex items-center gap-1 font-bold text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Live Sync Active
          </span>
        </div>
      </div>
    </WidgetCard>
  );
}
