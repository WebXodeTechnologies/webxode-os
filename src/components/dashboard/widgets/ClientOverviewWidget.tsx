"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";

interface ClientCategoryMetric {
  label: string;
  count: number;
  badge: string;
  badgeStyle: string;
  description: string;
}

export function ClientOverviewWidget() {
  const metrics: ClientCategoryMetric[] = [
    {
      label: "Active Accounts",
      count: 42,
      badge: "Stable",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Monthly recurring active clients",
    },
    {
      label: "New Onboarded",
      count: 6,
      badge: "This Month",
      badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Successfully closed & active",
    },
    {
      label: "At Risk Accounts",
      count: 3,
      badge: "Needs Review",
      badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
      description: "Low engagement or delayed payment",
    },
    {
      label: "Pending Renewal",
      count: 4,
      badge: "Next 30 Days",
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Contract up for annual renewal",
    },
  ];

  return (
    <WidgetCard>
      <WidgetHeader
        title="Client Lifecycle Overview"
        subtitle="Account health, new client growth, and renewal opportunities"
        badge="42 Active Clients"
        badgeVariant="success"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-150 hover:border-slate-200 hover:bg-white hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 sm:text-sm">
                  {item.label}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs font-bold ${item.badgeStyle}`}
                >
                  {item.badge}
                </span>
              </div>
              <p className="mt-1 line-clamp-1 text-xs font-medium text-slate-500">
                {item.description}
              </p>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-3">
              <span className="text-3xl font-black tracking-tight text-slate-900">
                {item.count}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase">Accounts</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
