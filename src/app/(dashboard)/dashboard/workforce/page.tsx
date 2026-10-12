import React from "react";
import { Metadata } from "next";
import { getProjects } from "@/server/actions/projects.actions";
import { WorkforcePageClient } from "@/components/workforce/WorkforcePageClient";

export const metadata: Metadata = {
  title: "Developers & Designers Hub | Webxode OS",
  description:
    "Cross-functional team coordination, workflow progress tracking, and developer & designer activity monitoring.",
};

export default async function WorkforcePage() {
  const projects = await getProjects();

  return <WorkforcePageClient initialProjects={projects} />;
}
