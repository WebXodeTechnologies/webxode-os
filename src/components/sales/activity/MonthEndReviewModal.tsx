"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCheck, Download, CheckCircle2 } from "lucide-react";
import { SalesActivity, SalesRepActivitySummary } from "./types";

interface MonthEndReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reps: SalesRepActivitySummary[];
  selectedRep: string;
  activities: SalesActivity[];
}

export function MonthEndReviewModal({
  isOpen,
  onClose,
  reps,
  selectedRep,
  activities,
}: MonthEndReviewModalProps) {
  if (!isOpen) return null;

  const targetRep =
    selectedRep === "all" ? null : reps.find((r) => r.id === selectedRep || r.name === selectedRep);

  const totalTouchpoints = activities.length * 14 + 182;
  const verifiedCount = activities.filter((a) => a.isManagerVerified).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-600">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Sales Activity Audit & Review Report
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  {targetRep
                    ? `Executive Review summary for ${targetRep.name}`
                    : "Executive Review summary for Entire Sales Team"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5">
            <div className="flex flex-col justify-between gap-4 rounded-xl border border-indigo-100 bg-linear-to-br from-indigo-50/90 to-purple-50/90 p-4 sm:flex-row sm:items-center">
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-indigo-600 uppercase">
                  AUDIT SCORE
                </span>
                <div className="text-2xl font-black text-slate-900">
                  {targetRep ? `${targetRep.auditScore}%` : "94%"}
                  <span className="ml-2 text-xs font-bold text-emerald-600">
                    • Ready for Signoff
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs font-extrabold text-slate-500">
                  Activity Diligence: High
                </div>
                <div className="text-xs font-bold text-slate-600">
                  {verifiedCount} of {activities.length} activities manager-audited
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <div className="text-[10px] font-black text-slate-400">TOUCHPOINTS</div>
                <div className="text-sm font-black text-slate-800">{totalTouchpoints}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <div className="text-[10px] font-black text-slate-400">TARGET PACE</div>
                <div className="text-sm font-black text-emerald-600">114%</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <div className="text-[10px] font-black text-slate-400">CONVERSION</div>
                <div className="text-sm font-black text-indigo-600">29.1%</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <div className="text-[10px] font-black text-slate-400">PIPELINE VALUE</div>
                <div className="text-sm font-black text-slate-800">₹65,50,000</div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-black tracking-wider text-slate-700 uppercase">
                Manager Audit Sign-Off Checklist
              </h3>
              <div className="mt-3 space-y-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Call logs & demo recordings audited for enterprise compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Proposals & GSTIN commercial quotes verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Presales handoffs logged for won deals</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert("Exporting WebXode OS Sales Audit PDF...");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black text-white shadow-sm shadow-indigo-500/25 hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" />
              Download Report PDF
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
