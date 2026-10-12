"use client";

import React from "react";
import { Search, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { PresalesStage } from "@/modules/presales/presales.types";

interface PresalesSearchFilterProps {
  activeStage: PresalesStage;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount: number;
  totalCount: number;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
}

export function PresalesSearchFilter({
  activeStage,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
  selectedPriority,
  onPriorityChange,
  viewMode,
  onViewModeChange,
}: PresalesSearchFilterProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
      {/* Search Bar */}
      <div className="relative max-w-lg flex-1">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by client, service (Web, App, SaaS, Marketing), demo platform (Teams, Meet)..."
          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pr-10 pl-11 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Right Controls: Priority, Count & View Switcher */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-1">
          {["All", "Critical", "High", "Medium"].map((p) => {
            const isSelected = selectedPriority === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPriorityChange(p)}
                className={`cursor-pointer rounded-xl px-2.5 py-1 text-[11px] font-bold transition-all ${
                  isSelected
                    ? "bg-white font-extrabold text-indigo-700 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* View Switcher: Grid vs Table */}
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50/70 p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            title="Grid View"
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl transition-all ${
              viewMode === "grid"
                ? "bg-white text-indigo-600 shadow-2xs"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            title="Table View"
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl transition-all ${
              viewMode === "table"
                ? "bg-white text-indigo-600 shadow-2xs"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Result Counter Badge */}
        <div className="hidden items-center gap-1.5 rounded-2xl bg-indigo-50/60 px-3 py-1.5 text-xs font-bold text-indigo-700 xl:flex">
          <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-500" />
          <span>
            {filteredCount} of {totalCount} records
          </span>
        </div>
      </div>
    </div>
  );
}
