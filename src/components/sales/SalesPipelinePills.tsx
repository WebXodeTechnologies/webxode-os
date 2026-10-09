import React from "react";
import { motion } from "framer-motion";

interface SalesPipelinePillsProps {
  activeStage: string;
  onSelectStage: (stage: string) => void;
  stageData: Record<string, { count: number; value: number }>;
}

export function SalesPipelinePills({
  activeStage,
  onSelectStage,
  stageData,
}: SalesPipelinePillsProps) {
  const stages = [
    { id: "All", color: "indigo" },
    { id: "Enquiry", color: "slate" },
    { id: "Qualification", color: "blue" },
    { id: "Nurturing", color: "purple" },
    { id: "Proposal", color: "amber" },
    { id: "Closed Won", color: "emerald" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {stages.map((stage) => {
        const isActive = activeStage === stage.id;
        const data = stageData[stage.id] || { count: 0, value: 0 };

        // Dynamic color classes based on active state and stage color
        const bgClass = isActive
          ? `bg-${stage.color}-600 text-white shadow-md shadow-${stage.color}-500/20`
          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50";

        const labelColor = isActive ? "text-white/80" : "text-slate-400";
        const valueColor = isActive ? "text-white" : "text-slate-900";
        const badgeBg = isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600";

        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelectStage(stage.id)}
            className={`relative flex flex-col items-start overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 ${bgClass}`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className={`absolute inset-0 z-0 bg-${stage.color}-600`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-extrabold tracking-wider uppercase ${labelColor}`}
                >
                  {stage.id === "All" ? "Total" : "Stage"}
                </span>
                <span
                  className={`flex h-5 items-center justify-center rounded-md px-1.5 text-[10px] font-black ${badgeBg}`}
                >
                  {data.count}
                </span>
              </div>

              <div className="mt-2">
                <span className="block text-sm font-bold">{stage.id}</span>
                <span className={`mt-0.5 block text-xs font-medium ${valueColor}`}>
                  ₹{(data.value / 100000).toFixed(2)}L
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
