"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import { SalesRepActivitySummary } from "./types";

interface RepReviewScorecardProps {
  reps: SalesRepActivitySummary[];
  selectedRep: string;
  onSelectRep: (repId: string) => void;
}

export function RepReviewScorecard({ reps, selectedRep, onSelectRep }: RepReviewScorecardProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              Sales Representative Performance Scorecard
            </h2>
            <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-black text-purple-700">
              {reps.length} Active Sales Reps
            </span>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">
            Activity diligence score, deal velocity, touchpoints, and review readiness per rep.
          </p>
        </div>

        {selectedRep !== "all" && (
          <button
            onClick={() => onSelectRep("all")}
            className="text-xs font-black text-indigo-600 hover:underline"
          >
            Show All Reps
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reps.map((rep, idx) => {
          const isSelected = selectedRep === rep.id || selectedRep === rep.name;

          return (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => onSelectRep(rep.id)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-5 transition-all ${
                isSelected
                  ? "border-indigo-500 bg-linear-to-b from-indigo-50/40 via-white to-white shadow-md ring-2 ring-indigo-500/20"
                  : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${
                    rep.status === "Target Achieved"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-indigo-200 bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {rep.status === "Target Achieved" && (
                    <Star className="h-3 w-3 fill-emerald-500 text-emerald-500" />
                  )}
                  {rep.status}
                </span>

                <span className="text-[11px] font-black text-slate-400">
                  Audit: {rep.auditScore}%
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3.5">
                <Image
                  src={rep.avatar}
                  alt={rep.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-2xl object-cover shadow-2xs ring-2 ring-slate-100 group-hover:ring-indigo-300"
                />
                <div>
                  <h3 className="text-sm font-black text-slate-900 transition-colors group-hover:text-indigo-600">
                    {rep.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">{rep.role}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                <div>
                  <div className="flex justify-between text-xs font-extrabold">
                    <span className="text-slate-500">Activity Target</span>
                    <span className="font-black text-indigo-600">{rep.activityTargetPct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      style={{ width: `${Math.min(rep.activityTargetPct, 100)}%` }}
                      className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-600"
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs font-extrabold">
                  <span className="text-slate-500">Closed Deal Value</span>
                  <span className="font-black text-emerald-600">
                    ₹{rep.dealsClosedValue.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-1.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-2.5 text-center">
                <div>
                  <div className="text-[10px] font-extrabold text-slate-400">CALLS</div>
                  <div className="text-xs font-black text-slate-800">{rep.totalCalls}</div>
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-400">MAILS</div>
                  <div className="text-xs font-black text-slate-800">{rep.totalEmails}</div>
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-400">DEMOS</div>
                  <div className="text-xs font-black text-slate-800">{rep.demosCompleted}</div>
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-400">PROP</div>
                  <div className="text-xs font-black text-slate-800">{rep.proposalsSent}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-black text-indigo-600 opacity-80 group-hover:opacity-100">
                <span>Filter Activity Stream</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
