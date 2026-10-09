"use client";

import React from "react";
import { Calendar, CheckCircle2, MessageSquare, PhoneCall } from "lucide-react";

interface SalesActionableIntelligenceProps {
  metrics: {
    upcomingTasks: any[];
    recentActivities: any[];
  } | null;
}

export function SalesActionableIntelligence({ metrics }: SalesActionableIntelligenceProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Upcoming Tasks */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Calendar className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Upcoming Follow-ups</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
            Next 7 Days
          </span>
        </div>
        <div className="space-y-3">
          {metrics?.upcomingTasks && metrics.upcomingTasks.length > 0 ? (
            metrics.upcomingTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3 transition hover:bg-slate-50"
              >
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300"></div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{task.title}</p>
                  <p className="text-[10px] font-semibold text-slate-400">
                    {task.companyName} • {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-slate-400">
              <CheckCircle2 className="mb-2 h-8 w-8 opacity-20" />
              <p className="text-xs font-semibold">No upcoming tasks. You are all caught up!</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <MessageSquare className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Recent Communications</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
            Live
          </span>
        </div>
        <div className="space-y-3">
          {metrics?.recentActivities && metrics.recentActivities.length > 0 ? (
            metrics.recentActivities.map((act, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3 transition hover:bg-slate-50"
              >
                <div className="mt-0.5 shrink-0 text-slate-400">
                  {act.type === "Call" ? (
                    <PhoneCall className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{act.content}</p>
                  <p className="text-[10px] font-semibold text-slate-400">
                    {act.leadId?.companyName || "Unknown"} •{" "}
                    {new Date(act.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-slate-400">
              <MessageSquare className="mb-2 h-8 w-8 opacity-20" />
              <p className="text-xs font-semibold">No recent activity logged yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
