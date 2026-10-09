import React from "react";
import { Lead } from "@/types/sales";
import { CheckCircle2, ChevronRight, Send, ArrowUpRight, CheckSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface LeadCardProps {
  lead: Lead;
  index?: number;
  onSelectLead: (lead: Lead) => void;
  onHandover: (leadId: string) => void;
}

export function LeadCard({ lead, index = 0, onSelectLead, onHandover }: LeadCardProps) {
  const stageColors: Record<string, string> = {
    Enquiry: "bg-slate-100 text-slate-700 border-slate-200/60",
    Qualification: "bg-blue-50 text-blue-700 border-blue-200/60",
    Nurturing: "bg-purple-50 text-purple-700 border-purple-200/60",
    Proposal: "bg-amber-50 text-amber-700 border-amber-200/60",
    "Closed Won": "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  };

  const completedTasks = lead.tasks.filter((t) => t.completed).length;
  const totalTasks = lead.tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-2xs transition-all duration-300 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-500/5"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-500">
              {lead.id}
            </span>
            <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
              {lead.source}
            </span>
          </div>
          <span
            className={`rounded-lg border px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${stageColors[lead.stage]}`}
          >
            {lead.stage}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-black tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
              {lead.companyName}
            </h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">{lead.contactPerson}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xl font-black text-slate-900">
              ₹{(lead.value / 100000).toFixed(2)}
              <span className="text-sm font-bold text-slate-400">L</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-bold ${lead.hasGst ? "border-emerald-100 bg-emerald-50/50 text-emerald-700" : "border-amber-100 bg-amber-50/50 text-amber-700"}`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${lead.hasGst ? "bg-emerald-500" : "bg-amber-500"}`}
            />
            {lead.hasGst ? `GST: ${lead.gstin}` : "Unregistered"}
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
            Rep: {lead.salesPerson}
          </div>
        </div>

        {/* Task Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="flex items-center gap-1.5 text-slate-500">
              <CheckSquare className="h-3.5 w-3.5" />
              Requirements
            </span>
            <span className={progress === 100 ? "text-emerald-600" : "text-indigo-600"}>
              {completedTasks} / {totalTasks}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${progress === 100 ? "bg-emerald-500" : "bg-indigo-500"}`}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100/80 bg-slate-50/50 px-6 py-4">
        <div className="flex max-w-[60%] items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span
            className="truncate text-[11px] font-medium text-slate-500"
            title={lead.lastInteraction}
          >
            {lead.lastInteraction}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {lead.stage === "Closed Won" ? (
            <button
              type="button"
              onClick={() => onHandover(lead.id)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
            >
              <span>Handover</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSelectLead(lead)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
            >
              <ArrowUpRight className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
