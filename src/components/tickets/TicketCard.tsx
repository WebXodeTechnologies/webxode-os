"use client";

// ── Shared Ticket type exported for all ticket components ───────────────────
export interface Ticket {
  id: string;
  ticketCode: string;
  title: string;
  description: string;
  clientName: string;
  priority: "P0 - Critical" | "P1 - High" | "P2 - Normal" | "P3 - Low";
  status: "Open" | "In Progress" | "Waiting on Client" | "Resolved";
  type: "Bug" | "Feature Request" | "Performance" | "Integration" | "Design" | "Sales";
  assignee: string;
  assigneeDept: "Engineering" | "Design" | "PM" | "Sales" | "Presales";
  createdAt: string;
  dueDate?: string;
  slaHours: number;
}

export const priorityConfig = {
  "P0 - Critical": {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    bar: "bg-rose-500",
    leftBorder: "border-l-rose-500",
    glow: "shadow-rose-500/10",
    label: "Critical",
    short: "P0",
  },
  "P1 - High": {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    bar: "bg-amber-400",
    leftBorder: "border-l-amber-500",
    glow: "shadow-amber-500/10",
    label: "High",
    short: "P1",
  },
  "P2 - Normal": {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    bar: "bg-blue-400",
    leftBorder: "border-l-blue-400",
    glow: "",
    label: "Normal",
    short: "P2",
  },
  "P3 - Low": {
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
    bar: "bg-slate-300",
    leftBorder: "border-l-slate-300",
    glow: "",
    label: "Low",
    short: "P3",
  },
};

export const statusConfig = {
  Open: {
    badge: "bg-rose-50 text-rose-600 border-rose-200",
    dot: "bg-rose-500",
    label: "Open",
  },
  "In Progress": {
    badge: "bg-indigo-50 text-indigo-600 border-indigo-200",
    dot: "bg-indigo-500",
    label: "In Progress",
  },
  "Waiting on Client": {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    label: "Waiting",
  },
  Resolved: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    label: "Resolved",
  },
};

export const typeConfig: Record<Ticket["type"], { icon: string; badge: string }> = {
  Bug: { icon: "🐛", badge: "bg-rose-50 text-rose-600 border-rose-100" },
  "Feature Request": { icon: "✨", badge: "bg-purple-50 text-purple-600 border-purple-100" },
  Performance: { icon: "⚡", badge: "bg-amber-50 text-amber-700 border-amber-100" },
  Integration: { icon: "🔗", badge: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  Design: { icon: "🎨", badge: "bg-pink-50 text-pink-600 border-pink-100" },
  Sales: { icon: "💼", badge: "bg-emerald-50 text-emerald-700 border-emerald-100" },
};

// ── TicketCard Component ──────────────────────────────────────────────────────
interface TicketCardProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
  isSelected: boolean;
}

export default function TicketCard({ ticket, onSelect, isSelected }: TicketCardProps) {
  const pConfig = priorityConfig[ticket.priority];
  const sConfig = statusConfig[ticket.status];
  const tConfig = typeConfig[ticket.type];

  const initials = ticket.assignee
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      onClick={() => onSelect(ticket)}
      className={`group relative flex cursor-pointer flex-col rounded-2xl border border-l-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 ${
        isSelected
          ? `${pConfig.leftBorder} border-indigo-300 shadow-md ring-2 ring-indigo-400/20`
          : `${pConfig.leftBorder} border-slate-200 shadow-xs`
      }`}
    >
      {/* Card Body */}
      <div className="flex flex-col gap-3 p-4">
        {/* Top Row: Code + Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 font-mono text-xs font-bold text-indigo-600">
              {ticket.ticketCode}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${pConfig.badge}`}
            >
              {pConfig.short}
            </span>
          </div>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${sConfig.badge}`}
          >
            {sConfig.label}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="line-clamp-2 text-sm leading-snug font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
            {ticket.title}
          </h3>
          {ticket.description && (
            <p className="mt-1 line-clamp-1 text-xs text-slate-500">{ticket.description}</p>
          )}
        </div>

        {/* Type + Client */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tConfig.badge}`}
          >
            {tConfig.icon} {ticket.type}
          </span>
          <span className="truncate text-xs text-slate-500">📋 {ticket.clientName}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[9px] font-bold text-white">
            {initials}
          </div>
          <span className="truncate text-xs font-medium text-slate-600">{ticket.assignee}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {ticket.dueDate && (
            <span className="font-mono text-[10px] text-slate-400">📅 {ticket.dueDate}</span>
          )}
          <span className="font-mono text-[10px] text-slate-400">{ticket.createdAt}</span>
        </div>
      </div>
    </div>
  );
}
