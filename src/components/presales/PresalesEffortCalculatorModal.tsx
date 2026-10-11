"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calculator,
  Plus,
  Trash2,
  TrendingUp,
  Percent,
  Clock,
  Check,
  Sparkles,
} from "lucide-react";
import { PresalesItem, EstimationModule } from "@/modules/presales/presales.types";

interface PresalesEffortCalculatorModalProps {
  isOpen: boolean;
  item: PresalesItem | null;
  onClose: () => void;
  onSave: (
    itemId: string,
    modules: EstimationModule[],
    hourlyRate: number,
    targetMarginPercent: number
  ) => void;
}

export function PresalesEffortCalculatorModal({
  isOpen,
  item,
  onClose,
  onSave,
}: PresalesEffortCalculatorModalProps) {
  if (!isOpen || !item) return null;

  return (
    <PresalesEffortCalculatorForm
      key={item.id || item._id}
      item={item}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function PresalesEffortCalculatorForm({
  item,
  onClose,
  onSave,
}: {
  item: PresalesItem;
  onClose: () => void;
  onSave: (
    itemId: string,
    modules: EstimationModule[],
    hourlyRate: number,
    targetMarginPercent: number
  ) => void;
}) {
  const [modules, setModules] = useState<EstimationModule[]>(
    item.estimationModules.length > 0
      ? [...item.estimationModules]
      : [
          {
            id: "mod-1",
            name: "Frontend Web Application & Responsive Views",
            hours: 120,
            ratePerHour: item.hourlyRate || 2500,
            description: "Core UI/UX, states, and client validation",
            category: "Frontend",
          },
          {
            id: "mod-2",
            name: "Backend Microservices & Database API Layer",
            hours: 140,
            ratePerHour: item.hourlyRate || 2500,
            description: "REST/GraphQL endpoints, database indexing",
            category: "Backend",
          },
        ]
  );

  const [hourlyRate, setHourlyRate] = useState<number>(item.hourlyRate || 2500);
  const [marginPercent, setMarginPercent] = useState<number>(item.targetMarginPercent || 38);

  // New module temporary state
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleCategory, setNewModuleCategory] =
    useState<EstimationModule["category"]>("Backend");
  const [newModuleHours, setNewModuleHours] = useState(40);

  const handleHourChange = (index: number, newHours: number) => {
    const updated = [...modules];
    updated[index].hours = Math.max(0, newHours);
    setModules(updated);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const addModule = () => {
    if (!newModuleName.trim()) return;
    setModules([
      ...modules,
      {
        id: `mod-${Date.now()}`,
        name: newModuleName.trim(),
        hours: Number(newModuleHours) || 20,
        ratePerHour: hourlyRate,
        description: "Custom solution module added during presales estimation review.",
        category: newModuleCategory,
      },
    ]);
    setNewModuleName("");
    setNewModuleHours(40);
  };

  // Financial calculations
  const totalHours = modules.reduce((sum, m) => sum + (Number(m.hours) || 0), 0);
  const subtotalPrice = totalHours * hourlyRate;
  const internalCost = Math.round(subtotalPrice * (1 - marginPercent / 100));
  const estimatedProfit = subtotalPrice - internalCost;
  const gstAmount = Math.round(subtotalPrice * 0.18);
  const finalPriceWithGst = subtotalPrice + gstAmount;

  const handleSave = () => {
    onSave(item.id || item._id!, modules, hourlyRate, marginPercent);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-black text-amber-700 uppercase">
                  <Calculator className="h-3 w-3" />
                  Effort & Cost Engine
                </span>
                <span className="text-xs font-bold text-slate-400">• {item.clientName}</span>
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-900">
                Solution Estimation & Rate Calculator
              </h2>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                {item.title} ({item.quotationNumber})
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Rate & Margin Sliders */}
          <div className="mt-6 grid grid-cols-1 gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-5 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Blended Billing Rate / Hour (₹)
                </label>
                <span className="font-mono text-sm font-black text-indigo-600">
                  ₹{hourlyRate.toLocaleString("en-IN")}/hr
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="6000"
                step="100"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600"
              />
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-400">
                <span>₹1,500 (Standard)</span>
                <span>₹3,500 (Senior)</span>
                <span>₹6,000 (Principal/AI)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Target Gross Margin (%)</label>
                <span className="font-mono text-sm font-black text-emerald-600">
                  {marginPercent}% Margin
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="1"
                value={marginPercent}
                onChange={(e) => setMarginPercent(Number(e.target.value))}
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600"
              />
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-400">
                <span>15% (Competitive)</span>
                <span>35% (Target)</span>
                <span>60% (High Value)</span>
              </div>
            </div>
          </div>

          {/* Module Breakdown List */}
          <div className="mt-6">
            <h3 className="text-xs font-black tracking-wider text-slate-500 uppercase">
              Modular Effort Breakdown ({modules.length} Modules)
            </h3>

            <div className="mt-3 space-y-3">
              {modules.map((mod, index) => {
                const modSubtotal = (Number(mod.hours) || 0) * hourlyRate;
                return (
                  <div
                    key={mod.id || index}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all hover:border-slate-300 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-extrabold text-indigo-700 uppercase">
                          {mod.category}
                        </span>
                        <h4 className="text-xs font-black text-slate-900">{mod.name}</h4>
                      </div>
                      <p className="mt-1 text-[11px] font-medium text-slate-500">
                        {mod.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Hours Input */}
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          max="2000"
                          value={mod.hours}
                          onChange={(e) => handleHourChange(index, Number(e.target.value))}
                          className="h-9 w-20 rounded-xl border border-slate-200 bg-slate-50 px-2 text-center text-xs font-black text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                        />
                        <span className="text-[11px] font-bold text-slate-400">hrs</span>
                      </div>

                      {/* Subtotal */}
                      <div className="w-28 text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Amount
                        </span>
                        <p className="font-mono text-xs font-black text-slate-900">
                          ₹{modSubtotal.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeModule(index)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-slate-300 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Add Module Bar */}
            <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-dashed border-slate-300 p-3 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="New module title (e.g. AI Prompt Optimization & Cache)..."
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
              <select
                value={newModuleCategory}
                onChange={(e) => setNewModuleCategory(e.target.value as any)}
                className="h-10 cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="AI / ML">AI / ML</option>
                <option value="DevOps / Infra">DevOps / Infra</option>
                <option value="QA & Testing">QA & Testing</option>
                <option value="Project Management">Project Management</option>
              </select>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="5"
                  value={newModuleHours}
                  onChange={(e) => setNewModuleHours(Number(e.target.value))}
                  className="h-10 w-20 rounded-xl border border-slate-200 bg-slate-50 px-2 text-center text-xs font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
                <span className="text-[11px] font-bold text-slate-400">hrs</span>
              </div>
              <button
                type="button"
                onClick={addModule}
                className="flex h-10 cursor-pointer items-center justify-center gap-1 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white hover:bg-indigo-600"
              >
                <Plus className="h-4 w-4" />
                <span>Add Module</span>
              </button>
            </div>
          </div>

          {/* Real-Time Commercial Financial Summary Card */}
          <div className="mt-8 rounded-3xl border border-indigo-100 bg-linear-to-br from-indigo-50/50 via-white to-blue-50/50 p-6 shadow-xs">
            <h4 className="text-xs font-black tracking-wider text-indigo-700 uppercase">
              Live Commercial Calculation Matrix
            </h4>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Total Effort
                </span>
                <p className="mt-0.5 text-lg font-black text-slate-900">{totalHours} hrs</p>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Subtotal (Excl. Tax)
                </span>
                <p className="mt-0.5 text-lg font-black text-slate-900">
                  ₹{subtotalPrice.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Est. Delivery Cost
                </span>
                <p className="mt-0.5 text-lg font-black text-slate-500">
                  ₹{internalCost.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                  Gross Profit ({marginPercent}%)
                </span>
                <p className="mt-0.5 text-lg font-black text-emerald-700">
                  ₹{estimatedProfit.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
                  Final Quote (Inc. 18% GST)
                </span>
                <p className="mt-0.5 text-xl font-black text-indigo-700">
                  ₹{finalPriceWithGst.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-11 cursor-pointer rounded-2xl border border-slate-200 px-5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex h-11 cursor-pointer items-center gap-2 rounded-2xl bg-indigo-600 px-6 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              <Check className="h-4 w-4" />
              <span>Save & Update Estimation Specs</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
