"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Layers,
  Calculator,
  Receipt,
  Download,
  CheckCircle2,
  Send,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
  Paperclip,
  TrendingUp,
} from "lucide-react";
import { PresalesItem } from "@/modules/presales/presales.types";

interface PresalesDetailModalProps {
  isOpen: boolean;
  item: PresalesItem | null;
  onClose: () => void;
  onAdvanceStage: (item: PresalesItem) => void;
  onHandoffToProject: (item: PresalesItem) => void;
  onAddNegotiationNote: (itemId: string, note: any) => void;
}

export function PresalesDetailModal({
  isOpen,
  item,
  onClose,
  onAdvanceStage,
  onHandoffToProject,
  onAddNegotiationNote,
}: PresalesDetailModalProps) {
  if (!isOpen || !item) return null;

  return (
    <PresalesDetailContent
      key={item.id || item._id}
      item={item}
      onClose={onClose}
      onAdvanceStage={onAdvanceStage}
      onHandoffToProject={onHandoffToProject}
      onAddNegotiationNote={onAddNegotiationNote}
    />
  );
}

function PresalesDetailContent({
  item,
  onClose,
  onAdvanceStage,
  onHandoffToProject,
  onAddNegotiationNote,
}: {
  item: PresalesItem;
  onClose: () => void;
  onAdvanceStage: (item: PresalesItem) => void;
  onHandoffToProject: (item: PresalesItem) => void;
  onAddNegotiationNote: (itemId: string, note: any) => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "requirements" | "estimation" | "proposal" | "quotation"
  >("requirements");

  const [newNote, setNewNote] = useState("");
  const [discountReq, setDiscountReq] = useState("0");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    onAddNegotiationNote(item.id || item._id!, {
      id: `neg-${Date.now()}`,
      author: "Vikram Malhotra (Lead Architect)",
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      message: newNote.trim(),
      proposedDiscountPercent: Number(discountReq) || 0,
      status: "Pending",
    });

    setNewNote("");
  };

  const gstAmount = Math.round(item.estimatedValue * 0.18);
  const totalWithGst = item.estimatedValue + gstAmount;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-indigo-50/30 px-8 py-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-indigo-200/60 bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-bold text-indigo-600">
                  {item.quotationNumber || item.id}
                </span>
                <span className="text-xs font-extrabold text-slate-400">•</span>
                <span className="text-xs font-black tracking-wider text-slate-700 uppercase">
                  {item.clientName}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-600 uppercase">
                  {item.stage}
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-900">{item.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-8">
            {[
              { id: "requirements", label: "1. Requirements & Scope", icon: Layers },
              { id: "estimation", label: "2. Architecture & Effort", icon: Calculator },
              { id: "proposal", label: "3. Proposal & SOW", icon: FileText },
              { id: "quotation", label: "4. Quotation & Commercials", icon: Receipt },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex cursor-pointer items-center gap-2 border-b-2 px-4 py-4 text-xs font-extrabold transition-all ${
                    isActive
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 space-y-6 overflow-y-auto p-8">
            {/* TAB 1: REQUIREMENTS */}
            {activeTab === "requirements" && (
              <div className="space-y-6">
                {/* Problem Statement Card */}
                <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6">
                  <h3 className="text-xs font-black tracking-wider text-slate-400 uppercase">
                    Client Problem Statement & Solution Objectives
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-semibold text-slate-800">
                    {item.scopeSummary}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {item.businessObjectives.map((obj, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-2xl border border-slate-200/60 bg-white p-3 text-xs font-semibold text-slate-700 shadow-2xs"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Deliverables Roadmap */}
                <div>
                  <h3 className="text-xs font-black tracking-wider text-slate-400 uppercase">
                    Proposed Key Deliverables Roadmap
                  </h3>
                  <div className="mt-3 space-y-3">
                    {item.deliverables.map((d, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-extrabold text-indigo-700 uppercase">
                              {d.deliverableType}
                            </span>
                            <h4 className="text-xs font-black text-slate-900">{d.title}</h4>
                          </div>
                          <p className="mt-1 text-[11px] font-medium text-slate-500">
                            {d.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">
                          <Clock className="h-3.5 w-3.5 text-indigo-500" />
                          <span>{d.estimatedWeeks} weeks</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Attachments */}
                {item.documents.length > 0 && (
                  <div>
                    <h3 className="text-xs font-black tracking-wider text-slate-400 uppercase">
                      Attached Specifications & Discovery Decks
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {item.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs"
                        >
                          <Paperclip className="h-4 w-4 text-indigo-600" />
                          <div>
                            <p className="text-xs font-bold text-slate-800">{doc.title}</p>
                            <p className="text-[10px] text-slate-400">
                              {doc.version} • {doc.size} • {doc.updatedAt}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="cursor-pointer rounded-lg bg-slate-50 p-1.5 text-slate-500 hover:text-slate-800"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ESTIMATION */}
            {activeTab === "estimation" && (
              <div className="space-y-6">
                {/* Module Hours Table */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                      <tr>
                        <th className="px-4 py-3.5">Module Name</th>
                        <th className="px-4 py-3.5">Discipline</th>
                        <th className="px-4 py-3.5">Estimated Effort</th>
                        <th className="px-4 py-3.5">Hourly Rate</th>
                        <th className="px-4 py-3.5 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {item.estimationModules.map((mod) => (
                        <tr key={mod.id}>
                          <td className="px-4 py-3 font-bold text-slate-900">{mod.name}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                              {mod.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-black text-slate-800">{mod.hours} hrs</td>
                          <td className="px-4 py-3 text-slate-500">
                            ₹{mod.ratePerHour.toLocaleString("en-IN")}/hr
                          </td>
                          <td className="px-4 py-3 text-right font-mono font-black text-slate-900">
                            ₹{(mod.hours * mod.ratePerHour).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tech Stack Matrix */}
                <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6">
                  <h4 className="text-xs font-black tracking-wider text-slate-400 uppercase">
                    Proposed Technology Infrastructure Stack
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl border border-indigo-200/80 bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PROPOSAL & SOW */}
            {activeTab === "proposal" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase">
                        Statement of Work (SOW) Preview
                      </span>
                      <h3 className="text-base font-black text-slate-900">
                        Master Services Agreement & Execution Terms
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download SOW Document</span>
                    </button>
                  </div>

                  <div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-700">
                    <p>
                      <strong>1. Engagement Scope:</strong> Webxode Technologies shall design,
                      architect, and deliver the <strong>{item.title}</strong> in accordance with
                      the specifications established in this presales dossier.
                    </p>
                    <p>
                      <strong>2. Delivery Timeline:</strong> The estimated project lifecycle
                      duration is <strong>{item.timelineWeeks} calendar weeks</strong> from the date
                      of advance commercial remittance and technical kickoff.
                    </p>
                    <p>
                      <strong>3. Commercial Milestones:</strong>
                      <br />•{" "}
                      <strong>
                        {item.commercialTerms?.advancePercentage || 40}% Upfront Advance:
                      </strong>{" "}
                      Project initiation & architecture lock.
                      <br />•{" "}
                      <strong>
                        {item.commercialTerms?.milestonePercentage || 40}% Mid-Sprint Milestone:
                      </strong>{" "}
                      Core microservices & demo preview sign-off.
                      <br />•{" "}
                      <strong>
                        {item.commercialTerms?.deliveryPercentage || 20}% Final Delivery:
                      </strong>{" "}
                      Production release, user acceptance testing (UAT), and source handoff.
                    </p>
                    <p>
                      <strong>4. Intellectual Property:</strong> All bespoke source code, container
                      configurations, and architectural schematics are assigned exclusively to{" "}
                      {item.clientName} upon full commercial settlement.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: QUOTATION & NEGOTIATION */}
            {activeTab === "quotation" && (
              <div className="space-y-6">
                {/* Quotation Financial Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      Subtotal (Net Amount)
                    </span>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      ₹{item.estimatedValue.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      GST (18% Statutory)
                    </span>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      ₹{gstAmount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-indigo-200 bg-indigo-50/60 p-5 shadow-xs">
                    <span className="text-[10px] font-black tracking-widest text-indigo-700 uppercase">
                      Gross Total Payable
                    </span>
                    <p className="mt-1 text-2xl font-black text-indigo-700">
                      ₹{totalWithGst.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Negotiation Conversation Trail */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h3 className="text-xs font-black tracking-wider text-slate-400 uppercase">
                    Commercial Negotiation & Concession Audit Trail
                  </h3>

                  <div className="mt-4 space-y-3">
                    {item.negotiationLogs.length === 0 ? (
                      <p className="py-4 text-center text-xs font-medium text-slate-400">
                        No negotiation requests logged. Client accepted standard rate card terms.
                      </p>
                    ) : (
                      item.negotiationLogs.map((log) => (
                        <div
                          key={log.id}
                          className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-900">{log.author}</span>
                            <span className="text-[10px] font-bold text-slate-400">{log.date}</span>
                          </div>
                          <p className="mt-1.5 text-xs font-medium text-slate-700">{log.message}</p>
                          {log.proposedDiscountPercent > 0 && (
                            <span className="mt-2 inline-block rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                              {log.proposedDiscountPercent}% Concession Requested
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Negotiation Note Form */}
                  <form
                    onSubmit={handleAddNote}
                    className="mt-5 space-y-3 border-t border-slate-100 pt-4"
                  >
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Log commercial revision note or client discount dialogue..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        max="25"
                        placeholder="Disc %"
                        value={discountReq}
                        onChange={(e) => setDiscountReq(e.target.value)}
                        className="h-10 w-20 rounded-xl border border-slate-200 bg-slate-50 px-2 text-center text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="flex h-10 cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white hover:bg-indigo-600"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Log Note</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/70 px-8 py-4">
            <div className="text-xs font-bold text-slate-500">
              Assigned Solution Lead:{" "}
              <strong className="text-slate-800">
                {item.solutionArchitect?.name || "Solutions Architect"}
              </strong>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 cursor-pointer rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 hover:bg-white"
              >
                Close
              </button>

              {item.stage === "Approved" ? (
                <button
                  type="button"
                  onClick={() => {
                    onHandoffToProject(item);
                    onClose();
                  }}
                  className="flex h-10 cursor-pointer items-center gap-1.5 rounded-xl bg-teal-600 px-5 text-xs font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Handover to Delivery Projects</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onAdvanceStage(item);
                    onClose();
                  }}
                  className="flex h-10 cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
                >
                  <span>Advance to Next Stage</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
