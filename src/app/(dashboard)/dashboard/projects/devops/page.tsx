import React from "react";
import { Metadata } from "next";
import { getProjects, getDevOpsPipelines } from "@/server/actions/projects.actions";
import { DevOpsPageClient } from "./DevOpsPageClient";

export const metadata: Metadata = {
  title: "Cloud & DevSecOps | Projects & Dev | Webxode OS",
  description:
    "Multi-cloud environments (AWS, GCP, Azure, Kubernetes), CI/CD build status, SRE uptime, and DevSecOps compliance scanning.",
};

export default async function DevOpsPage() {
  const projects = await getProjects();
  const pipelines = await getDevOpsPipelines();

  return <DevOpsPageClient projects={projects} pipelineRuns={pipelines} />;
}
