"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, TrendingDown, TrendingUp, AlertTriangle, PiggyBank } from "lucide-react";

interface ExpenseKpi {
  id: string;
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down";
  trendLabel: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  iconColorClass: string;
}

const kpis: ExpenseKpi[] = [
  {
    id: "total-expenses",
    label: "Total Expenses",
    value: "₹4.82L",
    sub: "Oct 2026 MTD",
    trend: "up",
    trendLabel: "+11.2% vs Sept",
    icon: TrendingDown,
    colorClass: "text-rose-700",
    bgClass: "from-rose-50/80 to-white",
    borderClass: "border-rose-200/80",
    iconBgClass: "bg-rose-100",
    iconColorClass: "text-rose-700",
  },
  {
    id: "client-expenses",
    label: "Client Expenses",
    value: "₹2.94L",
    sub: "AWS, domains, cloud & renewals",
    trend: "up",
    trendLabel: "+18.4% — new projects",
    icon: Building2,
    colorClass: "text-violet-700",
    bgClass: "from-violet-50/80 to-white",
    borderClass: "border-violet-200/80",
    iconBgClass: "bg-violet-100",
    iconColorClass: "text-violet-700",
  },
  {
    id: "company-expenses",
    label: "Company Expenses",
    value: "₹1.88L",
    sub: "Petty cash, office & essentials",
    trend: "down",
    trendLabel: "-4.1% — cost controlled",
    icon: Users,
    colorClass: "text-amber-700",
    bgClass: "from-amber-50/80 to-white",
    borderClass: "border-amber-200/80",
    iconBgClass: "bg-amber-100",
    iconColorClass: "text-amber-700",
  },
  {
    id: "pending-reimbursements",
    label: "Pending Reimbursements",
    value: "₹28,400",
    sub: "4 requests awaiting approval",
    trend: "up",
    trendLabel: "Action required",
    icon: AlertTriangle,
    colorClass: "text-orange-700",
    bgClass: "from-orange-50/80 to-white",
    borderClass: "border-orange-200/80",
    iconBgClass: "bg-orange-100",
    iconColorClass: "text-orange-700",
  },
  {
    id: "petty-cash",
    label: "Petty Cash Balance",
    value: "₹12,500",
    sub: "Current available float",
    trend: "down",
    trendLabel: "₹7,500 utilised this week",
    icon: PiggyBank,
    colorClass: "text-teal-700",
    bgClass: "from-teal-50/80 to-white",
    borderClass: "border-teal-200/80",
    iconBgClass: "bg-teal-100",
    iconColorClass: "text-teal-700",
  },
];

export function ExpenseKpiBar() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: i * 0.07 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`relative overflow-hidden rounded-2xl border ${kpi.borderClass} bg-linear-to-b ${kpi.bgClass} p-4 shadow-xs transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p
                  className={`text-[10px] font-extrabold tracking-wider uppercase ${kpi.colorClass}`}
                >
                  {kpi.label}
                </p>
                <h3
                  className={`mt-1.5 text-xl font-black tracking-tight ${kpi.colorClass} xl:text-2xl`}
                >
                  {kpi.value}
                </h3>
                <p className="mt-0.5 text-[11px] leading-tight font-semibold text-slate-500">
                  {kpi.sub}
                </p>
              </div>
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${kpi.iconBgClass}`}
              >
                <Icon className={`h-4.5 w-4.5 ${kpi.iconColorClass}`} />
              </div>
            </div>
            <div className={`mt-3 flex items-center gap-1 text-[11px] font-bold ${kpi.colorClass}`}>
              <TrendIcon className="h-3 w-3" />
              <span>{kpi.trendLabel}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
