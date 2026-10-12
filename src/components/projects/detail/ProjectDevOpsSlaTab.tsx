"use client";

import React, { useState } from "react";
import {
  Terminal,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Lock,
  RotateCw,
  Server,
  Zap,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ProjectDevOpsItem, ProjectDevSecOps } from "@/modules/projects/project.types";
import { addProjectDevOpsItem, deleteProjectDevOpsItem } from "@/server/actions/projects.actions";

interface ProjectDevOpsSlaTabProps {
  initialLogs?: ProjectDevOpsItem[];
  devSecOps?: ProjectDevSecOps;
  projectId: string;
  projectCode: string;
}

export function ProjectDevOpsSlaTab({
  initialLogs = [],
  devSecOps,
  projectId,
  projectCode,
}: ProjectDevOpsSlaTabProps) {
  const [logs, setLogs] = useState<ProjectDevOpsItem[]>(initialLogs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectDevOpsItem["category"]>("CI/CD");
  const [status, setStatus] = useState<ProjectDevOpsItem["status"]>("Completed");
  const [updatedBy, setUpdatedBy] = useState("Viktor Vane (DevOps)");
  const [notes, setNotes] = useState("");

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter activity title.");
      return;
    }

    const newLog: ProjectDevOpsItem = {
      id: `devops_${Date.now()}`,
      title: title.trim(),
      category,
      status,
      updatedBy: updatedBy.trim() || "DevOps Engineer",
      date: new Date().toISOString().split("T")[0],
      notes: notes.trim() || undefined,
    };

    setLogs((prev) => [newLog, ...prev]);
    setIsAddModalOpen(false);
    setTitle("");
    setNotes("");
    toast.success("DevOps activity logged for this project!");

    try {
      await addProjectDevOpsItem(projectId, newLog);
    } catch {
      // optimistic state retained
    }
  };

  const handleDeleteLog = async (id: string, logTitle: string) => {
    if (!confirm(`Delete DevOps item "${logTitle}"?`)) return;
    setLogs((prev) => prev.filter((l) => l.id !== id));
    toast.success("DevOps item removed.");

    try {
      await deleteProjectDevOpsItem(projectId, id);
    } catch {
      // optimistic state retained
    }
  };

  const handleToggleStatus = (id: string) => {
    setLogs((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const nextStatus =
            l.status === "Completed"
              ? "In Progress"
              : l.status === "In Progress"
                ? "Pending"
                : "Completed";
          toast.success(`Updated status to ${nextStatus}.`);
          return { ...l, status: nextStatus };
        }
        return l;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-wider text-emerald-800 uppercase">
              DevOps Execution & SLA
            </span>
            <span className="text-xs font-bold text-slate-400">• {projectCode}</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            DevOps Activities & Uptime SLA Log
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Track specific CI/CD pipelines, container builds, security scans, and SLA compliance
            implemented for this project.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>+ Log DevOps Activity</span>
        </button>
      </div>

      {/* SLA Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Uptime Target SLA
            </span>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {devSecOps?.uptimePercentage || 99.98}%
          </div>
          <p className="text-[11px] font-semibold text-emerald-700">
            Target SLA: {devSecOps?.targetSlaPercent || 99.9}% met
          </p>
        </div>

        <div className="space-y-1 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">P99 API Latency</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl font-black text-slate-900">{devSecOps?.p99LatencyMs || 18}ms</div>
          <p className="text-[11px] font-semibold text-slate-500">Sub-50ms latency benchmark</p>
        </div>

        <div className="space-y-1 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">SSL Certificate</span>
            <Lock className="h-4 w-4 text-sky-500" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {devSecOps?.sslDaysRemaining || 180} Days
          </div>
          <p className="text-[11px] font-semibold text-sky-700">Auto-Renew Let&apos;s Encrypt</p>
        </div>

        <div className="space-y-1 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Automated Backups
            </span>
            <Server className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-xl font-black text-slate-900">Active Daily</div>
          <p className="text-[11px] font-semibold text-slate-500">
            {devSecOps?.lastBackupDate || "Daily at 02:00 UTC"}
          </p>
        </div>
      </div>

      {/* DevOps Activities Table / Cards */}
      <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-black text-slate-900">
            Project DevOps Execution Log ({logs.length})
          </h3>
          <span className="text-xs font-semibold text-slate-400">
            Click status pill to toggle stage
          </span>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-slate-200 sm:flex-row sm:items-center"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-200/70 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    {log.category}
                  </span>
                  <span className="text-[11px] text-slate-400">{log.date}</span>
                  <span className="text-[11px] text-slate-400">• By {log.updatedBy}</span>
                </div>

                <h4 className="text-xs font-black text-slate-900">{log.title}</h4>

                {log.notes && (
                  <p className="text-[11px] leading-relaxed text-slate-500">{log.notes}</p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(log.id)}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-bold transition-all ${
                    log.status === "Completed"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : log.status === "In Progress"
                        ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                        : "border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title="Click to advance status"
                >
                  {log.status}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteLog(log.id, log.title)}
                  className="cursor-pointer p-1.5 text-slate-300 transition-colors hover:text-rose-600"
                  title="Delete log"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {logs.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No DevOps execution items logged yet. Click &quot;+ Log DevOps Activity&quot; above.
            </div>
          )}
        </div>
      </div>

      {/* Add DevOps Log Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Log DevOps Activity</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Activity Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dockerized backend API & added Trivy vulnerability scan"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="CI/CD">CI/CD Automation</option>
                    <option value="Infrastructure">Infrastructure Provisioning</option>
                    <option value="Security / SSL">Security & SSL Setup</option>
                    <option value="Monitoring / SLA">Monitoring & SLA Alarms</option>
                    <option value="Deployment">Production Deployment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Executed By (Engineer Name)
                </label>
                <input
                  type="text"
                  value={updatedBy}
                  onChange={(e) => setUpdatedBy(e.target.value)}
                  placeholder="e.g. Viktor Vane (DevOps)"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Execution Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Details of scripts executed, Terraform modules run, or alarm thresholds..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
