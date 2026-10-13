"use client";

import React from "react";
import { Plus, LayoutGrid, ListTodo } from "lucide-react";

interface TaskHeaderProps {
  viewMode: "kanban" | "list";
  setViewMode: (mode: "kanban" | "list") => void;
  onNewTask: () => void;
  totalTasks: number;
}

export function TaskHeader({ viewMode, setViewMode, onNewTask, totalTasks }: TaskHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-indigo-700 uppercase">
            Operations & Productivity
          </span>
          <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
        </div>
        <h1 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
          Tasks, Kanban & Reminders
        </h1>
        <p className="text-xs font-semibold text-slate-500">
          Manage individual execution items, daily reminders, and sprint workflows across columns (
          {totalTasks} total)
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* View Switcher */}
        <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setViewMode("kanban")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              viewMode === "kanban"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Kanban</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              viewMode === "list"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ListTodo className="h-3.5 w-3.5" />
            <span>List & Reminders</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onNewTask}
          className="flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>New Task / Reminder</span>
        </button>
      </div>
    </div>
  );
}
