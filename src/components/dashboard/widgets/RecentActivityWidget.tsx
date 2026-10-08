"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { FileCheck, CreditCard, CheckCircle2, UserPlus } from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  category: "Sales" | "Pre-Sales" | "Delivery" | "Finance";
  entityName: string;
  timeAgo: string;
  actor: string;
  icon: any;
  dotColor: string;
}

export function RecentActivityWidget() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      title: "Lead converted to active deal",
      category: "Sales",
      entityName: "The Green Naturals",
      timeAgo: "10 mins ago",
      actor: "Akash M.",
      icon: UserPlus,
      dotColor: "bg-emerald-500",
    },
    {
      id: "2",
      title: "Proposal approved & signed",
      category: "Pre-Sales",
      entityName: "Visual Bridge Foundation",
      timeAgo: "45 mins ago",
      actor: "Priya S.",
      icon: FileCheck,
      dotColor: "bg-indigo-500",
    },
    {
      id: "3",
      title: "Milestone #2 completed & verified",
      category: "Delivery",
      entityName: "Aishwarya Arts",
      timeAgo: "2 hours ago",
      actor: "Karthik R.",
      icon: CheckCircle2,
      dotColor: "bg-purple-500",
    },
    {
      id: "4",
      title: "Payment received ₹45,000 via Bank Transfer",
      category: "Finance",
      entityName: "Annai Agro Traders",
      timeAgo: "4 hours ago",
      actor: "Finance Bot",
      icon: CreditCard,
      dotColor: "bg-blue-500",
    },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Recent Activity Feed"
        subtitle="Real-time enterprise audit trail of deals, payments, and system events"
        badge="Live Audit"
        badgeVariant="indigo"
      />

      <div className="space-y-3.5">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 transition hover:bg-white hover:shadow-2xs"
          >
            <div className="flex items-start gap-3.5">
              <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${act.dotColor}`}></span>
              <div>
                <p className="text-xs font-bold text-slate-900 sm:text-sm">{act.title}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">
                  <span className="font-extrabold text-slate-800">{act.entityName}</span> • by{" "}
                  {act.actor}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-xs font-bold text-slate-400">{act.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
