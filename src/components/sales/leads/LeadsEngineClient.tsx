"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LeadsTable } from "./LeadsTable";
import { LeadActionModal } from "./LeadActionModal";
import { LeadItem } from "../LeadCard";
import { LeadsStatsBlock } from "./LeadsStatsBlock";
import { LeadsHeaderBlock } from "./LeadsHeaderBlock";

// Using some dummy initial data based on previous setup
const INITIAL_LEADS: LeadItem[] = [
  {
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
  },
  {
    id: "LEAD-1002",
    companyName: "Stark Industries",
    contactPerson: "Tony Stark",
    email: "tony@stark.com",
    phone: "+1 212-970-4133",
    hasGst: true,
    gstin: "07BBDCB2230M1Z4",
    value: 4500000,
    stage: "Proposal",
    source: "Referral",
    salesPerson: "Sales Rep",
    demoStatus: "Completed",
    lastInteraction: "Proposal sent to management",
    tasks: [],
    address: "10880 Malibu Point",
    city: "Malibu",
    state: "California",
    zipcode: "90265",
    country: "USA",
    website: "www.stark.com",
    currency: "USD",
    currencySymbol: "$",
  },
  {
    id: "LEAD-1003",
    companyName: "Wayne Enterprises",
    contactPerson: "Bruce Wayne",
    email: "bruce@wayne.com",
    phone: "+44 20 7946 0958",
    hasGst: false,
    value: 800000,
    stage: "Enquiry",
    source: "Website",
    salesPerson: "Sales Rep",
    demoStatus: "Pending",
    lastInteraction: "Website form filled",
    tasks: [],
    address: "1007 Mountain Drive",
    city: "Gotham",
    state: "New York",
    zipcode: "10001",
    country: "USA",
    website: "www.wayneenterprises.com",
    currency: "USD",
    currencySymbol: "$",
  },
];

export function LeadsEngineClient() {
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<LeadItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<string>("All");

  // Stats calculation
  const totalClients = leads.length;
  const activeContacts = leads.filter(
    (l) => l.stage !== "Lost/Dead" && l.stage !== "Unqualified"
  ).length;
  const pendingTasks = leads.reduce(
    (acc, lead) => acc + lead.tasks.filter((t) => !t.completed).length,
    0
  );

  const sourceStats = leads.reduce(
    (acc, lead) => {
      const source = lead.source || "Other Platforms";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleOpenNewLead = () => {
    setEditingLead(null);
    setIsModalOpen(true);
    setIsAddMenuOpen(false);
  };

  const handleEditLead = (lead: LeadItem) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleSaveLead = (leadData: LeadItem) => {
    if (editingLead) {
      setLeads((prev) => prev.map((l) => (l.id === leadData.id ? leadData : l)));
    } else {
      setLeads((prev) => [leadData, ...prev]);
    }
  };

  const handleUpdateStage = (leadId: string, newStage: string) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l)));
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const leadSource = lead.source || "Other Platforms";
    const matchesSource = sourceFilter === "All" || leadSource === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="w-full space-y-6 pb-20">
      <LeadsStatsBlock
        totalClients={totalClients}
        activeContacts={activeContacts}
        pendingTasks={pendingTasks}
      />

      <LeadsHeaderBlock
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAddMenuOpen={isAddMenuOpen}
        setIsAddMenuOpen={setIsAddMenuOpen}
        handleOpenNewLead={handleOpenNewLead}
        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}
        sourceStats={sourceStats}
      />

      {/* Table View */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <LeadsTable
          leads={filteredLeads}
          onViewLead={(lead) => alert(`View details for ${lead.companyName}`)}
          onEditLead={handleEditLead}
          onDeleteLead={handleDeleteLead}
        />
      </motion.div>

      {/* Action Modal */}
      <LeadActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLead}
        initialData={editingLead}
      />
    </div>
  );
}
