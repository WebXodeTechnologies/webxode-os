"use client";

import React from "react";
import Image from "next/image";
import { Search, X, Briefcase, Tag } from "lucide-react";
import { Developer } from "@/modules/tasks/task.types";

interface TaskFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDeveloperId: string;
  onSelectDeveloper: (id: string) => void;
  developers: Developer[];
  selectedTeam: string;
  onSelectTeam: (team: string) => void;
  teams: string[];
  selectedPriority: string;
  onSelectPriority: (priority: string) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
  selectedProject: string;
  onSelectProject: (proj: string) => void;
  projects: string[];
  onResetFilters: () => void;
  activeFilterCount: number;
}

export function TaskFilterBar({
  searchQuery,
  onSearchChange,
  selectedDeveloperId,
  onSelectDeveloper,
  developers,
  selectedTeam,
  onSelectTeam,
  teams,
  selectedPriority,
  onSelectPriority,
  selectedType,
  onSelectType,
  selectedProject,
  onSelectProject,
  projects,
  onResetFilters,
  activeFilterCount,
}: TaskFilterBarProps) {
  const priorities: { label: string; value: string; color?: string }[] = [
    { label: "All Priority", value: "All" },
    { label: "Critical", value: "critical", color: "text-rose-600" },
    { label: "High", value: "high", color: "text-amber-600" },
    { label: "Medium", value: "medium", color: "text-sky-600" },
    { label: "Low", value: "low", color: "text-slate-600" },
  ];

  const types: { label: string; value: string }[] = [
    { label: "All Types", value: "All" },
    { label: "Feature", value: "feature" },
    { label: "Bug", value: "bug" },
    { label: "Security", value: "security" },
    { label: "DevOps", value: "devops" },
    { label: "Design", value: "design" },
    { label: "Refactor", value: "refactor" },
  ];

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-2xs sm:p-5">
      {/* Top Row: Search & Dropdowns */}
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search deliverables by code, title, client, or tag (e.g. 'WX-201', 'OAuth', 'Redis')..."
            className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/80 py-2.5 pr-9 pl-10 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns (Team & Project) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Squad / Team Selector */}
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-slate-50/80 px-3.5 py-2 text-sm">
            <Briefcase className="h-4 w-4 shrink-0 text-slate-400" />
            <select
              value={selectedTeam}
              onChange={(e) => onSelectTeam(e.target.value)}
              className="cursor-pointer bg-transparent text-xs font-bold text-slate-800 focus:outline-none sm:text-sm"
            >
              <option value="All">All Squads & Teams</option>
              {teams.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Project Selector */}
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-slate-50/80 px-3.5 py-2 text-sm">
            <Tag className="h-4 w-4 shrink-0 text-slate-400" />
            <select
              value={selectedProject}
              onChange={(e) => onSelectProject(e.target.value)}
              className="cursor-pointer bg-transparent text-xs font-bold text-slate-800 focus:outline-none sm:text-sm"
            >
              <option value="All">All Client Projects</option>
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100 sm:text-sm"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Developer Avatars & Priority/Type Pills */}
      <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-3.5 xl:flex-row xl:items-center xl:justify-between">
        {/* Developer Facepile Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-black tracking-wider text-slate-400 uppercase">
            Engineer:
          </span>

          <button
            type="button"
            onClick={() => onSelectDeveloper("All")}
            className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
              selectedDeveloperId === "All"
                ? "bg-slate-900 text-white shadow-2xs"
                : "border border-slate-200/90 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            All Engineers
          </button>

          <div className="flex items-center -space-x-1 overflow-x-auto pb-1 sm:space-x-2 sm:overflow-visible sm:pb-0">
            {developers.map((dev) => {
              const isSelected = selectedDeveloperId === dev.id;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => onSelectDeveloper(isSelected ? "All" : dev.id)}
                  title={`${dev.name} (${dev.role}) - ${dev.currentPoints} pts`}
                  className={`group relative flex items-center gap-2 rounded-full p-1 text-xs transition-all sm:rounded-2xl sm:px-2.5 sm:py-1.5 sm:text-sm ${
                    isSelected
                      ? "border-2 border-indigo-600 bg-indigo-50 shadow-2xs"
                      : "border border-slate-200/90 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={dev.avatar}
                      alt={dev.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <span
                      className={`absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                        dev.status === "active"
                          ? "bg-emerald-500"
                          : dev.status === "reviewing"
                            ? "bg-indigo-500"
                            : dev.status === "in-meeting"
                              ? "bg-amber-500"
                              : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <span
                    className={`hidden font-bold sm:inline ${
                      isSelected ? "text-indigo-900" : "text-slate-800"
                    }`}
                  >
                    {dev.name.split(" ")[0]}
                  </span>
                  <span className="hidden rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-600 md:inline">
                    {dev.currentPoints}pt
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Priority & Type Quick Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Priority pills */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-slate-50 p-1">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => onSelectPriority(p.value)}
                className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all sm:text-sm ${
                  selectedPriority === p.value
                    ? "border border-slate-200/90 bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Type dropdown */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-slate-50 p-1">
            <select
              value={selectedType}
              onChange={(e) => onSelectType(e.target.value)}
              className="cursor-pointer bg-transparent px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none sm:text-sm"
            >
              {types.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
