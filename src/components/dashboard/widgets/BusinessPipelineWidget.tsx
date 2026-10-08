"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { PipelineDonutChart } from "../charts/PipelineDonutChart";

interface PipelineStage {
  label: string;
  count: number;
  value: string;
  conversion: string;
  color: string;
  trend: string;
}

export function BusinessPipelineWidget() {
  const [viewMode, setViewMode] = useState<"funnel" | "donut">("funnel");

  const stages: PipelineStage[] = [
    {
      label: "New Leads",
      count: 128,
      value: "₹24.0L",
      conversion: "100%",
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      label: "Qualified",
      count: 42,
      value: "₹14.2L",
      conversion: "32.8%",
      color: "bg-indigo-500",
      trend: "+8%",
    },
    {
      label: "Requirements",
      count: 26,
      value: "₹9.8L",
      conversion: "61.9%",
      color: "bg-violet-500",
      trend: "+4%",
    },
    {
      label: "Proposals",
      count: 18,
      value: "₹6.4L",
      conversion: "69.2%",
      color: "bg-pink-500",
      trend: "+15%",
    },
    {
      label: "Negotiation",
      count: 8,
      value: "₹3.2L",
      conversion: "44.4%",
      color: "bg-amber-500",
      trend: "+2%",
    },
    {
      label: "Won Deals",
      count: 5,
      value: "₹1.8L",
      conversion: "62.5%",
      color: "bg-emerald-500",
      trend: "+20%",
    },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Sales Pipeline Breakdown"
        subtitle="Sales conversion stages, deal volumes, and win rates"
        badge="₹12.4L Pipeline"
        badgeVariant="indigo"
        actions={
          <div className="flex rounded-xl border border-slate-200/90 bg-slate-50 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode("funnel")}
              className={`rounded-lg px-3 py-1 transition ${
                viewMode === "funnel" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
              }`}
            >
              Funnel
            </button>
            <button
              type="button"
              onClick={() => setViewMode("donut")}
              className={`rounded-lg px-3 py-1 transition ${
                viewMode === "donut" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
              }`}
            >
              Donut
            </button>
          </div>
        }
      />

      {viewMode === "donut" ? (
        <PipelineDonutChart />
      ) : (
        <div className="space-y-3">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:border-slate-200 hover:bg-white hover:shadow-xs"
            >
              {/* Stage Name & Color Dot */}
              <div className="flex min-w-35 items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${stage.color}`}></span>
                <span className="text-xs font-bold text-slate-900 sm:text-sm">{stage.label}</span>
              </div>

              {/* Deal Count & Value */}
              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <span className="font-semibold text-slate-600">{stage.value}</span>
                <span className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-extrabold text-slate-900 shadow-2xs">
                  {stage.count} deals
                </span>
                <span className="font-bold text-emerald-600">{stage.trend}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}
