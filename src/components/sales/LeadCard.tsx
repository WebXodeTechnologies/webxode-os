"use client";

import React from "react";
import Link from "next/link";
import { Users, CheckCircle2, ChevronRight, Send } from "lucide-react";
import { motion } from "framer-motion";

export interface LeadTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface LeadItem {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  hasGst: boolean;
  gstin?: string;
  value: number;
  stage: string;
  source: string;
  salesPerson: string;
  demoStatus: string;
  lastInteraction: string;
  tasks: LeadTask[];
}

interface LeadCardProps {
  lead: LeadItem;
  index: number;
  onHandover: (leadId: string) => void;
}

const stageBadgeColors: Record<string, string> = {
  Enquiry: "bg-slate-100 text-slate-700 border-slate-200",
  "Calling / Contacting": "bg-blue-50 text-blue-700 border-blue-200",
  Nurturing: "bg-purple-50 text-purple-700 border-purple-200",
  "Demo Booked": "bg-sky-50 text-sky-700 border-sky-200",
  "Presales Handover": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Lost / Dead": "bg-rose-50 text-rose-700 border-rose-200",
};

export function LeadCard({ lead, index, onHandover }: LeadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-indigo-300 hover:shadow-md"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400">{lead.id}</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-600 uppercase">
              Source: {lead.source}
            </span>
          </div>
          <span
            className={`rounded-xl border px-3 py-1 text-[11px] font-extrabold uppercase ${stageBadgeColors[lead.stage] || "bg-slate-100 text-slate-700"}`}
          >
            {lead.stage}
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">{lead.companyName}</h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
              <Users className="h-3.5 w-3.5" />
              <span>
                {lead.contactPerson} ({lead.phone})
              </span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Deal Value</span>
            <p className="text-base font-black text-slate-900">
              ₹{lead.value.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold ${
              lead.hasGst
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            {lead.hasGst ? `GST: ${lead.gstin}` : "GST: Unregistered"}
          </span>
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-600">
            Demo: {lead.demoStatus}
          </span>
        </div>

        <div className="mt-4 space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
            <span>Requirement Checklist</span>
            <span className="text-indigo-600">
              {lead.tasks.filter((t) => t.completed).length} / {lead.tasks.length} Completed
            </span>
          </div>
          <div className="space-y-1.5">
            {lead.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2 text-xs">
                <CheckCircle2
                  className={`h-4 w-4 shrink-0 ${task.completed ? "text-emerald-600" : "text-slate-300"}`}
                />
                <span
                  className={
                    task.completed
                      ? "font-medium text-slate-400 line-through"
                      : "font-bold text-slate-800"
                  }
                >
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="max-w-50 truncate text-[11px] font-medium text-slate-400">
          {lead.lastInteraction}
        </span>

        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/sales/leads/${lead.id}` as any}
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 transition hover:bg-slate-50"
          >
            <span>Manage Record</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          {["Enquiry", "Calling / Contacting", "Nurturing", "Demo Booked"].includes(lead.stage) && (
            <button
              type="button"
              onClick={() => onHandover(lead.id)}
              className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Presales Handover</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
