"use client";

import React, { useState } from "react";
import { X, Plus, AlertOctagon, GitPullRequest } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SprintTaskItem } from "@/modules/projects/project.types";

interface SprintNewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Partial<SprintTaskItem>) => void;
  initialStatus?: SprintTaskItem["status"];
}

export function SprintNewTaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialStatus = "Backlog",
}: SprintNewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roleTag, setRoleTag] = useState<SprintTaskItem["roleTag"]>("Frontend");
  const [priority, setPriority] = useState<SprintTaskItem["priority"]>("Medium");
  const [status, setStatus] = useState<SprintTaskItem["status"]>(initialStatus);
  const [assignee, setAssignee] = useState("Alex Rivera");
  const [storyPoints, setStoryPoints] = useState(3);
  const [estimatedHours, setEstimatedHours] = useState(8);
  const [prUrl, setPrUrl] = useState("");
  const [isBlocker, setIsBlocker] = useState(false);
  const [blockerReason, setBlockerReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      id: `task_${Date.now()}`,
      taskId: `T-${Math.floor(100 + Math.random() * 900)}`,
      title,
      description,
      roleTag,
      priority,
      status,
      assignee,
      assigneeRole: roleTag === "UI/UX" ? "Designer" : "Engineer",
      storyPoints: Number(storyPoints),
      estimatedHours: Number(estimatedHours),
      prUrl: prUrl.trim() || undefined,
      isBlocker,
      blockerReason: isBlocker ? blockerReason : undefined,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-5">
            <div>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
                Sprint Task Manager
              </span>
              <h3 className="mt-1 text-lg font-black text-slate-900">Create Sprint Task</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div>
              <label className="block text-xs font-bold text-slate-700">Task Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Implement WebSocket reconnection retry loop"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Role Discipline</label>
                <select
                  value={roleTag}
                  onChange={(e) => setRoleTag(e.target.value as any)}
                  className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps & Cloud</option>
                  <option value="UI/UX">UI/UX Design</option>
                  <option value="DevSecOps">DevSecOps</option>
                  <option value="QA">QA Testing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Story Points</label>
                <input
                  type="number"
                  min={1}
                  max={21}
                  value={storyPoints}
                  onChange={(e) => setStoryPoints(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Est. Hours</label>
                <input
                  type="number"
                  min={1}
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Assignee</label>
                <input
                  type="text"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                PR / Commit URL (Optional)
              </label>
              <input
                type="url"
                value={prUrl}
                onChange={(e) => setPrUrl(e.target.value)}
                placeholder="https://github.com/webxode/.../pull/42"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Technical specifications, acceptance criteria, or edge cases..."
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={isBlocker}
                  onChange={(e) => setIsBlocker(e.target.checked)}
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <span className="text-xs font-bold text-slate-700">
                  Flag this task as an Active Blocker
                </span>
              </label>

              {isBlocker && (
                <input
                  type="text"
                  value={blockerReason}
                  onChange={(e) => setBlockerReason(e.target.value)}
                  placeholder="Describe the dependency or blocker impediment..."
                  className="mt-2 w-full rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs text-rose-900 focus:border-rose-500 focus:outline-none"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Task to Sprint</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
