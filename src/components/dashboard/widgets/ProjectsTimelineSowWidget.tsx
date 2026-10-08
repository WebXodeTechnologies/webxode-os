"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { FileCheck, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";

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
  const sowProjects: SowProject[] = [
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
  ];

  const statusBadges = {
    "Approved & Signed": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Awaiting Sign-off": "bg-amber-50 text-amber-700 border-amber-200",
    "Under Negotiation": "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Projects Timeline & SOW Contract Tracker"
        subtitle="Statement of Work milestones, contract budgets, and milestone deliverables"
        badge="3 Active SOWs"
        badgeVariant="indigo"
      />

      <div className="space-y-4">
        {sowProjects.map((sow) => (
          <div
            key={sow.id}
            className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition hover:bg-white hover:shadow-xs"
          >
            {/* Header: Project name, Client, SOW Budget, Badge */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 sm:text-base">{sow.projectName}</h4>
                <p className="text-xs font-semibold text-slate-500">
                  {sow.client} • SOW Contract:{" "}
                  <span className="font-extrabold text-slate-900">{sow.sowBudget}</span>
                </p>
              </div>

              <span
                className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${statusBadges[sow.sowStatus]}`}
              >
                {sow.sowStatus}
              </span>
            </div>

            {/* Timeline Progress Bar */}
            <div className="mt-3.5 space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>{sow.currentPhase}</span>
                <span className="font-extrabold text-indigo-600">
                  {sow.progressPercent}% Timeline
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${sow.progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Start and End Dates */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-semibold text-slate-500">
              <span>
                Timeline: {sow.startDate} → {sow.endDate}
              </span>
              <span className="font-bold text-emerald-600">Milestone Verified</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
