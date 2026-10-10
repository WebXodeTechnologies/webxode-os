"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Plus,
  PhoneForwarded,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

interface CallsHeaderProps {
  onInitiateCall: () => void;
  onSendEmail: () => void;
  onLogCall: () => void;
  stats: {
    totalCalls: number;
    connectedCalls: number;
    emailsSent: number;
    pendingCallbacks: number;
  };
}

export function CallsHeader({ onInitiateCall, onSendEmail, onLogCall, stats }: CallsHeaderProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all md:p-8">
      {/* Title Bar & Quick Actions */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 to-blue-100 text-indigo-600 shadow-2xs">
            <PhoneCall className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Outreach & Sales Calls Hub
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Initiate client calls, dispatch email templates & track communication logs
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onInitiateCall}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-98"
          >
            <PhoneForwarded className="h-4 w-4" /> Initiate Web Call
          </button>
          <button
            type="button"
            onClick={onSendEmail}
            className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-2xs transition-all hover:bg-indigo-600 hover:text-white"
          >
            <Mail className="h-4 w-4" /> Compose Email
          </button>
          <button
            type="button"
            onClick={onLogCall}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-100"
          >
            <Plus className="h-4 w-4 text-slate-500" /> Log Call Activity
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Calls Today</span>
            <PhoneCall className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{stats.totalCalls}</div>
          <div className="mt-1 text-[11px] font-semibold text-emerald-600">+12% vs yesterday</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">Connected & Answered</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-700">{stats.connectedCalls}</div>
          <div className="mt-1 text-[11px] font-semibold text-emerald-700">76% Connect Rate</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800">Emails Sent</span>
            <Mail className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-blue-700">{stats.emailsSent}</div>
          <div className="mt-1 text-[11px] font-semibold text-blue-600">Template Broadcasts</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800">Pending Callbacks</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-700">{stats.pendingCallbacks}</div>
          <div className="mt-1 text-[11px] font-semibold text-amber-600">Requires follow-up</div>
        </motion.div>
      </div>
    </div>
  );
}
