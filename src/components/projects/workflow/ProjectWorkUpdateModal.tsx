"use client";

import React, { useState } from "react";
import { X, Send, Link as LinkIcon } from "lucide-react";
import {
  TeamMemberWorkItem,
  WorkflowNode,
  WorkflowNodeStatus,
} from "@/modules/projects/workflow.types";

interface ProjectWorkUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: TeamMemberWorkItem[];
  nodes: WorkflowNode[];
  initialMember?: TeamMemberWorkItem | null;
  initialNode?: WorkflowNode | null;
  onSubmitUpdate: (data: {
    memberId: string;
    nodeId: string;
    summary: string;
    deliverableUrl?: string;
    progress: number;
    status: WorkflowNodeStatus;
    reportedTo: string;
    isBlocker?: boolean;
    blockerReason?: string;
  }) => void;
}

export function ProjectWorkUpdateModal({
  isOpen,
  onClose,
  teamMembers,
  nodes,
  initialMember,
  initialNode,
  onSubmitUpdate,
}: ProjectWorkUpdateModalProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    () => initialMember?.id || teamMembers[0]?.id || ""
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    () => initialNode?.id || initialMember?.currentNodeId || nodes[0]?.id || ""
  );
  const [summary, setSummary] = useState<string>("");
  const [deliverableUrl, setDeliverableUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(
    () => initialMember?.progress ?? initialNode?.progressPercent ?? 50
  );
  const [status, setStatus] = useState<WorkflowNodeStatus>(
    () => initialNode?.status ?? "in_progress"
  );
  const [reportedTo, setReportedTo] = useState<string>("Tech Lead (David Chen)");
  const [isBlocker, setIsBlocker] = useState<boolean>(false);
  const [blockerReason, setBlockerReason] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    onSubmitUpdate({
      memberId: selectedMemberId,
      nodeId: selectedNodeId,
      summary: summary.trim(),
      deliverableUrl: deliverableUrl.trim() || undefined,
      progress,
      status: isBlocker ? "blocked" : status,
      reportedTo,
      isBlocker,
      blockerReason: isBlocker ? blockerReason.trim() : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Submit Deliverable & Activity Update
              </h3>
              <p className="text-xs text-slate-500">
                Direct progress transmission to Project Manager and Tech Lead
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="max-h-[80vh] space-y-4 overflow-y-auto p-6">
          {/* Member Selection */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Updating Employee / Contributor
            </label>
            <select
              value={selectedMemberId}
              onChange={(e) => {
                setSelectedMemberId(e.target.value);
                const mem = teamMembers.find((m) => m.id === e.target.value);
                if (mem?.currentNodeId) {
                  setSelectedNodeId(mem.currentNodeId);
                  setProgress(mem.progress);
                }
              }}
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              {teamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.role}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Node / Task */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Workflow Node / Pipeline Phase
            </label>
            <select
              value={selectedNodeId}
              onChange={(e) => {
                setSelectedNodeId(e.target.value);
                const node = nodes.find((n) => n.id === e.target.value);
                if (node) {
                  setProgress(node.progressPercent);
                  setStatus(node.status);
                }
              }}
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              {nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  [{n.stageNumber}] {n.stage}: {n.title}
                </option>
              ))}
            </select>
          </div>

          {/* Direct Reporting Destination */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Report Directly To
              </label>
              <select
                value={reportedTo}
                onChange={(e) => setReportedTo(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="Tech Lead (David Chen)">Tech Lead (David Chen)</option>
                <option value="Project Manager (Sarah Jenkins)">
                  Project Manager (Sarah Jenkins)
                </option>
                <option value="Both PM & Tech Lead">Both PM & Tech Lead</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Work Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as WorkflowNodeStatus)}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="in_progress">In Progress</option>
                <option value="review">Ready for Review / Sign-Off</option>
                <option value="completed">Completed & Verified</option>
                <option value="blocked">Blocked / Needs Escalation</option>
              </select>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Task Progress Percentage</span>
              <span className="font-mono text-base font-black text-indigo-600">{progress}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full cursor-pointer accent-indigo-600"
            />
            <div className="mt-1 flex justify-between text-[11px] font-semibold text-slate-400">
              <span>0% (Just started)</span>
              <span>50% (Midway)</span>
              <span>100% (Completed)</span>
            </div>
          </div>

          {/* Deliverable Artifact Link */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Deliverable Artifact Link (Figma, GitHub PR, Cloud URL, Staging)
            </label>
            <div className="relative">
              <LinkIcon className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
              <input
                type="url"
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
                placeholder="https://github.com/webxode/repo/pull/123 or https://figma.com/file/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3.5 pl-9 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Work Summary / Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Activity Summary & What Was Accomplished <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g., Completed API endpoint validation for WebSocket orderbook, wrote integration test suite with 94% coverage, and submitted PR for review."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Blocker Flag Toggle */}
          <div className="rounded-2xl border border-slate-200 p-3.5">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={isBlocker}
                onChange={(e) => setIsBlocker(e.target.checked)}
                className="h-4 w-4 rounded accent-rose-600"
              />
              <span className="text-xs font-bold text-slate-800">
                Flag this item as Blocked (Escalate to PM & Tech Lead)
              </span>
            </label>

            {isBlocker && (
              <div className="mt-3">
                <input
                  type="text"
                  value={blockerReason}
                  onChange={(e) => setBlockerReason(e.target.value)}
                  placeholder="State the blocker reason: e.g., Awaiting OAuth API keys from client team"
                  className="w-full rounded-xl border border-rose-200 bg-rose-50/60 p-2.5 text-xs text-rose-900 placeholder:text-rose-400 focus:border-rose-400 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-indigo-600"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Transmitting Update to {reportedTo.split(" ")[0]}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
