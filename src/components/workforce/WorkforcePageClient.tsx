"use client";

import React, { useState, useMemo } from "react";
import { ProjectItem } from "@/modules/projects/project.types";
import { WorkforceProjectCard } from "./WorkforceProjectCard";
import { WorkforceLiveFeed } from "./WorkforceLiveFeed";
import { ProjectWorkUpdateModal } from "@/components/projects/workflow/ProjectWorkUpdateModal";
import { MOCK_WORKFLOW_TEAM, MOCK_WORKFLOW_NODES } from "@/modules/projects/workflow.mock";
import { toast } from "react-hot-toast";
import { Search, Filter, Send, GitFork, Briefcase, Activity } from "lucide-react";

interface WorkforcePageClientProps {
  initialProjects: ProjectItem[];
}

export function WorkforcePageClient({ initialProjects }: WorkforcePageClientProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [phaseFilter, setPhaseFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"projects" | "activity">("projects");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  // Filter projects based on search query and phase
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesPhase = phaseFilter === "All" || p.phase === phaseFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.clientName.toLowerCase().includes(q) ||
        p.projectCode.toLowerCase().includes(q) ||
        p.projectManager.toLowerCase().includes(q) ||
        p.techLead.toLowerCase().includes(q) ||
        (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(q)));
      return matchesPhase && matchesSearch;
    });
  }, [projects, searchQuery, phaseFilter]);

  // Overall Workforce Metrics
  const totalSpecialists = 28;
  const activeProjectsCount = projects.filter((p) => p.phase === "In Development").length;
  const avgProgress =
    projects.length > 0
      ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)
      : 0;
  const totalDeliverablesInReview = 8;
  const totalBlockers = 1;

  const handleWorkUpdateSubmit = (data: any) => {
    toast.success(`Deliverable update submitted directly to ${data.reportedTo} for review!`, {
      icon: "🚀",
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Hero Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
              Delivery & Execution Engine
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
              Webxode OS Developers & Designers Hub
            </span>
          </div>

          <h1 className="mt-1.5 text-2xl font-black text-slate-900">
            Developers & Designers Coordination
          </h1>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
            Centralized workforce intelligence across cross-functional roles (Project Manager, Tech
            Lead, UI/UX Designer, Frontend Developer, Backend Developer, DevOps Engineer, QA
            Engineer). Track sprint workflows, live activity feeds, and direct deliverable
            updations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === "projects"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Projects & Teams ({projects.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("activity")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === "activity"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Live Contributor Feed</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsUpdateModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-indigo-600"
          >
            <Send className="h-3.5 w-3.5" />
            <span>+ Submit Work Update</span>
          </button>
        </div>
      </div>

      {/* 2. Workforce Executive KPIs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Engaged Specialists</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{totalSpecialists}</span>
            <span className="text-xs font-semibold text-emerald-600">Active</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">PMs, Leads, Devs & Designers</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Active In-Flight Dev</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-600">{activeProjectsCount}</span>
            <span className="text-xs text-slate-400">/ {projects.length} projects</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">SaaS & Client solutions</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Avg Phase Progress</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{avgProgress}%</span>
            <span className="text-xs font-semibold text-emerald-600">On Target</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${avgProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Deliverables in Review</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">{totalDeliverablesInReview}</span>
            <span className="text-xs text-slate-400">items</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Awaiting Lead Sign-Off</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <span className="text-xs font-bold text-slate-500">Active Blockers</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`text-2xl font-black ${totalBlockers > 0 ? "text-rose-600" : "text-slate-400"}`}
            >
              {totalBlockers}
            </span>
            <span className="text-xs text-slate-400">escalation</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Requires Lead intervention</p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative w-full">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, code, client, developer, tech..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 pr-1 text-xs font-bold text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Phase:</span>
          </div>
          {["All", "Discovery", "In Development", "QA & UAT", "Staging", "Production"].map(
            (phase) => (
              <button
                key={phase}
                type="button"
                onClick={() => setPhaseFilter(phase)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  phaseFilter === phase
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {phase}
              </button>
            )
          )}
        </div>
      </div>

      {/* 4. Tab Content */}
      {activeTab === "projects" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4 text-indigo-600" />
              <h3 className="text-base font-black text-slate-900">
                Active Projects & Assigned Team Rosters ({filteredProjects.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Click &quot;Workflow &amp; Activity Graph&quot; on any project to inspect node
              progress
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-12 text-center shadow-2xs">
              <h3 className="text-base font-black text-slate-900">No Projects Found</h3>
              <p className="mt-1 text-xs text-slate-500">
                No active projects matched &quot;{searchQuery}&quot; or the selected phase filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setPhaseFilter("All");
                }}
                className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-600"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <WorkforceProjectCard
                  key={project.id || project._id || project.projectCode}
                  project={project}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <WorkforceLiveFeed onOpenUpdateModal={() => setIsUpdateModalOpen(true)} />
      )}

      {/* Quick Work Update Modal */}
      <ProjectWorkUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        teamMembers={MOCK_WORKFLOW_TEAM}
        nodes={MOCK_WORKFLOW_NODES}
        onSubmitUpdate={handleWorkUpdateSubmit}
      />
    </div>
  );
}
