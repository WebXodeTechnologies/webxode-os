"use client";

import React from "react";
import { FileText } from "lucide-react";

export function ClientInvoiceOverview() {
  return (
    <div className="mt-6 bg-white p-8">
      <div className="mb-6 flex items-center gap-2">
        <FileText className="h-4 w-4 text-slate-400" />
        <h3 className="text-sm font-bold text-slate-700">Invoice Overview</h3>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_200px]">
        {/* Left side: Bars and Chart */}
        <div className="space-y-6">
          <div className="max-w-sm space-y-4">
            {/* Overdue */}
            <div className="flex items-center justify-between">
              <div className="flex w-32 items-center gap-2">
                <span className="text-xs font-bold text-rose-500">1</span>
                <span className="text-xs font-semibold text-slate-600">Overdue</span>
              </div>
              <div className="mx-4 flex-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/4 rounded-full bg-rose-500" />
                </div>
              </div>
              <div className="text-xs font-bold text-slate-500">$66.00</div>
            </div>

            {/* Not paid */}
            <div className="flex items-center justify-between">
              <div className="flex w-32 items-center gap-2">
                <span className="text-xs font-bold text-slate-800">2</span>
                <span className="text-xs font-semibold text-slate-600">Not paid</span>
              </div>
              <div className="mx-4 flex-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/3 rounded-full bg-amber-400" />
                </div>
              </div>
              <div className="text-xs font-bold text-slate-500">$166.00</div>
            </div>

            {/* Fully paid */}
            <div className="flex items-center justify-between">
              <div className="flex w-32 items-center gap-2">
                <span className="text-xs font-bold text-indigo-600">1</span>
                <span className="text-xs font-semibold text-slate-600">Fully paid</span>
              </div>
              <div className="mx-4 flex-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/4 rounded-full bg-indigo-600" />
                </div>
              </div>
              <div className="text-xs font-bold text-slate-500">$9,000.00</div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="mb-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Last 12 months
            </div>
            {/* Simple sparkline visualization placeholder */}
            <div className="flex h-16 w-full items-end">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path
                  d="M0,95 L10,95 L20,95 L30,95 L40,95 L50,95 L60,95 L70,85 L80,20 L90,95 L100,95"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side: Totals */}
        <div className="flex flex-col items-end justify-between border-l border-slate-100 pl-8">
          <div className="text-right">
            <div className="text-2xl font-black text-slate-700">$9,166.00</div>
            <div className="mt-1 text-xs font-semibold text-slate-400">Total invoiced</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-indigo-500">$9,000.00</div>
            <div className="mt-1 text-xs font-semibold text-slate-400">Payments</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-rose-500">$166.00</div>
            <div className="mt-1 text-xs font-semibold text-slate-400">Due</div>
          </div>
        </div>
      </div>
    </div>
  );
}
