"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { CheckCircle2, Circle, Plus, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [filterCategory, setFilterCategory] = useState<string>("All");

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const filteredTasks =
    filterCategory === "All" ? tasks : tasks.filter((t) => t.category === filterCategory);

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

      {/* Progress Bar & Filter Pills Toolbar */}
      <div className="mb-4 space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span className="text-slate-500">Daily Execution Progress</span>
            <span className="font-extrabold text-indigo-600">{progressPercent}% Completed</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-full bg-indigo-600 shadow-xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto rounded-xl bg-slate-100/80 p-1 text-xs font-bold">
          {(["All", "Meeting", "Sales", "Finance", "Review", "Development"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                filterCategory === cat
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task List with Framer Motion Animations */}
      <div className="space-y-2.5">
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                whileHover={{ y: -1 }}
                className={`group flex items-center justify-between rounded-2xl border p-3.5 transition-all ${
                  task.completed
                    ? "border-slate-100 bg-slate-50/70 text-slate-400"
                    : "border-slate-200/80 bg-white text-slate-900 shadow-2xs hover:border-indigo-200 hover:shadow-xs"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="shrink-0 transition-transform active:scale-90"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 fill-emerald-100 text-emerald-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 transition-colors hover:text-indigo-600" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-xs font-bold transition-colors sm:text-sm ${
                        task.completed ? "text-slate-400 line-through" : "text-slate-900"
                      }`}
                    >
                      {task.label}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="h-3 w-3" />
                        {task.time}
                      </span>
                      {task.entityName && (
                        <>
                          <span>•</span>
                          <span className="font-bold text-indigo-600">{task.entityName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${categoryBadges[task.category]}`}
                  >
                    {task.category}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs font-semibold text-slate-400"
            >
              <Sparkles className="mb-2 h-6 w-6 text-indigo-500" />
              <p>No tasks found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WidgetCard>
  );
}
