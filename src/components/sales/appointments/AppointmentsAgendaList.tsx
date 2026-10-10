"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  Video,
  PhoneCall,
  FileCheck,
  CheckCircle2,
  MoreVertical,
  Building2,
  User,
  ArrowUpRight,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { AppointmentEvent } from "./AppointmentsCalendarView";

interface AppointmentsAgendaListProps {
  events: AppointmentEvent[];
  onSelectEvent: (event: AppointmentEvent) => void;
  onToggleStatus: (id: string) => void;
  onDeleteEvent: (id: string) => void;
  onBookAppointment: () => void;
}

export function AppointmentsAgendaList({
  events,
  onSelectEvent,
  onToggleStatus,
  onDeleteEvent,
  onBookAppointment,
}: AppointmentsAgendaListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Scheduled" && evt.status === "Scheduled") ||
      (statusFilter === "Completed" && evt.status === "Completed");

    const matchesType = typeFilter === "All" || evt.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getEventBadge = (type: AppointmentEvent["type"]) => {
    switch (type) {
      case "Product Demo":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700">
            <Video className="h-3 w-3" /> Demo
          </span>
        );
      case "Discovery Call":
      case "Follow-up Call":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
            <PhoneCall className="h-3 w-3" /> Call
          </span>
        );
      case "Contract Review":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
            <FileCheck className="h-3 w-3" /> Contract Review
          </span>
        );
      case "Reminder":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
            <Clock className="h-3 w-3" /> Reminder
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center">
        {/* Search */}
        <div className="relative min-w-65 flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search appointments by title, client, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-1">
            <span className="px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Type:
            </span>
            {["All", "Product Demo", "Discovery Call", "Contract Review", "Reminder"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  typeFilter === t
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-1">
            <span className="px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Status:
            </span>
            {["All", "Scheduled", "Completed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  statusFilter === st
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Agenda Items List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white py-12 text-center shadow-xs">
            <Calendar className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm font-bold text-slate-700">No events found</p>
            <p className="text-xs text-slate-400">
              Try adjusting your filters or book a new event.
            </p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={{ y: -1 }}
              className={`flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all md:flex-row md:items-center ${
                evt.status === "Completed" ? "bg-slate-50/50 opacity-75" : ""
              }`}
            >
              {/* Event & Client Details */}
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  onClick={() => onToggleStatus(evt.id)}
                  className={`mt-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-all ${
                    evt.status === "Completed"
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-300 bg-white hover:border-indigo-600"
                  }`}
                >
                  {evt.status === "Completed" && <CheckCircle2 className="h-4 w-4" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => onSelectEvent(evt)}
                      className={`cursor-pointer font-black text-slate-900 hover:text-indigo-600 ${
                        evt.status === "Completed" ? "text-slate-400 line-through" : ""
                      }`}
                    >
                      {evt.title}
                    </span>
                    {getEventBadge(evt.type)}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      {evt.clientName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      {evt.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-bold text-indigo-600">
                      <Clock className="h-3.5 w-3.5" />
                      {evt.date} at {evt.time} ({evt.duration})
                    </span>
                  </div>

                  {evt.notes && (
                    <p className="line-clamp-1 text-xs font-medium text-slate-500">
                      Note: {evt.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center">
                {evt.meetingUrl && evt.status !== "Completed" && (
                  <a
                    href={evt.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-indigo-700"
                  >
                    <Video className="h-3.5 w-3.5" /> Join Meeting
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onSelectEvent(evt)}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100"
                >
                  View Details
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteEvent(evt.id)}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
