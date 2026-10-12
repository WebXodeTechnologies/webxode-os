"use client";

import React, { useState } from "react";
import { Plus, CheckCircle2, Clock, AlertTriangle, Code, ShieldCheck, Layers } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { TaskItem, TaskStatus } from "@/modules/tasks/task.types";
import { TaskCard } from "./TaskCard";

interface ColumnConfig {
  id: TaskStatus;
  title: string;
  badgeColor: string;
  dotColor: string;
  borderColor: string;
  bgColor: string;
  icon: React.ReactNode;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: "backlog",
    title: "Product Backlog",
    badgeColor: "bg-slate-200 text-slate-800",
    dotColor: "bg-slate-400",
    borderColor: "border-slate-200/90",
    bgColor: "bg-slate-50/60",
    icon: <Layers className="h-4 w-4 text-slate-500" />,
  },
  {
    id: "todo",
    title: "Sprint Ready",
    badgeColor: "bg-sky-100 text-sky-800 border border-sky-200",
    dotColor: "bg-sky-500",
    borderColor: "border-sky-200/80",
    bgColor: "bg-sky-50/40",
    icon: <Clock className="h-4 w-4 text-sky-600" />,
  },
  {
    id: "in_progress",
    title: "In Development",
    badgeColor: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    dotColor: "bg-indigo-600 animate-pulse",
    borderColor: "border-indigo-200/80",
    bgColor: "bg-indigo-50/40",
    icon: <Code className="h-4 w-4 text-indigo-600" />,
  },
  {
    id: "in_review",
    title: "Code Review & QA",
    badgeColor: "bg-purple-100 text-purple-800 border border-purple-200",
    dotColor: "bg-purple-600",
    borderColor: "border-purple-200/80",
    bgColor: "bg-purple-50/40",
    icon: <ShieldCheck className="h-4 w-4 text-purple-600" />,
  },
  {
    id: "blocked",
    title: "Blocked / Impediment",
    badgeColor: "bg-rose-100 text-rose-800 border border-rose-200",
    dotColor: "bg-rose-600 animate-ping",
    borderColor: "border-rose-200/90",
    bgColor: "bg-rose-50/50",
    icon: <AlertTriangle className="h-4 w-4 text-rose-600" />,
  },
  {
    id: "done",
    title: "Done & Shipped",
    badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    dotColor: "bg-emerald-600",
    borderColor: "border-emerald-200/80",
    bgColor: "bg-emerald-50/40",
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  },
];

interface TaskKanbanBoardProps {
  tasks: TaskItem[];
  onOpenDetails: (task: TaskItem) => void;
  onMoveStatus: (taskId: string, newStatus: TaskStatus) => void;
  onQuickAddTask: (columnStatus: TaskStatus) => void;
  onToggleBlocker?: (taskId: string) => void;
}

export function TaskKanbanBoard({
  tasks,
  onOpenDetails,
  onMoveStatus,
  onQuickAddTask,
  onToggleBlocker,
}: TaskKanbanBoardProps) {
  const [activeDragOverColumn, setActiveDragOverColumn] = useState<TaskStatus | null>(null);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent, colStatus: TaskStatus) => {
    e.preventDefault();
    if (activeDragOverColumn !== colStatus) {
      setActiveDragOverColumn(colStatus);
    }
  };

  const handleDragLeave = (colStatus: TaskStatus) => {
    if (activeDragOverColumn === colStatus) {
      setActiveDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, colStatus: TaskStatus) => {
    e.preventDefault();
    setActiveDragOverColumn(null);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onMoveStatus(taskId, colStatus);
    }
  };

  return (
    <div className="custom-scrollbar flex items-start gap-4.5 overflow-x-auto pt-1 pb-6">
      {COLUMNS.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col.id);
        const columnPoints = columnTasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
        const isDragOver = activeDragOverColumn === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={() => handleDragLeave(col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`flex min-h-150 w-77.5 shrink-0 flex-col rounded-3xl border p-3.5 transition-all sm:w-82.5 ${
              isDragOver
                ? "border-indigo-400 bg-indigo-50/50 shadow-md ring-2 ring-indigo-400/30"
                : `${col.borderColor} ${col.bgColor} shadow-2xs`
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${col.dotColor}`} />
                <h3 className="flex items-center gap-1.5 text-sm font-black tracking-tight text-slate-900">
                  <span>{col.title}</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-black ${col.badgeColor}`}>
                  {columnTasks.length}
                </span>

                <span className="text-xs font-bold text-slate-500">{columnPoints}pt</span>

                <button
                  type="button"
                  onClick={() => onQuickAddTask(col.id)}
                  title={`Add task to ${col.title}`}
                  className="rounded-xl p-1 text-slate-400 transition-colors hover:bg-white hover:text-slate-800"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Task Card List */}
            <div className="custom-scrollbar mt-3.5 min-h-30 flex-1 space-y-3.5 overflow-y-auto pr-0.5">
              <AnimatePresence>
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onOpenDetails={onOpenDetails}
                    onMoveStatus={onMoveStatus}
                    onToggleBlocker={onToggleBlocker}
                  />
                ))}
              </AnimatePresence>

              {columnTasks.length === 0 && (
                <div
                  onClick={() => onQuickAddTask(col.id)}
                  className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/80 p-4 text-center transition-all hover:border-indigo-300 hover:bg-white/70"
                >
                  <p className="text-xs font-bold text-slate-400">No tasks in this lane</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Drop or Add</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
