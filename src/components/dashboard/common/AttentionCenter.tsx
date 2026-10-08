"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Clock,
  DollarSign,
  FileText,
  Briefcase,
} from "lucide-react";

interface AttentionItem {
  id: string;
  title: string;
  category: "tasks" | "finance" | "presales" | "delivery" | "client";
  severity: "high" | "medium";
  count?: string | number;
  timeAgo: string;
  actionText: string;
  link?: string;
}

export function AttentionCenter() {
  const [items, setItems] = useState<AttentionItem[]>([
    {
      id: "1",
      title: "Production Build Failing: Webxode v2.0",
      category: "delivery",
      severity: "high",
      count: "3 CI Errors",
      timeAgo: "15m ago",
      actionText: "Check Logs",
    },
    {
      id: "2",
      title: "SOW Sign-off Pending: Annai E-commerce",
      category: "presales",
      severity: "medium",
      count: "₹12.5L",
      timeAgo: "Pending 2d",
      actionText: "Follow-up",
    },
    {
      id: "3",
      title: "UAT Feedback Overdue: Visual Bridge",
      category: "client",
      severity: "high",
      count: "Sprint 4",
      timeAgo: "Due Yesterday",
      actionText: "Escalate",
    },
    {
      id: "4",
      title: "2 Senior React Devs Unassigned Next Week",
      category: "tasks",
      severity: "medium",
      count: "80hrs/wk",
      timeAgo: "Resource Gap",
      actionText: "Assign",
    },
    {
      id: "5",
      title: "Retainer Renewal: Aishwarya Arts (SEO & DevOps)",
      category: "finance",
      severity: "high",
      count: "₹2.4L/mo",
      timeAgo: "Expires in 3d",
      actionText: "Invoice",
    },
  ]);

  const handleResolve = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-between rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 sm:h-12 sm:w-12">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900 sm:text-base">
              All clear! No urgent items need your attention.
            </h4>
            <p className="text-xs font-semibold text-emerald-700/90 sm:text-sm">
              Everything across sales, projects, and finance is operating smoothly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const categoryIcons = {
    delivery: Briefcase,
    presales: FileText,
    finance: DollarSign,
    tasks: Clock,
    client: AlertTriangle,
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-amber-200/90 bg-linear-to-r from-amber-50/80 via-amber-50/30 to-white p-5 shadow-xs sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-800">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-wider text-amber-900 uppercase sm:text-base">
              Needs Attention Center
            </h3>
            <p className="text-xs font-semibold text-amber-800/80 sm:text-sm">
              {items.length} actionable item{items.length > 1 ? "s" : ""} require your decision
            </p>
          </div>
        </div>

        <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
          Priority Alerts
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((item) => {
          const Icon = categoryIcons[item.category] || AlertTriangle;
          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-all duration-150 hover:border-slate-300 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-slate-500 uppercase">
                    <Icon className="h-4 w-4 text-amber-600" />
                    {item.category}
                  </span>
                  <span className="font-semibold text-slate-400">{item.timeAgo}</span>
                </div>
                <h4 className="mt-2.5 line-clamp-2 text-xs font-bold tracking-tight text-slate-800 sm:text-sm">
                  {item.title}
                </h4>
              </div>

              <div className="mt-4 flex items-center justify-between gap-1 border-t border-slate-100 pt-3 text-xs">
                <span className="font-extrabold text-slate-900">{item.count}</span>
                <button
                  type="button"
                  onClick={() => handleResolve(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white transition hover:bg-indigo-600 active:scale-95"
                >
                  {item.actionText}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
