"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  PhoneCall,
  FileCheck,
  Clock,
  Plus,
  ChevronRight,
  User,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  ExternalLink,
} from "lucide-react";

export interface AppointmentEvent {
  id: string;
  clientId: string;
  clientName: string;
  company: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string; // e.g. "10:30 AM"
  duration: string;
  type: "Discovery Call" | "Product Demo" | "Contract Review" | "Reminder" | "Follow-up Call";
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  location: string; // e.g. "Google Meet" or "Phone Call"
  meetingUrl?: string;
  notes?: string;
  assignedRep: string;
}

interface AppointmentsCalendarViewProps {
  currentYear: number;
  currentMonth: number; // 0-indexed (0 = Jan, 9 = Oct)
  events: AppointmentEvent[];
  onSelectEvent: (event: AppointmentEvent) => void;
  onSelectDateToBook: (dateStr: string) => void;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function AppointmentsCalendarView({
  currentYear,
  currentMonth,
  events,
  onSelectEvent,
  onSelectDateToBook,
}: AppointmentsCalendarViewProps) {
  // Calendar grid calculations
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const todayStr = "2026-10-10";

  // Build calendar matrix (days array)
  const calendarCells = [];

  // Empty padding cells before 1st of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }

  // Active month days
  for (let day = 1; day <= daysInMonth; day++) {
    const monthFormatted = String(currentMonth + 1).padStart(2, "0");
    const dayFormatted = String(day).padStart(2, "0");
    const dateStr = `${currentYear}-${monthFormatted}-${dayFormatted}`;
    calendarCells.push({ day, dateStr });
  }

  const getEventTypeStyle = (type: AppointmentEvent["type"]) => {
    switch (type) {
      case "Product Demo":
        return "bg-purple-100/90 text-purple-800 border-purple-200 hover:bg-purple-200/90";
      case "Discovery Call":
        return "bg-indigo-100/90 text-indigo-800 border-indigo-200 hover:bg-indigo-200/90";
      case "Contract Review":
        return "bg-emerald-100/90 text-emerald-800 border-emerald-200 hover:bg-emerald-200/90";
      case "Follow-up Call":
        return "bg-blue-100/90 text-blue-800 border-blue-200 hover:bg-blue-200/90";
      case "Reminder":
        return "bg-amber-100/90 text-amber-900 border-amber-200 hover:bg-amber-200/90";
    }
  };

  const getEventIcon = (type: AppointmentEvent["type"]) => {
    switch (type) {
      case "Product Demo":
        return <Video className="h-3 w-3 shrink-0 text-purple-700" />;
      case "Discovery Call":
      case "Follow-up Call":
        return <PhoneCall className="h-3 w-3 shrink-0 text-blue-700" />;
      case "Contract Review":
        return <FileCheck className="h-3 w-3 shrink-0 text-emerald-700" />;
      case "Reminder":
        return <Clock className="h-3 w-3 shrink-0 text-amber-700" />;
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      {/* Calendar Header Row (Day names) */}
      <div className="grid grid-cols-7 border-b border-slate-200/80 bg-slate-50/70 text-center text-xs font-black tracking-wider text-slate-500 uppercase">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="py-3">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid Matrix */}
      <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 bg-slate-50/20">
        {calendarCells.map((cell, idx) => {
          if (!cell) {
            return (
              <div key={`empty-${idx}`} className="min-h-32 bg-slate-50/40 p-2 text-slate-300" />
            );
          }

          const isToday = cell.dateStr === todayStr;
          const dayEvents = events.filter((e) => e.date === cell.dateStr);

          return (
            <div
              key={cell.dateStr}
              className={`group relative flex min-h-36 flex-col justify-between p-2 transition-all hover:bg-slate-50/90 ${
                isToday ? "bg-indigo-50/30" : "bg-white"
              }`}
            >
              <div>
                {/* Day Header Row */}
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all ${
                      isToday
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 group-hover:bg-slate-200/60"
                    }`}
                  >
                    {cell.day}
                  </span>

                  {/* Add Event Button on cell hover */}
                  <button
                    type="button"
                    onClick={() => onSelectDateToBook(cell.dateStr)}
                    title="Add Event on this date"
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:border-indigo-600 hover:text-indigo-600"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Day Events Chips List */}
                <div className="mt-1.5 space-y-1.5">
                  {dayEvents.map((evt) => (
                    <motion.div
                      key={evt.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onSelectEvent(evt)}
                      className={`flex cursor-pointer flex-col rounded-xl border p-1.5 text-[11px] shadow-2xs transition-all ${getEventTypeStyle(
                        evt.type
                      )} ${evt.status === "Completed" ? "line-through opacity-70" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-1 leading-tight font-bold">
                        <span className="truncate">{evt.title}</span>
                        {getEventIcon(evt.type)}
                      </div>
                      <div className="mt-0.5 flex items-center justify-between text-[10px] font-semibold opacity-90">
                        <span className="truncate">{evt.clientName}</span>
                        <span className="shrink-0">{evt.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Book prompt if no events */}
              {dayEvents.length === 0 && (
                <div
                  onClick={() => onSelectDateToBook(cell.dateStr)}
                  className="mt-4 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-200/0 py-2 text-[10px] font-bold text-slate-300 transition-all group-hover:border-slate-300 group-hover:text-slate-500"
                >
                  + Book
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
