import React from "react";
import { Metadata } from "next";
import { getPresalesItems } from "@/server/actions/presales.actions";
import { PresalesEstimatesHub } from "@/components/presales/PresalesEstimatesHub";

export const metadata: Metadata = {
  title: "Estimates & Pricing Engine | Presales | Webxode OS",
  description:
    "Modular effort estimation, engineering hourly rate cards, costing modeling, and client approval tracking.",
};

export default async function PresalesEstimatesPage() {
  const initialItems = await getPresalesItems();

  return <PresalesEstimatesHub initialItems={initialItems || []} />;
}
