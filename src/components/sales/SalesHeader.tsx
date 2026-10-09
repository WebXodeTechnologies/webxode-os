import React from "react";
import { Download, Plus, Target, TrendingUp } from "lucide-react";

interface SalesHeaderProps {
  onExport: () => void;
  onOpenAddModal: () => void;
  totalPipelineValue: number;
}

export function SalesHeader({ onExport, onOpenAddModal, totalPipelineValue }: SalesHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm sm:p-8">
      {/* Decorative background element */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-linear-to-l from-indigo-50/50 to-transparent" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2 text-indigo-600">
            <Target className="h-5 w-5" />
            <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
              Webxode OS CRM
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Sales Pipeline
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            Multi-source lead acquisition, requirement tracking, and automated Presales handoffs for
            seamless enterprise operations.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Financial Summary Pill */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 px-5 py-3 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Total Pipeline Value
              </p>
              <p className="text-lg font-black tracking-tight text-slate-900">
                ₹{totalPipelineValue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExport}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 active:scale-95"
            >
              <Download className="h-4.5 w-4.5 text-emerald-600" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={onOpenAddModal}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white shadow-xs transition hover:bg-indigo-700 hover:shadow-md active:scale-95"
            >
              <Plus className="h-5 w-5" />
              <span>New Lead</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
