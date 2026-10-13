"use client";

import { Search, Filter, LayoutGrid, Table2, TicketPercent, TrendingUp } from "lucide-react";
import { Ticket } from "./TicketCard";

interface TicketHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPriority: string;
  setSelectedPriority: (p: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  selectedType: string;
  setSelectedType: (t: string) => void;
  viewMode: "card" | "table";
  setViewMode: (v: "card" | "table") => void;
  onRaiseTicket: () => void;
  stats: {
    total: number;
    open: number;
    inProgress: number;
    waiting: number;
    resolved: number;
  };
}

export default function TicketHeader({
  searchQuery,
  setSearchQuery,
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  viewMode,
  setViewMode,
  onRaiseTicket,
  stats,
}: TicketHeaderProps) {
  const priorities = ["All Priorities", "P0 - Critical", "P1 - High", "P2 - Normal", "P3 - Low"];
  const statuses = ["All Statuses", "Open", "In Progress", "Waiting on Client", "Resolved"];
  const types = [
    "All Types",
    "Bug",
    "Feature Request",
    "Performance",
    "Integration",
    "Design",
    "Sales",
  ];

  const statPills = [
    { label: "Total", value: stats.total, color: "border-slate-200 bg-white text-slate-700" },
    { label: "Open", value: stats.open, color: "border-rose-200 bg-rose-50 text-rose-700" },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "border-indigo-200 bg-indigo-50 text-indigo-700",
    },
    {
      label: "Waiting",
      value: stats.waiting,
      color: "border-amber-200 bg-amber-50 text-amber-700",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      color: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs">
      {/* ── Top Row: Title + CTA ─────────────────── */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/25">
            <TicketPercent className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900">
              Client Tickets & Issue Tracker
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
              Raise &amp; manage client issues across Engineering, Design, PM, Sales &amp; Presales
            </p>
          </div>
        </div>

        <button
          id="raise-ticket-btn"
          onClick={onRaiseTicket}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-500 active:scale-[0.98]"
        >
          <TrendingUp className="h-4 w-4" />
          Raise Ticket
        </button>
      </div>

      {/* ── Stat Pills ───────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-100 px-6 py-3.5">
        {statPills.map((s) => (
          <div
            key={s.label}
            className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 ${s.color}`}
          >
            <span className="text-sm font-bold">{s.value}</span>
            <span className="text-xs">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filters Row ──────────────────────────── */}
      <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-3 left-3.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets, clients, or IDs…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-xs text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority filter */}
          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pr-8 pl-3.5 text-xs font-medium text-slate-700 transition focus:border-indigo-400 focus:outline-none"
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <Filter className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pr-8 pl-3.5 text-xs font-medium text-slate-700 transition focus:border-indigo-400 focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <Filter className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Type filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pr-8 pl-3.5 text-xs font-medium text-slate-700 transition focus:border-indigo-400 focus:outline-none"
            >
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <Filter className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setViewMode("card")}
              title="Card view"
              className={`flex items-center justify-center rounded-lg p-1.5 transition ${
                viewMode === "card"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              title="Table view"
              className={`flex items-center justify-center rounded-lg p-1.5 transition ${
                viewMode === "table"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Table2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
