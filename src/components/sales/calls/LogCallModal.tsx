"use client";

import React, { useState } from "react";
import { PhoneCall, Plus, X, Calendar, Clock, FileText } from "lucide-react";
import { toast } from "@/lib/toast";

interface LogCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLog: (logData: any) => void;
}

export function LogCallModal({ isOpen, onClose, onSaveLog }: LogCallModalProps) {
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Connected");
  const [durationMins, setDurationMins] = useState("5");
  const [notes, setNotes] = useState("");
  const [followupDate, setFollowupDate] = useState("2026-10-15");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) return;

    onSaveLog({
      contactName,
      company: company || "Client Enterprise",
      phone: phone || "+91 98765 43210",
      status,
      duration: `${durationMins} mins`,
      notes: notes || "Manual call logged by sales representative.",
      followupDate,
    });

    onClose();
    setContactName("");
    setCompany("");
    setPhone("");
    setNotes("");
    toast.success("Call Activity Logged", {
      description: `Logged ${status} call with ${contactName}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <PhoneCall className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Log Past Call Activity</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Contact / Client Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Tech Ltd"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Call Outcome</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              >
                <option value="Connected">Connected / Answered</option>
                <option value="No Answer">No Answer</option>
                <option value="Busy">Busy / Callback</option>
                <option value="Left Voicemail">Left Voicemail</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Duration (mins)</label>
              <input
                type="number"
                value={durationMins}
                onChange={(e) => setDurationMins(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Call Key Highlights / Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Discussed pricing details & custom ERP scope..."
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Next Follow-up Schedule</label>
            <input
              type="date"
              value={followupDate}
              onChange={(e) => setFollowupDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
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
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
            >
              Log Call Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
