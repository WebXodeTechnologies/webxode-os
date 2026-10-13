"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, Cloud, Globe, Server, Users, Coffee, Zap, Phone, Car } from "lucide-react";

// ── Monthly burn chart ──────────────────────────────
interface MonthData {
  month: string;
  client: number;
  company: number;
}

const monthly: MonthData[] = [
  { month: "May", client: 18, company: 12 },
  { month: "Jun", client: 21, company: 13 },
  { month: "Jul", client: 24, company: 14 },
  { month: "Aug", client: 22, company: 15 },
  { month: "Sep", client: 26, company: 17 },
  { month: "Oct", client: 29.4, company: 18.8 },
];

// ── Category breakdown ──────────────────────────────
const clientBreakdown = [
  { label: "AWS / Cloud", amount: 40500, percent: 100, icon: Cloud, color: "bg-violet-500" },
  { label: "Software License", amount: 25000, percent: 62, icon: Server, color: "bg-indigo-500" },
  { label: "Domain & Hosting", amount: 6299, percent: 15, icon: Globe, color: "bg-blue-500" },
  { label: "Third-party API", amount: 8750, percent: 21, icon: Server, color: "bg-cyan-500" },
  { label: "Renewal", amount: 3800, percent: 9, icon: Cloud, color: "bg-sky-400" },
];

const companyBreakdown = [
  { label: "Electricity", amount: 8900, percent: 100, icon: Zap, color: "bg-amber-500" },
  { label: "Internet & Phone", amount: 4500, percent: 51, icon: Phone, color: "bg-orange-500" },
  { label: "Cleaning Supplies", amount: 2200, percent: 25, icon: Users, color: "bg-yellow-500" },
  { label: "Tea & Coffee", amount: 1850, percent: 21, icon: Coffee, color: "bg-yellow-400" },
  { label: "Travel & Transport", amount: 890, percent: 10, icon: Car, color: "bg-amber-400" },
];

// ── Pending reimbursements ──────────────────────────
const reimbursements = [
  { name: "Akash R.", item: "Domain — Namecheap", amount: "₹3,800", days: 8 },
  { name: "Priya S.", item: "Laptop screen repair", amount: "₹12,500", days: 12 },
  { name: "Akash R.", item: "Client meeting travel", amount: "₹890", days: 4 },
  { name: "Dev Team", item: "Twilio API credits", amount: "₹8,750", days: 3 },
];

export function ExpenseInsightsPanel() {
  const maxClient = Math.max(...monthly.map((m) => m.client));
  const maxCompany = Math.max(...monthly.map((m) => m.company));

  return (
    <div className="space-y-6">
      {/* ── Monthly Burn Chart ───────────────────────── */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:shadow-md sm:p-7">
        <div className="mb-5 flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">Monthly Expense Burn</h3>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">
              Client vs Company expenses — rolling 6-month view (₹ thousands)
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
            <TrendingDown className="h-3.5 w-3.5" />
            ₹48.2K this month
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 flex items-center gap-5 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-500" /> Client
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Company
          </span>
        </div>

        {/* Bar rows */}
        <div className="space-y-4">
          {monthly.map((m, i) => (
            <div key={m.month}>
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                <span className="w-8 text-slate-600">{m.month}</span>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="text-violet-600">₹{m.client}K client</span>
                  <span className="text-amber-600">₹{m.company}K company</span>
                </div>
              </div>
              <div className="flex h-6 flex-col gap-1">
                <div className="flex h-2.5 gap-1 overflow-hidden rounded-lg">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(m.client / maxClient) * 100}%` }}
                    transition={{ duration: 0.75, delay: i * 0.08, ease: "easeOut" }}
                    className="h-full rounded-lg bg-violet-500 opacity-90"
                  />
                </div>
                <div className="flex h-2.5 gap-1 overflow-hidden rounded-lg">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(m.company / maxCompany) * 100}%` }}
                    transition={{ duration: 0.75, delay: i * 0.08 + 0.08, ease: "easeOut" }}
                    className="h-full rounded-lg bg-amber-500 opacity-85"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Breakdowns ────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Client breakdown */}
        <div className="rounded-3xl border border-violet-200/60 bg-linear-to-b from-violet-50/40 to-white p-6 shadow-xs">
          <div className="mb-4 flex items-center gap-3 border-b border-violet-100 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
              <Cloud className="h-4.5 w-4.5 text-violet-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Client Expense Breakdown</h4>
              <p className="text-[11px] font-semibold text-slate-500">
                Infrastructure, tools & renewals billed to clients
              </p>
            </div>
          </div>
          <div className="space-y-3.5">
            {clientBreakdown.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-violet-500" />
                      <span className="text-slate-700">{item.label}</span>
                    </div>
                    <span className="font-black text-slate-900">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-violet-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company breakdown */}
        <div className="rounded-3xl border border-amber-200/60 bg-linear-to-b from-amber-50/40 to-white p-6 shadow-xs">
          <div className="mb-4 flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
              <Users className="h-4.5 w-4.5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Company Expense Breakdown</h4>
              <p className="text-[11px] font-semibold text-slate-500">
                Operational, utilities & petty cash spend
              </p>
            </div>
          </div>
          <div className="space-y-3.5">
            {companyBreakdown.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-slate-700">{item.label}</span>
                    </div>
                    <span className="font-black text-slate-900">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Reimbursement Queue ───────────────────────── */}
      <div className="rounded-3xl border border-orange-200/70 bg-linear-to-b from-orange-50/50 to-white p-6 shadow-xs">
        <div className="mb-4 flex items-center justify-between border-b border-orange-100 pb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Pending Reimbursements</h4>
            <p className="text-[11px] font-semibold text-slate-500">
              Expenses paid by team members — awaiting approval
            </p>
          </div>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-black text-orange-700">
            {reimbursements.length} pending
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {reimbursements.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              className="flex items-center justify-between rounded-2xl border border-orange-200/50 bg-white p-3.5 shadow-xs"
            >
              <div>
                <p className="text-xs font-extrabold text-slate-900">{r.name}</p>
                <p className="text-[11px] font-semibold text-slate-500">{r.item}</p>
                <p className="mt-0.5 text-[11px] font-bold text-orange-600">
                  {r.days} days waiting
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">{r.amount}</p>
                <button
                  type="button"
                  className="mt-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 transition hover:bg-emerald-100"
                >
                  Approve
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
