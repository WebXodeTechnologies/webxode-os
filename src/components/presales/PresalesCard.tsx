"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  Calculator,
  FileText,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Percent,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { PresalesItem } from "@/modules/presales/presales.types";

interface PresalesCardProps {
  item: PresalesItem;
  index: number;
  onViewDetails: (item: PresalesItem) => void;
  onOpenCalculator: (item: PresalesItem) => void;
  onAdvanceStage: (item: PresalesItem) => void;
  onHandoffToProject: (item: PresalesItem) => void;
}

const stageBadgeStyles: Record<
  PresalesItem["stage"],
  { bg: string; text: string; border: string }
> = {
  Requirement: {
    bg: "bg-blue-50/80",
    text: "text-blue-700",
    border: "border-blue-200/80",
  },
  Estimation: {
    bg: "bg-amber-50/80",
    text: "text-amber-700",
    border: "border-amber-200/80",
  },
  Proposal: {
    bg: "bg-indigo-50/80",
    text: "text-indigo-700",
    border: "border-indigo-200/80",
  },
  Quotation: {
    bg: "bg-emerald-50/80",
    text: "text-emerald-700",
    border: "border-emerald-200/80",
  },
  Negotiation: {
    bg: "bg-purple-50/80",
    text: "text-purple-700",
    border: "border-purple-200/80",
  },
  Approved: {
    bg: "bg-teal-50/80",
    text: "text-teal-700",
    border: "border-teal-200/80",
  },
};

const priorityStyles: Record<PresalesItem["priority"], { bg: string; text: string }> = {
  Critical: { bg: "bg-rose-50 text-rose-700 border-rose-200", text: "text-rose-700" },
  High: { bg: "bg-orange-50 text-orange-700 border-orange-200", text: "text-orange-700" },
  Medium: { bg: "bg-sky-50 text-sky-700 border-sky-200", text: "text-sky-700" },
  Standard: { bg: "bg-slate-100 text-slate-700 border-slate-200", text: "text-slate-700" },
};

export function PresalesCard({
  item,
  index,
  onViewDetails,
  onOpenCalculator,
  onAdvanceStage,
  onHandoffToProject,
}: PresalesCardProps) {
  const badgeStyle = stageBadgeStyles[item.stage] || stageBadgeStyles.Requirement;
  const priorityStyle = priorityStyles[item.priority] || priorityStyles.Standard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5"
    >
      <div>
        {/* Top Header: Quote ID, Priority & Stage Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400">
              {item.quotationNumber || item.id}
            </span>
            <span
              className={`rounded-lg border px-2 py-0.5 text-[10px] font-extrabold uppercase ${priorityStyle.bg}`}
            >
              {item.priority}
            </span>
          </div>

          <span
            className={`rounded-xl border px-3 py-1 text-[11px] font-extrabold tracking-tight uppercase ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
          >
            {item.stage}
          </span>
        </div>

        {/* Client & Title */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-wider text-indigo-600 uppercase">
              {item.clientName}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <Users className="h-3.5 w-3.5" />
              {item.contactPerson}
            </span>
          </div>

          <h3 className="mt-1 text-base leading-snug font-black text-slate-900 transition-colors group-hover:text-indigo-600">
            {item.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed font-medium text-slate-500">
            {item.scopeSummary}
          </p>
        </div>

        {/* Commercial & Technical KPI Grid */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 sm:grid-cols-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Deal Value
            </span>
            <p className="text-sm font-black text-slate-900">
              ₹{item.estimatedValue.toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Total Effort
            </span>
            <p className="flex items-center gap-1 text-sm font-black text-slate-900">
              <Clock className="h-3 w-3 text-amber-500" />
              <span>{item.totalEffortHours} hrs</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Timeline
            </span>
            <p className="flex items-center gap-1 text-sm font-black text-slate-900">
              <Calendar className="h-3 w-3 text-indigo-500" />
              <span>{item.timelineWeeks} wks</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Target Margin
            </span>
            <p className="flex items-center gap-1 text-sm font-black text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>{item.targetMarginPercent}%</span>
            </p>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {item.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-slate-200/60 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow-2xs"
            >
              {tech}
            </span>
          ))}
          {item.techStack.length > 4 && (
            <span className="rounded-lg bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
              +{item.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Solution Architect & Action Controls */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          {/* Solution Architect info */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-[11px] font-black text-white shadow-2xs">
              {item.solutionArchitect?.name?.[0] || "A"}
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800">
                {item.solutionArchitect?.name || "Solutions Architect"}
              </p>
              <p className="text-[9px] font-semibold text-slate-400">
                {item.solutionArchitect?.role || "Architect"}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onOpenCalculator(item)}
              title="Open Effort & Cost Calculator"
              className="flex h-8 cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 text-[11px] font-bold text-slate-600 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <Calculator className="h-3.5 w-3.5 text-slate-400" />
              <span>Estimate</span>
            </button>

            <button
              type="button"
              onClick={() => onViewDetails(item)}
              className="flex h-8 cursor-pointer items-center gap-1 rounded-xl bg-slate-900 px-3 text-[11px] font-bold text-white shadow-2xs transition-all hover:bg-indigo-600"
            >
              <span>Specs & SOW</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Advance or Handover Action Button */}
        <div className="mt-3 pt-2">
          {item.stage === "Approved" ? (
            <button
              type="button"
              onClick={() => onHandoffToProject(item)}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 py-2 text-xs font-black text-teal-700 transition hover:bg-teal-100"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
              <span>Convert & Handover to Delivery Projects</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAdvanceStage(item)}
              className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700"
            >
              <span>Next Milestone Workflow</span>
              <div className="flex items-center gap-1 text-indigo-600">
                <span>Advance Stage</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
