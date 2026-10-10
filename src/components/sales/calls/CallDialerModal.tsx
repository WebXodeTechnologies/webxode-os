"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  Building2,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface CallDialerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetContact?: {
    name: string;
    company: string;
    phone: string;
    leadId?: string;
  } | null;
  onSaveLog: (logData: any) => void;
}

export function CallDialerModal({
  isOpen,
  onClose,
  targetContact,
  onSaveLog,
}: CallDialerModalProps) {
  const [callActive, setCallActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [outcome, setOutcome] = useState<"Connected" | "No Answer" | "Busy" | "Left Voicemail">(
    "Connected"
  );
  const [notes, setNotes] = useState("");

  const contactName = targetContact?.name || "Annai Agro Tradings (Murugan P.)";
  const contactCompany = targetContact?.company || "Annai Agro Tradings";
  const contactPhone = targetContact?.phone || "+91 97890 44221";

  // Call timer simulation
  useEffect(() => {
    let timer: any;
    if (isOpen && callActive) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, callActive]);

  const handleStartCall = () => {
    setCallActive(true);
    setSeconds(0);
    toast.info(`Calling ${contactName}...`, {
      description: `Dialing ${contactPhone}`,
    });
  };

  const handleEndCall = () => {
    setCallActive(false);
    toast.success("Call Ended", {
      description: `Call duration: ${formatTime(seconds)}`,
    });
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const durationStr = seconds > 0 ? formatTime(seconds) : "01:45 mins";
    onSaveLog({
      contactName,
      company: contactCompany,
      phone: contactPhone,
      status: outcome,
      duration: durationStr,
      notes,
    });
    onClose();
    setSeconds(0);
    setNotes("");
    setCallActive(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <PhoneCall className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Initiate Sales Call</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Lead Details Card */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">
              {contactName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">{contactName}</div>
              <div className="text-xs font-semibold text-slate-500">{contactCompany}</div>
            </div>
          </div>
          <div className="text-right font-mono text-xs font-bold text-indigo-600">
            {contactPhone}
          </div>
        </div>

        {/* Dialer Interface & Controls */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50/60 to-blue-50/50 p-6 text-center">
          {callActive ? (
            <>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <PhoneCall className="relative z-10 h-8 w-8" />
              </div>
              <div className="mt-3 font-mono text-xl font-black text-slate-900">
                {formatTime(seconds)}
              </div>
              <div className="text-xs font-semibold text-emerald-600">
                Call Connected • In Progress
              </div>

              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isMuted
                      ? "border-rose-300 bg-rose-100 text-rose-600"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={handleEndCall}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-white shadow-md transition hover:bg-rose-700"
                  title="Hang Up"
                >
                  <PhoneOff className="h-6 w-6" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <PhoneCall className="h-7 w-7" />
              </div>
              <div className="mt-2 text-sm font-extrabold text-slate-900">Ready to Call</div>
              <div className="text-xs font-semibold text-slate-500">
                Click below to launch web dialer
              </div>

              <button
                type="button"
                onClick={handleStartCall}
                className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                <PhoneCall className="h-4 w-4" /> Start Call
              </button>
            </>
          )}
        </div>

        {/* Outcome Selector & Notes */}
        <form onSubmit={handleSaveSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Call Outcome Status</label>
            <div className="mt-1.5 grid grid-cols-2 gap-2 text-xs font-bold sm:grid-cols-4">
              {(["Connected", "No Answer", "Busy", "Left Voicemail"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setOutcome(st)}
                  className={`rounded-xl border p-2 text-center transition ${
                    outcome === st
                      ? "border-indigo-600 bg-indigo-50 font-extrabold text-indigo-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Call Notes & Key Takeaways</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Discussed milestone 2 scope, client requested updated estimate by Thursday..."
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
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
              Save Call Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
