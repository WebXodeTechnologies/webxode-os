"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  Plus,
  IndianRupee,
  Server,
  Globe,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  X,
  Search,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientExpensesTabProps {
  lead?: any;
}

export function ClientExpensesTab({ lead }: ClientExpensesTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [expenses, setExpenses] = useState([
    {
      id: "EXP-301",
      item: "AWS EC2 & RDS Multi-AZ Production Cloud Hosting",
      category: "AWS & Cloud",
      date: "01 Oct 2026",
      amount: 42000,
      paymentMode: "Corporate Card",
      recordedBy: "DevOps Team",
    },
    {
      id: "EXP-302",
      item: "Domain Name & Wildcard SSL Certificate Renewal",
      category: "Domain & SSL",
      date: "25 Sep 2026",
      amount: 8500,
      paymentMode: "UPI",
      recordedBy: "Akash S M",
    },
    {
      id: "EXP-303",
      item: "Twilio SMS & Whatsapp API Verification Credits",
      category: "Third-party APIs",
      date: "15 Sep 2026",
      amount: 14000,
      paymentMode: "Corporate Card",
      recordedBy: "Priya R",
    },
    {
      id: "EXP-304",
      item: "Senior Fullstack Contractor Extra Fee for Payment Gateway",
      category: "Dev Fees",
      date: "10 Sep 2026",
      amount: 65000,
      paymentMode: "Bank Transfer",
      recordedBy: "Project Lead",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newExp, setNewExp] = useState({ item: "", category: "AWS & Cloud", amount: "15000" });

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const projectRevenue = typeof lead?.estimatedValue === "number" ? lead.estimatedValue : 980000;
  const netMargin = projectRevenue - totalExpenses;
  const marginPercentage = ((netMargin / projectRevenue) * 100).toFixed(1);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.item.trim()) return;

    const amt = parseFloat(newExp.amount) || 10000;
    const added = {
      id: `EXP-${Math.floor(305 + Math.random() * 90)}`,
      item: newExp.item,
      category: newExp.category,
      date: "Today",
      amount: amt,
      paymentMode: "Bank Transfer",
      recordedBy: "You",
    };

    setExpenses((prev) => [added, ...prev]);
    setShowModal(false);
    setNewExp({ item: "", category: "AWS & Cloud", amount: "15000" });
    toast.success("Expense Recorded", {
      description: `Recorded ₹${amt.toLocaleString("en-IN")} under ${added.category}.`,
    });
  };

  const filteredExpenses = expenses.filter((e) => {
    return (
      e.item.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Header & Summary */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 shadow-2xs">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Expense Ledger & Investment</h2>
              <p className="text-xs font-semibold text-slate-500">
                AWS hosting, domain, SSL & DevOps investment costs for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-700"
          >
            <Plus className="h-4 w-4" /> Record Project Expense
          </button>
        </div>

        {/* Investment & Net Margin Metrics */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-slate-100 pt-5">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
            <div className="text-xs font-bold text-rose-800">Total Project Expenses</div>
            <div className="mt-1 text-2xl font-black text-rose-700">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-rose-600">Cloud, DevOps & Infra costs</div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="text-xs font-bold text-emerald-800">Net Project Margin</div>
            <div className="mt-1 text-2xl font-black text-emerald-700">
              ₹{netMargin.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-emerald-600">{marginPercentage}% Net Profit Margin</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-4">
            <div className="text-xs font-bold text-slate-300">Total Billed Revenue</div>
            <div className="mt-1 text-2xl font-black text-white">
              ₹{projectRevenue.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-400">Total client deal size</div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex justify-end">
          <div className="relative min-w-56">
            <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search expenses..."
              className="w-full rounded-xl border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-semibold outline-none focus:border-rose-600"
            />
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/90 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Expense ID</th>
                <th className="px-6 py-3.5">Item Description</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Recorded By</th>
                <th className="px-6 py-3.5 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4 font-mono font-extrabold text-rose-600">{exp.id}</td>
                  <td className="px-6 py-4 font-extrabold text-slate-900">{exp.item}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{exp.date}</td>
                  <td className="px-6 py-4 text-slate-600">{exp.recordedBy}</td>
                  <td className="px-6 py-4 text-right font-black text-rose-600 text-sm">
                    ₹{exp.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Record Client Project Expense</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Expense Item / Vendor *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS EC2 Cloud Server Invoice"
                  value={newExp.item}
                  onChange={(e) => setNewExp({ ...newExp, item: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-rose-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={newExp.category}
                    onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-rose-600"
                  >
                    <option value="AWS & Cloud">AWS & Cloud</option>
                    <option value="Domain & SSL">Domain & SSL</option>
                    <option value="Third-party APIs">Third-party APIs</option>
                    <option value="Dev Fees">Dev Contractor Fees</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Amount (INR ₹)</label>
                  <input
                    type="number"
                    value={newExp.amount}
                    onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-rose-600"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-rose-700"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
