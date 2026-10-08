"use client";

import React, { ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface WidgetCardProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function WidgetCard({
  children,
  className = "",
  isLoading = false,
  error = null,
  onRetry,
  isEmpty = false,
  emptyTitle = "No data available",
  emptyDescription = "There are currently no records to display in this module.",
}: WidgetCardProps) {
  if (error) {
    return (
      <div className="flex min-h-65 flex-col items-center justify-center rounded-3xl border border-rose-200/80 bg-rose-50/30 p-6 text-center shadow-xs sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h4 className="mt-4 text-sm font-bold text-rose-900 sm:text-base">Unable to load widget</h4>
        <p className="mt-1 text-xs text-rose-600/90 sm:text-sm">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-700 shadow-2xs transition hover:bg-rose-50 sm:text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-65 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
        <div className="flex items-center justify-between pb-4">
          <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-200"></div>
          <div className="h-5 w-20 animate-pulse rounded-lg bg-slate-100"></div>
        </div>
        <div className="mt-5 space-y-4">
          <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-100"></div>
          <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-100"></div>
          <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-100"></div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-65 flex-col items-center justify-center rounded-3xl border border-slate-200/90 bg-white p-6 text-center shadow-xs sm:p-8">
        <p className="text-sm font-bold text-slate-800 sm:text-base">{emptyTitle}</p>
        <p className="mt-1.5 max-w-sm text-xs font-medium text-slate-400 sm:text-sm">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}
