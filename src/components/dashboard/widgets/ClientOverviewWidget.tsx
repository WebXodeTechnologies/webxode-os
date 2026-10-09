"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { Users, UserPlus, AlertTriangle, Clock, Plus, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ClientCategoryMetric {
  label: string;
  count: number;
  badge: string;
  badgeStyle: string;
  description: string;
  icon: any;
  cardBorder: string;
  cardBg: string;
  textColor: string;
  isAttention?: boolean;
}

export function ClientOverviewWidget() {
  const metrics: ClientCategoryMetric[] = [
    {
      label: "Active Accounts",
      count: 42,
      badge: "Stable",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Monthly recurring active clients",
      icon: Users,
      cardBorder: "border-emerald-200/80 hover:border-emerald-300",
      cardBg: "bg-linear-to-b from-emerald-50/40 to-white",
      textColor: "text-emerald-950",
    },
    {
      label: "New Onboarded",
      count: 6,
      badge: "This Month",
      badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Successfully closed & active",
      icon: UserPlus,
      cardBorder: "border-blue-200/80 hover:border-blue-300",
      cardBg: "bg-linear-to-b from-blue-50/40 to-white",
      textColor: "text-blue-950",
    },
    {
      label: "At Risk Accounts",
      count: 3,
      badge: "Needs Review",
      badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
      description: "Low engagement or delayed payment",
      icon: AlertTriangle,
      cardBorder: "border-rose-200/80 hover:border-rose-300",
      cardBg: "bg-linear-to-b from-rose-50/40 to-white",
      textColor: "text-rose-950",
      isAttention: true,
    },
    {
      label: "Pending Renewal",
      count: 4,
      badge: "Next 30 Days",
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Contract up for annual renewal",
      icon: Clock,
      cardBorder: "border-amber-200/80 hover:border-amber-300",
      cardBg: "bg-linear-to-b from-amber-50/40 to-white",
      textColor: "text-amber-950",
    },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Client Lifecycle Overview"
        subtitle="Account health, new client growth, and renewal opportunities"
        badge="42 Active Clients"
        badgeVariant="success"
        actions={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Client</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group flex flex-col justify-between rounded-2xl border p-4 shadow-2xs transition-all ${item.cardBorder} ${item.cardBg}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 sm:text-sm">
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase ${item.badgeStyle}`}
                  >
                    {item.isAttention && (
                      <span className="mr-1 inline-block h-1.5 w-1.5 animate-ping rounded-full bg-rose-500" />
                    )}
                    {item.badge}
                  </span>
                </div>
                <p className="mt-2 line-clamp-1 text-xs font-semibold text-slate-500">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-slate-100/80 pt-3">
                <span className={`text-3xl font-black tracking-tight ${item.textColor}`}>
                  {item.count}
                </span>
                <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
                  Accounts
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </WidgetCard>
  );
}
