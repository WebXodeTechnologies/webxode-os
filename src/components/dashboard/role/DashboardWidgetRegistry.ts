import { ComponentType } from "react";
import { DashboardPermissions } from "@/lib/dashboardPermissions";

export interface WidgetMetadata {
  id: string;
  title: string;
  category: "analytics" | "operations" | "delivery" | "sales" | "finance" | "team";
  permissionKey: keyof DashboardPermissions;
  defaultColSpan?: "full" | "half" | "third";
  minHeight?: string;
  description: string;
}

export const WIDGET_REGISTRY: WidgetMetadata[] = [
  {
    id: "attention-center",
    title: "Needs Attention",
    category: "operations",
    permissionKey: "canViewAttentionCenter",
    defaultColSpan: "full",
    description: "Surfaces critical business alerts, overdue tasks, and pending approvals",
  },
  {
    id: "employee-clockin",
    title: "Attendance & Shift Clock-In",
    category: "team",
    permissionKey: "canViewHR",
    defaultColSpan: "half",
    description: "Workplace shift timer, break toggle, clock-in/out and weekly hours log",
  },
  {
    id: "task-kanban",
    title: "Task Overview (Kanban View)",
    category: "delivery",
    permissionKey: "canViewProductivity",
    defaultColSpan: "full",
    description: "Interactive Kanban workflow board tracking backlog, in progress, QA, and done",
  },
  {
    id: "income-vs-expenses",
    title: "Income vs Expenses Breakdown",
    category: "finance",
    permissionKey: "canViewRevenue",
    defaultColSpan: "half",
    description: "Corporate P&L statement, net operating margin, and outflow bars",
  },
  {
    id: "invoice-overview",
    title: "Invoice Overview & Receivables",
    category: "finance",
    permissionKey: "canViewRevenue",
    defaultColSpan: "half",
    description: "Billing ledger, invoice status table, payment clearing and reminders",
  },
  {
    id: "projects-timeline-sow",
    title: "Projects Timeline & SOW Tracker",
    category: "delivery",
    permissionKey: "canViewProjects",
    defaultColSpan: "half",
    description: "Statement of Work milestone phases, budget contract value, and sign-offs",
  },
  {
    id: "tickets-support",
    title: "Client Support Tickets & SLA",
    category: "operations",
    permissionKey: "canViewSupport",
    defaultColSpan: "half",
    description: "Support incident logs, client tickets, priority status, and SLA countdowns",
  },
  {
    id: "sticky-notes",
    title: "Quick Scratchpad & Sticky Notes",
    category: "operations",
    permissionKey: "canViewProductivity",
    defaultColSpan: "half",
    description: "Interactive workspace sticky notes with color coding and pinned items",
  },
  {
    id: "interactive-calendar",
    title: "Workspace Calendar & Schedule",
    category: "operations",
    permissionKey: "canViewProductivity",
    defaultColSpan: "half",
    description: "Interactive month calendar grid, event markers, and client meeting list",
  },
  {
    id: "team-chat",
    title: "Live Team Chat & Workspace Snippets",
    category: "team",
    permissionKey: "canViewHR",
    defaultColSpan: "half",
    description: "Channel messaging snippets, unread indicators, and quick team chat input",
  },
  {
    id: "contract-templates",
    title: "Contracts & SOW Templates",
    category: "sales",
    permissionKey: "canViewSales",
    defaultColSpan: "half",
    description: "Pre-made legal templates, MSA, SOW, and proposal 1-click duplication",
  },
  {
    id: "business-performance",
    title: "Business Performance",
    category: "analytics",
    permissionKey: "canViewBusinessPerformance",
    defaultColSpan: "half",
    description: "Interactive historical trend charts for Revenue, Sales, and Collections",
  },
  {
    id: "business-pipeline",
    title: "Sales Pipeline Breakdown",
    category: "sales",
    permissionKey: "canViewSales",
    defaultColSpan: "half",
    description: "Analytical funnel tracking leads, proposals, negotiations, and win rates",
  },
  {
    id: "project-delivery",
    title: "Project Delivery & Health",
    category: "delivery",
    permissionKey: "canViewProjects",
    defaultColSpan: "half",
    description: "Active project milestones, completion percentages, and risk alerts",
  },
  {
    id: "todays-work",
    title: "Today's Work & Action Items",
    category: "operations",
    permissionKey: "canViewProductivity",
    defaultColSpan: "half",
    description: "Prioritized daily tasks, meetings, client follow-ups, and rapid action triggers",
  },
  {
    id: "client-overview",
    title: "Client Overview & Lifecycle",
    category: "sales",
    permissionKey: "canViewClientOverview",
    defaultColSpan: "half",
    description: "Active clients, renewals, at-risk accounts, and client health breakdown",
  },
  {
    id: "team-overview",
    title: "Team & Workforce Overview",
    category: "team",
    permissionKey: "canViewHR",
    defaultColSpan: "half",
    description: "Team presence, active workload, attendance, and remote status distribution",
  },
  {
    id: "recent-activity",
    title: "Recent Activity Feed",
    category: "operations",
    permissionKey: "canViewAttentionCenter",
    defaultColSpan: "half",
    description: "Real-time enterprise audit trail of deals, payments, and system events",
  },
];

export function getAvailableWidgets(permissions: DashboardPermissions): WidgetMetadata[] {
  return WIDGET_REGISTRY.filter((widget) => permissions[widget.permissionKey] === true);
}
