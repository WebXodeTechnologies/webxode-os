"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  GitPullRequest,
  GitBranch,
  AlertOctagon,
  Clock,
  CheckCircle2,
  MoreVertical,
  Sparkles,
  ShieldAlert,
  Terminal,
  Palette,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { TaskItem, TaskStatus } from "@/modules/tasks/task.types";

interface TaskCardProps {
  task: TaskItem;
  onOpenDetails: (task: TaskItem) => void;
  onMoveStatus: (taskId: string, newStatus: TaskStatus) => void;
  onToggleBlocker?: (taskId: string) => void;
}

export function TaskCard({ task, onOpenDetails, onMoveStatus, onToggleBlocker }: TaskCardProps) {
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Status progression map for IT Kanban
  const statusFlow: TaskStatus[] = [
    "backlog",
    "todo",
    "in_progress",
    "in_review",
    "blocked",
    "done",
  ];
  const currentIndex = statusFlow.indexOf(task.status);
  const nextStatus = currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
  const prevStatus = currentIndex > 0 ? statusFlow[currentIndex - 1] : null;

  // Type styling & icon
  const getTypeBadge = (type: TaskItem["type"]) => {
    switch (type) {
      case "bug":
        return {
          icon: <span className="h-2 w-2 rounded-full bg-rose-500" />,
          label: "Bug",
          color: "bg-rose-50 text-rose-700 border-rose-200",
        };
      case "security":
        return {
          icon: <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />,
          label: "Security",
          color: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "devops":
        return {
          icon: <Terminal className="h-3.5 w-3.5 text-purple-600" />,
          label: "DevOps",
          color: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "design":
        return {
          icon: <Palette className="h-3.5 w-3.5 text-pink-600" />,
          label: "UI/UX",
          color: "bg-pink-50 text-pink-700 border-pink-200",
        };
      case "feature":
        return {
          icon: <Sparkles className="h-3.5 w-3.5 text-indigo-600" />,
          label: "Feature",
          color: "bg-indigo-50 text-indigo-700 border-indigo-200",
        };
      default:
        return {
          icon: <span className="h-2 w-2 rounded-full bg-slate-400" />,
          label: type,
          color: "bg-slate-50 text-slate-700 border-slate-200",
        };
    }
  };

  const getPriorityStyle = (priority: TaskItem["priority"]) => {
    switch (priority) {
      case "critical":
        return {
          dot: "bg-rose-500 animate-pulse",
          text: "text-rose-700 bg-rose-50 border-rose-200",
          label: "Critical",
        };
      case "high":
        return {
          dot: "bg-amber-500",
          text: "text-amber-700 bg-amber-50 border-amber-200",
          label: "High",
        };
      case "medium":
        return {
          dot: "bg-sky-500",
          text: "text-sky-700 bg-sky-50 border-sky-200",
          label: "Medium",
        };
      default:
        return {
          dot: "bg-slate-400",
          text: "text-slate-600 bg-slate-50 border-slate-200",
          label: "Low",
        };
    }
  };

  const typeInfo = getTypeBadge(task.type);
  const priorityInfo = getPriorityStyle(task.priority);

  // Subtask progress
  const totalSubtasks = task.subtasks?.length || 0;
  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length || 0;
  const subtaskProgress =
    totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // HTML5 Drag handler
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <motion.div
      layout
      layoutId={task.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      draggable
      onDragStartCapture={(e: React.DragEvent) => handleDragStart(e)}
      className={`group relative flex cursor-grab flex-col justify-between rounded-2xl border bg-white p-4 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-md active:cursor-grabbing ${
        task.isBlocked || task.status === "blocked"
          ? "border-rose-300/90 bg-rose-50/30"
          : "border-slate-200/90"
      }`}
    >
      <div>
        {/* Top Header: Code, Type, Priority, Menu */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-md border border-slate-200/80 bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold tracking-tight text-slate-700">
              {task.taskCode}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-bold ${typeInfo.color}`}
            >
              {typeInfo.icon}
              <span>{typeInfo.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-bold ${priorityInfo.text}`}
            >
              <span className={`h-2 w-2 rounded-full ${priorityInfo.dot}`} />
              <span>{priorityInfo.label}</span>
            </span>

            {/* Quick Action Three Dots */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickMenu(!showQuickMenu);
                }}
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800"
                title="Quick options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {showQuickMenu && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-7 right-0 z-30 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 text-xs font-semibold text-slate-700 shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuickMenu(false);
                      onOpenDetails(task);
                    }}
                    className="w-full rounded-xl px-3 py-2 text-left font-bold transition-colors hover:bg-slate-50 hover:text-indigo-600"
                  >
                    Open Details
                  </button>

                  {nextStatus && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onMoveStatus(task.id, nextStatus);
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-bold transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <span>Advance Status</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {prevStatus && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onMoveStatus(task.id, prevStatus);
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-medium transition-colors hover:bg-slate-50"
                    >
                      <span>Move Back</span>
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {onToggleBlocker && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onToggleBlocker(task.id);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left font-bold text-rose-600 transition-colors hover:bg-rose-50"
                    >
                      {task.isBlocked ? "Clear Blocker" : "Flag as Blocker"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project & Client Pill */}
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <span className="max-w-37.5 truncate">{task.clientName}</span>
          <span>•</span>
          <span className="max-w-35 truncate font-bold text-slate-700">{task.projectName}</span>
        </div>

        {/* Task Title - Clear, Legible Size */}
        <h4
          onClick={() => onOpenDetails(task)}
          className="mt-2 line-clamp-2 cursor-pointer text-sm leading-snug font-bold text-slate-900 transition-colors group-hover:text-indigo-600"
        >
          {task.title}
        </h4>

        {/* Brief description for quick context */}
        {task.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed font-medium text-slate-500">
            {task.description}
          </p>
        )}

        {/* Blocker Alert Box */}
        {(task.isBlocked || task.status === "blocked") && task.blockedReason && (
          <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50/90 p-2.5 text-xs font-bold text-rose-800">
            <AlertOctagon className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            <span className="line-clamp-2 leading-relaxed">{task.blockedReason}</span>
          </div>
        )}

        {/* Subtask Progress Bar */}
        {totalSubtasks > 0 && (
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {completedSubtasks}/{totalSubtasks} subtasks
                </span>
              </span>
              <span>{subtaskProgress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  subtaskProgress === 100 ? "bg-emerald-500" : "bg-indigo-600"
                }`}
                style={{ width: `${subtaskProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Git Branch & PR Badges */}
        {(task.pullRequest || task.gitBranch) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {task.pullRequest && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 font-mono text-xs font-bold ${
                  task.pullRequest.status === "merged"
                    ? "border-purple-200 bg-purple-50 text-purple-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                <GitPullRequest className="h-3 w-3" />
                <span>PR #{task.pullRequest.number}</span>
              </span>
            )}

            {task.gitBranch && (
              <span className="inline-flex max-w-40 items-center gap-1.5 truncate rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs font-semibold text-slate-600">
                <GitBranch className="h-3 w-3 text-slate-400" />
                <span className="truncate">{task.gitBranch}</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer: Assignee, Story Points, Due Date */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        {/* Assignee Avatar with Status Dot */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={task.assignee.avatar}
              alt={task.assignee.name}
              width={28}
              height={28}
              title={`Assigned to ${task.assignee.name} (${task.assignee.role})`}
              className="h-7 w-7 rounded-full border border-slate-200 object-cover"
            />
            <span
              className={`absolute right-0 bottom-0 h-2 w-2 rounded-full border-2 border-white ${
                task.assignee.status === "active"
                  ? "bg-emerald-500"
                  : task.assignee.status === "reviewing"
                    ? "bg-indigo-500"
                    : task.assignee.status === "in-meeting"
                      ? "bg-amber-500"
                      : "bg-slate-300"
              }`}
            />
          </div>

          <span className="max-w-23.75 truncate text-xs font-bold text-slate-800">
            {task.assignee.name.split(" ")[0]}
          </span>
        </div>

        {/* Due Date & Story Points */}
        <div className="flex items-center gap-2">
          {/* Comments count */}
          {task.comments && task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
              <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
              <span>{task.comments.length}</span>
            </div>
          )}

          {/* Story Points */}
          <span className="rounded-lg border border-slate-200/80 bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-800">
            {task.storyPoints}pt
          </span>

          {/* Due date */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{task.dueDate.slice(5)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
