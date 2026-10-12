"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  GitPullRequest,
  Palette,
  Cloud,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertOctagon,
  Sparkles,
} from "lucide-react";
import { WorkflowNode, WorkflowNodeStatus } from "@/modules/projects/workflow.types";

interface ProjectWorkflowNodeCardProps {
  node: WorkflowNode;
  isSelected?: boolean;
  onSelect: (node: WorkflowNode) => void;
  onQuickUpdate?: (node: WorkflowNode) => void;
}

export function ProjectWorkflowNodeCard({
  node,
  isSelected = false,
  onSelect,
  onQuickUpdate,
}: ProjectWorkflowNodeCardProps) {
  const getStatusBadge = (status: WorkflowNodeStatus) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          dot: "bg-emerald-500",
          icon: CheckCircle2,
        };
      case "in_progress":
        return {
          label: "In Progress",
          bg: "bg-sky-50 text-sky-700 border-sky-200/80",
          dot: "bg-sky-500 animate-pulse",
          icon: Clock,
        };
      case "review":
        return {
          label: "In Review",
          bg: "bg-amber-50 text-amber-700 border-amber-200/80",
          dot: "bg-amber-500 animate-ping",
          icon: ShieldCheck,
        };
      case "blocked":
        return {
          label: "Blocked",
          bg: "bg-rose-50 text-rose-700 border-rose-200/80",
          dot: "bg-rose-500",
          icon: AlertOctagon,
        };
      case "pending":
      default:
        return {
          label: "Pending",
          bg: "bg-slate-100 text-slate-600 border-slate-200",
          dot: "bg-slate-400",
          icon: Clock,
        };
    }
  };

  const getRoleColor = (role: WorkflowNode["roleTag"]) => {
    switch (role) {
      case "Project Manager":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "Tech Lead":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "UI/UX Designer":
        return "bg-pink-50 text-pink-700 border-pink-200/80";
      case "Frontend Developer":
        return "bg-sky-50 text-sky-700 border-sky-200/80";
      case "Backend Developer":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "DevOps Engineer":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "QA Engineer":
        return "bg-teal-50 text-teal-700 border-teal-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "figma":
        return <Palette className="h-3 w-3 text-pink-500" />;
      case "github_pr":
      case "github_commit":
        return <GitPullRequest className="h-3 w-3 text-sky-500" />;
      case "cloud":
        return <Cloud className="h-3 w-3 text-amber-500" />;
      case "test":
        return <Sparkles className="h-3 w-3 text-teal-500" />;
      case "docs":
      default:
        return <FileText className="h-3 w-3 text-slate-500" />;
    }
  };

  const statusConfig = getStatusBadge(node.status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      onClick={() => onSelect(node)}
      className={`group relative flex w-80 shrink-0 cursor-pointer flex-col justify-between rounded-2xl border bg-white p-5 shadow-xs transition-all ${
        isSelected
          ? "border-indigo-600 shadow-md ring-4 ring-indigo-500/10"
          : node.status === "blocked"
            ? "border-rose-300 hover:border-rose-400 hover:shadow-md"
            : node.status === "review"
              ? "border-amber-300 hover:border-amber-400 hover:shadow-md"
              : "border-slate-200 hover:border-slate-300 hover:shadow-md"
      }`}
    >
      {/* Top Header: Node Number & Status Pill */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-xs font-black text-white shadow-2xs">
              {node.stageNumber}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${getRoleColor(
                node.roleTag
              )}`}
            >
              {node.roleTag}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${statusConfig.bg}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
            <StatusIcon className="h-3 w-3" />
            <span>{statusConfig.label}</span>
          </span>
        </div>

        {/* Title & Description */}
        <div className="mt-3">
          <h4 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
            {node.title}
          </h4>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {node.description}
          </p>
        </div>

        {/* Blocker Alert Banner if Flagged */}
        {node.blocker && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50/90 p-2.5 text-xs text-rose-800">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" />
            <div className="min-w-0 flex-1">
              <span className="font-bold">Blocker Flagged: </span>
              <span className="text-rose-700">{node.blocker.reason}</span>
            </div>
          </div>
        )}

        {/* Progress Bar & Hours */}
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">Phase Progress</span>
            <span
              className={
                node.progressPercent === 100
                  ? "font-extrabold text-emerald-600"
                  : "font-extrabold text-slate-900"
              }
            >
              {node.progressPercent}%
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                node.progressPercent === 100
                  ? "bg-emerald-500"
                  : node.status === "blocked"
                    ? "bg-rose-500"
                    : node.status === "review"
                      ? "bg-amber-500"
                      : "bg-indigo-600"
              }`}
              style={{ width: `${node.progressPercent}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>
              {node.loggedHours}h / {node.estimatedHours}h logged
            </span>
            <span className="font-mono text-slate-600">Due {node.dueDate}</span>
          </div>
        </div>

        {/* Deliverables / Artifacts Pills */}
        {node.artifacts && node.artifacts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {node.artifacts.map((art, idx) => (
              <a
                key={idx}
                href={art.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-700"
              >
                {getArtifactIcon(art.type)}
                <span className="max-w-35 truncate">{art.title}</span>
                <ExternalLink className="h-2.5 w-2.5 opacity-60" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Owner, Reviewer & Direct Action */}
      <div className="mt-4 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          {/* Owner info */}
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white">
              <Image
                src={node.owner.avatar}
                alt={node.owner.name}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs leading-tight font-bold text-slate-900">{node.owner.name}</p>
              <p className="text-[11px] font-medium text-slate-500">{node.owner.role}</p>
            </div>
          </div>

          {/* Quick inspect chevron or update button */}
          <div className="flex items-center gap-1">
            {onQuickUpdate && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickUpdate(node);
                }}
                className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Update
              </button>
            )}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors group-hover:bg-slate-100 group-hover:text-slate-900">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Reviewer indicator line */}
        <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-500">
          <span className="text-slate-400">Reviewer:</span>
          <span className="font-bold text-slate-700">
            {node.reviewer.name} ({node.reviewer.role.split(" ")[0]})
          </span>
        </div>
      </div>
    </motion.div>
  );
}
