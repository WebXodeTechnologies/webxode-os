"use client";

import React, { useState } from "react";
import { CalendarClock, Plus, X, Calendar, Clock, Target, User } from "lucide-react";
import { toast } from "@/lib/toast";

interface FollowUpTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (taskData: any) => void;
}

export function FollowUpTaskModal({ isOpen, onClose, onSaveTask }: FollowUpTaskModalProps) {
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  const [taskType, setTaskType] = useState("Call");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("2026-10-14");
  const [dueTime, setDueTime] = useState("11:30 AM");
  const [priority, setPriority] = useState("High");
  const [stage, setStage] = useState("Discovery Call");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !title.trim()) return;

    onSaveTask({
      contactName,
      company: company || "Client Business",
      taskType,
      title,
      dueDate: `${dueDate} at ${dueTime}`,
      priority,
      stage,
      status: "Pending",
    });

    onClose();
    setContactName("");
    setCompany("");
    setTitle("");
    toast.success("Follow-up Task Scheduled", {
      description: `Task for ${contactName} scheduled on ${dueDate}.`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <CalendarClock className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Schedule Follow-up Task</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Client / Contact Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Murugan P."
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Annai Agro Tradings"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Follow-up Task Action *</label>
            <input
              type="text"
              required
              placeholder="e.g. Follow up on SOW estimate & final pricing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Follow-up Type</label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              >
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Demo Meeting">Demo Meeting</option>
                <option value="SOW Review">SOW Review</option>
                <option value="Contract Signature">Contract Signature</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Due Time</label>
              <input
                type="text"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Lead Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            >
              <option value="New Lead">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Discovery Call">Discovery Call</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Contract Negotiation">Contract Negotiation</option>
              <option value="Closed Won">Closed Won (Dev Phase)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
            >
              Save Follow-up Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
