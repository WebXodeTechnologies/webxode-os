"use client";

import React from "react";
import {
  Clock,
  ArrowUpRight,
  Calculator,
  ChevronRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { PresalesItem } from "@/modules/presales/presales.types";

interface PresalesTableViewProps {
  items: PresalesItem[];
  onViewDetails: (item: PresalesItem) => void;
  onOpenCalculator: (item: PresalesItem) => void;
  onAdvanceStage: (item: PresalesItem) => void;
  onHandoffToProject: (item: PresalesItem) => void;
}

const stageBadgeStyles: Record<PresalesItem["stage"], string> = {
  Requirement: "bg-blue-50 text-blue-700 border-blue-200",
  Estimation: "bg-amber-50 text-amber-700 border-amber-200",
  Proposal: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Quotation: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Negotiation: "bg-purple-50 text-purple-700 border-purple-200",
  Approved: "bg-teal-50 text-teal-700 border-teal-200",
};

export function PresalesTableView({
  items,
  onViewDetails,
  onOpenCalculator,
  onAdvanceStage,
  onHandoffToProject,
}: PresalesTableViewProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200/80 bg-slate-50/70 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
            <tr>
              <th className="py-4 pr-4 pl-6">Quote ID / Client</th>
              <th className="px-4 py-4">Solution Scope</th>
              <th className="px-4 py-4">Stage</th>
              <th className="px-4 py-4">Effort & Timeline</th>
              <th className="px-4 py-4">Commercial Value</th>
              <th className="px-4 py-4">Tech Stack</th>
              <th className="px-4 py-4">Architect</th>
              <th className="py-4 pr-6 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr
                key={item.id || item._id}
                className="group transition-colors hover:bg-indigo-50/20"
              >
                {/* Quote ID / Client */}
                <td className="py-4 pr-4 pl-6">
                  <div className="font-mono text-[11px] font-bold text-slate-400">
                    {item.quotationNumber || item.id}
                  </div>
                  <div className="font-black text-slate-900 group-hover:text-indigo-600">
                    {item.clientName}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">{item.contactPerson}</div>
                </td>

                {/* Solution Scope */}
                <td className="max-w-xs px-4 py-4">
                  <div className="line-clamp-1 font-bold text-slate-800">{item.title}</div>
                  <div className="line-clamp-1 text-[11px] text-slate-500">{item.scopeSummary}</div>
                </td>

                {/* Stage */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block rounded-xl border px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                      stageBadgeStyles[item.stage] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.stage}
                  </span>
                </td>

                {/* Effort & Timeline */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Clock className="h-3 w-3 text-amber-500" />
                    <span>{item.totalEffortHours} hrs</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Calendar className="h-3 w-3 text-indigo-400" />
                    <span>{item.timelineWeeks} weeks</span>
                  </div>
                </td>

                {/* Commercial Value */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="font-black text-slate-900">
                    ₹{item.estimatedValue.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600">
                    {item.targetMarginPercent}% Margin
                  </div>
                </td>

                {/* Tech Stack */}
                <td className="max-w-45 px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.techStack.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-slate-200/60 bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                    {item.techStack.length > 2 && (
                      <span className="rounded-md bg-slate-100 px-1 py-0.5 text-[9px] font-bold text-slate-500">
                        +{item.techStack.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Architect */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="font-bold text-slate-800">
                    {item.solutionArchitect?.name || "Architect"}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {item.solutionArchitect?.role || "Solutions"}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenCalculator(item)}
                      title="Effort Calculator"
                      className="cursor-pointer rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 shadow-2xs hover:bg-slate-50"
                    >
                      <Calculator className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onViewDetails(item)}
                      title="View Details & Specs"
                      className="flex cursor-pointer items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-2xs hover:bg-indigo-600"
                    >
                      <span>Specs</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>

                    {item.stage === "Approved" ? (
                      <button
                        type="button"
                        onClick={() => onHandoffToProject(item)}
                        title="Handoff to Project"
                        className="cursor-pointer rounded-lg bg-teal-50 p-1.5 text-teal-700 hover:bg-teal-100"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAdvanceStage(item)}
                        title="Advance Stage"
                        className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
