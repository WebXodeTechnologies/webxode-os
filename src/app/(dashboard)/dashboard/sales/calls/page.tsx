"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CallsHeader } from "@/components/sales/calls/CallsHeader";
import { CallsTable, CallRecord } from "@/components/sales/calls/CallsTable";
import { CallDialerModal } from "@/components/sales/calls/CallDialerModal";
import { EmailComposerModal } from "@/components/sales/calls/EmailComposerModal";
import { LogCallModal } from "@/components/sales/calls/LogCallModal";
import { toast } from "@/lib/toast";

export default function SalesCallsPage() {
  // Demo call records queue
  const [records, setRecords] = useState<CallRecord[]>([
    {
      id: "CLR-1001",
      leadId: "LD-98214",
      contactName: "Murugan P.",
      company: "Annai Agro Tradings",
      phone: "+91 97890 44221",
      email: "murugan@annaiagro.com",
      callType: "Discovery Call",
      status: "Scheduled",
      lastContacted: "08 Oct 2026",
      dealValue: 770000,
      assignedRep: "Akash S M",
    },
    {
      id: "CLR-1002",
      leadId: "LD-98215",
      contactName: "Rajesh Kannan",
      company: "Kannan Textiles & Retail",
      phone: "+91 98421 11200",
      email: "rajesh@kannantextiles.in",
      callType: "Demo Follow-up",
      status: "Connected",
      lastContacted: "09 Oct 2026",
      dealValue: 450000,
      assignedRep: "Priya R",
    },
    {
      id: "CLR-1003",
      leadId: "LD-98216",
      contactName: "Sneha Reddy",
      company: "Apex Healthcare Tech",
      phone: "+91 91234 56789",
      email: "sneha.reddy@apexhealth.io",
      callType: "SOW Negotiation",
      status: "Callback Required",
      lastContacted: "07 Oct 2026",
      dealValue: 920000,
      assignedRep: "Akash S M",
    },
    {
      id: "CLR-1004",
      leadId: "LD-98217",
      contactName: "Vikram Malhotra",
      company: "Malhotra Logistics Solution",
      phone: "+91 99887 66554",
      email: "vikram@malhotralogistics.com",
      callType: "Outbound Prospecting",
      status: "No Answer",
      lastContacted: "05 Oct 2026",
      dealValue: 350000,
      assignedRep: "Vikram Mehta",
    },
    {
      id: "CLR-1005",
      leadId: "LD-98218",
      contactName: "Ananya Iyer",
      company: "Iyer Digital EdTech",
      phone: "+91 98765 12345",
      email: "ananya@iyeredtech.org",
      callType: "Closing Call",
      status: "Connected",
      lastContacted: "10 Oct 2026",
      dealValue: 1250000,
      assignedRep: "Akash S M",
    },
  ]);

  // Modal State Controls
  const [dialerOpen, setDialerOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [logCallOpen, setLogCallOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CallRecord | null>(null);

  // Stats computation
  const totalCalls = records.length;
  const connectedCalls = records.filter((r) => r.status === "Connected").length;
  const pendingCallbacks = records.filter(
    (r) => r.status === "Callback Required" || r.status === "Scheduled"
  ).length;
  const emailsSent = 14;

  const handleInitiateCall = (record?: CallRecord) => {
    if (record) {
      setSelectedRecord(record);
    } else {
      setSelectedRecord(records[0] || null);
    }
    setDialerOpen(true);
  };

  const handleSendEmail = (record?: CallRecord) => {
    if (record) {
      setSelectedRecord(record);
    } else {
      setSelectedRecord(records[0] || null);
    }
    setEmailOpen(true);
  };

  const handleLogCallModal = () => {
    setLogCallOpen(true);
  };

  const handleSaveCallLog = (logData: any) => {
    const newRecord: CallRecord = {
      id: `CLR-${Math.floor(1006 + Math.random() * 900)}`,
      leadId: selectedRecord?.leadId || "LD-98219",
      contactName: logData.contactName || selectedRecord?.contactName || "Client Contact",
      company: logData.company || selectedRecord?.company || "Client Enterprise",
      phone: logData.phone || selectedRecord?.phone || "+91 90000 00000",
      email: selectedRecord?.email || "client@company.com",
      callType: "Discovery Call",
      status: logData.status || "Connected",
      lastContacted: "Today",
      dealValue: selectedRecord?.dealValue || 350000,
      assignedRep: "You",
      notes: logData.notes,
    };

    setRecords((prev) => [newRecord, ...prev]);
    toast.success("Call Outcome Logged", {
      description: `Updated status for ${newRecord.contactName}`,
    });
  };

  const handleScheduleFollowup = (record: CallRecord) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === record.id ? { ...r, status: "Callback Required" } : r))
    );
    toast.info("Callback Scheduled", {
      description: `Follow-up callback task set for ${record.contactName}.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-[110rem] space-y-6 pb-20"
    >
      {/* Header & KPI Summary */}
      <CallsHeader
        onInitiateCall={() => handleInitiateCall()}
        onSendEmail={() => handleSendEmail()}
        onLogCall={handleLogCallModal}
        stats={{
          totalCalls,
          connectedCalls,
          emailsSent,
          pendingCallbacks,
        }}
      />

      {/* Main Call Queue Table */}
      <CallsTable
        records={records}
        onInitiateCall={(rec) => handleInitiateCall(rec)}
        onSendEmail={(rec) => handleSendEmail(rec)}
        onUpdateStatus={(rec) => {
          setSelectedRecord(rec);
          setDialerOpen(true);
        }}
        onScheduleFollowup={handleScheduleFollowup}
      />

      {/* Modals */}
      <CallDialerModal
        isOpen={dialerOpen}
        onClose={() => setDialerOpen(false)}
        targetContact={
          selectedRecord
            ? {
                name: selectedRecord.contactName,
                company: selectedRecord.company,
                phone: selectedRecord.phone,
                leadId: selectedRecord.leadId,
              }
            : null
        }
        onSaveLog={handleSaveCallLog}
      />

      <EmailComposerModal
        isOpen={emailOpen}
        onClose={() => setEmailOpen(false)}
        targetContact={
          selectedRecord
            ? {
                name: selectedRecord.contactName,
                email: selectedRecord.email,
              }
            : null
        }
        onSendEmail={(data) => {
          toast.success("Email Dispatched", {
            description: `Sent "${data.subject}" to ${data.recipientEmail}`,
          });
        }}
      />

      <LogCallModal
        isOpen={logCallOpen}
        onClose={() => setLogCallOpen(false)}
        onSaveLog={handleSaveCallLog}
      />
    </motion.div>
  );
}
