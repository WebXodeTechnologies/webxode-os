import React from "react";
import { Metadata } from "next";
import { getPresalesItems } from "@/server/actions/presales.actions";
import { PresalesProposalsHub } from "@/components/presales/PresalesProposalsHub";

export const metadata: Metadata = {
  title: "Proposals & Statements of Work (SOW) | Presales | Webxode OS",
  description:
    "Statement of Work (SOW), checklist documentation, PRD, BRD, and client document management with local file upload from PC.",
};

export default async function PresalesProposalsPage() {
  const initialItems = await getPresalesItems();

  return <PresalesProposalsHub initialItems={initialItems || []} />;
}
