"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  X,
  UserPlus,
  Briefcase,
  FileText,
  DollarSign,
} from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  role?: string;
  onOpenSearch?: () => void;
  onQuickCreate?: () => void;
}

export function DashboardHeader({
  userName = "Akash",
  role = "ADMIN",
  onOpenSearch,
  onQuickCreate,
}: DashboardHeaderProps) {
  const [showQuickCreateModal, setShowQuickCreateModal] = useState(false);

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const notificationsList = [
    { id: "1", title: "New lead assigned: TechCorp Solutions", time: "5m ago", unread: true },
    { id: "2", title: "Quotation #482 approved by client", time: "1h ago", unread: true },
    { id: "3", title: "Payment ₹45,000 received from Annai Agro", time: "3h ago", unread: false },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-slate-200/90 pb-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Greeting & Date */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {greeting}, {userName} 👋
            </h1>
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-extrabold tracking-wider text-indigo-700 uppercase">
              {role}
            </span>
          </div>
          <p className="mt-1.5 text-xs font-semibold text-slate-500 sm:text-sm">
            Here&apos;s what needs your attention today • {currentDate}
          </p>
        </div>

        {/* Right: Search, + Quick Create, Notifications, Profile */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Global Search Trigger */}

          {/* Quick Create Action Button */}
          <button
            type="button"
            onClick={() => {
              if (onQuickCreate) onQuickCreate();
              else setShowQuickCreateModal(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-98 sm:text-sm"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Quick Create</span>
          </button>
        </div>
      </div>

      {/* Quick Create Action Modal */}
      {showQuickCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="animate-in fade-in zoom-in-95 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  Quick Create Action
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickCreateModal(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setShowQuickCreateModal(false)}
                className="flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <UserPlus className="h-6 w-6 text-indigo-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">New Lead</h4>
                  <p className="text-xs text-slate-500">Capture sales inquiry</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setShowQuickCreateModal(false)}
                className="flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <Briefcase className="h-6 w-6 text-emerald-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">New Project</h4>
                  <p className="text-xs text-slate-500">Start client deliverable</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setShowQuickCreateModal(false)}
                className="flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <FileText className="h-6 w-6 text-violet-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Quotation</h4>
                  <p className="text-xs text-slate-500">Generate pricing proposal</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setShowQuickCreateModal(false)}
                className="flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <DollarSign className="h-6 w-6 text-teal-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Invoice</h4>
                  <p className="text-xs text-slate-500">Log payment request</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
