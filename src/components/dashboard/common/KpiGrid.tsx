"use client";

import React from "react";
import { KpiCard, KpiCardData } from "./KpiCard";
import { DashboardPermissions } from "@/lib/dashboardPermissions";
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Briefcase,
  CheckSquare,
  CreditCard,
  UserCheck,
} from "lucide-react";

interface KpiGridProps {
  permissions: DashboardPermissions;
}

export function KpiGrid({ permissions }: KpiGridProps) {
  // Comprehensive list of all 8 primary KPI metrics as specified in Section 5
  const ALL_KPIS: (KpiCardData & { requiresPermission?: keyof DashboardPermissions })[] = [
    {
      id: "sales",
      label: "Sales Pipeline",
      value: "₹12.4L",
      trend: "↑ 18.4%",
      trendType: "up",
      subtitle: "vs last month",
      icon: TrendingUp,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      visualType: "sparkline_area",
      sparklineData: [40, 55, 48, 70, 85, 92, 124],
      requiresPermission: "canViewSales",
    },
    {
      id: "leads",
      label: "Active Leads",
      value: "128",
      trend: "↑ 12%",
      trendType: "up",
      subtitle: "+14 this week",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      visualType: "sparkline_bar",
      sparklineData: [80, 95, 110, 105, 118, 122, 128],
      requiresPermission: "canViewSales",
    },
    {
      id: "clients",
      label: "Active Clients",
      value: "42",
      trend: "+6 new",
      trendType: "up",
      subtitle: "94% retention rate",
      icon: Building2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      visualType: "status_dots",
      statusDots: [
        { label: "Active", count: 42, color: "bg-emerald-500" },
        { label: "At Risk", count: 3, color: "bg-rose-500" },
      ],
      requiresPermission: "canViewClientOverview",
    },
    {
      id: "revenue",
      label: "Monthly Revenue",
      value: "₹8.4L",
      trend: "↑ 14.2%",
      trendType: "up",
      subtitle: "vs last month",
      icon: DollarSign,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      visualType: "sparkline_area",
      sparklineData: [32, 45, 52, 60, 68, 74, 84],
      requiresPermission: "canViewRevenue",
    },
    {
      id: "projects",
      label: "Active Projects",
      value: "18",
      trend: "2 At Risk",
      trendType: "down",
      subtitle: "14 On Track",
      icon: Briefcase,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      visualType: "progress_ring",
      progressValue: 88,
      requiresPermission: "canViewProjects",
    },
    {
      id: "tasks",
      label: "Today's Tasks",
      value: "64",
      trend: "12 Due Today",
      trendType: "neutral",
      subtitle: "5 Overdue",
      icon: CheckSquare,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      visualType: "progress_bar",
      progressValue: 59,
      requiresPermission: "canViewProductivity",
    },
    {
      id: "collections",
      label: "Collections",
      value: "₹6.8L",
      trend: "₹1.6L Due",
      trendType: "down",
      subtitle: "81% rate",
      icon: CreditCard,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      visualType: "progress_bar",
      progressValue: 81,
      requiresPermission: "canViewCollections",
    },
    {
      id: "team",
      label: "Team Presence",
      value: "24",
      trend: "18 Working",
      trendType: "neutral",
      subtitle: "3 On Leave • 2 Remote",
      icon: UserCheck,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      visualType: "status_dots",
      statusDots: [
        { label: "Working", count: 18, color: "bg-emerald-500" },
        { label: "Leave", count: 3, color: "bg-amber-500" },
        { label: "Remote", count: 2, color: "bg-indigo-500" },
      ],
      requiresPermission: "canViewHR",
    },
  ];

  const visibleKpis = ALL_KPIS.filter((kpi) => {
    if (!kpi.requiresPermission) return true;
    return permissions[kpi.requiresPermission] === true;
  });

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visibleKpis.map((kpi) => (
        <KpiCard key={kpi.id} data={kpi} />
      ))}
    </div>
  );
}
