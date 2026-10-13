"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  MapPin,
  Users,
  Tag,
  Bell,
  Repeat,
  Briefcase,
  PhoneCall,
  Milestone,
  CalendarDays,
  Zap,
  Circle,
  ChevronDown,
  Edit3,
  Trash2,
  Video,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────
export type EventType =
  | "Meeting"
  | "Client Call"
  | "Sprint Review"
  | "Deadline"
  | "Reminder"
  | "Team Event"
  | "Holiday"
  | "Follow-up";

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;
  location?: string;
  attendees?: string;
  description?: string;
  color: string;
  isAllDay?: boolean;
  isRecurring?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Event Type Config
// ─────────────────────────────────────────────────────────────────────────────
export const EVENT_CONFIG: Record<
  EventType,
  { color: string; bg: string; border: string; dot: string; icon: React.ElementType; label: string }
> = {
  Meeting: {
    color: "text-indigo-700",
    bg: "bg-indigo-100",
    border: "border-indigo-300",
    dot: "bg-indigo-500",
    icon: Users,
    label: "Meeting",
  },
  "Client Call": {
    color: "text-blue-700",
    bg: "bg-blue-100",
    border: "border-blue-300",
    dot: "bg-blue-500",
    icon: PhoneCall,
    label: "Client Call",
  },
  "Sprint Review": {
    color: "text-violet-700",
    bg: "bg-violet-100",
    border: "border-violet-300",
    dot: "bg-violet-500",
    icon: Zap,
    label: "Sprint Review",
  },
  Deadline: {
    color: "text-rose-700",
    bg: "bg-rose-100",
    border: "border-rose-300",
    dot: "bg-rose-500",
    icon: AlertCircle,
    label: "Deadline",
  },
  Reminder: {
    color: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-300",
    dot: "bg-amber-500",
    icon: Bell,
    label: "Reminder",
  },
  "Team Event": {
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    border: "border-emerald-300",
    dot: "bg-emerald-500",
    icon: Briefcase,
    label: "Team Event",
  },
  Holiday: {
    color: "text-teal-700",
    bg: "bg-teal-100",
    border: "border-teal-300",
    dot: "bg-teal-500",
    icon: CalendarDays,
    label: "Holiday",
  },
  "Follow-up": {
    color: "text-orange-700",
    bg: "bg-orange-100",
    border: "border-orange-300",
    dot: "bg-orange-500",
    icon: Repeat,
    label: "Follow-up",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  Sample Events (October 2026)
// ─────────────────────────────────────────────────────────────────────────────
const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: "e1",
    title: "Visual Bridge Discovery Call",
    type: "Client Call",
    date: "2026-10-08",
    startTime: "10:00",
    endTime: "11:00",
    location: "Google Meet",
    attendees: "Akash R., Priya S., Visual Bridge Team",
    description: "Initial discovery and requirements gathering for Brand Portal.",
    color: "blue",
    isRecurring: false,
  },
  {
    id: "e2",
    title: "Sprint 2 Review — TechCorp Mobile App",
    type: "Sprint Review",
    date: "2026-10-08",
    startTime: "14:00",
    endTime: "15:30",
    location: "Conference Room A",
    attendees: "Dev Team, Akash R.",
    description: "Review sprint 2 deliverables and plan sprint 3 backlog.",
    color: "violet",
  },
  {
    id: "e3",
    title: "Annai Agro Quotation Sign-off",
    type: "Meeting",
    date: "2026-10-10",
    startTime: "11:00",
    endTime: "12:00",
    location: "Zoom",
    attendees: "Akash R., Annai Agro MD",
    description: "Final sign-off on CRM integration quotation.",
    color: "indigo",
  },
  {
    id: "e4",
    title: "AWS Invoice Payment Reminder",
    type: "Reminder",
    date: "2026-10-13",
    startTime: "09:00",
    endTime: "09:15",
    description: "Pay AWS invoice before auto-debit. Check bank balance.",
    color: "amber",
  },
  {
    id: "e5",
    title: "Aishwarya Arts Milestone #3 Release",
    type: "Deadline",
    date: "2026-10-15",
    startTime: "18:00",
    endTime: "18:30",
    description: "E-Commerce platform milestone 3 delivery deadline.",
    attendees: "Dev Team",
    color: "rose",
  },
  {
    id: "e6",
    title: "Team Offsite Planning — Q4",
    type: "Team Event",
    date: "2026-10-16",
    startTime: "10:00",
    endTime: "13:00",
    location: "Office Hall",
    attendees: "All Team",
    description: "Q4 OKR planning and team bonding.",
    color: "emerald",
    isAllDay: false,
  },
  {
    id: "e7",
    title: "FoundersROI Weekly Sync",
    type: "Client Call",
    date: "2026-10-17",
    startTime: "16:00",
    endTime: "17:00",
    location: "Google Meet",
    attendees: "Akash R., FoundersROI CTO",
    color: "blue",
    isRecurring: true,
  },
  {
    id: "e8",
    title: "Monthly Finance Audit & Payroll",
    type: "Deadline",
    date: "2026-10-20",
    startTime: "11:00",
    endTime: "13:00",
    location: "Finance Office",
    attendees: "Finance Team",
    description: "Monthly P&L audit, payroll processing and reimbursements.",
    color: "rose",
  },
  {
    id: "e9",
    title: "Diwali — Office Holiday",
    type: "Holiday",
    date: "2026-10-20",
    startTime: "00:00",
    endTime: "23:59",
    description: "Diwali office holiday.",
    color: "teal",
    isAllDay: true,
  },
  {
    id: "e10",
    title: "SmartHealth Patient Portal Go-Live",
    type: "Deadline",
    date: "2026-10-25",
    startTime: "09:00",
    endTime: "10:00",
    location: "Virtual",
    attendees: "Dev Team, SmartHealth CTO",
    description: "Final deployment and handover to SmartHealth.",
    color: "rose",
  },
  {
    id: "e11",
    title: "Follow-up: GreenLeaf Payment",
    type: "Follow-up",
    date: "2026-10-14",
    startTime: "10:00",
    endTime: "10:30",
    attendees: "Akash R.",
    description: "Follow up on overdue payment from GreenLeaf Organics.",
    color: "orange",
  },
  {
    id: "e12",
    title: "NovaBuild Kickoff Meeting",
    type: "Meeting",
    date: "2026-10-22",
    startTime: "10:00",
    endTime: "12:00",
    location: "NovaBuild Office",
    attendees: "Akash R., Dev Lead, NovaBuild PM",
    description: "Construction ERP project kickoff and requirement walkthrough.",
    color: "indigo",
  },
  {
    id: "e13",
    title: "TechCorp Sprint 2 Delivery",
    type: "Deadline",
    date: "2026-10-28",
    startTime: "17:00",
    endTime: "18:00",
    description: "Final delivery of Sprint 2 for TechCorp Mobile App MVP.",
    color: "rose",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDate(str: string) {
  const [y, m, d] = str.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

// ─────────────────────────────────────────────────────────────────────────────
//  Create / Edit Event Modal
// ─────────────────────────────────────────────────────────────────────────────
interface EventModalProps {
  initialDate: string;
  event?: CalendarEvent | null;
  onClose: () => void;
  onSave: (e: CalendarEvent) => void;
  onDelete?: (id: string) => void;
}

function EventModal({ initialDate, event, onClose, onSave, onDelete }: EventModalProps) {
  const isEdit = !!event;
  const [form, setForm] = useState<Omit<CalendarEvent, "id">>({
    title: event?.title ?? "",
    type: event?.type ?? "Meeting",
    date: event?.date ?? initialDate,
    startTime: event?.startTime ?? "09:00",
    endTime: event?.endTime ?? "10:00",
    location: event?.location ?? "",
    attendees: event?.attendees ?? "",
    description: event?.description ?? "",
    color: event?.color ?? "indigo",
    isAllDay: event?.isAllDay ?? false,
    isRecurring: event?.isRecurring ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: event?.id ?? `e-${Date.now()}`,
      ...form,
    });
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none transition";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
        style={{ maxHeight: "94vh" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                EVENT_CONFIG[form.type].bg
              }`}
            >
              {React.createElement(EVENT_CONFIG[form.type].icon, {
                className: `h-5 w-5 ${EVENT_CONFIG[form.type].color}`,
              })}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEdit ? "Edit Event" : "New Event"}
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                {isEdit ? "Update event details" : "Schedule a new calendar event"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Event Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. TechCorp Sprint Review, Client Call — FoundersROI..."
              className={inputClass}
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-700">Event Type *</label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(EVENT_CONFIG) as EventType[]).map((type) => {
                const cfg = EVENT_CONFIG[type];
                const Icon = cfg.icon;
                const isActive = form.type === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, type })}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition ${
                      isActive
                        ? `${cfg.bg} ${cfg.border} ${cfg.color}`
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-[10px] leading-tight font-bold">{cfg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date + All Day */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Date *</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <input
                  type="checkbox"
                  checked={form.isAllDay}
                  onChange={(e) => setForm({ ...form, isAllDay: e.target.checked })}
                  className="h-4 w-4 rounded accent-indigo-600"
                />
                <span className="text-xs font-bold text-slate-700">All Day Event</span>
              </label>
            </div>
          </div>

          {/* Time */}
          {!form.isAllDay && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">Start Time</label>
                <div className="relative">
                  <select
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className={`appearance-none pr-8 ${inputClass}`}
                  >
                    {HOURS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">End Time</label>
                <div className="relative">
                  <select
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    className={`appearance-none pr-8 ${inputClass}`}
                  >
                    {HOURS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          )}

          {/* Location + Video */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Location / Meeting Link
            </label>
            <div className="relative">
              <MapPin className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Conference Room A, Google Meet, Zoom link..."
                className={`pl-10 ${inputClass}`}
              />
            </div>
          </div>

          {/* Attendees */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Attendees / Guests
            </label>
            <div className="relative">
              <Users className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={form.attendees}
                onChange={(e) => setForm({ ...form, attendees: e.target.value })}
                placeholder="e.g. Akash R., Dev Team, Client Name..."
                className={`pl-10 ${inputClass}`}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Description / Notes
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Agenda, notes, or context for this event..."
              className={`resize-none ${inputClass}`}
            />
          </div>

          {/* Recurring */}
          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3">
            <input
              type="checkbox"
              checked={form.isRecurring}
              onChange={(e) => setForm({ ...form, isRecurring: e.target.checked })}
              className="h-4 w-4 rounded accent-indigo-600"
            />
            <Repeat className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-700">Recurring Event (weekly)</span>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
            <div>
              {isEdit && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(event!.id);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold text-white shadow-md transition hover:opacity-90 ${
                  EVENT_CONFIG[form.type].dot.replace("bg-", "bg-") + " shadow-indigo-200"
                } bg-indigo-600`}
              >
                {isEdit ? <Edit3 className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                {isEdit ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Event Pill (shown in calendar cells)
// ─────────────────────────────────────────────────────────────────────────────
function EventPill({
  event,
  onClick,
  compact = false,
}: {
  event: CalendarEvent;
  onClick: (e: CalendarEvent) => void;
  compact?: boolean;
}) {
  const cfg = EVENT_CONFIG[event.type];
  return (
    <button
      type="button"
      onClick={(ev) => {
        ev.stopPropagation();
        onClick(event);
      }}
      className={`w-full truncate rounded-lg border px-1.5 py-0.5 text-left text-[10px] font-bold transition hover:brightness-95 ${cfg.bg} ${cfg.border} ${cfg.color}`}
    >
      {!compact && (
        <span
          className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "currentColor" }}
        />
      )}
      {event.isAllDay ? "🗓 " : `${event.startTime} `}
      {event.title}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Event Detail Popover
// ─────────────────────────────────────────────────────────────────────────────
function EventDetailPanel({
  event,
  onEdit,
  onDelete,
  onClose,
}: {
  event: CalendarEvent;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const cfg = EVENT_CONFIG[event.type];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.18 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}>
            <Icon className={`h-4 w-4 ${cfg.color}`} />
          </div>
          <div>
            <p className="text-sm leading-tight font-extrabold text-slate-900">{event.title}</p>
            <p className={`text-[11px] font-bold ${cfg.color}`}>{event.type}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-slate-100">
          <X className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          {event.isAllDay ? "All Day" : `${event.startTime} – ${event.endTime}`}
          {event.isRecurring && (
            <span className="ml-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
              Recurring
            </span>
          )}
        </div>
        {event.location && (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            {event.location}
          </div>
        )}
        {event.attendees && (
          <div className="flex items-start gap-2 text-xs font-semibold text-slate-600">
            <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>{event.attendees}</span>
          </div>
        )}
        {event.description && (
          <div className="mt-2 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed font-semibold text-slate-600">
            {event.description}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <Edit3 className="h-3 w-3" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => {
            onDelete(event.id);
            onClose();
          }}
          className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MONTH VIEW
// ─────────────────────────────────────────────────────────────────────────────
interface MonthViewProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  today: string;
  selectedDate: string;
  onSelectDate: (d: string) => void;
  onEventClick: (e: CalendarEvent) => void;
  onDayDoubleClick: (d: string) => void;
}

function MonthView({
  year,
  month,
  events,
  today,
  selectedDate,
  onSelectDate,
  onEventClick,
  onDayDoubleClick,
}: MonthViewProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  const cells: { date: string; day: number; isCurrentMonth: boolean }[] = [];

  // Prev month overflow
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    cells.push({ date: toDateStr(prevYear, prevMonth, d), day: d, isCurrentMonth: false });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: toDateStr(year, month, d), day: d, isCurrentMonth: true });
  }

  // Next month fill
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    cells.push({ date: toDateStr(nextYear, nextMonth, d), day: d, isCurrentMonth: false });
  }

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div className="flex-1 overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-slate-100">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="border-r border-slate-100 py-2 text-center text-[11px] font-extrabold tracking-wider text-slate-400 uppercase last:border-r-0"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div className="flex-1">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="grid grid-cols-7 border-b border-slate-100 last:border-b-0"
            style={{ minHeight: "5.5rem" }}
          >
            {row.map((cell) => {
              const isToday = cell.date === today;
              const isSelected = cell.date === selectedDate;
              const cellEvents = events.filter((e) => e.date === cell.date);

              return (
                <div
                  key={cell.date}
                  onClick={() => {
                    if (cell.isCurrentMonth) onSelectDate(cell.date);
                  }}
                  onDoubleClick={() => {
                    if (cell.isCurrentMonth) onDayDoubleClick(cell.date);
                  }}
                  className={`group relative cursor-pointer border-r border-slate-100 p-1.5 transition last:border-r-0 ${
                    !cell.isCurrentMonth
                      ? "bg-slate-50/60"
                      : isSelected
                        ? "bg-indigo-50/50"
                        : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Day number */}
                  <div className="mb-1 flex items-center justify-between">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
                        isToday
                          ? "bg-indigo-600 text-white shadow-sm"
                          : !cell.isCurrentMonth
                            ? "text-slate-300"
                            : "text-slate-800 group-hover:bg-slate-100"
                      }`}
                    >
                      {cell.day}
                    </span>
                    {cell.isCurrentMonth && cellEvents.length > 0 && (
                      <span className="text-[9px] font-black text-slate-400">
                        {cellEvents.length > 3 ? `+${cellEvents.length - 2}` : ""}
                      </span>
                    )}
                  </div>

                  {/* Events */}
                  <div className="space-y-0.5">
                    {cellEvents.slice(0, 3).map((ev) => (
                      <EventPill key={ev.id} event={ev} onClick={onEventClick} />
                    ))}
                    {cellEvents.length > 3 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(cellEvents[3]);
                        }}
                        className="w-full rounded-lg px-1.5 py-0.5 text-left text-[10px] font-bold text-slate-500 hover:bg-slate-100"
                      >
                        +{cellEvents.length - 3} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  WEEK VIEW
// ─────────────────────────────────────────────────────────────────────────────
function WeekView({
  year,
  month,
  day,
  events,
  today,
  onEventClick,
  onSlotClick,
}: {
  year: number;
  month: number;
  day: number;
  events: CalendarEvent[];
  today: string;
  onEventClick: (e: CalendarEvent) => void;
  onSlotClick: (date: string, time: string) => void;
}) {
  // Find the Sunday of this week
  const refDate = new Date(year, month, day);
  const sundayOffset = refDate.getDay();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(refDate);
    d.setDate(d.getDate() - sundayOffset + i);
    return {
      date: toDateStr(d.getFullYear(), d.getMonth(), d.getDate()),
      label: DAY_NAMES[i],
      day: d.getDate(),
    };
  });

  const displayHours = Array.from({ length: 14 }, (_, i) => i + 7); // 07:00–20:00

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Day headers */}
      <div
        className="grid border-b border-slate-100"
        style={{ gridTemplateColumns: "3.5rem repeat(7, 1fr)" }}
      >
        <div className="border-r border-slate-100 p-2" />
        {weekDays.map((wd) => {
          const isToday = wd.date === today;
          return (
            <div
              key={wd.date}
              className="border-r border-slate-100 py-2 text-center last:border-r-0"
            >
              <span className="block text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
                {wd.label}
              </span>
              <span
                className={`mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-black ${
                  isToday ? "bg-indigo-600 text-white" : "text-slate-800"
                }`}
              >
                {wd.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        {displayHours.map((hour) => {
          const timeStr = `${String(hour).padStart(2, "0")}:00`;
          return (
            <div
              key={hour}
              className="grid border-b border-slate-100 last:border-b-0"
              style={{ gridTemplateColumns: "3.5rem repeat(7, 1fr)", minHeight: "3.5rem" }}
            >
              <div className="border-r border-slate-100 px-2 pt-1 text-right text-[10px] font-bold text-slate-400">
                {timeStr}
              </div>
              {weekDays.map((wd) => {
                const slotEvents = events.filter(
                  (e) => e.date === wd.date && !e.isAllDay && e.startTime === timeStr
                );
                return (
                  <div
                    key={wd.date}
                    onClick={() => onSlotClick(wd.date, timeStr)}
                    className="group cursor-pointer border-r border-slate-100 p-1 transition last:border-r-0 hover:bg-indigo-50/40"
                  >
                    {slotEvents.map((ev) => {
                      const cfg = EVENT_CONFIG[ev.type];
                      return (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(ev);
                          }}
                          className={`w-full rounded-lg border px-1.5 py-1 text-left text-[10px] font-bold transition hover:brightness-95 ${cfg.bg} ${cfg.border} ${cfg.color}`}
                        >
                          <span className="block truncate font-extrabold">{ev.title}</span>
                          <span className="opacity-70">
                            {ev.startTime}–{ev.endTime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  DAY VIEW
// ─────────────────────────────────────────────────────────────────────────────
function DayView({
  date,
  events,
  onEventClick,
  onSlotClick,
}: {
  date: string;
  events: CalendarEvent[];
  onEventClick: (e: CalendarEvent) => void;
  onSlotClick: (date: string, time: string) => void;
}) {
  const { year, month, day } = parseDate(date);
  const displayHours = Array.from({ length: 16 }, (_, i) => i + 7); // 07:00–22:00

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3 text-center">
        <p className="text-lg font-black text-slate-900">
          {DAY_NAMES[new Date(year, month, day).getDay()]}
        </p>
        <p className="text-xs font-semibold text-slate-500">
          {day} {MONTH_NAMES[month]} {year}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {displayHours.map((hour) => {
          const timeStr = `${String(hour).padStart(2, "0")}:00`;
          const slotEvents = events.filter(
            (e) => e.date === date && !e.isAllDay && e.startTime === timeStr
          );
          return (
            <div
              key={hour}
              className="flex min-h-14 cursor-pointer border-b border-slate-100 transition last:border-b-0 hover:bg-indigo-50/30"
              onClick={() => onSlotClick(date, timeStr)}
            >
              <div className="w-16 shrink-0 border-r border-slate-100 px-3 pt-2 text-right text-[11px] font-bold text-slate-400">
                {timeStr}
              </div>
              <div className="flex-1 space-y-1 p-1.5">
                {slotEvents.map((ev) => {
                  const cfg = EVENT_CONFIG[ev.type];
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(ev);
                      }}
                      className={`flex w-full items-start gap-2 rounded-xl border px-3 py-2 text-left transition hover:brightness-95 ${cfg.bg} ${cfg.border}`}
                    >
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${cfg.color}`} />
                      <div>
                        <p className={`text-xs font-extrabold ${cfg.color}`}>{ev.title}</p>
                        <p className="text-[11px] font-semibold text-slate-500">
                          {ev.startTime} – {ev.endTime}
                          {ev.location && ` · ${ev.location}`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MINI CALENDAR (sidebar)
// ─────────────────────────────────────────────────────────────────────────────
function MiniCalendar({
  year,
  month,
  events,
  today,
  selected,
  onSelect,
  onNavigate,
}: {
  year: number;
  month: number;
  events: CalendarEvent[];
  today: string;
  selected: string;
  onSelect: (d: string) => void;
  onNavigate: (dir: number) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);
  const cells: { date: string; day: number; isCurrent: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const pm = month === 0 ? 11 : month - 1;
    const py = month === 0 ? year - 1 : year;
    cells.push({ date: toDateStr(py, pm, d), day: d, isCurrent: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: toDateStr(year, month, d), day: d, isCurrent: true });
  }
  const rem = 35 - cells.length;
  for (let d = 1; d <= Math.max(0, rem); d++) {
    const nm = month === 11 ? 0 : month + 1;
    const ny = month === 11 ? year + 1 : year;
    cells.push({ date: toDateStr(ny, nm, d), day: d, isCurrent: false });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-800">
          {MONTH_NAMES[month].slice(0, 3)} {year}
        </span>
        <div className="flex gap-0.5">
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            className="rounded-lg p-1 hover:bg-slate-100"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate(1)}
            className="rounded-lg p-1 hover:bg-slate-100"
          >
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-0.5">
        {cells.map((cell) => {
          const isToday = cell.date === today;
          const isSel = cell.date === selected;
          const hasDot = events.some((e) => e.date === cell.date);
          return (
            <button
              key={cell.date}
              type="button"
              onClick={() => {
                if (cell.isCurrent) onSelect(cell.date);
              }}
              className={`relative flex h-6 w-full items-center justify-center rounded-lg text-[11px] font-bold transition ${
                isToday
                  ? "bg-indigo-600 text-white"
                  : isSel
                    ? "bg-indigo-100 text-indigo-700"
                    : !cell.isCurrent
                      ? "text-slate-300"
                      : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {cell.day}
              {hasDot && !isToday && (
                <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-indigo-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SIDEBAR — Upcoming Events
// ─────────────────────────────────────────────────────────────────────────────
function UpcomingPanel({
  events,
  today,
  onEventClick,
}: {
  events: CalendarEvent[];
  today: string;
  onEventClick: (e: CalendarEvent) => void;
}) {
  const upcoming = [...events]
    .filter((e) => e.date >= today)
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
    .slice(0, 8);

  return (
    <div>
      <p className="mb-3 text-xs font-extrabold tracking-wider text-slate-500 uppercase">
        Upcoming Events
      </p>
      <div className="space-y-2">
        {upcoming.map((ev) => {
          const cfg = EVENT_CONFIG[ev.type];
          const Icon = cfg.icon;
          const { month, day } = parseDate(ev.date);
          return (
            <button
              key={ev.id}
              type="button"
              onClick={() => onEventClick(ev)}
              className="flex w-full items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-2.5 text-left transition hover:border-indigo-200 hover:bg-indigo-50/30"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}
              >
                <Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-extrabold text-slate-900">{ev.title}</p>
                <p className="text-[10px] font-semibold text-slate-500">
                  {MONTH_NAMES[month].slice(0, 3)} {day}
                  {!ev.isAllDay && ` · ${ev.startTime}`}
                </p>
              </div>
              <div
                className={`shrink-0 rounded-lg border px-1.5 py-0.5 text-[9px] font-extrabold ${cfg.bg} ${cfg.border} ${cfg.color}`}
              >
                {ev.type}
              </div>
            </button>
          );
        })}
        {upcoming.length === 0 && (
          <p className="py-4 text-center text-xs font-semibold text-slate-400">
            No upcoming events
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN CALENDAR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
type ViewMode = "month" | "week" | "day";

export function ProfessionalCalendar() {
  const now = new Date();
  const todayStr = toDateStr(now.getFullYear(), now.getMonth(), now.getDate());

  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9); // October (0-indexed)
  const [selectedDate, setSelectedDate] = useState(
    todayStr.startsWith("2026") ? todayStr : "2026-10-13"
  );
  const [view, setView] = useState<ViewMode>("month");
  const [events, setEvents] = useState<CalendarEvent[]>(SAMPLE_EVENTS);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [detailEvent, setDetailEvent] = useState<CalendarEvent | null>(null);
  const [newEventDate, setNewEventDate] = useState(selectedDate);

  const navigate = (dir: number) => {
    if (view === "month") {
      let m = month + dir;
      let y = year;
      if (m < 0) {
        m = 11;
        y--;
      }
      if (m > 11) {
        m = 0;
        y++;
      }
      setMonth(m);
      setYear(y);
    } else if (view === "week") {
      const d = new Date(
        parseDate(selectedDate).year,
        parseDate(selectedDate).month,
        parseDate(selectedDate).day
      );
      d.setDate(d.getDate() + dir * 7);
      setSelectedDate(toDateStr(d.getFullYear(), d.getMonth(), d.getDate()));
    } else {
      const d = new Date(
        parseDate(selectedDate).year,
        parseDate(selectedDate).month,
        parseDate(selectedDate).day
      );
      d.setDate(d.getDate() + dir);
      setSelectedDate(toDateStr(d.getFullYear(), d.getMonth(), d.getDate()));
    }
  };

  const handleMiniNavigate = (dir: number) => {
    let m = month + dir;
    let y = year;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    setMonth(m);
    setYear(y);
  };

  const handleSaveEvent = (ev: CalendarEvent) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === ev.id);
      return exists ? prev.map((e) => (e.id === ev.id ? ev : e)) : [ev, ...prev];
    });
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDetailEvent(null);
  };

  const handleEventClick = (ev: CalendarEvent) => {
    setDetailEvent(ev);
  };

  const openNewEvent = (date?: string, time?: string) => {
    setNewEventDate(date ?? selectedDate);
    setEditingEvent(null);
    setShowModal(true);
    setDetailEvent(null);
  };

  const openEditEvent = (ev: CalendarEvent) => {
    setEditingEvent(ev);
    setShowModal(true);
    setDetailEvent(null);
  };

  const goToday = () => {
    const now2 = new Date();
    setYear(now2.getFullYear());
    setMonth(now2.getMonth());
    setSelectedDate(toDateStr(now2.getFullYear(), now2.getMonth(), now2.getDate()));
  };

  // Header label
  const headerLabel =
    view === "month"
      ? `${MONTH_NAMES[month]} ${year}`
      : view === "week"
        ? `Week of ${MONTH_NAMES[parseDate(selectedDate).month].slice(0, 3)} ${parseDate(selectedDate).day}, ${parseDate(selectedDate).year}`
        : `${DAY_NAMES[new Date(parseDate(selectedDate).year, parseDate(selectedDate).month, parseDate(selectedDate).day).getDay()]}, ${MONTH_NAMES[parseDate(selectedDate).month]} ${parseDate(selectedDate).day}`;

  const eventTypeCounts = (Object.keys(EVENT_CONFIG) as EventType[])
    .map((type) => ({
      type,
      count: events.filter((e) => e.type === type).length,
    }))
    .filter((t) => t.count > 0);

  return (
    <div className="flex h-full gap-0 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="hidden w-64 shrink-0 flex-col gap-5 overflow-y-auto border-r border-slate-100 p-4 xl:flex">
        {/* New Event button */}
        <button
          type="button"
          id="new-event-btn"
          onClick={() => openNewEvent()}
          className="flex w-full items-center gap-2.5 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          New Event
        </button>

        {/* Mini Calendar */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
          <MiniCalendar
            year={year}
            month={month}
            events={events}
            today={todayStr}
            selected={selectedDate}
            onSelect={(d) => {
              setSelectedDate(d);
              if (view === "month") {
                const { year: y, month: m } = parseDate(d);
                setYear(y);
                setMonth(m);
              }
            }}
            onNavigate={handleMiniNavigate}
          />
        </div>

        {/* Event type legend */}
        <div>
          <p className="mb-2 text-xs font-extrabold tracking-wider text-slate-500 uppercase">
            Event Types
          </p>
          <div className="space-y-1.5">
            {eventTypeCounts.map(({ type, count }) => {
              const cfg = EVENT_CONFIG[type];
              const Icon = cfg.icon;
              return (
                <div key={type} className="flex items-center gap-2.5 px-1">
                  <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
                  <Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
                  <span className="flex-1 text-[11px] font-bold text-slate-700">{type}</span>
                  <span className="text-[10px] font-black text-slate-400">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming events */}
        <UpcomingPanel events={events} today={todayStr} onEventClick={handleEventClick} />
      </aside>

      {/* ── MAIN CALENDAR AREA ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToday}
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Today
            </button>
            <h2 className="ml-2 text-base font-black text-slate-900 sm:text-lg">{headerLabel}</h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-bold">
              {(["month", "week", "day"] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`rounded-lg px-3 py-1.5 capitalize transition ${
                    view === v
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openNewEvent()}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 xl:hidden"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </button>
          </div>
        </div>

        {/* Calendar body + optional event detail */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${view}-${year}-${month}-${selectedDate}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-1 flex-col overflow-hidden"
              >
                {view === "month" && (
                  <MonthView
                    year={year}
                    month={month}
                    events={events}
                    today={todayStr}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onEventClick={handleEventClick}
                    onDayDoubleClick={(d) => openNewEvent(d)}
                  />
                )}
                {view === "week" && (
                  <WeekView
                    year={parseDate(selectedDate).year}
                    month={parseDate(selectedDate).month}
                    day={parseDate(selectedDate).day}
                    events={events}
                    today={todayStr}
                    onEventClick={handleEventClick}
                    onSlotClick={(d, t) => openNewEvent(d, t)}
                  />
                )}
                {view === "day" && (
                  <DayView
                    date={selectedDate}
                    events={events}
                    onEventClick={handleEventClick}
                    onSlotClick={(d, t) => openNewEvent(d, t)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Event detail panel */}
          <AnimatePresence>
            {detailEvent && (
              <div className="w-72 shrink-0 overflow-y-auto border-l border-slate-100 p-3">
                <EventDetailPanel
                  event={detailEvent}
                  onEdit={() => openEditEvent(detailEvent)}
                  onDelete={handleDeleteEvent}
                  onClose={() => setDetailEvent(null)}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showModal && (
          <EventModal
            initialDate={newEventDate}
            event={editingEvent}
            onClose={() => {
              setShowModal(false);
              setEditingEvent(null);
            }}
            onSave={handleSaveEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
