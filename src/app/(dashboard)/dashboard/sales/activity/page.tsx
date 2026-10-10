import React from "react";
import { Metadata } from "next";
import { ActivityPageClient } from "@/components/sales/activity/ActivityPageClient";

export const metadata: Metadata = {
  title: "Sales Person Activity & Review Hub | WebXode OS",
  description:
    "Track sales person call logging, task updates, mail status, client relationship health, and month-end performance review readiness.",
};

export default function SalesActivityPage() {
  return <ActivityPageClient />;
}
