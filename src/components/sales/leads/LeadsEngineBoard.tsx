"use client";

import React from "react";
import { Plus, Search, Filter, Phone, Mail, Calendar, ArrowUpRight } from "lucide-react";
import { LeadItem } from "../LeadCard";

interface LeadsEngineBoardProps {
  leads: LeadItem[];
  onEditLead: (lead: LeadItem) => void;
  onUpdateStage: (leadId: string, newStage: string) => void;
}

const STAGES = ["Enquiry", "Qualified", "Unqualified", "Proposal", "Closed for Demo", "Lost/Dead"];

const stageColors: Record<string, string> = {
  Enquiry: "bg-slate-100 border-slate-200 text-slate-800",
  Qualified: "bg-indigo-50 border-indigo-200 text-indigo-800",
  Unqualified: "bg-amber-50 border-amber-200 text-amber-800",
  Proposal: "bg-purple-50 border-purple-200 text-purple-800",
  "Closed for Demo": "bg-emerald-50 border-emerald-200 text-emerald-800",
  "Lost/Dead": "bg-rose-50 border-rose-200 text-rose-800",
};

export function LeadsEngineBoard({ leads, onEditLead, onUpdateStage }: LeadsEngineBoardProps) {
  return (
    <div className="flex snap-x scrollbar-thin scrollbar-thumb-slate-200 gap-4 overflow-x-auto pb-6">
      {STAGES.map((stage) => {
        const stageLeads = leads.filter((l) => l.stage === stage);

        return (
          <div
            key={stage}
            className="flex h-[calc(100vh-280px)] w-[320px] shrink-0 snap-center flex-col"
          >
            <div
              className={`mb-3 flex items-center justify-between rounded-2xl border px-4 py-3 ${stageColors[stage]}`}
            >
              <h3 className="text-sm font-black tracking-wider uppercase">{stage}</h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60 text-xs font-black shadow-sm">
                {stageLeads.length}
              </span>
            </div>

            <div className="flex-1 scrollbar-thin scrollbar-thumb-slate-200 space-y-3 overflow-y-auto pr-2">
              {stageLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="group cursor-pointer rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md"
                  onClick={() => onEditLead(lead)}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-black text-slate-900">{lead.companyName}</h4>
                      <p className="mt-0.5 text-xs font-bold text-indigo-600">
                        {lead.contactPerson}
                      </p>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-indigo-50 hover:text-indigo-600">
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="text-xs">
                      <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                        Value
                      </span>
                      <p className="font-black text-slate-900">
                        ₹{lead.value.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {lead.demoStatus === "Scheduled" && (
                      <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                        <Calendar className="h-3 w-3" />
                        <span>Demo Booked</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {stageLeads.length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                  <p className="text-xs font-bold text-slate-400">No leads in {stage}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
