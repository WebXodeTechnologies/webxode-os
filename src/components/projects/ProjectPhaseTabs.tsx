"use client";

import React from "react";
import { ProjectItem, ProjectPhase } from "@/modules/projects/project.types";

interface ProjectPhaseTabsProps {
  currentPhase: string;
  onPhaseChange: (phase: string) => void;
  items: ProjectItem[];
}

export function ProjectPhaseTabs({ currentPhase, onPhaseChange, items }: ProjectPhaseTabsProps) {
  const phases: { label: string; value: string }[] = [
    { label: "All Engagements", value: "All" },
    { label: "Discovery & Arch", value: "Discovery" },
    { label: "Sprint Dev", value: "In Development" },
    { label: "QA & UAT", value: "QA & UAT" },
    { label: "Staging Fleet", value: "Staging" },
    { label: "Production Live", value: "Production" },
    { label: "Maintenance", value: "Maintenance" },
  ];

  const getCount = (phaseValue: string) => {
    if (phaseValue === "All") return items.length;
    return items.filter((i) => i.phase === phaseValue).length;
  };

  return (
    <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1">
      {phases.map((p) => {
        const isSelected = currentPhase === p.value;
        const count = getCount(p.value);

        return (
          <button
            key={p.value}
            type="button"
            onClick={() => onPhaseChange(p.value)}
            className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              isSelected
                ? "bg-slate-900 text-white shadow-xs"
                : "border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>{p.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                isSelected ? "bg-indigo-500/30 text-indigo-200" : "bg-slate-100 text-slate-600"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
