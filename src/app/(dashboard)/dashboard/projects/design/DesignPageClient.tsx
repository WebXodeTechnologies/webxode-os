"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ProjectNavHeader } from "@/components/projects/ProjectNavHeader";
import { DesignStudioHeader } from "@/components/projects/design/DesignStudioHeader";
import { DesignSpecCard } from "@/components/projects/design/DesignSpecCard";
import { DesignHandoffChecklist } from "@/components/projects/design/DesignHandoffChecklist";
import { ProjectItem } from "@/modules/projects/project.types";

interface DesignPageClientProps {
  projects: ProjectItem[];
}

export function DesignPageClient({ projects }: DesignPageClientProps) {
  // Aggregate all design specs from projects
  const allSpecs = projects.flatMap((p) =>
    (p.designSpecs || []).map((spec) => ({
      ...spec,
      projectCode: p.projectCode,
      clientName: p.clientName,
    }))
  );

  const approvedCount = allSpecs.filter((s) => s.status === "Client Approved").length;

  const handleLinkFigma = () => {
    toast.success("Figma Design File connection modal triggered.");
  };

  return (
    <div className="space-y-6">
      {/* 1. Shared Project Navigation Header */}
      <ProjectNavHeader
        totalProjectsCount={projects.length}
        activeSprintsCount={4}
        healthyEnvsCount={11}
        onNewProject={() => {}}
      />

      {/* 2. Design Studio Header */}
      <DesignStudioHeader
        totalSpecsCount={allSpecs.length}
        approvedCount={approvedCount}
        onLinkFigma={handleLinkFigma}
      />

      {/* 3. Design Specs Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allSpecs.map((spec) => (
          <DesignSpecCard
            key={spec.id}
            spec={spec}
            projectCode={spec.projectCode}
            clientName={spec.clientName}
          />
        ))}
      </div>

      {/* 4. Engineering Handoff Checklist */}
      <DesignHandoffChecklist />
    </div>
  );
}
