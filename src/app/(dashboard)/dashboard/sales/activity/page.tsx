import React from "react";
import { Metadata } from "next";
import { SalesActivitiesClient } from "@/components/dashboard/sales/activities/SalesActivitiesClient";

export const metadata: Metadata = {
  title: "Salesperson Activity Audit Dashboard | WebXode OS",
  description:
    "Management audit dashboard for salesperson activity tracking, call logging, mail status, WhatsApp updates, demo walkthroughs, and stage changes.",
};

export default function SalesActivityPage() {
  return <SalesActivitiesClient />;
}
