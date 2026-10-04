// src/lib/permissions.ts

// Map departments to allowed route prefixes
export const DEPARTMENT_ROUTES: Record<string, string[]> = {
  sales: [
    "/dashboard",
    "/dashboard/sales",
    "/dashboard/presales",
    "/dashboard/estimates",
    "/dashboard/tickets",
    "/dashboard/settings",
  ],
  development: [
    "/dashboard",
    "/dashboard/projects",
    "/dashboard/tasks",
    "/dashboard/workforce",
    "/dashboard/sow-sop",
    "/dashboard/tickets",
    "/dashboard/settings",
  ],
  revenue: [
    "/dashboard",
    "/dashboard/finance",
    "/dashboard/expenses",
    "/dashboard/reports",
    "/dashboard/tickets",
    "/dashboard/settings",
  ],
  hr: [
    "/dashboard",
    "/dashboard/team",
    "/dashboard/workforce",
    "/dashboard/tickets",
    "/dashboard/settings",
  ],
  general: [
    "/dashboard",
    "/dashboard/tickets",
    "/dashboard/settings",
  ],
};

export function canAccessRoute(role: string, department: string, pathname: string): boolean {
  // Admins have absolute access to everything
  if (role === "admin") return true;

  // For regular users, check if the pathname matches or starts with any allowed route for their department
  const allowedRoutes = DEPARTMENT_ROUTES[department] || DEPARTMENT_ROUTES["general"];
  
  return allowedRoutes.some((route) => pathname === route || (route !== "/dashboard" && pathname.startsWith(route)));
}