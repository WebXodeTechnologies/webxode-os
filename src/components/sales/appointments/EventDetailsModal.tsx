"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  X,
  Clock,
  Video,
  PhoneCall,
  User,
  Building2,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Trash2,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import { AppointmentEvent } from "./AppointmentsCalendarView";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: AppointmentEvent | null;
  onToggleStatus: (id: string) => void;
  onDeleteEvent: (id: string) => void;
}

export function EventDetailsModal({
  isOpen,
  onClose,
  event,
  onToggleStatus,
  onDeleteEvent,
}: EventDetailsModalProps) {
  const [meetingNotes, setMeetingNotes] = useState("");
  const [prevEventId, setPrevEventId] = useState<string | null>(null);

  if (event && event.id !== prevEventId) {
    setPrevEventId(event.id);
    setMeetingNotes(event.notes || "");
  }

  if (!isOpen || !event) return null;

  const handleSaveNotes = () => {
    toast.success("Meeting Notes Updated");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <CalendarIcon className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Event Overview</h3>
              <p className="text-xs font-semibold text-slate-500">{event.type}</p>
            </div>
          </div>
          <button onClick={onClose} className="cursor-pointer text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Card */}
        <div className="space-y-3">
          <h2 className="text-lg leading-snug font-black text-slate-900">{event.title}</h2>

          {/* Client info */}
          <div className="space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <User className="h-3.5 w-3.5 text-indigo-600" />
                {event.clientName}
              </div>
              <Link
                href={`/dashboard/sales/leads/${event.clientId}`}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:underline"
              >
                View Profile <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              {event.company}
            </div>
          </div>

          {/* Timing & Location */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5">
              <Clock className="h-4 w-4 shrink-0 text-indigo-600" />
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Time</div>
                <div>
                  {event.time} ({event.duration})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Location</div>
                <div className="truncate">{event.location}</div>
              </div>
            </div>
          </div>

          {/* Join Meeting Link Button */}
          {event.meetingUrl && (
            <a
              href={event.meetingUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 p-2.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-indigo-700"
            >
              <Video className="h-4 w-4" /> Join Virtual Meeting Room
            </a>
          )}

          {/* Meeting Notes */}
          <div>
            <label className="text-xs font-bold text-slate-700">Discussion Notes & Agenda</label>
            <textarea
              rows={3}
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
              placeholder="Add call/meeting outcome notes here..."
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => {
              onDeleteEvent(event.id);
              onClose();
            }}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 transition-all hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" /> Delete Event
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onToggleStatus(event.id);
                onClose();
              }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                event.status === "Completed"
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {event.status === "Completed" ? "Re-open Event" : "Mark Completed"}
            </button>

            <button
              type="button"
              onClick={handleSaveNotes}
              className="cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-slate-800"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
