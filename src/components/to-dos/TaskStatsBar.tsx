"use client";

import React from "react";
import { CheckCircle2, Clock, AlertCircle, Bell } from "lucide-react";

interface TaskStatsBarProps {
  totalCount: number;
  completedCount: number;
  urgentCount: number;
  remindersCount: number;
}

export function TaskStatsBar({
  totalCount,
  completedCount,
  urgentCount,
  remindersCount,
}: TaskStatsBarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Tasks */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            Total Tasks
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-black text-slate-900">{totalCount}</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">Active across all projects</p>
      </div>

      {/* Completed Tasks */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            Completed
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-black text-emerald-600">{completedCount}</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">Successfully finished</p>
      </div>

      {/* Urgent Priority */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            Urgent Priority
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
            <AlertCircle className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-black text-rose-600">{urgentCount}</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">Requires immediate attention</p>
      </div>

      {/* Active Reminders */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            Reminders
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Bell className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-black text-amber-600">{remindersCount}</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">Scheduled notifications</p>
      </div>
    </div>
  );
}
