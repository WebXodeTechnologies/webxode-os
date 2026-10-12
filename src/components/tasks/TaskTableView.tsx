"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { TaskItem, TaskStatus } from "@/modules/tasks/task.types";

interface TaskTableViewProps {
  tasks: TaskItem[];
  onOpenDetails: (task: TaskItem) => void;
  onMoveStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export function TaskTableView({ tasks, onOpenDetails, onMoveStatus }: TaskTableViewProps) {
  const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
    { value: "backlog", label: "Backlog", color: "bg-slate-100 text-slate-700" },
    { value: "todo", label: "To Do", color: "bg-sky-50 text-sky-800 border-sky-200" },
    {
      value: "in_progress",
      label: "In Progress",
      color: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
    {
      value: "in_review",
      label: "In Review",
      color: "bg-purple-50 text-purple-800 border-purple-200",
    },
    { value: "blocked", label: "Blocked", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { value: "done", label: "Done", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200/90 bg-slate-50/90 text-xs font-black tracking-wider text-slate-500 uppercase">
            <tr>
              <th className="py-3.5 pr-3 pl-5">Code</th>
              <th className="px-4 py-3.5">Title & Client</th>
              <th className="px-4 py-3.5">Assignee</th>
              <th className="px-4 py-3.5">Squad</th>
              <th className="px-4 py-3.5">Priority</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-center">Points</th>
              <th className="px-4 py-3.5">Due Date</th>
              <th className="py-3.5 pr-5 pl-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {tasks.map((task) => {
              const statusObj = statusOptions.find((s) => s.value === task.status);

              return (
                <tr key={task.id} className="group transition-colors hover:bg-slate-50/80">
                  {/* Task Code */}
                  <td className="py-4 pr-3 pl-5 font-mono font-bold text-slate-700">
                    <span
                      onClick={() => onOpenDetails(task)}
                      className="cursor-pointer rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-xs hover:text-indigo-600 hover:underline"
                    >
                      {task.taskCode}
                    </span>
                  </td>

                  {/* Title & Client */}
                  <td className="max-w-sm px-4 py-4">
                    <p
                      onClick={() => onOpenDetails(task)}
                      className="line-clamp-1 cursor-pointer text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600"
                    >
                      {task.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                      {task.clientName} • {task.projectName}
                    </p>
                  </td>

                  {/* Assignee */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full border border-slate-200 object-cover"
                      />
                      <span className="truncate text-sm font-bold text-slate-900">
                        {task.assignee.name}
                      </span>
                    </div>
                  </td>

                  {/* Squad */}
                  <td className="px-4 py-4 text-slate-600">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {task.team}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold capitalize ${
                        task.priority === "critical"
                          ? "border-rose-200 bg-rose-50 text-rose-700"
                          : task.priority === "high"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : task.priority === "medium"
                              ? "border-sky-200 bg-sky-50 text-sky-700"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  {/* Inline Status Dropdown */}
                  <td className="px-4 py-4">
                    <select
                      value={task.status}
                      onChange={(e) => onMoveStatus(task.id, e.target.value as TaskStatus)}
                      className={`cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold focus:outline-none ${
                        statusObj?.color || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Points */}
                  <td className="px-4 py-4 text-center font-mono text-xs font-bold text-slate-900">
                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5">
                      {task.storyPoints}pt
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-4 py-4 text-xs font-semibold text-slate-600">{task.dueDate}</td>

                  {/* Actions */}
                  <td className="py-4 pr-5 pl-3 text-right">
                    <button
                      type="button"
                      onClick={() => onOpenDetails(task)}
                      className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-800"
                      title="View Details"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
