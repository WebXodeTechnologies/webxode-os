import React from "react";
import { Metadata } from "next";
import { getPresalesItems, getPresalesDashboardMetrics } from "@/server/actions/presales.actions";
import { PresalesPageClient } from "./PresalesPageClient";

export const metadata: Metadata = {
  title: "Enterprise Presales Hub | Solutions & Proposals | Webxode OS",
  description:
    "End-to-end technical requirement scoping, modular effort estimation, formal proposal drafting, and commercial quotation negotiations.",
};

export default async function PresalesOverviewPage() {
  const initialItems = await getPresalesItems();
  const initialMetrics = await getPresalesDashboardMetrics();

  return <PresalesPageClient initialItems={initialItems || []} initialMetrics={initialMetrics} />;
}
