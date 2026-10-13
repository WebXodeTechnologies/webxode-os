"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  Building2,
  Users,
  Cloud,
  Globe,
  Server,
  RefreshCw,
  Cpu,
  ShoppingCart,
  Coffee,
  Wind,
  Trash2,
  Briefcase,
  Zap,
  Phone,
  Car,
  Printer,
  Wrench,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

// ──────────────────────────────────────────────
//  Types
// ──────────────────────────────────────────────
export type ExpenseCategory = "Client" | "Company";

export type ClientSubCategory =
  | "AWS / Cloud"
  | "Domain & Hosting"
  | "Third-party API"
  | "Software License"
  | "Renewal"
  | "DevOps Tool"
  | "Other Client";

export type CompanySubCategory =
  | "Petty Cash"
  | "Tea & Coffee"
  | "Tissues & Hygiene"
  | "Stationery"
  | "Cleaning Supplies"
  | "Internet & Phone"
  | "Electricity"
  | "Travel & Transport"
  | "Printing"
  | "Equipment Repair"
  | "Office Supplies"
  | "Other Office";

export type SubCategory = ClientSubCategory | CompanySubCategory;
export type ExpenseStatus = "Approved" | "Pending" | "Rejected" | "Reimbursed";

export interface ExpenseRecord {
  id: string;
  date: string;
  category: ExpenseCategory;
  subCategory: SubCategory;
  vendor: string;
  description: string;
  amount: number;
  paidBy: string;
  billRef: string;
  status: ExpenseStatus;
  project?: string;
  client?: string;
  notes: string;
}

// ──────────────────────────────────────────────
//  Config maps
// ──────────────────────────────────────────────
const CLIENT_SUB_CATEGORIES: ClientSubCategory[] = [
  "AWS / Cloud",
  "Domain & Hosting",
  "Third-party API",
  "Software License",
  "Renewal",
  "DevOps Tool",
  "Other Client",
];

const COMPANY_SUB_CATEGORIES: CompanySubCategory[] = [
  "Petty Cash",
  "Tea & Coffee",
  "Tissues & Hygiene",
  "Stationery",
  "Cleaning Supplies",
  "Internet & Phone",
  "Electricity",
  "Travel & Transport",
  "Printing",
  "Equipment Repair",
  "Office Supplies",
  "Other Office",
];

const SUB_ICONS: Record<SubCategory, React.ElementType> = {
  "AWS / Cloud": Cloud,
  "Domain & Hosting": Globe,
  "Third-party API": Cpu,
  "Software License": Briefcase,
  Renewal: RefreshCw,
  "DevOps Tool": Server,
  "Other Client": Package,
  "Petty Cash": ShoppingCart,
  "Tea & Coffee": Coffee,
  "Tissues & Hygiene": Wind,
  Stationery: Printer,
  "Cleaning Supplies": Trash2,
  "Internet & Phone": Phone,
  Electricity: Zap,
  "Travel & Transport": Car,
  Printing: Printer,
  "Equipment Repair": Wrench,
  "Office Supplies": Package,
  "Other Office": Package,
};

const STATUS_CONFIG: Record<ExpenseStatus, { color: string; icon: React.ElementType }> = {
  Approved: { color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  Pending: { color: "text-amber-700 bg-amber-50 border-amber-200", icon: Clock },
  Rejected: { color: "text-rose-700 bg-rose-50 border-rose-200", icon: AlertCircle },
  Reimbursed: { color: "text-indigo-700 bg-indigo-50 border-indigo-200", icon: CheckCircle2 },
};

// ──────────────────────────────────────────────
//  Sample data
// ──────────────────────────────────────────────
const SAMPLE_EXPENSES: ExpenseRecord[] = [
  {
    id: "EXP-001",
    date: "Oct 13, 2026",
    category: "Client",
    subCategory: "AWS / Cloud",
    vendor: "Amazon Web Services",
    description: "EC2 + S3 bucket for FoundersROI SaaS — Oct billing cycle",
    amount: 18500,
    paidBy: "Company Card",
    billRef: "AWS-OCT-2026",
    status: "Approved",
    project: "SaaS Analytics Dashboard",
    client: "FoundersROI",
    notes: "Auto-renewal. Charge back to client retainer.",
  },
  {
    id: "EXP-002",
    date: "Oct 12, 2026",
    category: "Client",
    subCategory: "Domain & Hosting",
    vendor: "GoDaddy",
    description: "Domain renewal — annaiagro.in for 2 years",
    amount: 2499,
    paidBy: "Akash R.",
    billRef: "GD-2026-88341",
    status: "Reimbursed",
    project: "CRM Integration",
    client: "Annai Agro Tradings",
    notes: "Reimbursed via Oct payroll.",
  },
  {
    id: "EXP-003",
    date: "Oct 11, 2026",
    category: "Client",
    subCategory: "Software License",
    vendor: "Figma",
    description: "Annual professional seat — UI/UX design tools",
    amount: 15000,
    paidBy: "Company Card",
    billRef: "FIG-2026-PRO",
    status: "Approved",
    project: "Brand Portal Redesign",
    client: "Visual Bridge Media",
    notes: "Annual subscription. Shared across 3 design projects.",
  },
  {
    id: "EXP-004",
    date: "Oct 10, 2026",
    category: "Client",
    subCategory: "Third-party API",
    vendor: "Twilio",
    description: "SMS OTP API credits for SmartHealth patient portal",
    amount: 8750,
    paidBy: "Company Card",
    billRef: "TWL-OCT-2026",
    status: "Pending",
    project: "Patient Portal",
    client: "SmartHealth Systems",
    notes: "Top-up credits. Bill to client on next invoice.",
  },
  {
    id: "EXP-005",
    date: "Oct 10, 2026",
    category: "Company",
    subCategory: "Tea & Coffee",
    vendor: "Nescafé / Local Canteen",
    description: "Office pantry restock — tea, coffee, sugar, creamer",
    amount: 1850,
    paidBy: "Priya S.",
    billRef: "PETTY-OCT-05",
    status: "Approved",
    notes: "Monthly pantry expense. Petty cash voucher #PC-21.",
  },
  {
    id: "EXP-006",
    date: "Oct 09, 2026",
    category: "Company",
    subCategory: "Tissues & Hygiene",
    vendor: "D-Mart",
    description: "Tissue boxes (10), hand sanitiser, toilet rolls",
    amount: 1120,
    paidBy: "Priya S.",
    billRef: "PETTY-OCT-06",
    status: "Approved",
    notes: "Monthly hygiene restocking. Petty cash voucher #PC-22.",
  },
  {
    id: "EXP-007",
    date: "Oct 08, 2026",
    category: "Company",
    subCategory: "Cleaning Supplies",
    vendor: "Flipkart Business",
    description: "Brooms (2), mop set, floor cleaner, dustpan",
    amount: 2200,
    paidBy: "Admin Team",
    billRef: "FK-ORD-9934",
    status: "Approved",
    notes: "Quarterly cleaning supply reorder.",
  },
  {
    id: "EXP-008",
    date: "Oct 07, 2026",
    category: "Client",
    subCategory: "AWS / Cloud",
    vendor: "Google Cloud Platform",
    description: "GCP Compute Engine — TechCorp mobile app backend infra",
    amount: 22000,
    paidBy: "Company Card",
    billRef: "GCP-OCT-TC",
    status: "Approved",
    project: "Mobile App MVP",
    client: "TechCorp Solutions",
    notes: "Bill back to client in sprint invoice.",
  },
  {
    id: "EXP-009",
    date: "Oct 06, 2026",
    category: "Company",
    subCategory: "Internet & Phone",
    vendor: "Jio Business",
    description: "Office broadband + 5 SIM corporate plan — Oct bill",
    amount: 4500,
    paidBy: "Company Card",
    billRef: "JIO-OCT-2026",
    status: "Approved",
    notes: "Recurring monthly. Auto-debit.",
  },
  {
    id: "EXP-010",
    date: "Oct 05, 2026",
    category: "Company",
    subCategory: "Stationery",
    vendor: "Classmate / Local Store",
    description: "Notebooks, pens, markers, sticky notes, folders",
    amount: 1640,
    paidBy: "Priya S.",
    billRef: "PETTY-OCT-07",
    status: "Approved",
    notes: "Monthly stationery replenishment. Petty cash.",
  },
  {
    id: "EXP-011",
    date: "Oct 04, 2026",
    category: "Client",
    subCategory: "Renewal",
    vendor: "Namecheap",
    description: "SSL certificate renewal — aishwaryaarts.com (2 yr)",
    amount: 3800,
    paidBy: "Akash R.",
    billRef: "NC-SSL-2026",
    status: "Pending",
    project: "E-Commerce Platform",
    client: "Aishwarya Arts",
    notes: "Pending reimbursement approval from finance.",
  },
  {
    id: "EXP-012",
    date: "Oct 03, 2026",
    category: "Company",
    subCategory: "Travel & Transport",
    vendor: "Ola / Local Auto",
    description: "Client meeting travel — Priya to TechCorp office & back",
    amount: 890,
    paidBy: "Priya S.",
    billRef: "PETTY-OCT-08",
    status: "Reimbursed",
    notes: "Reimbursed via advance settlement.",
  },
  {
    id: "EXP-013",
    date: "Oct 02, 2026",
    category: "Company",
    subCategory: "Electricity",
    vendor: "TNEB",
    description: "Office electricity bill — September cycle",
    amount: 8900,
    paidBy: "Company Card",
    billRef: "TNEB-SEP-2026",
    status: "Approved",
    notes: "Monthly recurring utility expense.",
  },
  {
    id: "EXP-014",
    date: "Oct 01, 2026",
    category: "Client",
    subCategory: "DevOps Tool",
    vendor: "GitHub",
    description: "GitHub Teams plan — 12-seat annual subscription",
    amount: 25000,
    paidBy: "Company Card",
    billRef: "GH-TEAMS-2026",
    status: "Approved",
    notes: "Shared across all active development projects.",
  },
  {
    id: "EXP-015",
    date: "Sep 30, 2026",
    category: "Company",
    subCategory: "Equipment Repair",
    vendor: "HP Service Centre",
    description: "Laptop screen replacement — Priya's MacBook Pro",
    amount: 12500,
    paidBy: "Company Card",
    billRef: "HP-SRV-8841",
    status: "Pending",
    notes: "Pending finance approval for capital expense category.",
  },
];

// ──────────────────────────────────────────────
//  Log Expense Modal
// ──────────────────────────────────────────────
interface LogExpenseModalProps {
  onClose: () => void;
  onAdd: (e: ExpenseRecord) => void;
  defaultCategory?: ExpenseCategory;
}

function LogExpenseModal({ onClose, onAdd, defaultCategory = "Client" }: LogExpenseModalProps) {
  const [category, setCategory] = useState<ExpenseCategory>(defaultCategory);
  const [form, setForm] = useState({
    subCategory: "" as SubCategory,
    vendor: "",
    description: "",
    amount: "",
    paidBy: "",
    project: "",
    client: "",
    notes: "",
  });

  const subCats = category === "Client" ? CLIENT_SUB_CATEGORIES : COMPANY_SUB_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    onAdd({
      id: `EXP-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      date: now,
      category,
      subCategory: form.subCategory || (subCats[0] as SubCategory),
      vendor: form.vendor,
      description: form.description,
      amount: Number(form.amount),
      paidBy: form.paidBy,
      billRef: `${category === "Client" ? "CLI" : "CO"}-${Date.now().toString().slice(-6)}`,
      status: "Pending",
      project: form.project || undefined,
      client: form.client || undefined,
      notes: form.notes,
    });
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
        style={{ maxHeight: "92vh" }}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50">
              <Plus className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Log New Expense</h3>
              <p className="text-xs font-semibold text-slate-500">
                Add client or company operational expense
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

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Category Toggle */}
          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">
              Expense Category *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["Client", "Company"] as ExpenseCategory[]).map((cat) => {
                const Icon = cat === "Client" ? Building2 : Users;
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setForm((f) => ({ ...f, subCategory: "" as SubCategory }));
                    }}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                      isActive
                        ? cat === "Client"
                          ? "border-violet-300 bg-violet-50 text-violet-800 shadow-sm"
                          : "border-amber-300 bg-amber-50 text-amber-800 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? cat === "Client"
                            ? "bg-violet-100"
                            : "bg-amber-100"
                          : "bg-white"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive
                            ? cat === "Client"
                              ? "text-violet-600"
                              : "text-amber-600"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{cat} Expense</p>
                      <p className="text-[11px] font-semibold opacity-70">
                        {cat === "Client"
                          ? "AWS, domains, tools, renewals"
                          : "Petty cash, office essentials"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-category + Vendor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Sub-Category *
              </label>
              <div className="relative">
                <select
                  required
                  value={form.subCategory}
                  onChange={(e) => setForm({ ...form, subCategory: e.target.value as SubCategory })}
                  className={`appearance-none pr-8 ${inputClass}`}
                >
                  <option value="">Select sub-category</option>
                  {subCats.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Vendor / Supplier *
              </label>
              <input
                required
                value={form.vendor}
                onChange={(e) => setForm({ ...form, vendor: e.target.value })}
                placeholder={category === "Client" ? "e.g. Amazon Web Services" : "e.g. D-Mart"}
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Description / Purpose *
            </label>
            <textarea
              required
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Briefly describe the expense and what it covers..."
              className={`resize-none ${inputClass}`}
            />
          </div>

          {/* Amount + Paid By */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Amount (₹) *</label>
              <input
                required
                type="number"
                min="1"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="e.g. 18500"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Paid By *</label>
              <input
                required
                value={form.paidBy}
                onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
                placeholder="e.g. Company Card / Akash R."
                className={inputClass}
              />
            </div>
          </div>

          {/* Client expense extras */}
          {category === "Client" && (
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-violet-200/60 bg-violet-50/40 p-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-violet-700">
                  Client Name
                </label>
                <input
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  placeholder="e.g. FoundersROI"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-violet-700">Project</label>
                <input
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  placeholder="e.g. SaaS Analytics Dashboard"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Notes / Remarks</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any additional context, petty cash voucher ref, or billing notes..."
              className={`resize-none ${inputClass}`}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-2 text-xs font-bold text-white shadow-md shadow-rose-200 transition hover:bg-rose-700 active:scale-98"
            >
              <Plus className="h-4 w-4" />
              Log Expense
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────
//  Detail View Modal
// ──────────────────────────────────────────────
interface ExpenseDetailModalProps {
  record: ExpenseRecord;
  onClose: () => void;
  onApprove: (id: string) => void;
}

function ExpenseDetailModal({ record, onClose, onApprove }: ExpenseDetailModalProps) {
  const StatusIcon = STATUS_CONFIG[record.status].icon;
  const SubIcon = SUB_ICONS[record.subCategory] || Package;
  const isCli = record.category === "Client";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isCli ? "bg-violet-100" : "bg-amber-100"
              }`}
            >
              <SubIcon className={`h-5 w-5 ${isCli ? "text-violet-600" : "text-amber-600"}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{record.id}</h3>
              <p className="text-xs font-semibold text-slate-500">
                {record.subCategory} · {record.date}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          {/* Category badge + amount */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-extrabold ${
                isCli
                  ? "border-violet-200 bg-violet-50 text-violet-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {isCli ? <Building2 className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
              {record.category} Expense
            </span>
            <span className="text-2xl font-black text-slate-900">
              ₹{record.amount.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Vendor", value: record.vendor },
              { label: "Paid By", value: record.paidBy },
              { label: "Bill Ref", value: record.billRef },
              { label: "Date", value: record.date },
              ...(record.client ? [{ label: "Client", value: record.client }] : []),
              ...(record.project ? [{ label: "Project", value: record.project }] : []),
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-100 bg-slate-50/80 p-3"
              >
                <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Description
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{record.description}</p>
          </div>

          {/* Notes */}
          {record.notes && (
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Notes</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">{record.notes}</p>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-extrabold ${STATUS_CONFIG[record.status].color}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {record.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          {record.status === "Pending" && (
            <button
              type="button"
              onClick={() => {
                onApprove(record.id);
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────
//  Main Expense Table
// ──────────────────────────────────────────────
interface ExpenseTableProps {
  records: ExpenseRecord[];
  onView: (r: ExpenseRecord) => void;
  onApprove: (id: string) => void;
}

function ExpenseTable({ records, onView, onApprove }: ExpenseTableProps) {
  if (records.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <Package className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-bold text-slate-800">No expenses found</p>
        <p className="mt-1 text-xs font-semibold text-slate-400">
          Try adjusting your filters or log a new expense.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="border-b border-slate-100 bg-slate-50/80">
          <tr className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
            <th className="px-4 py-3 whitespace-nowrap">Expense ID & Vendor</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Paid By</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
          <AnimatePresence>
            {records.map((row, idx) => {
              const StatusIcon = STATUS_CONFIG[row.status].icon;
              const SubIcon = SUB_ICONS[row.subCategory] || Package;
              const isCli = row.category === "Client";
              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, delay: idx * 0.03 }}
                  whileHover={{ backgroundColor: "rgba(248,250,252,1)" }}
                  className="group cursor-pointer transition-colors"
                  onClick={() => onView(row)}
                >
                  {/* Vendor + ID */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          isCli ? "bg-violet-50" : "bg-amber-50"
                        }`}
                      >
                        <SubIcon
                          className={`h-4 w-4 ${isCli ? "text-violet-600" : "text-amber-600"}`}
                        />
                      </div>
                      <div>
                        <span className="block font-extrabold whitespace-nowrap text-slate-900">
                          {row.vendor}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">{row.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex w-fit items-center gap-1 rounded-lg border px-2 py-0.5 text-[11px] font-extrabold ${
                          isCli
                            ? "border-violet-200 bg-violet-50 text-violet-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        {isCli ? (
                          <Building2 className="h-2.5 w-2.5" />
                        ) : (
                          <Users className="h-2.5 w-2.5" />
                        )}
                        {row.category}
                      </span>
                      <span className="text-[11px] font-semibold whitespace-nowrap text-slate-500">
                        {row.subCategory}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="max-w-48 px-4 py-3.5">
                    <p className="line-clamp-2 text-xs leading-snug font-semibold text-slate-700">
                      {row.description}
                    </p>
                    {row.client && (
                      <span className="mt-0.5 block text-[11px] font-bold text-violet-600">
                        {row.client}
                      </span>
                    )}
                  </td>

                  {/* Paid By */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">{row.paidBy}</td>

                  {/* Date */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">{row.date}</td>

                  {/* Amount */}
                  <td className="px-4 py-3.5 text-right font-black whitespace-nowrap text-slate-900">
                    ₹{row.amount.toLocaleString("en-IN")}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-extrabold ${STATUS_CONFIG[row.status].color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {row.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onView(row);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700 shadow-xs transition hover:border-indigo-200 hover:text-indigo-600"
                      >
                        View
                      </button>
                      {row.status === "Pending" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onApprove(row.id);
                          }}
                          className="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 shadow-xs transition hover:bg-emerald-100"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

// ──────────────────────────────────────────────
//  Main Exported Component
// ──────────────────────────────────────────────
interface ExpenseLedgerProps {
  activeCategory: "All" | ExpenseCategory;
}

export function ExpenseLedger({ activeCategory }: ExpenseLedgerProps) {
  const [records, setRecords] = useState<ExpenseRecord[]>(SAMPLE_EXPENSES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ExpenseStatus>("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ExpenseRecord | null>(null);

  const filtered = records.filter((r) => {
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSearch =
      r.vendor.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      (r.client || "").toLowerCase().includes(search.toLowerCase()) ||
      r.subCategory.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  const handleApprove = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" as ExpenseStatus } : r))
    );
  };

  const totalAmount = filtered.reduce((s, r) => s + r.amount, 0);

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-52 flex-1">
          <svg
            className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            id="expense-search"
            placeholder="Search vendor, category, client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-bold">
          {(["All", "Approved", "Pending", "Rejected", "Reimbursed"] as const).map((s) => (
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

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export CSV
        </button>

        <button
          type="button"
          id="log-expense-btn"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-200 transition hover:bg-rose-700"
        >
          <Plus className="h-3.5 w-3.5" />
          Log Expense
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-2xl border border-slate-200/80">
        <ExpenseTable records={filtered} onView={setSelectedRecord} onApprove={handleApprove} />
      </div>

      {/* Footer summary */}
      <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
        <span>
          {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` · ${activeCategory} Expenses` : ""}
        </span>
        <div className="flex items-center gap-4">
          <span>
            Total:{" "}
            <span className="font-black text-rose-600">₹{totalAmount.toLocaleString("en-IN")}</span>
          </span>
          <span>
            Pending:{" "}
            <span className="font-black text-amber-600">
              ₹
              {filtered
                .filter((r) => r.status === "Pending")
                .reduce((s, r) => s + r.amount, 0)
                .toLocaleString("en-IN")}
            </span>
          </span>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <LogExpenseModal
            onClose={() => setShowAddModal(false)}
            onAdd={(e) => setRecords((prev) => [e, ...prev])}
            defaultCategory={activeCategory === "All" ? "Client" : activeCategory}
          />
        )}
        {selectedRecord && (
          <ExpenseDetailModal
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
            onApprove={handleApprove}
          />
        )}
      </AnimatePresence>
    </>
  );
}
