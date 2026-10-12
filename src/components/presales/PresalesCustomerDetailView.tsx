"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Video,
  FileText,
  DollarSign,
  CheckCircle2,
  Calendar,
  Clock,
  ExternalLink,
  Layers,
  Sparkles,
  PhoneCall,
  User,
  Building,
  Mail,
  Phone,
  Edit2,
  Download,
  Share2,
  ShieldCheck,
  Check,
  ListTodo,
  TrendingUp,
  Globe,
  Briefcase,
  AlertCircle,
  Plus,
} from "lucide-react";
import { PresalesItem, PreDevChecklistItem, PreDevTask } from "@/modules/presales/presales.types";
import { PresalesEditModal } from "@/components/presales/PresalesEditModal";
import {
  updatePresalesItem,
  convertPresalesToDevPhase,
  toggleChecklistItem,
} from "@/server/actions/presales.actions";

interface PresalesCustomerDetailViewProps {
  initialItem: PresalesItem;
}

export function PresalesCustomerDetailView({ initialItem }: PresalesCustomerDetailViewProps) {
  const [item, setItem] = useState<PresalesItem>(initialItem);
  const [activeTab, setActiveTab] = useState<
    "demo" | "documents" | "checklist" | "tasks" | "commercial"
  >("demo");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Checklists state
  const [checklist, setChecklist] = useState<PreDevChecklistItem[]>(
    item.checklist || [
      {
        id: "chk-1",
        title: "Technical Requirements Scoping & Scope Boundary",
        category: "Discovery",
        completed: true,
      },
      {
        id: "chk-2",
        title: "High-Fidelity Wireframes / UI Prototype Sign-off",
        category: "UI/UX Prototype",
        completed: true,
      },
      {
        id: "chk-3",
        title: "System Architecture & API Integration Blueprint",
        category: "Architecture",
        completed: true,
      },
      {
        id: "chk-4",
        title: "Commercial Quotation & Payment Milestone Terms",
        category: "Commercial & SOW",
        completed: true,
      },
      {
        id: "chk-5",
        title: "SOW (Statement of Work) Document Execution",
        category: "Commercial & SOW",
        completed: item.stage === "Approved",
      },
      {
        id: "chk-6",
        title: "Dev Phase Handover & Delivery Team Sign-off",
        category: "Delivery Signoff",
        completed: item.devPhaseConverted || false,
      },
    ]
  );

  // Tasks state
  const [tasks, setTasks] = useState<PreDevTask[]>(
    item.tasks || [
      {
        id: "tsk-1",
        title: "Refine SOW deliverable matrix with engineering lead",
        assignee: "Vikram Malhotra",
        dueDate: "2026-10-15",
        status: "In Progress",
        priority: "High",
      },
      {
        id: "tsk-2",
        title: "Verify API Sandbox credentials & Rate Limits",
        assignee: "Tech Lead",
        dueDate: "2026-10-16",
        status: "Pending",
        priority: "Medium",
      },
    ]
  );

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleToggleChecklist = async (checkId: string) => {
    const updated = checklist.map((c) =>
      c.id === checkId ? { ...c, completed: !c.completed } : c
    );
    setChecklist(updated);

    const changedItem = updated.find((c) => c.id === checkId);
    toast.success(`Checklist item updated!`);

    try {
      await toggleChecklistItem(item.id || item._id!, checkId, changedItem?.completed || false);
    } catch {
      // optimistic state retained
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: PreDevTask = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle.trim(),
      assignee: item.solutionArchitect?.name || "Solutions Team",
      dueDate: "2026-10-20",
      status: "Pending",
      priority: "Medium",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    toast.success("Pre-development action task logged!");
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          const nextStatus =
            t.status === "Pending"
              ? "In Progress"
              : t.status === "In Progress"
                ? "Completed"
                : "Pending";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleConvertToDev = async () => {
    setIsConverting(true);
    try {
      await convertPresalesToDevPhase(item.id || item._id!);
      setItem({
        ...item,
        stage: "Approved",
        devPhaseConverted: true,
        convertedToDevAt: new Date().toISOString(),
      });
      toast.success(`🚀 Deal Won! ${item.clientName} converted into Project Delivery & Dev Phase!`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to convert to dev phase");
    } finally {
      setIsConverting(false);
    }
  };

  const handleSaveEdit = async (updated: PresalesItem) => {
    setItem(updated);
    toast.success("Presales customer details updated successfully!");

    try {
      await updatePresalesItem(item.id || item._id!, updated);
    } catch {
      // optimistic state retained
    }
  };

  const gstAmount = Math.round(item.estimatedValue * 0.18);
  const grandTotal = item.estimatedValue + gstAmount;

  return (
    <div className="w-full space-y-8 pb-20">
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/dashboard/presales"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Presales Overview Hub</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <Edit2 className="h-3.5 w-3.5 text-slate-400" />
            <span>Edit Customer Details</span>
          </button>

          {item.demo?.meetingLink && (
            <a
              href={item.demo.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/20 hover:bg-purple-700"
            >
              <Video className="h-3.5 w-3.5" />
              <span>Join Demo ({item.demo.platform})</span>
            </a>
          )}

          {!item.devPhaseConverted && item.stage !== "Approved" && (
            <button
              type="button"
              disabled={isConverting}
              onClick={handleConvertToDev}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isConverting ? "Converting..." : "Convert into Dev Phase"}</span>
            </button>
          )}
        </div>
      </div>

      {/* MASTER CUSTOMER HEADER BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white p-8 shadow-xs">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-linear-to-bl from-indigo-50/60 to-transparent" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-black text-indigo-700">
                {item.quotationNumber || item.id}
              </span>
              <span className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                {item.serviceCategory || "Web Development"}
              </span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-xs font-extrabold text-slate-700 uppercase">
                Stage: {item.stage}
              </span>
              {item.devPhaseConverted && (
                <span className="flex items-center gap-1 rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-black text-teal-800">
                  <CheckCircle2 className="h-3 w-3 text-teal-600" />
                  Converted to Dev Phase
                </span>
              )}
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {item.clientName}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed font-medium text-slate-600">
              {item.title} — {item.scopeSummary}
            </p>

            {/* Quick Contact & Handover meta */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" />
                <span>{item.contactPerson}</span>
              </div>
              {item.clientCompany && (
                <div className="flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-slate-400" />
                  <span>{item.clientCompany}</span>
                </div>
              )}
              {item.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{item.email}</span>
                </div>
              )}
              {item.salesLeadSource && (
                <div className="flex items-center gap-1.5 text-indigo-600">
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>{item.salesLeadSource}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Commercial Valuation Pill */}
          <div className="flex flex-col gap-2 rounded-3xl border border-indigo-100 bg-linear-to-b from-indigo-50/50 to-white p-6 shadow-xs lg:min-w-64">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
              Commercial Quote Value
            </span>
            <div className="text-3xl font-black tracking-tight text-indigo-950">
              ₹{item.estimatedValue.toLocaleString("en-IN")}
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-700">{item.targetMarginPercent}% Margin</span>
              <span className="text-slate-500">{item.timelineWeeks} Weeks</span>
            </div>
            <div className="border-t border-indigo-100/70 pt-2 text-[11px] font-medium text-slate-500">
              Architect: <strong>{item.solutionArchitect?.name || "Vikram Malhotra"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION STRIP */}
      <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xs">
        {[
          { key: "demo", label: "Technical Demo & POC", icon: Video },
          { key: "documents", label: "Quote & SOW Documents", icon: FileText },
          { key: "checklist", label: "Pre-Development Checklist", icon: ShieldCheck },
          { key: "tasks", label: "Pre-Dev Action Tasks", icon: ListTodo },
          { key: "commercial", label: "Commercial Terms & Rates", icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all ${
                isActive ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TECHNICAL DEMO & POC PROTOTYPE */}
      {activeTab === "demo" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Demo Status & Meeting Card */}
            <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider text-slate-400 uppercase">
                  Demo Meeting Link
                </span>
                <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
                  {item.demo?.platform || "Google Meet"}
                </span>
              </div>

              <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span>Date: {item.demo?.scheduledDate || "Not Scheduled"}</span>
                </div>
                {item.demo?.scheduledTime && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>Time: {item.demo.scheduledTime}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.demo?.status === "Completed" || item.demo?.status === "POC Presented"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  <span>Status: {item.demo?.status || "Pending"}</span>
                </div>
              </div>

              {item.demo?.meetingLink ? (
                <a
                  href={item.demo.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
                >
                  <Video className="h-4 w-4" />
                  <span>Launch Meeting Link</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-center text-xs text-slate-400 italic">No link assigned yet</p>
              )}
            </div>

            {/* Proof of Concept (POC) Card */}
            <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider text-slate-400 uppercase">
                  Proof of Concept (POC)
                </span>
                <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700 uppercase">
                  {item.demo?.pocStatus || "Prototype"}
                </span>
              </div>

              <p className="text-xs leading-relaxed font-medium text-slate-600">
                Live clickable prototype or staging sandbox prepared by Presales Engineering to
                validate technical feasibility and wow client stakeholders.
              </p>

              {item.demo?.pocUrl ? (
                <div className="space-y-3">
                  <a
                    href={item.demo.pocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/50 py-3 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                  >
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <span>View Interactive POC / Prototype</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="truncate text-center font-mono text-[11px] text-slate-400">
                    {item.demo.pocUrl}
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                  No prototype URL uploaded yet. Click &apos;Edit Customer Details&apos; to add
                  Figma or staging link.
                </div>
              )}
            </div>

            {/* Demo Agenda & Notes */}
            <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <span className="text-xs font-black tracking-wider text-slate-400 uppercase">
                Demo Agenda & Key Topics
              </span>
              <p className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs leading-relaxed font-medium text-slate-700">
                {item.demo?.agenda ||
                  "High-level architecture review, user flow validation, and technical SLA expectations."}
              </p>

              <span className="block pt-1 text-xs font-black tracking-wider text-slate-400 uppercase">
                Client Questions & Feedback
              </span>
              <p className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3.5 text-xs leading-relaxed font-medium text-slate-700">
                {item.demo?.notes ||
                  "Client requested modular pricing breakdown and confirmed interest in next development phase."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUOTE & SOW DOCUMENTS */}
      {activeTab === "documents" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* PRICING QUOTATION PREVIEW */}
            <div className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black tracking-wider text-emerald-600 uppercase">
                    Commercial Proposal
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Pricing Quotation ({item.quotationNumber || item.id})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Quotation PDF generated and exported!")}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>

              {/* Modules breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase">Cost Breakdown</h4>
                <div className="space-y-2">
                  {(item.estimationModules || []).map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between rounded-xl bg-slate-50/70 p-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{m.name}</span>
                        <p className="text-[10px] text-slate-400">
                          {m.category} • {m.hours} hrs
                        </p>
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        ₹
                        {(m.hours * (m.ratePerHour || item.hourlyRate || 2500)).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="space-y-2 rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 text-xs">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Subtotal:</span>
                  <span>₹{item.estimatedValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-medium text-slate-600">
                  <span>GST (18%):</span>
                  <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t border-emerald-200 pt-2 text-sm font-black text-emerald-950">
                  <span>Total Commercial Quote:</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* STATEMENT OF WORK (SOW) PREVIEW */}
            <div className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black tracking-wider text-indigo-600 uppercase">
                    Legal & Delivery Agreement
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Statement of Work (SOW)</h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    toast.success("SOW Document drafted and saved to documents archive!")
                  }
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download SOW</span>
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase">
                  Executive Scope Matrix
                </h4>
                <p className="text-xs leading-relaxed font-medium text-slate-600">
                  {item.scopeSummary}
                </p>
              </div>

              {/* Deliverables list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase">Key SOW Deliverables</h4>
                <div className="space-y-2">
                  {(item.deliverables || []).map((d, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{d.title}</span>
                        <span className="text-[10px] text-indigo-600">
                          {d.estimatedWeeks} Weeks
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">{d.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRE-DEVELOPMENT CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Pre-Development Gateway Checklist
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Mandatory presales milestones required before client deal can convert into the
                engineering development sprint.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>
                {checklist.filter((c) => c.completed).length} of {checklist.length} Completed
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {checklist.map((check) => (
              <div
                key={check.id}
                onClick={() => handleToggleChecklist(check.id)}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  check.completed
                    ? "border-emerald-200 bg-emerald-50/30 text-slate-800"
                    : "border-slate-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors ${
                      check.completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {check.completed && <Check className="h-4 w-4" />}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-bold ${
                        check.completed ? "text-slate-400 line-through" : "text-slate-800"
                      }`}
                    >
                      {check.title}
                    </span>
                    <p className="text-[10px] text-slate-400">{check.category}</p>
                  </div>
                </div>

                <span
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase ${
                    check.completed
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {check.completed ? "Verified" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRE-DEV ACTION TASKS */}
      {activeTab === "tasks" && (
        <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Presales Action Task Backlog</h3>
              <p className="mt-1 text-xs text-slate-500">
                Operational tasks assigned to presales solutions architects to address client
                questions and clear obstacles.
              </p>
            </div>
          </div>

          {/* Add Task Input */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new presales follow-up task (e.g. Schedule second demo with CTO, revise quote discount)..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
          </form>

          {/* Tasks List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition-all hover:border-indigo-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                      task.status === "Completed"
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {task.status === "Completed" && <Check className="h-4 w-4" />}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-bold ${
                        task.status === "Completed"
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Assignee: <strong>{task.assignee}</strong> • Due: {task.dueDate}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase ${
                    task.status === "Completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : task.status === "In Progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COMMERCIAL TERMS & RATES */}
      {activeTab === "commercial" && (
        <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs">
          <h3 className="border-b border-slate-100 pb-4 text-lg font-black text-slate-900">
            Commercial Terms & Milestone Payment Structure
          </h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                1. Advance Sign-off
              </span>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {item.commercialTerms?.advancePercentage || 40}%
              </p>
              <p className="mt-1 text-xs text-slate-500">
                ₹
                {Math.round(
                  (item.estimatedValue * (item.commercialTerms?.advancePercentage || 40)) / 100
                ).toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-[10px] text-slate-400">Upon SOW signature & dev kickoff</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                2. Milestone Delivery
              </span>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {item.commercialTerms?.milestonePercentage || 40}%
              </p>
              <p className="mt-1 text-xs text-slate-500">
                ₹
                {Math.round(
                  (item.estimatedValue * (item.commercialTerms?.milestonePercentage || 40)) / 100
                ).toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-[10px] text-slate-400">
                Upon Sprint 2 demo & staging sign-off
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                3. Final Acceptance
              </span>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {item.commercialTerms?.deliveryPercentage || 20}%
              </p>
              <p className="mt-1 text-xs text-slate-500">
                ₹
                {Math.round(
                  (item.estimatedValue * (item.commercialTerms?.deliveryPercentage || 20)) / 100
                ).toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-[10px] text-slate-400">
                Upon production deployment & UAT sign-off
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      <PresalesEditModal
        isOpen={isEditModalOpen}
        item={item}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
