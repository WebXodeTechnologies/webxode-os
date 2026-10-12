"use client";

import React from "react";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  Cloud,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { ProjectsDashboardMetrics } from "@/modules/projects/project.types";

interface ProjectMetricsOverviewProps {
  metrics: ProjectsDashboardMetrics;
}

export function ProjectMetricsOverview({ metrics }: ProjectMetricsOverviewProps) {
  const hoursBurnPercent = metrics.totalBudgetHours
    ? Math.min(100, Math.round((metrics.totalConsumedHours / metrics.totalBudgetHours) * 100))
    : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" as const },
    }),
  };

  const cards = [
    {
      title: "Active Engagements",
      value: `${metrics.activeProjects} Projects`,
      subtitle: `${metrics.onTrackRatePercent}% On-Track Delivery`,
      icon: Briefcase,
      color: "indigo",
      bgGradient: "from-indigo-500/10 via-indigo-50/20 to-transparent",
      iconBg: "bg-indigo-600 text-white",
      badgeText: `${metrics.totalProjects} Total In Portfolio`,
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    },
    {
      title: "Engineering Hours Burn",
      value: `${metrics.totalConsumedHours.toLocaleString()}h / ${metrics.totalBudgetHours.toLocaleString()}h`,
      subtitle: `${hoursBurnPercent}% Allocated Budget Utilized`,
      icon: Clock,
      color: "sky",
      bgGradient: "from-sky-500/10 via-sky-50/20 to-transparent",
      iconBg: "bg-sky-600 text-white",
      badgeText: `${metrics.totalBudgetHours - metrics.totalConsumedHours}h Remaining`,
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200/60",
      showProgressBar: true,
      progressValue: hoursBurnPercent,
    },
    {
      title: "Contract Portfolio",
      value: `$${(metrics.totalContractValue / 1000).toFixed(1)}k`,
      subtitle: "Active Delivery Value",
      icon: DollarSign,
      color: "emerald",
      bgGradient: "from-emerald-500/10 via-emerald-50/20 to-transparent",
      iconBg: "bg-emerald-600 text-white",
      badgeText: "Won SOW Baselined",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    },
    {
      title: "Multi-Cloud Fleet",
      value: `${metrics.environmentsHealthyCount} / ${metrics.environmentsTotalCount} Envs`,
      subtitle: "Dev • Staging • Production",
      icon: Cloud,
      color: "purple",
      bgGradient: "from-purple-500/10 via-purple-50/20 to-transparent",
      iconBg: "bg-purple-600 text-white",
      badgeText: "High Availability 99.9%",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/60",
    },
    {
      title: "DevSecOps & Reliability",
      value: `Grade ${metrics.securityGradeAvg}`,
      subtitle: `${metrics.criticalBlockersCount === 0 ? "Zero Critical Blockers" : `${metrics.criticalBlockersCount} Blockers Active`}`,
      icon: ShieldCheck,
      color: "amber",
      bgGradient: "from-amber-500/10 via-amber-50/20 to-transparent",
      iconBg: "bg-amber-600 text-white",
      badgeText: "SOC2 & OWASP Audited",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-all hover:border-slate-300 hover:shadow-xs"
          >
            {/* Top ambient color glow */}
            <div
              className={`pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-linear-to-bl ${card.bgGradient} blur-xl`}
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                {card.title}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-2xl shadow-sm ${card.iconBg}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-black tracking-tight text-slate-900">{card.value}</h3>
              <p className="mt-1 text-xs font-semibold text-slate-500">{card.subtitle}</p>
            </div>

            {card.showProgressBar && (
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-sky-500 transition-all duration-700"
                    style={{ width: `${card.progressValue}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${card.badgeColor}`}
              >
                {card.badgeText}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
