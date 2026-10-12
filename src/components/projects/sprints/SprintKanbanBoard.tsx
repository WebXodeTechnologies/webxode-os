"use client";

import React, { useState, useMemo } from "react";
import { Plus, Filter, CheckCircle2 } from "lucide-react";
import { SprintTaskItem } from "@/modules/projects/project.types";
import { SprintTaskCard } from "./SprintTaskCard";

interface SprintKanbanBoardProps {
  tasks: SprintTaskItem[];
  onAdvanceTaskStatus: (taskId: string) => void;
  onAddTask: (status: SprintTaskItem["status"]) => void;
}

export function SprintKanbanBoard({
  tasks,
  onAdvanceTaskStatus,
  onAddTask,
}: SprintKanbanBoardProps) {
  const [selectedRole, setSelectedRole] = useState<string>("All");

  const columns: { title: string; status: SprintTaskItem["status"]; color: string }[] = [
    { title: "Backlog", status: "Backlog", color: "bg-slate-400" },
    { title: "Ready for Dev", status: "Ready for Dev", color: "bg-sky-500" },
    { title: "In Progress", status: "In Progress", color: "bg-indigo-600" },
    { title: "PR Review", status: "PR Review", color: "bg-purple-600" },
    { title: "QA / Testing", status: "QA / Testing", color: "bg-amber-500" },
    { title: "Done", status: "Done", color: "bg-emerald-500" },
  ];

  const roleFilters = [
    { label: "All Disciplines", value: "All" },
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "DevOps & Cloud", value: "DevOps" },
    { label: "UI/UX Design", value: "UI/UX" },
    { label: "DevSecOps", value: "DevSecOps" },
    { label: "QA Testing", value: "QA" },
  ];

  const filteredTasks = useMemo(() => {
    if (selectedRole === "All") return tasks;
    return tasks.filter(
      (t) => t.roleTag === selectedRole || (selectedRole === "DevOps" && t.roleTag === "Cloud")
    );
  }, [tasks, selectedRole]);

  return (
    <div className="space-y-4">
      {/* Role Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-600">Role View Filter:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {roleFilters.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setSelectedRole(r.value)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedRole === r.value
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status);
          const colPoints = colTasks.reduce((acc, t) => acc + (t.storyPoints || 0), 0);

          return (
            <div
              key={col.status}
              className="flex min-h-125 flex-col rounded-3xl border border-slate-200/80 bg-slate-50/70 p-3 shadow-2xs"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.color}`} />
                  <h3 className="text-xs font-black text-slate-800">{col.title}</h3>
                </div>

                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-black text-slate-700">
                    {colTasks.length}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">({colPoints}pt)</span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="mt-3 flex flex-1 flex-col gap-3">
                {colTasks.map((task) => (
                  <SprintTaskCard key={task.id} task={task} onAdvanceStatus={onAdvanceTaskStatus} />
                ))}

                {colTasks.length === 0 && (
                  <div className="my-auto py-8 text-center">
                    <p className="text-[11px] font-semibold text-slate-400">No items</p>
                  </div>
                )}
              </div>

              {/* Add Task Button at bottom of column */}
              <button
                type="button"
                onClick={() => onAddTask(col.status)}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 py-2 text-xs font-bold text-slate-500 transition-all hover:border-indigo-400 hover:bg-white hover:text-indigo-600"
              >
                <Plus className="h-3 w-3" />
                <span>Add Task</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
