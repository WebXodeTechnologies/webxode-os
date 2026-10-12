"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  PhoneCall,
  Video,
  PlayCircle,
  CheckCircle2,
  Calendar,
  Clock,
  ExternalLink,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { MeetingCallLog, Developer } from "@/modules/tasks/task.types";

interface TaskMeetingLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetings: MeetingCallLog[];
  onToggleActionItem: (meetingId: string, actionId: string) => void;
  onLogMeeting: (meeting: Partial<MeetingCallLog>) => void;
  developers: Developer[];
}

export function TaskMeetingLogsModal({
  isOpen,
  onClose,
  meetings,
  onToggleActionItem,
  onLogMeeting,
  developers,
}: TaskMeetingLogsModalProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [isLoggingNew, setIsLoggingNew] = useState(false);

  // New Meeting Form state
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<MeetingCallLog["type"]>("Client Sync");
  const [newClient, setNewClient] = useState("Apex Financial US");
  const [newProject, setNewProject] = useState("Apex Banking Core");
  const [newDuration, setNewDuration] = useState("45m");
  const [newPlatform, setNewPlatform] = useState<MeetingCallLog["platform"]>("Google Meet");
  const [newSummary, setNewSummary] = useState("");
  const [newRelatedCode, setNewRelatedCode] = useState("WX-201");

  if (!isOpen) return null;

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onLogMeeting({
      title: newTitle.trim(),
      type: newType,
      client: newClient,
      project: newProject,
      date: new Date().toISOString().split("T")[0],
      time: "Just Now",
      duration: newDuration,
      platform: newPlatform,
      meetLink: "https://meet.google.com/new-session",
      summary: newSummary.trim() || "Sprint architectural and client synchronization notes.",
      attendees: developers.slice(0, 3).map((d) => ({
        name: d.name,
        role: d.role,
        avatar: d.avatar,
      })),
      actionItems: [
        {
          id: `act-${Date.now()}`,
          text: "Follow up on client review points",
          done: false,
          owner: developers[0]?.name || "Lead",
        },
      ],
      relatedTaskCode: newRelatedCode.trim() || undefined,
    });

    setIsLoggingNew(false);
    setNewTitle("");
    setNewSummary("");
  };

  const meetingTypes = [
    "All",
    "Client Sync",
    "Daily Standup",
    "Architecture Review",
    "Sprint Planning",
  ];

  const filteredMeetings = meetings.filter((m) => {
    if (selectedType === "All") return true;
    return m.type === selectedType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-2xs">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 sm:text-lg">
                Meeting & Client Call Logs
              </h3>
              <p className="text-xs text-slate-500">
                Transcripts, technical action items, and client synchronization history
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsLoggingNew(!isLoggingNew)}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-indigo-700 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>{isLoggingNew ? "View Logs" : "Log Call Notes"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        {!isLoggingNew && (
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-white px-6 py-3">
            {meetingTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                  selectedType === type
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-6 sm:p-7">
          {isLoggingNew ? (
            /* Log New Meeting Form */
            <form onSubmit={handleCreateMeeting} className="space-y-4.5">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
                <h4 className="text-sm font-black tracking-wider text-indigo-950 uppercase">
                  Document IT Client Call or Engineering Standup
                </h4>
                <p className="mt-1 text-xs text-indigo-800">
                  Records will be linked to sprint audit trails and related Kanban deliverables.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-700">Meeting Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Apex Bank Architecture Review on Latency"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Meeting Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as MeetingCallLog["type"])}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Client Sync">Client Sync</option>
                    <option value="Daily Standup">Daily Standup</option>
                    <option value="Architecture Review">Architecture Review</option>
                    <option value="Sprint Planning">Sprint Planning</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Client</label>
                  <input
                    type="text"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Project / Sprint</label>
                  <input
                    type="text"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Duration & Platform</label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      placeholder="45m"
                      className="w-24 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                    />
                    <select
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value as MeetingCallLog["platform"])}
                      className="flex-1 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Google Meet">Google Meet</option>
                      <option value="Zoom">Zoom</option>
                      <option value="Teams">Teams</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">
                  Discussion Summary & Takeaways
                </label>
                <textarea
                  rows={4}
                  required
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Record core decisions, client agreements, technical blockers discussed..."
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">
                  Related Task Code (e.g. WX-201)
                </label>
                <input
                  type="text"
                  value={newRelatedCode}
                  onChange={(e) => setNewRelatedCode(e.target.value)}
                  className="mt-1 w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-3 font-mono text-sm text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsLoggingNew(false)}
                  className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  Save Call Log
                </button>
              </div>
            </form>
          ) : (
            /* Meeting Logs List */
            <div className="space-y-4.5">
              {filteredMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="space-y-3.5 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:border-slate-300"
                >
                  {/* Top Bar: Title & Badges */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-800">
                          {meeting.type}
                        </span>
                        {meeting.client && (
                          <span className="text-xs font-bold text-slate-900 sm:text-sm">
                            {meeting.client}
                          </span>
                        )}
                        {meeting.relatedTaskCode && (
                          <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 font-mono text-xs font-bold text-indigo-700">
                            {meeting.relatedTaskCode}
                          </span>
                        )}
                      </div>
                      <h4 className="mt-1.5 text-base font-black text-slate-900">
                        {meeting.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{meeting.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{meeting.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/90 p-4 text-sm leading-relaxed font-normal text-slate-800">
                    {meeting.summary}
                  </div>

                  {/* Action Items Checklist */}
                  {meeting.actionItems && meeting.actionItems.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-black tracking-wider text-slate-400 uppercase">
                        Action Items & Deliverables:
                      </span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {meeting.actionItems.map((act) => (
                          <div
                            key={act.id}
                            onClick={() => onToggleActionItem(meeting.id, act.id)}
                            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 text-sm transition-all ${
                              act.done
                                ? "border-emerald-200 bg-emerald-50/40 text-slate-400 line-through"
                                : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border ${
                                  act.done
                                    ? "border-emerald-500 bg-emerald-500 text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {act.done && <CheckCircle2 className="h-3.5 w-3.5" />}
                              </div>
                              <span className="font-semibold">{act.text}</span>
                            </div>
                            <span className="ml-2 shrink-0 text-xs font-extrabold text-slate-500">
                              @{act.owner}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Footer: Attendees & Recording */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-sm">
                    {/* Attendees Facepile */}
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-slate-500">Attendees:</span>
                      <div className="flex -space-x-1.5">
                        {meeting.attendees.map((att, idx) => (
                          <Image
                            key={idx}
                            src={att.avatar}
                            alt={att.name}
                            width={28}
                            height={28}
                            title={`${att.name} (${att.role})`}
                            className="h-7 w-7 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2.5">
                      {meeting.recordingUrl && (
                        <a
                          href={meeting.recordingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 transition-colors hover:bg-purple-100 sm:text-sm"
                        >
                          <PlayCircle className="h-4 w-4" />
                          <span>Watch Recording</span>
                        </a>
                      )}

                      <a
                        href={meeting.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 sm:text-sm"
                      >
                        <Video className="h-4 w-4 text-sky-600" />
                        <span>{meeting.platform} Link</span>
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMeetings.length === 0 && (
                <div className="py-16 text-center text-sm font-semibold text-slate-400">
                  No meeting logs match this filter
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
