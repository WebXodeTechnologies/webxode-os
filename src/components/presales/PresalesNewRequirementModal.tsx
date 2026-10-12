"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Sparkles, Check, Layers, AlertCircle } from "lucide-react";
import {
  PresalesItem,
  PresalesPriority,
  ITServiceCategory,
  DemoPlatform,
} from "@/modules/presales/presales.types";

interface PresalesNewRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: Partial<PresalesItem>) => void;
}

const IT_SERVICES: ITServiceCategory[] = [
  "Web Development",
  "App Development",
  "SaaS Development",
  "Digital Marketing",
  "Branding",
  "Content Creation",
  "Performance Marketing",
  "Consulting",
];

const COMMON_TECH_STACK = [
  "Next.js 15",
  "React 19",
  "Node.js",
  "Python",
  "FastAPI",
  "PyTorch / AI",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker / K8s",
  "AWS",
  "Tailwind CSS",
];

const ARCHITECTS = [
  { name: "Vikram Malhotra", role: "Principal Solutions Architect" },
  { name: "Priya Sharma", role: "Lead Systems Architect" },
  { name: "Arjun Nair", role: "Creative Technologist & Architect" },
];

export function PresalesNewRequirementModal({
  isOpen,
  onClose,
  onSubmit,
}: PresalesNewRequirementModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [serviceCategory, setServiceCategory] = useState<ITServiceCategory>("Web Development");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<PresalesPriority>("High");
  const [demoPlatform, setDemoPlatform] = useState<DemoPlatform>("Google Meet");
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("1500000");
  const [timelineWeeks, setTimelineWeeks] = useState("6");
  const [scopeSummary, setScopeSummary] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([
    "Next.js 15",
    "Node.js",
    "TypeScript",
  ]);
  const [objectives, setObjectives] = useState<string[]>([
    "Modernize legacy workflow with high-availability microservices",
    "Reduce operational turnaround by 50%",
  ]);
  const [newObjective, setNewObjective] = useState("");
  const [architectIndex, setArchitectIndex] = useState(0);

  if (!isOpen) return null;

  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective("");
    }
  };

  const removeObjective = (idx: number) => {
    setObjectives(objectives.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !title) return;

    const val = Number(estimatedValue) || 1000000;
    const weeks = Number(timelineWeeks) || 6;
    const architect = ARCHITECTS[architectIndex];

    onSubmit({
      clientName,
      clientCompany: clientCompany || clientName,
      contactPerson: contactPerson || "Key Stakeholder",
      email: email || "contact@" + clientName.toLowerCase().replace(/\s+/g, "") + ".com",
      phone: phone || "+91 98000 00000",
      title,
      serviceCategory,
      priority,
      estimatedValue: val,
      timelineWeeks: weeks,
      totalEffortHours: Math.round(val / 2500),
      hourlyRate: 2500,
      targetMarginPercent: 38,
      stage: "Requirement",
      scopeSummary:
        scopeSummary ||
        `Initial business requirement and architecture specification for ${clientName}.`,
      techStack: selectedTech,
      businessObjectives: objectives,
      demo: {
        platform: demoPlatform,
        meetingLink: "",
        scheduledDate: demoDate || new Date().toISOString().split("T")[0],
        scheduledTime: demoTime || "15:00 IST",
        status: "Scheduled",
        agenda: `Technical discovery & prototype walkthrough for ${serviceCategory}`,
        notes: "Appointment booked from sales team. Pending initial technical discovery.",
        pocStatus: "Drafting",
      },
      checklist: [
        {
          id: "chk-1",
          title: "Client Problem Statement & Scoping Traceability",
          category: "Discovery",
          completed: true,
        },
        {
          id: "chk-2",
          title: "Technical Demo & Solution Architecture Walkthrough",
          category: "Discovery",
          completed: false,
        },
        {
          id: "chk-3",
          title: "Interactive UI/UX Wireframe or Prototype Approval",
          category: "UI/UX Prototype",
          completed: false,
        },
        {
          id: "chk-4",
          title: "Commercial Quotation & Effort Rate Matrix Finalized",
          category: "Commercial & SOW",
          completed: false,
        },
        {
          id: "chk-5",
          title: "Statement of Work (SOW) Scope & Milestone Schedule",
          category: "Commercial & SOW",
          completed: false,
        },
        {
          id: "chk-6",
          title: "Dev Phase Kickoff Handover Sign-off",
          category: "Delivery Signoff",
          completed: false,
        },
      ],
      tasks: [
        {
          id: "tsk-1",
          title: `Prepare ${serviceCategory} architecture spec deck`,
          assignee: architect.name,
          dueDate: "2026-10-18",
          status: "In Progress",
          priority: "High",
        },
      ],
      solutionArchitect: {
        name: architect.name,
        role: architect.role,
        avatar: "/images/avatars/presales.png",
      },
      deliverables: [
        {
          title: "Technical Discovery & Requirement Traceability Matrix",
          estimatedWeeks: 2,
          description: "Detailed scoping document and sprint delivery plan.",
          deliverableType: "Documentation",
        },
        {
          title: "Core Platform MVP Build & Integrations",
          estimatedWeeks: Math.max(2, weeks - 2),
          description: "Core features implementation with automated test coverage.",
          deliverableType: "Code",
        },
      ],
      estimationModules: [
        {
          id: "mod-1",
          name: "Core Architectural Setup & UI Components",
          hours: Math.round(val / 5000),
          ratePerHour: 2500,
          description: "Foundation framework, state store, and design tokens.",
          category: "Frontend",
        },
        {
          id: "mod-2",
          name: "API Microservices & Database Schema",
          hours: Math.round(val / 5000),
          ratePerHour: 2500,
          description: "Data modeling, security middlewares, and business logic.",
          category: "Backend",
        },
      ],
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
      quotationNumber: `WX-Q-2026-${Math.floor(100 + Math.random() * 900)}`,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
                  <Sparkles className="h-3 w-3" />
                  Presales Scoping
                </span>
                <span className="text-xs font-bold text-slate-400">• New Intake</span>
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-900">New Presales Requirement</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Row 1: Client & Contact */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Client / Enterprise Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nexus Global"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Registered Entity / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nexus Innovations Inc"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Primary Contact Person
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan (CTO)"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* IT Service Category & Demo Platform */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  IT Service Line *
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value as ITServiceCategory)}
                  className="mt-1.5 h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  {IT_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Demo Platform
                </label>
                <select
                  value={demoPlatform}
                  onChange={(e) => setDemoPlatform(e.target.value as DemoPlatform)}
                  className="mt-1.5 h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Zoom">Zoom</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Demo Target Date
                </label>
                <input
                  type="date"
                  value={demoDate}
                  onChange={(e) => setDemoDate(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: Title & Priority */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Solution / Opportunity Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise AI Knowledge Graph & Search Engine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PresalesPriority)}
                  className="mt-1.5 h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
            </div>

            {/* Row 3: Commercial Budget & Timeline */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Estimated Budget (₹)
                </label>
                <input
                  type="number"
                  placeholder="1500000"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Timeline (Weeks)
                </label>
                <input
                  type="number"
                  placeholder="6"
                  value={timelineWeeks}
                  onChange={(e) => setTimelineWeeks(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                  Assigned Architect
                </label>
                <select
                  value={architectIndex}
                  onChange={(e) => setArchitectIndex(Number(e.target.value))}
                  className="mt-1.5 h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  {ARCHITECTS.map((a, idx) => (
                    <option key={a.name} value={idx}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scope Summary */}
            <div>
              <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                Scope Summary & Problem Statement
              </label>
              <textarea
                rows={3}
                placeholder="Describe client's core requirements, constraints, current tech stack, and goals..."
                value={scopeSummary}
                onChange={(e) => setScopeSummary(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Tech Stack Selector */}
            <div>
              <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                Required Technology Stack ({selectedTech.length} selected)
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {COMMON_TECH_STACK.map((tech) => {
                  const isSelected = selectedTech.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-2xs"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-indigo-600" />}
                      <span>{tech}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Business Objectives */}
            <div>
              <label className="text-[11px] font-black tracking-wider text-slate-500 uppercase">
                Key Business Objectives
              </label>
              <div className="mt-2 space-y-2">
                {objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    <span>• {obj}</span>
                    <button
                      type="button"
                      onClick={() => removeObjective(i)}
                      className="cursor-pointer text-slate-400 hover:text-rose-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an objective (e.g. Cut cloud spend by 30%)..."
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addObjective();
                      }
                    }}
                    className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addObjective}
                    className="flex h-10 cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="h-11 cursor-pointer rounded-2xl border border-slate-200 px-5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex h-11 cursor-pointer items-center gap-2 rounded-2xl bg-indigo-600 px-6 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                <span>Initialize Presales Record</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
