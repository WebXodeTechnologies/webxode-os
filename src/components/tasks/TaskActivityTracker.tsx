"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Activity,
  ArrowRight,
  GitPullRequest,
  AlertOctagon,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { ActivityLogItem } from "@/modules/tasks/task.types";

interface TaskActivityTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityLogItem[];
  onSelectTaskCode?: (taskCode: string) => void;
}

export function TaskActivityTracker({
  isOpen,
  onClose,
  activities,
  onSelectTaskCode,
}: TaskActivityTrackerProps) {
  const [filterType, setFilterType] = useState<string>("all");

  if (!isOpen) return null;

  const getActivityIcon = (type: ActivityLogItem["type"]) => {
    switch (type) {
      case "pr_merged":
        return <GitPullRequest className="h-4 w-4 text-purple-600" />;
      case "blocker_flagged":
        return <AlertOctagon className="h-4 w-4 text-rose-600" />;
      case "meeting_logged":
        return <PhoneCall className="h-4 w-4 text-sky-600" />;
      case "todo_completed":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      default:
        return <ArrowRight className="h-4 w-4 text-indigo-600" />;
    }
  };

  const filteredActivities = activities.filter((act) => {
    if (filterType === "all") return true;
    if (filterType === "status") return act.type === "status_change";
    if (filterType === "git") return act.type === "pr_merged";
    if (filterType === "blockers") return act.type === "blocker_flagged";
    if (filterType === "meetings") return act.type === "meeting_logged";
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-2xs">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Sprint Delivery Audit Trail</h3>
              <p className="text-xs text-slate-500">
                Real-time activity tracking & operational logs
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-white px-6 py-3">
          {[
            { id: "all", label: "All" },
            { id: "status", label: "Workflow" },
            { id: "git", label: "Git & PRs" },
            { id: "blockers", label: "Blockers" },
            { id: "meetings", label: "Calls" },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setFilterType(pill.id)}
              className={`rounded-2xl px-3 py-1 text-xs font-bold transition-all sm:text-sm ${
                filterType === pill.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Activity Timeline List */}
        <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-6">
          <div className="relative ml-4 space-y-7 border-l-2 border-slate-200">
            {filteredActivities.map((act) => (
              <div key={act.id} className="relative pl-7">
                {/* Timeline node icon */}
                <div className="absolute top-0.5 -left-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 shadow-2xs">
                  {getActivityIcon(act.type)}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={act.user.avatar}
                      alt={act.user.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full border border-slate-200 object-cover"
                    />
                    <span className="text-xs font-bold text-slate-900 sm:text-sm">
                      {act.user.name}
                    </span>
                    <span className="text-xs font-medium text-slate-400">• {act.timestamp}</span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                    <span className="font-semibold text-slate-500">{act.action}</span>{" "}
                    <span
                      onClick={() => act.taskCode && onSelectTaskCode?.(act.taskCode)}
                      className={`font-bold text-slate-900 ${
                        act.taskCode ? "cursor-pointer hover:text-indigo-600 hover:underline" : ""
                      }`}
                    >
                      {act.target}
                    </span>
                  </p>

                  {act.taskCode && (
                    <span className="inline-block rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-xs font-bold text-indigo-700">
                      {act.taskCode}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="py-20 text-center text-sm font-semibold text-slate-400">
              No activity logs found for this filter
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
