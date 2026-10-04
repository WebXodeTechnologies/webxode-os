import React from "react";
import { Building2, Plus, Search, Filter } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Team Directory</h1>
          <p className="text-xs text-slate-500">Agency internal team members, roles, and departments.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search team members by name, role, or department..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-3">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Agency Team Roster</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Manage agency team members, permissions, and departmental assignments.
          </p>
        </div>
      </div>
    </div>
  );
}
