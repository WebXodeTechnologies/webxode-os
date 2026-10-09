import React from "react";
import { getLeads, getSalesDashboardMetrics } from "@/server/actions/sales.actions";
import { SalesPageClient } from "./SalesPageClient";

export default async function SalesPipelineMasterPage() {
  const initialLeads = await getLeads();
  const metricsData = await getSalesDashboardMetrics();

  return <SalesPageClient initialLeads={initialLeads || []} metrics={metricsData.data} />;
}
