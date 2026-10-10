"use client";

import React, { useState } from "react";
import { X, UserCheck, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface ClientSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (lead: any) => void;
  leads: any[];
}

export function StatusUpdateModal({ isOpen, onClose, onSelect, leads }: ClientSelectModalProps) {
  const [selectedLeadId, setSelectedLeadId] = useState("");

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadId) {
      toast.error("Please select a client to update");
      return;
    }
    const lead = leads.find((l) => l.id === selectedLeadId);
    if (lead) {
      onSelect(lead);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-50 flex w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/5"
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-linear-to-r from-blue-950 via-slate-900 to-indigo-900 px-6 py-5">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-wide text-white">
                    Select Client to Update
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-blue-100 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleProceed} className="p-6">
            <div className="space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-[13px] font-bold text-slate-700">
                  <Target className="h-4 w-4 text-blue-500" /> Client Database
                </label>
                <select
                  value={selectedLeadId}
                  onChange={(e) => setSelectedLeadId(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-[14px] font-medium text-slate-800 transition outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="">-- Choose Client --</option>
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.companyName}
                    </option>
                  ))}
                </select>
                <p className="mt-2 ml-1 text-xs text-slate-500">
                  Selecting a client will open their full profile for editing.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-5 py-2 text-[14px] font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-2 text-[14px] font-black text-white shadow-lg shadow-blue-600/30 transition hover:opacity-90 active:scale-95"
              >
                Fetch Details
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
