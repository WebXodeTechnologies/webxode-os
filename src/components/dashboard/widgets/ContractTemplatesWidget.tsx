"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { Copy, Download, FileText, Plus, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface TemplateItem {
  id: string;
  name: string;
  category: "SOW" | "Proposal" | "MSA" | "Invoice";
  description: string;
  downloads: number;
  badgeColor: string;
}

export function ContractTemplatesWidget() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const templates: TemplateItem[] = [
    {
      id: "1",
      name: "SOW — Enterprise Web Application Development",
      category: "SOW",
      description:
        "Standard scope of work template with milestone deliverables & QA acceptance terms.",
      downloads: 48,
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      id: "2",
      name: "UI/UX Product Design Proposal",
      category: "Proposal",
      description: "Design discovery, wireframes, user testing & Figma handoff pricing structure.",
      downloads: 32,
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "3",
      name: "Master Services Agreement (MSA)",
      category: "MSA",
      description: "Standard corporate retainer terms, IP ownership, and confidentiality clause.",
      downloads: 29,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "4",
      name: "Standard GST Tax Invoice Template",
      category: "Invoice",
      description: "Pre-formatted corporate invoice layout with bank details & milestone schedule.",
      downloads: 65,
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleDuplicate = (name: string) => {
    toast.success(`Template Ready: ${name}`);
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Contracts, SOWs & Document Library"
        subtitle="Pre-approved corporate legal templates, SOW drafts, and proposals"
        badge="4 Ready Templates"
        badgeVariant="purple"
        actions={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-purple-700 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Upload Template</span>
          </button>
        }
      />

      {/* Category Filter Pills */}
      <div className="mb-4 flex items-center gap-1.5 overflow-x-auto rounded-xl bg-slate-100/80 p-1 text-xs font-bold">
        {(["All", "SOW", "Proposal", "MSA", "Invoice"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3 py-1 transition-all ${
              selectedCategory === cat
                ? "bg-white text-purple-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid with Framer Motion Stagger Animation */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <AnimatePresence>
          {filteredTemplates.map((tpl, idx) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              whileHover={{ y: -3, borderColor: "rgba(147, 51, 234, 0.3)" }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:bg-white hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase ${tpl.badgeColor}`}
                  >
                    {tpl.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{tpl.downloads} uses</span>
                </div>

                <div className="mt-3 flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="line-clamp-2 text-xs font-bold text-slate-900 sm:text-sm">
                      {tpl.name}
                    </h5>
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-500">
                      {tpl.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => handleDuplicate(tpl.name)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 active:scale-95"
                >
                  <Copy className="h-3.5 w-3.5 text-purple-600" />
                  <span>Use Template</span>
                </button>

                <button
                  type="button"
                  title="Download Template"
                  onClick={() => toast.success(`Downloading ${tpl.name}...`)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </WidgetCard>
  );
}
