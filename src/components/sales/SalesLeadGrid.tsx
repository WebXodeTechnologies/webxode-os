"use client";

import React, { useState } from "react";
import { Users, LayoutGrid, List, ChevronRight, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LeadCard, LeadItem } from "./LeadCard";
import Link from "next/link";

interface SalesLeadGridProps {
  leads: LeadItem[];
  onHandover: (leadId: string) => void;
}

const stageBadgeColors: Record<string, string> = {
  Enquiry: "bg-slate-100 text-slate-700 border-slate-200",
  "Calling / Contacting": "bg-blue-50 text-blue-700 border-blue-200",
  Nurturing: "bg-purple-50 text-purple-700 border-purple-200",
  "Demo Booked": "bg-sky-50 text-sky-700 border-sky-200",
  "Presales Handover": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Lost / Dead": "bg-rose-50 text-rose-700 border-rose-200",
  Qualified: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Proposal: "bg-amber-50 text-amber-700 border-amber-200",
  Won: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Lost/Dead": "bg-rose-50 text-rose-700 border-rose-200",
};

export function SalesLeadGrid({ leads, onHandover }: SalesLeadGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white shadow-xs">
      {/* Unified Header inside the card */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <h3 className="text-sm font-black text-slate-900">
          Client Records <span className="ml-1 text-slate-400">({leads.length})</span>
        </h3>
        <div className="flex items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-50 p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center justify-center rounded-lg p-1.5 transition-colors ${
              viewMode === "table"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="List View"
          >
            <List className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center justify-center rounded-lg p-1.5 transition-colors ${
              viewMode === "grid"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {leads.length > 0 ? (
            viewMode === "grid" ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-5 lg:grid-cols-2"
              >
                {leads.map((lead, idx) => (
                  <LeadCard key={lead.id} lead={lead} index={idx} onHandover={onHandover} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="table-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-100 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                    <tr>
                      <th className="px-4 py-4 font-extrabold">Company</th>
                      <th className="px-4 py-4 font-extrabold">Contact Person</th>
                      <th className="px-4 py-4 font-extrabold">Stage</th>
                      <th className="px-4 py-4 font-extrabold">Value</th>
                      <th className="px-4 py-4 text-right font-extrabold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="group transition-colors hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{lead.companyName}</p>
                          <p className="font-mono text-[10px] font-semibold text-slate-400">
                            ID: {lead.id}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{lead.contactPerson}</p>
                              <p className="text-[10px] font-bold text-indigo-500">{lead.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-extrabold tracking-widest uppercase ${stageBadgeColors[lead.stage] || "border-slate-200 bg-slate-100 text-slate-700"}`}
                          >
                            {lead.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-black text-slate-900">
                            ₹{lead.value.toLocaleString("en-IN")}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {[
                              "Enquiry",
                              "Calling / Contacting",
                              "Nurturing",
                              "Demo Booked",
                              "Qualified",
                            ].includes(lead.stage) && (
                              <button
                                type="button"
                                onClick={() => onHandover(lead.id)}
                                className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-emerald-200/60 bg-emerald-50 px-3 text-[11px] font-bold text-emerald-600 transition hover:bg-emerald-100"
                                title="Presales Handover"
                              >
                                <Send className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Handover</span>
                              </button>
                            )}
                            <Link
                              href={`/dashboard/sales/leads/${lead.id}` as any}
                              className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
                              title="Manage Record"
                            >
                              <span className="hidden sm:inline">Manage</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-16 text-center text-xs font-semibold text-slate-400"
            >
              <Users className="mb-3 h-10 w-10 text-indigo-400" />
              <p className="text-sm font-bold text-slate-700">No client records found</p>
              <p className="mt-1 text-xs text-slate-400">
                Try switching your stage filter or clear search terms.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
