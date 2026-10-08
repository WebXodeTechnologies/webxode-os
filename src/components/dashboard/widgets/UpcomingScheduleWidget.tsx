"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  clientOrTeam: string;
  type: "Meeting" | "Internal" | "Design" | "Sales";
  badgeStyle: string;
}

export function UpcomingScheduleWidget() {
  const schedule: ScheduleItem[] = [
    {
      id: "1",
      time: "10:00 AM",
      title: "Client Discovery Call",
      clientOrTeam: "The Green Naturals",
      type: "Meeting",
      badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "2",
      time: "11:30 AM",
      title: "Engineering Sprint Sync",
      clientOrTeam: "Sales + Engineering",
      type: "Internal",
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "3",
      time: "02:00 PM",
      title: "UI Design & Feedback Review",
      clientOrTeam: "Aishwarya Arts",
      type: "Design",
      badgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      id: "4",
      time: "04:30 PM",
      title: "Follow-up: Annai Agro Quotation",
      clientOrTeam: "Annai Agro Traders",
      type: "Sales",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Upcoming Schedule"
        subtitle="Scheduled client calls, internal syncs, and review milestones"
        badge="4 Events Today"
        badgeVariant="indigo"
      />

      <div className="space-y-3">
        {schedule.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:border-slate-200 hover:bg-white hover:shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <span className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs font-black text-slate-800 shadow-2xs">
                {item.time}
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 sm:text-sm">{item.title}</h4>
                <p className="text-xs font-semibold text-slate-400">{item.clientOrTeam}</p>
              </div>
            </div>

            <span className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${item.badgeStyle}`}>
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
