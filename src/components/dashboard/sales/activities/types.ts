export type ActionType = "Call" | "Mail" | "WhatsApp" | "Stage Change" | "Demo";
export type DateRangeFilter = "Today" | "This Week" | "All Time";
export type ActivitySentiment = "Positive" | "Neutral" | "Needs Attention";

export interface ActivityLogItem {
  id: string;
  repId: string;
  repName: string;
  repRole: string;
  repAvatar: string;
  clientCompany: string;
  clientContact: string;
  location: string;
  actionType: ActionType;
  title: string;
  description: string;
  outcome: string;
  sentiment: ActivitySentiment;
  timestamp: string;
  date: string;
  dealValueINR?: number;
  duration?: string;
  isVerified?: boolean;
  managerNote?: string;
}

export interface ActivityMetrics {
  totalCallsMade: number;
  proposalsAndEmailsSent: number;
  demosCompleted: number;
  activeSalesReps: number;
  callsTrendPct: number;
  emailsTrendPct: number;
  demosTrendPct: number;
  repsTargetPct: number;
}

export interface ActivityFilterState {
  repId: string;
  actionType: string;
  dateRange: DateRangeFilter;
  searchQuery: string;
}

export const INITIAL_METRICS: ActivityMetrics = {
  totalCallsMade: 284,
  proposalsAndEmailsSent: 412,
  demosCompleted: 38,
  activeSalesReps: 5,
  callsTrendPct: 14.8,
  emailsTrendPct: 22.4,
  demosTrendPct: 9.2,
  repsTargetPct: 112.5,
};

export const MOCK_SALES_REPS = [
  { id: "all", name: "All Sales Reps" },
  { id: "rep-1", name: "Alex Morgan" },
  { id: "rep-2", name: "Sarah Jenkins" },
  { id: "rep-3", name: "Karthik Raja" },
  { id: "rep-4", name: "Marcus Vance" },
  { id: "rep-5", name: "Priya Sundaram" },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: "act-901",
    repId: "rep-3",
    repName: "Karthik Raja",
    repRole: "Senior Enterprise AE",
    repAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    clientCompany: "Kongu Engineering Solutions",
    clientContact: "S. Murugan (VP Operations)",
    location: "Namakkal, Tamil Nadu",
    actionType: "WhatsApp",
    title: "Dispatched Custom Quotation & GST Breakdown",
    description:
      "Sent itemized WebXode OS Enterprise deployment proposal (₹18,50,000) over WhatsApp Business API. Verified GSTIN 33AAAAC1234H1Z5.",
    outcome: "Client acknowledged & requested technical SLA review meeting",
    sentiment: "Positive",
    timestamp: "10 mins ago",
    date: "2026-10-10",
    dealValueINR: 1850000,
    isVerified: true,
    managerNote: "Excellent response time on Namakkal enterprise account.",
  },
  {
    id: "act-902",
    repId: "rep-1",
    repName: "Alex Morgan",
    repRole: "Growth Director",
    repAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    clientCompany: "Stark Industries (India)",
    clientContact: "Tony Stark",
    location: "Bengaluru, Karnataka",
    actionType: "Demo",
    title: "Completed Interactive Sales Automation Walkthrough",
    description:
      "Conducted 60-min live demo demonstrating automated multi-channel lead routing and custom invoice generation module.",
    outcome: "Advanced to Proposal Stage - Commercials requested",
    sentiment: "Positive",
    timestamp: "45 mins ago",
    date: "2026-10-10",
    duration: "60 mins",
    dealValueINR: 4500000,
    isVerified: true,
    managerNote: "High-value demo. Schedule commercial negotiation.",
  },
  {
    id: "act-903",
    repId: "rep-2",
    repName: "Sarah Jenkins",
    repRole: "Strategic AE",
    repAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    clientCompany: "Acme Corp Enterprise",
    clientContact: "Jane Smith",
    location: "Mumbai, Maharashtra",
    actionType: "Call",
    title: "Inbound Discovery & Security Architecture Call",
    description:
      "Discussed cloud compliance, data sovereignty, and role-based permissions for 150 team members.",
    outcome: "Scheduled Demo for Oct 12, 2:00 PM",
    sentiment: "Positive",
    timestamp: "2 hours ago",
    date: "2026-10-10",
    duration: "25 mins",
    dealValueINR: 1250000,
    isVerified: false,
  },
  {
    id: "act-904",
    repId: "rep-5",
    repName: "Priya Sundaram",
    repRole: "Account Manager",
    repAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    clientCompany: "Salem Steel Suppliers",
    clientContact: "R. Venkatesh",
    location: "Salem, Tamil Nadu",
    actionType: "Mail",
    title: "Dispatched Follow-up Case Study & ROI Report",
    description:
      "Sent tailored manufacturing automation case study showing 34% increase in sales rep velocity.",
    outcome: "Email Opened (2x) - Attachment Downloaded",
    sentiment: "Neutral",
    timestamp: "3 hours ago",
    date: "2026-10-10",
    dealValueINR: 950000,
    isVerified: true,
  },
  {
    id: "act-905",
    repId: "rep-4",
    repName: "Marcus Vance",
    repRole: "Senior AE",
    repAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    clientCompany: "Wayne Enterprises",
    clientContact: "Bruce Wayne",
    location: "Chennai, Tamil Nadu",
    actionType: "Stage Change",
    title: "Updated Pipeline Stage: Proposal → Closed Won",
    description:
      "Received e-signed contract for 3-year WebXode OS software subscription. Presales handoff initiated.",
    outcome: "Closed Won - Contract Active",
    sentiment: "Positive",
    timestamp: "5 hours ago",
    date: "2026-10-10",
    dealValueINR: 3200000,
    isVerified: true,
    managerNote: "Major milestone win for South India Region!",
  },
];
