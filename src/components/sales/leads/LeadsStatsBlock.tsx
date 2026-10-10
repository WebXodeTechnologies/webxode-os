"use client";

import React from "react";
import { Users, PhoneCall, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

interface LeadsStatsBlockProps {
  totalClients: number;
  activeContacts: number;
  pendingTasks: number;
}

export function LeadsStatsBlock({
  totalClients,
  activeContacts,
  pendingTasks,
}: LeadsStatsBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Clients</p>
          <p className="text-2xl font-black text-slate-900">{totalClients}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <PhoneCall className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Active Contacts
          </p>
          <p className="text-2xl font-black text-slate-900">{activeContacts}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <CheckSquare className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Pending Tasks</p>
          <p className="text-2xl font-black text-slate-900">{pendingTasks}</p>
        </div>
      </div>
    </motion.div>
  );
}
