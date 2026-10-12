"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  AlertTriangle,
  GitPullRequest,
  Palette,
  Cloud,
  FileText,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
  ThumbsUp,
  RotateCcw,
} from "lucide-react";
import { WorkflowNode } from "@/modules/projects/workflow.types";

interface ProjectNodeDetailModalProps {
  node: WorkflowNode | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenUpdateModal: (node: WorkflowNode) => void;
  onApproveNode?: (nodeId: string, comment: string) => void;
  onRequestChanges?: (nodeId: string, comment: string) => void;
}

export function ProjectNodeDetailModal({
  node,
  isOpen,
  onClose,
  onOpenUpdateModal,
  onApproveNode,
  onRequestChanges,
}: ProjectNodeDetailModalProps) {
  const [reviewNote, setReviewNote] = useState<string>("");
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);

  if (!isOpen || !node) return null;

  const handleApprove = () => {
    if (onApproveNode) {
      setIsSubmittingReview(true);
      onApproveNode(
        node.id,
        reviewNote || "Deliverable verified against acceptance criteria and approved."
      );
      setReviewNote("");
      setIsSubmittingReview(false);
    }
  };

  const handleRequestChanges = () => {
    if (onRequestChanges) {
      if (!reviewNote.trim()) {
        alert("Please enter revision instructions for the contributor.");
        return;
      }
      setIsSubmittingReview(true);
      onRequestChanges(node.id, reviewNote.trim());
      setReviewNote("");
      setIsSubmittingReview(false);
    }
  };

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "figma":
        return <Palette className="h-4 w-4 text-pink-500" />;
      case "github_pr":
      case "github_commit":
        return <GitPullRequest className="h-4 w-4 text-sky-500" />;
      case "cloud":
        return <Cloud className="h-4 w-4 text-amber-500" />;
      case "test":
        return <Sparkles className="h-4 w-4 text-teal-500" />;
      case "docs":
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white shadow-2xs">
              {node.stageNumber}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
                  {node.stage}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                  {node.roleTag}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">{node.title}</h3>
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

        {/* Content Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Description & Blockers */}
          <div>
            <p className="text-xs leading-relaxed font-medium text-slate-600">{node.description}</p>

            {node.blocker && (
              <div className="mt-3 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                <div>
                  <h4 className="font-bold text-rose-900">Blocker Flagged:</h4>
                  <p className="mt-0.5 text-rose-700">{node.blocker.reason}</p>
                  <p className="mt-1 text-[11px] font-medium text-rose-600">
                    Flagged by {node.blocker.flaggedBy} on {node.blocker.flaggedAt}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Key Metrics / Stakeholders Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Assigned Contributor */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Assigned Contributor
              </span>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                  <Image
                    src={node.owner.avatar}
                    alt={node.owner.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-900">{node.owner.name}</h5>
                  <p className="text-[11px] font-medium text-slate-500">{node.owner.role}</p>
                </div>
              </div>
            </div>

            {/* Designated Reviewer */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Reviewer & Sign-Off Lead
              </span>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                  <Image
                    src={node.reviewer.avatar}
                    alt={node.reviewer.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-900">{node.reviewer.name}</h5>
                  <p className="text-[11px] font-medium text-slate-500">{node.reviewer.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress & Hours Burn */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Overall Deliverable Progress</span>
              <span className="font-mono text-sm font-black text-slate-900">
                {node.progressPercent}%
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  node.progressPercent === 100 ? "bg-emerald-500" : "bg-indigo-600"
                }`}
                style={{ width: `${node.progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>
                {node.loggedHours} hours logged / {node.estimatedHours} hours estimated
              </span>
              <span>Due Date: {node.dueDate}</span>
            </div>
          </div>

          {/* Deliverables / Artifacts */}
          <div>
            <h4 className="mb-2 text-xs font-black tracking-wider text-slate-600 uppercase">
              Deliverables & Working Artifacts ({node.artifacts.length})
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {node.artifacts.map((art, idx) => (
                <a
                  key={idx}
                  href={art.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-xs transition-colors hover:border-indigo-300 hover:bg-indigo-50/60"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {getArtifactIcon(art.type)}
                    <span className="truncate font-bold text-slate-800">{art.title}</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Activity Updates Timeline */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-xs font-black tracking-wider text-slate-600 uppercase">
                Activity Stream & Work Logs ({node.activityUpdates.length})
              </h4>
              <button
                type="button"
                onClick={() => onOpenUpdateModal(node)}
                className="cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                + Add Work Update
              </button>
            </div>

            <div className="space-y-3">
              {node.activityUpdates.map((update) => (
                <div
                  key={update.id}
                  className="space-y-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                          src={update.avatar}
                          alt={update.author}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-900">{update.author}</span>
                      <span className="text-[11px] text-slate-400">({update.role})</span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-400">
                      {update.timestamp}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed font-medium text-slate-700">
                    {update.message}
                  </p>

                  {update.deliverableUrl && (
                    <a
                      href={update.deliverableUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
                    >
                      <span>Inspect Deliverable Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  {/* Review feedback if present */}
                  {update.reviewComment && (
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                        <span>Lead Reviewer ({update.reviewedBy}):</span>
                      </div>
                      <p className="mt-1 text-slate-600">{update.reviewComment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lead / PM Review & Sign-Off Action Box */}
          <div className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <h4 className="text-xs font-black text-slate-900">
                Lead Reviewer / PM Sign-Off Controls
              </h4>
            </div>

            <textarea
              rows={2}
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              placeholder="Provide review feedback, benchmark notes, or approval comments..."
              className="w-full rounded-xl border border-indigo-200/80 bg-white p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            />

            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleRequestChanges}
                disabled={isSubmittingReview}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Request Revisions</span>
              </button>

              <button
                type="button"
                onClick={handleApprove}
                disabled={isSubmittingReview}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-600"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>Approve & Sign-Off</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenUpdateModal(node)}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Submit Update</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
