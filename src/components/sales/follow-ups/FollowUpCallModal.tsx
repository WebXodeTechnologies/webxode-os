"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, X, Clock, CheckCircle2, PhoneOff, Voicemail, AlertCircle } from "lucide-react";
import { toast } from "@/lib/toast";
import { FollowUpItem } from "./FollowUpsTable";

interface FollowUpCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: FollowUpItem | null;
  onLogCall: (id: string, outcome: string, notes: string) => void;
}

export function FollowUpCallModal({
  isOpen,
  onClose,
  selectedItem,
  onLogCall,
}: FollowUpCallModalProps) {
  const [prevItemId, setPrevItemId] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "connected" | "ended">("idle");
  const [outcome, setOutcome] = useState("Connected - Positive Feedback");
  const [duration, setDuration] = useState("04:15");
  const [callNotes, setCallNotes] = useState("");

  if (selectedItem && selectedItem.id !== prevItemId) {
    setPrevItemId(selectedItem.id);
    setCallStatus("idle");
    setCallNotes("");
  }

  if (!isOpen || !selectedItem) return null;

  const handleStartCall = () => {
    setCallStatus("calling");
    toast.info(`Dialing ${selectedItem.contactName}...`, {
      description: `Connecting to ${selectedItem.phone}`,
    });
    setTimeout(() => {
      setCallStatus("connected");
    }, 1500);
  };

  const handleEndCall = () => {
    setCallStatus("ended");
    toast.success("Call Ended", {
      description: "Please record the call outcome and discussion notes.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogCall(selectedItem.id, outcome, callNotes);
    toast.success("Follow-up Call Logged", {
      description: `Logged call with ${selectedItem.contactName} (${outcome}).`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <PhoneCall className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Initiate & Log Call</h3>
              <p className="text-xs font-semibold text-slate-500">{selectedItem.contactName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Call Status Card & Dialer */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center">
          <div className="text-xs font-bold text-slate-500">CLIENT PHONE NUMBER</div>
          <div className="mt-1 text-lg font-black text-slate-900">{selectedItem.phone}</div>
          <div className="text-xs font-semibold text-slate-400">{selectedItem.company}</div>

          {/* Action State Visuals */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {callStatus === "idle" && (
              <button
                type="button"
                onClick={handleStartCall}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700"
              >
                <PhoneCall className="h-4 w-4" /> Start Quick Call
              </button>
            )}

            {callStatus === "calling" && (
              <div className="flex animate-pulse items-center gap-2 rounded-xl bg-amber-100 px-4 py-2 text-xs font-bold text-amber-800">
                <Clock className="h-4 w-4" /> Ringing...
              </div>
            )}

            {callStatus === "connected" && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">
                  <span className="h-2 w-2 animate-ping rounded-full bg-emerald-600" />
                  Call Active ({duration})
                </div>
                <button
                  type="button"
                  onClick={handleEndCall}
                  className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white transition-all hover:bg-rose-700"
                >
                  <PhoneOff className="h-3.5 w-3.5" /> End
                </button>
              </div>
            )}

            {callStatus === "ended" && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Call Completed ({duration})
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Call Outcome *</label>
            <select
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            >
              <option value="Connected - Positive Feedback">Connected - Positive Feedback</option>
              <option value="Connected - Requested Proposal Revision">
                Connected - Requested Proposal Revision
              </option>
              <option value="Left Voicemail">Left Voicemail</option>
              <option value="No Answer / Busy">No Answer / Busy</option>
              <option value="Rescheduled Call">Rescheduled Call</option>
              <option value="Not Interested / Closed Lost">Not Interested / Closed Lost</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">
              Discussion Notes & Action Items
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Discussed pricing package. Client requested updated quote by Friday."
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none focus:border-indigo-600"
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
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700"
            >
              <CheckCircle2 className="h-4 w-4" /> Save Call Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
