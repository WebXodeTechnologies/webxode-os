"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  RefreshCw,
  BarChart3,
  List,
  ShieldCheck,
  Building2,
  Users,
  Layers,
} from "lucide-react";

import { ExpenseKpiBar } from "@/components/expenses/ExpenseKpiBar";
import { ExpenseLedger } from "@/components/expenses/ExpenseLedger";
import { ExpenseInsightsPanel } from "@/components/expenses/ExpenseInsightsPanel";
import type { ExpenseCategory } from "@/components/expenses/ExpenseLedger";

// ── Tab types ──────────────────────────────────
type ViewKey = "ledger" | "insights";

// ── Category tabs inside ledger ─────────────────
const CAT_TABS: {
  key: "All" | ExpenseCategory;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  { key: "All", label: "All Expenses", icon: Layers, color: "text-slate-600" },
  {
    key: "Client",
    label: "Client Expenses",
    icon: Building2,
    color: "text-violet-600",
  },
  {
    key: "Company",
    label: "Company Expenses",
    icon: Users,
    color: "text-amber-600",
  },
];

export default function ExpensesPage() {
  const [view, setView] = useState<ViewKey>("ledger");
  const [activeCategory, setActiveCategory] = useState<"All" | ExpenseCategory>("All");

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
        transition={{ duration: 0.38 }}
        className="flex flex-col gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-200/80 bg-rose-50 shadow-md shadow-rose-100">
            <Receipt className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Expenses & Outflow
              </h1>
              <span className="hidden rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-extrabold tracking-wider text-rose-700 uppercase sm:inline-block">
                Finance Dept
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
              Client & Company Expense Tracking · {now}
            </p>
          </div>
        </div>

        {/* Status strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-xl border border-rose-200/80 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
            Live Expense Log
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
        transition={{ duration: 0.38, delay: 0.05 }}
      >
        <ExpenseKpiBar />
      </motion.section>

      {/* ── Category info banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.1 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {/* Client Expenses info */}
        <div className="flex items-start gap-3 rounded-2xl border border-violet-200/60 bg-violet-50/60 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-100">
            <Building2 className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-violet-900">Client Expenses</p>
            <p className="mt-0.5 text-[11px] leading-relaxed font-semibold text-violet-700">
              AWS, GCP, domain registrations, third-party API credits, software licenses, SSL
              renewals, DevOps tools — costs incurred for client projects, billed back in invoices.
            </p>
          </div>
        </div>

        {/* Company Expenses info */}
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/60 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100">
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-amber-900">Company Expenses</p>
            <p className="mt-0.5 text-[11px] leading-relaxed font-semibold text-amber-700">
              Petty cash, tea & coffee, tissues, brooms & cleaning, stationery, electricity,
              internet, travel reimbursements — internal operational costs tracked for P&L.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Main View Toggle ── */}
      <div className="flex w-fit items-center gap-1.5 rounded-2xl border border-slate-200/90 bg-slate-100/70 p-1.5">
        {(
          [
            { key: "ledger", label: "Expense Ledger", icon: List },
            { key: "insights", label: "Spend Insights", icon: BarChart3 },
          ] as { key: ViewKey; label: string; icon: React.ElementType }[]
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = view === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              id={`view-tab-${tab.key}`}
              onClick={() => setView(tab.key)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-150 ${
                isActive
                  ? "bg-white text-rose-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-rose-600" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        {view === "ledger" ? (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
            {/* ── Category sub-tabs (Client / Company / All) ── */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">Expense Ledger</h2>
                <p className="text-xs font-semibold text-slate-500">
                  Log, track & approve all operational expenses
                </p>
              </div>

              <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-1">
                {CAT_TABS.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      id={`cat-tab-${cat.key.toLowerCase()}`}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                        isActive
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? cat.color : "text-slate-400"}`} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active category accent strip */}
            {activeCategory !== "All" && (
              <div
                className={`mb-4 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold ${
                  activeCategory === "Client"
                    ? "border-violet-200 bg-violet-50 text-violet-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {activeCategory === "Client" ? (
                  <Building2 className="h-3.5 w-3.5" />
                ) : (
                  <Users className="h-3.5 w-3.5" />
                )}
                Showing{" "}
                <strong>
                  {activeCategory === "Client"
                    ? "Client Expenses only — AWS, domains, tools, renewals"
                    : "Company Expenses only — petty cash, utilities, office essentials"}
                </strong>
              </div>
            )}

            <ExpenseLedger activeCategory={activeCategory} />
          </div>
        ) : (
          <ExpenseInsightsPanel />
        )}
      </motion.div>
    </div>
  );
}
