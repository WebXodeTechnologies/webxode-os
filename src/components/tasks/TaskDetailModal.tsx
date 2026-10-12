"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  GitBranch,
  GitPullRequest,
  AlertOctagon,
  CheckCircle2,
  Send,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { TaskItem, TaskStatus, Developer } from "@/modules/tasks/task.types";

interface TaskDetailModalProps {
  task: TaskItem | null;
  onClose: () => void;
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onAddComment: (taskId: string, commentText: string) => void;
  onToggleBlocker: (taskId: string, reason?: string) => void;
  developers: Developer[];
}

export function TaskDetailModal({
  task,
  onClose,
  onUpdateStatus,
  onToggleSubtask,
  onAddSubtask,
  onAddComment,
  onToggleBlocker,
}: TaskDetailModalProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  if (!task) return null;

  const handleSubtaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    onAddSubtask(task.id, newSubtaskTitle.trim());
    setNewSubtaskTitle("");
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(task.id, newCommentText.trim());
    setNewCommentText("");
  };

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "backlog", label: "Product Backlog" },
    { value: "todo", label: "Sprint Ready" },
    { value: "in_progress", label: "In Development" },
    { value: "in_review", label: "Code Review & QA" },
    { value: "blocked", label: "Blocked / Impediment" },
    { value: "done", label: "Done & Shipped" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 font-mono text-sm font-black text-indigo-700">
              {task.taskCode}
            </span>

            {/* Status Dropdown */}
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(task.id, e.target.value as TaskStatus)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="text-xs font-extrabold text-slate-500 uppercase sm:text-sm">
              {task.priority} Priority
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          {/* Title & Client Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
              <span className="font-bold text-slate-900">{task.clientName}</span>
              <span>/</span>
              <span className="font-bold text-indigo-600">{task.projectName}</span>
              <span>/</span>
              <span className="font-medium text-slate-600">{task.team}</span>
            </div>
            <h2 className="mt-2 text-xl leading-snug font-black text-slate-900 sm:text-2xl">
              {task.title}
            </h2>
          </div>

          {/* Blocker Alert Banner */}
          {(task.isBlocked || task.status === "blocked") && (
            <div className="rounded-2xl border border-rose-300 bg-rose-50/90 p-4 text-sm sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                  <div>
                    <h5 className="text-sm font-black text-rose-950">
                      Technical Impediment / Blocker
                    </h5>
                    <p className="mt-1 leading-relaxed font-medium text-rose-800">
                      {task.blockedReason || "Work blocked pending external dependency"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleBlocker(task.id)}
                  className="shrink-0 rounded-xl bg-rose-200/90 px-3 py-1.5 font-bold text-rose-900 transition-colors hover:bg-rose-300"
                >
                  Clear Blocker
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-black tracking-wider text-slate-500 uppercase">
              Specification & Engineering Brief
            </h4>
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 text-sm leading-relaxed font-medium text-slate-800 sm:p-5">
              {task.description}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs sm:grid-cols-4 sm:p-5">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Lead Assignee</span>
              <div className="mt-2 flex items-center gap-2.5">
                <Image
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">{task.assignee.name}</p>
                  <p className="text-xs text-slate-500">{task.assignee.role}</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Reviewer / QA</span>
              <div className="mt-2 flex items-center gap-2.5">
                {task.reviewer ? (
                  <>
                    <Image
                      src={task.reviewer.avatar}
                      alt={task.reviewer.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{task.reviewer.name}</p>
                      <p className="text-xs text-slate-500">{task.reviewer.role}</p>
                    </div>
                  </>
                ) : (
                  <span className="mt-1 block text-sm font-medium text-slate-400">Unassigned</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Story Points & SLA</span>
              <div className="mt-2">
                <p className="text-sm font-bold text-slate-900">{task.storyPoints} Story Points</p>
                <p className="text-xs text-slate-600">
                  Due {task.dueDate} • {task.loggedHours}/{task.estimatedHours} hrs logged
                </p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Git Artifacts</span>
              <div className="mt-2 space-y-1">
                {task.pullRequest ? (
                  <a
                    href={task.pullRequest.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:underline"
                  >
                    <GitPullRequest className="h-4 w-4" />
                    <span>PR #{task.pullRequest.number}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : task.gitBranch ? (
                  <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-700">
                    <GitBranch className="h-3.5 w-3.5 text-slate-400" />
                    <span className="max-w-30 truncate">{task.gitBranch}</span>
                  </span>
                ) : (
                  <span className="text-sm font-medium text-slate-400">No branch linked</span>
                )}
              </div>
            </div>
          </div>

          {/* Subtasks Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-slate-500 uppercase">
              Subtasks & Acceptance Criteria (
              {task.subtasks?.filter((s) => s.completed).length || 0}/{task.subtasks?.length || 0})
            </h4>

            <div className="space-y-2">
              {task.subtasks?.map((subtask) => (
                <div
                  key={subtask.id}
                  onClick={() => onToggleSubtask(task.id, subtask.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 text-sm font-medium transition-all ${
                    subtask.completed
                      ? "border-emerald-200 bg-emerald-50/50 text-slate-400 line-through"
                      : "border-slate-200/90 bg-white text-slate-900 shadow-2xs hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-lg border transition-colors ${
                        subtask.completed
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {subtask.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                    <span>{subtask.title}</span>
                  </div>
                </div>
              ))}

              {/* Add Subtask Input Form */}
              <form onSubmit={handleSubtaskSubmit} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  placeholder="Add acceptance criterion or micro-subtask..."
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Activity Comments & Discussions */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-black tracking-wider text-slate-500 uppercase">
              Technical Discussion & Logs ({task.comments?.length || 0})
            </h4>

            <div className="space-y-3">
              {task.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/90 p-4 text-sm"
                >
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{comment.author.name}</span>
                      <span className="text-xs text-slate-400">{comment.createdAt}</span>
                    </div>
                    <p className="mt-1 leading-relaxed font-normal text-slate-700">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add Comment Box */}
              <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Post comment, architectural decision, or PR note..."
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-2xs transition-colors hover:bg-indigo-700"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={() => onToggleBlocker(task.id)}
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100 sm:text-sm"
          >
            {task.isBlocked ? "Clear Blocker" : "Flag Blocker"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
