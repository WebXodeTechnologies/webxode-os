// src/components/profile/tabs/timesheets-tab.tsx
"use client";

import { useState } from "react";
import {
  Clock,
  Plus,
  CheckCircle2,
  Calendar,
  FileText,
  Users,
  Briefcase,
  TrendingUp,
  Search,
  Filter,
  ArrowUpRight,
  Code2,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { getDefaultAvatar } from "@/lib/avatars";
import { toast } from "sonner";

interface WorkLog {
  id: string;
  workerName: string;
  workerTitle: string;
  department: string;
  projectName: string;
  taskCompleted: string;
  hoursLogged: string;
  date: string;
  status: "Completed & Pushed" | "In Review" | "Deployed" | "Signed Contract";
  billable: boolean;
  avatarBgClass: string;
}

const TEAM_WORK_LOGS: WorkLog[] = [
  {
    id: "LOG-9025",
    workerName: "Priya Sharma",
    workerTitle: "Senior Full Stack Engineering Lead",
    department: "Engineering",
    projectName: "WebXode OS v2.0 Architecture",
    taskCompleted:
      "Implemented Next.js 15 Server Actions, Auth Middleware, and MongoDB session caching.",
    hoursLogged: "8.5 hrs",
    date: "Today (Oct 06)",
    status: "Completed & Pushed",
    billable: true,
    avatarBgClass: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "LOG-9024",
    workerName: "David Chen",
    workerTitle: "Lead UI/UX Product Designer",
    department: "UI/UX Design",
    projectName: "SaaS UI Modernization",
    taskCompleted:
      "Designed Figma component tokens, light-theme card UI specs, and responsive mobile navigation.",
    hoursLogged: "7.5 hrs",
    date: "Today (Oct 06)",
    status: "In Review",
    billable: true,
    avatarBgClass: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "LOG-9023",
    workerName: "Marcus Vance",
    workerTitle: "DevOps & Cloud Lead",
    department: "Infrastructure",
    projectName: "AWS EKS Cloud Migration",
    taskCompleted:
      "Provisioned Terraform infrastructure scripts and verified multi-region ingress security rules.",
    hoursLogged: "9.0 hrs",
    date: "Today (Oct 06)",
    status: "Deployed",
    billable: true,
    avatarBgClass: "bg-purple-100 text-purple-700",
  },
  {
    id: "LOG-9022",
    workerName: "Arun Kumar",
    workerTitle: "Head of Sales & Growth",
    department: "Sales",
    projectName: "Acme Corp Enterprise SOW",
    taskCompleted:
      "Conducted technical demo presentation with CTO and executed v2.4 proposal agreement ($35,000).",
    hoursLogged: "6.5 hrs",
    date: "Yesterday (Oct 05)",
    status: "Signed Contract",
    billable: true,
    avatarBgClass: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "LOG-9021",
    workerName: "Kavya Nair",
    workerTitle: "Senior Presales Architect",
    department: "Presales",
    projectName: "Global Logistics API Scope",
    taskCompleted:
      "Authored system architecture specification proposal and estimated REST API endpoint milestones.",
    hoursLogged: "8.0 hrs",
    date: "Yesterday (Oct 05)",
    status: "In Review",
    billable: true,
    avatarBgClass: "bg-amber-100 text-amber-700",
  },
];

export function TimesheetsTab() {
  const [filterView, setFilterView] = useState<"all" | "my" | "engineering" | "sales">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const weekDays = [
    { day: "Mon", date: "Oct 02", hours: "8.5 hrs", project: "WebXode OS v2.0" },
    { day: "Tue", date: "Oct 03", hours: "8.0 hrs", project: "Client Portal API" },
    { day: "Wed", date: "Oct 04", hours: "8.5 hrs", project: "Fintech Retainer" },
    { day: "Thu", date: "Oct 05", hours: "9.0 hrs", project: "WebXode OS v2.0" },
    { day: "Fri", date: "Oct 06", hours: "8.5 hrs", project: "Architecture Review" },
  ];

  const filteredLogs = TEAM_WORK_LOGS.filter((log) => {
    if (
      filterView === "engineering" &&
      log.department !== "Engineering" &&
      log.department !== "Infrastructure" &&
      log.department !== "UI/UX Design"
    ) {
      return false;
    }
    if (filterView === "sales" && log.department !== "Sales" && log.department !== "Presales") {
      return false;
    }
    if (filterView === "my" && log.workerName !== "AKASH") {
      // Show team logs if no 'AKASH' log exists
    }

    const matchesSearch =
      log.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.taskCompleted.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.projectName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Total Logging Time & Completed Work Activity
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Track logged hours, completed engineering tasks, and billable work activities recorded
            by your team.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.info("Log Work Hours", { description: "Opening timecard and task entry form." })
          }
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Log Work Activity</span>
        </button>
      </div>

      {/* Primary Key Summary Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-600">
            <Clock className="h-4 w-4" />
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Total Logged Time
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            168.5 <span className="text-xs font-bold text-slate-500">hrs (Oct)</span>
          </p>
          <p className="text-[11px] font-semibold text-emerald-600">+12% vs last month</p>
        </div>

        <div className="space-y-1 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Billable Ratio
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            94.2% <span className="text-xs font-bold text-slate-500">Billable</span>
          </p>
          <p className="text-[11px] font-semibold text-slate-500">158.5h Client / 10.0h Internal</p>
        </div>

        <div className="space-y-1 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-cyan-600">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Works Completed
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            42 <span className="text-xs font-bold text-slate-500">Tasks</span>
          </p>
          <p className="text-[11px] font-semibold text-cyan-700">5 Sprint Milestones</p>
        </div>

        <div className="space-y-1 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-purple-600">
            <Users className="h-4 w-4" />
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Active Logging Team
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            8 <span className="text-xs font-bold text-slate-500">Engineers</span>
          </p>
          <p className="text-[11px] font-semibold text-purple-700">100% Timesheet Approval</p>
        </div>
      </div>

      {/* Your Weekly Timecard Banner */}
      <div className="space-y-5 rounded-3xl border border-indigo-200/90 bg-linear-to-r from-indigo-50/70 via-white to-cyan-50/50 p-6 shadow-2xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              <p className="text-xs font-bold tracking-wide text-indigo-800 uppercase">
                Your Personal Week Breakdown
              </p>
            </div>
            <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              42.5 <span className="text-sm font-semibold text-slate-500">/ 40.0 Target Hours</span>
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-emerald-200 bg-emerald-100 px-3.5 py-1.5 text-xs font-extrabold text-emerald-800 sm:self-center">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Overtime Approved (+2.5h)
          </span>
        </div>

        {/* Daily Hours Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {weekDays.map((item, idx) => (
            <div
              key={idx}
              className="space-y-1 rounded-2xl border border-slate-200/80 bg-white p-3 text-center shadow-2xs transition-colors hover:border-indigo-300"
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                {item.day} • {item.date}
              </p>
              <p className="text-base font-extrabold text-slate-900">{item.hours}</p>
              <p className="truncate text-[10px] font-semibold text-indigo-600">{item.project}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Completed Work Activity Stream */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
              Completed Work & Activity Logs
            </h3>
            <p className="text-xs text-slate-500">
              Detailed tasks completed by working team members.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "all", label: "All Team" },
                { id: "engineering", label: "Dev & Design" },
                { id: "sales", label: "Sales & Presales" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterView(tab.id as any)}
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    filterView === tab.id
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex min-w-45 items-center">
              <Search className="absolute left-3.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search completed tasks..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2 pr-3 pl-9 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Detailed Work Completion Cards List */}
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const avatar = getDefaultAvatar("user", log.department, log.workerName);
            return (
              <div
                key={log.id}
                className="flex flex-col justify-between space-y-3 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-xs"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  {/* Worker Avatar & Title */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${avatar.bgClass} border border-slate-200 shadow-2xs`}
                    >
                      <Image
                        src={avatar.imageUrl}
                        alt={log.workerName}
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-extrabold text-slate-900">
                          {log.workerName}
                        </p>
                        <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                          {log.department}
                        </span>
                      </div>
                      <p className="truncate text-xs font-medium text-slate-500">
                        {log.workerTitle}
                      </p>
                    </div>
                  </div>

                  {/* Hours & Status Badge */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-sm font-black text-slate-900 sm:text-base">
                      {log.hoursLogged}
                    </span>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-extrabold text-emerald-700">
                      {log.status}
                    </span>
                  </div>
                </div>

                {/* Completed Work Description */}
                <div className="space-y-1 rounded-2xl border border-slate-200/60 bg-slate-50/60 p-3.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="font-extrabold text-indigo-600">
                      Project: {log.projectName}
                    </span>
                    <span>
                      Ref: {log.id} • {log.date}
                    </span>
                  </div>
                  <p className="pt-1 leading-relaxed font-semibold text-slate-900">
                    {log.taskCompleted}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
