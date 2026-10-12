import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/server/actions/projects.actions";
import { DEMO_PROJECT_ITEMS } from "@/modules/projects/project.constants";
import { WorkforceDetailPageClient } from "@/components/workforce/WorkforceDetailPageClient";

interface WorkforceDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: WorkforceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project =
    (await getProjectById(id)) ||
    DEMO_PROJECT_ITEMS.find((p) => p.id === id || p.projectCode === id) ||
    DEMO_PROJECT_ITEMS[0];

  return {
    title: `${project.title} | Developers & Designers Workflow | Webxode OS`,
    description: `Workflow progress, cross-functional team coordination, and activity monitoring for ${project.title}`,
  };
}

export default async function WorkforceDetailPage({ params }: WorkforceDetailPageProps) {
  const { id } = await params;
  let project = await getProjectById(id);

  if (!project) {
    project = DEMO_PROJECT_ITEMS.find((p) => p.id === id || p.projectCode === id) || null;
  }

  // Graceful fallback to first demo project if arbitrary test ID is supplied
  if (!project) {
    project = DEMO_PROJECT_ITEMS[0];
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs font-bold text-slate-500">
          Loading project workforce cockpit...
        </div>
      }
    >
      <WorkforceDetailPageClient project={project} />
    </Suspense>
  );
}
