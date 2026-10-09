import React from "react";
import { getLeadById } from "@/server/actions/sales.actions";
import { SalesLeadWorkspaceClient } from "./SalesLeadWorkspaceClient";

export default async function DedicatedSalesLeadWorkspace({ params }: { params: { id: string } }) {
  const data = await getLeadById(params.id);

  return (
    <SalesLeadWorkspaceClient
      leadId={params.id}
      initialLead={data?.lead || null}
      initialActivities={data?.activities || []}
    />
  );
}
