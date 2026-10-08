import React from "react";
import { DashboardPermissions } from "@/lib/dashboardPermissions";

interface TopMetricGridProps {
  permissions: DashboardPermissions;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  isPositive?: boolean;
}

function MetricCard({ title, value, subtitle, trend, isPositive = true }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-slate-300">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{title}</p>
        {trend && (
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
          >
            {trend}
          </span>
        )}
      </div>
      <h4 className="mt-2 text-xl font-bold text-slate-900">{value}</h4>
      <p className="mt-1 text-xs font-medium text-slate-500">{subtitle}</p>
    </div>
  );
}

export function TopMetricGrid({ permissions }: TopMetricGridProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Row 1: Sales, Leads, Clients, Revenue */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {permissions.canViewSales && (
          <>
            <MetricCard title="Sales" value="₹12.4L" subtitle="Pipeline Value" trend="↑ 18.4%" />
            <MetricCard title="Leads" value="128" subtitle="Active Inquiries" trend="↑ 12%" />
            <MetricCard title="Clients" value="42" subtitle="Active Retention" trend="+6 new" />
          </>
        )}

        {permissions.canViewRevenue && (
          <MetricCard title="Revenue" value="₹8.4L" subtitle="This Month" trend="↑ 14.2%" />
        )}
      </div>

      {/* Row 2: Projects, Tasks, Collections, Team */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {permissions.canViewProjects && (
          <>
            <MetricCard
              title="Projects"
              value="18"
              subtitle="Active Deliverables"
              trend="2 At Risk"
              isPositive={false}
            />
            <MetricCard
              title="Tasks"
              value="64"
              subtitle="12 Due Today"
              trend="5 Overdue"
              isPositive={false}
            />
          </>
        )}

        {permissions.canViewRevenue && (
          <MetricCard
            title="Collections"
            value="₹6.8L"
            subtitle="Collected Successfully"
            trend="₹1.6L Due"
            isPositive={false}
          />
        )}

        {permissions.canViewHR && (
          <MetricCard title="Team" value="24" subtitle="Members Active" trend="3 Away" />
        )}
      </div>
    </div>
  );
}
