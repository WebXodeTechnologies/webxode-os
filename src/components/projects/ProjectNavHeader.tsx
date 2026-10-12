"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Layers,
  Sparkles,
  GitPullRequest,
  Palette,
  Cloud,
  Plus,
  ArrowDownToLine,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

interface ProjectNavHeaderProps {
  totalProjectsCount: number;
  activeSprintsCount?: number;
  healthyEnvsCount?: number;
  onNewProject: () => void;
}

export function ProjectNavHeader({
  totalProjectsCount,
  activeSprintsCount = 4,
  healthyEnvsCount = 11,
  onNewProject,
}: ProjectNavHeaderProps) {
  const pathname = usePathname();

  const navTabs = [
    {
      name: "Portfolio Overview",
      href: "/dashboard/projects",
      icon: Briefcase,
      badge: `${totalProjectsCount}`,
      description: "Executive delivery board & health",
    },
    {
      name: "Sprints & Backlog",
      href: "/dashboard/projects/sprints",
      icon: GitPullRequest,
      badge: `${activeSprintsCount} Active`,
      description: "Agile Kanban, tasks & PR reviews",
    },
    {
      name: "UI/UX Design Studio",
      href: "/dashboard/projects/design",
      icon: Palette,
      badge: "Figma",
      description: "Design systems, wireframes & QA",
    },
    {
      name: "Cloud & DevSecOps",
      href: "/dashboard/projects/devops",
      icon: Cloud,
      badge: `${healthyEnvsCount} Live`,
      description: "Environments, CI/CD & Security",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white px-8 py-8 shadow-xs">
      {/* Decorative ambient gradients */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-linear-to-bl from-indigo-50/70 via-blue-50/20 to-transparent opacity-80" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-50/50 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Headline & Context */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3.5 py-1 text-[10px] font-black tracking-widest text-indigo-700 uppercase shadow-2xs">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              Delivery & DevPhase Engine
            </span>
            <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
            <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <Activity className="h-3 w-3 animate-pulse text-emerald-600" />
              Corporate Agile Framework
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Projects &{" "}
            <span className="bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
              Development Hub
            </span>
          </h1>

          <p className="max-w-2xl text-xs leading-relaxed font-medium text-slate-600 sm:text-sm">
            Unified IT execution lifecycle bridging{" "}
            <strong className="text-slate-800">UI/UX Designers</strong>,{" "}
            <strong className="text-slate-800">Frontend & Backend Engineers</strong>,{" "}
            <strong className="text-slate-800">Project Managers</strong>, and{" "}
            <strong className="text-slate-800">Cloud Architects / DevSecOps</strong> across active
            sprints, Git repositories, and multi-cloud environments.
          </p>
        </div>

        {/* Right: Corporate Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onNewProject}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/30"
          >
            <Plus className="h-4 w-4" />
            <span>Initiate Project</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Modular Tabs */}
      <div className="relative z-10 mt-8 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          {navTabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href as any}
                className={`relative flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{tab.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    isActive ? "bg-indigo-500/30 text-indigo-200" : "bg-slate-200/80 text-slate-700"
                  }`}
                >
                  {tab.badge}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute right-4 -bottom-4.5 left-4 h-0.5 rounded-full bg-indigo-600"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
