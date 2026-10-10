"use client";

import React, { useState } from "react";
import {
  Building2,
  User,
  Search,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

export interface ClientReportData {
  id: string;
  contactName: string;
  company: string;
  dealValue: string;
  stage: string;
  touchpointsCount: number;
  lastInteraction: string;
  assignedRep: string;
  health: "Warm / Engaged" | "Needs Follow-up" | "Risk of Churn";
}

interface ClientReportsBreakdownProps {
  clients: ClientReportData[];
  onExportClientReport: (client: ClientReportData) => void;
}

export function ClientReportsBreakdown({
  clients,
  onExportClientReport,
}: ClientReportsBreakdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [healthFilter, setHealthFilter] = useState("All");

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.assignedRep.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesHealth = healthFilter === "All" || c.health === healthFilter;

    return matchesSearch && matchesHealth;
  });

  const getHealthBadge = (health: ClientReportData["health"]) => {
    switch (health) {
      case "Warm / Engaged":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Warm / Engaged
          </span>
        );
      case "Needs Follow-up":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
            <Clock className="h-3 w-3 text-amber-600" /> Needs Follow-up
          </span>
        );
      case "Risk of Churn":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-800">
            <AlertCircle className="h-3 w-3 text-rose-600" /> Risk of Churn
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Search Controls */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-black text-slate-900">Client Engagement Reports</h2>
          <p className="text-xs font-semibold text-slate-500">
            Track account activity, interaction history & lead health status
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-55">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search client reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 pr-3 pl-9 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-600"
            />
          </div>

          {/* Health Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/70 p-1">
            {["All", "Warm / Engaged", "Needs Follow-up", "Risk of Churn"].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHealthFilter(h)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  healthFilter === h
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Client Reports Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-black tracking-wider text-slate-500 uppercase">
                <th className="py-3.5 pr-3 pl-6">Client & Company</th>
                <th className="px-3 py-3.5">Deal Value</th>
                <th className="px-3 py-3.5">Pipeline Stage</th>
                <th className="px-3 py-3.5">Touchpoints</th>
                <th className="px-3 py-3.5">Last Interaction</th>
                <th className="px-3 py-3.5">Assigned Rep</th>
                <th className="px-3 py-3.5">Account Health</th>
                <th className="py-3.5 pr-6 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredClients.map((client) => (
                <tr key={client.id} className="group transition-all hover:bg-slate-50/80">
                  {/* Client & Company */}
                  <td className="py-4 pr-3 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-slate-800 to-indigo-900 text-xs font-black text-white shadow-2xs">
                        {client.contactName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <Link
                          href={`/dashboard/sales/leads/${client.id}`}
                          className="flex items-center gap-1 font-bold text-slate-900 group-hover:text-indigo-600"
                        >
                          {client.contactName}
                          <ArrowUpRight className="h-3 w-3 text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Building2 className="h-3 w-3" />
                          {client.company}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Deal Value */}
                  <td className="px-3 py-4 font-extrabold text-slate-900">{client.dealValue}</td>

                  {/* Pipeline Stage */}
                  <td className="px-3 py-4">
                    <span className="inline-flex rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      {client.stage}
                    </span>
                  </td>

                  {/* Touchpoints */}
                  <td className="px-3 py-4 font-bold text-indigo-600">
                    {client.touchpointsCount} Touchpoints
                  </td>

                  {/* Last Interaction */}
                  <td className="px-3 py-4 text-slate-500">{client.lastInteraction}</td>

                  {/* Assigned Rep */}
                  <td className="px-3 py-4 text-slate-700">{client.assignedRep}</td>

                  {/* Health Badge */}
                  <td className="px-3 py-4">{getHealthBadge(client.health)}</td>

                  {/* Actions */}
                  <td className="py-4 pr-6 pl-3 text-right">
                    <button
                      type="button"
                      onClick={() => onExportClientReport(client)}
                      className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-100"
                    >
                      Export Client PDF
                    </button>
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
