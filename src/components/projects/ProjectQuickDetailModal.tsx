"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  GitBranch,
  Layers,
  Server,
  Cloud,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/modules/projects/project.types";

interface ProjectQuickDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectQuickDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectQuickDetailModalProps) {
  if (!isOpen || !project) return null;

  const projectId = project.id || project._id || project.projectCode;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50/80 p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {project.projectCode}
                  </span>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
                    {project.phase}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    {project.status}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-black text-slate-900">{project.title}</h3>
                <p className="text-xs font-semibold text-indigo-600">
                  {project.clientName}{" "}
                  {project.clientContactPerson && (
                    <span className="font-normal text-slate-400">
                      • {project.clientContactPerson}
                    </span>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="max-h-[65vh] space-y-6 overflow-y-auto p-6 sm:p-8">
            {/* Summary */}
            <div>
              <h4 className="text-[11px] font-black tracking-wider text-slate-400 uppercase">
                Scope & Delivery Summary
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{project.summary}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[10px] font-bold text-slate-400">Completion</span>
                <p className="text-base font-black text-slate-900">{project.progress}%</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[10px] font-bold text-slate-400">Hours Burned</span>
                <p className="text-base font-black text-slate-900">
                  {project.consumedHours}h{" "}
                  <span className="text-xs font-normal text-slate-400">
                    / {project.budgetHours}h
                  </span>
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[10px] font-bold text-slate-400">Contract Value</span>
                <p className="text-base font-black text-emerald-700">
                  ${(project.contractValue || 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[10px] font-bold text-slate-400">Target Launch</span>
                <p className="mt-1 text-xs font-black text-slate-900">{project.targetLaunchDate}</p>
              </div>
            </div>

            {/* Environments Fleet */}
            <div>
              <h4 className="text-[11px] font-black tracking-wider text-slate-400 uppercase">
                Active Cloud Environments Fleet
              </h4>
              <div className="mt-2 space-y-2">
                {project.environments?.map((env) => (
                  <div
                    key={env.name}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/40 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          env.status === "Healthy"
                            ? "bg-emerald-500"
                            : env.status === "Deploying"
                              ? "animate-pulse bg-blue-500"
                              : "bg-slate-300"
                        }`}
                      />
                      <span className="text-xs font-bold text-slate-900">{env.name}</span>
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        {env.cloudProvider} ({env.region})
                      </span>
                    </div>

                    <a
                      href={env.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>Open URL</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Allocation */}
            <div>
              <h4 className="text-[11px] font-black tracking-wider text-slate-400 uppercase">
                Cross-Functional Team Roster
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.teamMembers?.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-1.5 shadow-2xs"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{member.name}</div>
                      <div className="text-[10px] text-slate-400">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 className="text-[11px] font-black tracking-wider text-slate-400 uppercase">
                Key Milestone Gates
              </h4>
              <div className="mt-2 space-y-2">
                {project.milestones?.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`h-4 w-4 ${
                          m.status === "Completed" ? "text-emerald-500" : "text-slate-300"
                        }`}
                      />
                      <span className="font-semibold text-slate-800">{m.title}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold ${
                        m.status === "Completed"
                          ? "text-emerald-600"
                          : m.status === "In Progress"
                            ? "text-indigo-600"
                            : "text-slate-400"
                      }`}
                    >
                      {m.status} ({m.targetDate})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>

            <Link
              href={`/dashboard/projects/${projectId}`}
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
            >
              <span>Open 360° Execution Cockpit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
