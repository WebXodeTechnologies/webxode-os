"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TeamMemberWorkItem } from "@/modules/projects/workflow.types";
import {
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  ArrowUpRight,
  Send,
} from "lucide-react";

interface ProjectTeamActivityTrackerProps {
  teamMembers: TeamMemberWorkItem[];
  onOpenUpdateModal: (member?: TeamMemberWorkItem) => void;
  onSelectNodeById?: (nodeId: string) => void;
}

export function ProjectTeamActivityTracker({
  teamMembers,
  onOpenUpdateModal,
  onSelectNodeById,
}: ProjectTeamActivityTrackerProps) {
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(
    teamMembers[0]?.id || null
  );

  const toggleExpand = (id: string) => {
    setExpandedMemberId((prev) => (prev === id ? null : id));
  };

  const getStatusBadge = (status: TeamMemberWorkItem["status"]) => {
    switch (status) {
      case "active":
        return {
          label: "Active Executing",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "reviewing":
        return {
          label: "Awaiting Review",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500 animate-pulse",
        };
      case "blocked":
        return {
          label: "Blocked",
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          dot: "bg-rose-500 animate-ping",
        };
      case "completed":
        return {
          label: "Milestone Delivered",
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };
      default:
        return {
          label: "Idle",
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          dot: "bg-slate-400",
        };
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    if (role.includes("Manager")) return "bg-purple-50 text-purple-700 border-purple-200";
    if (role.includes("Tech Lead")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
    if (role.includes("Designer")) return "bg-pink-50 text-pink-700 border-pink-200";
    if (role.includes("Frontend")) return "bg-sky-50 text-sky-700 border-sky-200";
    if (role.includes("Backend")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (role.includes("DevOps")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (role.includes("QA")) return "bg-teal-50 text-teal-700 border-teal-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-black text-slate-900">
              Cross-Functional Team Activity & Work Updations
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Person-by-person deliverable tracking: developers & designers report work directly to PM
            and Tech Leads
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenUpdateModal()}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-indigo-600"
        >
          <Send className="h-3.5 w-3.5" />
          <span>+ Submit Work Update</span>
        </button>
      </div>

      {/* Grid of Team Members Activity Cards */}
      <div className="grid grid-cols-1 gap-4">
        {teamMembers.map((member) => {
          const isExpanded = expandedMemberId === member.id;
          const statusConfig = getStatusBadge(member.status);
          const roleStyle = getRoleBadgeStyle(member.role);

          return (
            <div
              key={member.id}
              className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                isExpanded
                  ? "border-indigo-300 shadow-sm ring-2 ring-indigo-500/10"
                  : "border-slate-200/80 shadow-2xs hover:border-slate-300"
              }`}
            >
              {/* Card Primary Header */}
              <div
                onClick={() => toggleExpand(member.id)}
                className="flex cursor-pointer flex-col justify-between gap-4 p-5 lg:flex-row lg:items-center"
              >
                {/* Person details */}
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-2 ring-slate-100">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-black text-slate-900">{member.name}</h4>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${roleStyle}`}
                      >
                        {member.role}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                        {member.allocationPercent}% Allocated
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>{member.email}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium text-slate-600">
                        <Clock className="h-3 w-3 text-slate-400" />
                        Updated {member.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Active Deliverable & Status */}
                <div className="flex flex-1 flex-col justify-end gap-2 lg:max-w-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="max-w-70 truncate font-bold text-slate-700">
                      {member.currentTaskTitle}
                    </span>
                    <span className="font-mono font-black text-slate-900">{member.progress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        member.progress === 100
                          ? "bg-emerald-500"
                          : member.status === "blocked"
                            ? "bg-rose-500"
                            : member.status === "reviewing"
                              ? "bg-amber-500"
                              : "bg-indigo-600"
                      }`}
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-500">
                      Phase: <strong className="text-slate-700">{member.currentPhase}</strong>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-bold ${statusConfig.bg}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Quick actions & Toggle */}
                <div className="flex items-center gap-2 border-t border-slate-100 pt-2 lg:border-t-0 lg:pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenUpdateModal(member);
                    }}
                    className="flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Log Work</span>
                  </button>

                  {onSelectNodeById && member.currentNodeId && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectNodeById(member.currentNodeId);
                      }}
                      className="flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900"
                      title="Inspect Assigned Node in Graph"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Inspect Node</span>
                    </button>
                  )}

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Work Logs Stream */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-100 bg-slate-50/60 p-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                          Direct Activity Log & Deliverables Stream ({member.recentWorkLogs.length})
                        </h5>
                        <span className="text-xs font-semibold text-slate-500">
                          Direct reporting to PM & Lead
                        </span>
                      </div>

                      {member.recentWorkLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-500">
                                {log.date} • {log.time}
                              </span>
                              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                                Reported to:{" "}
                                <strong className="text-slate-900">{log.reportedTo}</strong>
                              </span>
                              {log.isApproved ? (
                                <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                  Lead Sign-Off Approved
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
                                  <Clock className="h-3 w-3 text-amber-600" />
                                  Pending Lead Review
                                </span>
                              )}
                            </div>
                            <p className="text-xs leading-relaxed font-medium text-slate-800">
                              {log.summary}
                            </p>
                          </div>

                          {log.deliverableUrl && (
                            <a
                              href={log.deliverableUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                            >
                              <span>View Deliverable</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
