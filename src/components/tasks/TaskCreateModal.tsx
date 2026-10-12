"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import {
  TaskItem,
  TaskStatus,
  TaskPriority,
  TaskType,
  Developer,
} from "@/modules/tasks/task.types";

interface TaskCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Partial<TaskItem>) => void;
  developers: Developer[];
  initialStatus?: TaskStatus;
}

export function TaskCreateModal({
  isOpen,
  onClose,
  onCreateTask,
  developers,
  initialStatus = "todo",
}: TaskCreateModalProps) {
  const [taskCode, setTaskCode] = useState("WX-285");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("Apex Financial US");
  const [projectName, setProjectName] = useState("Apex Banking Core");
  const [team, setTeam] = useState("FinTech Squad");
  const [assigneeId, setAssigneeId] = useState(developers[0]?.id || "");
  const [reviewerId, setReviewerId] = useState(developers[1]?.id || "");
  const [status, setStatus] = useState<TaskStatus>(initialStatus);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [type, setType] = useState<TaskType>("feature");
  const [storyPoints, setStoryPoints] = useState<number>(5);
  const [estimatedHours, setEstimatedHours] = useState<number>(16);
  const [dueDate, setDueDate] = useState("2026-10-20");
  const [gitBranch, setGitBranch] = useState("");
  const [tagsInput, setTagsInput] = useState("React, API, Architecture");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenAssignee = developers.find((d) => d.id === assigneeId) || developers[0];
    const chosenReviewer = developers.find((d) => d.id === reviewerId);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onCreateTask({
      taskCode,
      title: title.trim(),
      description: description.trim(),
      clientName,
      projectName,
      team,
      assignee: chosenAssignee,
      reviewer: chosenReviewer,
      status,
      priority,
      type,
      storyPoints,
      estimatedHours,
      loggedHours: 0,
      dueDate,
      gitBranch: gitBranch.trim() || undefined,
      tags,
      subtasks: [],
      comments: [],
      attachmentsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-2xs">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 sm:text-lg">
                Create New Deliverable
              </h3>
              <p className="text-xs text-slate-500">
                Log an engineering task, client deliverable, or technical spike
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

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="custom-scrollbar flex-1 space-y-4.5 overflow-y-auto p-6 sm:p-7"
        >
          {/* Row 1: Code & Title */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Ticket Code</label>
              <input
                type="text"
                required
                value={taskCode}
                onChange={(e) => setTaskCode(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs font-bold text-slate-700">Task Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Implement Zero-Downtime Database Migration Pipeline"
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700">
              Technical Brief & Specifications
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context, acceptance criteria, architectural references..."
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Row 2: Client & Project & Squad */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Client</label>
              <select
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Apex Financial US">Apex Financial US</option>
                <option value="MedGlobal Health">MedGlobal Health</option>
                <option value="ProTech Services">ProTech Services</option>
                <option value="Internal Product">Internal Product</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Project Engagement</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Team Squad</label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="FinTech Squad">FinTech Squad</option>
                <option value="SaaS Core">SaaS Core</option>
                <option value="DevSecOps & Cloud">DevSecOps & Cloud</option>
                <option value="Mobile & AI Guild">Mobile & AI Guild</option>
                <option value="UI/UX Design Studio">UI/UX Design Studio</option>
              </select>
            </div>
          </div>

          {/* Row 3: Assignee & Reviewer */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700">Lead Engineer Assignee</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                {developers.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name} ({dev.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Reviewer / QA Lead</label>
              <select
                value={reviewerId}
                onChange={(e) => setReviewerId(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="">No Reviewer (Optional)</option>
                {developers.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name} ({dev.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Column, Priority, Type */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Initial Lane</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="backlog">Product Backlog</option>
                <option value="todo">Sprint Ready</option>
                <option value="in_progress">In Development</option>
                <option value="in_review">Code Review & QA</option>
                <option value="blocked">Blocked / Impediment</option>
                <option value="done">Done & Shipped</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Priority Tier</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical / Blocker</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Deliverable Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="feature">Feature</option>
                <option value="bug">Bug Fix</option>
                <option value="security">Security / Compliance</option>
                <option value="devops">DevOps & Cloud</option>
                <option value="design">UI/UX Design</option>
                <option value="refactor">Architecture Refactor</option>
                <option value="chore">Chore / Spike</option>
              </select>
            </div>
          </div>

          {/* Row 5: Story Points, Hours, Due Date */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Story Points (Fibonacci)</label>
              <select
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value={1}>1 pt (Trivial)</option>
                <option value={2}>2 pts (Small)</option>
                <option value={3}>3 pts (Medium)</option>
                <option value={5}>5 pts (Standard)</option>
                <option value={8}>8 pts (Large)</option>
                <option value={13}>13 pts (Epic / Spike)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Estimated Effort (Hours)</label>
              <input
                type="number"
                min={1}
                max={120}
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">SLA Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 6: Git Branch & Tags */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-700">Git Branch (Optional)</label>
              <input
                type="text"
                placeholder="feat/auth-jwt-rotation"
                value={gitBranch}
                onChange={(e) => setGitBranch(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
