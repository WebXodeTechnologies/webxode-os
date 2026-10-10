"use client";

import React, { useState } from "react";
import {
  FileText,
  IndianRupee,
  TrendingUp,
  Download,
  Plus,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { toast } from "@/lib/toast";

export function ClientInvoiceOverview({ lead }: { lead?: any }) {
  const [currency] = useState("₹");

  // Dynamic amounts based on lead estimated value or realistic Indian Rupee figures
  const baseValue = typeof lead?.estimatedValue === "number" ? lead.estimatedValue : 980000;
  const totalInvoiced = baseValue;
  const paymentsReceived = Math.round(baseValue * 0.73);
  const totalDue = totalInvoiced - paymentsReceived;

  const overdueAmount = 45000;
  const unpaidAmount = totalDue - overdueAmount;
  const paidAmount = paymentsReceived;

  const formatRupees = (amount: number) => {
    return `${currency}${amount.toLocaleString("en-IN")}`;
  };

  const handleCreateInvoice = () => {
    toast.success("Create Invoice", {
      description: `Opening invoice creation form for ${lead?.companyName || "Client"}.`,
    });
  };

  const handleDownloadStatement = () => {
    toast.success("Downloading Statement", {
      description: `Generating account statement PDF for ${lead?.companyName || "Client"}...`,
    });
  };

  const handleSendReminder = () => {
    toast.success("Payment Reminder Sent", {
      description: `Payment notification email sent to ${lead?.email || "client"}.`,
    });
  };

  return (
    <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all md:p-8">
      {/* Header Bar */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-2xs">
            <IndianRupee className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
              Invoice & Financial Overview
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              Real-time billing statement in INR ({currency})
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCreateInvoice}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-2xs transition-all hover:bg-indigo-600 hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Invoice
          </button>
          <button
            type="button"
            onClick={handleDownloadStatement}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-100"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            Statement
          </button>
          <button
            type="button"
            onClick={handleSendReminder}
            className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 shadow-2xs transition-all hover:bg-amber-100"
            title="Send payment reminder to client"
          >
            <Send className="h-3.5 w-3.5" />
            Reminder
          </button>
        </div>
      </div>

      {/* Main Grid: Left Breakdown + Right Summary Cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Side: Invoice Progress Bars & Sparkline (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Invoice Status Breakdown
            </h4>

            {/* Overdue */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[10px] font-black text-rose-700">
                    1
                  </span>
                  <span className="text-slate-700">Overdue Invoices</span>
                  <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] text-rose-700">
                    Action Required
                  </span>
                </div>
                <span className="font-extrabold text-rose-600">{formatRupees(overdueAmount)}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full w-[15%] rounded-full bg-rose-500 transition-all duration-500" />
              </div>
            </div>

            {/* Unpaid / Pending */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-black text-amber-700">
                    2
                  </span>
                  <span className="text-slate-700">Pending Payment</span>
                </div>
                <span className="font-extrabold text-amber-600">{formatRupees(unpaidAmount)}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full w-[35%] rounded-full bg-amber-500 transition-all duration-500" />
              </div>
            </div>

            {/* Fully Paid */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-700">
                    5
                  </span>
                  <span className="text-slate-700">Fully Settled</span>
                </div>
                <span className="font-extrabold text-emerald-600">{formatRupees(paidAmount)}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full w-[73%] rounded-full bg-emerald-500 transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Sparkline & Billing Trend */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-700">
                  12-Month Invoicing Trend (INR)
                </span>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                +18.4% YoY
              </span>
            </div>

            {/* Visual SVG Sparkline Bar Chart */}
            <div className="flex h-20 w-full items-end gap-1.5 pt-4">
              {[35, 45, 20, 60, 40, 75, 50, 90, 65, 80, 70, 100].map((val, idx) => (
                <div
                  key={idx}
                  className="group relative flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div
                    style={{ height: `${val}%` }}
                    className={`w-full rounded-t-sm transition-all duration-300 group-hover:bg-indigo-600 ${
                      idx === 11 ? "bg-indigo-600" : "bg-indigo-200/70"
                    }`}
                  />
                  <span className="absolute -top-7 z-10 hidden rounded bg-slate-900 px-1.5 py-0.5 text-[9px] font-bold whitespace-nowrap text-white shadow-md group-hover:block">
                    {formatRupees(val * 8500)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-semibold text-slate-400">
              <span>Nov &apos;25</span>
              <span>Mar &apos;26</span>
              <span>Jul &apos;26</span>
              <span>Oct &apos;26</span>
            </div>
          </div>
        </div>

        {/* Right Side: High Impact Rupee Totals Cards (5 cols) */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-5">
          {/* Total Invoiced Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-linear-to-br from-slate-900 to-slate-800 p-5 text-white shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                Total Invoiced
              </span>
              <span className="rounded-lg bg-slate-700/60 p-1.5 text-indigo-400">
                <FileText className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {formatRupees(totalInvoiced)}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>8 total invoices issued</span>
            </div>
          </div>

          {/* Payments Received Card */}
          <div className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-teal-50/60 p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
                Received Payments
              </span>
              <span className="rounded-lg bg-emerald-100 p-1.5 text-emerald-700">
                <IndianRupee className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-700 sm:text-3xl">
              {formatRupees(paymentsReceived)}
            </div>
            <div className="mt-1 text-xs font-semibold text-emerald-600">
              73% of total billed amount collected
            </div>
          </div>

          {/* Outstanding Balance Due Card */}
          <div className="rounded-2xl border border-rose-200 bg-linear-to-br from-rose-50 to-amber-50/50 p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-rose-800 uppercase">
                Outstanding Balance Due
              </span>
              <span className="rounded-lg bg-rose-100 p-1.5 text-rose-700">
                <Clock className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-2 text-2xl font-black text-rose-600 sm:text-3xl">
              {formatRupees(totalDue)}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs font-semibold text-rose-700">
              <span>{formatRupees(overdueAmount)} Overdue</span>
              <button
                type="button"
                onClick={handleSendReminder}
                className="font-bold underline hover:text-rose-900"
              >
                Send Reminder →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
