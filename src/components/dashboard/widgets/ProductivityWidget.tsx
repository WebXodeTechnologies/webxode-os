"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { CheckCircle2, Clock, AlertTriangle, PlayCircle } from "lucide-react";

export function ProductivityWidget() {
  const taskStats = [
    {
      label: "Completed",
      count: 38,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      icon: CheckCircle2,
      pct: 59,
    },
    {
      label: "In Progress",
      count: 14,
      color: "text-blue-700 bg-blue-50 border-blue-200",
      icon: PlayCircle,
      pct: 22,
    },
    {
      label: "Due Today",
      count: 7,
      color: "text-amber-700 bg-amber-50 border-amber-200",
      icon: Clock,
      pct: 11,
    },
    {
      label: "Overdue",
      count: 5,
      color: "text-rose-700 bg-rose-50 border-rose-200",
      icon: AlertTriangle,
      pct: 8,
    },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Workload & Task Productivity"
        subtitle="Sprint task completion velocity and bottleneck breakdown"
        badge="64 Total Tasks"
        badgeVariant="indigo"
      />

      {/* Main Multi-segment Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-700 sm:text-sm">
          <span>Sprint Completion Ratio</span>
          <span className="font-extrabold text-emerald-600">59% Completed</span>
        </div>
        <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div style={{ width: "59%" }} className="bg-emerald-500" title="Completed (59%)"></div>
          <div style={{ width: "22%" }} className="bg-blue-500" title="In Progress (22%)"></div>
          <div style={{ width: "11%" }} className="bg-amber-500" title="Due Today (11%)"></div>
          <div style={{ width: "8%" }} className="bg-rose-500" title="Overdue (8%)"></div>
        </div>
      </div>

      {/* Grid of 4 Task Categories */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {taskStats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-2xl border p-3.5 ${item.color} transition`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>{item.label}</span>
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-black">{item.count}</span>
                <span className="font-mono text-xs font-bold opacity-80">{item.pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </WidgetCard>
  );
}
