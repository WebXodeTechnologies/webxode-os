"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Sparkles, RefreshCw, BarChart3, List, ShieldCheck } from "lucide-react";

import { RevenueKpiBar } from "@/components/finance/RevenueKpiBar";
import { PaymentLedger } from "@/components/finance/PaymentLedger";
import { RevenueInsightsPanel } from "@/components/finance/RevenueInsightsPanel";

type TabKey = "ledger" | "insights";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "ledger", label: "Payment Ledger", icon: List },
  { key: "insights", label: "Revenue Insights", icon: BarChart3 },
];

export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("ledger");

  const now = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="w-full space-y-6 pb-16">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200/80 bg-indigo-50 shadow-md shadow-indigo-100">
            <DollarSign className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Revenue Management
              </h1>
              <span className="hidden rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-extrabold tracking-wider text-indigo-700 uppercase sm:inline-block">
                Finance Dept
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
              Accounts & Key Accounts Manager · {now}
            </p>
          </div>
        </div>

        {/* Status strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Live Ledger
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-indigo-200/80 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Finance Access
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* ── KPI Metrics ── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <RevenueKpiBar />
      </motion.section>

      {/* ── Finance Workflow Notice ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-start gap-3 rounded-2xl border border-indigo-200/70 bg-indigo-50/60 p-4"
      >
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
        <p className="text-xs leading-relaxed font-semibold text-indigo-800">
          <strong>Finance Team Workflow:</strong> Once a client payment is received (advance,
          sprint-wise, milestone, or service), log it below. The finance manager reviews the invoice
          details and approves the release. Approved records are marked &quot;Released&quot; and
          trigger downstream payroll & expense reconciliation.
        </p>
      </motion.div>

      {/* ── Tab Navigation ── */}
      <div className="flex w-fit items-center gap-1.5 rounded-2xl border border-slate-200/90 bg-slate-100/70 p-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              id={`tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-150 ${
                isActive
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "ledger" ? (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
            <PaymentLedger />
          </div>
        ) : (
          <RevenueInsightsPanel />
        )}
      </motion.div>
    </div>
  );
}
