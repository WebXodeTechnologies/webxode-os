import React from "react";
import { Metadata } from "next";
import { getProjects, getProjectsDashboardMetrics } from "@/server/actions/projects.actions";
import { ProjectsPageClient } from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects & Development | Webxode OS",
  description:
    "Corporate IT Delivery Engine: Sprints, Epics, UI/UX Design System, Cloud Multi-Environments, CI/CD, and DevSecOps.",
};

export default async function ProjectsPage() {
  const initialProjects = await getProjects();
  const initialMetrics = await getProjectsDashboardMetrics();

  return <ProjectsPageClient initialProjects={initialProjects} initialMetrics={initialMetrics} />;
}
