"use client";

import React, { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { ProjectItem, ProjectsDashboardMetrics } from "@/modules/projects/project.types";
import { ProjectNavHeader } from "@/components/projects/ProjectNavHeader";
import { ProjectMetricsOverview } from "@/components/projects/ProjectMetricsOverview";
import { ProjectPhaseTabs } from "@/components/projects/ProjectPhaseTabs";
import { ProjectSearchFilterBar } from "@/components/projects/ProjectSearchFilterBar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectTableView } from "@/components/projects/ProjectTableView";
import { ProjectCreateModal } from "@/components/projects/ProjectCreateModal";
import { ProjectQuickDetailModal } from "@/components/projects/ProjectQuickDetailModal";
import { createProject, deleteProject } from "@/server/actions/projects.actions";

interface ProjectsPageClientProps {
  initialProjects: ProjectItem[];
  initialMetrics: ProjectsDashboardMetrics;
}

export function ProjectsPageClient({ initialProjects, initialMetrics }: ProjectsPageClientProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [metrics, setMetrics] = useState<ProjectsDashboardMetrics>(initialMetrics);

  // Filters & Views
  const [currentPhase, setCurrentPhase] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [quickViewProject, setQuickViewProject] = useState<ProjectItem | null>(null);

  // Filtered Projects computation
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesPhase = currentPhase === "All" || p.phase === currentPhase;
      const matchesCategory = selectedCategory === "All" || p.serviceCategory === selectedCategory;
      const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.clientName.toLowerCase().includes(q) ||
        p.projectCode.toLowerCase().includes(q) ||
        p.projectManager.toLowerCase().includes(q) ||
        p.techLead.toLowerCase().includes(q) ||
        (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(q)));

      return matchesPhase && matchesCategory && matchesStatus && matchesSearch;
    });
  }, [projects, currentPhase, selectedCategory, selectedStatus, searchQuery]);

  // Handlers
  const handleCreateProject = async (data: Partial<ProjectItem>) => {
    const res = await createProject(data);
    if (res.success && res.project) {
      setProjects((prev) => [res.project, ...prev]);
      setMetrics((prev) => ({
        ...prev,
        totalProjects: prev.totalProjects + 1,
        activeProjects: prev.activeProjects + 1,
        totalBudgetHours: prev.totalBudgetHours + (res.project.budgetHours || 0),
        totalContractValue: prev.totalContractValue + (res.project.contractValue || 0),
      }));
    } else {
      throw new Error(res.error || "Failed to create project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this project engagement? This action cannot be undone."
      )
    )
      return;
    setProjects((prev) => prev.filter((p) => p.id !== id && p._id !== id && p.projectCode !== id));
    toast.success("Project removed from portfolio.");
    try {
      await deleteProject(id);
    } catch {
      // optimistic state retained
    }
  };

  const handleResetFilters = () => {
    setCurrentPhase("All");
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
  };

  const handleExport = () => {
    toast.success("Exported Corporate Delivery & Project Portfolio dossier (CSV & PDF).");
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with modular sub-navigation tabs */}
      <ProjectNavHeader
        totalProjectsCount={projects.length}
        activeSprintsCount={4}
        healthyEnvsCount={metrics.environmentsHealthyCount}
        onNewProject={() => setIsCreateModalOpen(true)}
      />

      {/* 2. Executive Corporate Delivery KPIs */}
      <ProjectMetricsOverview metrics={metrics} />

      {/* 3. Phase Filter Pills */}
      <div className="flex flex-col gap-4">
        <ProjectPhaseTabs
          currentPhase={currentPhase}
          onPhaseChange={setCurrentPhase}
          items={projects}
        />

        {/* 4. Search & Filter Bar */}
        <ProjectSearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={handleResetFilters}
          onExport={handleExport}
        />
      </div>

      {/* 5. Main Content: Grid Cards vs Table View */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-12 text-center shadow-2xs">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <span className="text-2xl">📁</span>
          </div>
          <h3 className="text-base font-black text-slate-900">No Engagements Match Your Filters</h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
            Try adjusting your search criteria, phase filter, or clear active filters to view all
            projects.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-600"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id || project._id || project.projectCode}
              project={project}
              onEdit={() => {}}
              onDelete={handleDeleteProject}
              onQuickView={(p) => setQuickViewProject(p)}
            />
          ))}
        </div>
      ) : (
        <ProjectTableView
          projects={filteredProjects}
          onEdit={() => {}}
          onDelete={handleDeleteProject}
          onQuickView={(p) => setQuickViewProject(p)}
        />
      )}

      {/* 6. Initiation Modal */}
      <ProjectCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitCustom={handleCreateProject}
      />

      {/* 7. Quick Detail Inspection Drawer */}
      <ProjectQuickDetailModal
        project={quickViewProject}
        isOpen={!!quickViewProject}
        onClose={() => setQuickViewProject(null)}
      />
    </div>
  );
}
