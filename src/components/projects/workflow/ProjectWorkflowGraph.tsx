"use client";

import React, { useState, useMemo } from "react";
import { WorkflowNode, WorkflowStage } from "@/modules/projects/workflow.types";
import { ProjectWorkflowNodeCard } from "./ProjectWorkflowNodeCard";
import { GitFork, ArrowRight, Zap } from "lucide-react";

interface ProjectWorkflowGraphProps {
  nodes: WorkflowNode[];
  selectedNodeId?: string;
  onSelectNode: (node: WorkflowNode) => void;
  onQuickUpdateNode?: (node: WorkflowNode) => void;
}

const STAGES: { stage: WorkflowStage; stageNumber: number; description: string }[] = [
  {
    stage: "Architecture & Specs",
    stageNumber: 1,
    description: "System design, database schemas, and contracts",
  },
  {
    stage: "UI/UX & Design System",
    stageNumber: 2,
    description: "Figma design tokens, wireframes, and UX flows",
  },
  {
    stage: "Core Engineering & Dev",
    stageNumber: 3,
    description: "Fullstack implementation, API endpoints & state",
  },
  {
    stage: "Cloud & DevSecOps",
    stageNumber: 4,
    description: "AWS cloud infrastructure, CI/CD and container fleets",
  },
  {
    stage: "QA, UAT & Launch",
    stageNumber: 5,
    description: "End-to-end testing, client demo & staging rollout",
  },
];

export function ProjectWorkflowGraph({
  nodes,
  selectedNodeId,
  onSelectNode,
  onQuickUpdateNode,
}: ProjectWorkflowGraphProps) {
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showCriticalPathOnly, setShowCriticalPathOnly] = useState<boolean>(false);

  // Filter nodes based on user selection
  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => {
      const matchesRole = roleFilter === "All" || n.roleTag === roleFilter;
      const matchesStatus = statusFilter === "All" || n.status === statusFilter;
      const matchesCritical =
        !showCriticalPathOnly ||
        n.status === "in_progress" ||
        n.status === "review" ||
        n.status === "blocked";
      return matchesRole && matchesStatus && matchesCritical;
    });
  }, [nodes, roleFilter, statusFilter, showCriticalPathOnly]);

  // Group nodes by stage
  const stageGroups = useMemo(() => {
    return STAGES.map((s) => {
      const stageNodes = filteredNodes.filter((n) => n.stage === s.stage);
      const allStageNodes = nodes.filter((n) => n.stage === s.stage);
      const completedCount = allStageNodes.filter((n) => n.status === "completed").length;
      const progressPercent =
        allStageNodes.length > 0
          ? Math.round(
              allStageNodes.reduce((acc, curr) => acc + curr.progressPercent, 0) /
                allStageNodes.length
            )
          : 0;

      return {
        ...s,
        nodes: stageNodes,
        totalNodesCount: allStageNodes.length,
        completedCount,
        progressPercent,
      };
    });
  }, [nodes, filteredNodes]);

  // Calculate overall metrics
  const totalCompleted = nodes.filter((n) => n.status === "completed").length;
  const totalBlocked = nodes.filter((n) => n.status === "blocked").length;
  const totalReview = nodes.filter((n) => n.status === "review").length;
  const totalInProgress = nodes.filter((n) => n.status === "in_progress").length;

  return (
    <div className="space-y-4">
      {/* 1. Workflow Controls & Graph Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 border-r border-slate-200 pr-2">
            <GitFork className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">Pipeline Filter:</span>
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Roles Engaged</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Tech Lead">Tech Lead</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="QA Engineer">QA Engineer</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Node Statuses</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Needs Review</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
            <option value="pending">Pending</option>
          </select>

          {/* Quick Critical Path Toggle */}
          <button
            type="button"
            onClick={() => setShowCriticalPathOnly(!showCriticalPathOnly)}
            className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
              showCriticalPathOnly
                ? "border-amber-400 bg-amber-50 text-amber-800 shadow-xs"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Zap
              className={`h-3.5 w-3.5 ${showCriticalPathOnly ? "fill-amber-500 text-amber-600" : "text-slate-400"}`}
            />
            <span>Active & Blocked Only</span>
          </button>
        </div>

        {/* Quick Legend Indicators */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {totalCompleted} Done
          </span>
          <span className="flex items-center gap-1 rounded-lg border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-bold text-sky-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
            {totalInProgress} Active
          </span>
          <span className="flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {totalReview} In Review
          </span>
          {totalBlocked > 0 && (
            <span className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-rose-500" />
              {totalBlocked} Blocked
            </span>
          )}
        </div>
      </div>

      {/* 2. Visual Stage Flow Diagram & Pipeline Canvas */}
      <div className="relative rounded-[2rem] border border-slate-200/90 bg-linear-to-b from-slate-50/80 via-white to-slate-50/80 p-6 shadow-xs">
        {/* Subtle grid pattern background */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px] opacity-60" />

        {/* Stage Timeline Header Pills */}
        <div className="relative mb-6 flex scrollbar-none items-center gap-4 overflow-x-auto pb-2">
          {STAGES.map((s, idx) => {
            const isLast = idx === STAGES.length - 1;
            const stageGroup = stageGroups.find((sg) => sg.stage === s.stage);
            const isAllCompleted =
              stageGroup &&
              stageGroup.completedCount === stageGroup.totalNodesCount &&
              stageGroup.totalNodesCount > 0;

            return (
              <React.Fragment key={s.stage}>
                <div
                  className={`flex shrink-0 items-center gap-2 rounded-2xl border px-3.5 py-2 transition-all ${
                    isAllCompleted
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200/80 bg-white text-slate-800 shadow-2xs"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-lg text-xs font-black ${
                      isAllCompleted ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"
                    }`}
                  >
                    {s.stageNumber}
                  </span>
                  <span className="text-xs font-bold">{s.stage}</span>
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-600">
                    {stageGroup?.progressPercent || 0}%
                  </span>
                </div>
                {!isLast && <ArrowRight className="h-4 w-4 shrink-0 text-slate-300" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Scrollable Stage Columns with Connection Nodes */}
        <div className="relative flex scrollbar-none gap-6 overflow-x-auto pb-4">
          {stageGroups.map((stageGroup, stageIdx) => {
            const isCompletedStage =
              stageGroup.completedCount === stageGroup.totalNodesCount &&
              stageGroup.totalNodesCount > 0;

            return (
              <div
                key={stageGroup.stage}
                className="flex w-88 shrink-0 flex-col rounded-3xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all"
              >
                {/* Column Stage Header */}
                <div className="mb-4 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white shadow-2xs">
                        {stageGroup.stageNumber}
                      </span>
                      <h3 className="text-xs font-black tracking-tight text-slate-900">
                        {stageGroup.stage}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        isCompletedStage
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-indigo-50 text-indigo-700"
                      }`}
                    >
                      {stageGroup.progressPercent}%
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-500">{stageGroup.description}</p>

                  {/* Stage Progress Bar */}
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompletedStage ? "bg-emerald-500" : "bg-indigo-600"
                      }`}
                      style={{ width: `${stageGroup.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Nodes Stack */}
                <div className="space-y-4">
                  {stageGroup.nodes.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center">
                      <p className="text-xs font-medium text-slate-400">
                        No nodes matching current filters in this stage
                      </p>
                    </div>
                  ) : (
                    stageGroup.nodes.map((node, nodeIdx) => (
                      <React.Fragment key={node.id}>
                        <ProjectWorkflowNodeCard
                          node={node}
                          isSelected={selectedNodeId === node.id}
                          onSelect={onSelectNode}
                          onQuickUpdate={onQuickUpdateNode}
                        />

                        {/* Visual connecting pipe between stacked nodes in same column */}
                        {nodeIdx < stageGroup.nodes.length - 1 && (
                          <div className="flex justify-center py-1">
                            <div className="h-4 w-0.5 bg-linear-to-b from-indigo-300 to-indigo-100" />
                          </div>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
