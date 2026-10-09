"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/common/DashboardHeader";
import { AttentionCenter } from "@/components/dashboard/common/AttentionCenter";
import { KpiGrid } from "@/components/dashboard/common/KpiGrid";

// Enterprise Widgets Imports
import { EmployeeClockInWidget } from "@/components/dashboard/widgets/EmployeeClockInWidget";
import { StickyNotesWidget } from "@/components/dashboard/widgets/StickyNotesWidget";
import { TaskKanbanWidget } from "@/components/dashboard/widgets/TaskKanbanWidget";
import { IncomeVsExpensesWidget } from "@/components/dashboard/widgets/IncomeVsExpensesWidget";
import { InvoiceOverviewWidget } from "@/components/dashboard/widgets/InvoiceOverviewWidget";
import { ProjectsTimelineSowWidget } from "@/components/dashboard/widgets/ProjectsTimelineSowWidget";
import { TicketsSupportWidget } from "@/components/dashboard/widgets/TicketsSupportWidget";
import { TeamChatWidget } from "@/components/dashboard/widgets/TeamChatWidget";
import { ContractTemplatesWidget } from "@/components/dashboard/widgets/ContractTemplatesWidget";
import { InteractiveCalendarWidget } from "@/components/dashboard/widgets/InteractiveCalendarWidget";

// Core Operations & Chart Widgets
import { BusinessPerformanceWidget } from "@/components/dashboard/widgets/BusinessPerformanceWidget";
import { BusinessPipelineWidget } from "@/components/dashboard/widgets/BusinessPipelineWidget";
import { TodaysWorkWidget } from "@/components/dashboard/widgets/TodaysWorkWidget";
import { ClientOverviewWidget } from "@/components/dashboard/widgets/ClientOverviewWidget";
import { TeamOverviewWidget } from "@/components/dashboard/widgets/TeamOverviewWidget";
import { ProductivityWidget } from "@/components/dashboard/widgets/ProductivityWidget";
import { FinanceSnapshotWidget } from "@/components/dashboard/widgets/FinanceSnapshotWidget";

import { getRolePermissions, UserRole } from "@/lib/dashboardPermissions";
import { ROLE_LAYOUT_CONFIGS } from "@/components/dashboard/role/DashboardLayoutConfig";
import { ShieldCheck } from "lucide-react";
import { ResourceAllocationWidget } from "@/components/dashboard/widgets/ResourceAllocationWidget";

export default function DashboardPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const permissions = getRolePermissions(currentRole);
  const layoutConfig = ROLE_LAYOUT_CONFIGS[currentRole] || ROLE_LAYOUT_CONFIGS.admin;

  const ALL_ROLES: { role: UserRole; label: string }[] = [
    { role: "admin", label: "Administrator" },
    { role: "management", label: "Executive Management" },
    { role: "sales", label: "Sales Executive" },
    { role: "presales", label: "Pre-Sales Architect" },
    { role: "project_manager", label: "Project Manager" },
    { role: "developer", label: "Software Engineer" },
    { role: "designer", label: "UI/UX Designer" },
    { role: "qa", label: "QA Lead" },
    { role: "hr", label: "HR & Workforce" },
    { role: "finance", label: "Finance & Accounts" },
    { role: "operations", label: "Operations Director" },
    { role: "support", label: "Client Support" },
  ];

  return (
    <div className="w-full space-y-6 pb-16">
      {/* RBAC Role Switcher Simulator Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex min-w-max items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100/80 bg-indigo-50 text-indigo-600 shadow-2xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 sm:text-base">
              Role-Aware RBAC Cockpit Simulator
            </h4>
            <p className="text-xs font-semibold text-slate-500">
              Active Scope:{" "}
              <span className="font-extrabold text-indigo-600">{layoutConfig.displayName}</span>
            </p>
          </div>
        </div>

        {/* Role Pill Switcher */}
        <div className="flex max-w-full flex-wrap items-center gap-2">
          {ALL_ROLES.map((item) => (
            <button
              key={item.role}
              type="button"
              onClick={() => setCurrentRole(item.role)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all sm:text-xs ${
                currentRole === item.role
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border border-slate-200/80 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Header & Greeting */}
      <DashboardHeader userName="Akash" role={layoutConfig.displayName} />

      {/* Attention Center */}
      {permissions.canViewAttentionCenter && <AttentionCenter />}

      {/* Role-Filtered KPI Cards Grid */}
      <KpiGrid permissions={permissions} />

      {/* Business Performance & Sales Pipeline */}
      {(permissions.canViewBusinessPerformance || permissions.canViewSales) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {permissions.canViewBusinessPerformance && <BusinessPerformanceWidget />}
          {permissions.canViewSales && <BusinessPipelineWidget />}
        </div>
      )}

      {/* Calendar, Attendance, Notes */}
      {(permissions.canViewProductivity || permissions.canViewHR) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {permissions.canViewProductivity && <InteractiveCalendarWidget />}
          {permissions.canViewHR && <EmployeeClockInWidget />}
          {permissions.canViewProductivity && <StickyNotesWidget />}
        </div>
      )}

      {/* Kanban View and Financial Snapshot */}
      {(permissions.canViewProductivity || permissions.canViewRevenue) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {permissions.canViewProductivity && <TaskKanbanWidget />}
          {permissions.canViewRevenue && <FinanceSnapshotWidget />}
        </div>
      )}

      {/* Income vs Expenses and Invoices (Strictly Finance / Admin) */}
      {permissions.canViewRevenue && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <IncomeVsExpensesWidget />
          <InvoiceOverviewWidget />
        </div>
      )}

      {/* Operations, Projects, Support & Tasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {permissions.canViewProjects && <ProjectsTimelineSowWidget />}
        {permissions.canViewSupport && <TicketsSupportWidget />}
        {permissions.canViewSales && <ContractTemplatesWidget />}
        {permissions.canViewProductivity && <TodaysWorkWidget />}
        {permissions.canViewProductivity && <ProductivityWidget />}
        {permissions.canViewProductivity && <ResourceAllocationWidget />}
      </div>

      {/* HR, Chat, & Client Overview */}
      {(permissions.canViewHR || permissions.canViewClientOverview) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {permissions.canViewHR && <TeamOverviewWidget />}
          {permissions.canViewHR && <TeamChatWidget />}
          {permissions.canViewClientOverview && <ClientOverviewWidget />}
        </div>
      )}
    </div>
  );
}
