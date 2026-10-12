"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Calculator,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  ArrowRight,
  Send,
  Sparkles,
  Layers,
  Edit2,
  Trash2,
  Filter,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Globe,
  Smartphone,
  Cloud,
  Megaphone,
  Palette,
  FileCode,
  Briefcase,
  Percent,
} from "lucide-react";
import {
  PresalesItem,
  EstimationModule,
  ITServiceCategory,
} from "@/modules/presales/presales.types";
import { PresalesEffortCalculatorModal } from "@/components/presales/PresalesEffortCalculatorModal";
import {
  updatePresalesEstimation,
  updateEstimateApproval,
  createPresalesRequirement,
  deletePresalesItem,
} from "@/server/actions/presales.actions";

interface PresalesEstimatesHubProps {
  initialItems: PresalesItem[];
}

const serviceIcons: Record<string, React.ReactNode> = {
  "Web Development": <Globe className="h-3.5 w-3.5 text-blue-500" />,
  "App Development": <Smartphone className="h-3.5 w-3.5 text-emerald-500" />,
  "SaaS Development": <Cloud className="h-3.5 w-3.5 text-indigo-500" />,
  "Digital Marketing": <Megaphone className="h-3.5 w-3.5 text-amber-500" />,
  Branding: <Palette className="h-3.5 w-3.5 text-pink-500" />,
  "Content Creation": <FileCode className="h-3.5 w-3.5 text-purple-500" />,
  "Performance Marketing": <TrendingUp className="h-3.5 w-3.5 text-rose-500" />,
  Consulting: <Briefcase className="h-3.5 w-3.5 text-slate-600" />,
};

const approvalBadgeStyles: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Sent to Client": "bg-blue-50 text-blue-700 border-blue-200",
  "Client Reviewing": "bg-amber-50 text-amber-700 border-amber-200",
  Draft: "bg-slate-100 text-slate-700 border-slate-200",
  "Revision Requested": "bg-rose-50 text-rose-700 border-rose-200",
};

export function PresalesEstimatesHub({ initialItems }: PresalesEstimatesHubProps) {
  const [items, setItems] = useState<PresalesItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [calcItem, setCalcItem] = useState<PresalesItem | null>(null);
  const [isNewEstimateModalOpen, setIsNewEstimateModalOpen] = useState(false);

  // New Estimate Form State
  const [newClientName, setNewClientName] = useState("");
  const [newContactPerson, setNewContactPerson] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newService, setNewService] = useState<ITServiceCategory>("Web Development");
  const [newRate, setNewRate] = useState("2500");
  const [newMargin, setNewMargin] = useState("38");
  const [newWeeks, setNewWeeks] = useState("6");
  const [newModules, setNewModules] = useState<{ name: string; hours: number; category: any }[]>([
    { name: "Frontend User Experience & Responsive Design", hours: 80, category: "Frontend" },
    { name: "Backend Services & Database Architecture", hours: 100, category: "Backend" },
    { name: "QA Automation & Integration Testing", hours: 40, category: "QA & Testing" },
  ]);

  // Filter items
  const filteredItems = items.filter((item) => {
    const status =
      item.estimateStatus ||
      (item.stage === "Approved" ? "Approved" : item.stage === "Quotation" ? "Approved" : "Draft");
    const matchesStatus = selectedStatus === "All" || status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.clientName.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.serviceCategory?.toLowerCase().includes(q) ||
      item.quotationNumber?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // KPI Metrics
  const totalApproved = items.filter(
    (i) =>
      i.estimateStatus === "Approved" ||
      i.stage === "Approved" ||
      i.stage === "Proposal" ||
      i.stage === "Quotation"
  ).length;
  const totalPending = items.length - totalApproved;
  const totalPipelineVal = items.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
  const totalHours = items.reduce((acc, curr) => acc + (curr.totalEffortHours || 0), 0);
  const avgHourlyRate = Math.round(
    items.reduce((acc, curr) => acc + (curr.hourlyRate || 2500), 0) / (items.length || 1)
  );

  // Save Estimation Calculation
  const handleSaveEstimation = async (
    itemId: string,
    modules: EstimationModule[],
    hourlyRate: number,
    marginPercent: number
  ) => {
    const totalEffortHours = modules.reduce((sum, m) => sum + (Number(m.hours) || 0), 0);
    const estimatedValue = totalEffortHours * hourlyRate;

    setItems(
      items.map((i) => {
        if (i.id === itemId || i._id === itemId) {
          return {
            ...i,
            estimationModules: modules,
            hourlyRate,
            targetMarginPercent: marginPercent,
            totalEffortHours,
            estimatedValue,
            estimateStatus: i.estimateStatus || "Draft",
          };
        }
        return i;
      })
    );

    toast.success("Costing estimation and rate cards updated!");

    try {
      await updatePresalesEstimation(itemId, modules, hourlyRate, marginPercent);
    } catch {
      // optimistic retained
    }
  };

  // Change Approval Status
  const handleUpdateStatus = async (
    item: PresalesItem,
    status: "Draft" | "Sent to Client" | "Client Reviewing" | "Approved" | "Revision Requested"
  ) => {
    const targetId = item.id || item._id!;
    setItems(
      items.map((i) =>
        i.id === targetId || i._id === targetId ? { ...i, estimateStatus: status } : i
      )
    );

    if (status === "Approved") {
      toast.success(
        `🎉 Estimate for ${item.clientName} APPROVED by client! Ready for SOW & Documentation.`
      );
    } else {
      toast.success(`Estimate status changed to: ${status}`);
    }

    try {
      await updateEstimateApproval(targetId, status);
    } catch {
      // optimistic retained
    }
  };

  // Create New Estimate
  const handleCreateNewEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newTitle) return;

    const rate = Number(newRate) || 2500;
    const margin = Number(newMargin) || 38;
    const weeks = Number(newWeeks) || 6;
    const totalHrs = newModules.reduce((sum, m) => sum + m.hours, 0);
    const val = totalHrs * rate;

    const estModules: EstimationModule[] = newModules.map((m, idx) => ({
      id: `mod-${Date.now()}-${idx}`,
      name: m.name,
      hours: m.hours,
      ratePerHour: rate,
      description: `Modular work for ${m.name}`,
      category: m.category,
    }));

    const tempId = `pre-${Date.now()}`;
    const newItem: PresalesItem = {
      id: tempId,
      _id: tempId,
      clientName: newClientName,
      contactPerson: newContactPerson || "Key Stakeholder",
      email: `contact@${newClientName.toLowerCase().replace(/\s+/g, "")}.com`,
      phone: "+91 98000 00000",
      title: newTitle,
      serviceCategory: newService,
      stage: "Estimation",
      estimateStatus: "Draft",
      priority: "High",
      techStack: ["Next.js 15", "Node.js", "PostgreSQL"],
      estimatedValue: val,
      totalEffortHours: totalHrs,
      hourlyRate: rate,
      targetMarginPercent: margin,
      timelineWeeks: weeks,
      scopeSummary: `Initial costing estimation and project scope for ${newClientName}.`,
      businessObjectives: [
        "Deliver scalable IT solution on schedule",
        "Optimize total cost of ownership",
      ],
      deliverables: [
        {
          title: "Architecture & Solution Blueprint",
          estimatedWeeks: 2,
          description: "Technical specifications and API schematics.",
          deliverableType: "Documentation",
        },
        {
          title: "Core Development Sprint Delivery",
          estimatedWeeks: Math.max(2, weeks - 2),
          description: "Production build with automated testing.",
          deliverableType: "Code",
        },
      ],
      estimationModules: estModules,
      commercialTerms: {
        advancePercentage: 40,
        milestonePercentage: 40,
        deliveryPercentage: 20,
        paymentTerms: "Net 15 days upon milestone sign-off",
        validityDays: 30,
        gstRate: 18,
      },
      documents: [],
      negotiationLogs: [],
      solutionArchitect: {
        name: "Vikram Malhotra",
        role: "Principal Solutions Architect",
      },
      quotationNumber: `WX-EST-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setItems([newItem, ...items]);
    setIsNewEstimateModalOpen(false);
    toast.success(
      `Estimation created for ${newClientName}! Total approx cost: ₹${val.toLocaleString("en-IN")}`
    );

    try {
      await createPresalesRequirement(newItem);
    } catch {
      // optimistic retained
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-200/70 bg-linear-to-r from-amber-50/80 via-white to-orange-50/40 p-8 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[10px] font-black tracking-wider text-amber-900 uppercase">
                Phase 2 • Presales Costing Engine
              </span>
              <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Estimates & Costing Hub
            </h1>
            <p className="max-w-2xl text-xs leading-relaxed font-medium text-slate-600">
              Create approximate engineering effort estimations, model blended hourly rate cards
              across IT service lines, calculate total client expenditure, and secure formal client
              approval before SOW document drafting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsNewEstimateModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-2xl bg-amber-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-amber-600/20 transition-all hover:bg-amber-700 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Client Estimate</span>
            </button>

            <Link
              href={"/dashboard/presales/proposals" as any}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50"
            >
              <span>Go to SOW & Documents</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. ESTIMATES KPI STATS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
              Total Estimates
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Calculator className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">{items.length}</p>
          <p className="mt-1 text-[11px] font-medium text-slate-500">
            {totalHours.toLocaleString("en-IN")} total engineering hrs modeled
          </p>
        </div>

        {/* KPI 2 */}
        <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/30 p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider text-emerald-800 uppercase">
              Approved by Client
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
            {totalApproved}
          </p>
          <p className="mt-1 text-[11px] font-bold text-emerald-700">
            Ready for SOW & PRD Documentation phase
          </p>
        </div>

        {/* KPI 3 */}
        <div className="rounded-3xl border border-blue-200/80 bg-blue-50/30 p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider text-blue-800 uppercase">
              Pending Approval
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black tracking-tight text-blue-950">{totalPending}</p>
          <p className="mt-1 text-[11px] font-medium text-blue-700">
            Under client review / negotiations
          </p>
        </div>

        {/* KPI 4 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
              Estimated Pipeline
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black tracking-tight text-slate-900">
            ₹{(totalPipelineVal / 100000).toFixed(1)}L
          </p>
          <p className="mt-1 text-[11px] font-medium text-slate-500">
            Avg rate: ₹{avgHourlyRate.toLocaleString("en-IN")}/hr
          </p>
        </div>
      </div>

      {/* 3. SEARCH & APPROVAL FILTER */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search estimates by client, service line, quote ID..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 pr-4 pl-11 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-bold text-slate-400 uppercase">
            Approval Filter:
          </span>
          {["All", "Approved", "Sent to Client", "Client Reviewing", "Draft"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedStatus === st
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. CLIENT ESTIMATES LIST */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/70 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
              <tr>
                <th className="py-4 pr-4 pl-6">Client / Estimate ID</th>
                <th className="px-4 py-4">Service Domain</th>
                <th className="px-4 py-4">Total Effort & Timeline</th>
                <th className="px-4 py-4">Modular Cost Breakdown</th>
                <th className="px-4 py-4">Approx Client Cost (₹)</th>
                <th className="px-4 py-4">Client Approval Status</th>
                <th className="py-4 pr-6 pl-4 text-right">Costing Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No estimation records found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const targetId = item.id || item._id!;
                  const category = item.serviceCategory || "Web Development";
                  const status =
                    item.estimateStatus ||
                    (item.stage === "Approved" || item.stage === "Quotation"
                      ? "Approved"
                      : "Draft");
                  const gst = Math.round(item.estimatedValue * 0.18);
                  const grandTotal = item.estimatedValue + gst;

                  return (
                    <tr key={targetId} className="group transition-colors hover:bg-amber-50/20">
                      {/* Client / Estimate ID */}
                      <td className="py-4 pr-4 pl-6">
                        <div className="font-mono text-[11px] font-bold text-amber-700">
                          {item.quotationNumber || targetId}
                        </div>
                        <div className="font-black text-slate-900 transition-colors group-hover:text-amber-700">
                          {item.clientName}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500">
                          {item.contactPerson} {item.clientCompany && `• ${item.clientCompany}`}
                        </div>
                      </td>

                      {/* Service Domain */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                          {serviceIcons[category]}
                          <span>{category}</span>
                        </span>
                        <p className="mt-1 line-clamp-1 max-w-44 text-[11px] text-slate-500">
                          {item.title}
                        </p>
                      </td>

                      {/* Effort & Timeline */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-black text-slate-900">
                          <Clock className="h-3.5 w-3.5 text-amber-600" />
                          <span>{item.totalEffortHours} hrs total</span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500">
                          ~{item.timelineWeeks} delivery weeks
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Rate: ₹{item.hourlyRate || 2500}/hr
                        </div>
                      </td>

                      {/* Modular Breakdown */}
                      <td className="px-4 py-4">
                        <div className="flex max-w-56 flex-wrap gap-1">
                          {(item.estimationModules || []).slice(0, 3).map((m) => (
                            <span
                              key={m.id}
                              className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600"
                              title={`${m.name}: ${m.hours} hrs`}
                            >
                              {m.category || m.name.slice(0, 10)}: {m.hours}h
                            </span>
                          ))}
                          {(item.estimationModules || []).length > 3 && (
                            <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
                              +{(item.estimationModules || []).length - 3} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Total Client Cost */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-black text-slate-900">
                          ₹{item.estimatedValue.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Incl. 18% GST: <strong>₹{grandTotal.toLocaleString("en-IN")}</strong>
                        </div>
                        <div className="text-[10px] font-bold text-emerald-600">
                          {item.targetMarginPercent}% Margin
                        </div>
                      </td>

                      {/* Approval Status */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-1 text-[10px] font-black uppercase ${
                            approvalBadgeStyles[status] || "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {status === "Approved" && <Check className="h-3 w-3" />}
                          <span>{status}</span>
                        </span>

                        <div className="mt-2 flex items-center gap-1">
                          {status !== "Approved" ? (
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(item, "Approved")}
                              title="Client confirmed & approved this estimate"
                              className="cursor-pointer rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                            >
                              ✓ Approve
                            </button>
                          ) : (
                            <Link
                              href={"/dashboard/presales/proposals" as any}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:underline"
                            >
                              <span>Prepare SOW</span>
                              <ChevronRight className="h-3 w-3" />
                            </Link>
                          )}

                          {status === "Draft" && (
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(item, "Sent to Client")}
                              className="cursor-pointer rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 transition-colors hover:bg-blue-100"
                            >
                              Send
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* CALCULATOR / EDIT ESTIMATION */}
                          <button
                            type="button"
                            onClick={() => setCalcItem(item)}
                            title="Adjust Effort Hours & Billing Rate"
                            className="flex cursor-pointer items-center gap-1 rounded-lg border border-amber-200 bg-amber-50/80 px-2.5 py-1.5 text-[11px] font-bold text-amber-800 shadow-2xs transition-all hover:bg-amber-100"
                          >
                            <Calculator className="h-3.5 w-3.5" />
                            <span>Cost Calculator</span>
                          </button>

                          {/* DIRECT SOW LINK IF APPROVED */}
                          {status === "Approved" && (
                            <Link
                              href={"/dashboard/presales/proposals" as any}
                              title="Go to SOW & Document Preparation"
                              className="flex cursor-pointer items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-2xs transition-all hover:bg-indigo-700"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>SOW Prep</span>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: EFFORT CALCULATOR MODAL */}
      <PresalesEffortCalculatorModal
        isOpen={!!calcItem}
        item={calcItem}
        onClose={() => setCalcItem(null)}
        onSave={handleSaveEstimation}
      />

      {/* MODAL 2: CREATE NEW CLIENT ESTIMATE MODAL */}
      {isNewEstimateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-black text-amber-800 uppercase">
                  Presales Costing Form
                </span>
                <h3 className="mt-1 text-xl font-black text-slate-900">
                  Create Client Effort & Cost Estimate
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewEstimateModalOpen(false)}
                className="cursor-pointer rounded-xl p-2 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewEstimate} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Client / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. HealthBridge Clinics"
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Key Contact Person</label>
                  <input
                    type="text"
                    value={newContactPerson}
                    onChange={(e) => setNewContactPerson(e.target.value)}
                    placeholder="e.g. Dr. Arthur Patel"
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Project / Scope Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Patient Booking & Consultation Telehealth Suite"
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">IT Service Line *</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value as ITServiceCategory)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none"
                  >
                    {[
                      "Web Development",
                      "App Development",
                      "SaaS Development",
                      "Digital Marketing",
                      "Branding",
                      "Content Creation",
                      "Performance Marketing",
                      "Consulting",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rates & Weeks */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Hourly Rate (₹/hr)</label>
                  <input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Target Margin (%)</label>
                  <input
                    type="number"
                    value={newMargin}
                    onChange={(e) => setNewMargin(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Est. Weeks</label>
                  <input
                    type="number"
                    value={newWeeks}
                    onChange={(e) => setNewWeeks(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Modular Hours */}
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                <span className="text-[11px] font-black text-slate-500 uppercase">
                  Modular Scope Effort Hours
                </span>
                {newModules.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="flex-1 text-xs font-bold text-slate-700">{m.name}</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={m.hours}
                        onChange={(e) => {
                          const updated = [...newModules];
                          updated[idx].hours = Number(e.target.value) || 0;
                          setNewModules(updated);
                        }}
                        className="h-8 w-20 rounded-lg border border-slate-200 bg-white px-2 text-center text-xs font-bold text-slate-900"
                      />
                      <span className="text-[11px] text-slate-400">hrs</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation Display */}
              <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50/40 p-4 text-xs">
                <div>
                  <span className="text-slate-500">Total Hours:</span>{" "}
                  <strong>{newModules.reduce((s, m) => s + m.hours, 0)} hrs</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Approx Cost:</span>{" "}
                  <strong className="text-base text-amber-950">
                    ₹
                    {(
                      newModules.reduce((s, m) => s + m.hours, 0) * (Number(newRate) || 2500)
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsNewEstimateModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 px-6 py-2 text-xs font-bold text-white shadow-md shadow-amber-600/20 hover:bg-amber-700"
                >
                  Create Estimate
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
