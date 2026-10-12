"use client";

import React from "react";
import {
  GitPullRequest,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Target,
  Sparkles,
  Zap,
} from "lucide-react";
import { SprintItem } from "@/modules/projects/project.types";

interface SprintHeaderProps {
  sprint: SprintItem;
  onNewTask: () => void;
  onSprintSelect: (sprintId: string) => void;
  availableSprints: SprintItem[];
}

export function SprintHeader({
  sprint,
  onNewTask,
  onSprintSelect,
  availableSprints,
}: SprintHeaderProps) {
  const completionPercent = sprint.storyPointsTotal
    ? Math.round((sprint.storyPointsCompleted / sprint.storyPointsTotal) * 100)
    : 0;

  return (
    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Sprint Goal & Selector */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black tracking-wider text-indigo-700 uppercase">
              Active Sprint Cadence
            </span>
            <span className="text-xs font-bold text-slate-400">• {sprint.projectCode}</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
              Sprint #{sprint.sprintNumber}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{sprint.name}</h2>
            {availableSprints.length > 1 && (
              <select
                value={sprint.id}
                onChange={(e) => onSprintSelect(e.target.value)}
                className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700"
              >
                {availableSprints.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.projectCode})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex max-w-2xl items-start gap-2 text-xs text-slate-600">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
            <p className="leading-relaxed">
              <strong className="text-slate-800">Sprint Goal:</strong> {sprint.goal}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {sprint.startDate} → {sprint.endDate}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>
                <strong className="text-slate-900">{sprint.storyPointsCompleted}</strong> of{" "}
                <strong className="text-slate-900">{sprint.storyPointsTotal}</strong> Story Points
                Done
              </span>
            </div>
          </div>
        </div>

        {/* Right: Progress & Action */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
          <div className="w-full sm:w-48 lg:text-right">
            <div className="flex items-center justify-between gap-2 text-xs font-bold lg:justify-end">
              <span className="text-slate-500">Velocity Progress</span>
              <span className="font-black text-slate-900">{completionPercent}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onNewTask}
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Sprint Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
