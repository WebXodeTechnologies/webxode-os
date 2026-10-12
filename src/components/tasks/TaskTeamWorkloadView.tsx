"use client";

import React from "react";
import Image from "next/image";
import { Users, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Developer, TaskItem, TaskStatus } from "@/modules/tasks/task.types";

interface TaskTeamWorkloadViewProps {
  developers: Developer[];
  tasks: TaskItem[];
  onOpenDetails: (task: TaskItem) => void;
  onQuickAddTask: (columnStatus: TaskStatus) => void;
}

export function TaskTeamWorkloadView({
  developers,
  tasks,
  onOpenDetails,
  onQuickAddTask,
}: TaskTeamWorkloadViewProps) {
  return (
    <div className="space-y-5">
      {/* Overview Banner */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-2xs">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 sm:text-lg">
              Engineering Bandwidth & Capacity Cockpit
            </h3>
            <p className="text-xs text-slate-500 sm:text-sm">
              Real-time resource allocation and story point loads across all squads
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-700 sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span>Optimal (&lt;75%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span>Near Limit (75-90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            <span>Overloaded (&gt;90%)</span>
          </div>
        </div>
      </div>

      {/* Developers Workload Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {developers.map((dev) => {
          const devTasks = tasks.filter((t) => t.assignee.id === dev.id);
          const devActiveTasks = devTasks.filter((t) => t.status !== "done");
          const totalDevPoints = devActiveTasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
          const loadPercentage = Math.round((totalDevPoints / dev.maxCapacityPoints) * 100);

          const isOverloaded = loadPercentage >= 90;
          const isNearCapacity = loadPercentage >= 75 && loadPercentage < 90;

          const loadColor = isOverloaded
            ? "bg-rose-500"
            : isNearCapacity
              ? "bg-amber-500"
              : "bg-emerald-500";

          return (
            <motion.div
              key={dev.id}
              whileHover={{ y: -2 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:shadow-xs sm:p-6"
            >
              <div>
                {/* Developer Profile Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <Image
                        src={dev.avatar}
                        alt={dev.name}
                        width={52}
                        height={52}
                        className="h-13 w-13 rounded-2xl border border-slate-200 object-cover"
                      />
                      <span
                        className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white ${
                          dev.status === "active"
                            ? "bg-emerald-500"
                            : dev.status === "reviewing"
                              ? "bg-indigo-500"
                              : dev.status === "in-meeting"
                                ? "bg-amber-500"
                                : "bg-slate-300"
                        }`}
                      />
                    </div>

                    <div>
                      <h4 className="text-base font-black text-slate-900">{dev.name}</h4>
                      <p className="text-xs font-semibold text-slate-600 sm:text-sm">{dev.role}</p>
                      <span className="mt-1.5 inline-block rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                        {dev.team}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`rounded-xl px-2.5 py-1 text-xs font-black tracking-wider uppercase ${
                      isOverloaded
                        ? "border border-rose-200 bg-rose-50 text-rose-700"
                        : isNearCapacity
                          ? "border border-amber-200 bg-amber-50 text-amber-700"
                          : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {isOverloaded ? "Overloaded" : isNearCapacity ? "Near Limit" : "Optimal"}
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold sm:text-sm">
                    <span className="font-semibold text-slate-500">Active Bandwidth:</span>
                    <span className="text-slate-900">
                      {totalDevPoints} / {dev.maxCapacityPoints} Story Points ({loadPercentage}%)
                    </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-200/60 bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${loadColor}`}
                      style={{ width: `${Math.min(loadPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Assigned Active Tasks List */}
                <div className="mt-5 space-y-2.5">
                  <span className="text-xs font-black tracking-wider text-slate-400 uppercase">
                    Current Deliverables ({devActiveTasks.length}):
                  </span>

                  <div className="custom-scrollbar max-h-56 space-y-2 overflow-y-auto pr-1">
                    {devActiveTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onOpenDetails(task)}
                        className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-xs shadow-2xs transition-all hover:border-indigo-300 hover:bg-white sm:text-sm"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-600">
                            {task.taskCode}
                          </span>
                          <span className="truncate font-bold text-slate-900 group-hover:text-indigo-600">
                            {task.title}
                          </span>
                        </div>

                        <div className="ml-2 flex shrink-0 items-center gap-2">
                          <span className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-700">
                            {task.storyPoints}pt
                          </span>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                        </div>
                      </div>
                    ))}

                    {devActiveTasks.length === 0 && (
                      <p className="py-5 text-center text-xs font-semibold text-slate-400 sm:text-sm">
                        No active tasks in flight
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                <span className="text-xs font-bold text-slate-500">
                  {devTasks.filter((t) => t.status === "done").length} tasks completed this sprint
                </span>

                <button
                  type="button"
                  onClick={() => onQuickAddTask("todo")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 sm:text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Assign</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
