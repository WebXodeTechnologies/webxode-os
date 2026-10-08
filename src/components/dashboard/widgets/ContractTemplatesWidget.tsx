"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { Copy, Download } from "lucide-react";
import { toast } from "react-hot-toast";

interface TemplateItem {
  id: string;
  name: string;
  category: "SOW" | "Proposal" | "MSA" | "Invoice";
  description: string;
  downloads: number;
}

export function ContractTemplatesWidget() {
  const templates: TemplateItem[] = [
    {
      id: "1",
      name: "SOW — Enterprise Web Application Development",
      category: "SOW",
      description:
        "Standard scope of work template with milestone deliverables & QA acceptance terms.",
      downloads: 48,
    },
    {
      id: "2",
      name: "UI/UX Product Design Proposal",
      category: "Proposal",
      description: "Design discovery, wireframes, user testing & Figma handoff pricing structure.",
      downloads: 32,
    },
    {
      id: "3",
      name: "Master Services Agreement (MSA)",
      category: "MSA",
      description: "Standard corporate retainer terms, IP ownership, and confidentiality clause.",
      downloads: 29,
    },
    {
      id: "4",
      name: "Standard GST Tax Invoice Template",
      category: "Invoice",
      description: "Pre-formatted corporate invoice layout with bank details & milestone schedule.",
      downloads: 65,
    },
  ];

  const handleDuplicate = (name: string) => {
    toast.success(`Template Duplicated: ${name}`);
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Contracts, SOWs & Document Templates"
        subtitle="Pre-approved corporate legal templates, SOW drafts, and proposals"
        badge="4 Ready Templates"
        badgeVariant="purple"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-slate-200 hover:bg-white hover:shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold tracking-wider text-indigo-600 uppercase">
                  {tpl.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {tpl.downloads} uses
                </span>
              </div>
              <h5 className="mt-2 line-clamp-2 text-xs font-bold text-slate-900 sm:text-sm">
                {tpl.name}
              </h5>
              <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-500">
                {tpl.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => handleDuplicate(tpl.name)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs transition hover:bg-slate-50 active:scale-95"
              >
                <Copy className="h-3.5 w-3.5 text-indigo-600" />
                <span>Use Template</span>
              </button>

              <button
                type="button"
                title="Download Template"
                onClick={() => toast.success(`Downloading ${tpl.name}...`)}
                className="p-1.5 text-slate-400 transition hover:text-slate-900"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
