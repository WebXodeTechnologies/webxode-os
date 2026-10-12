"use client";

import React from "react";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Layers,
  ArrowUpDown,
  Download,
  RotateCcw,
} from "lucide-react";

interface ProjectSearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  onResetFilters: () => void;
  onExport: () => void;
}

export function ProjectSearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  onExport,
}: ProjectSearchFilterBarProps) {
  const serviceCategories = [
    { label: "All Service Categories", value: "All" },
    { label: "Web Apps & Platforms", value: "webdev" },
    { label: "Mobile (iOS & Android)", value: "mobile" },
    { label: "Cloud & DevOps IaC", value: "cloud_devops" },
    { label: "AI & Data Solutions", value: "ai_data" },
    { label: "UI/UX & Design Systems", value: "uiux" },
    { label: "Enterprise SaaS", value: "saas" },
    { label: "IT Consulting", value: "consulting" },
  ];

  const statuses = [
    { label: "All Health States", value: "All" },
    { label: "On Track", value: "On Track" },
    { label: "At Risk", value: "At Risk" },
    { label: "Delayed", value: "Delayed" },
    { label: "Completed", value: "Completed" },
  ];

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== "All" || selectedStatus !== "All";

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-2xs lg:flex-row lg:items-center lg:justify-between">
      {/* Left: Search input */}
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by project code, client, title, tech stack, or team lead..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-2.5 pr-4 pl-10 text-xs text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Right: Dropdowns and View toggles */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 focus:border-indigo-500 focus:outline-none"
          >
            {serviceCategories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Health Status Dropdown */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 focus:border-indigo-500 focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset button if filter active */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex cursor-pointer items-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50/60 px-3 py-2 text-xs font-bold text-rose-700 transition-all hover:bg-rose-100/60"
            title="Reset filters"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        )}

        {/* Export Dossier button */}
        <button
          type="button"
          onClick={onExport}
          className="flex cursor-pointer items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50"
          title="Export projects report"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Grid / Table Toggle */}
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-100/80 p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all ${
              viewMode === "grid"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all ${
              viewMode === "table"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Data Table View"
          >
            <List className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
