"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";

export function IncomeVsExpensesWidget() {
  const financialData = [
    { month: "Jun", income: 6.2, expense: 2.8 },
    { month: "Jul", income: 7.1, expense: 3.0 },
    { month: "Aug", income: 7.8, expense: 3.1 },
    { month: "Sep", income: 8.0, expense: 3.4 },
    { month: "Oct", income: 8.4, expense: 3.2 },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Income vs Expenses Overview"
        subtitle="Corporate P&L breakdown, cash outflow, and net operating margin"
        badge="61.9% Net Margin"
        badgeVariant="success"
      />

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <span className="text-xs font-bold text-emerald-800 uppercase">Gross Income</span>
          <h4 className="mt-1 text-2xl font-black text-emerald-950 sm:text-3xl">₹8.4L</h4>
          <p className="mt-0.5 text-xs font-semibold text-emerald-700">
            Client billing & retainers
          </p>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4">
          <span className="text-xs font-bold text-rose-800 uppercase">Operating Expenses</span>
          <h4 className="mt-1 text-2xl font-black text-rose-950 sm:text-3xl">₹3.2L</h4>
          <p className="mt-0.5 text-xs font-semibold text-rose-700">Payroll, cloud & ops</p>
        </div>

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4">
          <span className="text-xs font-bold text-indigo-800 uppercase">Net Profit Margin</span>
          <h4 className="mt-1 text-2xl font-black text-indigo-950 sm:text-3xl">₹5.2L</h4>
          <p className="mt-0.5 text-xs font-semibold text-indigo-700">61.9% profit ratio</p>
        </div>
      </div>

      {/* Comparative Monthly Bars */}
      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Monthly Income vs Expense Trend (in ₹ Lakhs)</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Income
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span> Expenses
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {financialData.map((d) => (
            <div key={d.month} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>{d.month}</span>
                <span>
                  <span className="text-emerald-600">₹{d.income}L</span> /{" "}
                  <span className="text-rose-600">₹{d.expense}L</span>
                </span>
              </div>
              <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="rounded-l-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(d.income / 12) * 100}%` }}
                ></div>
                <div
                  className="rounded-r-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${(d.expense / 12) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
