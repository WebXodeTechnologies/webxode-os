"use client";

import React, { useMemo } from "react";
import { useSalesEngine } from "@/hooks/useSalesEngine";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { SalesPipelinePills } from "@/components/sales/SalesPipelinePills";
import { LeadCard } from "@/components/sales/LeadCard";
import { AddLeadModal } from "@/components/sales/AddLeadModal";
import { Search, Users, Filter, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SalesPage() {
  const {
    leads,
    filteredLeads,
    activeStage,
    setActiveStage,
    searchQuery,
    setSearchQuery,
    isAddModalOpen,
    setIsAddModalOpen,
    selectedLead,
    setSelectedLead,
    addLead,
    handlePresalesHandover,
    exportSalesData,
  } = useSalesEngine();

  // Compute rich stage data (count and total value) for premium visualization
  const stageData = useMemo(() => {
    const stages = ["All", "Enquiry", "Qualification", "Nurturing", "Proposal", "Closed Won"];
    const data: Record<string, { count: number; value: number }> = {};

    stages.forEach((stage) => {
      const stageLeads = stage === "All" ? leads : leads.filter((l) => l.stage === stage);
      data[stage] = {
        count: stageLeads.length,
        value: stageLeads.reduce((acc, curr) => acc + curr.value, 0),
      };
    });

    return data;
  }, [leads]);

  const totalPipelineValue = stageData["All"].value;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pt-4 pb-20 sm:px-6 lg:px-8">
      {/* 1. Header & Financial Overview */}
      <SalesHeader
        onExport={exportSalesData}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        totalPipelineValue={totalPipelineValue}
      />

      {/* 2. Graphical 5-Stage Funnel Tabs */}
      <SalesPipelinePills
        activeStage={activeStage}
        onSelectStage={setActiveStage}
        stageData={stageData}
      />

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/60 p-4 shadow-xs backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-900">
              {activeStage === "All" ? "Full Pipeline" : activeStage} Stage
            </p>
            <p className="text-xs font-semibold text-slate-500">
              Showing {filteredLeads.length} leads in this view
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute top-2.5 left-3.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies or contacts..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm font-semibold text-slate-900 shadow-2xs transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition hover:bg-slate-50 hover:text-indigo-600">
            <Filter className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* 4. Leads Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead, index) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                index={index}
                onSelectLead={setSelectedLead}
                onHandover={handlePresalesHandover}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-16 text-center shadow-2xs"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xs">
                <Users className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No leads found</h3>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Clean Add Lead Modal Component */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addLead}
      />
    </div>
  );
}
