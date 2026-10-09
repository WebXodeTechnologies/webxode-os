"use client";

import { useState } from "react";
import { Lead, LeadStage, LeadSource } from "@/types/sales";
import { toast } from "react-hot-toast";

export function useSalesEngine() {
  const [activeStage, setActiveStage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Initial Seed Data aligned with Webxode OS operations
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "LEAD-301",
      companyName: "Annai Agro Tradings",
      contactPerson: "Murugan P.",
      email: "murugan@annaiagro.in",
      phone: "+91 97890 44221",
      hasGst: true,
      gstin: "33AABCA1234F1ZP",
      value: 680000,
      stage: "Closed Won",
      source: "Marketing",
      salesPerson: "Akash S M",
      lastInteraction: "30% advance verified. Discovery document ready for Presales handover.",
      createdAt: "2026-10-01",
      tasks: [
        {
          id: "t1",
          title: "Business model enquiry call completed",
          completed: true,
          dueDate: "2026-10-05",
        },
        {
          id: "t2",
          title: "Basic requirement gathering & demo notes logged",
          completed: true,
          dueDate: "2026-10-06",
        },
        {
          id: "t3",
          title: "Client discovery document preparation",
          completed: true,
          dueDate: "2026-10-08",
        },
      ],
      discoveryNotes:
        "Custom B2B supply chain portal with automated GST calculation, inventory tracking, and multi-tenant user accounts.",
      demoStatus: "Completed",
    },
    {
      id: "LEAD-302",
      companyName: "The Green Naturals",
      contactPerson: "Ananya Ramesh",
      email: "ananya@greennaturals.com",
      phone: "+91 98423 55110",
      hasGst: true,
      gstin: "33XYZAB9876C2ZS",
      value: 350000,
      stage: "Proposal",
      source: "GMD Data",
      salesPerson: "Sales Executive 1",
      lastInteraction: "Sent custom e-commerce scope and milestone quotation.",
      createdAt: "2026-10-03",
      tasks: [
        {
          id: "t1",
          title: "Initial enquiry qualification",
          completed: true,
          dueDate: "2026-10-06",
        },
        {
          id: "t2",
          title: "Non-technical demo call conducted",
          completed: true,
          dueDate: "2026-10-07",
        },
        { id: "t3", title: "Proposal quotation sent", completed: false, dueDate: "2026-10-10" },
      ],
      demoStatus: "Pending",
    },
  ]);

  const addLead = (newLeadData: Omit<Lead, "id" | "createdAt" | "tasks">) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split("T")[0],
      tasks: [
        {
          id: "t_init_1",
          title: "Initial call & requirement check",
          completed: false,
          dueDate: "2026-10-15",
        },
        {
          id: "t_init_2",
          title: "Non-technical product demo",
          completed: false,
          dueDate: "2026-10-17",
        },
      ],
    };
    setLeads([newLead, ...leads]);
    setIsAddModalOpen(false);
    toast.success(`Lead successfully created for ${newLead.companyName}`);
  };

  const handlePresalesHandover = (leadId: string) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, stage: "Closed Won" } : l)));
    toast.success("Client discovery records and commercial sign-off transmitted to Presales Team!");
    setSelectedLead(null);
  };

  const exportSalesData = () => {
    // Generate CSV or Excel export data for weekly reviews
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Company,Contact,Stage,Value,Source,SalesPerson"].join(",") +
      "\n" +
      leads
        .map((l) =>
          [l.id, l.companyName, l.contactPerson, l.stage, l.value, l.source, l.salesPerson].join(
            ","
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `webxode_sales_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Sales activity report exported for weekly management review!");
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStage = activeStage === "All" || lead.stage === activeStage;
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return {
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
  };
}
