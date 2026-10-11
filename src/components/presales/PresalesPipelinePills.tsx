"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  ClipboardList,
  Calculator,
  FileText,
  Receipt,
  Handshake,
  CheckCircle2,
} from "lucide-react";
import { PresalesStage } from "@/modules/presales/presales.types";

interface PresalesPipelinePillsProps {
  stages: PresalesStage[];
  activeStage: PresalesStage;
  onSelectStage: (stage: PresalesStage) => void;
  getStageCount: (stage: PresalesStage) => number;
}

const getStageIcon = (stage: PresalesStage) => {
  const className = "h-4 w-4";
  switch (stage) {
    case "All":
      return <Layers className={className} />;
    case "Requirement":
      return <ClipboardList className={className} />;
    case "Estimation":
      return <Calculator className={className} />;
    case "Proposal":
      return <FileText className={className} />;
    case "Quotation":
      return <Receipt className={className} />;
    case "Negotiation":
      return <Handshake className={className} />;
    case "Approved":
      return <CheckCircle2 className={className} />;
    default:
      return <Layers className={className} />;
  }
};

export function PresalesPipelinePills({
  stages,
  activeStage,
  onSelectStage,
  getStageCount,
}: PresalesPipelinePillsProps) {
  return (
    <div className="w-full overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-2 shadow-xs">
      <div className="scrollbar-hide flex w-full items-center justify-between gap-1.5 overflow-x-auto">
        {stages.map((stage) => {
          const isActive = activeStage === stage;
          const count = getStageCount(stage);

          return (
            <button
              key={stage}
              type="button"
              onClick={() => onSelectStage(stage)}
              className={`group relative flex h-14 min-w-32.5 flex-1 cursor-pointer items-center justify-between gap-2.5 rounded-full px-4 text-xs font-bold transition-all ${
                isActive
                  ? "text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePresalesPill"
                  className="absolute inset-0 rounded-full border border-indigo-200/70 bg-indigo-50/80 shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-2">
                <span
                  className={
                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                  }
                >
                  {getStageIcon(stage)}
                </span>
                <span className="truncate">{stage === "All" ? "All Decks" : stage}</span>
              </div>

              <span
                className={`relative z-10 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] font-black tracking-tight ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200/70"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
