"use client";

import React, { useState, useEffect } from "react";
import { Target, X, CheckCircle2, ArrowRight, DollarSign, Calendar, FileText } from "lucide-react";
import { toast } from "@/lib/toast";
import { FollowUpItem } from "./FollowUpsTable";

interface FollowUpStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: FollowUpItem | null;
  onSaveStageUpdate: (
    id: string,
    newStage: FollowUpItem["stage"],
    dealValue: string,
    notes: string
  ) => void;
}

const STAGES: FollowUpItem["stage"][] = [
  "New Lead",
  "Contacted",
  "Discovery Call",
  "Proposal Sent",
  "Contract Negotiation",
  "Closed Won",
];

export function FollowUpStageModal({
  isOpen,
  onClose,
  selectedItem,
  onSaveStageUpdate,
}: FollowUpStageModalProps) {
  const [prevItemId, setPrevItemId] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<FollowUpItem["stage"]>("Discovery Call");
  const [dealValue, setDealValue] = useState("₹1,50,000");
  const [notes, setNotes] = useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("2026-10-18");

  if (selectedItem && selectedItem.id !== prevItemId) {
    setPrevItemId(selectedItem.id);
    setCurrentStage(selectedItem.stage);
    setDealValue(selectedItem.dealValue || "₹1,50,000");
  }

  if (!isOpen || !selectedItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveStageUpdate(selectedItem.id, currentStage, dealValue, notes);
    toast.success("Lead Stage Updated", {
      description: `${selectedItem.contactName} is now in '${currentStage}' stage.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
              <Target className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Update Funnel Stage</h3>
              <p className="text-xs font-semibold text-slate-500">
                {selectedItem.contactName} ({selectedItem.company})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Visual Pipeline Progress */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Pipeline Progression
          </span>
          <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {STAGES.map((stg, idx) => {
              const isCurrent = currentStage === stg;
              const isPassed = STAGES.indexOf(currentStage) > idx;

              return (
                <button
                  key={stg}
                  type="button"
                  onClick={() => setCurrentStage(stg)}
                  className={`flex flex-col items-center rounded-xl p-2 text-center transition-all ${
                    isCurrent
                      ? "border-2 border-indigo-600 bg-indigo-50/80 text-indigo-700 shadow-2xs"
                      : isPassed
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <div className="text-[10px] font-black">{idx + 1}</div>
                  <div className="mt-1 line-clamp-2 text-[10px] leading-tight font-bold">{stg}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700">Target Stage *</label>
              <select
                value={currentStage}
                onChange={(e) => setCurrentStage(e.target.value as FollowUpItem["stage"])}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Estimated Deal Value</label>
              <div className="relative mt-1">
                <DollarSign className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={dealValue}
                  onChange={(e) => setDealValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-2 pr-3 pl-8 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">
              Stage Transition Rationale / Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Client agreed on MVP scope. Sending official scope of work and quotation."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Schedule Next Follow-up Date</label>
            <input
              type="date"
              value={nextFollowUpDate}
              onChange={(e) => setNextFollowUpDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4" /> Confirm Stage Transition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
