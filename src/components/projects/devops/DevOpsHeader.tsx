"use client";

import React from "react";
import { Cloud, ShieldCheck, Activity, Terminal, Play, Cpu, CheckCircle2 } from "lucide-react";

interface DevOpsHeaderProps {
  healthyCount: number;
  totalCount: number;
  onDeployAllStaging: () => void;
}

export function DevOpsHeader({ healthyCount, totalCount, onDeployAllStaging }: DevOpsHeaderProps) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black tracking-wider text-purple-800 uppercase">
              Cloud Infrastructure & DevSecOps
            </span>
            <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
            <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <Activity className="h-3 w-3 animate-pulse text-emerald-500" />
              {healthyCount} of {totalCount} Envs Healthy
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Multi-Cloud Fleet & CI/CD Pipelines
          </h2>

          <p className="max-w-2xl text-xs leading-relaxed font-medium text-slate-600 sm:text-sm">
            Corporate environment topology across <strong className="text-slate-800">AWS</strong>,{" "}
            <strong className="text-slate-800">GCP</strong>,{" "}
            <strong className="text-slate-800">Azure</strong>, and{" "}
            <strong className="text-slate-800">Kubernetes EKS</strong>: Real-time container health,
            automated CI/CD pipeline triggers, SSL certificates, and DevSecOps compliance scanning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDeployAllStaging}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700"
          >
            <Play className="h-4 w-4" />
            <span>Trigger CI/CD Pipeline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
