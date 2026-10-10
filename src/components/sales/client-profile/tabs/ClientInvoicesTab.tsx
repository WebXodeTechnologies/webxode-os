"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  Send,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  IndianRupee,
  Search,
  Filter,
  X,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientInvoicesTabProps {
  lead?: any;
}

export function ClientInvoicesTab({ lead }: ClientInvoicesTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [invoices, setInvoices] = useState([
    {
      id: "INV-2026-088",
      service: "Custom Supply Chain Web & Mobile ERP System",
      issueDate: "01 Oct 2026",
      dueDate: "15 Oct 2026",
      amount: 450000,
      paidAmount: 250000,
      status: "Partial",
    },
    {
      id: "INV-2026-074",
      service: "Q3 UI/UX Design & Architecture Discovery",
      issueDate: "15 Sep 2026",
      dueDate: "30 Sep 2026",
      amount: 180000,
      paidAmount: 180000,
      status: "Paid",
    },
    {
      id: "INV-2026-061",
      service: "AWS Cloud Infrastructure Setup & DevOps",
      issueDate: "10 Aug 2026",
      dueDate: "25 Aug 2026",
      amount: 120000,
      paidAmount: 120000,
      status: "Paid",
    },
    {
      id: "INV-2026-092",
      service: "Mobile App Milestone 2 Development Fee",
      issueDate: "05 Oct 2026",
      dueDate: "20 Oct 2026",
      amount: 230000,
      paidAmount: 0,
      status: "Unpaid",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ service: "", amount: "150000", dueDate: "2026-11-01" });

  const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalPending = totalInvoiced - totalCollected;

  const handleSendReminder = (invId: string) => {
    toast.success("Payment Reminder Sent", {
      description: `Automated payment reminder for invoice ${invId} sent to ${lead?.email || "client"}.`,
    });
  };

  const handleDownloadInvoice = (invId: string) => {
    toast.success("Downloading Invoice", {
      description: `Generating tax invoice PDF for ${invId}...`,
    });
  };

  const handleMarkAsPaid = (invId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invId ? { ...inv, status: "Paid", paidAmount: inv.amount } : inv))
    );
    toast.success("Invoice Updated", {
      description: `Invoice ${invId} marked as Fully Paid.`,
    });
  };

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoice.service.trim()) return;

    const amt = parseFloat(newInvoice.amount) || 150000;
    const added = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      service: newInvoice.service,
      issueDate: "Today",
      dueDate: newInvoice.dueDate,
      amount: amt,
      paidAmount: 0,
      status: "Unpaid",
    };

    setInvoices((prev) => [added, ...prev]);
    setShowCreateModal(false);
    setNewInvoice({ service: "", amount: "150000", dueDate: "2026-11-01" });
    toast.success("Invoice Issued", {
      description: `Tax invoice ${added.id} created for ₹${amt.toLocaleString("en-IN")}.`,
    });
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus = filterStatus === "All" || inv.status === filterStatus;
    const matchesSearch =
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.service.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Header & Metrics */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-2xs">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Invoices & Pipeline Ledger</h2>
              <p className="text-xs font-semibold text-slate-500">
                Manage total pending, collected & pipeline billing for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" /> Create New Invoice
          </button>
        </div>

        {/* Financial Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-slate-100 pt-5">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="text-xs font-bold text-emerald-800">Total Collected</div>
            <div className="mt-1 text-2xl font-black text-emerald-700">
              ₹{totalCollected.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-emerald-600">Successfully received</div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="text-xs font-bold text-amber-800">Total Pending Due</div>
            <div className="mt-1 text-2xl font-black text-amber-700">
              ₹{totalPending.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-amber-600">Awaiting clearance</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-4">
            <div className="text-xs font-bold text-slate-300">Total Pipeline Invoiced</div>
            <div className="mt-1 text-2xl font-black text-white">
              ₹{totalInvoiced.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-400">Total billed value</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {(["All", "Unpaid", "Partial", "Paid"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  filterStatus === st
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative min-w-56">
            <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoice # or service..."
              className="w-full rounded-xl border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/90 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Invoice #</th>
                <th className="px-6 py-3.5">Service Details</th>
                <th className="px-6 py-3.5">Issue & Due Date</th>
                <th className="px-6 py-3.5">Amount (₹)</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4 font-mono font-extrabold text-indigo-600">{inv.id}</td>
                  <td className="px-6 py-4 font-extrabold text-slate-900">{inv.service}</td>
                  <td className="px-6 py-4 text-slate-500">
                    <div>Issued: {inv.issueDate}</div>
                    <div className="text-[11px] font-bold text-rose-600">Due: {inv.dueDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-black text-slate-900">₹{inv.amount.toLocaleString("en-IN")}</div>
                    {inv.paidAmount > 0 && inv.paidAmount < inv.amount && (
                      <div className="text-[10px] text-emerald-600 font-bold">
                        Paid: ₹{inv.paidAmount.toLocaleString("en-IN")}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                        inv.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : inv.status === "Partial"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleSendReminder(inv.id)}
                        className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
                        title="Send reminder to client"
                      >
                        <Send className="h-3 w-3" /> Reminder
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadInvoice(inv.id)}
                        className="rounded-xl border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 transition"
                        title="Download PDF"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      {inv.status !== "Paid" && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsPaid(inv.id)}
                          className="rounded-xl bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Create Tax Invoice</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Milestone 2 Development & QA"
                  value={newInvoice.service}
                  onChange={(e) => setNewInvoice({ ...newInvoice, service: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Amount (INR ₹)</label>
                  <input
                    type="number"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Due Date</label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
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
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
