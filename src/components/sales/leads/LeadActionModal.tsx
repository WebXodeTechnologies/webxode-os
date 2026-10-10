"use client";

import React, { useState } from "react";
import {
  X,
  HelpCircle,
  Check,
  ChevronDown,
  Building2,
  User,
  MapPin,
  Globe,
  Phone,
  FileText,
  DollarSign,
  Tag,
  CreditCard,
  Briefcase,
  Megaphone,
} from "lucide-react";
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
    type: "Organization",
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    email: "",
    contactPerson: "",
    website: "",
    vatNumber: "",
    gstin: "",
    currency: "",
    currencySymbol: "",
    labels: "",

    // Internal / extra fields
    stage: "Enquiry",
    source: "Inbound",
    value: 0,
  });

  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    if (initialData) {
      setFormData({
        type: initialData.type || "Organization",
        companyName: initialData.companyName || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        zipcode: initialData.zipcode || "",
        country: initialData.country || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        contactPerson: initialData.contactPerson || "",
        website: initialData.website || "",
        vatNumber: initialData.vatNumber || "",
        gstin: initialData.gstin || "",
        currency: initialData.currency || "",
        currencySymbol: initialData.currencySymbol || "",
        labels: initialData.labels || "",
        stage: initialData.stage || "Enquiry",
        source: initialData.source || "Inbound",
        value: initialData.value || 0,
      });
    } else {
      setFormData({
        type: "Organization",
        companyName: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
        email: "",
        contactPerson: "",
        website: "",
        vatNumber: "",
        gstin: "",
        currency: "",
        currencySymbol: "",
        labels: "",
        stage: "Enquiry",
        source: "Inbound",
        value: 0,
      });
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(false);
  };

  const handleSaveClose = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(true);
  };

  const handleSave = (closeAfter: boolean) => {
    if (!formData.companyName) {
      toast.error("Please fill in required fields: Company Name");
      return;
    }

    onSave({
      id: initialData?.id || `LEAD-${Math.floor(Math.random() * 10000)}`,
      ...formData,
      hasGst: !!formData.gstin,
      demoStatus: "Pending",
      lastInteraction: "Lead registered manually",
      tasks: initialData?.tasks || [],
    });

    toast.success(initialData ? "Client updated successfully!" : "Client added successfully!");
    if (closeAfter) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="relative z-50 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-900/5"
        >
          {/* Header Gradient */}
          <div className="relative overflow-hidden bg-linear-to-r from-indigo-950 via-slate-900 to-indigo-900 px-8 py-6">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[80px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md">
                  {initialData ? (
                    <Briefcase className="h-6 w-6" />
                  ) : (
                    <Building2 className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-wide text-white">
                    {initialData ? "Update Client Profile" : "Onboard New Client"}
                  </h2>
                  <p className="mt-1 text-xs font-medium text-indigo-200">
                    WebXode OS • Client Relationship Management
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-indigo-100 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent overflow-y-auto bg-slate-50/50 p-8">
            <div className="mx-auto grid max-w-3xl grid-cols-[180px_1fr] items-start gap-y-7">
              {/* Type */}
              <div className="flex items-center gap-2 pt-2 text-[13px] font-bold text-slate-700">
                <User className="h-4 w-4 text-indigo-500" /> Entity Type
              </div>
              <div className="flex items-center gap-6 pt-2 text-[13px] font-medium text-slate-700">
                <label className="group flex cursor-pointer items-center gap-2 transition hover:text-indigo-600">
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 transition-colors group-hover:border-indigo-500 data-[active=true]:border-indigo-600"
                    data-active={formData.type === "Organization"}
                  >
                    <AnimatePresence>
                      {formData.type === "Organization" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value="Organization"
                    checked={formData.type === "Organization"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  Organization
                </label>
                <label className="group flex cursor-pointer items-center gap-2 transition hover:text-indigo-600">
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 transition-colors group-hover:border-indigo-500 data-[active=true]:border-indigo-600"
                    data-active={formData.type === "Person"}
                  >
                    <AnimatePresence>
                      {formData.type === "Person" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value="Person"
                    checked={formData.type === "Person"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  Person
                </label>
              </div>

              {/* Company name */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Building2 className="h-4 w-4 text-indigo-500" /> Company Name
              </div>
              <div>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Wayne Enterprises"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* Source */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Megaphone className="h-4 w-4 text-indigo-500" /> Lead Source
              </div>
              <div>
                <div className="relative">
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  >
                    <option value="Inbound">Inbound</option>
                    <option value="Referral">Referral</option>
                    <option value="Outbound">Outbound</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Website">Website Form</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 text-indigo-500" /> Address Details
              </div>
              <div className="space-y-4 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
                <div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    rows={2}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-[14px] font-medium text-slate-800 transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-[14px] font-medium text-slate-800 transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-[14px] font-medium text-slate-800 transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                  <input
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    placeholder="Zip/Postal Code"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-[14px] font-medium text-slate-800 transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-[14px] font-medium text-slate-800 transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Phone className="h-4 w-4 text-indigo-500" /> Contact Details
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Contact Name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex rounded-xl border border-slate-200 bg-white shadow-sm transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                    <div className="flex cursor-pointer items-center gap-1 rounded-l-xl border-r border-slate-200 bg-slate-50 px-4 text-[13px] font-medium">
                      🇺🇸 <ChevronDown className="h-3 w-3 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 201-555-0123"
                      className="w-full bg-transparent px-4 py-2.5 text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <div className="relative">
                    <Globe className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-11 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
              </div>

              {/* Tax & Financials */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <FileText className="h-4 w-4 text-indigo-500" /> Financials
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  placeholder="VAT Number"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  placeholder="GST Number"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
                <div className="relative col-span-2">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className={`w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium shadow-sm transition outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${!formData.currency ? "text-slate-400" : "text-slate-800"}`}
                  >
                    <option value="">Default Currency (USD)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 pt-2.5 text-[13px] font-bold text-slate-700">
                <Tag className="h-4 w-4 text-indigo-500" /> Metadata
              </div>
              <div>
                <input
                  type="text"
                  name="labels"
                  value={formData.labels}
                  onChange={handleChange}
                  placeholder="Labels (comma separated)"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-white px-8 py-5">
            {initialData ? (
              <button
                type="button"
                onClick={() => toast.success("Converted to Contact!")}
                className="flex items-center gap-2 rounded-xl border-2 border-emerald-500 bg-emerald-50 px-4 py-2.5 text-[13px] font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                Convert to Contact
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[14px] font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAndContinue}
                className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-[14px] font-bold text-indigo-700 transition hover:bg-indigo-100 hover:shadow-sm"
              >
                Save & Continue
              </button>
              <button
                type="button"
                onClick={handleSaveClose}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-[14px] font-black text-white shadow-lg shadow-indigo-600/30 transition hover:opacity-90 active:scale-95"
              >
                {initialData ? "Update Client" : "Add Client"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
