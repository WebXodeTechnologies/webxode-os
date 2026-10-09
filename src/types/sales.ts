export type LeadStage = "Enquiry" | "Qualification" | "Nurturing" | "Proposal" | "Closed Won";
export type LeadSource = "Marketing" | "Raw Data" | "GMD Data" | "Scraping" | "Direct Referral";

export interface SalesTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  hasGst: boolean;
  gstin?: string;
  value: number; // Stored as number for financial calculations & aggregation
  stage: LeadStage;
  source: LeadSource;
  salesPerson: string;
  lastInteraction: string;
  tasks: SalesTask[];
  discoveryNotes?: string;
  createdAt: string;
}
