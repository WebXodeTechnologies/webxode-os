"use client";

import React from "react";
import { Palette, Sparkles, Layers, Plus, CheckCircle2 } from "lucide-react";

interface DesignStudioHeaderProps {
  totalSpecsCount: number;
  approvedCount: number;
  onLinkFigma: () => void;
}

export function DesignStudioHeader({
  totalSpecsCount,
  approvedCount,
  onLinkFigma,
}: DesignStudioHeaderProps) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-black tracking-wider text-cyan-800 uppercase">
              UI/UX Studio & Tokens
            </span>
            <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
              {approvedCount} of {totalSpecsCount} Approved
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Design Systems & Figma Handoff Hub
          </h2>

          <p className="max-w-2xl text-xs leading-relaxed font-medium text-slate-600 sm:text-sm">
            Bridging <strong className="text-slate-800">Product Designers</strong> and{" "}
            <strong className="text-slate-800">Frontend Engineers</strong>: Track interactive Figma
            prototypes, design tokens, responsive redlines, and pixel-perfect Design QA sign-offs
            before sprint delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLinkFigma}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Link Figma Specs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
