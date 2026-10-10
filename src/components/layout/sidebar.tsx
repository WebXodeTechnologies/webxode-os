// src/components/layout/sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  FileSpreadsheet,
  FileText,
  Briefcase,
  CheckSquare,
  UserCheck,
  DollarSign,
  Receipt,
  FolderKanban,
  MessageSquare,
  Building2,
  BarChart3,
  Settings,
  Calendar,
  ListTodo,
  Ticket,
  Users,
  LucideIcon,
  PanelLeftOpen,
  PanelLeftClose,
  ChevronRight,
  ChevronDown,
  Loader2,
  LogOut,
  ShieldCheck,
  X,
  Target,
  PhoneCall,
  CalendarHeart,
  TrendingUp,
  Presentation,
  Cctv,
} from "lucide-react";
import { toast } from "@/lib/toast";
import { canAccessRoute } from "@/lib/permissions";
import { getDefaultAvatar } from "@/lib/avatars";

export interface SubNavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSectionGroup {
  title: string;
  icon?: LucideIcon;
  items: SubNavItem[];
}

export const navigationGroups: NavSectionGroup[] = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Sales CRM",
    icon: Target,
    items: [
      { name: "Sales Overview", href: "/dashboard/sales", icon: LayoutDashboard },
      { name: "All Leads", href: "/dashboard/sales/leads", icon: Users2, badge: "12" },
      { name: "Outreach & Calls", href: "/dashboard/sales/calls", icon: PhoneCall },
      { name: "Follow-ups", href: "/dashboard/sales/follow-ups", icon: MessageSquare },
      { name: "Appointments", href: "/dashboard/sales/appointments", icon: CalendarHeart },
      { name: "Sales Reports", href: "/dashboard/sales/reports", icon: TrendingUp },
      { name: "Activity", href: "/dashboard/sales/activity", icon: Cctv },
    ],
  },
  {
    title: "Presales & Proposals",
    icon: Presentation,
    items: [
      { name: "Presales Overview", href: "/dashboard/presales", icon: FileSpreadsheet, badge: "3" },
      { name: "Estimates & Pricing", href: "/dashboard/presales/estimates", icon: DollarSign },
      { name: "Proposals & SOW", href: "/dashboard/presales/proposals", icon: FileText },
    ],
  },
  {
    title: "Delivery & Execution",
    icon: Briefcase,
    items: [
      {
        name: "Projects & Development",
        href: "/dashboard/projects",
        icon: Briefcase,
        badge: "2",
      },
      { name: "Task Manager (Kanban)", href: "/dashboard/tasks", icon: CheckSquare },
      { name: "Developers & Designers", href: "/dashboard/workforce", icon: UserCheck },
    ],
  },
  {
    title: "Revenue & Finance",
    icon: DollarSign,
    items: [
      { name: "Revenue Management", href: "/dashboard/finance", icon: DollarSign },
      { name: "Expenses & Others", href: "/dashboard/expenses", icon: Receipt },
    ],
  },
  {
    title: "Operations & Intelligence",
    icon: FolderKanban,
    items: [
      { name: "Calendar & Events", href: "/dashboard/calendar", icon: Calendar },
      { name: "Tasks", href: "/dashboard/todos", icon: ListTodo, badge: "8" },
      { name: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: "5" },
      { name: "Teams", href: "/dashboard/teams", icon: Users },
      { name: "Tickets", href: "/dashboard/tickets", icon: Ticket, badge: "2" },
      { name: "SOW & SOP Templates", href: "/dashboard/sow-sop", icon: FileText },
      { name: "Team Directory", href: "/dashboard/team", icon: Building2 },
      { name: "Reports & Analytics", href: "/dashboard/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Administration",
    icon: Settings,
    items: [{ name: "Workspace Settings", href: "/dashboard/settings", icon: Settings }],
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  mobileOpen = false,
  onCloseMobile,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    role: "admin" | "user";
    department:
      "sales" | "development" | "revenue" | "hr" | "general" | "presales" | "Product & Presales";
  } | null>(null);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Sales CRM": true,
    "Presales & Proposals": true,
    "Delivery & Execution": true,
    "Revenue & Finance": true,
    "Operations & Intelligence": false,
    Administration: false,
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUserData(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");

      toast.success("Signed Out Successfully", {
        description: "Your session has been terminated safely.",
      });

      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout Error", { description: "Failed to sign out. Please try again." });
      setLoggingOut(false);
    }
  };

  const role = userData?.role || "user";
  const department = userData?.department || "development";
  const userName = userData?.name || "Team Member";
  const userRoleDisplay = role === "admin" ? "ADMIN" : `${department.toUpperCase()}`;

  const avatarConfig = getDefaultAvatar(role, department, userName);

  const filteredGroups = navigationGroups
    .map((group) => {
      if (group.title === "Overview") return group;
      const allowedItems = group.items.filter((item) =>
        canAccessRoute(role, department, item.href)
      );
      return { ...group, items: allowedItems };
    })
    .filter((group) => group.title === "Overview" || group.items.length > 0);

  const renderSidebarBody = (isCollapsed: boolean, isMobile: boolean) => {
    return (
      <div className="flex h-full min-h-0 flex-col justify-between border-r border-slate-200/80 bg-white text-slate-800 shadow-xs">
        {/* Brand Header */}
        <div
          className={`flex h-20 shrink-0 items-center border-b border-slate-200/80 px-4 sm:px-5 ${
            isCollapsed ? "justify-center px-2" : "justify-between"
          }`}
        >
          {isCollapsed ? (
            <div className="flex w-full items-center justify-between gap-1">
              <Link
                href="/dashboard"
                className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 shadow-xs transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                title="Webxode OS Dashboard"
              >
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Logo"
                  width={28}
                  height={28}
                  className="h-6 w-6 object-contain transition-transform group-hover:scale-105"
                />
              </Link>
              {onToggleCollapse && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleCollapse();
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 shadow-2xs transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  title="Expand sidebar"
                >
                  <PanelLeftOpen className="h-4.5 w-4.5" />
                </button>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={isMobile ? onCloseMobile : undefined}
                className="group flex min-w-0 items-center gap-3 overflow-hidden"
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-md shadow-slate-900/10 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/logos/webxodelogocropped-removebg-preview.png"
                    alt="Webxode Logo"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain brightness-125"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black tracking-tight text-slate-900">
                      WEBXODE
                    </span>
                    <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-extrabold text-indigo-600 sm:text-xs">
                      OS
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="truncate text-xs font-semibold text-slate-500">
                      Enterprise Workspace
                    </span>
                  </div>
                </div>
              </Link>

              {isMobile && onCloseMobile ? (
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="rounded-xl border border-slate-200/80 p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  title="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : (
                onToggleCollapse && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleCollapse();
                    }}
                    className="hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:flex"
                    title="Collapse sidebar"
                  >
                    <PanelLeftClose className="h-4.5 w-4.5" />
                  </button>
                )
              )}
            </>
          )}
        </div>

        {/* Navigation Content with Internal Scrolling */}
        <div className="min-h-0 flex-1 scrollbar-thin scrollbar-thumb-slate-200 space-y-4 overflow-y-auto px-3 py-4">
          {isCollapsed ? (
            /* Icon-Only Collapsed View */
            <div className="flex flex-col items-center space-y-2.5">
              {filteredGroups
                .flatMap((group) => group.items)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <div
                      key={item.name}
                      className="group relative flex w-full items-center justify-center"
                    >
                      <Link
                        href={item.href as any}
                        className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-150 ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-600/15"
                            : "text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-600"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute top-1/2 -left-2.5 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-indigo-600" />
                        )}
                        <Icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : ""}`} />
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>

                      {/* Collapsed Tooltip Popup */}
                      <div className="pointer-events-none absolute left-full z-50 ml-3.5 hidden items-center gap-2 rounded-2xl bg-slate-900 px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-2xl backdrop-blur-md group-hover:flex">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="rounded-full bg-indigo-500/30 px-2 py-0.5 text-[10px] text-indigo-200">
                            {item.badge}
                          </span>
                        )}
                        <div className="absolute top-1/2 -left-1 -mt-1 h-2 w-2 rotate-45 bg-slate-900" />
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            /* Expanded Full Navigation View */
            filteredGroups.map((group) => {
              const isOverview = group.title === "Overview";
              const isOpen = openSections[group.title] ?? true;
              const hasActiveItem = group.items.some(
                (item) =>
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href))
              );

              if (isOverview) {
                const item = group.items[0];
                if (!item) return null;
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <div key={group.title} className="pb-1">
                    <Link
                      href={item.href as any}
                      onClick={isMobile ? onCloseMobile : undefined}
                      className={`group relative flex items-center justify-between rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-indigo-50 font-bold text-indigo-950 shadow-md shadow-slate-900/10"
                          : "text-slate-700 hover:bg-indigo-50/70 hover:text-indigo-950"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                            isActive ? "text-indigo-600" : "text-indigo-600"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 text-indigo-600" />}
                    </Link>
                  </div>
                );
              }

              return (
                <div key={group.title} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleSection(group.title)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold tracking-wider uppercase transition-colors ${
                      hasActiveItem ? "text-indigo-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {group.icon && <group.icon className="h-4 w-4 text-slate-700" />}
                      <span>{group.title}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="ml-4 space-y-1 border-l-2 border-slate-200/80 pt-1 pl-3.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                          pathname === item.href ||
                          (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        return (
                          <Link
                            key={item.name}
                            href={item.href as any}
                            onClick={isMobile ? onCloseMobile : undefined}
                            className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
                              isActive
                                ? "border border-indigo-200/90 bg-indigo-50/90 font-bold text-indigo-950 shadow-2xs"
                                : "font-semibold text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <Icon
                                className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                                  isActive
                                    ? "text-indigo-600"
                                    : "text-slate-500 group-hover:text-slate-800"
                                }`}
                              />
                              <span className="truncate">{item.name}</span>
                            </div>

                            {item.badge && (
                              <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-tight transition-colors ${
                                  isActive
                                    ? "border-indigo-200 bg-white text-indigo-700"
                                    : "border-slate-200/80 bg-slate-100 text-indigo-700"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* User Profile & Logout Footer */}
        <div className="shrink-0 border-t border-slate-200/80 bg-slate-50/60 p-3.5 sm:p-4">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-3">
              <div
                className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-2xl ${avatarConfig.bgClass} border border-slate-200/60 shadow-xs`}
                title={`${userName} (${userRoleDisplay})`}
              >
                <Image
                  src={avatarConfig.imageUrl}
                  alt={userName}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
                <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                <div className="pointer-events-none absolute left-full z-50 ml-3.5 hidden flex-col rounded-2xl bg-slate-900 px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-2xl backdrop-blur-md group-hover:flex">
                  <span>{userName}</span>
                  <span className="text-[10px] font-bold text-indigo-300">{userRoleDisplay}</span>
                  <div className="absolute top-1/2 -left-1 -mt-1 h-2 w-2 rotate-45 bg-slate-900" />
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-200/80 bg-rose-50 text-rose-600 shadow-2xs transition-colors hover:bg-rose-100 hover:text-rose-700"
                title="Sign Out"
              >
                {loggingOut ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <LogOut className="h-4.5 w-4.5" />
                )}
                <div className="pointer-events-none absolute left-full z-50 ml-3.5 hidden rounded-2xl bg-slate-900 px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-2xl backdrop-blur-md group-hover:flex">
                  <span>Sign Out</span>
                  <div className="absolute top-1/2 -left-1 -mt-1 h-2 w-2 rotate-45 bg-slate-900" />
                </div>
              </button>
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3 shadow-2xs">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`relative flex h-11 w-11 shrink-0 overflow-hidden rounded-xl ${avatarConfig.bgClass} border border-slate-200/60 shadow-xs`}
                  >
                    <Image
                      src={avatarConfig.imageUrl}
                      alt={userName}
                      width={44}
                      height={44}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">{userName}</p>
                    <p className="truncate text-xs font-bold text-indigo-600">{userRoleDisplay}</p>
                  </div>
                </div>
                <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-emerald-600" />
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200/80 bg-rose-50/80 px-4 py-2.5 text-xs font-bold text-rose-700 shadow-2xs transition-all hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800 active:scale-[0.98] disabled:opacity-50 sm:text-sm"
              >
                {loggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 text-rose-600" />
                    <span>Sign Out</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside
        className={`sticky top-0 hidden transition-all duration-300 ease-in-out lg:flex lg:h-screen lg:flex-col ${
          collapsed ? "lg:w-20" : "lg:w-64 xl:w-72 2xl:w-80"
        }`}
      >
        {renderSidebarBody(collapsed, false)}
      </aside>

      {/* Mobile Slide-Over Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] border-r border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-2xl duration-300">
            {renderSidebarBody(false, true)}
          </div>
        </div>
      )}
    </>
  );
}
