"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  PhoneCall,
  Mail,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  PhoneForwarded,
  Search,
  Filter,
  ExternalLink,
  IndianRupee,
  PhoneOff,
  MessageSquare,
} from "lucide-react";
import { toast } from "@/lib/toast";

export interface CallRecord {
  id: string;
  leadId: string;
  contactName: string;
  company: string;
  phone: string;
  email: string;
  callType:
    | "Discovery Call"
    | "Demo Follow-up"
    | "SOW Negotiation"
    | "Outbound Prospecting"
    | "Closing Call";
  status: "Connected" | "Scheduled" | "Callback Required" | "No Answer" | "Left Voicemail";
  lastContacted: string;
  dealValue: number;
  assignedRep: string;
  notes?: string;
}

interface CallsTableProps {
  records: CallRecord[];
  onInitiateCall: (record: CallRecord) => void;
  onSendEmail: (record: CallRecord) => void;
  onUpdateStatus: (record: CallRecord) => void;
  onScheduleFollowup: (record: CallRecord) => void;
}

export function CallsTable({
  records,
  onInitiateCall,
  onSendEmail,
  onUpdateStatus,
  onScheduleFollowup,
}: CallsTableProps) {
  const router = useRouter();

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Close dropdown menu when clicking outside
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRecords = records.filter((r) => {
    const matchesStatus = filterStatus === "All" || r.status === filterStatus;
    const matchesType = filterType === "All" || r.callType === filterType;
    const matchesSearch =
      r.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex scrollbar-none gap-2 overflow-x-auto">
          {(["All", "Scheduled", "Connected", "Callback Required", "No Answer"] as const).map(
            (st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                  filterStatus === st
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>

        <div className="relative min-w-60">
          <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contact, company, phone..."
            className="w-full rounded-xl border border-slate-200 py-2 pr-8 pl-3 text-xs font-semibold outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Main Calls Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/90 bg-slate-50/80 text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-4">Contact & Company</th>
                <th className="px-6 py-4">Phone & Email</th>
                <th className="px-6 py-4">Call Type / Purpose</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deal Size (₹)</th>
                <th className="px-6 py-4">Assigned Rep</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-xs font-bold text-slate-400"
                  >
                    No calls found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <motion.tr
                    key={r.id}
                    whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
                    transition={{ duration: 0.15 }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-xs font-extrabold text-indigo-700">
                          {r.contactName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900">{r.contactName}</div>
                          <div className="text-[11px] text-slate-500">{r.company}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-mono text-xs font-extrabold text-slate-900">
                        {r.phone}
                      </div>
                      <div className="max-w-40 truncate text-[11px] text-slate-400">{r.email}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-extrabold text-indigo-700">
                        {r.callType}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                          r.status === "Connected"
                            ? "border border-emerald-200 bg-emerald-100 text-emerald-800"
                            : r.status === "Scheduled"
                              ? "border border-blue-200 bg-blue-100 text-blue-800"
                              : r.status === "Callback Required"
                                ? "border border-amber-200 bg-amber-100 text-amber-800"
                                : "border border-slate-200 bg-slate-100 text-slate-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-black text-slate-900">
                      ₹{r.dealValue.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      <span className="font-bold text-slate-800">{r.assignedRep}</span>
                    </td>

                    {/* Actions Menu */}
                    <td className="relative px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onInitiateCall(r)}
                          className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs transition hover:bg-indigo-700"
                          title="Call Now"
                        >
                          <PhoneForwarded className="h-3.5 w-3.5" /> Call
                        </button>

                        <button
                          type="button"
                          onClick={() => onSendEmail(r)}
                          className="flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
                          title="Send Email"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </button>

                        {/* Dropdown Menu Toggle */}
                        <button
                          type="button"
                          onClick={() => setActiveMenuId(activeMenuId === r.id ? null : r.id)}
                          className="rounded-xl border border-slate-200 bg-white p-1.5 text-slate-500 transition hover:bg-slate-100"
                          title="More actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {/* Action Menu Dropdown */}
                        {activeMenuId === r.id && (
                          <div
                            ref={menuRef}
                            className="absolute top-12 right-6 z-50 w-52 rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-xl backdrop-blur-md"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onInitiateCall(r);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <PhoneForwarded className="h-4 w-4 text-indigo-600" />
                              <span>Initiate Call Now</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onSendEmail(r);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <Mail className="h-4 w-4 text-blue-600" />
                              <span>Send Sales Email</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onUpdateStatus(r);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span>Update Call Outcome</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onScheduleFollowup(r);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <Clock className="h-4 w-4 text-amber-600" />
                              <span>Schedule Callback</span>
                            </button>

                            <div className="my-1 border-t border-slate-100" />

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                router.push(`/dashboard/sales/leads/${r.leadId}`);
                              }}
                              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-extrabold text-indigo-600 transition hover:bg-indigo-50"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View Lead Profile →</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
