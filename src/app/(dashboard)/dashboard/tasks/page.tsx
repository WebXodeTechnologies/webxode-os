import React from "react";
import { Metadata } from "next";
import { TasksPageClient } from "./TasksPageClient";

export const metadata: Metadata = {
  title: "Tasks & Agile Delivery Kanban | Webxode OS",
  description:
    "Enterprise IT Services & Product Kanban Cockpit: Multi-Squad Sprints, Developer Bandwidth, Meeting Call Logs, and Activity Audit Stream.",
};

export default function TasksPage() {
  return <TasksPageClient />;
}
