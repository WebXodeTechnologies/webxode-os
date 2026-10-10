"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Plus,
  Send,
  FileCheck,
  CheckCircle2,
  IndianRupee,
  Clock,
  ArrowRight,
  X,
  FileText,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientEstimatesTabProps {
  lead?: any;
}

export function ClientEstimatesTab({ lead }: ClientEstimatesTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [estimates, setEstimates] = useState([
    {
      id: "EST-2026-031",
      title: "Phase 1: Custom Agriculture & Distribution ERP Platform",
      status: "Approved",
      estimatedCost: 450000,
      estimatedHours: 320,
      validUntil: "31 Oct 2026",
      scopeItems: [
        { feature: "Multi-tenant inventory & GST Billing Module", hours: 120, cost: 180000 },
        { feature: "Mobile Responsive Farmer Dashboard UI", hours: 80, cost: 120000 },
        { feature: "AWS Cloud Infrastructure & Payment Gateway", hours: 60, cost: 90000 },
        { feature: "QA Automation & UAT Onboarding Support", hours: 60, cost: 60000 },
      ],
    },
    {
      id: "EST-2026-042",
      title: "Phase 2: Android Native App & Field Agent Call Tracker",
      status: "Sent to Client",
      estimatedCost: 320000,
      estimatedHours: 240,
      validUntil: "15 Nov 2026",
      scopeItems: [
        { feature: "Offline-first Mobile Data Sync Engine", hours: 100, cost: 140000 },
        { feature: "GPS Location Tracking & Push Notifications", hours: 80, cost: 110000 },
        { feature: "Play Store & App Store Deployment", hours: 60, cost: 70000 },
      ],
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEst, setNewEst] = useState({ title: "", cost: "250000", hours: "180" });

  const handleSendEstimate = (id: string) => {
    toast.success("Estimate Dispatched", {
      description: `Scope estimation ${id} sent to ${lead?.email || "client"}.`,
    });
  };

  const handleConvertToProposal = (id: string) => {
    setEstimates((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Converted" } : e))
    );
    toast.success("Converted to Proposal", {
      description: `Estimate ${id} successfully converted to formal SOW Proposal document.`,
    });
  };

  const handleCreateEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEst.title.trim()) return;

    const costVal = parseFloat(newEst.cost) || 250000;
    const added = {
      id: `EST-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newEst.title,
      status: "Sent to Client",
      estimatedCost: costVal,
      estimatedHours: parseInt(newEst.hours, 10) || 150,
      validUntil: "30 Nov 2026",
      scopeItems: [
        { feature: "Initial discovery & technical blueprint", hours: 60, cost: costVal * 0.4 },
        { feature: "Core module development & delivery", hours: 90, cost: costVal * 0.6 },
      ],
    };

    setEstimates((prev) => [added, ...prev]);
    setShowCreateModal(false);
    setNewEst({ title: "", cost: "250000", hours: "180" });
    toast.success("Estimate Created", {
      description: `Estimate ${added.id} for ₹${costVal.toLocaleString("en-IN")} saved.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Header */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-600 shadow-2xs">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Estimates & Scope Pipeline</h2>
              <p className="text-xs font-semibold text-slate-500">
                Project scoping, hourly estimates & cost quotes for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" /> Create Estimate Scope
          </button>
        </div>
      </div>

      {/* Estimates Scope Breakdown Cards */}
      <div className="space-y-6">
        {estimates.map((est) => (
          <div key={est.id} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-indigo-600">{est.id}</span>
                  <h3 className="text-base font-extrabold text-slate-900">{est.title}</h3>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <span>Estimated Hours: {est.estimatedHours} hrs</span>
                  <span>•</span>
                  <span>Valid Until: {est.validUntil}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    est.status === "Approved" || est.status === "Converted"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {est.status}
                </span>

                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">₹{est.estimatedCost.toLocaleString("en-IN")}</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleSendEstimate(est.id)}
                    className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
                  >
                    <Send className="h-3.5 w-3.5" /> Send
                  </button>
                  {est.status !== "Converted" && (
                    <button
                      type="button"
                      onClick={() => handleConvertToProposal(est.id)}
                      className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
                    >
                      Convert to SOW →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Itemized Features Scope Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200/80 bg-slate-100/70 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5">Scope Deliverable / Feature</th>
                    <th className="px-4 py-2.5">Est. Hours</th>
                    <th className="px-4 py-2.5 text-right">Cost (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {est.scopeItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white transition">
                      <td className="px-4 py-2.5 text-slate-900 font-bold">{item.feature}</td>
                      <td className="px-4 py-2.5 text-slate-500">{item.hours} hrs</td>
                      <td className="px-4 py-2.5 text-right font-extrabold text-slate-900">
                        ₹{item.cost.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Add Estimate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Create Estimation Scope</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateEstimateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Estimate Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phase 3: AI Integration & Predictive Analytics"
                  value={newEst.title}
                  onChange={(e) => setNewEst({ ...newEst, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Cost Quote (INR ₹)</label>
                  <input
                    type="number"
                    value={newEst.cost}
                    onChange={(e) => setNewEst({ ...newEst, cost: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Est. Hours</label>
                  <input
                    type="number"
                    value={newEst.hours}
                    onChange={(e) => setNewEst({ ...newEst, hours: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Save Estimate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
