"use client";

import React from "react";
import { Search } from "lucide-react";

interface SalesSearchFilterProps {
  activeStage: string;
  filteredCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SalesSearchFilter({
  activeStage,
  filteredCount,
  searchQuery,
  onSearchChange,
}: SalesSearchFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
        <span>
          Active View: <strong className="text-indigo-600">{activeStage} Pipeline</strong>
        </span>
        <span className="text-slate-300">|</span>
        <span>Showing {filteredCount} records</span>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="absolute top-3 left-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search company name, contact person..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-indigo-500"
        />
      </div>
    </div>
  );
}
