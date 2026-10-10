"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Video,
  FileCheck,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Building2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  HeartHandshake,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { SalesActivity, ActivityType, ActivitySentiment } from "./types";

interface SalesActivityTimelineProps {
  activities: SalesActivity[];
  selectedRep: string;
  onToggleManagerReview: (id: string) => void;
  onAddManagerNote: (id: string, note: string) => void;
}

export function SalesActivityTimeline({
  activities,
  selectedRep,
  onToggleManagerReview,
  onAddManagerNote,
}: SalesActivityTimelineProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");

  const filtered = activities.filter((act) => {
    const matchesRep =
      selectedRep === "all" || act.salesPerson === selectedRep || act.id === selectedRep;
    const matchesTab = activeTab === "all" || act.type === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      act.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.salesPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRep && matchesTab && matchesSearch;
  });

  const getIconForType = (type: ActivityType) => {
    switch (type) {
      case "call":
        return PhoneCall;
      case "email":
        return Mail;
      case "demo":
        return Video;
      case "proposal":
        return FileCheck;
      case "stage_change":
        return TrendingUp;
      case "task_completed":
        return CheckCircle2;
    }
  };

  const getColorForType = (type: ActivityType) => {
    switch (type) {
      case "call":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "email":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "demo":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "proposal":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "stage_change":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "task_completed":
        return "text-teal-600 bg-teal-50 border-teal-200";
    }
  };

  const getSentimentBadge = (sentiment: ActivitySentiment) => {
    switch (sentiment) {
      case "Positive":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-700">
            <HeartHandshake className="h-3 w-3" /> Positive Signal
          </span>
        );
      case "Neutral":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-extrabold text-slate-700">
            Standard Follow-up
          </span>
        );
      case "Needs Attention":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-700">
            <AlertTriangle className="h-3 w-3" /> Action Required
          </span>
        );
    }
  };

  const tabs = [
    { id: "all", label: "All Logs", count: activities.length },
    { id: "call", label: "Calls", count: activities.filter((a) => a.type === "call").length },
    { id: "demo", label: "Demos", count: activities.filter((a) => a.type === "demo").length },
    {
      id: "proposal",
      label: "Proposals",
      count: activities.filter((a) => a.type === "proposal").length,
    },
    {
      id: "stage_change",
      label: "Stage Changes",
      count: activities.filter((a) => a.type === "stage_change").length,
    },
  ];

  const handleSaveNote = (id: string) => {
    if (noteInput.trim()) {
      onAddManagerNote(id, noteInput.trim());
      setEditingNoteId(null);
      setNoteInput("");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              Live Sales Activity Audit Stream
            </h2>
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-black text-indigo-700">
              {filtered.length} Recorded
            </span>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">
            Audit stream linking calls, demos, stage changes, and proposal deliveries across lead
            pipelines.
          </p>
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company, contact, rep..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pr-4 pl-9 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      <div className="mt-4 flex scrollbar-none flex-wrap gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`py-0.2 rounded-full px-1.5 text-[10px] ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-sm font-black text-slate-700">No matching activities found</h3>
            <p className="mt-1 text-xs font-semibold text-slate-400">
              Try changing search criteria or rep filters.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((act) => {
              const Icon = getIconForType(act.type);
              const colorClasses = getColorForType(act.type);
              const isExpanded = expandedId === act.id;

              return (
                <motion.div
                  key={act.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative overflow-hidden rounded-2xl border transition-all ${
                    act.isManagerVerified
                      ? "border-slate-200/80 bg-white hover:border-slate-300"
                      : "border-indigo-200/90 bg-indigo-50/20 hover:border-indigo-300"
                  }`}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div className="flex items-start gap-3.5">
                        <div className="relative shrink-0">
                          <Image
                            src={act.salesPersonAvatar}
                            alt={act.salesPerson}
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-2xl object-cover shadow-2xs ring-2 ring-white"
                          />
                          <div
                            className={`absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-lg border bg-white ${colorClasses}`}
                          >
                            <Icon className="h-3 w-3" />
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-slate-900">
                              {act.salesPerson}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="flex items-center gap-1 text-xs font-bold text-slate-600">
                              <Building2 className="h-3.5 w-3.5 text-slate-400" />
                              {act.companyName} ({act.contactPerson})
                            </span>
                          </div>

                          <h3 className="mt-1 text-sm leading-snug font-black text-slate-800">
                            {act.title}
                          </h3>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-extrabold text-slate-700">
                              {act.outcome}
                            </span>
                            <span className="rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-extrabold text-purple-700">
                              Stage: {act.stage}
                            </span>
                            {getSentimentBadge(act.sentiment)}
                            {act.dealValue !== undefined && act.dealValue > 0 && (
                              <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-black text-emerald-800">
                                ₹{act.dealValue.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                          <Clock className="h-3.5 w-3.5" />
                          {act.timestamp}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleManagerReview(act.id)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold transition-all ${
                              act.isManagerVerified
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            }`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {act.isManagerVerified ? "Audit Verified" : "Needs Review"}
                          </button>

                          <button
                            onClick={() => setExpandedId(isExpanded ? null : act.id)}
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 border-t border-slate-100 pt-4"
                      >
                        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
                          <h4 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                            Activity Notes & Interaction Record
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed font-semibold text-slate-700">
                            {act.description}
                          </p>

                          {act.duration && (
                            <div className="mt-3 flex items-center gap-4 text-xs font-extrabold text-slate-500">
                              <span>Duration: {act.duration}</span>
                              <span>Lead ID: {act.leadId}</span>
                            </div>
                          )}

                          <div className="mt-4 border-t border-slate-200/60 pt-3">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                                <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
                                Manager Audit Note
                              </span>
                              {editingNoteId !== act.id && (
                                <button
                                  onClick={() => {
                                    setEditingNoteId(act.id);
                                    setNoteInput(act.managerNotes || "");
                                  }}
                                  className="text-xs font-bold text-indigo-600 hover:underline"
                                >
                                  {act.managerNotes ? "Edit Note" : "+ Add Note"}
                                </button>
                              )}
                            </div>

                            {editingNoteId === act.id ? (
                              <div className="mt-2 space-y-2">
                                <textarea
                                  value={noteInput}
                                  onChange={(e) => setNoteInput(e.target.value)}
                                  placeholder="Add audit note for review meeting..."
                                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                                  rows={2}
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setEditingNoteId(null)}
                                    className="rounded-lg px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-200"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveNote(act.id)}
                                    className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-700"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            ) : act.managerNotes ? (
                              <div className="mt-2 rounded-lg border border-purple-200/80 bg-purple-50/60 p-3 text-xs font-bold text-purple-900">
                                &quot;{act.managerNotes}&quot;
                              </div>
                            ) : (
                              <p className="mt-1 text-xs font-medium text-slate-400 italic">
                                No manager audit note added yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
