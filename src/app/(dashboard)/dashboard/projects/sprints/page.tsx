import React from "react";
import { Metadata } from "next";
import { getSprints } from "@/server/actions/projects.actions";
import { SprintsPageClient } from "./SprintsPageClient";

export const metadata: Metadata = {
  title: "Sprints & Agile Backlog | Projects & Dev | Webxode OS",
  description:
    "Track active 2-week sprints, story points velocity, PR code reviews, and role-based tasks across engineering disciplines.",
};

export default async function SprintsPage() {
  const sprints = await getSprints();

  return <SprintsPageClient initialSprints={sprints} />;
}
