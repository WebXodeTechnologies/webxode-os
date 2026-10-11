"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileQuestion, Plus } from "lucide-react";
import { PresalesItem } from "@/modules/presales/presales.types";
import { PresalesCard } from "./PresalesCard";

interface PresalesGridProps {
  items: PresalesItem[];
  onViewDetails: (item: PresalesItem) => void;
  onOpenCalculator: (item: PresalesItem) => void;
  onAdvanceStage: (item: PresalesItem) => void;
  onHandoffToProject: (item: PresalesItem) => void;
  onNewRequirement: () => void;
}

export function PresalesGrid({
  items,
  onViewDetails,
  onOpenCalculator,
  onAdvanceStage,
  onHandoffToProject,
  onNewRequirement,
}: PresalesGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 shadow-inner">
          <FileQuestion className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-base font-black text-slate-900">No Presales Decks Found</h3>
        <p className="mt-1 max-w-sm text-xs font-medium text-slate-500">
          No proposals or requirements matched your active filters or search terms.
        </p>
        <button
          type="button"
          onClick={onNewRequirement}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Requirement</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <PresalesCard
            key={item.id || item._id || index}
            item={item}
            index={index}
            onViewDetails={onViewDetails}
            onOpenCalculator={onOpenCalculator}
            onAdvanceStage={onAdvanceStage}
            onHandoffToProject={onHandoffToProject}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
