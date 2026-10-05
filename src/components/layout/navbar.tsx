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

const commandPaletteItems: CommandItem[] = [
  {
    name: "Executive Dashboard",
    category: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Main workspace overview & executive KPIs",
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

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  // Command K search modal state
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const commandInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    role: string;
    department?: string;
  } | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch logged in user profile
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUserData(data.user);
        }
      })
      .catch(() => {});

    // Handle outside clicks
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

    // Keyboard shortcut (⌘K or Ctrl+K) to open Command Palette
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

  // Filter command items
  const filteredCommands = useMemo(() => {
    if (!commandSearch.trim()) return commandPaletteItems;
    const query = commandSearch.toLowerCase();
    return commandPaletteItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
  }, [commandSearch]);

  // Compute clean readable title from pathname
  const getPageBreadcrumb = () => {
    if (!pathname || pathname === "/dashboard") return { category: "Overview", page: "Dashboard" };
    const segments = pathname.split("/").filter(Boolean);
    const lastSeg = segments[segments.length - 1];

    const titleMap: Record<string, { category: string; page: string }> = {
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

    return (
      titleMap[lastSeg] || {
        category: "Dashboard",
        page: lastSeg.charAt(0).toUpperCase() + lastSeg.slice(1),
      }
    );
  };

  const breadcrumb = getPageBreadcrumb();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 shadow-2xs backdrop-blur-xl sm:px-6">
        {/* Left Section: Mobile Menu Trigger & Improved Breadcrumbs */}
        <div className="flex shrink-0 items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-100 lg:hidden"
              title="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Premium Breadcrumbs Title */}
          <div className="hidden items-center gap-2.5 text-xs md:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50/80 text-indigo-600 shadow-2xs">
              <LayoutDashboard className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-slate-200/80 bg-slate-100/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                {breadcrumb.category}
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-extrabold tracking-tight text-slate-900">
                {breadcrumb.page}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER SECTION: Centered Search Bar */}
        <div className="mx-4 flex max-w-md flex-1 justify-center">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="group relative flex w-full max-w-xs items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50/80 py-1.5 pr-2.5 pl-3.5 text-xs text-slate-500 shadow-2xs transition-all duration-200 hover:border-indigo-300 hover:bg-white hover:text-slate-800 hover:shadow-sm sm:max-w-sm"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-indigo-600" />
              <span className="truncate">Search modules, tasks, projects...</span>
            </div>
            <kbd className="hidden items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-400 shadow-2xs group-hover:border-indigo-200 group-hover:text-indigo-600 sm:flex">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          {/* Agency Online Status Pill */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 xl:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Webxode OS</span>
          </div>

          {/* Quick Action (+ New) Dropdown */}
          <div className="relative" ref={quickRef}>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Action</span>
              <ChevronDown className="h-3.5 w-3.5 text-indigo-200" />
            </button>

            {showQuickActions && (
              <div className="animate-in fade-in absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl ring-1 ring-black/5 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Quick Actions
                </div>
                <Link
                  href={"/dashboard/sales" as any}
                  onClick={() => setShowQuickActions(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <UserPlus className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold">Add Sales Lead</p>
                    <p className="text-[10px] font-normal text-slate-400">
                      Log new pipeline prospect
                    </p>
                  </div>
                </Link>

                <Link
                  href={"/dashboard/estimates" as any}
                  onClick={() => setShowQuickActions(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <FilePlus className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold">Create Proposal</p>
                    <p className="text-[10px] font-normal text-slate-400">
                      Generate estimate or SOW
                    </p>
                  </div>
                </Link>

                <Link
                  href={"/dashboard/projects" as any}
                  onClick={() => setShowQuickActions(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                    <FolderPlus className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold">Start New Project</p>
                    <p className="text-[10px] font-normal text-slate-400">
                      Kick off delivery milestone
                    </p>
                  </div>
                </Link>

                <Link
                  href={"/dashboard/finance" as any}
                  onClick={() => setShowQuickActions(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <DollarSign className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold">Log Payment / Invoice</p>
                    <p className="text-[10px] font-normal text-slate-400">Record revenue stream</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {!notificationsRead && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="animate-in fade-in absolute right-0 z-50 mt-2 w-84 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xl ring-1 ring-black/5 duration-150">
                <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Activity & Alerts</span>
                    {!notificationsRead && (
                      <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                        2 New
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setNotificationsRead(true)}
                    className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <Check className="h-3 w-3" />
                    <span>Mark read</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-slate-100 hover:bg-slate-50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800">Proposal Signed & Approved</p>
                      <p className="text-[11px] text-slate-500">Client signed Acme Corp SOW v2.4</p>
                      <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-slate-400">
                        <Clock className="h-3 w-3" /> 10 minutes ago
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-slate-100 hover:bg-slate-50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800">New High-Value Lead</p>
                      <p className="text-[11px] text-slate-500">
                        Inbound inquiry via WebXode Site ($25k project)
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-slate-400">
                        <Clock className="h-3 w-3" /> 1 hour ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200" />

          {/* User Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-slate-100"
            >
              <div
                className={`relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl ${avatarConfig.bgClass} shadow-sm`}
              >
                <Image
                  src={avatarConfig.imageUrl}
                  alt={userName}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs leading-tight font-bold text-slate-900">{userName}</p>
                <p className="text-[10px] font-semibold text-slate-400">{userRoleDisplay}</p>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
            </button>

            {showProfileMenu && (
              <div className="animate-in fade-in absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl ring-1 ring-black/5 duration-150">
                <div className="flex items-center gap-2.5 border-b border-slate-100 px-3 py-2.5">
                  <div
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl ${avatarConfig.bgClass} shadow-xs`}
                  >
                    <Image
                      src={avatarConfig.imageUrl}
                      alt={userName}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-900">{userName}</p>
                    <p className="truncate text-[11px] text-slate-500">{userEmail}</p>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-700">
                      <ShieldCheck className="h-3 w-3" /> {userRoleDisplay}
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href={"/dashboard/settings" as any}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    <Settings className="h-4 w-4 text-slate-400" />
                    <span>Workspace Settings</span>
                  </Link>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* COMMAND PALETTE SEARCH MODAL (⌘K) */}
      {commandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
          <div
            className="animate-in fade-in fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setCommandOpen(false)}
          />
          <div className="animate-in zoom-in-95 relative w-full max-w-lg rounded-2xl border border-slate-200/90 bg-white p-2 shadow-2xl ring-1 ring-black/5 duration-150">
            {/* Modal Search Header */}
            <div className="relative flex items-center border-b border-slate-100 px-3 pt-1 pb-2.5">
              <Search className="mr-2.5 h-4 w-4 text-indigo-600" />
              <input
                ref={commandInputRef}
                type="text"
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                placeholder="Type a command or search modules..."
                className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setCommandOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 scrollbar-thin overflow-y-auto p-1.5">
              {filteredCommands.length > 0 ? (
                <div className="space-y-1">
                  {filteredCommands.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavigateCommand(item.href)}
                        className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-all hover:bg-indigo-50/80 hover:text-indigo-900"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 shadow-2xs transition-colors group-hover:bg-white group-hover:text-indigo-600">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-900 group-hover:text-indigo-900">
                                {item.name}
                              </p>
                              <span className="py-0.2 rounded-md border border-slate-200/60 bg-slate-100 px-1.5 text-[9px] font-semibold text-slate-500 group-hover:border-indigo-200 group-hover:bg-indigo-100/70 group-hover:text-indigo-700">
                                {item.category}
                              </span>
                            </div>
                            <p className="truncate text-[11px] text-slate-500 group-hover:text-slate-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-600" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  No matching module found for &quot;{commandSearch}&quot;
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2 text-[10px] font-semibold text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5">↵</kbd>{" "}
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5">esc</kbd>{" "}
                  to close
                </span>
              </div>
              <span className="font-bold text-indigo-600">WebXode OS Command</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
