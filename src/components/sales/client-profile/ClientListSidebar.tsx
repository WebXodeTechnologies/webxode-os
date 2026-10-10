"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";

export function ClientListSidebar({ activeLeadId }: { activeLeadId?: string }) {
  const router = useRouter();
  // Dummy lead data matching our pipeline
  const leads = [
    { id: "LEAD-1001", name: "Acme Corp Enterprise", source: "Inbound" },
    { id: "LEAD-1002", name: "Stark Industries", source: "Referral" },
    { id: "LEAD-1003", name: "Wayne Enterprises", source: "Website" },
    { id: "LEAD-1004", name: "Globex Corporation", source: "Cold Call" },
    { id: "LEAD-1005", name: "Soylent Corp", source: "Trade Show" },
    { id: "LEAD-1006", name: "Initech", source: "Inbound" },
    { id: "LEAD-1007", name: "Umbrella Corp", source: "Referral" },
  ];

  const getSourceColor = (source: string) => {
    switch (source) {
      case "Inbound":
        return "bg-purple-100 text-purple-700";
      case "Referral":
        return "bg-teal-100 text-teal-700";
      case "Website":
        return "bg-blue-100 text-blue-700";
      case "Cold Call":
        return "bg-amber-100 text-amber-700";
      case "Trade Show":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="flex h-full w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="space-y-4 border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-700 transition hover:text-indigo-600">
            <ChevronLeft className="h-4 w-4" /> All Leads
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
            <Plus className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border border-slate-200 py-2 pr-4 pl-9 text-sm transition outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex-1 scrollbar-thin scrollbar-thumb-slate-200 overflow-y-auto">
        {leads.map((c, i) => {
          const isActive = c.id === activeLeadId;
          return (
            <button
              key={i}
              onClick={() => router.push(`/dashboard/sales/leads/${c.id}`)}
              className={`w-full border-b border-slate-50 p-4 text-left transition ${isActive ? "bg-indigo-500 text-white" : "hover:bg-slate-50"}`}
            >
              <div className={`text-sm font-bold ${isActive ? "text-white" : "text-slate-800"}`}>
                {c.name}
              </div>
              <div
                className={`mt-1.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : getSourceColor(c.source)}`}
              >
                {c.source}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 border-t border-slate-200 p-3 text-slate-400">
        <button className="hover:text-slate-600">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-bold text-slate-600">1</span>
        <button className="hover:text-slate-600">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
