import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, getSprints } from "@/server/actions/projects.actions";
import { ProjectDetailPageClient } from "./ProjectDetailPageClient";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return { title: "Project Not Found | Webxode OS" };
  }

  return {
    title: `${project.title} (${project.projectCode}) | Webxode OS`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const sprints = await getSprints(project.id || project.projectCode);

  return <ProjectDetailPageClient initialProject={project} sprints={sprints} />;
}
