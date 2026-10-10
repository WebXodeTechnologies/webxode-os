"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Calendar,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Building2,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Edit,
  Trash2,
  Check,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";

export interface FollowUpItem {
  id: string;
  leadId: string;
  contactName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  taskType: "Call" | "Email" | "Demo Meeting" | "SOW Review" | "Contract Signature";
  dueDate: string;
  dueRawDate: string; // YYYY-MM-DD
  isOverdue?: boolean;
  priority: "High" | "Medium" | "Low";
  stage:
    | "New Lead"
    | "Contacted"
    | "Discovery Call"
    | "Proposal Sent"
    | "Contract Negotiation"
    | "Closed Won";
  status: "Pending" | "Completed" | "Overdue";
  assignedRep: string;
  dealValue: string;
  notes?: string;
}

interface FollowUpsTableProps {
  followups: FollowUpItem[];
  onToggleStatus: (id: string) => void;
  onInitiateCall: (item: FollowUpItem) => void;
  onComposeEmail: (item: FollowUpItem) => void;
  onUpdateStage: (item: FollowUpItem) => void;
  onDeleteFollowUp: (id: string) => void;
  onStageChangeInline: (id: string, newStage: FollowUpItem["stage"]) => void;
}

export function FollowUpsTable({
  followups,
  onToggleStatus,
  onInitiateCall,
  onComposeEmail,
  onUpdateStage,
  onDeleteFollowUp,
  onStageChangeInline,
}: FollowUpsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter items based on search and filters
  const filteredFollowUps = followups.filter((item) => {
    const matchesSearch =
      item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "All" || item.taskType === typeFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Pending" && item.status === "Pending") ||
      (statusFilter === "Overdue" && item.status === "Overdue") ||
      (statusFilter === "Completed" && item.status === "Completed");

    return matchesSearch && matchesType && matchesStatus;
  });

  const getTaskTypeBadge = (type: FollowUpItem["taskType"]) => {
    switch (type) {
      case "Call":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
            <PhoneCall className="h-3 w-3" /> Call
          </span>
        );
      case "Email":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700">
            <Mail className="h-3 w-3" /> Email
          </span>
        );
      case "Demo Meeting":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">
            <Calendar className="h-3 w-3" /> Demo
          </span>
        );
      case "SOW Review":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
            <Sparkles className="h-3 w-3" /> SOW Review
          </span>
        );
      case "Contract Signature":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
            <CheckCircle2 className="h-3 w-3" /> Contract
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: FollowUpItem["priority"]) => {
    switch (priority) {
      case "High":
        return (
          <span className="inline-flex items-center rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-extrabold text-rose-700">
            HIGH
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
            MEDIUM
          </span>
        );
      case "Low":
        return (
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-600">
            LOW
          </span>
        );
    }
  };

  const getStageColor = (stage: FollowUpItem["stage"]) => {
    switch (stage) {
      case "New Lead":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Discovery Call":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Proposal Sent":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Contract Negotiation":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Closed Won":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center">
        {/* Search */}
        <div className="relative min-w-65 flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search follow-ups by lead name, company, or task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-1">
            <span className="px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Type:
            </span>
            {["All", "Call", "Email", "Demo Meeting", "SOW Review"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  typeFilter === t
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-1">
            <span className="px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Status:
            </span>
            {["All", "Pending", "Overdue", "Completed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  statusFilter === st
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                <th className="py-3.5 pr-3 pl-6">Status</th>
                <th className="px-3 py-3.5">Client Lead & Company</th>
                <th className="px-3 py-3.5">Follow-up Action</th>
                <th className="px-3 py-3.5">Type</th>
                <th className="px-3 py-3.5">Due Date</th>
                <th className="px-3 py-3.5">Pipeline Stage</th>
                <th className="px-3 py-3.5">Priority</th>
                <th className="py-3.5 pr-6 pl-3 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredFollowUps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-700">No follow-ups found</p>
                    <p className="text-xs text-slate-400">
                      Try adjusting your search query or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredFollowUps.map((item) => (
                  <tr
                    key={item.id}
                    className={`group transition-all hover:bg-slate-50/80 ${
                      item.status === "Completed" ? "bg-slate-50/40 opacity-75" : ""
                    }`}
                  >
                    {/* Status Checkbox */}
                    <td className="py-4 pr-3 pl-6">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(item.id)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                          item.status === "Completed"
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white hover:border-indigo-600"
                        }`}
                      >
                        {item.status === "Completed" && <Check className="h-3.5 w-3.5 stroke-3" />}
                      </button>
                    </td>

                    {/* Client & Lead Details */}
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-slate-800 to-indigo-900 text-xs font-black text-white shadow-2xs">
                          {item.contactName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/dashboard/sales/leads/${item.leadId}`}
                            className="flex items-center gap-1 font-bold text-slate-900 hover:text-indigo-600"
                          >
                            <span className="truncate">{item.contactName}</span>
                            <ArrowUpRight className="h-3 w-3 shrink-0 text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                            <Building2 className="h-3 w-3 shrink-0 text-slate-400" />
                            <span className="truncate">{item.company}</span>
                            <span className="text-slate-300">•</span>
                            <span className="font-semibold text-emerald-700">{item.dealValue}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Follow-up Action / Title */}
                    <td className="max-w-55 px-3 py-4">
                      <div
                        className={`truncate font-semibold text-slate-800 ${
                          item.status === "Completed" ? "text-slate-400 line-through" : ""
                        }`}
                        title={item.title}
                      >
                        {item.title}
                      </div>
                      {item.notes && (
                        <div
                          className="max-w-50 truncate text-[11px] text-slate-400"
                          title={item.notes}
                        >
                          Note: {item.notes}
                        </div>
                      )}
                    </td>

                    {/* Follow-up Type Badge */}
                    <td className="shrink-0 px-3 py-4">{getTaskTypeBadge(item.taskType)}</td>

                    {/* Due Date & Overdue Tag */}
                    <td className="px-3 py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-bold ${
                            item.status === "Overdue"
                              ? "text-rose-600"
                              : item.status === "Completed"
                                ? "text-slate-400"
                                : "text-slate-700"
                          }`}
                        >
                          {item.dueDate}
                        </span>
                        {item.status === "Overdue" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-rose-600">
                            <AlertTriangle className="h-3 w-3" /> OVERDUE
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Inline Pipeline Stage Dropdown */}
                    <td className="px-3 py-4">
                      <select
                        value={item.stage}
                        onChange={(e) =>
                          onStageChangeInline(item.id, e.target.value as FollowUpItem["stage"])
                        }
                        className={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-bold transition-all outline-none ${getStageColor(
                          item.stage
                        )}`}
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Discovery Call">Discovery Call</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Contract Negotiation">Contract Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                      </select>
                    </td>

                    {/* Priority */}
                    <td className="px-3 py-4">{getPriorityBadge(item.priority)}</td>

                    {/* Quick Action Buttons & Menu */}
                    <td className="py-4 pr-6 pl-3 text-right">
                      <div className="relative inline-flex items-center gap-1.5">
                        {/* Call Quick Action */}
                        <button
                          type="button"
                          onClick={() => onInitiateCall(item)}
                          title="Call Lead"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <PhoneCall className="h-3.5 w-3.5" />
                        </button>

                        {/* Email Quick Action */}
                        <button
                          type="button"
                          onClick={() => onComposeEmail(item)}
                          title="Send Email"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </button>

                        {/* Stage Update Quick Action */}
                        <button
                          type="button"
                          onClick={() => onUpdateStage(item)}
                          title="Update Lead Stage"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                        </button>

                        {/* Options Dropdown Button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMenuId(activeMenuId === item.id ? null : item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-800"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {/* Dropdown Menu */}
                          {activeMenuId === item.id && (
                            <>
                              <div
                                className="fixed inset-0 z-30"
                                onClick={() => setActiveMenuId(null)}
                              />
                              <div className="absolute top-9 right-0 z-40 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onToggleStatus(item.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                  {item.status === "Completed" ? "Mark Pending" : "Mark Completed"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    onInitiateCall(item);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                  <PhoneCall className="h-4 w-4 text-blue-600" /> Log Call
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    onComposeEmail(item);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                  <Mail className="h-4 w-4 text-purple-600" /> Send Follow-up Mail
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    onUpdateStage(item);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                  <Sparkles className="h-4 w-4 text-amber-600" /> Advance Lead Stage
                                </button>

                                <Link
                                  href={`/dashboard/sales/leads/${item.leadId}`}
                                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                  <ExternalLink className="h-4 w-4 text-indigo-600" /> Open Lead
                                  File
                                </Link>

                                <div className="my-1 border-t border-slate-100" />

                                <button
                                  type="button"
                                  onClick={() => {
                                    onDeleteFollowUp(item.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                                >
                                  <Trash2 className="h-4 w-4" /> Delete Task
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
