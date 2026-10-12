"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { ProjectItem, SprintItem } from "@/modules/projects/project.types";
import { deleteProject } from "@/server/actions/projects.actions";
import { ProjectDetailHeader } from "@/components/projects/detail/ProjectDetailHeader";
import {
  ProjectDetailTabs,
  ProjectCockpitTab,
} from "@/components/projects/detail/ProjectDetailTabs";
import { ProjectOverviewTab } from "@/components/projects/detail/ProjectOverviewTab";
import { ProjectWorkflowTab } from "@/components/projects/workflow/ProjectWorkflowTab";
import { ProjectSprintsCockpit } from "@/components/projects/detail/ProjectSprintsCockpit";
import { ProjectFigmaTab } from "@/components/projects/detail/ProjectFigmaTab";
import { ProjectCloudAwsTab } from "@/components/projects/detail/ProjectCloudAwsTab";
import { ProjectDevOpsSlaTab } from "@/components/projects/detail/ProjectDevOpsSlaTab";
import { ProjectTeamRosterTab } from "@/components/projects/detail/ProjectTeamRosterTab";

interface ProjectDetailPageClientProps {
  initialProject: ProjectItem;
  sprints: SprintItem[];
}

export function ProjectDetailPageClient({ initialProject, sprints }: ProjectDetailPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTabParam = searchParams.get("tab") as ProjectCockpitTab | null;

  const [project, setProject] = useState<ProjectItem>(initialProject);
  const [activeTab, setActiveTab] = useState<ProjectCockpitTab>(
    initialTabParam &&
      ["overview", "workflow", "sprints", "design", "cloud", "security", "team"].includes(
        initialTabParam
      )
      ? initialTabParam
      : "overview"
  );

  const projectId = project.id || project._id || project.projectCode;

  // Locate the current sprint or construct an initial active sprint
  const projectSprint: SprintItem = React.useMemo(() => {
    const existing = sprints.find(
      (s) => s.projectId === projectId || s.projectCode === project.projectCode
    );
    if (existing) return existing;

    const now = new Date();
    const twoWeeks = new Date(now.getTime() + 14 * 86400000);
    const fiveDays = new Date(now.getTime() + 5 * 86400000);

    return {
      id: `sprint_${projectId}_1`,
      projectId,
      projectCode: project.projectCode,
      projectTitle: project.title,
      sprintNumber: 1,
      name: `${project.title}: Sprint 1 Core Execution`,
      goal: `MVP release cycle targeting ${project.summary || "Core Product Milestones"}`,
      startDate: now.toISOString().split("T")[0],
      endDate: project.targetLaunchDate || twoWeeks.toISOString().split("T")[0],
      status: "Active",
      storyPointsTotal: 28,
      storyPointsCompleted: 12,
      tasks: [
        {
          id: "task_init_1",
          taskId: `${project.projectCode}-101`,
          title: "System Architecture & Database Schema",
          description: "Initialize MongoDB models, API validation layer, and deployment pipelines.",
          roleTag: "Backend",
          priority: "High",
          status: "Done",
          assignee: project.techLead || "Lead Engineer",
          assigneeRole: "Tech Lead",
          storyPoints: 5,
          estimatedHours: 20,
          dueDate: now.toISOString().split("T")[0],
        },
        {
          id: "task_init_2",
          taskId: `${project.projectCode}-102`,
          title: "Frontend Dashboard Layouts & State Shell",
          description: "Build reactive Next.js client pages with modern UI cards and animations.",
          roleTag: "Frontend",
          priority: "High",
          status: "In Progress",
          assignee: "Frontend Developer",
          assigneeRole: "Frontend Developer",
          storyPoints: 8,
          estimatedHours: 32,
          dueDate: fiveDays.toISOString().split("T")[0],
        },
      ],
    };
  }, [sprints, projectId, project]);

  const handleEditProject = () => {
    toast.success("Project editing drawer triggered.");
  };

  const handleDeleteProject = async () => {
    if (
      !confirm(
        `Are you sure you want to permanently delete "${project.title}" (${project.projectCode})?\n\nThis will remove all associated sprints, cloud logs, and design assets.`
      )
    ) {
      return;
    }

    try {
      const res = await deleteProject(projectId);
      if (res.success) {
        toast.success(`Project ${project.projectCode} deleted successfully`);
        router.push("/dashboard/projects" as any);
      } else {
        toast.error(res.error || "Failed to delete project");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Project Detail Header with Delete button */}
      <ProjectDetailHeader
        project={project}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />

      {/* 2. Cockpit Tabs Navigation */}
      <ProjectDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. Dynamic Tab Content */}
      {activeTab === "overview" && (
        <ProjectOverviewTab project={project} onUpdateProject={setProject} />
      )}

      {activeTab === "workflow" && (
        <ProjectWorkflowTab
          projectId={projectId}
          projectCode={project.projectCode}
          projectTitle={project.title}
        />
      )}

      {activeTab === "sprints" && (
        <ProjectSprintsCockpit
          initialSprint={projectSprint}
          projectId={projectId}
          projectCode={project.projectCode}
        />
      )}

      {activeTab === "design" && (
        <ProjectFigmaTab
          initialSpecs={project.designSpecs || []}
          projectId={projectId}
          projectCode={project.projectCode}
        />
      )}

      {activeTab === "cloud" && (
        <ProjectCloudAwsTab
          initialResources={project.cloudResources || []}
          environments={project.environments || []}
          projectId={projectId}
          projectCode={project.projectCode}
        />
      )}

      {activeTab === "security" && (
        <ProjectDevOpsSlaTab
          initialLogs={project.devopsLogs || []}
          devSecOps={project.devSecOps}
          projectId={projectId}
          projectCode={project.projectCode}
        />
      )}

      {activeTab === "team" && (
        <ProjectTeamRosterTab project={project} onUpdateProject={setProject} />
      )}
    </div>
  );
}
