"use client";

import React from "react";
import { WorkspaceTask, TaskStatus } from "@/types/tasks";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";

interface KanbanBoardViewProps {
  tasks: WorkspaceTask[];
  onMoveStatus: (taskId: string, newStatus: TaskStatus) => void;
  onEditTask: (task: WorkspaceTask) => void;
}

export function KanbanBoardView({ tasks, onMoveStatus, onEditTask }: KanbanBoardViewProps) {
  const columns: { status: TaskStatus; label: string; bg: string; border: string }[] = [
    { status: "Todo", label: "To Do", bg: "bg-slate-50", border: "border-slate-200" },
    { status: "In Progress", label: "In Progress", bg: "bg-blue-50/40", border: "border-blue-200" },
    { status: "Review", label: "Review", bg: "bg-amber-50/40", border: "border-amber-200" },
    { status: "Done", label: "Completed", bg: "bg-emerald-50/40", border: "border-emerald-200" },
  ];

  const priorityColors: Record<string, string> = {
    Low: "bg-slate-100 text-slate-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-amber-100 text-amber-700",
    Urgent: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.status);

        return (
          <div
            key={col.status}
            className={`flex flex-col rounded-3xl border ${col.border} ${col.bg} p-4 shadow-xs`}
          >
            <div className="mb-3 flex items-center justify-between border-b border-slate-200/60 pb-3">
              <span className="text-xs font-black tracking-wider text-slate-700 uppercase">
                {col.label}
              </span>
              <span className="rounded-md bg-white px-2 py-0.5 text-xs font-black text-slate-900 shadow-2xs">
                {colTasks.length}
              </span>
            </div>

            <div className="max-h-[calc(100vh-320px)] flex-1 space-y-3 overflow-y-auto pr-1">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onEditTask(task)}
                  className="group cursor-pointer space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-indigo-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-black text-slate-900 transition group-hover:text-indigo-600">
                      {task.title}
                    </h4>
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-extrabold uppercase ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {task.description && (
                    <p className="line-clamp-2 text-[11px] font-semibold text-slate-500">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] font-bold text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <User className="h-3 w-3 text-indigo-500" />
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                </div>
              ))}

              {colTasks.length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-center text-xs font-semibold text-slate-400">
                  No tasks in {col.label}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
