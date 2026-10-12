"use client";

import React, { useState } from "react";
import { AlertTriangle, Clock, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TaskReminder } from "@/modules/tasks/task.types";

interface TaskRemindersBannerProps {
  reminders: TaskReminder[];
  onSelectTaskCode?: (taskCode: string) => void;
}

export function TaskRemindersBanner({ reminders, onSelectTaskCode }: TaskRemindersBannerProps) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const activeReminders = reminders.filter((r) => !dismissedIds.includes(r.id));

  if (activeReminders.length === 0) return null;

  const dismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedIds((prev) => [...prev, id]);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-amber-200/90 bg-linear-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 p-4 shadow-2xs sm:p-5">
      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500 text-white shadow-2xs">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <span className="text-sm font-black tracking-wider text-amber-950 uppercase">
            Sprint Deadlines & Critical SLA Reminders ({activeReminders.length})
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-amber-900 transition-colors hover:text-amber-950"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeReminders.map((reminder) => {
              const isUrgent = reminder.severity === "urgent";

              return (
                <div
                  key={reminder.id}
                  onClick={() => reminder.taskCode && onSelectTaskCode?.(reminder.taskCode)}
                  className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-3.5 transition-all hover:shadow-xs sm:p-4 ${
                    isUrgent
                      ? "border-rose-300/90 bg-white/95 hover:border-rose-400"
                      : "border-amber-200/90 bg-white/95 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-black tracking-wider uppercase ${
                          isUrgent ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {reminder.type}
                      </span>
                      {reminder.client && (
                        <span className="text-xs font-bold text-slate-500">{reminder.client}</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => dismiss(reminder.id, e)}
                      className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                      title="Dismiss reminder"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {reminder.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {reminder.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-amber-800">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{reminder.dueIn}</span>
                    </div>

                    {reminder.taskCode && (
                      <span className="inline-flex items-center gap-1 font-extrabold text-indigo-600 hover:underline">
                        <span>View {reminder.taskCode}</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
