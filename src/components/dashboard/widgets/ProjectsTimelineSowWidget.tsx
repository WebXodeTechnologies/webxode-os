"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { FileCheck, Calendar, ShieldCheck, Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SowProject {
  id: string;
  projectName: string;
  client: string;
  sowBudget: string;
  sowStatus: "Approved & Signed" | "Awaiting Sign-off" | "Under Negotiation";
  currentPhase: string;
  startDate: string;
  endDate: string;
  progressPercent: number;
}

export function ProjectsTimelineSowWidget() {
  const [sowProjects] = useState<SowProject[]>([
    {
      id: "1",
      projectName: "Visual Bridge Foundation Portal",
      client: "VBF Org",
      sowBudget: "₹4.5L",
      sowStatus: "Approved & Signed",
      currentPhase: "Phase 3: Production Deployment",
      startDate: "Sep 1",
      endDate: "Oct 20",
      progressPercent: 82,
    },
    {
      id: "2",
      projectName: "Annai Agro B2B Supply Chain",
      client: "Annai Traders",
      sowBudget: "₹6.8L",
      sowStatus: "Awaiting Sign-off",
      currentPhase: "Phase 2: Payment Gateway & Inventory",
      startDate: "Sep 15",
      endDate: "Nov 15",
      progressPercent: 64,
    },
    {
      id: "3",
      projectName: "Green Naturals Mobile App",
      client: "Green Corp",
      sowBudget: "₹3.2L",
      sowStatus: "Approved & Signed",
      currentPhase: "Phase 1: Wireframes & Architecture",
      startDate: "Oct 1",
      endDate: "Dec 1",
      progressPercent: 30,
    },
  ]);

  const statusBadges = {
    "Approved & Signed": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Awaiting Sign-off": "bg-amber-50 text-amber-700 border-amber-200",
    "Under Negotiation": "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Projects Timeline & SOW Contract Tracker"
        subtitle="Statement of Work milestones, contract budgets, and deliverables"
        badge="3 Active SOWs"
        badgeVariant="indigo"
        actions={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New SOW</span>
          </button>
        }
      />

      <div className="space-y-4">
        {sowProjects.map((sow, idx) => (
          <motion.div
            key={sow.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            whileHover={{ y: -3, borderColor: "rgba(99, 102, 241, 0.3)" }}
            className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:bg-white hover:shadow-sm"
          >
            {/* Header: Project name, Client, SOW Budget, Status Badge */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                    {sow.projectName}
                  </h4>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span>
                      Client: <strong className="text-slate-800">{sow.client}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Contract: <strong className="text-emerald-600">{sow.sowBudget}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`rounded-lg border px-2.5 py-1 text-xs font-extrabold ${statusBadges[sow.sowStatus]}`}
              >
                {sow.sowStatus}
              </span>
            </div>

            {/* Timeline Progress Bar with Animated Fill */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="text-indigo-900">{sow.currentPhase}</span>
                <span className="font-extrabold text-indigo-600">
                  {sow.progressPercent}% Complete
                </span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sow.progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-indigo-600 shadow-xs"
                />
              </div>
            </div>

            {/* Timeline Dates & Verification Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  Timeline: {sow.startDate} → {sow.endDate}
                </span>
              </div>
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <ShieldCheck className="h-4 w-4" />
                Milestone Verified
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </WidgetCard>
  );
}
