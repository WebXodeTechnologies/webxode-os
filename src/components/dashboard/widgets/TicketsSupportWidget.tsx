"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { LifeBuoy, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

interface TicketItem {
  id: string;
  ticketNo: string;
  client: string;
  issue: string;
  priority: "Urgent" | "High" | "Medium";
  status: "Open" | "In Progress" | "Resolved";
  slaCountdown: string;
}

export function TicketsSupportWidget() {
  const [tickets, setTickets] = useState<TicketItem[]>([
    {
      id: "1",
      ticketNo: "TICK-802",
      client: "Aishwarya Handicrafts",
      issue: "Payment gateway webhook timeout error",
      priority: "Urgent",
      status: "In Progress",
      slaCountdown: "18m SLA left",
    },
    {
      id: "2",
      ticketNo: "TICK-801",
      client: "Visual Bridge Foundation",
      issue: "SSL certificate renewal & domain setup",
      priority: "High",
      status: "Open",
      slaCountdown: "1h 40m SLA left",
    },
    {
      id: "3",
      ticketNo: "TICK-799",
      client: "Annai Agro Traders",
      issue: "CSV export column alignment request",
      priority: "Medium",
      status: "Resolved",
      slaCountdown: "Resolved",
    },
  ]);

  const priorityBadges = {
    Urgent: "bg-rose-50 text-rose-700 border-rose-200",
    High: "bg-amber-50 text-amber-700 border-amber-200",
    Medium: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  const handleResolve = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Resolved", slaCountdown: "Resolved" } : t))
    );
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Client Support Tickets & SLA Manager"
        subtitle="Open support requests, client incident logs, and SLA countdowns"
        badge={`${tickets.filter((t) => t.status !== "Resolved").length} Open Tickets`}
        badgeVariant="danger"
      />

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:border-slate-200 hover:bg-white"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-slate-900">{ticket.ticketNo}</span>
                <span>•</span>
                <span className="font-bold text-slate-600">{ticket.client}</span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${priorityBadges[ticket.priority]}`}
                >
                  {ticket.priority}
                </span>
              </div>

              <p className="mt-1 truncate text-xs font-bold text-slate-900 sm:text-sm">
                {ticket.issue}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 text-xs">
              <span className="font-bold text-rose-600">{ticket.slaCountdown}</span>
              {ticket.status !== "Resolved" ? (
                <button
                  type="button"
                  onClick={() => handleResolve(ticket.id)}
                  className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white transition hover:bg-emerald-600 active:scale-95"
                >
                  Resolve
                </button>
              ) : (
                <span className="font-bold text-emerald-600">Done</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
