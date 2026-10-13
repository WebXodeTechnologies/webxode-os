"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Bell } from "lucide-react";
import { WorkspaceTask, TaskStatus, TaskPriority } from "@/types/tasks";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<WorkspaceTask, "id"> & { id?: string }) => void;
  editingTask?: WorkspaceTask | null;
}

export function NewTaskModal({ isOpen, onClose, onSave, editingTask }: NewTaskModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo" as TaskStatus,
    priority: "Medium" as TaskPriority,
    dueDate: "2026-10-20",
    assignee: "Akash S M",
    isReminder: false,
  });

  useEffect(() => {
    if (editingTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: editingTask.title,
        description: editingTask.description || "",
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
        assignee: editingTask.assignee,
        isReminder: editingTask.isReminder || false,
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "2026-10-20",
        assignee: "Akash S M",
        isReminder: false,
      });
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(editingTask ? { id: editingTask.id } : {}),
      ...form,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-900">
            {editingTask ? "Edit Task / Reminder" : "Create New Task or Reminder"}
          </h3>
          <button type="button" onClick={onClose} className="rounded-xl p-1.5 hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Task Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Follow up on client payment..."
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
              >
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Completed</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Assignee</label>
              <input
                type="text"
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Description / Notes</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Task details..."
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <input
              type="checkbox"
              checked={form.isReminder}
              onChange={(e) => setForm({ ...form, isReminder: e.target.checked })}
              className="h-4 w-4 rounded accent-indigo-600"
            />
            <Bell className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-700">Mark as Reminder notification</span>
          </label>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
            >
              <Save className="h-4 w-4" />
              <span>{editingTask ? "Save Changes" : "Create Task"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
