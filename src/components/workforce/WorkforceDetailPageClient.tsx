"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { ProjectItem } from "@/modules/projects/project.types";
import {
  WorkflowNode,
  TeamMemberWorkItem,
  WorkflowNodeStatus,
  ProjectWorkflowData,
} from "@/modules/projects/workflow.types";
import { getProjectWorkflowData } from "@/modules/projects/workflow.mock";
import { ProjectWorkflowGraph } from "@/components/projects/workflow/ProjectWorkflowGraph";
import { ProjectTeamActivityTracker } from "@/components/projects/workflow/ProjectTeamActivityTracker";
import { ProjectWorkUpdateModal } from "@/components/projects/workflow/ProjectWorkUpdateModal";
import { ProjectNodeDetailModal } from "@/components/projects/workflow/ProjectNodeDetailModal";
import { ArrowLeft, GitFork, Users, Send, Calendar, Clock } from "lucide-react";

interface WorkforceDetailPageClientProps {
  project: ProjectItem;
}

export function WorkforceDetailPageClient({ project }: WorkforceDetailPageClientProps) {
  const projectId = project.id || project._id || project.projectCode;

  // Initialize mock data for this project
  const initialData: ProjectWorkflowData = React.useMemo(() => {
    return getProjectWorkflowData(projectId, project.projectCode, project.title);
  }, [projectId, project.projectCode, project.title]);

  const [nodes, setNodes] = useState<WorkflowNode[]>(initialData.nodes);
  const [teamMembers, setTeamMembers] = useState<TeamMemberWorkItem[]>(initialData.teamMembers);

  // View state: both, graph, or team
  const [activeView, setActiveView] = useState<"both" | "graph" | "team">("both");

  // Selection states
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isNodeDetailOpen, setIsNodeDetailOpen] = useState<boolean>(false);

  // Work update modal states
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [updateTargetMember, setUpdateTargetMember] = useState<TeamMemberWorkItem | null>(null);
  const [updateTargetNode, setUpdateTargetNode] = useState<WorkflowNode | null>(null);

  const handleSelectNode = (node: WorkflowNode) => {
    setSelectedNode(node);
    setIsNodeDetailOpen(true);
  };

  const handleOpenUpdateModal = (member?: TeamMemberWorkItem, node?: WorkflowNode) => {
    setUpdateTargetMember(member || null);
    setUpdateTargetNode(node || null);
    setIsUpdateModalOpen(true);
  };

  const handleSelectNodeById = (nodeId: string) => {
    const found = nodes.find((n) => n.id === nodeId);
    if (found) {
      setSelectedNode(found);
      setIsNodeDetailOpen(true);
    }
  };

  const handleSubmitUpdate = (data: {
    memberId: string;
    nodeId: string;
    summary: string;
    deliverableUrl?: string;
    progress: number;
    status: WorkflowNodeStatus;
    reportedTo: string;
    isBlocker?: boolean;
    blockerReason?: string;
  }) => {
    const member = teamMembers.find((m) => m.id === data.memberId);
    const authorName = member?.name || "Team Contributor";
    const authorRole = member?.role || "Engineer";
    const authorAvatar =
      member?.avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    const timestampNow = "Just now";
    const newUpdateId = `act_${Date.now()}`;

    // 1. Update node
    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (n.id !== data.nodeId) return n;

        const newUpdates = [
          {
            id: newUpdateId,
            author: authorName,
            role: authorRole,
            avatar: authorAvatar,
            timestamp: timestampNow,
            message: data.summary,
            progressAfter: data.progress,
            statusAfter: data.status,
            deliverableUrl: data.deliverableUrl,
            reviewedBy: data.reportedTo,
            isApproved: false,
          },
          ...n.activityUpdates,
        ];

        return {
          ...n,
          progressPercent: data.progress,
          status: data.status,
          blocker:
            data.isBlocker && data.blockerReason
              ? {
                  reason: data.blockerReason,
                  flaggedAt: "Just now",
                  flaggedBy: authorName,
                }
              : undefined,
          activityUpdates: newUpdates,
        };
      })
    );

    // 2. Update member
    setTeamMembers((prevMembers) =>
      prevMembers.map((m) => {
        if (m.id !== data.memberId) return m;

        const targetNode = nodes.find((n) => n.id === data.nodeId);
        const newLog = {
          id: `wl_${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          summary: data.summary,
          deliverableUrl: data.deliverableUrl,
          status: data.status,
          reportedTo: data.reportedTo,
          isApproved: false,
        };

        return {
          ...m,
          progress: data.progress,
          status: data.isBlocker
            ? "blocked"
            : data.status === "review"
              ? "reviewing"
              : data.status === "completed"
                ? "completed"
                : "active",
          currentTaskTitle: targetNode ? targetNode.title : m.currentTaskTitle,
          lastUpdated: "Just now",
          recentWorkLogs: [newLog, ...m.recentWorkLogs],
        };
      })
    );

    toast.success(`Work update transmitted directly to ${data.reportedTo} for review!`, {
      icon: "🚀",
    });
  };

  const handleApproveNode = (nodeId: string, comment: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (n.id !== nodeId) return n;
        return {
          ...n,
          status: "completed",
          progressPercent: 100,
          activityUpdates: [
            {
              id: `appr_${Date.now()}`,
              author: n.reviewer.name,
              role: n.reviewer.role,
              avatar: n.reviewer.avatar,
              timestamp: "Just now",
              message: `Milestone signed off: ${comment}`,
              progressAfter: 100,
              statusAfter: "completed",
              reviewedBy: n.reviewer.name,
              isApproved: true,
            },
            ...n.activityUpdates,
          ],
        };
      })
    );

    toast.success("Deliverable signed off and approved by Lead!", { icon: "✅" });
  };

  const handleRequestChanges = (nodeId: string, comment: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (n.id !== nodeId) return n;
        return {
          ...n,
          status: "in_progress",
          activityUpdates: [
            {
              id: `rev_${Date.now()}`,
              author: n.reviewer.name,
              role: n.reviewer.role,
              avatar: n.reviewer.avatar,
              timestamp: "Just now",
              message: `Revision Requested: ${comment}`,
              progressAfter: n.progressPercent,
              statusAfter: "in_progress",
              reviewComment: comment,
              reviewedBy: n.reviewer.name,
              isApproved: false,
            },
            ...n.activityUpdates,
          ],
        };
      })
    );

    toast.error("Revision feedback sent to contributor.", { icon: "📝" });
  };

  // Metrics
  const totalNodes = nodes.length;
  const completedNodes = nodes.filter((n) => n.status === "completed").length;
  const inProgressNodes = nodes.filter((n) => n.status === "in_progress").length;
  const reviewNodes = nodes.filter((n) => n.status === "review").length;
  const blockedNodes = nodes.filter((n) => n.status === "blocked").length;
  const overallProgress =
    totalNodes > 0
      ? Math.round(nodes.reduce((acc, n) => acc + n.progressPercent, 0) / totalNodes)
      : 0;

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Link
          href="/dashboard/workforce"
          className="flex items-center gap-1 text-slate-600 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Developers & Designers Hub</span>
        </Link>
        <span>/</span>
        <span className="font-mono text-slate-400">{project.projectCode}</span>
        <span>/</span>
        <span className="text-slate-900">{project.title}</span>
      </div>

      {/* 2. Project Hero & Coordination Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-500">
              {project.projectCode}
            </span>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
              {project.phase}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
              {teamMembers.length} Specialists Assigned
            </span>
            <span className="text-xs font-bold text-indigo-600">{project.clientName}</span>
          </div>

          <h1 className="mt-1.5 text-2xl font-black text-slate-900">{project.title}</h1>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">{project.summary}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Target Launch: {project.targetLaunchDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              Hours: {project.consumedHours}h / {project.budgetHours}h
            </span>
            <span className="text-slate-400">
              PM: <strong className="text-slate-700">{project.projectManager}</strong> • Lead:{" "}
              <strong className="text-slate-700">{project.techLead}</strong>
            </span>
          </div>
        </div>

        {/* View toggles & Quick Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setActiveView("both")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                activeView === "both"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Unified View
            </button>
            <button
              type="button"
              onClick={() => setActiveView("graph")}
              className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                activeView === "graph"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GitFork className="h-3.5 w-3.5" />
              <span>Workflow Graph</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("team")}
              className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                activeView === "team"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Team Activity</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleOpenUpdateModal()}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-indigo-600"
          >
            <Send className="h-3.5 w-3.5" />
            <span>+ Update Work directly to Lead</span>
          </button>
        </div>
      </div>

      {/* 3. Project Coordination KPI Metric Badges */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Pipeline Progress</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{overallProgress}%</span>
            <span className="text-xs font-semibold text-emerald-600">On Track</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Completed Nodes</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">{completedNodes}</span>
            <span className="text-xs text-slate-400">/ {totalNodes} total</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Lead sign-offs passed</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Active Workstreams</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-sky-600">{inProgressNodes}</span>
            <span className="text-xs text-slate-400">nodes</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Frontend, Backend, DevOps</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Pending Lead Review</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">{reviewNodes}</span>
            <span className="text-xs text-slate-400">awaiting</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">PR & Figma approvals</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Blockers Flagged</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`text-2xl font-black ${blockedNodes > 0 ? "text-rose-600" : "text-slate-400"}`}
            >
              {blockedNodes}
            </span>
            <span className="text-xs text-slate-400">issues</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            {blockedNodes > 0 ? "Requires PM intervention" : "All paths clear"}
          </p>
        </div>
      </div>

      {/* 4. Workflow Graph Section */}
      {(activeView === "both" || activeView === "graph") && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4 text-indigo-600" />
              <h3 className="text-base font-black text-slate-900">
                Pipeline Stages & Node-Based Workflow Graph
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Interactive node graph • Click any node to inspect deliverables & sign-off
            </span>
          </div>

          <ProjectWorkflowGraph
            nodes={nodes}
            selectedNodeId={selectedNode?.id}
            onSelectNode={handleSelectNode}
            onQuickUpdateNode={(node) => handleOpenUpdateModal(undefined, node)}
          />
        </section>
      )}

      {/* 5. Team Activity Monitoring Section */}
      {(activeView === "both" || activeView === "team") && (
        <section className="space-y-3 pt-2">
          <ProjectTeamActivityTracker
            teamMembers={teamMembers}
            onOpenUpdateModal={handleOpenUpdateModal}
            onSelectNodeById={handleSelectNodeById}
          />
        </section>
      )}

      {/* Direct Work Update Modal */}
      <ProjectWorkUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        teamMembers={teamMembers}
        nodes={nodes}
        initialMember={updateTargetMember}
        initialNode={updateTargetNode}
        onSubmitUpdate={handleSubmitUpdate}
      />

      {/* Node Detail Inspection & Review Drawer */}
      <ProjectNodeDetailModal
        node={selectedNode}
        isOpen={isNodeDetailOpen}
        onClose={() => setIsNodeDetailOpen(false)}
        onOpenUpdateModal={(node) => {
          setIsNodeDetailOpen(false);
          handleOpenUpdateModal(undefined, node);
        }}
        onApproveNode={handleApproveNode}
        onRequestChanges={handleRequestChanges}
      />
    </div>
  );
}
