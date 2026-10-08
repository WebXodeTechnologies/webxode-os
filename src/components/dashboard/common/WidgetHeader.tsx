"use client";

import React, { ReactNode } from "react";
import { RefreshCw, Maximize2 } from "lucide-react";

interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "default" | "success" | "warning" | "danger" | "indigo" | "purple";
  actions?: ReactNode;
  onRefresh?: () => void;
  onExpand?: () => void;
}

export function WidgetHeader({
  title,
  subtitle,
  badge,
  badgeVariant = "default",
  actions,
  onRefresh,
  onExpand,
}: WidgetHeaderProps) {
  const badgeStyles = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            {title}
          </h3>
          {badge && (
            <span
              className={`rounded-lg border px-2.5 py-0.5 text-xs font-bold tracking-wide transition-colors ${badgeStyles[badgeVariant]}`}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1 truncate text-xs font-semibold text-slate-500 sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {actions}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            title="Refresh Widget Data"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            title="Expand View"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
