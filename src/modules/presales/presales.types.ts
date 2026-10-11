export type PresalesStage =
  "All" | "Requirement" | "Estimation" | "Proposal" | "Quotation" | "Negotiation" | "Approved";

export type PresalesPriority = "Critical" | "High" | "Medium" | "Standard";

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
  type: "BRD" | "SRS" | "Architecture" | "Proposal" | "Quotation" | "SOW";
  version: string;
  updatedAt: string;
  size: string;
}

export interface PresalesItem {
  id: string;
  _id?: string;
  title: string;
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  sourceLeadId?: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface PresalesDashboardMetrics {
  totalPresalesDecks: number;
  scopingCount: number;
  estimationCount: number;
  proposalCount: number;
  quotationCount: number;
  negotiationCount: number;
  approvedCount: number;
  totalPipelineValue: number;
  totalEstimatedHours: number;
  averageMarginPercent: number;
  averageTurnaroundDays: number;
}
