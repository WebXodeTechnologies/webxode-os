"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, Wallet } from "lucide-react";

interface KpiMetric {
  id: string;
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "neutral";
  trendLabel: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  iconColorClass: string;
}

const kpis: KpiMetric[] = [
  {
    id: "total-revenue",
    label: "Total Revenue",
    value: "₹18.6L",
    sub: "FY 2026 Q4",
    trend: "up",
    trendLabel: "+22.4% vs last quarter",
    icon: Wallet,
    colorClass: "text-emerald-700",
    bgClass: "from-emerald-50/80 to-white",
    borderClass: "border-emerald-200/80",
    iconBgClass: "bg-emerald-100",
    iconColorClass: "text-emerald-700",
  },
  {
    id: "collected",
    label: "Collected",
    value: "₹14.2L",
    sub: "76.3% of invoiced",
    trend: "up",
    trendLabel: "+8.1% collection rate",
    icon: CheckCircle2,
    colorClass: "text-indigo-700",
    bgClass: "from-indigo-50/80 to-white",
    borderClass: "border-indigo-200/80",
    iconBgClass: "bg-indigo-100",
    iconColorClass: "text-indigo-700",
  },
  {
    id: "pending",
    label: "Pending Payments",
    value: "₹3.4L",
    sub: "9 open invoices",
    trend: "down",
    trendLabel: "Awaiting client release",
    icon: Clock,
    colorClass: "text-amber-700",
    bgClass: "from-amber-50/80 to-white",
    borderClass: "border-amber-200/80",
    iconBgClass: "bg-amber-100",
    iconColorClass: "text-amber-700",
  },
  {
    id: "overdue",
    label: "Overdue",
    value: "₹1.0L",
    sub: "3 invoices > 30 days",
    trend: "down",
    trendLabel: "Action required",
    icon: AlertCircle,
    colorClass: "text-rose-700",
    bgClass: "from-rose-50/80 to-white",
    borderClass: "border-rose-200/80",
    iconBgClass: "bg-rose-100",
    iconColorClass: "text-rose-700",
  },
];

export function RevenueKpiBar() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`relative overflow-hidden rounded-2xl border ${kpi.borderClass} bg-linear-to-b ${kpi.bgClass} p-5 shadow-xs transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-extrabold tracking-wider uppercase ${kpi.colorClass}`}>
                  {kpi.label}
                </p>
                <h3
                  className={`mt-1.5 text-2xl font-black tracking-tight ${kpi.colorClass} lg:text-3xl`}
                >
                  {kpi.value}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">{kpi.sub}</p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.iconBgClass}`}
              >
                <Icon className={`h-5 w-5 ${kpi.iconColorClass}`} />
              </div>
            </div>
            <div className={`mt-3 flex items-center gap-1.5 text-xs font-bold ${kpi.colorClass}`}>
              <TrendIcon className="h-3.5 w-3.5" />
              <span>{kpi.trendLabel}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
