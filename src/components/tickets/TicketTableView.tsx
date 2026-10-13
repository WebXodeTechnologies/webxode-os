"use client";

import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Ticket, priorityConfig, statusConfig, typeConfig } from "./TicketCard";

interface TicketTableViewProps {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  onSelect: (ticket: Ticket) => void;
}

export default function TicketTableView({
  tickets,
  selectedTicket,
  onSelect,
}: TicketTableViewProps) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
          🎫
        </div>
        <h3 className="mb-1.5 text-sm font-bold text-slate-800">No tickets match your filters</h3>
        <p className="max-w-xs text-xs text-slate-500">
          Try changing the priority, status, or type filters, or search for a different term.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              {[
                "Ticket ID",
                "Title",
                "Client",
                "Type",
                "Priority",
                "Status",
                "Assignee",
                "Created",
                "",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
                >
                  <div className="flex items-center gap-1">
                    {col}
                    {col && col !== "" && <ArrowUpDown className="h-2.5 w-2.5 text-slate-300" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => {
              const pConfig = priorityConfig[ticket.priority];
              const sConfig = statusConfig[ticket.status];
              const tConfig = typeConfig[ticket.type];
              const isSelected = selectedTicket?.id === ticket.id;
              const initials = ticket.assignee
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);

              return (
                <tr
                  key={ticket.id}
                  onClick={() => onSelect(ticket)}
                  className={`group cursor-pointer transition-colors ${
                    isSelected ? "bg-indigo-50/60" : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Ticket ID */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-1 shrink-0 rounded-full ${pConfig.dot}`} />
                      <span className="font-mono text-xs font-bold text-indigo-600">
                        {ticket.ticketCode}
                      </span>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="max-w-60 px-4 py-3.5">
                    <p className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
                      {ticket.title}
                    </p>
                    {ticket.description && (
                      <p className="mt-0.5 truncate text-[11px] text-slate-400">
                        {ticket.description}
                      </p>
                    )}
                  </td>

                  {/* Client */}
                  <td className="px-4 py-3.5">
                    <span className="block max-w-30 truncate text-xs font-medium text-slate-600">
                      {ticket.clientName}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tConfig.badge}`}
                    >
                      {tConfig.icon} {ticket.type}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${pConfig.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${pConfig.dot}`} />
                      {pConfig.label}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${sConfig.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${sConfig.dot}`} />
                      {sConfig.label}
                    </span>
                  </td>

                  {/* Assignee */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[9px] font-bold text-white">
                        {initials}
                      </div>
                      <span className="text-xs font-medium whitespace-nowrap text-slate-600">
                        {ticket.assignee}
                      </span>
                    </div>
                  </td>

                  {/* Created */}
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[11px] text-slate-400">{ticket.createdAt}</span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(ticket);
                      }}
                      className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-700">{tickets.length}</span> ticket
          {tickets.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
