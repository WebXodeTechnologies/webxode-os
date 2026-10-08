"use client";

import React from "react";

export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="h-7 w-64 rounded-xl bg-slate-200"></div>
          <div className="h-4 w-96 rounded-lg bg-slate-100"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-9 w-48 rounded-xl bg-slate-200"></div>
          <div className="h-9 w-28 rounded-xl bg-indigo-200"></div>
        </div>
      </div>

      {/* KPI Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs"
          >
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded-md bg-slate-200"></div>
              <div className="h-4 w-12 rounded-md bg-slate-100"></div>
            </div>
            <div className="mt-4 h-7 w-32 rounded-lg bg-slate-200"></div>
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-72 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs"
          >
            <div className="flex justify-between">
              <div className="h-5 w-40 rounded-md bg-slate-200"></div>
              <div className="h-4 w-16 rounded-md bg-slate-100"></div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-10 w-full rounded-xl bg-slate-100"></div>
              <div className="h-10 w-full rounded-xl bg-slate-100"></div>
              <div className="h-10 w-full rounded-xl bg-slate-100"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
