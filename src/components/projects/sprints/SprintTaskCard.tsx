"use client";

import React from "react";
import {
  GitPullRequest,
  GitCommit,
  AlertOctagon,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { SprintTaskItem } from "@/modules/projects/project.types";

interface SprintTaskCardProps {
  task: SprintTaskItem;
  onAdvanceStatus?: (taskId: string) => void;
  onToggleBlocker?: (taskId: string) => void;
}

export function SprintTaskCard({ task, onAdvanceStatus, onToggleBlocker }: SprintTaskCardProps) {
  const getRoleTagColor = (role: SprintTaskItem["roleTag"]) => {
    switch (role) {
      case "Frontend":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Backend":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "DevOps":
      case "Cloud":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "UI/UX":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "DevSecOps":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "QA":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: SprintTaskItem["priority"]) => {
    switch (priority) {
      case "Critical":
        return "text-rose-600 bg-rose-50 border-rose-200";
      case "High":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "Medium":
        return "text-sky-600 bg-sky-50 border-sky-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-all hover:border-slate-300 hover:shadow-xs"
    >
      {/* Top Header: ID & Role */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] font-black text-slate-500">{task.taskId}</span>
          <span
            className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold ${getRoleTagColor(
              task.roleTag
            )}`}
          >
            {task.roleTag}
          </span>
        </div>

        <span
          className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h4 className="mt-2 line-clamp-2 text-xs leading-snug font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
          {task.description}
        </p>
      )}

      {/* Git Link or Blocker Warning */}
      {task.isBlocker && (
        <div className="mt-2.5 flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 p-2 text-[10px] font-bold text-rose-700">
          <AlertOctagon className="h-3.5 w-3.5 shrink-0" />
          <span>Blocker: {task.blockerReason || "Technical impediment flagged"}</span>
        </div>
      )}

      {task.prUrl && (
        <a
          href={task.prUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800"
        >
          <GitPullRequest className="h-3 w-3" />
          <span>PR #{task.prUrl.split("/").pop()} Attached</span>
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      )}

      {/* Bottom Footer: Points, Assignee & Advance */}
      <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <div className="flex items-center gap-1.5">
          <div
            title={`${task.assignee} (${task.assigneeRole})`}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[9px] font-bold text-white"
          >
            {task.assignee.charAt(0)}
          </div>
          <span className="text-[10px] font-semibold text-slate-500">
            {task.assignee.split(" ")[0]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-black text-slate-700">
            {task.storyPoints} pts
          </span>

          {onAdvanceStatus && task.status !== "Done" && (
            <button
              type="button"
              onClick={() => onAdvanceStatus(task.id)}
              className="rounded-lg border border-slate-200 p-1 text-slate-400 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              title="Advance to next column"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
