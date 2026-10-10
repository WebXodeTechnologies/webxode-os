"use client";

import React from "react";
import {
  Award,
  PhoneCall,
  Mail,
  TrendingUp,
  DollarSign,
  UserCheck,
  Flame,
  Zap,
  CheckCircle2,
  Building2,
  ChevronRight,
} from "lucide-react";

export interface SalesRepMetric {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  assignedLeads: number;
  dealsClosed: number;
  closedRevenue: string; // e.g. "₹6,80,000"
  callsLogged: number;
  emailsLogged: number;
  winRate: string; // e.g. "41.2%"
  topService: string; // e.g. "Full Stack Web & SaaS"
  performanceTag: "Top Performer" | "High Performer" | "On Track";
}

interface SalesRepsPerformanceTableProps {
  reps: SalesRepMetric[];
  onSelectRep: (name: string) => void;
}

export function SalesRepsPerformanceTable({ reps, onSelectRep }: SalesRepsPerformanceTableProps) {
  const getPerformanceBadge = (tag: SalesRepMetric["performanceTag"]) => {
    switch (tag) {
      case "Top Performer":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-800">
            <Flame className="h-3 w-3 fill-amber-500 text-amber-500" /> Top Performer
          </span>
        );
      case "High Performer":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-extrabold text-indigo-700">
            <Zap className="h-3 w-3 text-indigo-600" /> High Performer
          </span>
        );
      case "On Track":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-800">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> On Track
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900">Sales Representatives Leaderboard</h2>
          <p className="text-xs font-semibold text-slate-500">
            Monitor representative performance, closed revenue & activity metrics
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-black tracking-wider text-slate-500 uppercase">
                <th className="py-3.5 pr-3 pl-6">Sales Representative</th>
                <th className="px-3 py-3.5">Assigned Leads</th>
                <th className="px-3 py-3.5">Deals Won</th>
                <th className="px-3 py-3.5">Closed Revenue</th>
                <th className="px-3 py-3.5">Touchpoints Logged</th>
                <th className="px-3 py-3.5">Win Rate</th>
                <th className="px-3 py-3.5">Top Service</th>
                <th className="py-3.5 pr-6 pl-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {reps.map((rep) => (
                <tr
                  key={rep.id}
                  onClick={() => onSelectRep(rep.name)}
                  className="group cursor-pointer transition-all hover:bg-slate-50/80"
                >
                  {/* Representative Info */}
                  <td className="py-4 pr-3 pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${rep.avatarBg} text-xs font-black text-white shadow-2xs`}
                      >
                        {rep.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                          {rep.name}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-400">{rep.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Assigned Leads */}
                  <td className="px-3 py-4 text-slate-700">{rep.assignedLeads} Leads</td>

                  {/* Deals Won */}
                  <td className="px-3 py-4 font-extrabold text-slate-900">{rep.dealsClosed} Won</td>

                  {/* Closed Revenue */}
                  <td className="px-3 py-4 text-sm font-black text-emerald-700">
                    {rep.closedRevenue}
                  </td>

                  {/* Touchpoints Logged */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="h-3 w-3 text-blue-600" /> {rep.callsLogged}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-purple-600" /> {rep.emailsLogged}
                      </span>
                    </div>
                  </td>

                  {/* Win Rate */}
                  <td className="px-3 py-4 font-extrabold text-indigo-700">{rep.winRate}</td>

                  {/* Top Service */}
                  <td className="px-3 py-4 text-slate-600">{rep.topService}</td>

                  {/* Status Badge */}
                  <td className="py-4 pr-6 pl-3 text-right">
                    {getPerformanceBadge(rep.performanceTag)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
