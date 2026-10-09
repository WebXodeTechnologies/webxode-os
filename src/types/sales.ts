export type LeadStage =
  "Enquiry" | "Qualification" | "Nurturing" | "Proposal" | "Closed Won" | "Lost" | "Dead";
export type LeadSource = "Marketing" | "Raw Data" | "GMD Data" | "Scraping" | "Direct Referral";
export type DemoStatus = "Pending" | "Scheduled" | "Completed";

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
  value: number;
  stage: LeadStage;
  source: LeadSource;
  salesPerson: string;
  demoStatus: DemoStatus;
  lastInteraction: string;
  tasks: SalesTask[];
  discoveryNotes?: string;
  createdAt: string;
}
