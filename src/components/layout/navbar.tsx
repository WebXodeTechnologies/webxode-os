"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getDefaultAvatar } from "@/lib/avatars";
import {
  Bell,
  Search,
  Command,
  Plus,
  Menu,
  User,
  LogOut,
  Settings,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  FilePlus,
  FolderPlus,
  DollarSign,
  ChevronRight,
  Clock,
  Check,
  X,
  LayoutDashboard,
  Users2,
  Briefcase,
  CheckSquare,
  FileText,
  MessageSquare,
  Building2,
  BarChart3,
  Receipt,
  ArrowRight,
  UserPlus,
  Target,
  Presentation,
  UserCheck,
  Ticket,
  LucideIcon,
} from "lucide-react";
import { toast } from "@/lib/toast";

import { QuickActionsMenu } from "./navbar/quick-actions-menu";
import { NotificationsMenu } from "./navbar/notifications-menu";
import { ProfileMenu } from "./navbar/profile-menu";
import { CommandPaletteModal, CommandItem } from "./navbar/command-palette-modal";

// ==========================================
// TYPES & CONSTANTS
// ==========================================

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

const COMMAND_PALETTE_ITEMS: CommandItem[] = [
  {
    name: "Executive Dashboard",
    category: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Main workspace overview & executive KPIs",
  },
  {
    name: "My Profile",
    category: "Personal",
    href: "/dashboard/profile",
    icon: User,
    description: "View and update your personal user profile",
  },
  {
    name: "Sales Pipeline",
    category: "Sales & Growth",
    href: "/dashboard/sales",
    icon: Users2,
    description: "Track sales leads, deals, and growth pipeline",
  },
  {
    name: "Presales & Leads",
    category: "Sales & Growth",
    href: "/dashboard/presales",
    icon: FileText,
    description: "Manage prospective client requirements & inquiries",
  },
  {
    name: "Estimates & Proposals",
    category: "Sales & Growth",
    href: "/dashboard/estimates",
    icon: FilePlus,
    description: "Create, view, and send project estimates & SOWs",
  },
  {
    name: "Projects & Dev",
    category: "Delivery & Execution",
    href: "/dashboard/projects",
    icon: Briefcase,
    description: "Active development projects and client milestones",
  },
  {
    name: "Task Manager (Kanban)",
    category: "Delivery & Execution",
    href: "/dashboard/tasks",
    icon: CheckSquare,
    description: "Sprint tasks, kanban board, and workflow items",
  },
  {
    name: "Team Workforce",
    category: "Delivery & Execution",
    href: "/dashboard/workforce",
    icon: User,
    description: "Developers, designers, and resource allocation",
  },
  {
    name: "Revenue Management",
    category: "Revenue & Finance",
    href: "/dashboard/finance",
    icon: DollarSign,
    description: "Revenue forecasts, financial metrics, and retainers",
  },
  {
    name: "Expenses & Invoices",
    category: "Revenue & Finance",
    href: "/dashboard/expenses",
    icon: Receipt,
    description: "Agency expenditures, vendor payouts, and invoices",
  },
  {
    name: "SOW & SOP Templates",
    category: "Operations",
    href: "/dashboard/sow-sop",
    icon: FileText,
    description: "Standard operating procedures and contract blueprints",
  },
  {
    name: "Notes & Tickets",
    category: "Operations",
    href: "/dashboard/tickets",
    icon: MessageSquare,
    description: "Internal communication notes and support tickets",
  },
  {
    name: "Team Directory",
    category: "Operations",
    href: "/dashboard/team",
    icon: Building2,
    description: "Agency roster, departmental contacts, and roles",
  },
  {
    name: "Reports & Analytics",
    category: "Operations",
    href: "/dashboard/reports",
    icon: BarChart3,
    description: "Operational insights and performance reports",
  },
  {
    name: "Workspace Settings",
    category: "Administration",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Configure workspace settings, users, and roles",
  },
];

const BREADCRUMB_MAP: Record<string, { category: string; page: string; icon: LucideIcon }> = {
  profile: { category: "Personal", page: "My Profile", icon: User },
  sales: { category: "Sales & Growth", page: "Sales Pipeline", icon: Target },
  presales: { category: "Sales & Growth", page: "Presales & Leads", icon: Presentation },
  estimates: { category: "Sales & Growth", page: "Estimates & Proposals", icon: DollarSign },
  projects: { category: "Delivery & Execution", page: "Projects & Dev", icon: Briefcase },
  tasks: { category: "Delivery & Execution", page: "Task Kanban", icon: CheckSquare },
  workforce: { category: "Delivery & Execution", page: "Team Workforce", icon: UserCheck },
  finance: { category: "Revenue & Finance", page: "Revenue Management", icon: DollarSign },
  expenses: { category: "Revenue & Finance", page: "Expenses & Invoices", icon: Receipt },
  "sow-sop": { category: "Operations", page: "SOW & SOP Templates", icon: FileText },
  tickets: { category: "Operations", page: "Notes & Tickets", icon: Ticket },
  team: { category: "Operations", page: "Team Directory", icon: Building2 },
  reports: { category: "Operations", page: "Analytics & Reports", icon: BarChart3 },
  settings: { category: "Administration", page: "Workspace Settings", icon: Settings },
};

interface BreadcrumbData {
  category: string;
  categoryHref: string;
  page: string;
  pageHref: string;
  icon: LucideIcon;
}

function getPageBreadcrumb(pathname: string | null): BreadcrumbData {
  if (!pathname || pathname === "/dashboard") {
    return {
      category: "DASHBOARD",
      categoryHref: "/dashboard",
      page: "OVERVIEW",
      pageHref: "/dashboard",
      icon: LayoutDashboard,
    };
  }

  const segments = pathname.split("/").filter(Boolean);
  const lastSeg = segments[segments.length - 1];

  const isLeadRoute =
    segments.includes("leads") ||
    segments.includes("sales") ||
    /^LEAD-/i.test(lastSeg) ||
    /^LD-/i.test(lastSeg);

  if (isLeadRoute && segments.length >= 3) {
    const rawId = lastSeg.toUpperCase();
    const leadCode = rawId.startsWith("LEAD-") || rawId.startsWith("LD-") ? rawId : `LEAD-${rawId}`;
    return {
      category: "DASHBOARD",
      categoryHref: "/dashboard",
      page: leadCode,
      pageHref: pathname,
      icon: Target,
    };
  }

  const mapped = BREADCRUMB_MAP[lastSeg];
  if (mapped) {
    return {
      category: "DASHBOARD",
      categoryHref: "/dashboard",
      page: mapped.page.toUpperCase(),
      pageHref: pathname,
      icon: mapped.icon,
    };
  }

  return {
    category: "DASHBOARD",
    categoryHref: "/dashboard",
    page: lastSeg.toUpperCase(),
    pageHref: pathname,
    icon: LayoutDashboard,
  };
}

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  // Command K search modal state
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Logged-in user state
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    role: string;
    department?: string;
  } | null>(null);

  // Outside click references
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUserData(data.user);
      })
      .catch(() => {});

    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setShowQuickActions(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => {
          if (prev) setCommandSearch("");
          return !prev;
        });
      } else if (e.key === "Escape") {
        setCommandOpen(false);
        setCommandSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto-focus command palette input when modal opens
  useEffect(() => {
    if (commandOpen) {
      const timer = setTimeout(() => commandInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [commandOpen]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");
      toast.success("Signed out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout Error", { description: "Failed to sign out." });
    }
  };

  const handleNavigateCommand = (href: string) => {
    setCommandOpen(false);
    setCommandSearch("");
    router.push(href as any);
  };

  const role = userData?.role || "admin";
  const department = userData?.department || "development";
  const userName = userData?.name || "Team Member";
  const userEmail = userData?.email || "team@webxode.com";
  const userRoleDisplay = role === "admin" ? "ADMIN" : `${department.toUpperCase()}`;
  const avatarConfig = getDefaultAvatar(role, department, userName);

  const filteredCommands = useMemo(() => {
    if (!commandSearch.trim()) return COMMAND_PALETTE_ITEMS;
    const query = commandSearch.toLowerCase();
    return COMMAND_PALETTE_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [commandSearch]);

  const breadcrumb = getPageBreadcrumb(pathname);
  const BreadcrumbIcon = breadcrumb.icon;

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 shadow-2xs backdrop-blur-2xl transition-all lg:h-20 lg:px-8">
        {/* Left Section: Mobile Menu Trigger & Breadcrumbs */}
        <div className="flex min-w-0 flex-1 shrink-0 items-center gap-2 sm:gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 sm:h-10 sm:w-10 lg:hidden"
              title="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Breadcrumb Navigation for Tablet & Desktop */}
          <div className="hidden min-w-0 items-center gap-2.5 text-sm sm:flex">
            <Link
              href="/dashboard"
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50/90 text-indigo-600 shadow-2xs transition-all hover:scale-105 hover:bg-indigo-100 md:flex"
              title="Dashboard Home"
            >
              <BreadcrumbIcon className="h-4.5 w-4.5" />
            </Link>
            <div className="flex min-w-0 items-center gap-2">
              <Link
                href={breadcrumb.categoryHref as any}
                className="inline-flex shrink-0 items-center rounded-full border border-slate-200/90 bg-slate-100/90 px-3 py-1 text-xs font-black tracking-wider text-slate-700 uppercase shadow-2xs transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                title={`Navigate to ${breadcrumb.category}`}
              >
                {breadcrumb.category}
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              <Link
                href={breadcrumb.pageHref as any}
                className="max-w-36 truncate text-sm font-black tracking-tight text-slate-900 transition-colors hover:text-indigo-600 sm:max-w-56 md:max-w-64 lg:max-w-none lg:text-base"
                title={`Current page: ${breadcrumb.page}`}
              >
                {breadcrumb.page}
              </Link>
            </div>
          </div>

          {/* Mobile Current Page Header (< sm) */}
          <div className="flex min-w-0 items-center gap-1.5 sm:hidden">
            <Link
              href={breadcrumb.categoryHref as any}
              className="inline-flex shrink-0 items-center rounded-full border border-slate-200/90 bg-slate-100 px-2.5 py-0.5 text-[11px] font-black tracking-wider text-slate-700 uppercase"
            >
              {breadcrumb.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <Link
              href={breadcrumb.pageHref as any}
              className="max-w-28 truncate text-xs font-black text-slate-900 hover:text-indigo-600"
            >
              {breadcrumb.page}
            </Link>
          </div>
        </div>

        {/* Center Section: Responsive Command Search Bar */}
        <div className="flex shrink-0 justify-center px-2 sm:px-4">
          {/* Tablet & Desktop Expand Search */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="group relative hidden h-9 w-60 items-center justify-between rounded-full border border-slate-200/70 bg-slate-100/60 px-4 py-2 text-xs text-slate-500 shadow-xs transition-all duration-300 hover:border-indigo-300 hover:bg-white hover:text-slate-800 hover:shadow-md sm:flex sm:h-10 sm:text-sm md:w-[320px] lg:h-10.5 lg:w-110"
          >
            <div className="flex min-w-0 items-center gap-1">
              <Search className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-indigo-600" />
              <span className="truncate font-medium text-slate-500 group-hover:text-slate-700">
                Search modules...
              </span>
            </div>
            <kbd className="hidden shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-500 shadow-2xs group-hover:border-indigo-200 group-hover:text-indigo-600 lg:flex">
              <Command className="h-3 w-3" /> K
            </kbd>
          </button>

          {/* Mobile Icon Button Search */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50 text-slate-600 transition-colors hover:bg-white hover:text-indigo-600 sm:hidden"
            title="Search modules"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex flex-1 shrink-0 items-center justify-end gap-3 sm:gap-5">
          {/* Agency Online Status Pill (Desktop only) */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 px-2 py-1.5 text-xs font-bold text-emerald-700 shadow-2xs 2xl:flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>Webxode OS</span>
          </div>

          {/* Quick Action (+ New Action) */}
          <QuickActionsMenu
            show={showQuickActions}
            onToggle={() => setShowQuickActions(!showQuickActions)}
            onClose={() => setShowQuickActions(false)}
            containerRef={quickRef}
          />

          {/* Notifications Bell */}
          <NotificationsMenu
            show={showNotifications}
            read={notificationsRead}
            onToggle={() => setShowNotifications(!showNotifications)}
            onMarkRead={() => setNotificationsRead(true)}
            containerRef={notifRef}
          />

          <div className="hidden h-5 w-px bg-slate-200/90 sm:block" />

          {/* User Profile Menu */}
          <ProfileMenu
            show={showProfileMenu}
            userName={userName}
            userEmail={userEmail}
            userRoleDisplay={userRoleDisplay}
            avatarConfig={avatarConfig}
            onToggle={() => setShowProfileMenu(!showProfileMenu)}
            onClose={() => setShowProfileMenu(false)}
            onLogout={handleLogout}
            containerRef={profileRef}
          />
        </div>
      </header>

      {/* Command Palette Modal (⌘K) */}
      <CommandPaletteModal
        open={commandOpen}
        search={commandSearch}
        filteredCommands={filteredCommands}
        inputRef={commandInputRef}
        onSearchChange={setCommandSearch}
        onClose={() => setCommandOpen(false)}
        onSelect={handleNavigateCommand}
      />
    </>
  );
}
