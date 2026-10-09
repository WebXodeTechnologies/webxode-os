"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { LifeBuoy, Clock, CheckCircle2, AlertTriangle, Plus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [filterTab, setFilterTab] = useState<"All" | "Urgent" | "Open" | "Resolved">("All");

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

  const filteredTickets = tickets.filter((t) => {
    if (filterTab === "Urgent") return t.priority === "Urgent" && t.status !== "Resolved";
    if (filterTab === "Open") return t.status !== "Resolved";
    if (filterTab === "Resolved") return t.status === "Resolved";
    return true;
  });

  const openCount = tickets.filter((t) => t.status !== "Resolved").length;

  return (
    <WidgetCard>
      <WidgetHeader
        title="Client Support & SLA Manager"
        subtitle="Open support requests, incident logs, and SLA countdowns"
        badge={`${openCount} Open Tickets`}
        badgeVariant="danger"
        actions={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-rose-700 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Ticket</span>
          </button>
        }
      />

      {/* Filter Tabs Toolbar */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-bold">
          {(["All", "Open", "Urgent", "Resolved"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`rounded-lg px-3 py-1 transition ${
                filterTab === tab
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-semibold text-slate-400">
          Showing {filteredTickets.length} items
        </span>
      </div>

      {/* Ticket List Container */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, idx) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
                className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono font-extrabold text-slate-900 shadow-2xs">
                      {ticket.ticketNo}
                    </span>
                    <span className="font-bold text-slate-700">{ticket.client}</span>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold ${priorityBadges[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-bold text-slate-900 sm:text-sm">{ticket.issue}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3 text-xs">
                  <div className="flex flex-col items-end">
                    <span
                      className={`font-extrabold ${ticket.status === "Resolved" ? "text-emerald-600" : "flex items-center gap-1 text-rose-600"}`}
                    >
                      {ticket.status !== "Resolved" && (
                        <AlertTriangle className="h-3 w-3 animate-pulse" />
                      )}
                      {ticket.slaCountdown}
                    </span>
                  </div>

                  {ticket.status !== "Resolved" ? (
                    <button
                      type="button"
                      onClick={() => handleResolve(ticket.id)}
                      className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-2xs transition hover:bg-emerald-600 active:scale-95"
                    >
                      <span>Resolve</span>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Resolved
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs font-semibold text-slate-400"
            >
              <CheckCircle2 className="mb-2 h-8 w-8 text-emerald-500" />
              <p>No support tickets found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WidgetCard>
  );
}
