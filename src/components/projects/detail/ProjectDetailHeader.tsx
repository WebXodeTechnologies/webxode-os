"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Trash2,
  Share2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ProjectItem } from "@/modules/projects/project.types";

interface ProjectDetailHeaderProps {
  project: ProjectItem;
  onEdit: () => void;
  onDelete?: () => void;
}

export function ProjectDetailHeader({ project, onEdit, onDelete }: ProjectDetailHeaderProps) {
  const hoursBurnPercent = project.budgetHours
    ? Math.min(100, Math.round((project.consumedHours / project.budgetHours) * 100))
    : 0;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Project cockpit URL copied to clipboard!");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Back Link & Info */}
        <div className="space-y-3">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-indigo-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Projects Portfolio</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-black text-slate-500">
              {project.projectCode}
            </span>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
              {project.phase}
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
              {project.status}
            </span>
            <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
            {project.title}
          </h1>

          <p className="text-xs font-semibold text-indigo-600">
            Client: {project.clientName}{" "}
            {project.clientContactPerson && (
              <span className="font-normal text-slate-400">• {project.clientContactPerson}</span>
            )}
          </p>

          <p className="max-w-2xl text-xs leading-relaxed font-medium text-slate-600 sm:text-sm">
            {project.summary}
          </p>
        </div>

        {/* Right: Actions & Progress Summary */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50"
              title="Share Link"
            >
              <Share2 className="h-4 w-4" />
            </button>

            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/60 px-3.5 py-2 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100"
                title="Delete this project"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            )}

            <button
              type="button"
              onClick={onEdit}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span>Edit Details</span>
            </button>
          </div>

          <div className="w-full sm:w-52 lg:text-right">
            <div className="flex items-center justify-between gap-2 text-xs font-bold lg:justify-end">
              <span className="text-slate-500">Overall Delivery</span>
              <span className="font-black text-slate-900">{project.progress}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>{project.targetLaunchDate}</span>
              <span>{hoursBurnPercent}% budget</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
