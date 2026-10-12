"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  ExternalLink,
  Edit2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ProjectItem } from "@/modules/projects/project.types";

interface ProjectTableViewProps {
  projects: ProjectItem[];
  onEdit: (project: ProjectItem) => void;
  onDelete: (id: string) => void;
  onQuickView: (project: ProjectItem) => void;
}

export function ProjectTableView({
  projects,
  onEdit,
  onDelete,
  onQuickView,
}: ProjectTableViewProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getStatusBadge = (status: ProjectItem["status"]) => {
    switch (status) {
      case "On Track":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "At Risk":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "Delayed":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getPhaseBadge = (phase: ProjectItem["phase"]) => {
    switch (phase) {
      case "Discovery":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "In Development":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "QA & UAT":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Staging":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Production":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-black tracking-wider text-slate-500 uppercase">
            <tr>
              <th className="py-4 pr-4 pl-6">Project & Code</th>
              <th className="px-4 py-4">Client</th>
              <th className="px-4 py-4">Phase & Health</th>
              <th className="px-4 py-4">Progress</th>
              <th className="px-4 py-4">Hours Burned</th>
              <th className="px-4 py-4">Cloud & Sec</th>
              <th className="px-4 py-4">Leadership</th>
              <th className="py-4 pr-6 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => {
              const projectId = project.id || project._id || project.projectCode;
              const hoursBurnPercent = project.budgetHours
                ? Math.min(100, Math.round((project.consumedHours / project.budgetHours) * 100))
                : 0;

              return (
                <tr key={projectId} className="group transition-colors hover:bg-slate-50/80">
                  {/* Project & Code */}
                  <td className="py-4 pr-4 pl-6">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] font-bold text-slate-400">
                        {project.projectCode}
                      </span>
                      <Link
                        href={`/dashboard/projects/${projectId}`}
                        className="font-black text-slate-900 transition-colors group-hover:text-indigo-600"
                      >
                        {project.title}
                      </Link>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {project.techStack?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Client */}
                  <td className="px-4 py-4 font-bold text-slate-700">
                    <div>{project.clientName}</div>
                    <div className="text-[10px] font-medium text-slate-400">
                      {project.clientContactPerson || "Direct Account"}
                    </div>
                  </td>

                  {/* Phase & Health */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getPhaseBadge(
                          project.phase
                        )}`}
                      >
                        {project.phase}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getStatusBadge(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-4">
                    <div className="w-28">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-900">{project.progress}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full ${
                            project.progress >= 80
                              ? "bg-emerald-500"
                              : project.progress >= 40
                                ? "bg-indigo-600"
                                : "bg-cyan-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Hours Burned */}
                  <td className="px-4 py-4">
                    <div className="font-bold text-slate-900">
                      {project.consumedHours}h{" "}
                      <span className="text-[10px] font-normal text-slate-500">
                        / {project.budgetHours}h
                      </span>
                    </div>
                    <div className="text-[10px] font-medium text-slate-400">
                      {hoursBurnPercent}% budget
                    </div>
                  </td>

                  {/* Cloud & Sec */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {project.environments?.length || 3} Envs
                      </span>
                      <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                        Sec {project.devSecOps?.securityScore || "A"}
                      </span>
                    </div>
                  </td>

                  {/* Leadership */}
                  <td className="px-4 py-4">
                    <div className="text-[11px] font-bold text-slate-800">
                      {project.projectManager}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-400">
                      TL: {project.techLead}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 pr-6 pl-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onQuickView(project)}
                        className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        title="Quick View"
                      >
                        <Clock className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(projectId)}
                        className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-400 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <Link
                        href={`/dashboard/projects/${projectId}`}
                        className="flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-600"
                      >
                        <span>Cockpit</span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
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
