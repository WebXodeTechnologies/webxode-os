"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";

export function FinanceSnapshotWidget() {
  return (
    <WidgetCard>
      <WidgetHeader
        title="Financial Snapshot & Cashflow"
        subtitle="Revenue collected, outstanding client balances, and invoice health"
        badge="81% Collection Rate"
        badgeVariant="success"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Billed */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <span className="text-xs font-extrabold text-slate-500 uppercase">Total Billed</span>
          <h4 className="mt-1.5 text-2xl font-black text-slate-900 sm:text-3xl">₹8.4L</h4>
          <p className="mt-1 text-xs font-bold text-emerald-600">↑ 14.2% vs last month</p>
        </div>

        {/* Cash Collected */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <span className="text-xs font-extrabold text-emerald-800 uppercase">Cash Collected</span>
          <h4 className="mt-1.5 text-2xl font-black text-emerald-950 sm:text-3xl">₹6.8L</h4>
          <p className="mt-1 text-xs font-bold text-emerald-700">Bank transfer & UPI</p>
        </div>

        {/* Outstanding Balance */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
          <span className="text-xs font-extrabold text-amber-800 uppercase">Outstanding</span>
          <h4 className="mt-1.5 text-2xl font-black text-amber-950 sm:text-3xl">₹1.6L</h4>
          <p className="mt-1 text-xs font-bold text-amber-700">3 pending invoices</p>
        </div>
      </div>

      {/* Collection Progress Bar & Action */}
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
        <div className="flex justify-between text-xs font-bold text-slate-700 sm:text-sm">
          <span>Monthly Cash Collection Goal</span>
          <span className="font-extrabold text-emerald-600">₹6.8L / ₹8.4L (81%)</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: "81%" }}
          ></div>
        </div>
      </div>
    </WidgetCard>
  );
}
