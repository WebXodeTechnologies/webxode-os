import React from "react";
import { Metadata } from "next";
import { getPresalesItems, getPresalesDashboardMetrics } from "@/server/actions/presales.actions";
import { PresalesPageClient } from "../PresalesPageClient";

export const metadata: Metadata = {
  title: "Commercial Quotations & Negotiations | Presales | Webxode OS",
  description:
    "Formal price quotations, GST/tax calculation, discount review, margin protection, and client commercial negotiation audit trail.",
};

export default async function PresalesQuotationsPage() {
  const initialItems = await getPresalesItems("Quotation");
  const metrics = await getPresalesDashboardMetrics();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-emerald-200/60 bg-linear-to-r from-emerald-50/70 via-white to-teal-50/40 p-6">
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase">
          Phase 4 • Quotations & Commercial Negotiation
        </span>
        <h1 className="mt-2 text-2xl font-black text-slate-900">
          Commercial Quotations & Concession Engine
        </h1>
        <p className="mt-1 max-w-2xl text-xs text-slate-600">
          Itemized quotations with GST calculation, payment milestone terms, margin safeguard
          analysis, and client negotiation conversation logs.
        </p>
      </div>

      <PresalesPageClient initialItems={initialItems} initialMetrics={metrics} />
    </div>
  );
}
