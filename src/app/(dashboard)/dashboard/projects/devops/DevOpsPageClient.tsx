"use client";

import React from "react";
import { toast } from "react-hot-toast";
import { ProjectNavHeader } from "@/components/projects/ProjectNavHeader";
import { DevOpsHeader } from "@/components/projects/devops/DevOpsHeader";
import { DevOpsMultiEnvFleet } from "@/components/projects/devops/DevOpsMultiEnvFleet";
import { DevOpsPipelineTracker } from "@/components/projects/devops/DevOpsPipelineTracker";
import { DevSecOpsSecurityMonitor } from "@/components/projects/devops/DevSecOpsSecurityMonitor";
import { ProjectItem, DevOpsPipelineRun } from "@/modules/projects/project.types";

interface DevOpsPageClientProps {
  projects: ProjectItem[];
  pipelineRuns: DevOpsPipelineRun[];
}

export function DevOpsPageClient({ projects, pipelineRuns }: DevOpsPageClientProps) {
  let envHealthy = 0;
  let envTotal = 0;
  projects.forEach((p) => {
    (p.environments || []).forEach((e) => {
      envTotal++;
      if (e.status === "Healthy") envHealthy++;
    });
  });

  const handleDeployAllStaging = () => {
    toast.success(
      "🚀 Automated CI/CD Staging deployment triggered across all active repositories."
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Shared Project Navigation Header */}
      <ProjectNavHeader
        totalProjectsCount={projects.length}
        activeSprintsCount={4}
        healthyEnvsCount={envHealthy}
        onNewProject={() => {}}
      />

      {/* 2. DevOps Hub Header */}
      <DevOpsHeader
        healthyCount={envHealthy}
        totalCount={envTotal}
        onDeployAllStaging={handleDeployAllStaging}
      />

      {/* 3. Multi-Cloud Environments Fleet */}
      <DevOpsMultiEnvFleet projects={projects} />

      {/* 4. CI/CD Pipeline Runs Tracker */}
      <DevOpsPipelineTracker pipelineRuns={pipelineRuns} />

      {/* 5. DevSecOps & Security Monitor */}
      <DevSecOpsSecurityMonitor />
    </div>
  );
}
