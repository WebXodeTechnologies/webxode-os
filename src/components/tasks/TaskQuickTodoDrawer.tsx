"use client";

import React, { useState } from "react";
import { X, Plus, CheckCircle2, Trash2, Clock, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QuickTodo } from "@/modules/tasks/task.types";

interface TaskQuickTodoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  todos: QuickTodo[];
  onToggleTodo: (id: string) => void;
  onAddTodo: (todo: Partial<QuickTodo>) => void;
  onDeleteTodo: (id: string) => void;
}

export function TaskQuickTodoDrawer({
  isOpen,
  onClose,
  todos,
  onToggleTodo,
  onAddTodo,
  onDeleteTodo,
}: TaskQuickTodoDrawerProps) {
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "completed">("all");
  const [titleInput, setTitleInput] = useState("");
  const [category, setCategory] = useState<QuickTodo["category"]>("Personal");
  const [priority, setPriority] = useState<QuickTodo["priority"]>("medium");
  const [dueTimeInput, setDueTimeInput] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    onAddTodo({
      title: titleInput.trim(),
      completed: false,
      category,
      priority,
      dueTime: dueTimeInput.trim() || "Today EOD",
      createdAt: new Date().toISOString().split("T")[0],
    });

    setTitleInput("");
    setDueTimeInput("");
  };

  const filteredTodos = todos.filter((t) => {
    if (filterTab === "pending") return !t.completed;
    if (filterTab === "completed") return t.completed;
    return true;
  });

  const pendingCount = todos.filter((t) => !t.completed).length;

  const getPriorityColor = (p: QuickTodo["priority"]) => {
    switch (p) {
      case "high":
        return "text-rose-700 bg-rose-50 border-rose-200";
      case "medium":
        return "text-amber-700 bg-amber-50 border-amber-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-2xs">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Developer Quick To-Do</h3>
              <p className="text-xs text-slate-500">
                {pendingCount} remaining micro-deliverables & actions
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

        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-6 py-3">
          {(["all", "pending", "completed"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold capitalize transition-all sm:text-sm ${
                filterTab === tab
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Add To-Do Input Card */}
        <div className="border-b border-slate-100 bg-slate-50/70 p-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Add micro-task (e.g. Sanity check Redis cache TTL)..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as QuickTodo["category"])}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="Personal">Personal</option>
                  <option value="Review">Code Review</option>
                  <option value="Bugfix">Bugfix</option>
                  <option value="Client Note">Client Note</option>
                  <option value="Architecture">Architecture</option>
                </select>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as QuickTodo["priority"])}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-emerald-700 sm:text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>
          </form>
        </div>

        {/* To-Do Items List */}
        <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-5">
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group flex items-start justify-between gap-3 rounded-2xl border p-3.5 transition-all sm:p-4 ${
                  todo.completed
                    ? "border-slate-100 bg-slate-50/70 opacity-60"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-2xs"
                }`}
              >
                <div
                  onClick={() => onToggleTodo(todo.id)}
                  className="flex flex-1 cursor-pointer items-start gap-3"
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      todo.completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 bg-white hover:border-indigo-500"
                    }`}
                  >
                    {todo.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>

                  <div className="space-y-1.5">
                    <p
                      className={`text-sm leading-snug font-bold ${
                        todo.completed ? "text-slate-400 line-through" : "text-slate-900"
                      }`}
                    >
                      {todo.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                        {todo.category}
                      </span>

                      <span
                        className={`rounded-md border px-2 py-0.5 font-bold ${getPriorityColor(
                          todo.priority
                        )}`}
                      >
                        {todo.priority}
                      </span>

                      {todo.dueTime && (
                        <span className="flex items-center gap-1 font-medium text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{todo.dueTime}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteTodo(todo.id)}
                  className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTodos.length === 0 && (
            <div className="py-16 text-center text-sm font-semibold text-slate-400">
              No tasks in this view
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
