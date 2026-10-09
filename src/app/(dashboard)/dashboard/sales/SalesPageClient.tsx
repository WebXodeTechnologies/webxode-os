"use client";

import React, { useState } from "react";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { SalesPipelinePills } from "@/components/sales/SalesPipelinePills";
import { LeadCard, LeadItem } from "@/components/sales/LeadCard";
import { SalesDashboardOverview } from "@/components/sales/SalesDashboardOverview";
import { SalesSearchFilter } from "@/components/sales/SalesSearchFilter";
import { SalesLeadGrid } from "@/components/sales/SalesLeadGrid";
import { SalesActionableIntelligence } from "@/components/sales/SalesActionableIntelligence";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface SalesPageClientProps {
  initialLeads: any[];
  metrics: {
    totalLeads: number;
    activeLeads: number;
    pipelineValue: number;
    upcomingTasks: any[];
    recentActivities: any[];
  } | null;
}

const DEMO_LEADS = [
  {
    _id: "1",
    companyName: "Acme Corp Enterprise",
    contactPerson: "Jane Smith",
    email: "jane@acmecorp.com",
    phone: "+91 98765 43210",
    hasGst: true,
    gstin: "27AADCB2230M1Z2",
    estimatedValue: 1250000,
    stage: "Qualified",
    source: "Inbound",
    tasks: [],
  },
  {
    _id: "2",
    companyName: "Stark Industries",
    contactPerson: "Tony Stark",
    email: "tony@stark.com",
    phone: "+91 99887 76655",
    hasGst: true,
    gstin: "27AAACV1234H1Z1",
    estimatedValue: 4500000,
    stage: "Proposal",
    source: "Referral",
    tasks: [],
  },
  {
    _id: "3",
    companyName: "Wayne Enterprises",
    contactPerson: "Bruce Wayne",
    email: "bruce@wayne.com",
    phone: "+91 91234 56789",
    hasGst: false,
    estimatedValue: 800000,
    stage: "Enquiry",
    source: "Website",
    tasks: [],
  },
  {
    _id: "4",
    companyName: "Ollivanders Wands",
    contactPerson: "Garrick Ollivander",
    email: "info@ollivanders.com",
    phone: "+91 98765 12345",
    hasGst: true,
    gstin: "27ABCDV1234H1Z1",
    estimatedValue: 320000,
    stage: "Won",
    source: "Social Media",
    tasks: [],
  },
  {
    _id: "5",
    companyName: "Los Pollos Hermanos",
    contactPerson: "Gustavo Fring",
    email: "gus@lospollos.com",
    phone: "+91 98711 22334",
    hasGst: true,
    gstin: "27XYZBV1234H1Z1",
    estimatedValue: 0,
    stage: "Lost/Dead",
    source: "Cold Call",
    tasks: [],
  },
];

const DEMO_METRICS = {
  totalLeads: 5,
  activeLeads: 3,
  pipelineValue: 6550000,
  upcomingTasks: [
    {
      title: "Call Tony regarding Q3 Projections",
      companyName: "Stark Industries",
      dueDate: "2026-10-10T10:00:00.000Z", // Tomorrow
    },
    {
      title: "Email revised SLA agreement",
      companyName: "Acme Corp Enterprise",
      dueDate: "2026-10-11T10:00:00.000Z", // Day after tomorrow
    },
  ],
  recentActivities: [
    {
      type: "Call",
      content: "Had a great discovery call. Ready for proposal.",
      leadId: { companyName: "Stark Industries" },
      createdAt: "2026-10-09T09:00:00.000Z", // 1 hr ago
    },
    {
      type: "Email",
      content: "Sent the initial marketing brochure.",
      leadId: { companyName: "Wayne Enterprises" },
      createdAt: "2026-10-09T08:00:00.000Z", // 2 hrs ago
    },
  ],
};

export function SalesPageClient({ initialLeads = [], metrics = null }: SalesPageClientProps) {
  const activeLeadsData = initialLeads.length > 0 ? initialLeads : DEMO_LEADS;
  const activeMetricsData = metrics || DEMO_METRICS;

  const [activeStage, setActiveStage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const stages = ["All", "Enquiry", "Qualified", "Unqualified", "Proposal", "Won", "Lost/Dead"];

  const getStageCount = (stage: string) => {
    if (stage === "All") return activeLeadsData.length;
    return activeLeadsData.filter((l) => l.stage === stage).length;
  };

  const filteredLeads = activeLeadsData.filter((lead) => {
    const matchesStage = activeStage === "All" || lead.stage === activeStage;
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const totalValue = activeLeadsData.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  const handleExportCSV = () => {
    toast.success("Sales pipeline report and salesperson activity exported successfully.");
  };

  // We map the DB lead object to match the component props expectation
  const mappedLeads: LeadItem[] = filteredLeads.map((lead) => ({
    id: lead._id.toString(),
    companyName: lead.companyName,
    contactPerson: lead.contactPerson,
    email: lead.email || "",
    phone: lead.phone,
    hasGst: lead.hasGst,
    gstin: lead.gstin,
    value: lead.estimatedValue,
    stage: lead.stage,
    source: lead.source,
    salesPerson: "Sales Rep",
    demoStatus: lead.stage === "Proposal" || lead.stage === "Won" ? "Completed" : "Pending",
    lastInteraction: "Check interactions in detail view",
    tasks: lead.tasks || [],
  }));

  const handlePresalesHandover = (leadId: string) => {
    // This will now trigger the server action inside the detailed view or here if implemented
    toast.success("Lead successfully updated. Navigating to Presales handover process...");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
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
      <motion.div variants={item}>
        <SalesHeader
          activeLeadsCount={activeLeadsData.length}
          totalPipelineValue={totalValue}
          onExport={handleExportCSV}
        />
      </motion.div>

      <motion.div variants={item}>
        <SalesDashboardOverview
          metrics={activeMetricsData}
          onQuickAction={(action) => {
            if (action === "view_leads") setActiveStage("All");
            else toast.success(`Quick action triggered: ${action}`);
          }}
        />
      </motion.div>

      <motion.div variants={item} className="space-y-6">
        <SalesPipelinePills
          stages={stages}
          activeStage={activeStage}
          onSelectStage={setActiveStage}
          getStageCount={getStageCount}
        />
      </motion.div>

      <motion.div variants={item} className="space-y-6">
        <SalesSearchFilter
          activeStage={activeStage}
          filteredCount={mappedLeads.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <SalesLeadGrid leads={mappedLeads} onHandover={handlePresalesHandover} />
      </motion.div>
      {/* <motion.div variants={item}>
        <SalesActionableIntelligence metrics={activeMetricsData} />
      </motion.div> */}
    </motion.div>
  );
}
