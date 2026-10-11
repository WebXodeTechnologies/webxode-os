import React from "react";
import { Metadata } from "next";
import { getPresalesItems, getPresalesDashboardMetrics } from "@/server/actions/presales.actions";
import { PresalesPageClient } from "../PresalesPageClient";

export const metadata: Metadata = {
  title: "Requirements & Discovery | Presales Engine | Webxode OS",
  description:
    "Client business problem statements, functional requirements, feasibility analysis, and scope traceability matrix.",
};

export default async function PresalesRequirementsPage() {
  const initialItems = await getPresalesItems("Requirement");
  const metrics = await getPresalesDashboardMetrics();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-blue-200/60 bg-linear-to-r from-blue-50/70 via-white to-indigo-50/40 p-6">
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black text-blue-700 uppercase">
          Phase 1 • Requirements Scoping
        </span>
        <h1 className="mt-2 text-2xl font-black text-slate-900">
          Client Requirements & Solution Discovery
        </h1>
        <p className="mt-1 max-w-2xl text-xs text-slate-600">
          Capture business problems, functional requirements, architectural constraints, and initial
          assumptions from sales handovers before formal effort estimation.
        </p>
      </div>

      <PresalesPageClient initialItems={initialItems} initialMetrics={metrics} />
    </div>
  );
}
