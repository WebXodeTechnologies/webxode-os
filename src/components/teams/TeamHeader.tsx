"use client";

import { Users, Search, Filter } from "lucide-react";

interface TeamHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  totalMembers: number;
}

export default function TeamHeader({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  totalMembers,
}: TeamHeaderProps) {
  const departments = [
    "All Departments",
    "Executive & Engineering",
    "Engineering",
    "Cloud Operations",
    "Sales & Marketing",
  ];

  return (
    <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-slate-200/80 bg-white/80 px-8 py-5 shadow-xs backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-slate-900">
              Company Team Directory
            </h1>
            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600">
              {totalMembers} Active
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Manage personnel roster, track operational availability, and dispatch secure
            communications
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
        {/* Department Filter Pills */}
        <div className="relative">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pr-10 pl-4 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus:border-indigo-500 focus:bg-white focus:outline-none sm:w-auto"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <Filter className="pointer-events-none absolute top-3 right-3.5 h-3.5 w-3.5 text-slate-400" />
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute top-3 left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pr-4 pl-10 text-xs text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}
