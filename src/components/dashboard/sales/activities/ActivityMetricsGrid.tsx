"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, Mail, Video, Users, TrendingUp, Sparkles, Award } from "lucide-react";
import { ActivityMetrics } from "./types";

interface ActivityMetricsGridProps {
  metrics: ActivityMetrics;
}

export const ActivityMetricsGrid: React.FC<ActivityMetricsGridProps> = ({ metrics }) => {
  const cards = [
    {
      id: "calls",
      title: "Total Calls Made",
      value: metrics.totalCallsMade.toLocaleString("en-IN"),
      subtext: "Outbound & discovery calls logged",
      trend: `+${metrics.callsTrendPct}% vs last period`,
      icon: PhoneCall,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-600 border-blue-100",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "proposals_emails",
      title: "Proposals & Emails Sent",
      value: metrics.proposalsAndEmailsSent.toLocaleString("en-IN"),
      subtext: "Quotations, GST drafts & email outreach",
      trend: `+${metrics.emailsTrendPct}% vs last period`,
      icon: Mail,
      color: "from-purple-500 to-indigo-600",
      bgLight: "bg-purple-50 text-purple-600 border-purple-100",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "demos",
      title: "Demos Completed",
      value: metrics.demosCompleted.toLocaleString("en-IN"),
      subtext: "Technical walkthroughs & SLA reviews",
      trend: `+${metrics.demosTrendPct}% vs last period`,
      icon: Video,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-600 border-emerald-100",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "reps",
      title: "Active Sales Reps",
      value: metrics.activeSalesReps.toString(),
      subtext: "Log diligence & velocity pace",
      trend: `${metrics.repsTargetPct}% Target Pace`,
      icon: Users,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-600 border-amber-100",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
          >
            {/* Top row: Icon & Trend badge */}
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${card.bgLight} transition-transform group-hover:scale-105`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold ${card.badgeColor}`}
              >
                <TrendingUp className="h-3 w-3" />
                {card.trend}
              </span>
            </div>

            {/* Metric Content */}
            <div className="mt-4">
              <h3 className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                {card.title}
              </h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black tracking-tight text-slate-900">
                  {card.value}
                </span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-slate-500">{card.subtext}</p>
            </div>

            {/* Bottom Accent line */}
            <div
              className={`absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r ${card.color} opacity-0 transition-opacity group-hover:opacity-100`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
