// src/components/layout/navbar.tsx
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
  UserPlus,
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
} from "lucide-react";
import { toast } from "sonner";

// ==========================================
// TYPES & CONSTANTS
// ==========================================

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

interface CommandItem {
  name: string;
  category: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
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

const BREADCRUMB_MAP: Record<string, { category: string; page: string }> = {
  profile: { category: "Profile", page: "My Profile" },
  sales: { category: "Sales & Growth", page: "Sales Pipeline" },
  presales: { category: "Sales & Growth", page: "Presales & Leads" },
  estimates: { category: "Sales & Growth", page: "Estimates & Proposals" },
  projects: { category: "Delivery & Execution", page: "Projects & Dev" },
  tasks: { category: "Delivery & Execution", page: "Task Kanban" },
  workforce: { category: "Delivery & Execution", page: "Team Workforce" },
  finance: { category: "Revenue & Finance", page: "Revenue Management" },
  expenses: { category: "Revenue & Finance", page: "Expenses & Invoices" },
  "sow-sop": { category: "Operations", page: "SOW & SOP Templates" },
  tickets: { category: "Operations", page: "Notes & Tickets" },
  team: { category: "Operations", page: "Team Directory" },
  reports: { category: "Operations", page: "Analytics & Reports" },
  settings: { category: "Administration", page: "Workspace Settings" },
};

function getPageBreadcrumb(pathname: string | null) {
  if (!pathname || pathname === "/dashboard") return { category: "Overview", page: "Dashboard" };
  const segments = pathname.split("/").filter(Boolean);
  const lastSeg = segments[segments.length - 1];

  return (
    BREADCRUMB_MAP[lastSeg] || {
      category: "Dashboard",
      page: lastSeg.charAt(0).toUpperCase() + lastSeg.slice(1),
    }
  );
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

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 shadow-2xs backdrop-blur-xl transition-all sm:px-5 lg:h-20 lg:px-8">
        {/* Left Section: Mobile Menu Trigger & Breadcrumbs */}
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
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
          <div className="hidden min-w-0 items-center gap-2 text-sm sm:flex">
            <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/90 text-indigo-600 shadow-2xs md:flex lg:h-9 lg:w-9">
              <LayoutDashboard className="h-4 w-4 lg:h-4.5 lg:w-4.5" />
            </div>
            <div className="flex min-w-0 items-center gap-1.5 lg:gap-2">
              <span className="hidden shrink-0 rounded-lg border border-slate-200/90 bg-slate-100/90 px-2.5 py-1 text-xs font-bold tracking-wider text-slate-700 uppercase lg:inline-block">
                {breadcrumb.category}
              </span>
              <ChevronRight className="hidden h-4 w-4 shrink-0 text-slate-400 lg:inline-block" />
              <span className="max-w-32.5 truncate text-sm font-extrabold tracking-tight text-slate-900 md:max-w-45 lg:max-w-none lg:text-base">
                {breadcrumb.page}
              </span>
            </div>
          </div>

          {/* Mobile Current Page Header (< sm) */}
          <span className="max-w-30 truncate text-sm font-extrabold text-slate-900 sm:hidden">
            {breadcrumb.page}
          </span>
        </div>

        {/* Center Section: Responsive Command Search Bar */}
        <div className="mx-2 flex max-w-45 flex-1 justify-center sm:mx-3 sm:max-w-60 md:mx-4 md:max-w-[320px] lg:max-w-md">
          {/* Tablet & Desktop Expand Search */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="group relative hidden h-9 w-full items-center justify-between rounded-2xl border border-slate-200/90 bg-slate-50/80 px-3 py-2 text-xs text-slate-500 shadow-2xs transition-all duration-200 hover:border-indigo-300 hover:bg-white hover:text-slate-800 hover:shadow-sm sm:flex sm:h-10 sm:px-3.5 sm:text-sm lg:h-11"
          >
            <div className="flex min-w-0 items-center gap-2">
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
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Agency Online Status Pill (Desktop only) */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-2xs xl:flex">
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

// ==========================================
// SUB-COMPONENTS FOR CLEAN CODE
// ==========================================

function QuickActionsMenu({
  show,
  onToggle,
  onClose,
  containerRef,
}: {
  show: boolean;
  onToggle: () => void;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const actions = [
    {
      title: "Add Sales Lead",
      desc: "Log new pipeline prospect",
      href: "/dashboard/sales",
      icon: UserPlus,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      hoverBg: "hover:bg-indigo-50 hover:text-indigo-900",
    },
    {
      title: "Create Proposal",
      desc: "Generate estimate or SOW",
      href: "/dashboard/estimates",
      icon: FilePlus,
      bg: "bg-purple-50",
      text: "text-purple-600",
      hoverBg: "hover:bg-purple-50 hover:text-purple-900",
    },
    {
      title: "Start New Project",
      desc: "Kick off delivery milestone",
      href: "/dashboard/projects",
      icon: FolderPlus,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      hoverBg: "hover:bg-cyan-50 hover:text-cyan-900",
    },
    {
      title: "Log Payment / Invoice",
      desc: "Record revenue stream",
      href: "/dashboard/finance",
      icon: DollarSign,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      hoverBg: "hover:bg-emerald-50 hover:text-emerald-900",
    },
  ];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] sm:h-10 sm:px-3.5 sm:text-sm"
        title="Quick New Action"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New Action</span>
        <ChevronDown className="hidden h-3.5 w-3.5 text-indigo-200 sm:inline" />
      </button>

      {show && (
        <div className="animate-in fade-in absolute right-0 z-50 mt-2.5 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl duration-150">
          <div className="px-3.5 py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Quick Actions
          </div>
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.title}
                href={act.href as any}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition-colors ${act.hoverBg}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${act.bg} ${act.text} shrink-0`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">{act.title}</p>
                  <p className="truncate text-xs font-normal text-slate-500">{act.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NotificationsMenu({
  show,
  read,
  onToggle,
  onMarkRead,
  containerRef,
}: {
  show: boolean;
  read: boolean;
  onToggle: () => void;
  onMarkRead: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900 sm:h-10 sm:w-10"
        title="Notifications"
      >
        <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        {!read && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 sm:top-2 sm:right-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-600 ring-2 ring-white" />
          </span>
        )}
      </button>

      {show && (
        <div className="animate-in fade-in absolute right-0 z-50 mt-2.5 w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl duration-150 sm:w-96 sm:p-4">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 sm:text-sm">Activity & Alerts</span>
              {!read && (
                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 sm:text-xs">
                  2 New
                </span>
              )}
            </div>
            <button
              onClick={onMarkRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Mark read</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-slate-100 hover:bg-slate-50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:h-9 sm:w-9">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900">Proposal Signed & Approved</p>
                <p className="truncate text-xs text-slate-600">Client signed Acme Corp SOW v2.4</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Clock className="h-3 w-3" /> 10 minutes ago
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-slate-100 hover:bg-slate-50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-9 sm:w-9">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900">New High-Value Lead</p>
                <p className="truncate text-xs text-slate-600">
                  Inbound inquiry via WebXode Site ($25k project)
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Clock className="h-3 w-3" /> 1 hour ago
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileMenu({
  show,
  userName,
  userEmail,
  userRoleDisplay,
  avatarConfig,
  onToggle,
  onClose,
  onLogout,
  containerRef,
}: {
  show: boolean;
  userName: string;
  userEmail: string;
  userRoleDisplay: string;
  avatarConfig: { imageUrl: string; bgClass: string };
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-slate-100/80 sm:gap-2.5"
        title="User menu"
      >
        <div
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-10 sm:w-10 ${avatarConfig.bgClass} border border-slate-200/60 shadow-xs`}
        >
          <Image
            src={avatarConfig.imageUrl}
            alt={userName}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        {/* User details shown on Desktop (lg+), hidden on Tablet & Mobile (< lg) for optimal space */}
        <div className="hidden min-w-0 text-left lg:block">
          <p className="truncate text-xs leading-tight font-bold text-slate-900 sm:text-sm">
            {userName}
          </p>
          <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">
            {userRoleDisplay}
          </p>
        </div>
        <ChevronDown className="hidden h-4 w-4 shrink-0 text-slate-400 lg:block" />
      </button>

      {show && (
        <div className="animate-in fade-in absolute right-0 z-50 mt-2.5 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl duration-150 sm:w-72">
          <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
            <div
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ${avatarConfig.bgClass} border border-slate-200/60 shadow-xs`}
            >
              <Image
                src={avatarConfig.imageUrl}
                alt={userName}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">{userName}</p>
              <p className="truncate text-[11px] font-medium text-slate-500">{userEmail}</p>
              <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 sm:text-xs">
                <ShieldCheck className="h-3 w-3" /> {userRoleDisplay}
              </div>
            </div>
          </div>

          <div className="space-y-1 py-1.5">
            <Link
              href={"/dashboard/profile" as any}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:text-sm"
            >
              <User className="h-4 w-4 text-slate-400" />
              <span>My Profile</span>
            </Link>
            <Link
              href={"/dashboard/settings" as any}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:text-sm"
            >
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Workspace Settings</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-1.5">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50 sm:text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CommandPaletteModal({
  open,
  search,
  filteredCommands,
  inputRef,
  onSearchChange,
  onClose,
  onSelect,
}: {
  open: boolean;
  search: string;
  filteredCommands: CommandItem[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSearchChange: (value: string) => void;
  onClose: () => void;
  onSelect: (href: string) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-4 sm:px-4 sm:pt-20">
      <div
        className="animate-in fade-in fixed inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="animate-in zoom-in-95 relative flex max-h-[85vh] w-full max-w-xl flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 shadow-2xl ring-1 ring-black/5 backdrop-blur-2xl duration-150 sm:rounded-3xl sm:p-3">
        <div className="relative flex shrink-0 items-center border-b border-slate-100 px-3 pt-1.5 pb-3 sm:px-4">
          <Search className="mr-2.5 h-4.5 w-4.5 shrink-0 text-indigo-600 sm:h-5 sm:w-5" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type a command or search modules..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none sm:text-base"
          />
          <button
            onClick={onClose}
            className="shrink-0 rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 scrollbar-thin space-y-1 overflow-y-auto p-1.5 sm:p-2">
          {filteredCommands.length > 0 ? (
            <div>
              {filteredCommands.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => onSelect(item.href)}
                    className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-all hover:bg-indigo-50/80 hover:text-indigo-950 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-2xs transition-colors group-hover:bg-white group-hover:text-indigo-600 sm:h-9 sm:w-9">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-bold text-slate-900 group-hover:text-indigo-950">
                            {item.name}
                          </p>
                          <span className="hidden rounded-md border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-100/80 group-hover:text-indigo-800 sm:inline-block">
                            {item.category}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-slate-500 group-hover:text-slate-700 sm:text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-xs font-medium text-slate-500 sm:text-sm">
              No matching module found for &quot;{search}&quot;
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-slate-100 px-3 py-2.5 text-[11px] font-semibold text-slate-400 sm:px-4 sm:text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 text-[10px]">
                ↵
              </kbd>{" "}
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 text-[10px]">
                esc
              </kbd>{" "}
              close
            </span>
          </div>
          <span className="font-bold text-indigo-600">WebXode OS</span>
        </div>
      </div>
    </div>
  );
}
