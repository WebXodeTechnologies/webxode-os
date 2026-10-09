"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Inbox, Target, Archive, FileText, Trophy, Ban } from "lucide-react";

interface SalesPipelinePillsProps {
  stages: string[];
  activeStage: string;
  onSelectStage: (stage: string) => void;
  getStageCount: (stage: string) => number;
}

const getStageIcon = (stage: string) => {
  const className = "h-4.5 w-4.5";
  switch (stage) {
    case "All":
      return <Layers className={className} />;
    case "Enquiry":
      return <Inbox className={className} />;
    case "Qualified":
      return <Target className={className} />;
    case "Unqualified":
      return <Archive className={className} />;
    case "Proposal":
      return <FileText className={className} />;
    case "Won":
      return <Trophy className={className} />;
    case "Lost/Dead":
      return <Ban className={className} />;
    default:
      return <Layers className={className} />;
  }
};

export function SalesPipelinePills({
  stages,
  activeStage,
  onSelectStage,
  getStageCount,
}: SalesPipelinePillsProps) {
  return (
    <div className="w-full overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-2 shadow-xs">
      <div className="scrollbar-hide flex w-full items-center justify-between gap-1 overflow-x-auto">
        {stages.map((stage) => {
          const isActive = activeStage === stage;
          const count = getStageCount(stage);
          const isError = stage === "Lost/Dead"; // Special color mapping for the active pill if needed

          return (
            <button
              key={stage}
              type="button"
              onClick={() => onSelectStage(stage)}
              className={`group relative flex h-16 flex-1 items-center gap-3 rounded-full px-4 transition-colors ${
                isActive ? "text-emerald-700" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePillBackground"
                  className="absolute inset-0 rounded-full bg-emerald-50/80"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "bg-transparent text-slate-400 group-hover:text-slate-500"
                }`}
              >
                {getStageIcon(stage)}
              </div>

              <div className="relative z-10 flex min-w-0 flex-col items-start text-left">
                <span
                  className={`truncate text-[13px] font-bold tracking-tight transition-colors ${
                    isActive ? "text-emerald-900" : "text-slate-700 group-hover:text-slate-900"
                  }`}
                >
                  {stage}
                </span>
                <span
                  className={`text-[9px] font-extrabold tracking-widest uppercase transition-colors ${
                    isActive ? "text-emerald-600/80" : "text-slate-400 group-hover:text-slate-500"
                  }`}
                >
                  {count} {count === 1 ? "Lead" : "Leads"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
