"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  Send,
  Download,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  FileSpreadsheet,
  X,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientProposalsTabProps {
  lead?: any;
}

export function ClientProposalsTab({ lead }: ClientProposalsTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [proposals, setProposals] = useState([
    {
      id: "PROP-901",
      title: "Statement of Work (SOW) & Technical Architecture Blueprint",
      docType: "SOW Document",
      status: "Client Approved",
      value: 450000,
      version: "v2.4",
      lastUpdated: "04 Oct 2026",
    },
    {
      id: "PROP-902",
      title: "Master SLA & Maintenance Support Agreement",
      docType: "Master SLA",
      status: "Out for Signature",
      value: 120000,
      version: "v1.0",
      lastUpdated: "08 Oct 2026",
    },
    {
      id: "PROP-903",
      title: "Project Milestone 1 Closure & Sign-Off Documentation",
      docType: "Closure Documentation",
      status: "Signed",
      value: 250000,
      version: "v1.0",
      lastUpdated: "02 Oct 2026",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProp, setNewProp] = useState({ title: "", docType: "SOW Document", value: "300000" });

  const handleSendProposal = (title: string) => {
    toast.success("Proposal Sent", {
      description: `"${title}" has been emailed to client decision makers.`,
    });
  };

  const handleDownloadDoc = (title: string) => {
    toast.success("Downloading PDF", {
      description: `Downloading "${title}" document...`,
    });
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.title.trim()) return;

    const val = parseFloat(newProp.value) || 200000;
    const added = {
      id: `PROP-${Math.floor(904 + Math.random() * 90)}`,
      title: newProp.title,
      docType: newProp.docType,
      status: "Out for Signature",
      value: val,
      version: "v1.0",
      lastUpdated: "Today",
    };

    setProposals((prev) => [added, ...prev]);
    setShowModal(false);
    setNewProp({ title: "", docType: "SOW Document", value: "300000" });
    toast.success("Proposal Generated", {
      description: `"${added.title}" added to proposals list.`,
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
      {/* Header */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-100 bg-purple-50 text-purple-600 shadow-2xs">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Proposals, SOW & Master SLAs</h2>
              <p className="text-xs font-semibold text-slate-500">
                Official statement of work, pricing quotes, SLAs & closure docs for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/20 transition hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" /> Generate SOW / Proposal
          </button>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((p) => (
          <div
            key={p.id}
            className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs md:flex-row md:items-center"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-50 border border-purple-100 text-purple-600">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-purple-600">{p.id}</span>
                  <h3 className="text-base font-extrabold text-slate-900">{p.title}</h3>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-bold text-slate-700">{p.docType}</span>
                  <span>Version: {p.version}</span>
                  <span>•</span>
                  <span>Updated: {p.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 shrink-0">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${
                  p.status === "Signed" || p.status === "Client Approved"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                }`}
              >
                {p.status}
              </span>
              <span className="font-black text-slate-900 text-sm">₹{p.value.toLocaleString("en-IN")}</span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSendProposal(p.title)}
                  className="flex items-center gap-1 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-800 hover:bg-purple-100 transition"
                >
                  <Send className="h-3.5 w-3.5" /> Send SLA
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc(p.title)}
                  className="rounded-xl border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 transition"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Proposal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Generate Proposal / SOW</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Proposal Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master SLA & Maintenance Contract"
                  value={newProp.title}
                  onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-purple-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Document Type</label>
                  <select
                    value={newProp.docType}
                    onChange={(e) => setNewProp({ ...newProp, docType: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-purple-600"
                  >
                    <option value="SOW Document">SOW Document</option>
                    <option value="Master SLA">Master SLA</option>
                    <option value="Pricing Quote">Pricing Quote</option>
                    <option value="Closure Documentation">Closure Documentation</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Contract Value (₹)</label>
                  <input
                    type="number"
                    value={newProp.value}
                    onChange={(e) => setNewProp({ ...newProp, value: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-purple-600"
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
                  className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-purple-700"
                >
                  Generate SOW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
