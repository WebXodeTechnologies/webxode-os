"use client";

import React from "react";

interface LeadFunnelTrackerProps {
  currentStage: string;
  onStageChange: (stage: string) => void;
}

export function LeadFunnelTracker({ currentStage, onStageChange }: LeadFunnelTrackerProps) {
  const stages = [
    "Enquiry",
    "Calling / Contacting",
    "Nurturing",
    "Demo Booked",
    "Presales Handover",
    "Lost / Dead",
  ];

  return (
    <div className="space-y-3 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black tracking-wider text-slate-900 uppercase">
          Lead Funnel & Lifecycle Stage
        </h4>
        <span className="text-xs font-bold text-indigo-600">Current: {currentStage}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {stages.map((stage) => {
          const isActive = currentStage === stage;
          const isError = stage === "Lost / Dead";

          return (
            <button
              key={stage}
              type="button"
              onClick={() => onStageChange(stage)}
              className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all ${
                isActive
                  ? isError
                    ? "bg-rose-600 text-white shadow-md shadow-rose-200"
                    : "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border border-slate-200/70 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {stage}
            </button>
          );
        })}
      </div>
    </div>
  );
}
