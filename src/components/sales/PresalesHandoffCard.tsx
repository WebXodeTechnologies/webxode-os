"use client";

import React from "react";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";

interface PresalesHandoffCardProps {
  onSendToPresales: () => void;
  onBoardToDev: () => void;
}

export function PresalesHandoffCard({ onSendToPresales, onBoardToDev }: PresalesHandoffCardProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-indigo-200 bg-linear-to-b from-indigo-50/60 to-white p-6 shadow-xs">
      <div>
        <h3 className="text-sm font-black text-indigo-900">Handoff & Execution Phase</h3>
        <p className="mt-1 text-xs leading-relaxed font-semibold text-slate-600">
          Once client requirements and non-technical demos are validated, transmit records to the
          Presales team or initialize development onboarding.
        </p>
      </div>

      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={onSendToPresales}
          className="flex w-full items-center justify-between rounded-2xl bg-indigo-600 px-4 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-indigo-700 active:scale-95"
        >
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Transmit to Presales Team</span>
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onBoardToDev}
          className="flex w-full items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-extrabold text-emerald-800 transition hover:bg-emerald-100"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Onboard to Development Phase</span>
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
