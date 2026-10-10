"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  Plus,
  Download,
  CreditCard,
  Building,
  Smartphone,
  Banknote,
  Globe,
  Search,
  CheckCircle2,
  X,
  FileCheck,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientPaymentsTabProps {
  lead?: any;
}

export function ClientPaymentsTab({ lead }: ClientPaymentsTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [payments, setPayments] = useState([
    {
      id: "PAY-9041",
      invoiceId: "INV-2026-088",
      date: "05 Oct 2026",
      amount: 250000,
      mode: "Bank Transfer (NEFT/RTGS)",
      referenceNo: "UTR-HDFC0001928401",
      status: "Verified",
      icon: Building,
    },
    {
      id: "PAY-8812",
      invoiceId: "INV-2026-074",
      date: "18 Sep 2026",
      amount: 180000,
      mode: "UPI (GooglePay / PhonePe)",
      referenceNo: "UPI-619284019281",
      status: "Verified",
      icon: Smartphone,
    },
    {
      id: "PAY-7620",
      invoiceId: "INV-2026-061",
      date: "12 Aug 2026",
      amount: 120000,
      mode: "Stripe Online",
      referenceNo: "ch_3M0192841029",
      status: "Verified",
      icon: CreditCard,
    },
  ]);

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    invoiceId: "INV-2026-092",
    amount: "150000",
    mode: "Bank Transfer (NEFT/RTGS)",
    referenceNo: "",
  });

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);

  const handleDownloadReceipt = (payId: string) => {
    toast.success("Downloading Payment Receipt", {
      description: `Receipt PDF for payment ${payId} downloaded.`,
    });
  };

  const handleAddPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let IconComp = Building;
    if (newPayment.mode.includes("UPI")) IconComp = Smartphone;
    if (newPayment.mode.includes("Stripe")) IconComp = CreditCard;
    if (newPayment.mode.includes("PayPal")) IconComp = Globe;
    if (newPayment.mode.includes("Cash")) IconComp = Banknote;

    const amt = parseFloat(newPayment.amount) || 100000;
    const added = {
      id: `PAY-${Math.floor(9100 + Math.random() * 900)}`,
      invoiceId: newPayment.invoiceId || "INV-2026-092",
      date: "Today",
      amount: amt,
      mode: newPayment.mode,
      referenceNo: newPayment.referenceNo || `UTR-${Math.floor(100000000 + Math.random() * 900000000)}`,
      status: "Verified",
      icon: IconComp,
    };

    setPayments((prev) => [added, ...prev]);
    setShowAddModal(false);
    setNewPayment({ invoiceId: "INV-2026-092", amount: "150000", mode: "Bank Transfer (NEFT/RTGS)", referenceNo: "" });
    toast.success("Payment Collection Recorded", {
      description: `Recorded ₹${amt.toLocaleString("en-IN")} via ${added.mode}.`,
    });
  };

  const filteredPayments = payments.filter((p) => {
    return (
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      p.mode.toLowerCase().includes(search.toLowerCase()) ||
      p.referenceNo.toLowerCase().includes(search.toLowerCase())
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
      {/* Top Header & Overview */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-2xs">
              <IndianRupee className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Payment Collections (INR ₹)</h2>
              <p className="text-xs font-semibold text-slate-500">
                Payment history & settlement modes for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" /> Record Payment Collection
          </button>
        </div>

        {/* Payment Modes Available & Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-slate-100 pt-5">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="text-xs font-bold text-emerald-800">Total Cleared Receipts</div>
            <div className="mt-1 text-2xl font-black text-emerald-700">
              ₹{totalCollected.toLocaleString("en-IN")}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-emerald-600">3 Verified Settlements</div>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4">
            <div className="text-xs font-bold text-indigo-800">Primary Payment Channel</div>
            <div className="mt-1 text-lg font-black text-indigo-900">NEFT / RTGS & UPI</div>
            <div className="mt-1 text-[11px] font-semibold text-indigo-600">INR Direct Settlement</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold text-slate-600">Supported Modes</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["UPI", "Bank Transfer", "Stripe", "PayPal", "Cash", "Cheque"].map((m) => (
                <span key={m} className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-extrabold text-slate-700">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex justify-end">
          <div className="relative min-w-64">
            <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference # or UTR..."
              className="w-full rounded-xl border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-semibold outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Payment Records Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/90 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Transaction ID</th>
                <th className="px-6 py-3.5">Invoice #</th>
                <th className="px-6 py-3.5">Payment Method</th>
                <th className="px-6 py-3.5">Reference / UTR #</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Amount (₹)</th>
                <th className="px-6 py-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredPayments.map((p) => {
                const IconComp = p.icon;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-extrabold text-indigo-600">{p.id}</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">{p.invoiceId}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <IconComp className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-extrabold text-slate-800">{p.mode}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600 text-[11px]">{p.referenceNo}</td>
                    <td className="px-6 py-4 text-slate-500">{p.date}</td>
                    <td className="px-6 py-4 font-black text-emerald-600 text-sm">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownloadReceipt(p.id)}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-slate-500" /> Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Record Client Payment</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddPaymentSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Invoice Number</label>
                <input
                  type="text"
                  required
                  placeholder="INV-2026-092"
                  value={newPayment.invoiceId}
                  onChange={(e) => setNewPayment({ ...newPayment, invoiceId: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Amount (INR ₹)</label>
                  <input
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Payment Method</label>
                  <select
                    value={newPayment.mode}
                    onChange={(e) => setNewPayment({ ...newPayment, mode: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                  >
                    <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                    <option value="UPI (GooglePay / PhonePe)">UPI (GooglePay / PhonePe)</option>
                    <option value="Stripe Online">Stripe Online</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash Deposit">Cash Deposit</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">UTR / Reference Number</label>
                <input
                  type="text"
                  placeholder="e.g. UTR-HDFC00019284"
                  value={newPayment.referenceNo}
                  onChange={(e) => setNewPayment({ ...newPayment, referenceNo: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
