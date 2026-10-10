export type ActivityType =
  "call" | "email" | "demo" | "proposal" | "stage_change" | "task_completed";
export type LeadStage =
  "Enquiry" | "Contacted" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost/Dead";
export type ActivitySentiment = "Positive" | "Neutral" | "Needs Attention";

export interface SalesActivity {
  id: string;
  leadId: string;
  companyName: string;
  contactPerson: string;
  salesPerson: string;
  salesPersonAvatar: string;
  type: ActivityType;
  title: string;
  description: string;
  outcome: string;
  stage: LeadStage;
  sentiment: ActivitySentiment;
  timestamp: string;
  date: string;
  dealValue?: number; // in INR ₹
  duration?: string;
  isManagerVerified?: boolean;
  managerNotes?: string;
}

export interface SalesRepActivitySummary {
  id: string;
  name: string;
  avatar: string;
  role: string;
  totalCalls: number;
  totalEmails: number;
  demosCompleted: number;
  proposalsSent: number;
  dealsClosedValue: number; // in INR ₹
  activityTargetPct: number; // e.g. 112%
  auditScore: number; // 0 - 100
  status: "Target Achieved" | "On Track" | "Needs Follow-up";
}

export const WEBXODE_SALES_REPS: SalesRepActivitySummary[] = [
  {
    id: "rep-1",
    name: "Alex Morgan",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Senior Enterprise AE",
    totalCalls: 84,
    totalEmails: 142,
    demosCompleted: 18,
    proposalsSent: 9,
    dealsClosedValue: 5750000,
    activityTargetPct: 118,
    auditScore: 96,
    status: "Target Achieved",
  },
  {
    id: "rep-2",
    name: "Sarah Jenkins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    role: "Strategic Account Exec",
    totalCalls: 62,
    totalEmails: 118,
    demosCompleted: 14,
    proposalsSent: 7,
    dealsClosedValue: 4500000,
    activityTargetPct: 104,
    auditScore: 92,
    status: "Target Achieved",
  },
  {
    id: "rep-3",
    name: "David Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Mid-Market AE",
    totalCalls: 95,
    totalEmails: 160,
    demosCompleted: 11,
    proposalsSent: 5,
    dealsClosedValue: 1250000,
    activityTargetPct: 94,
    auditScore: 88,
    status: "On Track",
  },
  {
    id: "rep-4",
    name: "Marcus Vance",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "Growth Account Director",
    totalCalls: 78,
    totalEmails: 135,
    demosCompleted: 22,
    proposalsSent: 12,
    dealsClosedValue: 6800000,
    activityTargetPct: 132,
    auditScore: 98,
    status: "Target Achieved",
  },
];

export const INITIAL_WEBXODE_ACTIVITIES: SalesActivity[] = [
  {
    id: "act-101",
    leadId: "LEAD-1002",
    companyName: "Stark Industries",
    contactPerson: "Tony Stark",
    salesPerson: "Marcus Vance",
    salesPersonAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    type: "proposal",
    title: "Enterprise Custom Architecture Proposal Delivered",
    description:
      "Presented comprehensive ₹45,00,000 multi-year deployment proposal with CTO & Procurement Team. Security compliance docs attached.",
    outcome: "Advanced to Negotiation Stage - Contract Under Review",
    stage: "Proposal",
    sentiment: "Positive",
    timestamp: "15 mins ago",
    date: "Oct 10, 2026",
    duration: "45 mins",
    dealValue: 4500000,
    isManagerVerified: true,
    managerNotes: "Great alignment on enterprise SLA requirements.",
  },
  {
    id: "act-102",
    leadId: "LEAD-1001",
    companyName: "Acme Corp Enterprise",
    contactPerson: "Jane Smith",
    salesPerson: "Alex Morgan",
    salesPersonAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    type: "demo",
    title: "Live Product Demo & Workflow Integration Walkthrough",
    description:
      "Completed 60-min interactive demo showing WebXode OS leads automation and custom invoice workflows to VP of Sales.",
    outcome: "Qualified - Requested formal commercial quote",
    stage: "Qualified",
    sentiment: "Positive",
    timestamp: "1 hour ago",
    date: "Oct 10, 2026",
    duration: "60 mins",
    dealValue: 1250000,
    isManagerVerified: true,
    managerNotes: "Strong demo engagement. Next step commercial proposal.",
  },
  {
    id: "act-103",
    leadId: "LEAD-1003",
    companyName: "Wayne Enterprises",
    contactPerson: "Bruce Wayne",
    salesPerson: "Sarah Jenkins",
    salesPersonAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    type: "call",
    title: "Inbound Enquiry Discovery & Requirement Alignment Call",
    description:
      "Discussed custom dashboard requirements and multi-branch role permissions. Verified GSTIN details for commercial quote.",
    outcome: "Scheduled Technical Demo for Oct 12",
    stage: "Enquiry",
    sentiment: "Positive",
    timestamp: "2 hours ago",
    date: "Oct 10, 2026",
    duration: "25 mins",
    dealValue: 800000,
    isManagerVerified: false,
  },
  {
    id: "act-104",
    leadId: "LEAD-1004",
    companyName: "Ollivanders Wands",
    contactPerson: "Garrick Ollivander",
    salesPerson: "David Chen",
    salesPersonAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    type: "stage_change",
    title: "Deal Closed Won & Presales Handoff Triggered",
    description:
      "Finalized agreement for ₹3,20,000 WebXode OS license. Transferred client file to Presales & Onboarding team.",
    outcome: "Stage Updated to Closed Won",
    stage: "Won",
    sentiment: "Positive",
    timestamp: "4 hours ago",
    date: "Oct 10, 2026",
    dealValue: 320000,
    isManagerVerified: true,
    managerNotes: "Quick cycle close! Excellent execution.",
  },
  {
    id: "act-105",
    leadId: "LEAD-1005",
    companyName: "Los Pollos Hermanos",
    contactPerson: "Gustavo Fring",
    salesPerson: "Alex Morgan",
    salesPersonAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    type: "call",
    title: "Cold Call Follow-up & Budget Alignment",
    description:
      "Client indicated internal IT budget freeze until Q1 2027. Marked lead as paused for future re-engagement.",
    outcome: "Stage set to Lost/Dead",
    stage: "Lost/Dead",
    sentiment: "Needs Attention",
    timestamp: "Yesterday",
    date: "Oct 09, 2026",
    duration: "15 mins",
    dealValue: 0,
    isManagerVerified: true,
  },
];
