"use client";

import React from "react";
import { WorkspaceTask } from "@/types/tasks";
import { CheckCircle2, Calendar, Bell, User, Edit2 } from "lucide-react";

interface TaskListViewProps {
  tasks: WorkspaceTask[];
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: WorkspaceTask) => void;
}

export function TaskListView({ tasks, onToggleComplete, onEditTask }: TaskListViewProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-black tracking-wider text-slate-400 uppercase">
              <th className="px-6 py-4">Task / Reminder</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Priority</th>
              <th className="px-4 py-4">Due Date</th>
              <th className="px-4 py-4">Assignee</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {tasks.map((task) => {
              const isDone = task.status === "Done";
              return (
                <tr key={task.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onToggleComplete(task.id)}
                        className="text-slate-300 transition hover:text-emerald-600"
                      >
                        <CheckCircle2
                          className={`h-5 w-5 ${isDone ? "fill-emerald-50 text-emerald-600" : ""}`}
                        />
                      </button>
                      <div>
                        <span
                          className={`font-black ${isDone ? "text-slate-400 line-through" : "text-slate-900"}`}
                        >
                          {task.title}
                        </span>
                        {task.isReminder && (
                          <span className="ml-2 inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-black text-amber-700">
                            <Bell className="h-2.5 w-2.5" /> Reminder
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      {task.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase ${
                        task.priority === "Urgent"
                          ? "bg-rose-100 text-rose-700"
                          : task.priority === "High"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="flex items-center gap-1.5 px-4 py-4 pt-5 text-slate-600">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{task.dueDate}</span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <User className="h-3.5 w-3.5 text-indigo-500" />
                      {task.assignee}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onEditTask(task)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
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
