"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Plus,
  Video,
  PhoneCall,
  Clock,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users,
  Grid,
  List,
  Sparkles,
} from "lucide-react";

export interface ClientOption {
  id: string;
  name: string;
  company: string;
}

interface AppointmentsHeaderProps {
  clients: ClientOption[];
  selectedClientId: string;
  onSelectClient: (id: string) => void;
  viewMode: "month" | "agenda";
  onToggleViewMode: (mode: "month" | "agenda") => void;
  currentDateText: string;
  onPrevDate: () => void;
  onNextDate: () => void;
  onToday: () => void;
  onBookAppointment: () => void;
  onQuickLogEvent: () => void;
  stats: {
    totalThisMonth: number;
    upcomingCalls: number;
    demosScheduled: number;
    remindersCount: number;
  };
}

export function AppointmentsHeader({
  clients,
  selectedClientId,
  onSelectClient,
  viewMode,
  onToggleViewMode,
  currentDateText,
  onPrevDate,
  onNextDate,
  onToday,
  onBookAppointment,
  onQuickLogEvent,
  stats,
}: AppointmentsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs md:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          {/* Title & Icon */}
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 to-purple-100 text-indigo-600 shadow-2xs">
              <CalendarIcon className="h-6.5 w-6.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  Client Appointments & Meetings
                </h1>
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide text-indigo-700 uppercase">
                  Sales Calendar
                </span>
              </div>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                Book client calls, schedule product demos, log meeting notes & track client
                reminders
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onBookAppointment}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-98"
            >
              <Plus className="h-4 w-4" /> Book Appointment
            </button>
            <button
              type="button"
              onClick={onQuickLogEvent}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-2xs transition-all hover:bg-indigo-600 hover:text-white"
            >
              <Video className="h-4 w-4" /> Log Call / Meeting
            </button>
          </div>
        </div>

        {/* Filter Controls & Date Navigation Bar */}
        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 md:flex-row md:items-center">
          {/* Client Filter Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-bold text-slate-700">
              <Users className="h-4 w-4 text-slate-400" />
              <span>Filter Client:</span>
            </div>
            <select
              value={selectedClientId}
              onChange={(e) => onSelectClient(e.target.value)}
              className="min-w-55 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs outline-none focus:border-indigo-600"
            >
              <option value="all">All Clients (Show Full Schedule)</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.company}
                </option>
              ))}
            </select>
          </div>

          {/* Date Nav Controls & View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Calendar Month Controls */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-1">
              <button
                type="button"
                onClick={onPrevDate}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-white text-slate-600 shadow-2xs transition-all hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="min-w-36 px-3 text-center text-xs font-black text-slate-800">
                {currentDateText}
              </span>

              <button
                type="button"
                onClick={onNextDate}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-white text-slate-600 shadow-2xs transition-all hover:bg-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onToday}
                className="ml-1 cursor-pointer rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-100"
              >
                Today
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/70 p-1">
              <button
                type="button"
                onClick={() => onToggleViewMode("month")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === "month"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Grid className="h-3.5 w-3.5" /> Calendar
              </button>
              <button
                type="button"
                onClick={() => onToggleViewMode("agenda")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === "agenda"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <List className="h-3.5 w-3.5" /> Agenda List
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950">Total This Month</span>
              <CalendarIcon className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-indigo-700">{stats.totalThisMonth}</div>
            <div className="mt-1 text-[11px] font-semibold text-indigo-600">
              Client events booked
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-950">Upcoming Calls</span>
              <PhoneCall className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-blue-700">{stats.upcomingCalls}</div>
            <div className="mt-1 text-[11px] font-semibold text-blue-600">
              Scheduled phone syncs
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-950">Product Demos</span>
              <Video className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-purple-700">{stats.demosScheduled}</div>
            <div className="mt-1 text-[11px] font-semibold text-purple-600">Live demo sessions</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 transition-all hover:bg-white hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950">Active Reminders</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-amber-700">{stats.remindersCount}</div>
            <div className="mt-1 text-[11px] font-semibold text-amber-600">
              Contract & task alerts
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
