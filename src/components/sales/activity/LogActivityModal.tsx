"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { ActivityType, ActivitySentiment, SalesActivity, SalesRepActivitySummary } from "./types";

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  reps: SalesRepActivitySummary[];
  onAddActivity: (activity: SalesActivity) => void;
}

const WEBXODE_LEADS = [
  { id: "LEAD-1001", company: "Acme Corp Enterprise", contact: "Jane Smith", value: 1250000 },
  { id: "LEAD-1002", company: "Stark Industries", contact: "Tony Stark", value: 4500000 },
  { id: "LEAD-1003", company: "Wayne Enterprises", contact: "Bruce Wayne", value: 800000 },
  { id: "LEAD-1004", company: "Ollivanders Wands", contact: "Garrick Ollivander", value: 320000 },
  { id: "LEAD-1005", company: "Los Pollos Hermanos", contact: "Gustavo Fring", value: 0 },
];

export function LogActivityModal({ isOpen, onClose, reps, onAddActivity }: LogActivityModalProps) {
  const [repId, setRepId] = useState<string>(reps[0]?.id || "rep-1");
  const [leadId, setLeadId] = useState<string>(WEBXODE_LEADS[0].id);
  const [type, setType] = useState<ActivityType>("call");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [outcome, setOutcome] = useState<string>("");
  const [sentiment, setSentiment] = useState<ActivitySentiment>("Positive");
  const [duration, setDuration] = useState<string>("30 mins");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRepObj = reps.find((r) => r.id === repId) || reps[0];
    const selectedLeadObj = WEBXODE_LEADS.find((l) => l.id === leadId) || WEBXODE_LEADS[0];

    const newActivity: SalesActivity = {
      id: `act-${Date.now()}`,
      leadId: selectedLeadObj.id,
      companyName: selectedLeadObj.company,
      contactPerson: selectedLeadObj.contact,
      salesPerson: selectedRepObj.name,
      salesPersonAvatar: selectedRepObj.avatar,
      type,
      title: title.trim() || `${type.toUpperCase()} Logged`,
      description: description.trim() || "Activity details logged into WebXode OS.",
      outcome: outcome.trim() || "Completed",
      stage: "Qualified",
      sentiment,
      timestamp: "Just now",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      duration: duration.trim() ? duration.trim() : undefined,
      dealValue: selectedLeadObj.value,
      isManagerVerified: false,
    };

    onAddActivity(newActivity);
    onClose();

    setTitle("");
    setDescription("");
    setOutcome("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Log Sales Activity</h2>
                <p className="text-xs font-semibold text-slate-500">
                  Add call log, demo outcome, or proposal delivery note for lead tracking.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-black text-slate-700">
                  Sales Representative
                </label>
                <select
                  value={repId}
                  onChange={(e) => setRepId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
                >
                  {reps.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700">
                  Select Lead Account
                </label>
                <select
                  value={leadId}
                  onChange={(e) => setLeadId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
                >
                  {WEBXODE_LEADS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.company} ({l.contact})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-black text-slate-700">Activity Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ActivityType)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
                >
                  <option value="call">Call Log</option>
                  <option value="demo">Demo Completed</option>
                  <option value="proposal">Proposal Delivered</option>
                  <option value="stage_change">Stage Update</option>
                  <option value="task_completed">Follow-up Task</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700">
                  Interaction Sentiment
                </label>
                <select
                  value={sentiment}
                  onChange={(e) => setSentiment(e.target.value as ActivitySentiment)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
                >
                  <option value="Positive">Positive Signal</option>
                  <option value="Neutral">Standard Follow-up</option>
                  <option value="Needs Attention">Action Required</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700">
                Activity Title & Key Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Technical Architecture Review Call with CTO"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700">Outcome Summary</label>
              <input
                type="text"
                required
                placeholder="e.g. Approved Proposal - Pending Procurement"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700">
                Detailed Interaction Narrative
              </label>
              <textarea
                rows={3}
                required
                placeholder="Write full narrative notes from call, demo, or email exchange..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-black text-white shadow-sm shadow-indigo-500/25 hover:bg-indigo-700"
              >
                Log Activity
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
