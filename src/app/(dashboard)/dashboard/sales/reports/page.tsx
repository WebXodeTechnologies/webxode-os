"use client";

import React, { useState } from "react";
import { ReportsHeader } from "@/components/sales/reports/ReportsHeader";
import { ReportsOverviewCharts } from "@/components/sales/reports/ReportsOverviewCharts";
import {
  SalesRepsPerformanceTable,
  SalesRepMetric,
} from "@/components/sales/reports/SalesRepsPerformanceTable";
import {
  ClientReportsBreakdown,
  ClientReportData,
} from "@/components/sales/reports/ClientReportsBreakdown";
import { ExportReportModal } from "@/components/sales/reports/ExportReportModal";
import { toast } from "@/lib/toast";

const REPS_DATA: SalesRepMetric[] = [
  {
    id: "rep-1",
    name: "Karthik Raja",
    role: "Senior Sales Lead",
    avatarBg: "bg-linear-to-tr from-indigo-600 to-purple-600",
    assignedLeads: 24,
    dealsClosed: 14,
    closedRevenue: "₹14,80,000",
    callsLogged: 68,
    emailsLogged: 42,
    winRate: "41.2%",
    topService: "Full Stack Web & SaaS",
    performanceTag: "Top Performer",
  },
  {
    id: "rep-2",
    name: "Ananya M.",
    role: "Account Executive",
    avatarBg: "bg-linear-to-tr from-purple-600 to-rose-600",
    assignedLeads: 18,
    dealsClosed: 9,
    closedRevenue: "₹8,90,000",
    callsLogged: 45,
    emailsLogged: 38,
    winRate: "36.5%",
    topService: "Mobile Flutter Apps",
    performanceTag: "High Performer",
  },
  {
    id: "rep-3",
    name: "Siddharth V.",
    role: "Enterprise Sales Manager",
    avatarBg: "bg-linear-to-tr from-blue-600 to-indigo-600",
    assignedLeads: 20,
    dealsClosed: 11,
    closedRevenue: "₹11,20,000",
    callsLogged: 52,
    emailsLogged: 40,
    winRate: "38.0%",
    topService: "Custom ERP & Cloud Architecture",
    performanceTag: "High Performer",
  },
];

const CLIENT_REPORTS: ClientReportData[] = [
  {
    id: "1",
    contactName: "Murugan P.",
    company: "Annai Agro Tradings",
    dealValue: "₹2,50,000",
    stage: "Proposal Sent",
    touchpointsCount: 12,
    lastInteraction: "Today, 11:30 AM (SOW Review)",
    assignedRep: "Karthik Raja",
    health: "Warm / Engaged",
  },
  {
    id: "2",
    contactName: "Priya Sundaram",
    company: "Kovai Silk Textiles",
    dealValue: "₹1,80,000",
    stage: "Discovery Call",
    touchpointsCount: 8,
    lastInteraction: "Yesterday (Callback Pending)",
    assignedRep: "Ananya M.",
    health: "Needs Follow-up",
  },
  {
    id: "3",
    contactName: "Vikram Sethi",
    company: "Zenith Tech Labs",
    dealValue: "₹4,20,000",
    stage: "Contract Negotiation",
    touchpointsCount: 16,
    lastInteraction: "Oct 08, 2026 (NDA Revision)",
    assignedRep: "Siddharth V.",
    health: "Warm / Engaged",
  },
  {
    id: "4",
    contactName: "Rajesh Kumar",
    company: "Sri Ram Logistics",
    dealValue: "₹1,20,000",
    stage: "Contacted",
    touchpointsCount: 5,
    lastInteraction: "Oct 05, 2026 (Quote Email)",
    assignedRep: "Karthik Raja",
    health: "Needs Follow-up",
  },
  {
    id: "5",
    contactName: "Meenakshi R.",
    company: "Heritage Handlooms",
    dealValue: "₹95,000",
    stage: "New Lead",
    touchpointsCount: 3,
    lastInteraction: "Sep 28, 2026 (No Answer)",
    assignedRep: "Ananya M.",
    health: "Risk of Churn",
  },
  {
    id: "6",
    contactName: "Deepak Verma",
    company: "Apex Industrial Solutions",
    dealValue: "₹3,50,000",
    stage: "Closed Won",
    touchpointsCount: 19,
    lastInteraction: "Today, 09:15 AM (Deposit Recd)",
    assignedRep: "Siddharth V.",
    health: "Warm / Engaged",
  },
];

export default function SalesReportsPage() {
  const [timeRange, setTimeRange] = useState("This Month");
  const [selectedRep, setSelectedRep] = useState("all");

  // Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [targetExportClient, setTargetExportClient] = useState<string | undefined>(undefined);

  // Filter reps and client reports based on selectedRep
  const filteredReps = REPS_DATA.filter((r) => {
    if (selectedRep === "all") return true;
    return r.name === selectedRep;
  });

  const filteredClients = CLIENT_REPORTS.filter((c) => {
    if (selectedRep === "all") return true;
    return c.assignedRep === selectedRep;
  });

  const handleExportClientReport = (client: ClientReportData) => {
    setTargetExportClient(client.contactName);
    setIsExportModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header & Overall KPIs */}
      <ReportsHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        selectedRep={selectedRep}
        onRepChange={setSelectedRep}
        onExportReport={() => {
          setTargetExportClient(undefined);
          setIsExportModalOpen(true);
        }}
        stats={{
          totalRevenue: "₹34,90,000",
          revenueGrowth: "+18.4%",
          conversionRate: "38.2%",
          conversionGrowth: "+5.1%",
          touchpoints: 142,
          avgCycleDays: "12.4 Days",
        }}
      />

      {/* Visual Analytics & Charts Section */}
      <ReportsOverviewCharts />

      {/* Sales Representatives Performance Table */}
      <SalesRepsPerformanceTable
        reps={filteredReps}
        onSelectRep={(repName) => {
          setSelectedRep(repName);
          toast.info(`Filtering reports for ${repName}`);
        }}
      />

      {/* Client Engagement Breakdown Table */}
      <ClientReportsBreakdown
        clients={filteredClients}
        onExportClientReport={handleExportClientReport}
      />

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        clientName={targetExportClient}
      />
    </div>
  );
}
