"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { BusinessPerformanceChart } from "../charts/BusinessPerformanceChart";

export function BusinessPerformanceWidget() {
  return (
    <WidgetCard>
      <WidgetHeader
        title="Business Performance"
        subtitle="Revenue, sales, and collection trajectory over time"
        badge="Live Metrics"
        badgeVariant="indigo"
      />
      <BusinessPerformanceChart />
    </WidgetCard>
  );
}
