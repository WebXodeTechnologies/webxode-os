"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { CheckCircle2, Clock, AlertTriangle, PlayCircle, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface TaskStat {
  id: string;
  label: string;
  count: number;
  color: string;
  borderColor: string;
  bgWash: string;
  barColor: string;
  icon: any;
  pct: number;
}

export function ProductivityWidget() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const taskStats: TaskStat[] = [
    {
      id: "completed",
      label: "Completed",
      count: 38,
      color: "text-emerald-700",
      borderColor: "border-emerald-200/80 hover:border-emerald-300",
      bgWash: "bg-linear-to-b from-emerald-50/70 to-white",
      barColor: "bg-emerald-500",
      icon: CheckCircle2,
      pct: 59,
    },
    {
      id: "in_progress",
      label: "In Progress",
      count: 14,
      color: "text-blue-700",
      borderColor: "border-blue-200/80 hover:border-blue-300",
      bgWash: "bg-linear-to-b from-blue-50/70 to-white",
      barColor: "bg-blue-500",
      icon: PlayCircle,
      pct: 22,
    },
    {
      id: "due_today",
      label: "Due Today",
      count: 7,
      color: "text-amber-700",
      borderColor: "border-amber-200/80 hover:border-amber-300",
      bgWash: "bg-linear-to-b from-amber-50/70 to-white",
      barColor: "bg-amber-500",
      icon: Clock,
      pct: 11,
    },
    {
      id: "overdue",
      label: "Overdue",
      count: 5,
      color: "text-rose-700",
      borderColor: "border-rose-200/80 hover:border-rose-300",
      bgWash: "bg-linear-to-b from-rose-50/70 to-white",
      barColor: "bg-rose-500",
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
        actions={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Task</span>
          </button>
        }
      />

      {/* Main Multi-segment Progress Bar with Smooth Animation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold sm:text-sm">
          <span className="text-slate-700">Sprint Completion Ratio</span>
          <span className="flex items-center gap-1 font-extrabold text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            59% Completed
          </span>
        </div>

        <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 shadow-inner">
          {taskStats.map((stat) => {
            const isFaded = activeHover && activeHover !== stat.id;
            return (
              <motion.div
                key={stat.id}
                initial={{ width: 0 }}
                animate={{ width: `${stat.pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full transition-opacity duration-200 first:rounded-l-full last:rounded-r-full ${stat.barColor} ${
                  isFaded ? "opacity-30" : "opacity-100"
                }`}
                title={`${stat.label} (${stat.pct}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Grid of 4 Task Categories with Spring Hover Physics */}
      <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {taskStats.map((item) => {
          const Icon = item.icon;
          const isHovered = activeHover === item.id;

          return (
            <motion.div
              key={item.id}
              onHoverStart={() => setActiveHover(item.id)}
              onHoverEnd={() => setActiveHover(null)}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group flex flex-col justify-between rounded-2xl border p-4 shadow-2xs transition-colors ${item.borderColor} ${item.bgWash}`}
            >
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className={item.color}>{item.label}</span>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-xl bg-white/80 shadow-xs ${item.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className={`text-2xl font-black tracking-tight sm:text-3xl ${item.color}`}>
                  {item.count}
                </span>
                <span className="rounded-md bg-white/80 px-2 py-0.5 font-mono text-[11px] font-black text-slate-700 shadow-2xs">
                  {item.pct}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </WidgetCard>
  );
}
