"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { toast } from "sonner";

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string; role: string } | null>(
    null,
  );

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout Error", { description: "Failed to sign out." });
    }
  };

  const userName = userData?.name || "Akash S M";
  const userEmail = userData?.email || "akash@webxode.com";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 backdrop-blur-xl sm:px-6">
      {/* Left Section: Mobile Menu Trigger & Search */}
      <div className="flex max-w-lg flex-1 items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-100 lg:hidden"
            title="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, projects, or tasks... (⌘K)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pr-12 pl-10 text-xs text-slate-800 placeholder-slate-400 transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
          />
          <div className="absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-2xs sm:flex">
            <Command className="h-3 w-3" /> K
          </div>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Agency Online Status Pill */}
        <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Webxode HQ • Systems Normal</span>
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
            <div className="animate-in fade-in absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Quick Actions
              </div>
              <Link
                href={"/sales" as any}
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <UserPlus className="h-4 w-4 text-indigo-500" />
                <span>+ Add Sales Lead</span>
              </Link>
              <Link
                href={"/presales" as any}
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FilePlus className="h-4 w-4 text-purple-500" />
                <span>+ Create Proposal</span>
              </Link>
              <Link
                href={"/projects" as any}
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FolderPlus className="h-4 w-4 text-cyan-500" />
                <span>+ Start New Project</span>
              </Link>
              <Link
                href={"/finance" as any}
                onClick={() => setShowQuickActions(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <span>+ Log Invoice / Expense</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </span>
          </button>

          {showNotifications && (
            <div className="animate-in fade-in absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl ring-1 ring-black/5 duration-150">
              <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                  3 New
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 rounded-xl p-2 transition-colors hover:bg-slate-50">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Proposal Approved</p>
                    <p className="text-[11px] text-slate-400">Client signed Acme Corp SOW</p>
                    <span className="text-[9px] text-slate-400">10 mins ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl p-2 transition-colors hover:bg-slate-50">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">New Qualified Lead</p>
                    <p className="text-[11px] text-slate-400">
                      Enterprise inbound from Webxode Site
                    </p>
                    <span className="text-[9px] text-slate-400">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-slate-200" />

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-xs">
              {userName[0]}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs leading-tight font-bold text-slate-900">{userName}</p>
              <p className="text-[10px] text-slate-500">Admin</p>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
          </button>

          {showProfileMenu && (
            <div className="animate-in fade-in absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 duration-150">
              <div className="border-b border-slate-100 px-3 py-2.5">
                <p className="text-xs font-bold text-slate-900">{userName}</p>
                <p className="truncate text-[11px] text-slate-500">{userEmail}</p>
              </div>

              <div className="py-1">
                <Link
                  href={"/settings" as any}
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  <span>Workspace Settings</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
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
  );
}
