import React from "react";
import { Metadata } from "next";
import { getProjects } from "@/server/actions/projects.actions";
import { DesignPageClient } from "./DesignPageClient";

export const metadata: Metadata = {
  title: "UI/UX Design Studio | Projects & Dev | Webxode OS",
  description:
    "Figma design systems, screen artboards, interactive prototypes, and pixel-perfect Design QA handoff gates.",
};

export default async function DesignPage() {
  const projects = await getProjects();

  return <DesignPageClient projects={projects} />;
}
