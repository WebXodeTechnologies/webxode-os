"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckSquare,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  PhoneCall,
  Mail,
  Calendar,
  UserCheck,
  FileText,
  Filter,
  X,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientTasksTabProps {
  lead?: any;
}

export function ClientTasksTab({ lead }: ClientTasksTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [activeStatus, setActiveStatus] = useState<"All" | "Pending" | "Closed" | "Expired">(
    "Pending"
  );
  const [search, setSearch] = useState("");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: "TSK-801",
      title: "Schedule SOW Scope Alignment Call with Lead Dev",
      category: "Call",
      dueDate: "12 Oct 2026",
      status: "Pending",
      priority: "High",
      assignee: "Akash S M",
      isExpired: false,
    },
    {
      id: "TSK-802",
      title: "Send GST Invoice Draft ₹2,50,000 for milestone 1",
      category: "Email",
      dueDate: "08 Oct 2026",
      status: "Expired",
      priority: "High",
      assignee: "Priya R",
      isExpired: true,
    },
    {
      id: "TSK-803",
      title: "Conduct non-technical feature demo call",
      category: "Meeting",
      dueDate: "05 Oct 2026",
      status: "Closed",
      priority: "Medium",
      assignee: "Akash S M",
      isExpired: false,
    },
    {
      id: "TSK-804",
      title: "Follow up on Master SLA Signature",
      category: "Follow-up",
      dueDate: "14 Oct 2026",
      status: "Pending",
      priority: "Medium",
      assignee: "Vikram Mehta",
      isExpired: false,
    },
    {
      id: "TSK-805",
      title: "Collect initial deposit ₹1,00,000 via NEFT",
      category: "Payment",
      dueDate: "01 Oct 2026",
      status: "Expired",
      priority: "High",
      assignee: "Priya R",
      isExpired: true,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    category: "Call",
    dueDate: "2026-10-18",
    priority: "Medium",
    assignee: "Akash S M",
  });

  const handleToggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "Closed" ? "Pending" : "Closed";
          toast.success(nextStatus === "Closed" ? "Task Marked Complete!" : "Task Re-opened", {
            description: t.title,
          });
          return { ...t, status: nextStatus, isExpired: false };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.info("Task Deleted");
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const added = {
      id: `TSK-${Math.floor(806 + Math.random() * 90)}`,
      title: newTask.title,
      category: newTask.category,
      dueDate: newTask.dueDate,
      status: "Pending",
      priority: newTask.priority,
      assignee: newTask.assignee,
      isExpired: false,
    };

    setTasks((prev) => [added, ...prev]);
    setShowAddTaskModal(false);
    setNewTask({
      title: "",
      category: "Call",
      dueDate: "2026-10-18",
      priority: "Medium",
      assignee: "Akash S M",
    });
    toast.success("Task Created", {
      description: `Task "${added.title}" added to client schedule.`,
    });
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus =
      activeStatus === "All" ||
      (activeStatus === "Pending" && t.status === "Pending") ||
      (activeStatus === "Closed" && t.status === "Closed") ||
      (activeStatus === "Expired" && (t.status === "Expired" || t.isExpired));
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const expiredCount = tasks.filter((t) => t.status === "Expired" || t.isExpired).length;
  const closedCount = tasks.filter((t) => t.status === "Closed").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Header & KPI Summary */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-2xs">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">LeadSquared Task Management</h2>
              <p className="text-xs font-semibold text-slate-500">
                Track pending, closed, and expired follow-ups for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddTaskModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-98"
          >
            <Plus className="h-4 w-4" /> Add Lead Task
          </button>
        </div>

        {/* LeadSquared KPI Bar */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <div
            onClick={() => setActiveStatus("All")}
            className="cursor-pointer rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition hover:bg-white hover:shadow-sm"
          >
            <div className="text-xs font-bold text-slate-500">Total Tasks</div>
            <div className="mt-1 text-2xl font-black text-slate-900">{tasks.length}</div>
          </div>
          <div
            onClick={() => setActiveStatus("Pending")}
            className="cursor-pointer rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 transition hover:bg-white hover:shadow-sm"
          >
            <div className="text-xs font-bold text-amber-800">Pending Tasks</div>
            <div className="mt-1 text-2xl font-black text-amber-600">{pendingCount}</div>
          </div>
          <div
            onClick={() => setActiveStatus("Expired")}
            className="cursor-pointer rounded-2xl border border-rose-200 bg-rose-50/70 p-3.5 transition hover:bg-white hover:shadow-sm"
          >
            <div className="text-xs font-bold text-rose-800">Expired / Overdue</div>
            <div className="mt-1 text-2xl font-black text-rose-600">{expiredCount}</div>
          </div>
          <div
            onClick={() => setActiveStatus("Closed")}
            className="cursor-pointer rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 transition hover:bg-white hover:shadow-sm"
          >
            <div className="text-xs font-bold text-emerald-800">Completed</div>
            <div className="mt-1 text-2xl font-black text-emerald-600">{closedCount}</div>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {(["Pending", "Expired", "Closed", "All"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setActiveStatus(st)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeStatus === st
                    ? st === "Expired"
                      ? "bg-rose-600 text-white shadow-2xs"
                      : st === "Pending"
                        ? "bg-amber-500 text-white shadow-2xs"
                        : st === "Closed"
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-slate-900 text-white shadow-2xs"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative min-w-56">
            <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Task Cards Container */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <div className="flex h-36 flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 text-xs font-semibold text-slate-400">
              No tasks found for status &quot;{activeStatus}&quot;.
            </div>
          ) : (
            filteredTasks.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className={`flex flex-col justify-between gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-center ${
                  t.status === "Closed"
                    ? "border-slate-200/60 bg-slate-50/50 opacity-70"
                    : t.status === "Expired" || t.isExpired
                      ? "border-rose-200 bg-rose-50/40"
                      : "border-slate-200/80 bg-white shadow-2xs hover:border-indigo-200"
                }`}
              >
                <div className="flex min-w-0 items-start gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggleTaskStatus(t.id)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition ${
                      t.status === "Closed"
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white hover:border-indigo-600"
                    }`}
                  >
                    {t.status === "Closed" && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-extrabold text-indigo-600">
                        {t.id}
                      </span>
                      <span
                        className={`text-sm font-extrabold ${
                          t.status === "Closed" ? "text-slate-400 line-through" : "text-slate-900"
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" /> Due: {t.dueDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <UserCheck className="h-3.5 w-3.5 text-slate-400" /> Assignee: {t.assignee}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                      t.status === "Expired" || t.isExpired
                        ? "border border-rose-200 bg-rose-100 text-rose-700"
                        : t.status === "Closed"
                          ? "border border-emerald-200 bg-emerald-100 text-emerald-700"
                          : "border border-amber-200 bg-amber-100 text-amber-700"
                    }`}
                  >
                    {t.status === "Expired" || t.isExpired ? "Expired" : t.status}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleTaskStatus(t.id)}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      {t.status === "Closed" ? "Re-open" : "Complete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(t.id)}
                      className="rounded-lg p-1.5 text-slate-400 transition hover:text-rose-600"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Add LeadSquared Task</h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Task Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule Product Demo & Requirement Discovery"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  >
                    <option value="Call">Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Email">Email</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Payment">Payment Collection</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
