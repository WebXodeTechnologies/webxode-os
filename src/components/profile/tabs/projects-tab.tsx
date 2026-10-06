// src/components/profile/tabs/projects-tab.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  Briefcase,
  CheckCircle2,
  Clock,
  Users,
  ArrowUpRight,
  Globe,
  Smartphone,
  Palette,
  Cloud,
  Lightbulb,
  Search,
  Code2,
  Layers,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ITProject {
  id: string;
  title: string;
  client: string;
  serviceCategory: "webdev" | "mobile" | "uiux" | "devops" | "consulting";
  serviceLabel: string;
  serviceIcon: React.ComponentType<{ className?: string }>;
  role: string;
  contractValue: string;
  progress: number;
  status: "In Progress" | "Completed" | "Discovery Sprint" | "Q4 Delivery";
  deadline: string;
  teamSize: number;
  tags: string[];
  badgeBg: string;
  barColor: string;
}

const IT_PROJECTS: ITProject[] = [
  {
    id: "PRJ-801",
    title: "Next.js 15 B2B E-Commerce Platform",
    client: "Global Logistics Inc",
    serviceCategory: "webdev",
    serviceLabel: "Web Development",
    serviceIcon: Globe,
    role: "Lead Full-Stack Architect",
    contractValue: "$48,000",
    progress: 85,
    status: "In Progress",
    deadline: "Nov 30, 2026",
    teamSize: 7,
    tags: ["Next.js 15", "TypeScript", "TailwindCSS", "Node.js"],
    badgeBg: "bg-indigo-100 text-indigo-700 border-indigo-200",
    barColor: "bg-indigo-600",
  },
  {
    id: "PRJ-802",
    title: "iOS & Android Fintech Wallet App",
    client: "PayStream Financial",
    serviceCategory: "mobile",
    serviceLabel: "Mobile Development",
    serviceIcon: Smartphone,
    role: "Mobile Solutions Lead",
    contractValue: "$65,000",
    progress: 60,
    status: "In Progress",
    deadline: "Dec 20, 2026",
    teamSize: 6,
    tags: ["React Native", "Expo", "Stripe SDK", "Biometrics"],
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200",
    barColor: "bg-purple-600",
  },
  {
    id: "PRJ-803",
    title: "AWS Multi-Region EKS Cloud Migration",
    client: "Acme Enterprise Systems",
    serviceCategory: "devops",
    serviceLabel: "Cloud & DevOps",
    serviceIcon: Cloud,
    role: "Cloud DevOps Architect",
    contractValue: "$38,000",
    progress: 100,
    status: "Completed",
    deadline: "Oct 01, 2026",
    teamSize: 5,
    tags: ["AWS EKS", "Terraform", "Kubernetes", "CI/CD"],
    badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
    barColor: "bg-emerald-600",
  },
  {
    id: "PRJ-804",
    title: "Design System & SaaS UI/UX Modernization",
    client: "Nova Analytics Corp",
    serviceCategory: "uiux",
    serviceLabel: "UI/UX Design",
    serviceIcon: Palette,
    role: "Design System Supervisor",
    contractValue: "$22,000",
    progress: 40,
    status: "Discovery Sprint",
    deadline: "Jan 15, 2027",
    teamSize: 4,
    tags: ["Figma", "Design Tokens", "User Testing", "Prototypes"],
    badgeBg: "bg-cyan-100 text-cyan-700 border-cyan-200",
    barColor: "bg-cyan-600",
  },
  {
    id: "PRJ-805",
    title: "Enterprise AI Architecture & Tech Stack Audit",
    client: "Apex HealthTech",
    serviceCategory: "consulting",
    serviceLabel: "IT Consulting",
    serviceIcon: Lightbulb,
    role: "Principal Tech Consultant",
    contractValue: "$18,000 Retainer",
    progress: 90,
    status: "Q4 Delivery",
    deadline: "Nov 10, 2026",
    teamSize: 3,
    tags: ["AI Advisory", "Security Audit", "API Architecture"],
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
    barColor: "bg-amber-600",
  },
];

export function ProjectsTab() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const serviceCategories = [
    { id: "all", label: "All IT Services" },
    { id: "webdev", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "uiux", label: "UI/UX Design" },
    { id: "devops", label: "Cloud & DevOps" },
    { id: "consulting", label: "IT Consulting" },
  ];

  const filteredProjects = IT_PROJECTS.filter((p) => {
    const matchesCat = activeCategory === "all" || p.serviceCategory === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            IT Services & Development Deliverables
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Track Web Development, Mobile Apps, UI/UX Systems, Cloud/DevOps infrastructure, and IT
            Consulting contracts.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.info("New IT Service Contract", {
              description: "Opening project creation form...",
            })
          }
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New IT Project</span>
        </button>
      </div>

      {/* Service Category Pills & Search */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* IT Category Pills */}
          <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative flex min-w-55 items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech, client, project..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pr-4 pl-10 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* IT Projects Grid across sm, md, lg, xl, 2xl */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredProjects.map((proj) => {
          const CategoryIcon = proj.serviceIcon;
          return (
            <div
              key={proj.id}
              className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-sm"
            >
              <div className="space-y-3">
                {/* Client & Category Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <CategoryIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-wide text-indigo-600 uppercase">
                        {proj.client}
                      </span>
                      <p className="text-[11px] font-semibold text-slate-400">
                        {proj.serviceLabel}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${proj.badgeBg} shrink-0`}
                  >
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-sm leading-snug font-extrabold text-slate-900 sm:text-base">
                  {proj.title}
                </h3>

                {/* Role & Contract Value */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-1 text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" /> {proj.role}
                  </span>
                  <span className="font-extrabold text-slate-900">{proj.contractValue}</span>
                </div>

                {/* Progress Meter */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Sprint Deliverable</span>
                    <span>{proj.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full ${proj.barColor} transition-all duration-500`}
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Deadline & Action */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span className="flex items-center gap-1 font-medium text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> Due {proj.deadline}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Project SOW & Milestones", { description: `Opening ${proj.title}` })
                  }
                  className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                >
                  <span>SOW Details</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="space-y-2 py-12 text-center text-slate-500">
          <Layers className="mx-auto h-8 w-8 text-slate-300" />
          <p className="text-sm font-bold text-slate-800">No IT projects found</p>
          <p className="text-xs text-slate-400">
            Try adjusting your service category filter or search query.
          </p>
        </div>
      )}
    </div>
  );
}
