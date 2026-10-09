"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { Download, Search, FileText, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EarningsReportRow {
  id: string;
  date: string;
  client: string;
  itemCount: number;
  taxAmount: string;
  earning: string;
  status: "Paid" | "Processing";
}

export function InvoiceOverviewWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Paid" | "Processing">("All");

  const reports: EarningsReportRow[] = [
    {
      id: "INV-202",
      date: "Oct 08, 2026",
      client: "Aishwarya Arts",
      itemCount: 4,
      taxAmount: "₹1,800",
      earning: "₹45,000",
      status: "Paid",
    },
    {
      id: "INV-201",
      date: "Oct 05, 2026",
      client: "Annai Agro Tradings",
      itemCount: 2,
      taxAmount: "₹3,200",
      earning: "₹85,000",
      status: "Paid",
    },
    {
      id: "INV-200",
      date: "Oct 02, 2026",
      client: "Visual Bridge",
      itemCount: 5,
      taxAmount: "₹2,400",
      earning: "₹60,000",
      status: "Processing",
    },
    {
      id: "INV-199",
      date: "Sep 28, 2026",
      client: "FoundersROI",
      itemCount: 3,
      taxAmount: "₹4,500",
      earning: "₹1,12,500",
      status: "Paid",
    },
    {
      id: "INV-198",
      date: "Sep 24, 2026",
      client: "TechCorp Solutions",
      itemCount: 6,
      taxAmount: "₹3,800",
      earning: "₹95,000",
      status: "Paid",
    },
  ];

  const filteredReports = reports.filter((row) => {
    const matchesSearch =
      row.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <WidgetCard>
      {/* Header with Title and Export Action */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Recent Earnings & Invoices
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              Corporate transaction ledger & settlement status
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-95"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Interactive Search & Filter Toolbar */}
      <div className="mb-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client or invoice ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/60 py-2 pr-4 pl-10 text-xs font-semibold text-slate-800 placeholder-slate-400 transition focus:border-indigo-300 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex rounded-xl border border-slate-200/80 bg-slate-100/80 p-1 text-xs font-bold">
          {(["All", "Paid", "Processing"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1 transition ${
                statusFilter === status
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Data Table with Framer Motion Stagger Animation */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
              <th className="pb-3">Invoice & Client</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Tax / GST</th>
              <th className="pb-3 text-right">Earning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            <AnimatePresence>
              {filteredReports.length > 0 ? (
                filteredReports.map((row, idx) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.9)", x: 3 }}
                    className="group cursor-pointer transition-colors"
                  >
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 shadow-2xs transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block font-extrabold text-slate-900">{row.client}</span>
                          <span className="text-[11px] font-bold text-slate-400">{row.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-600">{row.date}</td>
                    <td className="py-3.5">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {row.itemCount} items
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-rose-600">{row.taxAmount}</td>
                    <td className="py-3.5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-black text-slate-900 sm:text-base">
                          {row.earning}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-extrabold ${
                            row.status === "Paid" ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {row.status === "Paid" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3 animate-spin" />
                          )}
                          {row.status}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs font-semibold text-slate-400">
                    No invoices found matching your criteria.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-slate-500">
        <span>Showing {filteredReports.length} transactions</span>
        <span className="font-extrabold text-slate-900">
          Total Settled: <span className="text-emerald-600">₹3,97,500</span>
        </span>
      </div>
    </WidgetCard>
  );
}
