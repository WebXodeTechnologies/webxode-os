"use client";

import React from "react";
import { PhoneCall, Mail, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

interface SalesDashboardOverviewProps {
  metrics?: {
    activeLeads: number;
    upcomingTasks: any[];
  } | null;
  onQuickAction: (action: string) => void;
}

export function SalesDashboardOverview({ metrics, onQuickAction }: SalesDashboardOverviewProps) {
  const activeLeadsCount = metrics?.activeLeads || 5;
  const pendingCallsCount =
    metrics?.upcomingTasks?.filter((t: any) => t.title.toLowerCase().includes("call")).length || 10;
  const pendingEmailsCount =
    metrics?.upcomingTasks?.filter(
      (t: any) => t.title.toLowerCase().includes("email") || t.title.toLowerCase().includes("mail")
    ).length || 15;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* Active Leads Card */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onQuickAction("view_leads")}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-emerald-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-50 opacity-50 transition-transform duration-500 group-hover:scale-150"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-xs transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            <ArrowUpRight className="h-3 w-3" />
            <span>12%</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Active Pipeline
          </p>
          <p className="mt-0.5 flex items-baseline gap-1.5 text-4xl font-black tracking-tighter text-slate-900">
            {activeLeadsCount}
            <span className="text-[11px] font-medium tracking-normal text-slate-400 lowercase">
              leads
            </span>
          </p>
        </div>
      </motion.div>

      {/* Pending Calls Card */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onQuickAction("calls")}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-amber-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-amber-50 opacity-50 transition-transform duration-500 group-hover:scale-150"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-xs transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
            <ArrowDownRight className="h-3 w-3" />
            <span>4%</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Calling Queue
          </p>
          <p className="mt-0.5 flex items-baseline gap-1.5 text-4xl font-black tracking-tighter text-slate-900">
            {pendingCallsCount}
            <span className="text-[11px] font-medium tracking-normal text-slate-400 lowercase">
              tasks
            </span>
          </p>
        </div>
      </motion.div>

      {/* Mail Sending Card */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onQuickAction("emails")}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-purple-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-purple-50 opacity-50 transition-transform duration-500 group-hover:scale-150"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-xs transition-colors duration-300 group-hover:bg-purple-500 group-hover:text-white">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            <ArrowUpRight className="h-3 w-3" />
            <span>8%</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Mail Follow-ups
          </p>
          <p className="mt-0.5 flex items-baseline gap-1.5 text-4xl font-black tracking-tighter text-slate-900">
            {pendingEmailsCount}
            <span className="text-[11px] font-medium tracking-normal text-slate-400 lowercase">
              emails
            </span>
          </p>
        </div>
      </motion.div>

      {/* Conversion Rate Card */}
      <motion.div
        variants={item}
        whileHover={{ y: -4, scale: 1.01 }}
        className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-teal-500/10"
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-teal-50 opacity-50 transition-transform duration-500 group-hover:scale-150"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-xs transition-colors duration-300 group-hover:bg-teal-500 group-hover:text-white">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            <ArrowUpRight className="h-3 w-3" />
            <span>2.1%</span>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Conversion Ratio
          </p>
          <p className="mt-0.5 text-4xl font-black tracking-tighter text-slate-900">64.8%</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
