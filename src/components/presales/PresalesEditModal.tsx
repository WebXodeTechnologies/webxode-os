"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Video,
  FileText,
  DollarSign,
  Calendar,
  Layers,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";
import {
  PresalesItem,
  ITServiceCategory,
  DemoPlatform,
  DemoStatus,
  PresalesPriority,
  PresalesStage,
} from "@/modules/presales/presales.types";

interface PresalesEditModalProps {
  isOpen: boolean;
  item: PresalesItem | null;
  onClose: () => void;
  onSave: (updatedItem: PresalesItem) => void;
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

const DEMO_PLATFORMS: DemoPlatform[] = ["Google Meet", "Microsoft Teams", "Zoom", "In-Person"];

const DEMO_STATUSES: DemoStatus[] = [
  "Scheduled",
  "Completed",
  "POC Presented",
  "Rescheduled",
  "Follow-up Required",
];

const STAGES: PresalesStage[] = [
  "Requirement",
  "Estimation",
  "Proposal",
  "Quotation",
  "Negotiation",
  "Approved",
];

export function PresalesEditModal({ isOpen, item, onClose, onSave }: PresalesEditModalProps) {
  if (!isOpen || !item) return null;

  return (
    <PresalesEditModalContent
      key={item.id || item._id}
      item={item}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function PresalesEditModalContent({
  item,
  onClose,
  onSave,
}: {
  item: PresalesItem;
  onClose: () => void;
  onSave: (updatedItem: PresalesItem) => void;
}) {
  const [clientName, setClientName] = useState(item.clientName || "");
  const [clientCompany, setClientCompany] = useState(item.clientCompany || "");
  const [contactPerson, setContactPerson] = useState(item.contactPerson || "");
  const [email, setEmail] = useState(item.email || "");
  const [phone, setPhone] = useState(item.phone || "");
  const [title, setTitle] = useState(item.title || "");
  const [serviceCategory, setServiceCategory] = useState<ITServiceCategory>(
    item.serviceCategory || "Web Development"
  );
  const [stage, setStage] = useState<PresalesStage>(item.stage || "Requirement");
  const [priority, setPriority] = useState<PresalesPriority>(item.priority || "High");
  const [estimatedValue, setEstimatedValue] = useState(
    item.estimatedValue ? String(item.estimatedValue) : "1500000"
  );
  const [timelineWeeks, setTimelineWeeks] = useState(
    item.timelineWeeks ? String(item.timelineWeeks) : "6"
  );
  const [scopeSummary, setScopeSummary] = useState(item.scopeSummary || "");

  // Demo Details
  const [demoPlatform, setDemoPlatform] = useState<DemoPlatform>(
    item.demo?.platform || "Google Meet"
  );
  const [demoLink, setDemoLink] = useState(item.demo?.meetingLink || "");
  const [demoDate, setDemoDate] = useState(item.demo?.scheduledDate || "");
  const [demoTime, setDemoTime] = useState(item.demo?.scheduledTime || "");
  const [demoStatus, setDemoStatus] = useState<DemoStatus>(item.demo?.status || "Scheduled");
  const [demoAgenda, setDemoAgenda] = useState(item.demo?.agenda || "");
  const [demoNotes, setDemoNotes] = useState(item.demo?.notes || "");
  const [pocUrl, setPocUrl] = useState(item.demo?.pocUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: PresalesItem = {
      ...item,
      clientName,
      clientCompany,
      contactPerson,
      email,
      phone,
      title,
      serviceCategory,
      stage: stage as PresalesItem["stage"],
      priority,
      estimatedValue: Number(estimatedValue) || item.estimatedValue,
      timelineWeeks: Number(timelineWeeks) || item.timelineWeeks,
      scopeSummary,
      demo: {
        platform: demoPlatform,
        meetingLink: demoLink,
        scheduledDate: demoDate,
        scheduledTime: demoTime,
        status: demoStatus,
        agenda: demoAgenda,
        notes: demoNotes,
        pocUrl: pocUrl,
        pocStatus: pocUrl ? "Ready" : item.demo?.pocStatus || "Not Started",
      },
      updatedAt: new Date().toISOString(),
    };

    onSave(updated);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl"
        >
          {/* MODAL HEADER */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-8 py-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700 uppercase">
                  {item.quotationNumber || item.id}
                </span>
                <span className="text-xs font-bold text-slate-400">• Presales Edit Mode</span>
              </div>
              <h2 className="mt-1 text-xl font-black text-slate-900">
                Update Customer Presales & Demo Details
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl p-2 text-slate-400 hover:bg-slate-200/50 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* FORM BODY */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-7 overflow-y-auto px-8 py-6">
            {/* 1. CUSTOMER IDENTITY & CONTACT */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-black tracking-wider text-slate-400 uppercase">
                <Layers className="h-3.5 w-3.5 text-indigo-500" />
                1. Customer & Company Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Client / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Registered Entity / Company
                  </label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="e.g. Acme Technologies Inc"
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    IT Service Category *
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value as ITServiceCategory)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  >
                    {IT_SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. PROJECT SCOPE & PROPOSAL DETAILS */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-black tracking-wider text-slate-400 uppercase">
                <FileText className="h-3.5 w-3.5 text-blue-500" />
                2. Project Scope & Solution Title
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Solution Scope Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Scope Overview / Problem Statement
                  </label>
                  <textarea
                    rows={2}
                    value={scopeSummary}
                    onChange={(e) => setScopeSummary(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. TECHNICAL DEMO & POC SPECIFICATION */}
            <div className="space-y-4 rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5">
              <h3 className="flex items-center gap-2 text-xs font-black tracking-wider text-indigo-900 uppercase">
                <Video className="h-3.5 w-3.5 text-indigo-600" />
                3. Technical Demo & Proof of Concept (POC)
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Demo Platform</label>
                  <select
                    value={demoPlatform}
                    onChange={(e) => setDemoPlatform(e.target.value as DemoPlatform)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                  >
                    {DEMO_PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Meeting Link (Meet/Teams)
                  </label>
                  <input
                    type="url"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    placeholder="https://meet.google.com/... or Teams"
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Demo Status</label>
                  <select
                    value={demoStatus}
                    onChange={(e) => setDemoStatus(e.target.value as DemoStatus)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                  >
                    {DEMO_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Scheduled Date</label>
                  <input
                    type="date"
                    value={demoDate}
                    onChange={(e) => setDemoDate(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Scheduled Time</label>
                  <input
                    type="text"
                    value={demoTime}
                    onChange={(e) => setDemoTime(e.target.value)}
                    placeholder="e.g. 15:30 IST"
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">POC Prototype URL</label>
                  <input
                    type="url"
                    value={pocUrl}
                    onChange={(e) => setPocUrl(e.target.value)}
                    placeholder="https://figma.com/... or staging"
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600">
                  Demo Outcome & Client Feedback Notes
                </label>
                <textarea
                  rows={2}
                  value={demoNotes}
                  onChange={(e) => setDemoNotes(e.target.value)}
                  placeholder="Record customer questions, technical validation, and next action items..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 4. COMMERCIAL PRICING & STAGE */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-black tracking-wider text-slate-400 uppercase">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                4. Commercial Terms & Presales Stage
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">
                    Commercial Quote Value (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Timeline (Weeks)</label>
                  <input
                    type="number"
                    value={timelineWeeks}
                    onChange={(e) => setTimelineWeeks(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Presales Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as PresalesStage)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as PresalesPriority)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  >
                    {["Critical", "High", "Medium", "Standard"].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
