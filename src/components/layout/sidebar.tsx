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
  Loader2,
  Building2,
  SlidersHorizontal,
  FolderKanban,
  Sparkles,
  BarChart3,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    title: "Core Workspace",
    items: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "Sales Pipeline", href: "/sales", icon: Users2, badge: "12" },
      { name: "Presales & Quotes", href: "/presales", icon: FileSpreadsheet, badge: "3" },
      { name: "Client Directory", href: "/clients", icon: Building2 },
    ],
  },
  {
    title: "Delivery & Operations",
    items: [
      { name: "Project Delivery", href: "/projects", icon: Briefcase, badge: "Active" },
      { name: "Operations & Tasks", href: "/operations", icon: FolderKanban },
      { name: "Workforce", href: "/workforce", icon: UserCheck },
    ],
  },
  {
    title: "Finance & Insights",
    items: [
      { name: "Financial Visibility", href: "/finance", icon: DollarSign },
      { name: "Executive Reports", href: "/management", icon: BarChart3 },
    ],
  },
  {
    title: "System",
    items: [{ name: "Settings", href: "/settings", icon: Settings }],
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    role: string;
    department?: string;
  } | null>(null);

  useEffect(() => {
    // Fetch current logged in user details
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUserData(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

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

  const SidebarContent = (
    <div className="flex h-full min-h-0 flex-col justify-between bg-white text-slate-800">
      {/* Brand Header with Company Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
        <Link href={"/dashboard" as any} className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white p-1 shadow-xs transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logos/webxodelogocropped-removebg-preview.png"
              alt="Webxode Logo"
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-tight text-slate-900">WEBXODE</span>
              <span className="rounded border border-indigo-200/60 bg-indigo-50 px-1.5 py-0.5 font-mono text-[9px] font-bold text-indigo-600">
                OS
              </span>
            </div>
            <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Internal Platform
            </span>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 scrollbar-thin space-y-6 overflow-y-auto px-3.5 py-4">
        {navigationSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {section.title}
            </p>

            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href as any}
                    onClick={onCloseMobile}
                    className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-indigo-50/90 font-bold text-indigo-700 shadow-2xs ring-1 ring-indigo-500/20"
                        : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-4 w-4 transition-colors ${
                          isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isActive
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="h-3.5 w-3.5 text-indigo-600" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile & Logout Footer */}
      <div className="shrink-0 border-t border-slate-100 bg-slate-50/50 p-3.5">
        <div className="mb-2 flex items-center justify-between rounded-xl border border-slate-200/70 bg-white p-2.5 shadow-2xs">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-xs">
              {userInitials}
              <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-900">{userName}</p>
              <p className="truncate text-[10px] font-medium text-slate-400">{userRole}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200/80 bg-rose-50/60 py-2.5 text-xs font-bold text-rose-600 shadow-2xs transition-all hover:border-rose-600 hover:bg-rose-600 hover:text-white active:scale-[0.98] disabled:opacity-50"
        >
          {loggingOut ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing out...</span>
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-col lg:border-r lg:border-slate-200/80 lg:bg-white">
        {SidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="animate-in fade-in fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={onCloseMobile}
          />
          <div className="animate-in slide-in-from-left fixed inset-y-0 left-0 w-72 max-w-full bg-white shadow-2xl duration-200">
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
