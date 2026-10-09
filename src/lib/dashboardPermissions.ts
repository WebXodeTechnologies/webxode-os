export type UserRole =
  | "admin"
  | "management"
  | "sales"
  | "presales"
  | "project_manager"
  | "developer"
  | "designer"
  | "qa"
  | "hr"
  | "finance"
  | "operations"
  | "support";

export interface DashboardPermissions {
  canViewSales: boolean; // Sales, Leads, Pipeline
  canViewRevenue: boolean; // Revenue & Financial Metrics
  canViewCollections: boolean; // Collections & Receipts
  canViewHR: boolean; // Team members, workload & workforce
  canViewSupport: boolean; // Customer tickets & issues
  canViewProjects: boolean; // Projects & Deliverables
  canViewBusinessPerformance: boolean; // Business performance chart
  canViewProductivity: boolean; // Workload & task productivity
  canViewAttentionCenter: boolean; // Needs attention alert banner
  canViewClientOverview: boolean; // Client lifecycle status
}

export function getDashboardPermissions(role: string = "admin"): DashboardPermissions {
  const normalized = (role || "admin").toLowerCase().replace(/[\s\n]+/g, "_");

  switch (normalized) {
    case "admin":
    case "management":
    case "operations":
      return {
        canViewSales: true,
        canViewRevenue: true,
        canViewCollections: true,
        canViewHR: true,
        canViewSupport: true,
        canViewProjects: true,
        canViewBusinessPerformance: true,
        canViewProductivity: true,
        canViewAttentionCenter: true,
        canViewClientOverview: true,
      };

    case "sales":
    case "presales":
      return {
        canViewSales: true,
        canViewRevenue: false,
        canViewCollections: false,
        canViewHR: false,
        canViewSupport: true,
        canViewProjects: true,
        canViewBusinessPerformance: true,
        canViewProductivity: true,
        canViewAttentionCenter: true,
        canViewClientOverview: true,
      };

    case "finance":
      return {
        canViewSales: false,
        canViewRevenue: true,
        canViewCollections: true,
        canViewHR: false,
        canViewSupport: false,
        canViewProjects: true,
        canViewBusinessPerformance: true,
        canViewProductivity: false,
        canViewAttentionCenter: true,
        canViewClientOverview: true,
      };

    case "project_manager":
    case "developer":
    case "designer":
    case "qa":
      return {
        canViewSales: false,
        canViewRevenue: false,
        canViewCollections: false,
        canViewHR: true,
        canViewSupport: true,
        canViewProjects: true,
        canViewBusinessPerformance: false,
        canViewProductivity: true,
        canViewAttentionCenter: true,
        canViewClientOverview: false,
      };

    case "hr":
      return {
        canViewSales: false,
        canViewRevenue: false,
        canViewCollections: false,
        canViewHR: true,
        canViewSupport: false,
        canViewProjects: false,
        canViewBusinessPerformance: false,
        canViewProductivity: true,
        canViewAttentionCenter: true,
        canViewClientOverview: false,
      };

    case "support":
      return {
        canViewSales: true,
        canViewRevenue: false,
        canViewCollections: false,
        canViewHR: false,
        canViewSupport: true,
        canViewProjects: true,
        canViewBusinessPerformance: false,
        canViewProductivity: true,
        canViewAttentionCenter: true,
        canViewClientOverview: true,
      };

    default:
      return {
        canViewSales: true,
        canViewRevenue: false,
        canViewCollections: false,
        canViewHR: true,
        canViewSupport: true,
        canViewProjects: true,
        canViewBusinessPerformance: false,
        canViewProductivity: true,
        canViewAttentionCenter: true,
        canViewClientOverview: false,
      };
  }
}

export const getRolePermissions = getDashboardPermissions;
