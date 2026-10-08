"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";

interface EarningsReportRow {
  date: string;
  itemCount: number;
  taxAmount: string;
  earning: string;
}

export function InvoiceOverviewWidget() {
  const [filterMonth, setFilterMonth] = useState("Month");

  const reports: EarningsReportRow[] = [
    { date: "September 15", itemCount: 40, taxAmount: "$20", earning: "$95,013" },
    { date: "September 16", itemCount: 50, taxAmount: "$40", earning: "$95,013" },
    { date: "September 17", itemCount: 35, taxAmount: "$12", earning: "$95,013" },
    { date: "September 18", itemCount: 25, taxAmount: "$16", earning: "$95,013" },
    { date: "September 19", itemCount: 21, taxAmount: "$12", earning: "$95,013" },
  ];

  return (
    <WidgetCard>
      {/* Header matching Image 2: "Earnings Reports" with Purple Dot & Month Dropdown */}
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></span>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Earnings Reports</h3>
        </div>

        <div className="relative">
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-slate-200/90 bg-white px-3.5 py-1.5 pr-8 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none"
          >
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
          <span className="pointer-events-none absolute top-2.5 right-2.5 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>

      {/* Table matching Image 2 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
              <th className="pb-3 font-bold">Date</th>
              <th className="pb-3 font-bold">Item Count</th>
              <th className="pb-3 font-bold">Text</th>
              <th className="pb-3 text-right font-bold">Earning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {reports.map((row, idx) => (
              <tr key={idx} className="transition hover:bg-slate-50/60">
                <td className="py-3.5 text-slate-600">{row.date}</td>
                <td className="py-3.5 text-slate-600">{row.itemCount}</td>
                <td className="py-3.5 font-bold text-rose-500">{row.taxAmount}</td>
                <td className="py-3.5 text-right font-extrabold text-slate-900">{row.earning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetCard>
  );
}
