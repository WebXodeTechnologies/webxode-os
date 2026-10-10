"use client";

import React from "react";
import toast from "react-hot-toast";
import {
  Search,
  Users,
  Filter,
  PhoneCall,
  Mail,
  MessageSquare,
  Video,
  TrendingUp,
  X,
  Sparkles,
} from "lucide-react";
import { ActivityFilterState, ActionType, MOCK_SALES_REPS } from "./types";

interface ActivityFilterToolbarProps {
  filters: ActivityFilterState;
  onFilterChange: (newFilters: ActivityFilterState) => void;
  onResetFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export const ActivityFilterToolbar: React.FC<ActivityFilterToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount,
  totalCount,
}) => {
  const actionTypes: { id: string; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "all", label: "All Actions", icon: Filter },
    { id: "Call", label: "Call Logs", icon: PhoneCall },
    { id: "Mail", label: "Emails", icon: Mail },
    { id: "WhatsApp", label: "WhatsApp", icon: MessageSquare },
    { id: "Demo", label: "Demos", icon: Video },
    { id: "Stage Change", label: "Stage Updates", icon: TrendingUp },
  ];

  const handleRepChange = (repId: string) => {
    const updated = { ...filters, repId };
    onFilterChange(updated);
    const repName = MOCK_SALES_REPS.find((r) => r.id === repId)?.name || "All Reps";
    toast.success(`Filtered by: ${repName}`, {
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "700",
      },
    });
  };

  const handleActionTypeChange = (actionType: string) => {
    const updated = { ...filters, actionType };
    onFilterChange(updated);
    toast.success(`Action Filter: ${actionType === "all" ? "All Types" : actionType}`, {
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "700",
      },
    });
  };

  const hasActiveFilters =
    filters.repId !== "all" || filters.actionType !== "all" || filters.searchQuery !== "";

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
      <div className="flex flex-col gap-4">
        {/* Top Controls Row */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {/* Left: Rep Selector Dropdown & Counter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-black tracking-wider text-slate-700 uppercase">
              <Filter className="h-4 w-4 text-indigo-600" />
              <span>Audit Controls</span>
            </div>

            {/* Rep Selector Dropdown */}
            <div className="relative">
              <select
                value={filters.repId}
                onChange={(e) => handleRepChange(e.target.value)}
                className="appearance-none rounded-2xl border border-slate-200 bg-slate-50/90 py-2 pr-9 pl-3.5 text-xs font-extrabold text-slate-800 shadow-2xs transition-colors hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
              >
                {MOCK_SALES_REPS.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Filter Count Badge */}
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
              Showing {filteredCount} of {totalCount} Logs
            </span>
          </div>

          {/* Right: Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client, rep, title, or city..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/90 py-2.5 pr-4 pl-10 text-xs font-semibold text-slate-800 placeholder-slate-400 shadow-2xs transition-all focus:border-indigo-500 focus:bg-white focus:outline-hidden"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: "" })}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Type Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex scrollbar-none flex-wrap gap-2 overflow-x-auto">
            {actionTypes.map((tab) => {
              const Icon = tab.icon;
              const isActive = filters.actionType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleActionTypeChange(tab.id)}
                  className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-extrabold transition-all active:scale-95 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/90 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-black text-rose-600 hover:underline"
            >
              <X className="h-3.5 w-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
