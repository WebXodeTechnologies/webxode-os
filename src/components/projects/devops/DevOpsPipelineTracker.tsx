"use client";

import React from "react";
import {
  GitPullRequest,
  CheckCircle2,
  Clock,
  Play,
  RotateCw,
  Terminal,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { DevOpsPipelineRun } from "@/modules/projects/project.types";

interface DevOpsPipelineTrackerProps {
  pipelineRuns: DevOpsPipelineRun[];
}

export function DevOpsPipelineTracker({ pipelineRuns }: DevOpsPipelineTrackerProps) {
  return (
    <div className="space-y-5 rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-[10px] font-black tracking-wider text-purple-600 uppercase">
            Automated Delivery Pipeline
          </span>
          <h3 className="text-lg font-black text-slate-900">Recent CI/CD Execution Telemetry</h3>
          <p className="text-xs text-slate-500">
            GitHub Actions / GitLab CI automated workflows, Docker container builds, and security
            gates.
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          99.2% Pipeline Success Rate
        </span>
      </div>

      <div className="space-y-3">
        {pipelineRuns.map((run) => (
          <div
            key={run.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-slate-200 lg:flex-row lg:items-center"
          >
            {/* Left Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-slate-900">
                  {run.pipelineId}
                </span>
                <span className="rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                  {run.projectCode}
                </span>
                <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                  {run.branch}
                </span>
              </div>

              <p className="text-xs font-bold text-slate-800">{run.commitMessage}</p>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                <span>By {run.author}</span>
                <span>•</span>
                <span>Environment: {run.environment}</span>
                <span>•</span>
                <span>Duration: {run.durationSeconds}s</span>
                <span>•</span>
                <span>Started: {run.startedAt}</span>
              </div>
            </div>

            {/* Right: Pipeline Steps Bar */}
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              {run.stageSteps.map((step, idx) => (
                <div
                  key={idx}
                  title={`${step.name}: ${step.status}`}
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold ${
                    step.status === "Success"
                      ? "bg-emerald-100/70 text-emerald-800"
                      : step.status === "Running"
                        ? "animate-pulse bg-blue-100/70 text-blue-800"
                        : step.status === "Failed"
                          ? "bg-rose-100/70 text-rose-800"
                          : "bg-slate-200/60 text-slate-600"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{step.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
