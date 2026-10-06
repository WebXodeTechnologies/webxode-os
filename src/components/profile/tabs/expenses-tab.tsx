// src/components/profile/tabs/expenses-tab.tsx
"use client";

import { DollarSign, Plus, Receipt, CheckCircle2, Clock, FileText } from "lucide-react";
import { toast } from "sonner";

export function ExpensesTab() {
  const summaryMetrics = [
    {
      label: "YTD Total Reimbursed",
      value: "$4,850.00",
      color: "text-emerald-700",
      bg: "bg-emerald-50/70 border-emerald-200",
    },
    {
      label: "Pending Claims",
      value: "$340.00",
      color: "text-amber-700",
      bg: "bg-amber-50/70 border-amber-200",
    },
    {
      label: "Approved (In Queue)",
      value: "$180.00",
      color: "text-indigo-700",
      bg: "bg-indigo-50/70 border-indigo-200",
    },
  ];

  const expenses = [
    {
      title: "AWS Cloud Infrastructure Billing",
      amount: "$420.00",
      category: "Infrastructure",
      status: "Reimbursed",
      date: "Oct 02, 2026",
      ref: "EXP-801",
    },
    {
      title: "Figma Team Enterprise Subscription",
      amount: "$180.00",
      category: "Software",
      status: "Approved",
      date: "Sep 28, 2026",
      ref: "EXP-795",
    },
    {
      title: "Executive Client Dinner & Transport",
      amount: "$340.00",
      category: "Travel & Meals",
      status: "Pending Review",
      date: "Sep 20, 2026",
      ref: "EXP-789",
    },
    {
      title: "Vercel Enterprise Domain SSL",
      amount: "$120.00",
      category: "DevOps",
      status: "Reimbursed",
      date: "Aug 14, 2026",
      ref: "EXP-712",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Expenses & Corporate Claims</h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Log vendor invoices, software subscriptions, and executive travel reimbursements.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.info("Submit Claim", { description: "Receipt upload claim form opened." })
          }
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Submit New Claim</span>
        </button>
      </div>

      {/* Financial Summary Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryMetrics.map((m, idx) => (
          <div key={idx} className={`rounded-3xl border ${m.bg} space-y-1 p-5 shadow-2xs`}>
            <p className="text-xs font-bold text-slate-500">{m.label}</p>
            <p className={`text-2xl font-black ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Expense History List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
            Expense Claims & Receipts
          </h3>
          <span className="text-xs font-semibold text-slate-500">Q3/Q4 2026</span>
        </div>

        <div className="space-y-3">
          {expenses.map((exp, idx) => {
            const isReimbursed = exp.status === "Reimbursed";
            const isApproved = exp.status === "Approved";
            return (
              <div
                key={idx}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-colors hover:border-indigo-200 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                    <Receipt className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                      {exp.title}
                    </p>
                    <p className="truncate text-[11px] font-medium text-slate-500">
                      Ref: {exp.ref} • {exp.category} • {exp.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 self-stretch border-t border-slate-100 pt-2 sm:justify-end sm:self-center sm:border-t-0 sm:pt-0">
                  <span className="text-sm font-black text-slate-900 sm:text-base">
                    {exp.amount}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-extrabold ${
                      isReimbursed
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : isApproved
                          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                          : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
