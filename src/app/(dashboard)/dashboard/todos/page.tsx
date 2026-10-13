"use client";

import React, { useState } from "react";
import { TaskHeader } from "@/components/to-dos/TaskHeader";
import { KanbanBoardView } from "@/components/to-dos/KanbanBoardView";
import { TaskListView } from "@/components/to-dos/TaskListView";
import { WorkspaceTask, TaskStatus, TaskPriority } from "@/types/tasks";
import { toast } from "react-hot-toast";
import { X, Save, Bell } from "lucide-react";

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<WorkspaceTask | null>(null);

  // Sample operational tasks & reminders
  const [tasks, setTasks] = useState<WorkspaceTask[]>([
    {
      id: "TSK-101",
      title: "Deploy Annai Agro B2B Portal to Production",
      description: "Verify GSTIN validation logic and configure MongoDB indexes.",
      status: "In Progress",
      priority: "Urgent",
      dueDate: "2026-10-15",
      assignee: "Akash S M",
      project: "Annai Agro",
    },
    {
      id: "TSK-102",
      title: "Follow up with Visual Bridge Foundation on Proposal",
      description: "Send revised milestone estimates and AWS deployment roadmap.",
      status: "Todo",
      priority: "High",
      dueDate: "2026-10-16",
      assignee: "Sales Team",
      isReminder: true,
    },
    {
      id: "TSK-103",
      title: "Review Aishwarya Art Gallery SEO & Meta Tags",
      description: "Check Google Search Console indexing and image alt attributes.",
      status: "Review",
      priority: "Medium",
      dueDate: "2026-10-14",
      assignee: "SEO Lead",
    },
    {
      id: "TSK-104",
      title: "Monthly AWS Infrastructure Cost Audit",
      description: "Optimize EC2 instances and MongoDB Atlas storage tiers.",
      status: "Done",
      priority: "Low",
      dueDate: "2026-10-10",
      assignee: "DevOps Team",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo" as TaskStatus,
    priority: "Medium" as TaskPriority,
    dueDate: "2026-10-20",
    assignee: "Akash S M",
    isReminder: false,
  });

  const handleOpenNew = () => {
    setEditingTask(null);
    setForm({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "2026-10-20",
      assignee: "Akash S M",
      isReminder: false,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (task: WorkspaceTask) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      assignee: task.assignee,
      isReminder: task.isReminder || false,
    });
    setShowModal(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Please enter a task title.");
      return;
    }

    if (editingTask) {
      setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? { ...t, ...form } : t)));
      toast.success("Task updated successfully!");
    } else {
      const newTask: WorkspaceTask = {
        id: `TSK-${Date.now().toString().slice(-3)}`,
        ...form,
      };
      setTasks((prev) => [newTask, ...prev]);
      toast.success("New task / reminder created successfully!");
    }
    setShowModal(false);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === "Done" ? "Todo" : "Done";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
    toast.success("Task status updated!");
  };

  return (
    <div className="w-full space-y-6 pb-20">
      <TaskHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        onNewTask={handleOpenNew}
        totalTasks={tasks.length}
      />

      {viewMode === "kanban" ? (
        <KanbanBoardView
          tasks={tasks}
          onMoveStatus={(id, status) => {
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
            toast.success("Task moved successfully!");
          }}
          onEditTask={handleOpenEdit}
        />
      ) : (
        <TaskListView
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleOpenEdit}
        />
      )}

      {/* New / Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingTask ? "Edit Task / Reminder" : "Create New Task or Reminder"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl p-1.5 hover:bg-slate-100"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4">
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
                <span className="text-xs font-bold text-slate-700">
                  Mark as Reminder notification
                </span>
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
      )}
    </div>
  );
}
