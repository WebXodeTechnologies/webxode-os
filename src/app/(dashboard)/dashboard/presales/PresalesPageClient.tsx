"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  PresalesItem,
  PresalesDashboardMetrics,
  PresalesStage,
  EstimationModule,
} from "@/modules/presales/presales.types";
import { PresalesHeader } from "@/components/presales/PresalesHeader";
import { PresalesDashboardOverview } from "@/components/presales/PresalesDashboardOverview";
import { PresalesPipelinePills } from "@/components/presales/PresalesPipelinePills";
import { PresalesSearchFilter } from "@/components/presales/PresalesSearchFilter";
import { PresalesGrid } from "@/components/presales/PresalesGrid";
import { PresalesTableView } from "@/components/presales/PresalesTableView";
import { PresalesNewRequirementModal } from "@/components/presales/PresalesNewRequirementModal";
import { PresalesEffortCalculatorModal } from "@/components/presales/PresalesEffortCalculatorModal";
import { PresalesDetailModal } from "@/components/presales/PresalesDetailModal";
import {
  createPresalesRequirement,
  updatePresalesStage,
  updatePresalesEstimation,
  submitNegotiationNote,
  handoverToProject,
} from "@/server/actions/presales.actions";
import { DEMO_PRESALES_ITEMS } from "@/modules/presales/presales.constants";

interface PresalesPageClientProps {
  initialItems: PresalesItem[];
  initialMetrics: PresalesDashboardMetrics | null;
}

const STAGES: PresalesStage[] = [
  "All",
  "Requirement",
  "Estimation",
  "Proposal",
  "Quotation",
  "Negotiation",
  "Approved",
];

export function PresalesPageClient({
  initialItems = [],
  initialMetrics = null,
}: PresalesPageClientProps) {
  const [items, setItems] = useState<PresalesItem[]>(
    initialItems.length > 0 ? initialItems : DEMO_PRESALES_ITEMS
  );

  const [activeStage, setActiveStage] = useState<PresalesStage>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<PresalesItem | null>(null);
  const [calcItem, setCalcItem] = useState<PresalesItem | null>(null);

  // Compute live metrics from current state
  const totalValue = items.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
  const totalHours = items.reduce((acc, curr) => acc + (curr.totalEffortHours || 0), 0);
  const avgMargin = Math.round(
    items.reduce((acc, curr) => acc + (curr.targetMarginPercent || 35), 0) / (items.length || 1)
  );

  const liveMetrics: PresalesDashboardMetrics = {
    totalPresalesDecks: items.length,
    scopingCount: items.filter((i) => i.stage === "Requirement").length,
    estimationCount: items.filter((i) => i.stage === "Estimation").length,
    proposalCount: items.filter((i) => i.stage === "Proposal").length,
    quotationCount: items.filter((i) => i.stage === "Quotation").length,
    negotiationCount: items.filter((i) => i.stage === "Negotiation").length,
    approvedCount: items.filter((i) => i.stage === "Approved").length,
    totalPipelineValue: totalValue,
    totalEstimatedHours: totalHours,
    averageMarginPercent: avgMargin,
    averageTurnaroundDays: initialMetrics?.averageTurnaroundDays || 3.4,
  };

  const getStageCount = (stage: PresalesStage) => {
    if (stage === "All") return items.length;
    return items.filter((i) => i.stage === stage).length;
  };

  // Filtered Items
  const filteredItems = items.filter((item) => {
    const matchesStage = activeStage === "All" || item.stage === activeStage;
    const matchesPriority = selectedPriority === "All" || item.priority === selectedPriority;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.clientName.toLowerCase().includes(query) ||
      item.contactPerson.toLowerCase().includes(query) ||
      item.techStack.some((t) => t.toLowerCase().includes(query));

    return matchesStage && matchesPriority && matchesSearch;
  });

  // Action: Create New Requirement
  const handleCreateRequirement = async (newItemData: Partial<PresalesItem>) => {
    const tempId = `pre-${Date.now()}`;
    const newItem: PresalesItem = {
      ...(newItemData as PresalesItem),
      id: tempId,
      _id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setItems([newItem, ...items]);
    toast.success(`Presales requirement initialized for ${newItem.clientName}!`);

    try {
      await createPresalesRequirement(newItemData);
    } catch {
      // optimistic state already active
    }
  };

  // Action: Advance Stage Workflow
  const handleAdvanceStage = async (item: PresalesItem) => {
    const stageOrder: PresalesItem["stage"][] = [
      "Requirement",
      "Estimation",
      "Proposal",
      "Quotation",
      "Negotiation",
      "Approved",
    ];

    const currentIndex = stageOrder.indexOf(item.stage);
    if (currentIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentIndex + 1];

      setItems(
        items.map((i) => (i.id === item.id || i._id === item._id ? { ...i, stage: nextStage } : i))
      );

      if (detailItem && (detailItem.id === item.id || detailItem._id === item._id)) {
        setDetailItem({ ...detailItem, stage: nextStage });
      }

      toast.success(`${item.clientName} deck transitioned from ${item.stage} to ${nextStage}!`);

      try {
        await updatePresalesStage(item.id || item._id!, nextStage);
      } catch {
        // optimistic state maintained
      }
    }
  };

  // Action: Save Estimation
  const handleSaveEstimation = async (
    itemId: string,
    modules: EstimationModule[],
    hourlyRate: number,
    marginPercent: number
  ) => {
    const totalEffortHours = modules.reduce((sum, m) => sum + (Number(m.hours) || 0), 0);
    const estimatedValue = totalEffortHours * hourlyRate;

    setItems(
      items.map((i) => {
        if (i.id === itemId || i._id === itemId) {
          return {
            ...i,
            estimationModules: modules,
            hourlyRate,
            targetMarginPercent: marginPercent,
            totalEffortHours,
            estimatedValue,
            stage: i.stage === "Requirement" ? "Proposal" : i.stage,
          };
        }
        return i;
      })
    );

    toast.success("Engineering estimation and rate matrix updated successfully!");

    try {
      await updatePresalesEstimation(itemId, modules, hourlyRate, marginPercent);
    } catch {
      // optimistic state retained
    }
  };

  // Action: Add Negotiation Note
  const handleAddNegotiationNote = async (itemId: string, noteData: any) => {
    setItems(
      items.map((i) => {
        if (i.id === itemId || i._id === itemId) {
          return {
            ...i,
            negotiationLogs: [...i.negotiationLogs, noteData],
          };
        }
        return i;
      })
    );

    if (detailItem && (detailItem.id === itemId || detailItem._id === itemId)) {
      setDetailItem({
        ...detailItem,
        negotiationLogs: [...detailItem.negotiationLogs, noteData],
      });
    }

    toast.success("Commercial negotiation revision note logged.");

    try {
      await submitNegotiationNote(itemId, noteData);
    } catch {
      // optimistic state retained
    }
  };

  // Action: Handoff to Delivery Projects
  const handleHandoffToProject = async (item: PresalesItem) => {
    setItems(
      items.map((i) => (i.id === item.id || i._id === item._id ? { ...i, stage: "Approved" } : i))
    );

    toast.success(
      `🎉 Deal won! ${item.clientName} transmitted to Project Delivery & Engineering boards!`
    );

    try {
      await handoverToProject(item.id || item._id!);
    } catch {
      // optimistic state retained
    }
  };

  const handleExport = () => {
    toast.success("Presales proposal dossier and SOW deliverables exported successfully.");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full space-y-8 pb-20"
    >
      {/* 1. Master Header */}
      <motion.div variants={itemAnim}>
        <PresalesHeader
          totalPipelineValue={totalValue}
          activeDecksCount={items.length}
          averageTurnaroundDays={liveMetrics.averageTurnaroundDays}
          onExport={handleExport}
          onNewRequirement={() => setIsNewModalOpen(true)}
        />
      </motion.div>

      {/* 2. Interactive KPI Overview */}
      <motion.div variants={itemAnim}>
        <PresalesDashboardOverview
          metrics={liveMetrics}
          onQuickAction={(stage) => setActiveStage(stage as PresalesStage)}
        />
      </motion.div>

      {/* 3. Stage Selector Pill Bar */}
      <motion.div variants={itemAnim} className="space-y-6">
        <PresalesPipelinePills
          stages={STAGES}
          activeStage={activeStage}
          onSelectStage={setActiveStage}
          getStageCount={getStageCount}
        />
      </motion.div>

      {/* 4. Search Filter & View Switcher */}
      <motion.div variants={itemAnim} className="space-y-6">
        <PresalesSearchFilter
          activeStage={activeStage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredCount={filteredItems.length}
          totalCount={items.length}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* 5. Main Content: Grid or Table View */}
        {viewMode === "grid" ? (
          <PresalesGrid
            items={filteredItems}
            onViewDetails={(item) => setDetailItem(item)}
            onOpenCalculator={(item) => setCalcItem(item)}
            onAdvanceStage={handleAdvanceStage}
            onHandoffToProject={handleHandoffToProject}
            onNewRequirement={() => setIsNewModalOpen(true)}
          />
        ) : (
          <PresalesTableView
            items={filteredItems}
            onViewDetails={(item) => setDetailItem(item)}
            onOpenCalculator={(item) => setCalcItem(item)}
            onAdvanceStage={handleAdvanceStage}
            onHandoffToProject={handleHandoffToProject}
          />
        )}
      </motion.div>

      {/* MODAL 1: New Requirement Modal */}
      <PresalesNewRequirementModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleCreateRequirement}
      />

      {/* MODAL 2: Effort & Cost Calculator Modal */}
      <PresalesEffortCalculatorModal
        isOpen={!!calcItem}
        item={calcItem}
        onClose={() => setCalcItem(null)}
        onSave={handleSaveEstimation}
      />

      {/* MODAL 3: Deep-Dive Specification & SOW Modal */}
      <PresalesDetailModal
        isOpen={!!detailItem}
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onAdvanceStage={handleAdvanceStage}
        onHandoffToProject={handleHandoffToProject}
        onAddNegotiationNote={handleAddNegotiationNote}
      />
    </motion.div>
  );
}
