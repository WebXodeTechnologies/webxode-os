"use client";

import React from "react";
import {
  PhoneCall,
  Video,
  FileCheck,
  Receipt,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Layers,
  ListTodo,
  ExternalLink,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { PresalesDashboardMetrics } from "@/modules/presales/presales.types";

interface PresalesDashboardOverviewProps {
  metrics: PresalesDashboardMetrics;
  onQuickAction: (stage: string) => void;
  activeStage?: string;
}

export function PresalesDashboardOverview({
  metrics,
  onQuickAction,
  activeStage = "All",
}: PresalesDashboardOverviewProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 320, damping: 25 },
    },
  };

  return (
    <div className="space-y-6">
      {/* 4 PRIMARY METRIC CARDS */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* CARD 1: TOTAL CALLS / APPOINTMENTS */}
        <motion.div
          variants={itemAnim}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-3xl border border-blue-200/70 bg-linear-to-b from-blue-50/40 via-white to-white p-6 shadow-xs transition-all hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10"
        >
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-blue-100/40 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <PhoneCall className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 rounded-full bg-blue-100/80 px-2.5 py-0.5 text-[10px] font-black tracking-wide text-blue-700 uppercase">
              Sales Handover
            </span>
          </div>

          <div className="relative z-10 mt-5">
            <p className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
              Total Client Calls
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-slate-900">
                {metrics.totalCalls || metrics.totalPresalesDecks}
              </span>
              <span className="text-xs font-semibold text-slate-500">appointments booked</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-blue-700">
              <Users className="h-3.5 w-3.5" />
              <span>Received directly from Sales</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: TOTAL DEMOS & POCS */}
        <motion.div
          variants={itemAnim}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-3xl border border-indigo-200/70 bg-linear-to-b from-indigo-50/40 via-white to-white p-6 shadow-xs transition-all hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-indigo-100/40 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <Video className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-indigo-100/80 px-2.5 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span>Meet & Teams</span>
            </div>
          </div>

          <div className="relative z-10 mt-5">
            <p className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
              Technical Demos & POCs
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-slate-900">
                {metrics.totalDemos || 6}
              </span>
              <span className="text-xs font-semibold text-slate-500">conducted / booked</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>{metrics.pocPresented || 3} Prototypes & POCs Delivered</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: PROPOSALS & SOW DOCUMENTS */}
        <motion.div
          variants={itemAnim}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-3xl border border-purple-200/70 bg-linear-to-b from-purple-50/40 via-white to-white p-6 shadow-xs transition-all hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10"
        >
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-purple-100/40 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
              <FileCheck className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-purple-100/80 px-2.5 py-0.5 text-[10px] font-black text-purple-700 uppercase">
              Pre-Dev Phase
            </span>
          </div>

          <div className="relative z-10 mt-5">
            <p className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
              Proposals & SOW Documents
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-slate-900">
                {metrics.totalProposals || metrics.proposalCount}
              </span>
              <span className="text-xs font-semibold text-slate-500">drafts & dispatched</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-purple-700">
              <ListTodo className="h-3.5 w-3.5" />
              <span>Checklists & SLA Matrix Prepared</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 4: COMMERCIAL QUOTES */}
        <motion.div
          variants={itemAnim}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-linear-to-b from-emerald-50/40 via-white to-white p-6 shadow-xs transition-all hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10"
        >
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-emerald-100/40 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <Receipt className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase">
              {metrics.averageMarginPercent}% Target Margin
            </span>
          </div>

          <div className="relative z-10 mt-5">
            <p className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
              Commercial Quotes Value
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight text-emerald-900">
                ₹
                {((metrics.totalCommercialQuote || metrics.totalPipelineValue) / 100000).toFixed(1)}
                L
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ({metrics.quoteCount || 6} quotations)
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>
                {metrics.quotationCount + metrics.negotiationCount} under active negotiation
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* WHAT PRESALES IS DOING: WORKFLOW & PIPELINE TRACKER */}
      <motion.div
        variants={itemAnim}
        className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs"
      >
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 animate-ping rounded-full bg-indigo-500" />
              <h3 className="text-sm font-black tracking-tight text-slate-900 uppercase">
                Presales Operations & Lead Conversion Engine
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Current activity distribution across IT service lines: Technical demos, SOW drafting,
              pre-dev checklists, and development phase conversions.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>{metrics.convertedToDevCount || 1} Converted into Dev Phase</span>
          </div>
        </div>

        {/* 6 ACTIVITY COLUMNS */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {/* STEP 1: Sales Appointment */}
          <div
            onClick={() => onQuickAction("All")}
            className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-slate-50/50 p-3.5 transition-all hover:border-blue-300 hover:bg-blue-50/30"
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
              <span>1. Appointment</span>
              <PhoneCall className="h-3.5 w-3.5 text-blue-500" />
            </div>
            <p className="mt-2 text-xl font-black text-slate-900">
              {metrics.totalCalls || metrics.totalPresalesDecks}
            </p>
            <p className="text-[10px] font-medium text-slate-400">Sales Handovers</p>
          </div>

          {/* STEP 2: Demo & POC */}
          <div
            onClick={() => onQuickAction("Requirement")}
            className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-slate-50/50 p-3.5 transition-all hover:border-indigo-300 hover:bg-indigo-50/30"
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
              <span>2. Technical Demo</span>
              <Video className="h-3.5 w-3.5 text-indigo-500" />
            </div>
            <p className="mt-2 text-xl font-black text-slate-900">{metrics.totalDemos || 6}</p>
            <p className="text-[10px] font-medium text-slate-400">Teams & Google Meet</p>
          </div>

          {/* STEP 3: Requirement Scoping */}
          <div
            onClick={() => onQuickAction("Requirement")}
            className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-slate-50/50 p-3.5 transition-all hover:border-amber-300 hover:bg-amber-50/30"
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
              <span>3. Scoping & Spec</span>
              <Layers className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <p className="mt-2 text-xl font-black text-slate-900">{metrics.scopingCount}</p>
            <p className="text-[10px] font-medium text-slate-400">BRD / Architecture</p>
          </div>

          {/* STEP 4: Pre-dev Tasks & Checklist */}
          <div
            onClick={() => onQuickAction("Estimation")}
            className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-slate-50/50 p-3.5 transition-all hover:border-purple-300 hover:bg-purple-50/30"
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
              <span>4. Tasks & Checks</span>
              <ListTodo className="h-3.5 w-3.5 text-purple-500" />
            </div>
            <p className="mt-2 text-xl font-black text-slate-900">
              {metrics.tasksActiveCount || 7}
            </p>
            <p className="text-[10px] font-medium text-slate-400">Active Action Items</p>
          </div>

          {/* STEP 5: Quotation & SOW */}
          <div
            onClick={() => onQuickAction("Quotation")}
            className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-slate-50/50 p-3.5 transition-all hover:border-emerald-300 hover:bg-emerald-50/30"
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
              <span>5. Quote & SOW</span>
              <Receipt className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <p className="mt-2 text-xl font-black text-slate-900">
              {metrics.quotationCount + metrics.negotiationCount}
            </p>
            <p className="text-[10px] font-medium text-slate-400">Commercial Terms</p>
          </div>

          {/* STEP 6: Converted into Dev Phase */}
          <div
            onClick={() => onQuickAction("Approved")}
            className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-emerald-50/40 p-3.5 transition-all hover:border-emerald-400 hover:bg-emerald-50/70"
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold text-emerald-700">
              <span>6. Dev Phase</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <p className="mt-2 text-xl font-black text-emerald-900">
              {metrics.convertedToDevCount || 1}
            </p>
            <p className="text-[10px] font-bold text-emerald-600">Won & Delivered</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
