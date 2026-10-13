"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Plus,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  Eye,
  Send,
  X,
  Building2,
  Calendar,
  DollarSign,
  Layers,
  Check,
  Loader2,
} from "lucide-react";

export type PaymentType = "Advance" | "Sprint" | "Milestone" | "Final" | "Retainer" | "Service";
export type PaymentStatus = "Paid" | "Pending" | "Processing" | "Overdue" | "Partial";

export interface PaymentRecord {
  id: string;
  invoiceNo: string;
  client: string;
  clientCode: string;
  project: string;
  type: PaymentType;
  amount: string;
  amountRaw: number;
  receivedAmount: string;
  balanceAmount: string;
  invoiceDate: string;
  dueDate: string;
  status: PaymentStatus;
  notes: string;
  approvedBy: string | null;
  releaseStatus: "Pending Approval" | "Approved" | "Released" | "On Hold";
}

const TYPE_COLORS: Record<PaymentType, string> = {
  Advance: "bg-violet-100 text-violet-700 border-violet-200",
  Sprint: "bg-blue-100 text-blue-700 border-blue-200",
  Milestone: "bg-teal-100 text-teal-700 border-teal-200",
  Final: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Retainer: "bg-orange-100 text-orange-700 border-orange-200",
  Service: "bg-pink-100 text-pink-700 border-pink-200",
};

const STATUS_CONFIG: Record<
  PaymentStatus,
  { color: string; icon: React.ElementType; label: string }
> = {
  Paid: {
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    icon: CheckCircle2,
    label: "Paid",
  },
  Pending: { color: "text-amber-600 bg-amber-50 border-amber-200", icon: Clock, label: "Pending" },
  Processing: {
    color: "text-blue-600 bg-blue-50 border-blue-200",
    icon: Loader2,
    label: "Processing",
  },
  Overdue: {
    color: "text-rose-600 bg-rose-50 border-rose-200",
    icon: AlertCircle,
    label: "Overdue",
  },
  Partial: {
    color: "text-orange-600 bg-orange-50 border-orange-200",
    icon: Layers,
    label: "Partial",
  },
};

const RELEASE_CONFIG: Record<PaymentRecord["releaseStatus"], { color: string; label: string }> = {
  "Pending Approval": {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Pending Approval",
  },
  Approved: { color: "bg-indigo-50 text-indigo-700 border-indigo-200", label: "Approved" },
  Released: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Released" },
  "On Hold": { color: "bg-rose-50 text-rose-700 border-rose-200", label: "On Hold" },
};

const SAMPLE_RECORDS: PaymentRecord[] = [
  {
    id: "1",
    invoiceNo: "INV-2026-001",
    client: "Aishwarya Arts",
    clientCode: "AA",
    project: "E-Commerce Platform",
    type: "Advance",
    amount: "₹45,000",
    amountRaw: 45000,
    receivedAmount: "₹45,000",
    balanceAmount: "₹0",
    invoiceDate: "Oct 01, 2026",
    dueDate: "Oct 15, 2026",
    status: "Paid",
    notes: "Advance payment for project kickoff",
    approvedBy: "Akash R.",
    releaseStatus: "Released",
  },
  {
    id: "2",
    invoiceNo: "INV-2026-002",
    client: "Annai Agro Tradings",
    clientCode: "AT",
    project: "CRM Integration",
    type: "Sprint",
    amount: "₹85,000",
    amountRaw: 85000,
    receivedAmount: "₹85,000",
    balanceAmount: "₹0",
    invoiceDate: "Oct 05, 2026",
    dueDate: "Oct 20, 2026",
    status: "Paid",
    notes: "Sprint 2 delivery — backend APIs & dashboard",
    approvedBy: "Priya S.",
    releaseStatus: "Released",
  },
  {
    id: "3",
    invoiceNo: "INV-2026-003",
    client: "Visual Bridge Media",
    clientCode: "VB",
    project: "Brand Portal Redesign",
    type: "Milestone",
    amount: "₹60,000",
    amountRaw: 60000,
    receivedAmount: "₹0",
    balanceAmount: "₹60,000",
    invoiceDate: "Oct 08, 2026",
    dueDate: "Oct 22, 2026",
    status: "Processing",
    notes: "Milestone 1: Wireframes & design system delivered",
    approvedBy: null,
    releaseStatus: "Pending Approval",
  },
  {
    id: "4",
    invoiceNo: "INV-2026-004",
    client: "FoundersROI",
    clientCode: "FR",
    project: "SaaS Analytics Dashboard",
    type: "Retainer",
    amount: "₹1,12,500",
    amountRaw: 112500,
    receivedAmount: "₹1,12,500",
    balanceAmount: "₹0",
    invoiceDate: "Sep 28, 2026",
    dueDate: "Oct 12, 2026",
    status: "Paid",
    notes: "Monthly retainer — Oct 2026",
    approvedBy: "Akash R.",
    releaseStatus: "Released",
  },
  {
    id: "5",
    invoiceNo: "INV-2026-005",
    client: "TechCorp Solutions",
    clientCode: "TC",
    project: "Mobile App MVP",
    type: "Sprint",
    amount: "₹95,000",
    amountRaw: 95000,
    receivedAmount: "₹50,000",
    balanceAmount: "₹45,000",
    invoiceDate: "Oct 02, 2026",
    dueDate: "Oct 16, 2026",
    status: "Partial",
    notes: "Sprint 1 partial payment received; balance pending post-demo",
    approvedBy: null,
    releaseStatus: "Pending Approval",
  },
  {
    id: "6",
    invoiceNo: "INV-2026-006",
    client: "GreenLeaf Organics",
    clientCode: "GL",
    project: "Website Revamp",
    type: "Final",
    amount: "₹38,000",
    amountRaw: 38000,
    receivedAmount: "₹0",
    balanceAmount: "₹38,000",
    invoiceDate: "Sep 15, 2026",
    dueDate: "Sep 30, 2026",
    status: "Overdue",
    notes: "Final delivery accepted. Payment overdue by 13 days.",
    approvedBy: null,
    releaseStatus: "On Hold",
  },
  {
    id: "7",
    invoiceNo: "INV-2026-007",
    client: "NovaBuild Infra",
    clientCode: "NB",
    project: "Construction ERP",
    type: "Advance",
    amount: "₹70,000",
    amountRaw: 70000,
    receivedAmount: "₹70,000",
    balanceAmount: "₹0",
    invoiceDate: "Oct 10, 2026",
    dueDate: "Oct 25, 2026",
    status: "Paid",
    notes: "Project onboarding advance payment",
    approvedBy: "Priya S.",
    releaseStatus: "Released",
  },
  {
    id: "8",
    invoiceNo: "INV-2026-008",
    client: "SmartHealth Systems",
    clientCode: "SH",
    project: "Patient Portal",
    type: "Service",
    amount: "₹55,000",
    amountRaw: 55000,
    receivedAmount: "₹0",
    balanceAmount: "₹55,000",
    invoiceDate: "Oct 11, 2026",
    dueDate: "Oct 28, 2026",
    status: "Pending",
    notes: "API integration service — awaiting client QA sign-off",
    approvedBy: null,
    releaseStatus: "Pending Approval",
  },
];

interface RecordDetailModalProps {
  record: PaymentRecord;
  onClose: () => void;
  onApprove: (id: string) => void;
}

function RecordDetailModal({ record, onClose, onApprove }: RecordDetailModalProps) {
  const StatusIcon = STATUS_CONFIG[record.status].icon;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{record.invoiceNo}</h3>
              <p className="text-xs font-semibold text-slate-500">
                {record.client} · {record.project}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          {[
            { label: "Invoice Amount", value: record.amount, icon: DollarSign },
            { label: "Received", value: record.receivedAmount, icon: CheckCircle2 },
            { label: "Balance Due", value: record.balanceAmount, icon: AlertCircle },
            { label: "Invoice Date", value: record.invoiceDate, icon: Calendar },
            { label: "Due Date", value: record.dueDate, icon: Calendar },
            { label: "Payment Type", value: record.type, icon: Layers },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
              >
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                  <ItemIcon className="h-3.5 w-3.5" />
                  {item.label}
                </div>
                <p className="mt-1 text-sm font-black text-slate-900">{item.value}</p>
              </div>
            );
          })}
        </div>

        {/* Notes */}
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Notes</p>
          <p className="mt-1.5 text-sm font-semibold text-slate-700">{record.notes}</p>
        </div>

        {/* Status Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${STATUS_CONFIG[record.status].color}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {record.status}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${RELEASE_CONFIG[record.releaseStatus].color}`}
          >
            {record.releaseStatus}
          </span>
          {record.approvedBy && (
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              Approved by {record.approvedBy}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
          {record.releaseStatus === "Pending Approval" && (
            <button
              type="button"
              onClick={() => {
                onApprove(record.id);
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Check className="h-4 w-4" />
              Approve & Release
            </button>
          )}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <Send className="h-3.5 w-3.5" />
            Send Reminder
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface AddPaymentModalProps {
  onClose: () => void;
  onAdd: (record: Partial<PaymentRecord>) => void;
}

function AddPaymentModal({ onClose, onAdd }: AddPaymentModalProps) {
  const [form, setForm] = useState({
    client: "",
    project: "",
    type: "Sprint" as PaymentType,
    amount: "",
    invoiceDate: "",
    dueDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      client: form.client,
      project: form.project,
      type: form.type,
      amount: `₹${Number(form.amount).toLocaleString("en-IN")}`,
      amountRaw: Number(form.amount),
      receivedAmount: "₹0",
      balanceAmount: `₹${Number(form.amount).toLocaleString("en-IN")}`,
      invoiceDate: form.invoiceDate,
      dueDate: form.dueDate,
      notes: form.notes,
      status: "Pending",
      releaseStatus: "Pending Approval",
      approvedBy: null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
              <Plus className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Log New Payment / Invoice</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Client Name *</label>
              <input
                required
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                placeholder="e.g. TechCorp Solutions"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Project *</label>
              <input
                required
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                placeholder="e.g. E-Commerce Platform"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Payment Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as PaymentType })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:border-indigo-300 focus:bg-white focus:outline-none"
              >
                {["Advance", "Sprint", "Milestone", "Final", "Retainer", "Service"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Amount (₹) *</label>
              <input
                required
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="e.g. 85000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Invoice Date *
              </label>
              <input
                required
                type="date"
                value={form.invoiceDate}
                onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:border-indigo-300 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Due Date *</label>
              <input
                required
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:border-indigo-300 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Notes / Description
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Describe payment milestone, sprint scope, or service details..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Log Invoice
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function PaymentLedger() {
  const [records, setRecords] = useState<PaymentRecord[]>(SAMPLE_RECORDS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PaymentStatus>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | PaymentType>("All");
  const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = records.filter((r) => {
    const matchSearch =
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      r.project.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchType = typeFilter === "All" || r.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const handleApprove = (id: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, releaseStatus: "Approved" as const, approvedBy: "Finance Team" } : r
      )
    );
  };

  const handleAdd = (data: Partial<PaymentRecord>) => {
    const newRecord: PaymentRecord = {
      id: String(records.length + 1),
      invoiceNo: `INV-2026-00${records.length + 1}`,
      clientCode: (data.client || "XX").substring(0, 2).toUpperCase(),
      ...data,
    } as PaymentRecord;
    setRecords((prev) => [newRecord, ...prev]);
  };

  return (
    <>
      {/* Header toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Payment & Invoice Ledger
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            All client payments — advance, sprint-wise, milestones & services
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            id="add-payment-btn"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Log Payment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-52 flex-1">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            id="revenue-search"
            placeholder="Search client, invoice, project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-bold">
          {(["All", "Paid", "Pending", "Processing", "Overdue", "Partial"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-2.5 py-1.5 transition ${
                statusFilter === s
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "All" | PaymentType)}
            className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-8 pl-3.5 text-xs font-bold text-slate-700 focus:border-indigo-300 focus:outline-none"
          >
            <option value="All">All Types</option>
            {["Advance", "Sprint", "Milestone", "Final", "Retainer", "Service"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/80">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80">
            <tr className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
              <th className="px-4 py-3">Invoice & Client</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Release</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            <AnimatePresence>
              {filtered.length > 0 ? (
                filtered.map((row, idx) => {
                  const StatusIcon = STATUS_CONFIG[row.status].icon;
                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.04 }}
                      whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
                      className="group cursor-pointer transition-colors"
                      onClick={() => setSelectedRecord(row)}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-black text-indigo-700">
                            {row.clientCode}
                          </div>
                          <div>
                            <span className="block font-extrabold text-slate-900">
                              {row.client}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              {row.invoiceNo}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                          <Building2 className="h-3 w-3" />
                          {row.project}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded-lg border px-2.5 py-1 text-[11px] font-extrabold ${TYPE_COLORS[row.type]}`}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-black text-slate-900">{row.amount}</td>
                      <td className="px-4 py-3.5 font-bold text-emerald-600">
                        {row.receivedAmount}
                      </td>
                      <td
                        className={`px-4 py-3.5 font-bold ${row.amountRaw > 0 && row.balanceAmount !== "₹0" ? "text-rose-600" : "text-slate-400"}`}
                      >
                        {row.balanceAmount}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">{row.dueDate}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-extrabold ${STATUS_CONFIG[row.status].color}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded-xl border px-2.5 py-1 text-[11px] font-bold ${RELEASE_CONFIG[row.releaseStatus].color}`}
                        >
                          {row.releaseStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(row);
                          }}
                          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition group-hover:border-indigo-200 group-hover:text-indigo-600"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="py-10 text-center text-xs font-semibold text-slate-400"
                  >
                    No records found matching your filters.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer summary */}
      <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
        <span>
          Showing {filtered.length} of {records.length} transactions
        </span>
        <div className="flex items-center gap-4">
          <span>
            Total Invoiced:{" "}
            <span className="font-black text-slate-900">
              ₹{filtered.reduce((s, r) => s + r.amountRaw, 0).toLocaleString("en-IN")}
            </span>
          </span>
          <span>
            Collected:{" "}
            <span className="font-black text-emerald-600">
              ₹
              {filtered
                .reduce((s, r) => s + (r.status === "Paid" ? r.amountRaw : 0), 0)
                .toLocaleString("en-IN")}
            </span>
          </span>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedRecord && (
          <RecordDetailModal
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
            onApprove={handleApprove}
          />
        )}
        {showAddModal && (
          <AddPaymentModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />
        )}
      </AnimatePresence>
    </>
  );
}
