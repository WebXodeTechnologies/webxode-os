"use client";

import React, { useState } from "react";
import {
  X,
  HelpCircle,
  Check,
  Paperclip,
  Mic,
  ChevronDown,
  AlignLeft,
  CalendarDays,
  Flag,
  Users,
  Tag,
  Repeat,
  Type,
  LayoutTemplate,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface TaskActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: any) => void;
  leadId?: string;
  leads?: any[];
}

export function TaskActionModal({
  isOpen,
  onClose,
  onSave,
  leadId,
  leads = [],
}: TaskActionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    relatedTo: leadId || "",
    points: "1 Point",
    status: "To do",
    priority: "",
    type: "Follow-up", // Replaced labels with type/tags
    startDate: "",
    deadline: "",
    recurring: false,
  });

  const TASK_TYPES = ["Follow-up", "Mail", "Demo Call", "Meeting", "Proposal", "Other"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSaveAndShow = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(false);
  };

  const handleSaveClose = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(true);
  };

  const handleSave = (closeAfter: boolean) => {
    if (!formData.title) {
      toast.error("Please enter a Task Title");
      return;
    }
    if (!formData.relatedTo || formData.relatedTo === "-") {
      toast.error("Tasks must be associated with a specific client");
      return;
    }

    onSave({
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      ...formData,
    });

    toast.success("Task assigned successfully!");
    if (closeAfter) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="relative z-50 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-900/5"
        >
          {/* Header Gradient */}
          <div className="relative overflow-hidden bg-linear-to-r from-emerald-950 via-slate-900 to-teal-900 px-8 py-6">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-500/20 blur-[80px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-wide text-white">Create New Task</h2>
                  <p className="mt-1 text-xs font-medium text-emerald-200">
                    WebXode OS • Task Management
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-emerald-100 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent overflow-y-auto bg-slate-50/50 p-8">
            <div className="mx-auto grid max-w-3xl grid-cols-[180px_1fr] items-start gap-y-7">
              {/* Title */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Type className="h-4 w-4 text-emerald-500" /> Task Title
              </div>
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What needs to be done?"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Description */}
              <div className="flex items-start gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <AlignLeft className="mt-0.5 h-4 w-4 text-emerald-500" /> Description
              </div>
              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add detailed description, instructions or context..."
                  rows={4}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Related & Points */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Target className="h-4 w-4 text-emerald-500" /> Context & Effort
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    name="relatedTo"
                    value={formData.relatedTo}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="">-- Select Client --</option>
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.companyName}
                      </option>
                    ))}
                    {!leads.length && leadId && <option value={leadId}>Client: {leadId}</option>}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="relative">
                  <select
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="1 Point">1 Point (Quick)</option>
                    <option value="2 Points">2 Points (Medium)</option>
                    <option value="3 Points">3 Points (Hard)</option>
                    <option value="5 Points">5 Points (Epic)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Priority & Status */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Flag className="h-4 w-4 text-emerald-500" /> Priority & Status
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="To do">Status: To do</option>
                    <option value="In Progress">Status: In Progress</option>
                    <option value="Completed">Status: Completed</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="relative">
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={`w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium shadow-sm transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 ${
                      !formData.priority ? "text-slate-400" : "text-slate-800"
                    }`}
                  >
                    <option value="">Priority: None</option>
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <CalendarDays className="h-4 w-4 text-emerald-500" /> Timeline
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Task Type / Pills */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Tag className="h-4 w-4 text-emerald-500" /> Task Type
              </div>
              <div className="flex flex-wrap gap-2">
                {TASK_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type }))}
                    className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
                      formData.type === type
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Recurring */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Repeat className="h-4 w-4 text-emerald-500" /> Settings
              </div>
              <div className="pt-2">
                <label className="group flex w-fit cursor-pointer items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="recurring"
                      checked={formData.recurring}
                      onChange={handleChange}
                      className="peer hidden"
                    />
                    <div className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-slate-300 bg-white transition-colors group-hover:border-emerald-400 peer-checked:border-emerald-600 peer-checked:bg-emerald-600">
                      <Check
                        className="h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                  <span className="text-[13.5px] font-semibold text-slate-700">
                    Make this a recurring task
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-white px-8 py-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-[13px] font-bold text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
              >
                <Paperclip className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Attach</span>
              </button>
              <button
                type="button"
                className="group flex h-10.5 w-10.5 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
              >
                <Mic className="h-4 w-4 transition-transform group-hover:scale-110" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[14px] font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAndShow}
                className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-[14px] font-bold text-emerald-700 transition hover:bg-emerald-100 hover:shadow-sm"
              >
                Save & view
              </button>
              <button
                type="button"
                onClick={handleSaveClose}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-[14px] font-black text-white shadow-lg shadow-emerald-600/30 transition hover:opacity-90 active:scale-95"
              >
                Create Task
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
