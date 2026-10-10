"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  Plus,
  Mail,
  PhoneCall,
  Target,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

interface FollowUpsHeaderProps {
  onScheduleFollowup: () => void;
  onComposeEmail: () => void;
  onUpdateStage: () => void;
  stats: {
    dueToday: number;
    overdueCount: number;
    completedToday: number;
    stageTransitions: number;
  };
}

export function FollowUpsHeader({
  onScheduleFollowup,
  onComposeEmail,
  onUpdateStage,
  stats,
}: FollowUpsHeaderProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all md:p-8">
      {/* Title Bar & Quick Actions */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 to-purple-100 text-indigo-600 shadow-2xs">
            <CalendarClock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Client Follow-ups & Pipeline Nurturing
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Track tasks, initiate follow-up calls, dispatch emails & update lead funnel stages
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onScheduleFollowup}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-98"
          >
            <Plus className="h-4 w-4" /> Schedule Follow-up
          </button>
          <button
            type="button"
            onClick={onComposeEmail}
            className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-2xs transition-all hover:bg-indigo-600 hover:text-white"
          >
            <Mail className="h-4 w-4" /> Follow-up Email
          </button>
          <button
            type="button"
            onClick={onUpdateStage}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-100"
          >
            <Target className="h-4 w-4 text-emerald-600" /> Update Lead Stage
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900">Due Today</span>
            <CalendarClock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-700">{stats.dueToday}</div>
          <div className="mt-1 text-[11px] font-semibold text-amber-700">Scheduled for action</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-900">Overdue Follow-ups</span>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-rose-700">{stats.overdueCount}</div>
          <div className="mt-1 text-[11px] font-semibold text-rose-600">
            Requires urgent outreach
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Completed Today</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-700">{stats.completedToday}</div>
          <div className="mt-1 text-[11px] font-semibold text-emerald-600">
            Tasks & calls logged
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900">Stage Transitions</span>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-indigo-700">{stats.stageTransitions}</div>
          <div className="mt-1 text-[11px] font-semibold text-indigo-600">Advanced in pipeline</div>
        </motion.div>
      </div>
    </div>
  );
}
