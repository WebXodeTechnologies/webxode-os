import { UserRole } from "@/lib/dashboardPermissions";

export interface RoleLayoutConfig {
  role: UserRole;
  displayName: string;
  badgeColor: string;
  widgetIds: string[];
}

export const ROLE_LAYOUT_CONFIGS: Record<UserRole, RoleLayoutConfig> = {
  admin: {
    role: "admin",
    displayName: "Administrator",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "task-kanban",
      "income-vs-expenses",
      "invoice-overview",
      "projects-timeline-sow",
      "tickets-support",
      "interactive-calendar",
      "sticky-notes",
      "team-chat",
      "contract-templates",
      "business-performance",
      "business-pipeline",
      "project-delivery",
      "todays-work",
      "client-overview",
      "team-overview",
      "recent-activity",
    ],
  },
  management: {
    role: "management",
    displayName: "Executive Management",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "income-vs-expenses",
      "projects-timeline-sow",
      "business-performance",
      "client-overview",
      "team-overview",
      "recent-activity",
    ],
  },
  sales: {
    role: "sales",
    displayName: "Sales Executive",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    widgetIds: [
      "attention-center",
      "business-pipeline",
      "contract-templates",
      "client-overview",
      "todays-work",
      "sticky-notes",
      "recent-activity",
    ],
  },
  presales: {
    role: "presales",
    displayName: "Pre-Sales Architect",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    widgetIds: [
      "attention-center",
      "contract-templates",
      "business-pipeline",
      "todays-work",
      "sticky-notes",
    ],
  },
  project_manager: {
    role: "project_manager",
    displayName: "Project Manager",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "task-kanban",
      "projects-timeline-sow",
      "project-delivery",
      "team-overview",
      "interactive-calendar",
      "sticky-notes",
    ],
  },
  developer: {
    role: "developer",
    displayName: "Software Engineer",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "task-kanban",
      "todays-work",
      "team-chat",
      "sticky-notes",
    ],
  },
  designer: {
    role: "designer",
    displayName: "UI/UX Designer",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "task-kanban",
      "todays-work",
      "sticky-notes",
    ],
  },
  qa: {
    role: "qa",
    displayName: "QA Lead",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "task-kanban",
      "tickets-support",
      "sticky-notes",
    ],
  },
  hr: {
    role: "hr",
    displayName: "HR & Workforce Manager",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "team-overview",
      "interactive-calendar",
      "sticky-notes",
    ],
  },
  finance: {
    role: "finance",
    displayName: "Finance & Accounts",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    widgetIds: [
      "attention-center",
      "income-vs-expenses",
      "invoice-overview",
      "finance-snapshot",
      "contract-templates",
    ],
  },
  operations: {
    role: "operations",
    displayName: "Operations Director",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    widgetIds: [
      "attention-center",
      "employee-clockin",
      "task-kanban",
      "income-vs-expenses",
      "projects-timeline-sow",
      "tickets-support",
      "interactive-calendar",
    ],
  },
  support: {
    role: "support",
    displayName: "Client Support Lead",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    widgetIds: [
      "attention-center",
      "tickets-support",
      "todays-work",
      "client-overview",
      "team-chat",
    ],
  },
};
