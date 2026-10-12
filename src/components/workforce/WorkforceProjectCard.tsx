"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  GitFork,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
} from "lucide-react";
import { ProjectItem } from "@/modules/projects/project.types";

interface WorkforceProjectCardProps {
  project: ProjectItem;
  onQuickView?: (project: ProjectItem) => void;
}

export function WorkforceProjectCard({ project, onQuickView }: WorkforceProjectCardProps) {
  const projectId = project.id || project._id || project.projectCode;

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

  const getStatusBadge = (status: ProjectItem["status"]) => {
    switch (status) {
      case "On Track":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "At Risk":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
      case "Delayed":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          dot: "bg-rose-500",
        };
      case "Completed":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200",
          dot: "bg-slate-400",
        };
    }
  };

  const statusConfig = getStatusBadge(project.status);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-md"
    >
      <div>
        {/* Top Header: Code, Phase & Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-black tracking-wider text-slate-500">
              {project.projectCode}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${getPhaseBadge(
                project.phase
              )}`}
            >
              {project.phase}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${statusConfig.bg}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot} animate-pulse`} />
            {project.status}
          </span>
        </div>

        {/* Client & Title */}
        <div className="mt-3.5">
          <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
            {project.clientName}
          </span>
          <Link href={`/dashboard/workforce/${projectId}` as any} className="group/title block">
            <h3 className="mt-0.5 line-clamp-1 text-base font-black text-slate-900 transition-colors group-hover/title:text-indigo-600">
              {project.title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {project.summary}
          </p>
        </div>

        {/* Progress & Target Launch */}
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">Phase Completion</span>
            <span className="font-black text-slate-900">{project.progress}%</span>
          </div>

          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                project.progress >= 80
                  ? "bg-emerald-500"
                  : project.progress >= 40
                    ? "bg-indigo-600"
                    : "bg-cyan-500"
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Target: {project.targetLaunchDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {project.consumedHours}h / {project.budgetHours}h
              </span>
            </div>
          </div>
        </div>

        {/* Engaged Team Coordination Roster Breakdown */}
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Engaged Cross-Functional Team</span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
              7 Specialists Assigned
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-700">
              PM: {project.projectManager.split(" ")[0]}
            </span>
            <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
              Lead: {project.techLead.split(" ")[0]}
            </span>
            <span className="rounded-md border border-pink-200 bg-pink-50 px-2 py-0.5 text-xs font-bold text-pink-700">
              UI/UX: Elena
            </span>
            <span className="rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-bold text-sky-700">
              Frontend: Alex
            </span>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
              Backend: Tariq
            </span>
            <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
              DevOps: Viktor
            </span>
            <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">
              QA: Maya
            </span>
          </div>
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
        <div className="flex items-center gap-1.5">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(project)}
              className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900"
              title="Quick Preview"
            >
              <Activity className="h-4 w-4" />
            </button>
          )}
        </div>

        <Link
          href={`/dashboard/workforce/${projectId}` as any}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-indigo-600"
        >
          <GitFork className="h-3.5 w-3.5 text-indigo-400" />
          <span>Workflow & Activity Graph</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
