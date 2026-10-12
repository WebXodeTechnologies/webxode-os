"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  Building,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  Code,
  Users,
  Palette,
  Cloud,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { ProjectItem } from "@/modules/projects/project.types";

interface ProjectCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCustom: (data: Partial<ProjectItem>) => Promise<void>;
}

export function ProjectCreateModal({ isOpen, onClose, onSubmitCustom }: ProjectCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientContactPerson, setClientContactPerson] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [serviceCategory, setServiceCategory] = useState("webdev");
  const [phase, setPhase] = useState("In Development");
  const [techStackInput, setTechStackInput] = useState("Next.js 15, TypeScript, Node.js, AWS");
  const [budgetHours, setBudgetHours] = useState(480);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [targetLaunchDate, setTargetLaunchDate] = useState("2026-12-15");
  const [summary, setSummary] = useState("");

  // Team Personnel
  const [projectManager, setProjectManager] = useState("Sarah Jenkins");
  const [techLead, setTechLead] = useState("David Chen");
  const [frontendDevs, setFrontendDevs] = useState("Alex Rivera");
  const [backendDevs, setBackendDevs] = useState("Tariq Mansoor");
  const [leadDesigner, setLeadDesigner] = useState(""); // OPTIONAL!
  const [devOpsEngineer, setDevOpsEngineer] = useState("Viktor Vane");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !clientName.trim()) {
      toast.error("Please fill in project title and client name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const techStack = techStackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Build team members array
      const teamMembers: any[] = [];
      if (projectManager.trim()) {
        teamMembers.push({
          id: `tm_${Date.now()}_pm`,
          name: projectManager.trim(),
          role: "Project Manager",
          email: `${projectManager.toLowerCase().replace(/\s+/g, ".")}@webxode.com`,
          allocationPercent: 100,
        });
      }
      if (techLead.trim()) {
        teamMembers.push({
          id: `tm_${Date.now()}_tl`,
          name: techLead.trim(),
          role: "Tech Lead",
          email: `${techLead.toLowerCase().replace(/\s+/g, ".")}@webxode.com`,
          allocationPercent: 100,
        });
      }
      if (frontendDevs.trim()) {
        frontendDevs
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean)
          .forEach((feName, i) => {
            teamMembers.push({
              id: `tm_${Date.now()}_fe_${i}`,
              name: feName,
              role: "Frontend Developer",
              email: `${feName.toLowerCase().replace(/\s+/g, ".")}@webxode.com`,
              allocationPercent: 100,
            });
          });
      }
      if (backendDevs.trim()) {
        backendDevs
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean)
          .forEach((beName, i) => {
            teamMembers.push({
              id: `tm_${Date.now()}_be_${i}`,
              name: beName,
              role: "Backend Developer",
              email: `${beName.toLowerCase().replace(/\s+/g, ".")}@webxode.com`,
              allocationPercent: 100,
            });
          });
      }
      // Lead Designer is OPTIONAL
      if (leadDesigner.trim()) {
        teamMembers.push({
          id: `tm_${Date.now()}_des`,
          name: leadDesigner.trim(),
          role: "UI/UX Designer",
          email: `${leadDesigner.toLowerCase().replace(/\s+/g, ".")}@webxode.com`,
          allocationPercent: 50,
        });
      }
      if (devOpsEngineer.trim()) {
        teamMembers.push({
          id: `tm_${Date.now()}_ops`,
          name: devOpsEngineer.trim(),
          role: "DevOps Engineer",
          email: `${devOpsEngineer.toLowerCase().replace(/\s+/g, ".")}@webxode.com`,
          allocationPercent: 50,
        });
      }

      await onSubmitCustom({
        title,
        clientName,
        clientContactPerson,
        clientEmail,
        serviceCategory: serviceCategory as any,
        phase: phase as any,
        status: "On Track",
        progress: 10,
        budgetHours: Number(budgetHours),
        consumedHours: 0,
        hourlyRate: Number(hourlyRate),
        contractValue: Number(budgetHours) * Number(hourlyRate),
        currency: "USD",
        startDate: new Date().toISOString().split("T")[0],
        targetLaunchDate,
        summary: summary || `Engineered digital delivery for ${clientName}.`,
        techStack,
        projectManager,
        techLead,
        leadDesigner: leadDesigner.trim() || undefined,
        teamMembers,
      });

      toast.success("Project and Engineering Team successfully configured!");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-2xl"
        >
          {/* Top Banner */}
          <div className="relative border-b border-slate-100 bg-slate-50/80 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-indigo-700 uppercase">
                    Project Initiation Gate
                  </span>
                  <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
                </div>
                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  Initiate New Project & DevPhase
                </h2>
                <p className="text-xs text-slate-500">
                  Configure project baseline, scope, developers, and optional designers.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Form */}
          <form onSubmit={handleSubmit} className="max-h-[75vh] space-y-6 overflow-y-auto p-8">
            {/* Section 1: Client & Project Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-black tracking-wider text-indigo-600 uppercase">
                1. Project & Client Baseline
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Next.js 15 B2B Freight Platform"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Global Logistics Inc"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Client Contact Person
                  </label>
                  <input
                    type="text"
                    value={clientContactPerson}
                    onChange={(e) => setClientContactPerson(e.target.value)}
                    placeholder="e.g. Marcus Vance (VP Engineering)"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Client Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. client@company.com"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Service Category</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  >
                    <option value="webdev">Web Apps & Platforms</option>
                    <option value="mobile">Mobile (iOS & Android)</option>
                    <option value="cloud_devops">Cloud & DevOps IaC</option>
                    <option value="ai_data">AI & Data Solutions</option>
                    <option value="uiux">UI/UX & Design Systems</option>
                    <option value="saas">Enterprise SaaS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Initial Phase</label>
                  <select
                    value={phase}
                    onChange={(e) => setPhase(e.target.value)}
                    className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  >
                    <option value="Discovery">Discovery & Architecture</option>
                    <option value="In Development">In Development (Sprints)</option>
                    <option value="QA & UAT">QA & UAT Testing</option>
                    <option value="Staging">Staging Deployment</option>
                    <option value="Production">Production Live</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Target Launch Date
                  </label>
                  <input
                    type="date"
                    value={targetLaunchDate}
                    onChange={(e) => setTargetLaunchDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Budget Hours Allocated
                  </label>
                  <input
                    type="number"
                    value={budgetHours}
                    onChange={(e) => setBudgetHours(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Blended Hourly Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="Next.js 15, TypeScript, Node.js, Docker, AWS"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Section 2: Developers & Designers Assignment */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black tracking-wider text-indigo-600 uppercase">
                  2. Assigned Engineering Team & Personnel
                </h3>
                <span className="text-[10px] font-bold text-slate-400">Designers are optional</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Project Manager *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectManager}
                    onChange={(e) => setProjectManager(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Tech Lead *</label>
                  <input
                    type="text"
                    required
                    value={techLead}
                    onChange={(e) => setTechLead(e.target.value)}
                    placeholder="e.g. David Chen"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Frontend Developers (comma separated)
                  </label>
                  <input
                    type="text"
                    value={frontendDevs}
                    onChange={(e) => setFrontendDevs(e.target.value)}
                    placeholder="e.g. Alex Rivera, Siddharth Rao"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Backend Developers (comma separated)
                  </label>
                  <input
                    type="text"
                    value={backendDevs}
                    onChange={(e) => setBackendDevs(e.target.value)}
                    placeholder="e.g. Tariq Mansoor, Priya Sharma"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Lead UI/UX Designer
                    </label>
                    <span className="py-0.2 rounded bg-indigo-50 px-1.5 text-[10px] font-bold text-indigo-500">
                      Optional
                    </span>
                  </div>
                  <input
                    type="text"
                    value={leadDesigner}
                    onChange={(e) => setLeadDesigner(e.target.value)}
                    placeholder="e.g. Elena Rostova (Leave blank if pure backend/infra)"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    DevOps / Cloud Engineer
                  </label>
                  <input
                    type="text"
                    value={devOpsEngineer}
                    onChange={(e) => setDevOpsEngineer(e.target.value)}
                    placeholder="e.g. Viktor Vane"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-2 border-t border-slate-100 pt-2">
              <label className="block text-xs font-bold text-slate-700">
                Scope Summary & Technical Objectives
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of engineering objectives, deliverables, and architecture milestones..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                <span>Initiate Project</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
