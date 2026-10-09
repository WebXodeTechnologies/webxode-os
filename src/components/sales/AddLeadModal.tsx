"use client";

import React, { useState } from "react";
import { LeadSource, LeadStage } from "@/types/sales";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, X, UserPlus, FileText, CheckCircle2, DollarSign } from "lucide-react";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    hasGst: boolean;
    gstin?: string;
    value: number;
    stage: LeadStage;
    source: LeadSource;
    salesPerson: string;
    lastInteraction: string;
  }) => void;
}

export function AddLeadModal({ isOpen, onClose, onSubmit }: AddLeadModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasGst, setHasGst] = useState(true);
  const [gstin, setGstin] = useState("");
  const [value, setValue] = useState("");
  const [source, setSource] = useState<LeadSource>("Marketing");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      companyName,
      contactPerson,
      email,
      phone,
      hasGst,
      gstin: hasGst ? gstin : undefined,
      value: Number(value) || 350000,
      stage: "Enquiry",
      source,
      salesPerson: "Akash S M",
      lastInteraction: `Lead created from source: ${source}`,
    });
    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setPhone("");
    setGstin("");
    setValue("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900">
                    New Client Lead
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    Enter pipeline data and verification details
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-6">
              <div className="space-y-6">
                {/* Core Info */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute top-2.5 left-3.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm font-bold text-slate-900 shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Ananya Ramesh"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98423..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pipeline Info */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Lead Source
                    </label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value as LeadSource)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Marketing">Marketing Campaign</option>
                      <option value="Raw Data">Raw Data Lead</option>
                      <option value="GMD Data">GMD Data</option>
                      <option value="Scraping">Web Scraping</option>
                      <option value="Direct Referral">Direct Referral</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Est. Pipeline Value (₹)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute top-2.5 left-3.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="350000"
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm font-bold text-slate-900 shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* GST Section */}
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">GST Registration</h4>
                      <p className="text-[11px] font-semibold text-slate-500">
                        Required for invoicing & taxation
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setHasGst(true)}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-colors ${hasGst ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        Registered
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasGst(false)}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-colors ${!hasGst ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        Unregistered
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {hasGst && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                            GSTIN Number
                          </label>
                          <div className="relative">
                            <FileText className="absolute top-2.5 left-3.5 h-4 w-4 text-slate-400" />
                            <input
                              type="text"
                              required={hasGst}
                              value={gstin}
                              onChange={(e) => setGstin(e.target.value)}
                              placeholder="e.g. 33AABCA1234F1ZP"
                              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-4 pl-9 text-sm font-bold text-slate-900 uppercase shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-indigo-700 hover:shadow-md active:scale-95"
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>Create Lead</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
