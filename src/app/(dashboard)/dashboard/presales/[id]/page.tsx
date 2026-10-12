import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPresalesItemById } from "@/server/actions/presales.actions";
import { PresalesCustomerDetailView } from "@/components/presales/PresalesCustomerDetailView";

interface PresalesCustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PresalesCustomerDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getPresalesItemById(id);

  if (!item) {
    return {
      title: "Presales Customer Record | Webxode OS",
    };
  }

  return {
    title: `${item.clientName} (${item.quotationNumber || item.id}) | Presales Dossier | Webxode OS`,
    description: `Presales technical demo, SOW documents, pricing quote and pre-dev checklist for ${item.clientName}.`,
  };
}

export default async function PresalesCustomerDetailPage({
  params,
}: PresalesCustomerDetailPageProps) {
  const { id } = await params;
  const item = await getPresalesItemById(id);

  if (!item) {
    notFound();
  }

  return <PresalesCustomerDetailView initialItem={item} />;
}
