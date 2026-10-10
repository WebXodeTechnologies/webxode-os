"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ClientMainHeader } from "@/components/sales/client-profile/ClientMainHeader";

import { ClientOverviewTab } from "@/components/sales/client-profile/tabs/ClientOverviewTab";
import { ClientProjectsTab } from "@/components/sales/client-profile/tabs/ClientProjectsTab";
import { ClientTasksTab } from "@/components/sales/client-profile/tabs/ClientTasksTab";
import { ClientInvoicesTab } from "@/components/sales/client-profile/tabs/ClientInvoicesTab";
import { ClientPaymentsTab } from "@/components/sales/client-profile/tabs/ClientPaymentsTab";
import { ClientOrdersTab } from "@/components/sales/client-profile/tabs/ClientOrdersTab";
import { ClientEstimatesTab } from "@/components/sales/client-profile/tabs/ClientEstimatesTab";
import { ClientProposalsTab } from "@/components/sales/client-profile/tabs/ClientProposalsTab";
import { ClientContractsTab } from "@/components/sales/client-profile/tabs/ClientContractsTab";
import { ClientFilesTab } from "@/components/sales/client-profile/tabs/ClientFilesTab";
import { ClientExpensesTab } from "@/components/sales/client-profile/tabs/ClientExpensesTab";

interface SalesLeadWorkspaceClientProps {
  leadId: string;
  initialLead: any;
  initialActivities: any[];
}

export function SalesLeadWorkspaceClient({
  leadId,
  initialLead,
  initialActivities,
}: SalesLeadWorkspaceClientProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!initialLead) {
    return <div className="p-4 text-center text-slate-500">Lead not found or invalid ID.</div>;
  }

  return (
    <div className="flex h-auto w-full flex-col bg-slate-50">
      {/* Main Scrollable Content */}
      <div className="relative flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Main Column */}
        <div className="relative flex-1 scrollbar-thin scrollbar-thumb-slate-200 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
            <ClientMainHeader
              lead={initialLead}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <AnimatePresence mode="wait">
              {activeTab === "Overview" && (
                <ClientOverviewTab key="Overview" lead={initialLead} />
              )}
              {activeTab === "Projects" && (
                <ClientProjectsTab
                  key="Projects"
                  lead={initialLead}
                  onNavigateToTasks={() => setActiveTab("Tasks")}
                />
              )}
              {activeTab === "Tasks" && (
                <ClientTasksTab key="Tasks" lead={initialLead} />
              )}
              {activeTab === "Invoices" && (
                <ClientInvoicesTab key="Invoices" lead={initialLead} />
              )}
              {activeTab === "Payments" && (
                <ClientPaymentsTab key="Payments" lead={initialLead} />
              )}
              {activeTab === "Orders" && (
                <ClientOrdersTab key="Orders" lead={initialLead} />
              )}
              {activeTab === "Estimates" && (
                <ClientEstimatesTab key="Estimates" lead={initialLead} />
              )}
              {activeTab === "Proposals" && (
                <ClientProposalsTab key="Proposals" lead={initialLead} />
              )}
              {activeTab === "Contracts" && (
                <ClientContractsTab
                  key="Contracts"
                  lead={initialLead}
                  onMoveToDev={() => setActiveTab("Projects")}
                />
              )}
              {activeTab === "Files" && (
                <ClientFilesTab key="Files" lead={initialLead} />
              )}
              {activeTab === "Expenses" && (
                <ClientExpensesTab key="Expenses" lead={initialLead} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
