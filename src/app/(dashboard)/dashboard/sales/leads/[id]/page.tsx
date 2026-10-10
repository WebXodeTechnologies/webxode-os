import React from "react";
import { getLeadById } from "@/server/actions/sales.actions";
import { SalesLeadWorkspaceClient } from "./SalesLeadWorkspaceClient";

const MOCK_LEAD = {
  id: "LEAD-1001",
  companyName: "Acme Corp Enterprise",
  contactPerson: "Jane Smith",
  email: "jane@acmecorp.com",
  phone: "+91 98765 43210",
  hasGst: true,
  gstin: "27AADCB2230M1Z2",
  value: 1250000,
  stage: "Qualified",
  source: "Inbound",
  salesPerson: "Sales Rep",
  demoStatus: "Pending",
  lastInteraction: "Initial enquiry email received",
  tasks: [],
  address: "123 Business Avenue",
  city: "Mumbai",
  state: "Maharashtra",
  zipcode: "400001",
  country: "India",
  website: "www.acmecorp.com",
  currency: "INR",
  currencySymbol: "₹",
};

export default async function DedicatedSalesLeadWorkspace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const data = await getLeadById(resolvedParams.id);

  // Fallback to mock data if it's a dummy ID and not in DB
  let lead = data?.lead;
  if (!lead && resolvedParams.id === "LEAD-1001") {
    lead = MOCK_LEAD;
  } else if (!lead && resolvedParams.id === "LEAD-1002") {
    lead = {
      ...MOCK_LEAD,
      id: "LEAD-1002",
      companyName: "Stark Industries",
      contactPerson: "Tony Stark",
    };
  } else if (!lead && resolvedParams.id === "LEAD-1003") {
    lead = {
      ...MOCK_LEAD,
      id: "LEAD-1003",
      companyName: "Wayne Enterprises",
      contactPerson: "Bruce Wayne",
    };
  }

  return (
    <SalesLeadWorkspaceClient
      leadId={resolvedParams.id}
      initialLead={lead || null}
      initialActivities={data?.activities || []}
    />
  );
}
