export type PresalesStage =
  "All" | "Requirement" | "Estimation" | "Proposal" | "Quotation" | "Negotiation" | "Approved";

export type PresalesPriority = "Critical" | "High" | "Medium" | "Standard";

export type ITServiceCategory =
  | "Web Development"
  | "App Development"
  | "SaaS Development"
  | "Digital Marketing"
  | "Branding"
  | "Content Creation"
  | "Performance Marketing"
  | "Consulting";

export type DemoPlatform = "Google Meet" | "Microsoft Teams" | "Zoom" | "In-Person";

export type DemoStatus =
  "Scheduled" | "Completed" | "POC Presented" | "Rescheduled" | "Follow-up Required";

export interface PresalesDemoInfo {
  platform: DemoPlatform;
  meetingLink: string;
  scheduledDate: string; // e.g. "2026-10-15"
  scheduledTime: string; // e.g. "15:30 IST"
  status: DemoStatus;
  agenda?: string;
  notes?: string;
  pocUrl?: string; // prototype or POC link (Figma / Staging URL)
  pocStatus?: "Not Started" | "Drafting" | "Ready" | "Presented" | "Approved";
  recordingUrl?: string;
}

export interface PreDevChecklistItem {
  id: string;
  title: string;
  category:
    | "Discovery"
    | "Architecture"
    | "UI/UX Prototype"
    | "APIs & Tech"
    | "Commercial & SOW"
    | "Delivery Signoff";
  completed: boolean;
  notes?: string;
}

export interface PreDevTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
}

export interface EstimationModule {
  id: string;
  name: string;
  hours: number;
  ratePerHour: number;
  description: string;
  category:
    | "Frontend"
    | "Backend"
    | "Mobile"
    | "AI / ML"
    | "DevOps / Infra"
    | "QA & Testing"
    | "Project Management";
}

export interface CommercialTerms {
  advancePercentage: number;
  milestonePercentage: number;
  deliveryPercentage: number;
  paymentTerms: string;
  validityDays: number;
  gstRate: number; // usually 18%
}

export interface ProposalDeliverable {
  title: string;
  estimatedWeeks: number;
  description: string;
  deliverableType: "Design" | "Code" | "Documentation" | "Deployment" | "Training";
}

export interface NegotiationLog {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  message: string;
  proposedDiscountPercent: number;
  status: "Pending" | "Approved" | "Counter-Offered" | "Rejected";
}

export interface PresalesDocument {
  id: string;
  title: string;
  type: "BRD" | "SRS" | "Architecture" | "Proposal" | "Quotation" | "SOW" | "Checklist";
  version: string;
  updatedAt: string;
  size: string;
}

export interface PresalesItem {
  id: string;
  _id?: string;
  title: string;
  clientName: string;
  clientCompany?: string;
  contactPerson: string;
  email: string;
  phone: string;
  sourceLeadId?: string;
  serviceCategory?: ITServiceCategory;
  salesLeadSource?: string;
  salesAppointmentDate?: string;
  stage: "Requirement" | "Estimation" | "Proposal" | "Quotation" | "Negotiation" | "Approved";
  priority: PresalesPriority;
  techStack: string[];
  estimatedValue: number;
  totalEffortHours: number;
  hourlyRate: number;
  targetMarginPercent: number;
  timelineWeeks: number;
  scopeSummary: string;
  businessObjectives: string[];
  deliverables: ProposalDeliverable[];
  estimationModules: EstimationModule[];
  commercialTerms: CommercialTerms;
  documents: PresalesDocument[];
  negotiationLogs: NegotiationLog[];
  solutionArchitect: {
    name: string;
    role: string;
    avatar?: string;
  };
  quotationNumber: string;
  demo?: PresalesDemoInfo;
  checklist?: PreDevChecklistItem[];
  tasks?: PreDevTask[];
  devPhaseConverted?: boolean;
  convertedToDevAt?: string;
  devProjectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PresalesDashboardMetrics {
  totalPresalesDecks: number;
  totalCalls: number;
  totalDemos: number;
  demosCompleted: number;
  demosScheduled: number;
  pocPresented: number;
  totalProposals: number;
  totalCommercialQuote: number;
  quoteCount: number;
  scopingCount: number;
  estimationCount: number;
  proposalCount: number;
  quotationCount: number;
  negotiationCount: number;
  approvedCount: number;
  convertedToDevCount: number;
  tasksActiveCount: number;
  totalPipelineValue: number;
  totalEstimatedHours: number;
  averageMarginPercent: number;
  averageTurnaroundDays: number;
}
