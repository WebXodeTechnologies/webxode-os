"use client";

import React, { useState } from "react";
import { X, UserPlus, Building2, Phone, Mail, Calendar, Send, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface LeadActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadData: any) => void;
  initialData?: any;
}

export function LeadActionModal({ isOpen, onClose, onSave, initialData }: LeadActionModalProps) {
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || "",
    contactPerson: initialData?.contactPerson || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    value: initialData?.value || 0,
    stage: initialData?.stage || "Enquiry",
    source: initialData?.source || "Inbound",
    demoDate: "",
    sendInviteMail: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.phone) {
      toast.error("Please fill in required fields: Company, Contact Person, and Phone.");
      return;
    }

    if (formData.sendInviteMail && formData.email) {
      toast.success(`Invite & Introduction email sent to ${formData.email}!`);
    }

    let finalStage = formData.stage;
    if (formData.demoDate) {
      toast.success(`Demo booked for ${formData.demoDate}! Presales team notified.`);
      finalStage = "Closed for Demo";
    }

    onSave({
      id: initialData?.id || `LEAD-${Math.floor(Math.random() * 10000)}`,
      ...formData,
      stage: finalStage,
      hasGst: initialData?.hasGst || false,
      demoStatus: formData.demoDate ? "Scheduled" : "Pending",
      lastInteraction: "Lead registered by Sales Rep",
      tasks: initialData?.tasks || [],
    });

    toast.success(initialData ? "Lead updated successfully!" : "New Lead registered successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-50 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {initialData ? "Edit Client Lead" : "Register New Client"}
                </h2>
                <p className="text-xs font-semibold text-slate-500">Sales Engine Action Center</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Building2 className="h-4 w-4 text-indigo-600" /> Client Details
                </h3>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="e.g. Acme Corp"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Phone className="h-3.5 w-3.5 text-slate-400" /> Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      placeholder="+91..."
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Mail className="h-3.5 w-3.5 text-slate-400" /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Info className="h-4 w-4 text-indigo-600" /> Lead Funnel & Actions
                </h3>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Lead Stage
                  </label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  >
                    <option value="Enquiry">Enquiry</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Unqualified">Unqualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Closed for Demo">Closed for Demo</option>
                    <option value="Lost/Dead">Lost/Dead</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Estimated Value (₹)
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="0.00"
                  />
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                    <Calendar className="h-3.5 w-3.5 text-indigo-500" /> Book Demo (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    name="demoDate"
                    value={formData.demoDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-900 transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />
                  <p className="mt-2 text-[10px] font-semibold text-indigo-600/70">
                    Booking a demo automatically moves stage to &quot;Closed for Demo&quot; and
                    notifies Presales.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  name="sendInviteMail"
                  checked={formData.sendInviteMail}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                />
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Send className="h-3.5 w-3.5 text-indigo-500" /> Send Invite/Intro Email
                </span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 hover:shadow-indigo-600/30 active:scale-95"
                >
                  {initialData ? "Save Changes" : "Register Lead"}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
