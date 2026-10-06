// src/components/profile/tabs/timeline-tab.tsx
"use client";

import { useState } from "react";
import {
  Activity,
  Zap,
  FileText,
  Lock,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  DollarSign,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface TimelineEvent {
  id: string;
  title: string;
  desc: string;
  category: "system" | "sales" | "security" | "projects" | "finance";
  categoryLabel: string;
  time: string;
  dateGroup: "Today" | "Yesterday" | "Earlier This Week";
  user: string;
  ipLocation?: string;
  impact: "Success" | "Notice" | "Security Alert" | "Info";
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  badgeBg: string;
  actionUrl?: string;
  actionText?: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "EVT-9041",
    title: "Updated Environment Rate Limits & Webhooks",
    desc: "Reconfigured API rate limits to 10,000 req/min and updated Github Actions webhook secrets for production cluster.",
    category: "system",
    categoryLabel: "System & DevOps",
    time: "12 minutes ago",
    dateGroup: "Today",
    user: "AKASH (Superadmin)",
    ipLocation: "Namakkal, TN (182.74.92.12)",
    impact: "Success",
    icon: Zap,
    iconBg: "bg-indigo-100 text-indigo-700 border-indigo-200",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    actionText: "View Deployment Logs",
  },
  {
    id: "EVT-9038",
    title: "Executed Proposal SOW v2.4 ($35,000)",
    desc: "Client Acme Corp signed standard Master Services Agreement and executed initial retainer sprint milestones.",
    category: "sales",
    categoryLabel: "Sales & Proposals",
    time: "2 hours ago",
    dateGroup: "Today",
    user: "AKASH",
    ipLocation: "Namakkal, TN",
    impact: "Success",
    icon: FileText,
    iconBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    actionText: "View Signed SOW",
  },
  {
    id: "EVT-9022",
    title: "Revoked Inactive Mobile Session",
    desc: "Terminated inactive JWT token from iPhone Safari session logged in San Francisco, CA.",
    category: "security",
    categoryLabel: "Security & Auth",
    time: "Yesterday at 4:15 PM",
    dateGroup: "Yesterday",
    user: "System Security Monitor",
    ipLocation: "San Francisco, CA (54.210.12.9)",
    impact: "Security Alert",
    icon: Lock,
    iconBg: "bg-rose-100 text-rose-700 border-rose-200",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    actionText: "Security Audit",
  },
  {
    id: "EVT-9015",
    title: "Approved Sprint 3 Timecards ($4,850)",
    desc: "Approved 42.5 logged hours for WebXode OS v2.0 development team sprint deliverables.",
    category: "finance",
    categoryLabel: "Finance & Payroll",
    time: "Yesterday at 11:30 AM",
    dateGroup: "Yesterday",
    user: "AKASH",
    ipLocation: "Namakkal, TN",
    impact: "Success",
    icon: DollarSign,
    iconBg: "bg-amber-100 text-amber-800 border-amber-200",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    actionText: "View Payroll Log",
  },
  {
    id: "EVT-8994",
    title: "Promoted Priya Sharma to Senior Lead",
    desc: "Updated organizational hierarchy role permissions for Development & Engineering department.",
    category: "projects",
    categoryLabel: "Workforce & Team",
    time: "Oct 04, 2026",
    dateGroup: "Earlier This Week",
    user: "AKASH",
    ipLocation: "Namakkal, TN",
    impact: "Notice",
    icon: UserCheck,
    iconBg: "bg-purple-100 text-purple-700 border-purple-200",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    actionText: "Team Directory",
  },
];

export function TimelineTab() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const categories = [
    { id: "all", label: "All Activity" },
    { id: "system", label: "System & DevOps" },
    { id: "sales", label: "Sales & Proposals" },
    { id: "security", label: "Security & Auth" },
    { id: "finance", label: "Finance" },
  ];

  const filteredEvents = TIMELINE_EVENTS.filter((evt) => {
    const matchesCat = activeCategory === "all" || evt.category === activeCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRefresh = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Audit Log Synchronized", {
        description: "Latest user activities fetched live.",
      });
    }, 600);
  };

  const groupedDates = ["Today", "Yesterday", "Earlier This Week"] as const;

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Activity & Audit Log Timeline
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Live Audit Active
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Real-time system events, administrative changes, and security audit logs recorded for
            your user.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 sm:text-sm"
        >
          <RefreshCw
            className={`h-4 w-4 text-slate-500 ${isSyncing ? "animate-spin text-indigo-600" : ""}`}
          />
          <span>Refresh Audit Logs</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Pills (Horizontal Scroll on mobile) */}
        <div className="flex w-full scrollbar-none items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex w-full shrink-0 items-center md:w-64">
          <Search className="absolute left-3.5 h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity log..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pr-4 pl-10 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
          />
        </div>
      </div>

      {/* Chronological Timeline Stream */}
      <div className="space-y-8">
        {groupedDates.map((group) => {
          const eventsInGroup = filteredEvents.filter((e) => e.dateGroup === group);
          if (eventsInGroup.length === 0) return null;

          return (
            <div key={group} className="space-y-4">
              {/* Group Date Header Pill */}
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-extrabold tracking-wide text-slate-700 uppercase">
                  {group}
                </span>
                <div className="h-px flex-1 bg-slate-200/80" />
              </div>

              {/* Vertical Timeline Card Stream */}
              <div className="relative space-y-4 pl-7 before:absolute before:top-3 before:bottom-3 before:left-3 before:w-0.5 before:bg-slate-200 sm:pl-10 sm:before:left-4">
                {eventsInGroup.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="group relative">
                      {/* Timeline Node Bullet */}
                      <div className="absolute top-4 -left-7 flex h-6 w-6 items-center justify-center rounded-full border-2 border-indigo-600 bg-white shadow-2xs transition-transform group-hover:scale-110 sm:-left-10 sm:h-7 sm:w-7">
                        <span className="h-2 w-2 rounded-full bg-indigo-600 sm:h-2.5 sm:w-2.5" />
                      </div>

                      {/* Event Box Card */}
                      <div className="space-y-3 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all hover:border-indigo-200 hover:shadow-xs sm:p-5">
                        <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center">
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                                {item.title}
                              </h3>
                              <p className="text-xs font-semibold text-indigo-600">
                                {item.categoryLabel}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${item.badgeBg}`}
                            >
                              {item.impact}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                              <Clock className="h-3 w-3" /> {item.time}
                            </span>
                          </div>
                        </div>

                        {/* Event Details Body */}
                        <p className="text-xs leading-relaxed font-normal text-slate-600 sm:text-sm">
                          {item.desc}
                        </p>

                        {/* Event Footer Meta & Action */}
                        <div className="flex flex-col justify-between gap-3 pt-2 text-xs sm:flex-row sm:items-center">
                          <div className="flex flex-wrap items-center gap-2 font-medium text-slate-500">
                            <span>
                              Actor: <strong className="text-slate-800">{item.user}</strong>
                            </span>
                            {item.ipLocation && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span className="truncate">{item.ipLocation}</span>
                              </>
                            )}
                          </div>

                          {item.actionText && (
                            <button
                              type="button"
                              onClick={() =>
                                toast.info(item.actionText!, { description: `Ref: ${item.id}` })
                              }
                              className="flex items-center gap-1 self-end text-xs font-bold text-indigo-600 hover:text-indigo-800 sm:self-center"
                            >
                              <span>{item.actionText}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="space-y-2 py-12 text-center text-slate-500">
            <Activity className="mx-auto h-8 w-8 animate-pulse text-slate-300" />
            <p className="text-sm font-bold text-slate-800">No activity events found</p>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
