"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  PhoneCall,
  Mail,
  MessageSquare,
  Video,
  TrendingUp,
  Clock,
  Building2,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  MessageSquareQuote,
  HeartHandshake,
  AlertTriangle,
} from "lucide-react";
import { ActivityLogItem, ActionType, ActivitySentiment } from "./types";

interface ActivityTimelineStreamProps {
  logs: ActivityLogItem[];
  onToggleVerification: (id: string) => void;
  onAddManagerNote: (id: string, note: string) => void;
}

export const ActivityTimelineStream: React.FC<ActivityTimelineStreamProps> = ({
  logs,
  onToggleVerification,
  onAddManagerNote,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");

  const getIconForAction = (type: ActionType) => {
    switch (type) {
      case "Call":
        return PhoneCall;
      case "Mail":
        return Mail;
      case "WhatsApp":
        return MessageSquare;
      case "Demo":
        return Video;
      case "Stage Change":
        return TrendingUp;
    }
  };

  const getColorForAction = (type: ActionType) => {
    switch (type) {
      case "Call":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Mail":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "WhatsApp":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Demo":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "Stage Change":
        return "text-amber-600 bg-amber-50 border-amber-200";
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

  const handleSaveNote = (id: string) => {
    if (noteInput.trim()) {
      onAddManagerNote(id, noteInput.trim());
      setEditingNoteId(null);
      setNoteInput("");
      toast.success("Manager audit note saved!", {
        style: {
          borderRadius: "14px",
          background: "#0f172a",
          color: "#fff",
          fontSize: "12px",
          fontWeight: "700",
        },
      });
    }
  };

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center shadow-xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Search className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-black text-slate-800">No activity logs found</h3>
        <p className="mt-1 text-xs font-semibold text-slate-400">
          Try clearing your search query or selecting a different rep or action filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {logs.map((item) => {
          const ActionIcon = getIconForAction(item.actionType);
          const badgeColors = getColorForAction(item.actionType);
          const isExpanded = expandedId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`group relative overflow-hidden rounded-3xl border transition-all ${
                item.isVerified
                  ? "border-slate-200/90 bg-white shadow-xs hover:border-slate-300"
                  : "border-indigo-200/90 bg-indigo-50/20 shadow-xs hover:border-indigo-300"
              }`}
            >
              <div className="p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  {/* Left: Rep Metadata & Interaction Header */}
                  <div className="flex items-start gap-4">
                    {/* Sales Rep Avatar */}
                    <div className="relative shrink-0">
                      <Image
                        src={item.repAvatar}
                        alt={item.repName}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-2xl object-cover shadow-2xs ring-2 ring-white"
                      />
                      <div
                        className={`absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-xl border bg-white ${badgeColors}`}
                      >
                        <ActionIcon className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Content Body */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-black text-slate-900">{item.repName}</span>
                        <span className="text-xs font-bold text-slate-400">({item.repRole})</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-600">
                          <Building2 className="h-3.5 w-3.5 text-slate-400" />
                          {item.clientCompany} ({item.clientContact})
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-base leading-snug font-black text-slate-800">
                        {item.title}
                      </h3>

                      {/* Location & Badges */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-50 px-2.5 py-0.5 text-xs font-extrabold text-slate-700">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          {item.location}
                        </span>
                        <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-extrabold text-slate-800">
                          {item.outcome}
                        </span>
                        {getSentimentBadge(item.sentiment)}
                        {item.dealValueINR !== undefined && item.dealValueINR > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-black text-emerald-800">
                            ₹{item.dealValueINR.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Timestamp & Manager Verification Toggle */}
                  <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {item.timestamp}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleVerification(item.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold transition-all active:scale-95 ${
                          item.isVerified
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {item.isVerified ? "Audit Verified" : "Needs Review"}
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="rounded-xl border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
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

                {/* Expandable Section: Full Interaction Narrative & Audit Notes */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 border-t border-slate-100 pt-4"
                  >
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5">
                      <h4 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                        Detailed Discussion Narrative
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed font-semibold text-slate-700">
                        {item.description}
                      </p>

                      {item.duration && (
                        <div className="mt-3 text-xs font-extrabold text-slate-500">
                          Interaction Duration: {item.duration}
                        </div>
                      )}

                      {/* Manager Audit Note Box */}
                      <div className="mt-4 border-t border-slate-200/60 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <MessageSquareQuote className="h-4 w-4 text-indigo-600" />
                            Manager Audit Feedback Note
                          </span>
                          {editingNoteId !== item.id && (
                            <button
                              onClick={() => {
                                setEditingNoteId(item.id);
                                setNoteInput(item.managerNote || "");
                              }}
                              className="text-xs font-bold text-indigo-600 hover:underline"
                            >
                              {item.managerNote ? "Edit Note" : "+ Add Note"}
                            </button>
                          )}
                        </div>

                        {editingNoteId === item.id ? (
                          <div className="mt-2 space-y-2">
                            <textarea
                              value={noteInput}
                              onChange={(e) => setNoteInput(e.target.value)}
                              placeholder="Write audit feedback note for executive review..."
                              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs font-semibold text-slate-800 shadow-2xs focus:border-indigo-500 focus:outline-hidden"
                              rows={2}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingNoteId(null)}
                                className="rounded-xl px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-200"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNote(item.id)}
                                className="rounded-xl bg-indigo-600 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-700"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        ) : item.managerNote ? (
                          <div className="mt-2 rounded-xl border border-purple-200/80 bg-purple-50/70 p-3 text-xs font-bold text-purple-950">
                            &quot;{item.managerNote}&quot;
                          </div>
                        ) : (
                          <p className="mt-1 text-xs font-medium text-slate-400 italic">
                            No manager audit note recorded.
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
    </div>
  );
};
