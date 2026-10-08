"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { MoreHorizontal } from "lucide-react";

interface TableTask {
  id: string;
  taskId: string;
  user: string;
  title: string;
  status: "Pending" | "Completed" | "Outdated";
}

export function TaskKanbanWidget() {
  const [tasks, setTasks] = useState<TableTask[]>([
    {
      id: "1",
      taskId: "TSK-001",
      user: "Akash M.",
      title: "OAuth2 authentication bugfix",
      status: "Pending",
    },
    {
      id: "2",
      taskId: "TSK-002",
      user: "Priya S.",
      title: "Design mobile payment gateway UI",
      status: "Pending",
    },
    {
      id: "3",
      taskId: "TSK-003",
      user: "Karthik R.",
      title: "Annai Agro SOW document draft",
      status: "Completed",
    },
    {
      id: "4",
      taskId: "TSK-004",
      user: "Siddharth V.",
      title: "VBF website release verification",
      status: "Completed",
    },
    {
      id: "5",
      taskId: "TSK-005",
      user: "Akash M.",
      title: "Database index optimization",
      status: "Outdated",
    },
    {
      id: "6",
      taskId: "TSK-006",
      user: "Priya S.",
      title: "Client meeting prep for Webxode",
      status: "Pending",
    },
  ]);

  const statusStyles = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Outdated: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const updateStatus = (id: string, newStatus: TableTask["status"]) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Task Overview"
        subtitle="Current status of assigned deliverables"
        badge={`${tasks.filter((t) => t.status === "Pending").length} Pending`}
        badgeVariant="warning"
      />

      {/* Internal Scrolling Container */}
      <div className="custom-scrollbar max-h-80 overflow-y-auto pr-2">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
              <th className="pt-2 pb-3 font-bold">ID</th>
              <th className="pt-2 pb-3 font-bold">User</th>
              <th className="pt-2 pb-3 font-bold">Task</th>
              <th className="pt-2 pb-3 text-center font-bold">Status</th>
              <th className="pt-2 pb-3 text-right font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {tasks.map((task) => (
              <tr key={task.id} className="group transition hover:bg-slate-50/60">
                <td className="py-3 font-mono text-xs text-slate-500">{task.taskId}</td>
                <td className="py-3 text-slate-600">{task.user}</td>
                <td className="py-3 font-bold text-slate-900">{task.title}</td>
                <td className="py-3 text-center">
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value as TableTask["status"])}
                    className={`cursor-pointer rounded-md border px-2 py-1 text-[10px] font-bold focus:outline-none ${
                      statusStyles[task.status]
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Outdated">Outdated</option>
                  </select>
                </td>
                <td className="py-3 text-right">
                  <button type="button" className="text-slate-400 transition hover:text-slate-900">
                    <MoreHorizontal className="inline h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetCard>
  );
}
