"use client";

import React from "react";
import {
  ExternalLink,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import { ProjectDesignSpec } from "@/modules/projects/project.types";

interface DesignSpecCardProps {
  spec: ProjectDesignSpec;
  projectCode: string;
  clientName: string;
  onAdvanceStatus?: (id: string) => void;
}

export function DesignSpecCard({
  spec,
  projectCode,
  clientName,
  onAdvanceStatus,
}: DesignSpecCardProps) {
  const getStatusColor = (status: ProjectDesignSpec["status"]) => {
    switch (status) {
      case "Client Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Design QA":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Prototype Review":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "UI Kit Ready":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs transition-all hover:border-slate-300 hover:shadow-xs"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-black text-slate-400">{projectCode}</span>
            <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
              {clientName}
            </span>
          </div>

          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black ${getStatusColor(
              spec.status
            )}`}
          >
            {spec.status}
          </span>
        </div>

        <h3 className="mt-3 text-base leading-snug font-black text-slate-900">{spec.title}</h3>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            <span>
              <strong className="text-slate-800">{spec.screenCount}</strong> Artboard Screens
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Updated: {spec.updatedAt}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
            {spec.designerName?.charAt(0) || "D"}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800">{spec.designerName}</span>
            <span className="block text-[10px] text-slate-400">Lead UI/UX Designer</span>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          {spec.prototypeUrl && (
            <a
              href={spec.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Eye className="h-3.5 w-3.5 text-slate-500" />
              <span>Prototype</span>
            </a>
          )}

          {spec.figmaUrl && (
            <a
              href={spec.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-600"
            >
              <span>Figma</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
