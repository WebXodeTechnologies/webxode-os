"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { UserCheck, Plane, Laptop, Moon } from "lucide-react";

interface TeamMemberStatus {
  name: string;
  role: string;
  department: string;
  status: "Working" | "Leave" | "Remote" | "Offline";
  workload: number;
}

export function TeamOverviewWidget() {
  const presenceStats = [
    {
      label: "Working",
      count: 18,
      icon: UserCheck,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      label: "On Leave",
      count: 3,
      icon: Plane,
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
    {
      label: "Remote",
      count: 2,
      icon: Laptop,
      color: "text-indigo-700 bg-indigo-50 border-indigo-200",
    },
    {
      label: "Offline",
      count: 1,
      icon: Moon,
      color: "text-slate-700 bg-slate-100 border-slate-200",
    },
  ];

  const topMembers: TeamMemberStatus[] = [
    {
      name: "Akash M.",
      role: "Lead Architect",
      department: "Engineering",
      status: "Working",
      workload: 85,
    },
    {
      name: "Priya Sharma",
      role: "Sr. UI Designer",
      department: "Design",
      status: "Working",
      workload: 70,
    },
    {
      name: "Karthik Raja",
      role: "DevOps Engineer",
      department: "Infrastructure",
      status: "Remote",
      workload: 92,
    },
    {
      name: "Siddharth V.",
      role: "Fullstack Dev",
      department: "Engineering",
      status: "Leave",
      workload: 40,
    },
  ];

  const statusBadges = {
    Working: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Leave: "bg-amber-50 text-amber-700 border-amber-200",
    Remote: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Offline: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Team & Workforce Overview"
        subtitle="Real-time attendance, presence status, and team capacity"
        badge="24 Members"
        badgeVariant="purple"
      />

      {/* Top Row: Presence Badges */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {presenceStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 rounded-2xl border p-3 ${stat.color} transition`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-base font-black">{stat.count}</p>
                <p className="text-xs font-bold opacity-80">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Workload List */}
      <div className="mt-5 space-y-3">
        <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          Member Workload Capacity
        </h4>
        {topMembers.map((member, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:bg-white"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-black text-white shadow-2xs">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 sm:text-sm">{member.name}</p>
                <p className="text-xs font-semibold text-slate-400">
                  {member.role} • {member.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden w-24 space-y-1 text-right sm:block">
                <span className="text-xs font-bold text-slate-700">{member.workload}% load</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${member.workload > 88 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${member.workload}%` }}
                  ></div>
                </div>
              </div>
              <span
                className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${statusBadges[member.status]}`}
              >
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
