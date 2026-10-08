"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { CheckCircle2, Circle } from "lucide-react";

interface TaskItem {
  id: string;
  label: string;
  time: string;
  category: "Meeting" | "Sales" | "Finance" | "Development" | "Review";
  completed: boolean;
  entityName?: string;
}

export function TodaysWorkWidget() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "1",
      label: "Follow-up proposal with Visual Bridge team",
      time: "10:30 AM",
      category: "Sales",
      completed: false,
      entityName: "VBF Website",
    },
    {
      id: "2",
      label: "Client discovery call: Green Naturals",
      time: "11:30 AM",
      category: "Meeting",
      completed: false,
      entityName: "Green Naturals",
    },
    {
      id: "3",
      label: "Review quotation & sign for Annai Agro",
      time: "01:00 PM",
      category: "Finance",
      completed: true,
      entityName: "Annai Agro B2B",
    },
    {
      id: "4",
      label: "UI design review for Aishwarya Arts",
      time: "03:00 PM",
      category: "Review",
      completed: false,
      entityName: "Aishwarya Arts",
    },
    {
      id: "5",
      label: "Sprint sync & release build verification",
      time: "04:30 PM",
      category: "Development",
      completed: false,
      entityName: "Webxode OS",
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const categoryBadges = {
    Meeting: "bg-blue-50 text-blue-700 border-blue-200",
    Sales: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Finance: "bg-violet-50 text-violet-700 border-violet-200",
    Review: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Development: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Today's Work & Action Items"
        subtitle="Daily priority tasks, client meetings, and rapid action triggers"
        badge={`${completedCount} / ${tasks.length} Done`}
        badgeVariant={completedCount === tasks.length ? "success" : "indigo"}
      />

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-150 ${
              task.completed
                ? "border-slate-100 bg-slate-50/60 text-slate-400"
                : "border-slate-200/80 bg-white text-slate-800 shadow-2xs hover:border-slate-300 hover:shadow-xs"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className="shrink-0 transition-transform active:scale-95"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 fill-emerald-100 text-emerald-600" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 hover:text-indigo-600" />
                )}
              </button>

              <div className="min-w-0">
                <p
                  className={`truncate text-xs font-bold sm:text-sm ${
                    task.completed ? "text-slate-400 line-through" : "text-slate-900"
                  }`}
                >
                  {task.label}
                </p>
                {task.entityName && (
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">
                    {task.time} • {task.entityName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span
                className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${categoryBadges[task.category]}`}
              >
                {task.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
