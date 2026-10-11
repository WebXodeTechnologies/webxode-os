import React from "react";
import { Metadata } from "next";
import { getPresalesItems, getPresalesDashboardMetrics } from "@/server/actions/presales.actions";
import { PresalesPageClient } from "../PresalesPageClient";

export const metadata: Metadata = {
  title: "Estimates & Pricing Engine | Presales | Webxode OS",
  description:
    "Modular effort estimation, engineering hourly rate cards, margin modeling, and delivery cost calculations.",
};

export default async function PresalesEstimatesPage() {
  const initialItems = await getPresalesItems("Estimation");
  const metrics = await getPresalesDashboardMetrics();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-amber-200/60 bg-linear-to-r from-amber-50/70 via-white to-orange-50/40 p-6">
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-black text-amber-800 uppercase">
          Phase 2 • Technical Estimations & Rate Cards
        </span>
        <h1 className="mt-2 text-2xl font-black text-slate-900">
          Effort Estimation & Cost Calculation Engine
        </h1>
        <p className="mt-1 max-w-2xl text-xs text-slate-600">
          Model frontend, backend, AI/ML, and DevOps effort hours with blended billing rates and
          target gross profit margins.
        </p>
      </div>

      <PresalesPageClient initialItems={initialItems} initialMetrics={metrics} />
    </div>
  );
}
