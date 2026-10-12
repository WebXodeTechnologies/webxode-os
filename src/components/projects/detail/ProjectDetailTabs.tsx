"use client";

import React from "react";
import {
  FileText,
  GitPullRequest,
  Palette,
  Cloud,
  ShieldCheck,
  Users,
  GitFork,
} from "lucide-react";

export type ProjectCockpitTab =
  "overview" | "workflow" | "sprints" | "design" | "cloud" | "security" | "team";

interface ProjectDetailTabsProps {
  activeTab: ProjectCockpitTab;
  onTabChange: (tab: ProjectCockpitTab) => void;
}

export function ProjectDetailTabs({ activeTab, onTabChange }: ProjectDetailTabsProps) {
  const tabs: { id: ProjectCockpitTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview & Milestones", icon: FileText },
    { id: "workflow", label: "Workflow & Activity Graph", icon: GitFork },
    { id: "sprints", label: "Sprints & Execution", icon: GitPullRequest },
    { id: "design", label: "UI/UX & Figma", icon: Palette },
    { id: "cloud", label: "Cloud Environments", icon: Cloud },
    { id: "security", label: "DevSecOps & SLA", icon: ShieldCheck },
    { id: "team", label: "Engineering Roster", icon: Users },
  ];

  return (
    <div className="flex scrollbar-none items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
              isActive
                ? "bg-slate-900 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
