import React from "react";
import { Metadata } from "next";
import { getPresalesItems, getPresalesDashboardMetrics } from "@/server/actions/presales.actions";
import { PresalesPageClient } from "../PresalesPageClient";

export const metadata: Metadata = {
  title: "Proposals & Statements of Work (SOW) | Presales | Webxode OS",
  description:
    "Formal enterprise commercial proposals, Statements of Work, deliverables roadmap, and SLA documentation.",
};

export default async function PresalesProposalsPage() {
  const initialItems = await getPresalesItems("Proposal");
  const metrics = await getPresalesDashboardMetrics();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-indigo-200/60 bg-linear-to-r from-indigo-50/70 via-white to-blue-50/40 p-6">
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-black text-indigo-800 uppercase">
          Phase 3 • Proposals & SOW Generation
        </span>
        <h1 className="mt-2 text-2xl font-black text-slate-900">
          Proposals & Statement of Work Hub
        </h1>
        <p className="mt-1 max-w-2xl text-xs text-slate-600">
          Generate formal enterprise proposals, delivery roadmaps, SLA terms, and milestone payment
          schedules ready for client executive review.
        </p>
      </div>

      <PresalesPageClient initialItems={initialItems} initialMetrics={metrics} />
    </div>
  );
}
