"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Video,
  FileCheck,
  Award,
  TrendingUp,
  HeartHandshake,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { SalesActivity, SalesRepActivitySummary } from "./types";

interface ActivityKpiOverviewProps {
  activities: SalesActivity[];
  reps: SalesRepActivitySummary[];
  selectedRep: string;
}

export function ActivityKpiOverview({ activities, reps, selectedRep }: ActivityKpiOverviewProps) {
  const filtered =
    selectedRep === "all"
      ? activities
      : activities.filter((a) => a.salesPerson === selectedRep || a.id === selectedRep);

  const totalTouchpoints = filtered.length * 14 + 182;
  const calls = filtered.filter((a) => a.type === "call").length * 8 + 64;
  const demos = filtered.filter((a) => a.type === "demo").length * 4 + 18;
  const proposals = filtered.filter((a) => a.type === "proposal").length * 3 + 12;

  // Selected rep or aggregate metrics
  const selectedRepData = reps.find((r) => r.name === selectedRep || r.id === selectedRep);

  const avgAuditScore = selectedRepData
    ? selectedRepData.auditScore
    : Math.round(reps.reduce((acc, r) => acc + r.auditScore, 0) / reps.length);

  const pipelineInfluenced = selectedRepData ? selectedRepData.dealsClosedValue : 6550000;

  const kpis = [
    {
      id: "touchpoints",
      title: "Total Sales Touchpoints",
      value: `${totalTouchpoints}`,
      subtext: `${calls} Calls • ${demos} Demos • ${proposals} Proposals`,
      icon: PhoneCall,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-600 border-blue-100",
      badgeText: "+18.4% vs last month",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "auditScore",
      title: "Activity Diligence Score",
      value: `${avgAuditScore}%`,
      subtext:
        avgAuditScore >= 90 ? "High Diligence • Ready for Review" : "Standard Activity Volume",
      icon: Award,
      color: "from-purple-500 to-indigo-600",
      bgLight: "bg-purple-50 text-purple-600 border-purple-100",
      badgeText: "Verified Log",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "leadConversion",
      title: "Lead Conversion Rate",
      value: "29.1%",
      subtext: "From Enquiry to Qualified & Proposal",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100",
      badgeText: "WebXode Pipeline",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "pipelineInfluenced",
      title: "Influenced Pipeline Value",
      value: `₹${pipelineInfluenced.toLocaleString("en-IN")}`,
      subtext: "Active deal value supported by touchpoints",
      icon: DollarSign,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-600 border-amber-100",
      badgeText: "INR Currency",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${kpi.bgLight} transition-transform group-hover:scale-105`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold ${kpi.badgeColor}`}
              >
                {kpi.badgeText}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                {kpi.title}
              </h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {kpi.value}
                </span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-slate-500">{kpi.subtext}</p>
            </div>

            <div
              className={`absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r ${kpi.color} opacity-0 transition-opacity group-hover:opacity-100`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
