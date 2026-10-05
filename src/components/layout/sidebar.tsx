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
  Briefcase,
  UserCheck,
  DollarSign,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Loader2,
  Building2,
  FolderKanban,
  BarChart3,
  X,
  FileText,
  CheckSquare,
  MessageSquare,
  Receipt,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { toast } from "sonner";
import { canAccessRoute } from "@/lib/permissions";
import { getDefaultAvatar } from "@/lib/avatars";

interface SubNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSectionGroup {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  items: SubNavItem[];
}

const navigationGroups: NavSectionGroup[] = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Sales & Growth",
    icon: Users2,
    items: [
      { name: "Sales Pipeline", href: "/dashboard/sales", icon: Users2, badge: "12" },
      { name: "Presales", href: "/dashboard/presales", icon: FileSpreadsheet, badge: "3" },
      { name: "Estimates & Proposals", href: "/dashboard/estimates", icon: FileText },
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
        badge: "Active",
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
      { name: "SOW & SOP Templates", href: "/dashboard/sow-sop", icon: FileText },
      {
        name: "Notes, Tickets & Messages",
        href: "/dashboard/tickets",
        icon: MessageSquare,
        badge: "5",
      },
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
    "Sales & Growth": true,
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

  // Get role-based default avatar configuration
  const avatarConfig = getDefaultAvatar(role, department, userName);

  const filteredGroups = navigationGroups
    .map((group) => {
      if (group.title === "Overview") return group;
      const allowedItems = group.items.filter((item) =>
        canAccessRoute(role, department, item.href),
      );
      return { ...group, items: allowedItems };
    })
    .filter((group) => group.title === "Overview" || group.items.length > 0);

  const renderSidebarBody = (isCollapsed: boolean, isMobile: boolean) => {
    return (
      <div className="flex h-full min-h-0 flex-col justify-between border-r border-slate-200/80 bg-white text-slate-800 shadow-xs">
        {/* Brand Header */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-slate-200/80 px-3.5 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {isCollapsed ? (
            <div className="flex w-full items-center justify-between gap-1">
              <Link
                href="/dashboard"
                className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 shadow-xs transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                title="Webxode OS Dashboard"
              >
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Logo"
                  width={24}
                  height={24}
                  className="h-5 w-5 object-contain transition-transform group-hover:scale-105"
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
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 shadow-2xs transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  title="Expand sidebar"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={isMobile ? onCloseMobile : undefined}
                className="group flex min-w-0 items-center gap-2.5 overflow-hidden"
              >
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl p-1.5 shadow-md shadow-slate-900/10 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/logos/webxodelogocropped-removebg-preview.png"
                    alt="Webxode Logo"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain brightness-125"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-tight text-slate-900">
                      WEBXODE
                    </span>
                    <span className="rounded-md border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-indigo-600">
                      OS
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    <span className="truncate text-[10px] font-semibold text-slate-500">
                      Enterprise Workspace
                    </span>
                  </div>
                </div>
              </Link>

              {isMobile && onCloseMobile ? (
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="rounded-xl border border-slate-200/80 p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
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
                    className="hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:flex"
                    title="Collapse sidebar"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </button>
                )
              )}
            </>
          )}
        </div>

        {/* Navigation Content */}
        <div className="flex-1 scrollbar-thin space-y-3 overflow-y-auto px-2.5 py-3">
          {isCollapsed ? (
            /* Icon-Only Collapsed View */
            <div className="flex flex-col items-center space-y-2">
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
                        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150 ${
                          isActive
                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                            : "text-slate-900 hover:bg-indigo-50/80 hover:text-indigo-600"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute top-1/2 -left-2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
                        )}
                        <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : ""}`} />
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white ring-2 ring-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>

                      {/* Collapsed Tooltip Popup */}
                      <div className="pointer-events-none absolute left-full z-50 ml-3 hidden items-center gap-2 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-xl group-hover:flex">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="rounded-full bg-indigo-500/30 px-1.5 py-0.5 text-[9px] text-indigo-200">
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
                  (item.href !== "/dashboard" && pathname.startsWith(item.href)),
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
                      className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-slate-900 font-bold text-white shadow-md shadow-slate-900/10"
                          : "text-slate-700 hover:bg-indigo-50/60 hover:text-indigo-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                            isActive ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                    </Link>
                  </div>
                );
              }

              return (
                <div key={group.title} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleSection(group.title)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[10px] font-bold tracking-wider uppercase transition-colors ${
                      hasActiveItem ? "text-indigo-600" : "text-slate-900 hover:text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {group.icon && <group.icon className="h-3.5 w-3.5 text-slate-900" />}
                      <span>{group.title}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-3 w-3 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="ml-3 space-y-0.5 border-l-2 border-slate-100 pt-0.5 pl-2.5">
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
                            className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all duration-150 ${
                              isActive
                                ? "border border-indigo-200/80 bg-indigo-50/90 font-bold text-indigo-900 shadow-2xs"
                                : "font-medium text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-2.5">
                              <Icon
                                className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                                  isActive
                                    ? "text-indigo-600"
                                    : "text-slate-900 group-hover:text-slate-700"
                                }`}
                              />
                              <span className="truncate">{item.name}</span>
                            </div>

                            {item.badge && (
                              <span
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-tight transition-colors ${
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
        <div className="shrink-0 border-t border-slate-200/80 bg-slate-50/50 p-2.5">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2">
              <div
                className={`group relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-xl ${avatarConfig.bgClass} shadow-xs`}
                title={`${userName} (${userRoleDisplay})`}
              >
                <Image
                  src={avatarConfig.imageUrl}
                  alt={userName}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                <div className="pointer-events-none absolute left-full z-50 ml-3 hidden flex-col rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-xl group-hover:flex">
                  <span>{userName}</span>
                  <span className="text-[10px] text-indigo-300">{userRoleDisplay}</span>
                  <div className="absolute top-1/2 -left-1 -mt-1 h-2 w-2 rotate-45 bg-slate-900" />
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200/80 bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100 hover:text-rose-700"
                title="Sign Out"
              >
                {loggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                <div className="pointer-events-none absolute left-full z-50 ml-3 hidden rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-xl group-hover:flex">
                  <span>Sign Out</span>
                  <div className="absolute top-1/2 -left-1 -mt-1 h-2 w-2 rotate-45 bg-slate-900" />
                </div>
              </button>
            </div>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-2xs">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`relative flex h-12 w-12 shrink-0 overflow-hidden rounded-xl ${avatarConfig.bgClass} shadow-sm`}
                  >
                    <Image
                      src={avatarConfig.imageUrl}
                      alt={userName}
                      width={32}
                      height={32}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900">{userName}</p>
                    <p className="truncate text-[10px] font-semibold text-indigo-600">
                      {userRoleDisplay}
                    </p>
                  </div>
                </div>
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200/80 bg-rose-50/70 py-2 text-xs font-bold text-rose-700 shadow-2xs transition-all hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800 active:scale-[0.98] disabled:opacity-50"
              >
                {loggingOut ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="h-3.5 w-3.5 text-rose-600" />
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
        className={`hidden transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:z-30 lg:flex lg:h-screen lg:flex-col ${
          collapsed ? "lg:w-20" : "lg:w-68"
        }`}
      >
        {renderSidebarBody(collapsed, false)}
      </aside>

      {/* Mobile Slide-Over Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl duration-200">
            {renderSidebarBody(false, true)}
          </div>
        </div>
      )}
    </>
  );
}
