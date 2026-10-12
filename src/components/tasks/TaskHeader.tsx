"use client";

import React from "react";
import {
  Plus,
  Kanban,
  Users,
  Table as TableIcon,
  CheckSquare,
  PhoneCall,
  Activity,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import { TaskItem } from "@/modules/tasks/task.types";

interface TaskHeaderProps {
  tasks: TaskItem[];
  pendingTodosCount: number;
  upcomingRemindersCount: number;
  meetingLogsCount: number;
  viewMode: "kanban" | "workload" | "table";
  onViewModeChange: (mode: "kanban" | "workload" | "table") => void;
  onOpenCreateModal: () => void;
  onToggleTodoDrawer: () => void;
  onOpenMeetingModal: () => void;
  onToggleActivityDrawer: () => void;
}

export function TaskHeader({
  tasks,
  pendingTodosCount,
  meetingLogsCount,
  viewMode,
  onViewModeChange,
  onOpenCreateModal,
  onToggleTodoDrawer,
  onOpenMeetingModal,
  onToggleActivityDrawer,
}: TaskHeaderProps) {
  // Compute high-level sprint metrics
  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const inReview = tasks.filter((t) => t.status === "in_review").length;
  const blocked = tasks.filter((t) => t.status === "blocked" || t.isBlocked).length;
  const totalPoints = tasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
  const completedPoints = tasks
    .filter((t) => t.status === "done")
    .reduce((sum, t) => sum + (t.storyPoints || 0), 0);
  const sprintProgressPercent =
    totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Top Banner & Title Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 sm:text-sm">
            <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
            <span className="tracking-wider uppercase">
              Agile Sprint Delivery Engine • Sprint 42
            </span>
            <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
              Active Sprint
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Tasks & Engineering Kanban
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
            Deliver multi-client IT deliverables, monitor team capacity, track meetings, and
            coordinate sprint releases.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Personal To-Do Drawer Button */}
          <button
            type="button"
            onClick={onToggleTodoDrawer}
            className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:text-sm"
          >
            <CheckSquare className="h-4 w-4 text-emerald-600" />
            <span>Quick To-Do</span>
            {pendingTodosCount > 0 && (
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-black text-white">
                {pendingTodosCount}
              </span>
            )}
          </button>

          {/* Meeting & Call Logs Button */}
          <button
            type="button"
            onClick={onOpenMeetingModal}
            className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:text-sm"
          >
            <PhoneCall className="h-4 w-4 text-sky-600" />
            <span>Meeting Logs</span>
            {meetingLogsCount > 0 && (
              <span className="rounded-full border border-sky-200 bg-sky-100 px-2 py-0.5 text-xs font-black text-sky-800">
                {meetingLogsCount}
              </span>
            )}
          </button>

          {/* Activity Tracker Button */}
          <button
            type="button"
            onClick={onToggleActivityDrawer}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:text-sm"
          >
            <Activity className="h-4 w-4 text-purple-600" />
            <span>Live Audit</span>
          </button>

          {/* New Task Primary Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-indigo-700 to-violet-700 px-4.5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/30 sm:text-sm"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Create Task</span>
          </motion.button>
        </div>
      </div>

      {/* Metrics Bar & View Switcher */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-2xs backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        {/* Metrics Strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 sm:gap-5 sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Total:</span>
            <span className="font-extrabold text-slate-900">{totalTasks} deliverables</span>
            <span className="rounded-lg border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700">
              {totalPoints} pts
            </span>
          </div>

          <div className="hidden h-4 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="font-medium text-slate-500">In Progress:</span>
            <span className="font-bold text-slate-900">{inProgress}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500" />
            <span className="font-medium text-slate-500">Review:</span>
            <span className="font-bold text-slate-900">{inReview}</span>
          </div>

          {blocked > 0 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1 text-rose-700">
              <Flame className="h-4 w-4 text-rose-600" />
              <span className="text-xs font-extrabold">{blocked} Blocked</span>
            </div>
          )}

          <div className="hidden h-4 w-px bg-slate-200 md:block" />

          {/* Velocity Progress */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <span className="text-xs font-semibold text-slate-500">Sprint Progress:</span>
            <div className="h-2.5 w-32 overflow-hidden rounded-full border border-slate-200/80 bg-slate-100">
              <div
                className="h-full rounded-full bg-linear-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${sprintProgressPercent}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-emerald-600">
              {sprintProgressPercent}%
            </span>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1 self-start rounded-xl border border-slate-200 bg-slate-50 p-1 sm:self-auto">
          <button
            type="button"
            onClick={() => onViewModeChange("kanban")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:text-sm ${
              viewMode === "kanban"
                ? "border border-slate-200/80 bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Kanban className="h-4 w-4" />
            <span>Kanban Board</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("workload")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:text-sm ${
              viewMode === "workload"
                ? "border border-slate-200/80 bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Team Capacity</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:text-sm ${
              viewMode === "table"
                ? "border border-slate-200/80 bg-white text-indigo-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TableIcon className="h-4 w-4" />
            <span>Dense Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
