"use client";

import React, { useState } from "react";
import { CheckCircle2, Plus, Calendar } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface LeadTaskChecklistProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, dueDate: string) => void;
}

export function LeadTaskChecklist({ tasks, onToggleTask, onAddTask }: LeadTaskChecklistProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    onAddTask(newTaskTitle, newDueDate || "2026-10-15");
    setNewTaskTitle("");
    setNewDueDate("");
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-slate-900">
            Task Management & Requirement Checklists
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            Track calls, emails, non-technical demos, and requirement milestones
          </p>
        </div>
        <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
          {tasks.filter((t) => t.completed).length} / {tasks.length} Completed
        </span>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3.5 transition hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2
                className={`h-5 w-5 ${task.completed ? "text-emerald-600" : "text-slate-300"}`}
              />
              <span
                className={`text-xs font-bold ${task.completed ? "text-slate-400 line-through" : "text-slate-800"}`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>{task.dueDate}</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add new task (e.g. Follow-up call regarding GST requirement)..."
          className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
}
