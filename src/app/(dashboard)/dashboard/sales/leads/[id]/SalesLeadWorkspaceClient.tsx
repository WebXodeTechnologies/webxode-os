"use client";

import React, { useState } from "react";
import { ClientMainHeader } from "@/components/sales/client-profile/ClientMainHeader";
import { ClientInvoiceOverview } from "@/components/sales/client-profile/ClientInvoiceOverview";
import { ClientBottomWidgets } from "@/components/sales/client-profile/ClientBottomWidgets";

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
    <div className="flex h-auto w-full flex-col rounded-tl-2xl bg-slate-50">
      {/* Main Scrollable Content */}
      <div className="relative flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Main Column */}
        <div className="relative flex-1 scrollbar-thin scrollbar-thumb-slate-200 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
            <ClientMainHeader lead={initialLead} activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "Overview" && (
              <>
                <ClientInvoiceOverview />
                <ClientBottomWidgets lead={initialLead} />
              </>
            )}

            {activeTab === "Files" && (
              <div className="mt-6 rounded-[2rem] border border-slate-100 bg-white p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-700">Client Documents</h2>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                    Upload New
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
                        W
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700">
                          Internal_Discussion_Notes.docx
                        </div>
                        <div className="text-xs text-slate-500">
                          Added yesterday by Richard Gray
                        </div>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-slate-400 hover:text-slate-600">
                      Download
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 font-bold text-rose-600">
                        PDF
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700">
                          Project_SOW_Draft_v2.pdf
                        </div>
                        <div className="text-xs text-slate-500">Added 3 days ago by You</div>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-slate-400 hover:text-slate-600">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "Overview" && activeTab !== "Files" && (
              <div className="mt-6 flex h-64 flex-col items-center justify-center rounded-[2rem] border border-slate-100 bg-white p-8">
                <h2 className="text-lg font-bold text-slate-700">{activeTab}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Content for {activeTab} will be displayed here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
