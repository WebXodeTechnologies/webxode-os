"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PackageCheck,
  Plus,
  MessageSquare,
  CheckCircle2,
  Clock,
  Send,
  Building2,
  Share2,
  X,
  FileCheck2,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientOrdersTabProps {
  lead?: any;
}

export function ClientOrdersTab({ lead }: ClientOrdersTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [orders, setOrders] = useState([
    {
      id: "ORD-501",
      title: "Enterprise Custom ERP & Supply Chain System",
      packageType: "Full Web Application",
      status: "Service Completed",
      completionPercentage: 100,
      deliveryDate: "02 Oct 2026",
      value: 450000,
      updates: [
        { id: "u1", author: "Akash S M", text: "Final UAT sign-off completed by client CEO.", date: "02 Oct 2026" },
        { id: "u2", author: "Priya R", text: "Deployed production build on AWS EC2 & RDS.", date: "28 Sep 2026" },
      ],
    },
    {
      id: "ORD-502",
      title: "Mobile App Development & Play Store Onboarding",
      packageType: "iOS & Android Package",
      status: "In Progress",
      completionPercentage: 65,
      deliveryDate: "15 Nov 2026",
      value: 320000,
      updates: [
        { id: "u3", author: "Vikram Mehta", text: "React Native UI build completed. Testing API endpoints.", date: "08 Oct 2026" },
      ],
    },
  ]);

  const [activeUpdateOrderId, setActiveUpdateOrderId] = useState<string | null>(null);
  const [newUpdateText, setNewUpdateText] = useState("");

  const handlePostUpdateSubmit = (e: React.FormEvent, orderId: string) => {
    e.preventDefault();
    if (!newUpdateText.trim()) return;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const newUpd = {
            id: `u_${Date.now()}`,
            author: "Sales & Dev Team",
            text: newUpdateText,
            date: "Just now",
          };
          return { ...ord, updates: [newUpd, ...ord.updates] };
        }
        return ord;
      })
    );

    setActiveUpdateOrderId(null);
    setNewUpdateText("");
    toast.success("Progress Update Posted", {
      description: `Service update added to order ${orderId}.`,
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
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-2xs">
              <PackageCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Completed Orders & Deliverables</h2>
              <p className="text-xs font-semibold text-slate-500">
                Active service orders & milestone post-updates for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((ord) => (
          <div key={ord.id} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-indigo-600">{ord.id}</span>
                  <h3 className="text-base font-extrabold text-slate-900">{ord.title}</h3>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <span>Package: {ord.packageType}</span>
                  <span>•</span>
                  <span>Delivered / Target: {ord.deliveryDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    ord.status === "Service Completed"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {ord.status}
                </span>
                <span className="font-black text-slate-900 text-sm">₹{ord.value.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Milestone Progress</span>
                <span>{ord.completionPercentage}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  style={{ width: `${ord.completionPercentage}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    ord.completionPercentage === 100 ? "bg-emerald-500" : "bg-indigo-600"
                  }`}
                />
              </div>
            </div>

            {/* Post Updates Section */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
                  <MessageSquare className="h-4 w-4 text-indigo-600" />
                  <span>Service Release Notes & Delivery Updates ({ord.updates.length})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveUpdateOrderId(activeUpdateOrderId === ord.id ? null : ord.id)}
                  className="flex items-center gap-1 rounded-xl border border-indigo-200 bg-white px-2.5 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition"
                >
                  <Plus className="h-3.5 w-3.5" /> Post Update
                </button>
              </div>

              {/* Add Update Inline Form */}
              {activeUpdateOrderId === ord.id && (
                <form onSubmit={(e) => handlePostUpdateSubmit(e, ord.id)} className="space-y-2 pt-2">
                  <textarea
                    required
                    rows={2}
                    value={newUpdateText}
                    onChange={(e) => setNewUpdateText(e.target.value)}
                    placeholder="Write milestone update or release note..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveUpdateOrderId(null)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-700"
                    >
                      Publish Update
                    </button>
                  </div>
                </form>
              )}

              {/* Update Logs */}
              <div className="space-y-2 pt-1">
                {ord.updates.map((upd) => (
                  <div key={upd.id} className="rounded-xl border border-slate-200/60 bg-white p-3 text-xs font-medium">
                    <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1 font-semibold">
                      <span className="font-bold text-slate-900">{upd.author}</span>
                      <span>{upd.date}</span>
                    </div>
                    <p className="text-slate-700">{upd.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
