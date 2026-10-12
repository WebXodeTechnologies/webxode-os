"use client";

import React from "react";
import {
  ExternalLink,
  Server,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { ProjectItem } from "@/modules/projects/project.types";

interface DevOpsMultiEnvFleetProps {
  projects: ProjectItem[];
}

export function DevOpsMultiEnvFleet({ projects }: DevOpsMultiEnvFleetProps) {
  const handleDeploy = (projectTitle: string, envName: string) => {
    toast.success(`🚀 Deployment triggered for ${projectTitle} (${envName})!`);
  };

  const getEnvBadge = (status: string) => {
    switch (status) {
      case "Healthy":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "Deploying":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500 animate-ping",
        };
      case "Degraded":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-600 border-slate-200",
          dot: "bg-slate-400",
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900">Corporate Multi-Environment Fleet</h3>
        <span className="text-xs font-semibold text-slate-500">
          {projects.length} Active Cloud Topologies
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id || project._id || project.projectCode}
            className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs"
          >
            {/* Project Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    {project.projectCode}
                  </span>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase">
                    {project.clientName}
                  </span>
                </div>
                <h4 className="mt-0.5 text-sm font-black text-slate-900">{project.title}</h4>
              </div>

              <span className="flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1 text-xs font-bold text-white shadow-2xs">
                <Cloud className="h-3.5 w-3.5 text-indigo-400" />
                <span>{project.environments?.[0]?.cloudProvider || "AWS"}</span>
              </span>
            </div>

            {/* Environments Row */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              {project.environments?.map((env) => {
                const badge = getEnvBadge(env.status);

                return (
                  <div
                    key={env.name}
                    className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-800">
                          {env.name.split(" ")[0]}
                        </span>
                        <span
                          className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${badge.bg}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                          {env.status}
                        </span>
                      </div>

                      <div className="mt-2 text-[10px] text-slate-500">
                        <div>
                          Release: <strong className="text-slate-800">{env.releaseTag}</strong>
                        </div>
                        <div className="mt-0.5 truncate">
                          Uptime: <strong className="text-emerald-700">{env.uptimePercent}%</strong>
                        </div>
                        <div className="mt-0.5 truncate text-[9px] text-slate-400">
                          {env.lastDeployed}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200/50 pt-2">
                      <a
                        href={env.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        <span>Open</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeploy(project.title, env.name)}
                        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-white hover:text-indigo-600"
                        title="Trigger Deploy"
                      >
                        <RotateCw className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
