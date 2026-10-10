"use client";

import React, { useState } from "react";
import { FollowUpsHeader } from "@/components/sales/follow-ups/FollowUpsHeader";
import { FollowUpsTable, FollowUpItem } from "@/components/sales/follow-ups/FollowUpsTable";
import { FollowUpTaskModal } from "@/components/sales/follow-ups/FollowUpTaskModal";
import { FollowUpStageModal } from "@/components/sales/follow-ups/FollowUpStageModal";
import { FollowUpCallModal } from "@/components/sales/follow-ups/FollowUpCallModal";
import { FollowUpEmailModal } from "@/components/sales/follow-ups/FollowUpEmailModal";
import { toast } from "@/lib/toast";

const INITIAL_FOLLOWUPS: FollowUpItem[] = [
  {
    id: "flw-101",
    leadId: "1",
    contactName: "Murugan P.",
    email: "murugan@annaiagro.com",
    phone: "+91 98421 88901",
    company: "Annai Agro Tradings",
    title: "SOW review & final pricing discussion for B2B portal",
    taskType: "SOW Review",
    dueDate: "Today, 11:30 AM",
    dueRawDate: "2026-10-10",
    priority: "High",
    stage: "Proposal Sent",
    status: "Pending",
    assignedRep: "Karthik Raja",
    dealValue: "₹2,50,000",
    notes: "Client requested clarification on payment schedules.",
  },
  {
    id: "flw-102",
    leadId: "2",
    contactName: "Priya Sundaram",
    email: "priya@kovaitextiles.in",
    phone: "+91 97890 12345",
    company: "Kovai Silk Textiles",
    title: "Follow-up call on mobile app Flutter architecture proposal",
    taskType: "Call",
    dueDate: "Yesterday (Overdue)",
    dueRawDate: "2026-10-09",
    isOverdue: true,
    priority: "High",
    stage: "Discovery Call",
    status: "Overdue",
    assignedRep: "Ananya M.",
    dealValue: "₹1,80,000",
    notes: "Missed scheduled callback yesterday afternoon.",
  },
  {
    id: "flw-103",
    leadId: "3",
    contactName: "Vikram Sethi",
    email: "vikram@zenithtech.io",
    phone: "+91 99001 22334",
    company: "Zenith Tech Labs",
    title: "Send updated contract agreement & milestone timeline",
    taskType: "Contract Signature",
    dueDate: "Today, 03:00 PM",
    dueRawDate: "2026-10-10",
    priority: "High",
    stage: "Contract Negotiation",
    status: "Pending",
    assignedRep: "Siddharth V.",
    dealValue: "₹4,20,000",
    notes: "Legal team approved NDA revisions.",
  },
  {
    id: "flw-104",
    leadId: "4",
    contactName: "Rajesh Kumar",
    email: "rajesh@sriramlogistics.com",
    phone: "+91 94433 11223",
    company: "Sri Ram Logistics",
    title: "Post demo email check-in & dispatch custom SaaS quote",
    taskType: "Email",
    dueDate: "Oct 12, 2026",
    dueRawDate: "2026-10-12",
    priority: "Medium",
    stage: "Contacted",
    status: "Pending",
    assignedRep: "Karthik Raja",
    dealValue: "₹1,20,000",
    notes: "Interested in Fleet tracking module integration.",
  },
  {
    id: "flw-105",
    leadId: "5",
    contactName: "Meenakshi R.",
    email: "meenakshi@heritagehandlooms.com",
    phone: "+91 98940 55667",
    company: "Heritage Handlooms",
    title: "Demo meeting on Shopify custom theme & ERP integration",
    taskType: "Demo Meeting",
    dueDate: "Oct 14, 2026",
    dueRawDate: "2026-10-14",
    priority: "Medium",
    stage: "New Lead",
    status: "Pending",
    assignedRep: "Ananya M.",
    dealValue: "₹95,000",
    notes: "Requested live demo with store manager.",
  },
  {
    id: "flw-106",
    leadId: "6",
    contactName: "Deepak Verma",
    email: "deepak@apexindustrial.in",
    phone: "+91 91234 56789",
    company: "Apex Industrial Solutions",
    title: "Logged onboarding call & confirmed deposit payment",
    taskType: "Call",
    dueDate: "Today, 09:15 AM",
    dueRawDate: "2026-10-10",
    priority: "Low",
    stage: "Closed Won",
    status: "Completed",
    assignedRep: "Siddharth V.",
    dealValue: "₹3,50,000",
    notes: "Advance 50% payment received via Bank Transfer.",
  },
];

export default function FollowUpsPage() {
  const [followups, setFollowups] = useState<FollowUpItem[]>(INITIAL_FOLLOWUPS);

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<FollowUpItem | null>(null);

  // Stats calculation
  const dueToday = followups.filter(
    (f) => f.dueRawDate === "2026-10-10" && f.status !== "Completed"
  ).length;
  const overdueCount = followups.filter((f) => f.status === "Overdue").length;
  const completedToday = followups.filter((f) => f.status === "Completed").length;
  const stageTransitions = followups.filter(
    (f) => f.stage === "Contract Negotiation" || f.stage === "Closed Won"
  ).length;

  // Toggle item completed status
  const handleToggleStatus = (id: string) => {
    setFollowups((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "Completed" ? "Pending" : "Completed";
          toast.success(`Task ${newStatus === "Completed" ? "Completed" : "Re-opened"}`, {
            description: `Updated status for ${item.contactName}`,
          });
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  // Add new scheduled task
  const handleSaveTask = (taskData: any) => {
    const newItem: FollowUpItem = {
      id: `flw-${Date.now().toString().slice(-3)}`,
      leadId: "1",
      contactName: taskData.contactName,
      email: `${taskData.contactName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+91 98765 43210",
      company: taskData.company,
      title: taskData.title,
      taskType: taskData.taskType as any,
      dueDate: taskData.dueDate,
      dueRawDate: "2026-10-14",
      priority: taskData.priority as any,
      stage: taskData.stage as any,
      status: "Pending",
      assignedRep: "Karthik Raja",
      dealValue: "₹1,50,000",
    };
    setFollowups([newItem, ...followups]);
  };

  // Quick Action Handlers
  const handleInitiateCall = (item: FollowUpItem) => {
    setSelectedItem(item);
    setIsCallModalOpen(true);
  };

  const handleComposeEmail = (item: FollowUpItem) => {
    setSelectedItem(item);
    setIsEmailModalOpen(true);
  };

  const handleUpdateStage = (item: FollowUpItem) => {
    setSelectedItem(item);
    setIsStageModalOpen(true);
  };

  const handleDeleteFollowUp = (id: string) => {
    setFollowups((prev) => prev.filter((item) => item.id !== id));
    toast.success("Follow-up Task Deleted");
  };

  const handleStageChangeInline = (id: string, newStage: FollowUpItem["stage"]) => {
    setFollowups((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          toast.success("Lead Stage Updated", {
            description: `${item.contactName} moved to '${newStage}' stage.`,
          });
          return { ...item, stage: newStage };
        }
        return item;
      })
    );
  };

  const handleSaveStageUpdate = (
    id: string,
    newStage: FollowUpItem["stage"],
    dealValue: string,
    notes: string
  ) => {
    setFollowups((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stage: newStage,
            dealValue: dealValue || item.dealValue,
            notes: notes || item.notes,
          };
        }
        return item;
      })
    );
  };

  const handleLogCall = (id: string, outcome: string, notes: string) => {
    setFollowups((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: "Completed",
            notes: `Call Outcome: ${outcome}. ${notes}`,
          };
        }
        return item;
      })
    );
  };

  const handleSendEmail = (id: string, subject: string, body: string) => {
    setFollowups((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            notes: `Email Sent: "${subject}"`,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Stats & Actions */}
      <FollowUpsHeader
        onScheduleFollowup={() => setIsTaskModalOpen(true)}
        onComposeEmail={() => {
          if (followups.length > 0) {
            setSelectedItem(followups[0]);
            setIsEmailModalOpen(true);
          }
        }}
        onUpdateStage={() => {
          if (followups.length > 0) {
            setSelectedItem(followups[0]);
            setIsStageModalOpen(true);
          }
        }}
        stats={{
          dueToday,
          overdueCount,
          completedToday,
          stageTransitions,
        }}
      />

      {/* Main Table Component */}
      <FollowUpsTable
        followups={followups}
        onToggleStatus={handleToggleStatus}
        onInitiateCall={handleInitiateCall}
        onComposeEmail={handleComposeEmail}
        onUpdateStage={handleUpdateStage}
        onDeleteFollowUp={handleDeleteFollowUp}
        onStageChangeInline={handleStageChangeInline}
      />

      {/* Modals */}
      <FollowUpTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSaveTask={handleSaveTask}
      />

      <FollowUpStageModal
        isOpen={isStageModalOpen}
        onClose={() => setIsStageModalOpen(false)}
        selectedItem={selectedItem}
        onSaveStageUpdate={handleSaveStageUpdate}
      />

      <FollowUpCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        selectedItem={selectedItem}
        onLogCall={handleLogCall}
      />

      <FollowUpEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        selectedItem={selectedItem}
        onSendEmail={handleSendEmail}
      />
    </div>
  );
}
