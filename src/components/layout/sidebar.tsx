// src/components/layout/sidebar.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
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
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface SubNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: "indigo" | "emerald" | "amber" | "slate";
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
      {
        name: "Sales Pipeline",
        href: "/dashboard/sales",
        icon: Users2,
        badge: "12",
        badgeColor: "indigo",
      },
      {
        name: "Presales",
        href: "/dashboard/presales",
        icon: FileSpreadsheet,
        badge: "3",
        badgeColor: "amber",
      },
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
        badgeColor: "emerald",
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
        badgeColor: "indigo",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    role: string;
    department?: string;
  } | null>(null);

  // Accordion open/close state
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

  const userName = userData?.name || "Akash S M";
  const userRole = userData?.role ? userData.role.toUpperCase() : "ADMIN & FOUNDER";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Filter items based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return navigationGroups;

    const query = searchQuery.toLowerCase();
    return navigationGroups
      .map((group) => {
        const matchingItems = group.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) || group.title.toLowerCase().includes(query),
        );
        return { ...group, items: matchingItems };
      })
      .filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const renderBadge = (badge?: string, color?: string, isActive?: boolean) => {
    if (!badge) return null;

    let colorStyles = "bg-slate-100 text-slate-900 border-slate-200/80";
    if (color === "emerald") {
      colorStyles = isActive
        ? "bg-white text-emerald-700 border-emerald-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200/70";
    } else if (color === "amber") {
      colorStyles = isActive
        ? "bg-white text-amber-700 border-amber-200"
        : "bg-amber-50 text-amber-700 border-amber-200/70";
    } else if (color === "indigo") {
      colorStyles = isActive
        ? "bg-white text-indigo-700 border-indigo-200"
        : "bg-indigo-50 text-indigo-700 border-indigo-200/70";
    }

    return (
      <span
        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-tight transition-colors ${colorStyles}`}
      >
        {badge}
      </span>
    );
  };

  const SidebarContent = (
    <div className="flex h-full min-h-0 flex-col justify-between bg-white text-slate-800">
      {/* Brand & Workspace Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 px-4">
        <Link href={"/dashboard" as any} className="group flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl p-1.5 shadow-md shadow-slate-900/10 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logos/webxodelogocropped-removebg-preview.png"
              alt="Webxode Logo"
              width={32}
              height={32}
              className="h-full w-full object-contain brightness-125 filter"
            />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-md font-extrabold tracking-tight text-slate-900">
                  WEBXODE
                </span>
                <span className="rounded-md border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-indigo-600">
                  OS
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="truncate text-[10px] font-semibold text-slate-900">
                  Enterprise Workspace
                </span>
              </div>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            title="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Desktop Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden rounded-xl border border-slate-200/80 bg-slate-50/80 p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:flex"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Quick Search Filter (Expanded Mode only) */}
      {!collapsed && (
        <div className="px-3.5 pt-3.5 pb-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick search modules..."
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/70 py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Groups & Dropdowns */}
      <div className="flex-1 scrollbar-thin space-y-3 overflow-y-auto px-3.5 py-3">
        {filteredGroups.map((group) => {
          const isOverview = group.title === "Overview";
          const isOpen = (openSections[group.title] ?? true) || Boolean(searchQuery);
          const hasActiveItem = group.items.some(
            (item) =>
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href)),
          );

          if (isOverview) {
            const item = group.items[0];
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <div key={group.title} className="pb-1">
                <Link
                  href={item.href as any}
                  onClick={onCloseMobile}
                  title={collapsed ? item.name : undefined}
                  className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-slate-900 font-bold text-white shadow-md shadow-slate-900/10"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                        isActive ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {!collapsed && isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  )}
                </Link>
              </div>
            );
          }

          if (collapsed) {
            return (
              <div key={group.title} className="space-y-1 py-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.name}
                      href={item.href as any}
                      onClick={onCloseMobile}
                      title={item.name}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            );
          }

          return (
            <div key={group.title} className="space-y-1">
              {/* Dropdown Header Toggle */}
              <button
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
                  <ChevronDown className="h-3 w-3 text-slate-800" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-slate-800" />
                )}
              </button>

              {/* Sub-items list */}
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
                        onClick={onCloseMobile}
                        className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all duration-150 ${
                          isActive
                            ? "border border-indigo-200/60 bg-indigo-50/90 font-semibold text-indigo-900 shadow-2xs"
                            : "font-medium text-slate-900 hover:bg-slate-100/70 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <Icon
                            className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                              isActive
                                ? "text-indigo-600"
                                : "text-slate-400 group-hover:text-slate-700"
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>

                        {item.badge && renderBadge(item.badge, item.badgeColor, isActive)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Profile & Logout Footer */}
      <div className="shrink-0 border-t border-slate-200/80 bg-slate-50/50 p-3">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-2xs">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-xs font-extrabold text-white shadow-sm">
                  {userInitials}
                  <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-900">{userName}</p>
                  <p className="truncate text-[10px] font-semibold text-indigo-600">{userRole}</p>
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
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-sm"
              title={userName}
            >
              {userInitials}
              <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside
        className={`hidden transition-all duration-200 ease-in-out lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-slate-200/80 lg:bg-white ${
          collapsed ? "lg:w-18" : "lg:w-68"
        }`}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full bg-white shadow-2xl duration-200">
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
