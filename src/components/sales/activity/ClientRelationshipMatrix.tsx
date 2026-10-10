"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, User, Calendar } from "lucide-react";

interface ClientAccount {
  id: string;
  companyName: string;
  contactPerson: string;
  salesPerson: string;
  stage: string;
  dealValue: number;
  lastActivityDate: string;
  sentiment: "Positive" | "Neutral" | "Needs Attention";
  healthScore: number;
}

const WEBXODE_CLIENT_ACCOUNTS: ClientAccount[] = [
  {
    id: "LEAD-1002",
    companyName: "Stark Industries",
    contactPerson: "Tony Stark",
    salesPerson: "Marcus Vance",
    stage: "Proposal",
    dealValue: 4500000,
    lastActivityDate: "Today, 11:30 AM",
    sentiment: "Positive",
    healthScore: 96,
  },
  {
    id: "LEAD-1001",
    companyName: "Acme Corp Enterprise",
    contactPerson: "Jane Smith",
    salesPerson: "Alex Morgan",
    stage: "Qualified",
    dealValue: 1250000,
    lastActivityDate: "Today, 01:15 PM",
    sentiment: "Positive",
    healthScore: 92,
  },
  {
    id: "LEAD-1003",
    companyName: "Wayne Enterprises",
    contactPerson: "Bruce Wayne",
    salesPerson: "Sarah Jenkins",
    stage: "Enquiry",
    dealValue: 800000,
    lastActivityDate: "Today, 02:45 PM",
    sentiment: "Positive",
    healthScore: 88,
  },
  {
    id: "LEAD-1004",
    companyName: "Ollivanders Wands",
    contactPerson: "Garrick Ollivander",
    salesPerson: "David Chen",
    stage: "Won",
    dealValue: 320000,
    lastActivityDate: "Today, 04:00 PM",
    sentiment: "Positive",
    healthScore: 98,
  },
  {
    id: "LEAD-1005",
    companyName: "Los Pollos Hermanos",
    contactPerson: "Gustavo Fring",
    salesPerson: "Alex Morgan",
    stage: "Lost/Dead",
    dealValue: 0,
    lastActivityDate: "Yesterday, 05:20 PM",
    sentiment: "Needs Attention",
    healthScore: 45,
  },
];

interface ClientRelationshipMatrixProps {
  selectedRep: string;
}

export function ClientRelationshipMatrix({ selectedRep }: ClientRelationshipMatrixProps) {
  const filtered =
    selectedRep === "all"
      ? WEBXODE_CLIENT_ACCOUNTS
      : WEBXODE_CLIENT_ACCOUNTS.filter(
          (c) => c.salesPerson === selectedRep || c.id === selectedRep
        );

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              Pipeline Lead Health Matrix
            </h2>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-black text-emerald-700">
              {filtered.length} Active Accounts
            </span>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">
            Account relationship health scores and recent activity dates across WebXode OS pipeline.
          </p>
        </div>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {filtered.map((rel, idx) => (
          <motion.div
            key={rel.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            className="group flex flex-col justify-between gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-slate-50/60 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-sm font-black text-indigo-600">
                {rel.companyName.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900 transition-colors group-hover:text-indigo-600">
                    {rel.companyName}
                  </h3>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-bold text-slate-600">{rel.contactPerson}</span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    Rep: {rel.salesPerson}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Last Contact: {rel.lastActivityDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1.5 text-xs font-extrabold text-slate-500">
                  <span>Health Index</span>
                  <span
                    className={`font-black ${
                      rel.healthScore >= 90
                        ? "text-emerald-600"
                        : rel.healthScore >= 75
                          ? "text-indigo-600"
                          : "text-amber-600"
                    }`}
                  >
                    {rel.healthScore}/100
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
                  <div
                    style={{ width: `${rel.healthScore}%` }}
                    className={`h-full rounded-full ${
                      rel.healthScore >= 90
                        ? "bg-emerald-500"
                        : rel.healthScore >= 75
                          ? "bg-indigo-500"
                          : "bg-amber-500"
                    }`}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-right shadow-2xs">
                <div className="text-[10px] font-extrabold text-slate-400">
                  {rel.stage.toUpperCase()}
                </div>
                <div className="text-xs font-black text-slate-900">
                  {rel.dealValue > 0 ? `₹${rel.dealValue.toLocaleString("en-IN")}` : "₹0"}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
