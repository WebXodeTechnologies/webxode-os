import React from "react";
import { FileText, Plus, Search, Filter } from "lucide-react";

export default function EstimatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Estimates & Proposals
          </h1>
          <p className="text-xs text-slate-500">
            Manage client proposals, quotes, and contract estimates.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          <span>New Proposal</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search proposals by client or title..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-9 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Estimates & Proposals Dashboard</h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
            Create, send, and track client estimates and formal Statements of Work.
          </p>
        </div>
      </div>
    </div>
  );
}
