"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  X,
  Clock,
  Video,
  PhoneCall,
  User,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
import { toast } from "@/lib/toast";
import { ClientOption } from "./AppointmentsHeader";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientOption[];
  prefilledDate?: string;
  onSaveAppointment: (eventData: any) => void;
}

export function BookAppointmentModal({
  isOpen,
  onClose,
  clients,
  prefilledDate,
  onSaveAppointment,
}: BookAppointmentModalProps) {
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || "1");
  const [customClientName, setCustomClientName] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<
    "Product Demo" | "Discovery Call" | "Contract Review" | "Reminder" | "Follow-up Call"
  >("Product Demo");
  const [date, setDate] = useState(prefilledDate || "2026-10-14");
  const [time, setTime] = useState("11:00 AM");
  const [duration, setDuration] = useState("45 mins");
  const [location, setLocation] = useState("Google Meet");
  const [meetingUrl, setMeetingUrl] = useState("https://meet.google.com/wbx-sales-demo");
  const [notes, setNotes] = useState("");

  const [prevPrefilledDate, setPrevPrefilledDate] = useState<string | undefined>(undefined);
  if (prefilledDate && prefilledDate !== prevPrefilledDate) {
    setPrevPrefilledDate(prefilledDate);
    setDate(prefilledDate);
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let clientName = customClientName;
    let company = customCompany;

    if (selectedClientId !== "custom") {
      const found = clients.find((c) => c.id === selectedClientId);
      if (found) {
        clientName = found.name;
        company = found.company;
      }
    }

    onSaveAppointment({
      clientId: selectedClientId,
      clientName: clientName || "Client Lead",
      company: company || "WebXode Prospect",
      title,
      type,
      date,
      time,
      duration,
      location,
      meetingUrl,
      notes,
      status: "Scheduled",
      assignedRep: "Karthik Raja",
    });

    toast.success("Appointment Scheduled", {
      description: `'${title}' set for ${clientName} on ${date} at ${time}.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <CalendarIcon className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Book Client Appointment</h3>
              <p className="text-xs font-semibold text-slate-500">
                Schedule call, demo, or reminder alert
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cursor-pointer text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Client selection */}
          <div>
            <label className="text-xs font-bold text-slate-700">Select Client / Lead *</label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-600"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.company})
                </option>
              ))}
              <option value="custom">+ Add Custom Client Details</option>
            </select>
          </div>

          {selectedClientId === "custom" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={customClientName}
                  onChange={(e) => setCustomClientName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kovai Tech Solutions"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700">Event Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. WebXode SaaS Platform Demo & Q&A"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Event Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              >
                <option value="Product Demo">Product Demo</option>
                <option value="Discovery Call">Discovery Call</option>
                <option value="Follow-up Call">Follow-up Call</option>
                <option value="Contract Review">Contract Review</option>
                <option value="Reminder">Reminder</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              >
                <option value="15 mins">15 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Time *</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Location / Platform</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom Meeting">Zoom Meeting</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Client Office">Client Office</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Meeting Link</label>
              <input
                type="text"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Agenda / Pre-Meeting Notes</label>
            <textarea
              rows={3}
              placeholder="e.g. Present technical architecture and answer integration questions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
