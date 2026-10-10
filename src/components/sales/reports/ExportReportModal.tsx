"use client";

import React, { useState } from "react";
import {
  Download,
  X,
  FileText,
  CheckCircle2,
  FileSpreadsheet,
  Calendar,
  Sparkles,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName?: string;
}

export function ExportReportModal({ isOpen, onClose, clientName }: ExportReportModalProps) {
  const [reportFormat, setReportFormat] = useState<"PDF" | "CSV" | "Excel">("PDF");
  const [dateRange, setDateRange] = useState("October 2026 (Current Month)");
  const [includeTouchpoints, setIncludeTouchpoints] = useState(true);
  const [includeRevenue, setIncludeRevenue] = useState(true);
  const [includeFunnel, setIncludeFunnel] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);
      toast.success("Sales Report Generated", {
        description: `Downloaded ${clientName ? `${clientName} Report` : "Sales Performance Summary"} in ${reportFormat} format.`,
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <Download className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {clientName ? `Export ${clientName} Report` : "Export Sales Performance Report"}
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Generate PDF or CSV analytics report
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cursor-pointer text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleExport} className="space-y-4">
          {/* Format selection */}
          <div>
            <label className="text-xs font-bold text-slate-700">Select Export Format</label>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {[
                { fmt: "PDF", label: "PDF Document", icon: FileText, color: "text-rose-600" },
                { fmt: "CSV", label: "CSV File", icon: FileSpreadsheet, color: "text-emerald-600" },
                {
                  fmt: "Excel",
                  label: "Excel Sheet",
                  icon: FileSpreadsheet,
                  color: "text-blue-600",
                },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = reportFormat === item.fmt;
                return (
                  <button
                    key={item.fmt}
                    type="button"
                    onClick={() => setReportFormat(item.fmt as any)}
                    className={`flex cursor-pointer flex-col items-center rounded-2xl border p-3 text-center transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/80 text-indigo-700 shadow-2xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${item.color}`} />
                    <span className="mt-1 text-xs font-black">{item.fmt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700">Date Range Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            >
              <option value="October 2026 (Current Month)">October 2026 (Current Month)</option>
              <option value="Q3 2026 Performance">Q3 2026 Performance</option>
              <option value="Year-to-Date 2026">Year-to-Date 2026</option>
            </select>
          </div>

          {/* Included Sections */}
          <div>
            <label className="text-xs font-bold text-slate-700">Include Report Modules</label>
            <div className="mt-2 space-y-2 text-xs font-bold text-slate-700">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeRevenue}
                  onChange={(e) => setIncludeRevenue(e.target.checked)}
                  className="rounded-md text-indigo-600 focus:ring-indigo-600"
                />
                Closed Revenue & Deal Metrics
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeTouchpoints}
                  onChange={(e) => setIncludeTouchpoints(e.target.checked)}
                  className="rounded-md text-indigo-600 focus:ring-indigo-600"
                />
                Client Call & Email Touchpoint Logs
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeFunnel}
                  onChange={(e) => setIncludeFunnel(e.target.checked)}
                  className="rounded-md text-indigo-600 focus:ring-indigo-600"
                />
                Pipeline Stage Conversion Breakdown
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isExporting}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700 disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> {isExporting ? "Generating..." : "Download Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
