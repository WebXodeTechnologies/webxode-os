"use client";

import { useState } from "react";
import { Users, FileText, Workflow, DollarSign, Check, ArrowRight, Layers } from "lucide-react";

const modulesData = [
  {
    id: "sales",
    title: "1. Sales & CRM Pipeline",
    shortName: "Sales",
    icon: Users,
    headline: "Never Lose a Qualified Prospect Again",
    description:
      "Full visibility into lead source, qualification scores, deal stages, client interaction history, and follow-up schedules.",
    points: [
      "Automated lead capture & lead scoring engine",
      "Kanban pipeline with customizable stage rules",
      "Lead owner accountability & activity logging",
      "Automated deal probability & revenue forecasting",
    ],
    stat: "$2.4M+",
    statLabel: "Active Pipeline Value",
    accentBg: "from-blue-600/20 to-indigo-600/10",
  },
  {
    id: "presales",
    title: "2. Presales & Proposal Hub",
    shortName: "Presales",
    icon: FileText,
    headline: "Turn Requirements into Approved Quotes in Hours",
    description:
      "Standardize client proposals with modular technical scope items, resource estimations, margin validation, and automated PDF quotes.",
    points: [
      "Pre-built scope item templates for fast estimations",
      "Real-time profit margin & risk multiplier calculations",
      "Role-based approval gates before client dispatch",
      "Client sign-off tracking & digital quote confirmation",
    ],
    stat: "15 mins",
    statLabel: "Average Proposal Creation Time",
    accentBg: "from-indigo-600/20 to-violet-600/10",
  },
  {
    id: "projects",
    title: "3. Project Execution & Delivery",
    shortName: "Projects",
    icon: Workflow,
    headline: "Seamless Transition from Deal Won to Live Sprint",
    description:
      "Instant workspace generation upon deal conversion. Manage sprint backlogs, QA verification gates, developer bandwidth, and milestone signoffs.",
    points: [
      "Automatic project creation upon quote approval",
      "Milestone progress tracking & sprint velocity",
      "Granular task breakdown with clear developer assignment",
      "QA checklist verification before client review",
    ],
    stat: "99.2%",
    statLabel: "On-Time Milestone Delivery",
    accentBg: "from-violet-600/20 to-purple-600/10",
  },
  {
    id: "finance",
    title: "4. Financial & Workforce Intelligence",
    shortName: "Finance",
    icon: DollarSign,
    headline: "Complete Real-Time Visibility into Agency Cashflow",
    description:
      "Track recurring revenue, outstanding invoice milestones, developer hourly rates, project margins, and workforce profitability.",
    points: [
      "Automated milestone invoice reminders",
      "Real-time agency gross margin & net profit monitoring",
      "Workforce utilization & developer allocation heatmaps",
      "Historical project profitability auditing",
    ],
    stat: "58%",
    statLabel: "Average Net Profit Margin",
    accentBg: "from-cyan-600/20 to-blue-600/10",
  },
];

export function ModulesShowcase() {
  const [activeModuleId, setActiveModuleId] = useState("sales");
  const activeModule = modulesData.find((m) => m.id === activeModuleId) || modulesData[0];
  const Icon = activeModule.icon;

  return (
    <section
      id="modules"
      className="relative border-t border-slate-900 bg-slate-950 py-24 lg:py-32"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-linear-to-tr from-violet-600/10 via-indigo-600/10 to-transparent blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-400">
            <Layers className="h-3.5 w-3.5" />
            <span>THE END-TO-END SUITE</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Explore the Core Operational Modules
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Every module is tightly integrated. Information flows seamlessly from initial sales
            leads down to final invoice payments.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="mx-auto mb-12 flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2 backdrop-blur-md">
          {modulesData.map((mod) => {
            const ModIcon = mod.icon;
            const isActive = mod.id === activeModuleId;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveModuleId(mod.id)}
                className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "scale-[1.02] bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <ModIcon className="h-4 w-4" />
                <span>{mod.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Card */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          <div
            className={`pointer-events-none absolute inset-0 -z-10 bg-linear-to-br ${activeModule.accentBg} opacity-50 transition-all duration-500`}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-indigo-400">
                <Icon className="h-4 w-4" />
                <span>{activeModule.title}</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {activeModule.headline}
              </h3>

              <p className="text-base leading-relaxed text-slate-300">{activeModule.description}</p>

              {/* Bullet Points */}
              <ul className="space-y-3">
                {activeModule.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Stat Display */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-950/80 p-8 text-center shadow-xl lg:col-span-5">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 shadow-inner">
                <Icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-black text-white sm:text-5xl">{activeModule.stat}</div>
              <div className="mt-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {activeModule.statLabel}
              </div>

              <div className="mt-8 flex w-full justify-center border-t border-slate-800/80 pt-6">
                <span className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300">
                  <span>Explore Module Features</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
