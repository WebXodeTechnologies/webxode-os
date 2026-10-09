"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { Users, Clock, Plus, ShieldAlert, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  currentProject: string;
  allocationPercent: number;
  status: "Optimal" | "Overloaded" | "Available";
  avatarBg: string;
}

export function ResourceAllocationWidget() {
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Akash S M",
      role: "Lead Full-Stack / DevOps",
      currentProject: "Webxode OS & Infrastructure",
      allocationPercent: 90,
      status: "Optimal",
      avatarBg: "bg-indigo-600",
    },
    {
      id: "2",
      name: "Sanjay Kumar",
      role: "Frontend Developer",
      currentProject: "Annai Agro B2B Portal",
      allocationPercent: 100,
      status: "Overloaded",
      avatarBg: "bg-blue-600",
    },
    {
      id: "3",
      name: "Priya Sundar",
      role: "UI/UX & Frontend",
      currentProject: "Aishwarya Arts E-commerce",
      allocationPercent: 75,
      status: "Optimal",
      avatarBg: "bg-purple-600",
    },
    {
      id: "4",
      name: "Karthik R",
      role: "Backend & Cloud Engineer",
      currentProject: "Visual Bridge Foundation",
      allocationPercent: 40,
      status: "Available",
      avatarBg: "bg-emerald-600",
    },
  ]);

  const statusStyles = {
    Optimal: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Overloaded: "bg-rose-50 text-rose-700 border-rose-200",
    Available: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Team Resource & Capacity Matrix"
        subtitle="Internal developer bandwidth, project allocation, and workload distribution"
        badge="4 Active Engineers"
        badgeVariant="indigo"
        actions={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Assign Role</span>
          </button>
        }
      />

      <div className="space-y-3">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            whileHover={{ y: -2 }}
            className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:bg-white hover:shadow-sm"
          >
            {/* Top Row: Avatar, Name, Role, and Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl font-black text-white shadow-xs ${member.avatarBg}`}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 sm:text-sm">{member.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-500">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${statusStyles[member.status]}`}
                >
                  {member.status}
                </span>
              </div>
            </div>

            {/* Current Project & Bandwidth Bar */}
            <div className="mt-3.5 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="font-semibold text-slate-600">
                  Project: <strong className="text-slate-900">{member.currentProject}</strong>
                </span>
                <span
                  className={`font-extrabold ${member.allocationPercent > 90 ? "text-rose-600" : "text-indigo-600"}`}
                >
                  {member.allocationPercent}% Capacity
                </span>
              </div>

              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${member.allocationPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    member.allocationPercent > 90
                      ? "bg-rose-500"
                      : member.allocationPercent > 70
                        ? "bg-indigo-600"
                        : "bg-emerald-500"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </WidgetCard>
  );
}
