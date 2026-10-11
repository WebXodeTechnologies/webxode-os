"use client";

import React from "react";
import {
  ClipboardList,
  Calculator,
  FileText,
  Receipt,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { PresalesDashboardMetrics } from "@/modules/presales/presales.types";

interface PresalesDashboardOverviewProps {
  metrics: PresalesDashboardMetrics;
  onQuickAction: (stage: string) => void;
}

export function PresalesDashboardOverview({
  metrics,
  onQuickAction,
}: PresalesDashboardOverviewProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* 1. Requirements Scoping Queue */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onQuickAction("Requirement")}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-blue-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-blue-50 opacity-60 transition-transform duration-500 group-hover:scale-150" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-xs transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
            <Clock className="h-3 w-3" />
            <span>Active Discovery</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Scoping Backlog
          </p>
          <p className="mt-0.5 flex items-baseline gap-1.5 text-4xl font-black tracking-tighter text-slate-900">
            {metrics.scopingCount}
            <span className="text-[11px] font-medium tracking-normal text-slate-400 lowercase">
              requirements
            </span>
          </p>
        </div>
      </motion.div>

      {/* 2. Technical Estimations */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onQuickAction("Estimation")}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-amber-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-amber-50 opacity-60 transition-transform duration-500 group-hover:scale-150" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-xs transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            <Sparkles className="h-3 w-3" />
            <span>{metrics.estimationCount} In Progress</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Engineering Effort
          </p>
          <p className="mt-0.5 flex items-baseline gap-1.5 text-4xl font-black tracking-tighter text-slate-900">
            {metrics.totalEstimatedHours.toLocaleString("en-IN")}
            <span className="text-[11px] font-medium tracking-normal text-slate-400 lowercase">
              total hrs
            </span>
          </p>
        </div>
      </motion.div>

      {/* 3. Proposals & SOW Drafting */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onQuickAction("Proposal")}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-indigo-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-indigo-50 opacity-60 transition-transform duration-500 group-hover:scale-150" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-xs transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
            <ArrowUpRight className="h-3 w-3" />
            <span>Reviewing</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Active Proposals & SOW
          </p>
          <p className="mt-0.5 flex items-baseline gap-1.5 text-4xl font-black tracking-tighter text-slate-900">
            {metrics.proposalCount}
            <span className="text-[11px] font-medium tracking-normal text-slate-400 lowercase">
              drafts & sent
            </span>
          </p>
        </div>
      </motion.div>

      {/* 4. Commercial Quotations & Margin Protection */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onQuickAction("Quotation")}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-emerald-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-50 opacity-60 transition-transform duration-500 group-hover:scale-150" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-xs transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
            <Receipt className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <span>{metrics.averageMarginPercent}% Avg Margin</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Commercial Quotes
          </p>
          <p className="mt-0.5 flex items-baseline gap-1.5 text-4xl font-black tracking-tighter text-slate-900">
            {metrics.quotationCount + metrics.negotiationCount}
            <span className="text-[11px] font-medium tracking-normal text-slate-400 lowercase">
              negotiating
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
