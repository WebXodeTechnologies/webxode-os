import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPresalesDocument extends Document {
  title: string;
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  sourceLeadId?: mongoose.Types.ObjectId;
  stage: "Requirement" | "Estimation" | "Proposal" | "Quotation" | "Negotiation" | "Approved";
  priority: "Critical" | "High" | "Medium" | "Standard";
  techStack: string[];
  estimatedValue: number;
  totalEffortHours: number;
  hourlyRate: number;
  targetMarginPercent: number;
  timelineWeeks: number;
  scopeSummary: string;
  businessObjectives: string[];
  deliverables: {
    title: string;
    estimatedWeeks: number;
    description: string;
    deliverableType: string;
  }[];
  estimationModules: {
    id: string;
    name: string;
    hours: number;
    ratePerHour: number;
    description: string;
    category: string;
  }[];
  commercialTerms: {
    advancePercentage: number;
    milestonePercentage: number;
    deliveryPercentage: number;
    paymentTerms: string;
    validityDays: number;
    gstRate: number;
  };
  documents: {
    id: string;
    title: string;
    type: string;
    version: string;
    updatedAt: string;
    size: string;
    fileUrl?: string;
    status?: string;
    uploadedFromPc?: boolean;
  }[];
  estimateStatus?: string;
  negotiationLogs: {
    id: string;
    author: string;
    avatar?: string;
    date: string;
    message: string;
    proposedDiscountPercent: number;
    status: string;
  }[];
  solutionArchitect: {
    name: string;
    role: string;
    avatar?: string;
  };
  quotationNumber: string;
  serviceCategory?: string;
  clientCompany?: string;
  salesLeadSource?: string;
  salesAppointmentDate?: string;
  demo?: {
    platform: string;
    meetingLink: string;
    scheduledDate: string;
    scheduledTime: string;
    status: string;
    agenda?: string;
    notes?: string;
    pocUrl?: string;
    pocStatus?: string;
    recordingUrl?: string;
  };
  checklist?: {
    id: string;
    title: string;
    category: string;
    completed: boolean;
    notes?: string;
  }[];
  tasks?: {
    id: string;
    title: string;
    assignee: string;
    dueDate: string;
    status: string;
    priority: string;
  }[];
  devPhaseConverted?: boolean;
  convertedToDevAt?: string;
  devProjectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PresalesSchema = new Schema<IPresalesDocument>(
  {
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    clientCompany: { type: String, default: "" },
    contactPerson: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    sourceLeadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    serviceCategory: {
      type: String,
      default: "Web Development",
    },
    salesLeadSource: { type: String, default: "Sales Team Handover" },
    salesAppointmentDate: { type: String, default: "" },
    stage: {
      type: String,
      enum: ["Requirement", "Estimation", "Proposal", "Quotation", "Negotiation", "Approved"],
      default: "Requirement",
      required: true,
    },
    priority: {
      type: String,
      enum: ["Critical", "High", "Medium", "Standard"],
      default: "High",
    },
    techStack: [{ type: String }],
    estimatedValue: { type: Number, default: 0 },
    totalEffortHours: { type: Number, default: 0 },
    hourlyRate: { type: Number, default: 2500 },
    targetMarginPercent: { type: Number, default: 35 },
    timelineWeeks: { type: Number, default: 4 },
    scopeSummary: { type: String, default: "" },
    businessObjectives: [{ type: String }],
    deliverables: [
      {
        title: { type: String },
        estimatedWeeks: { type: Number },
        description: { type: String },
        deliverableType: { type: String },
      },
    ],
    estimationModules: [
      {
        id: { type: String },
        name: { type: String },
        hours: { type: Number },
        ratePerHour: { type: Number },
        description: { type: String },
        category: { type: String },
      },
    ],
    commercialTerms: {
      advancePercentage: { type: Number, default: 40 },
      milestonePercentage: { type: Number, default: 40 },
      deliveryPercentage: { type: Number, default: 20 },
      paymentTerms: { type: String, default: "Net 15 days on milestone sign-off" },
      validityDays: { type: Number, default: 30 },
      gstRate: { type: Number, default: 18 },
    },
    documents: [
      {
        id: { type: String },
        title: { type: String },
        type: { type: String },
        version: { type: String },
        updatedAt: { type: String },
        size: { type: String },
        fileUrl: { type: String },
        status: { type: String, default: "Draft" },
        uploadedFromPc: { type: Boolean, default: false },
      },
    ],
    estimateStatus: {
      type: String,
      enum: ["Draft", "Sent to Client", "Client Reviewing", "Approved", "Revision Requested"],
      default: "Draft",
    },
    negotiationLogs: [
      {
        id: { type: String },
        author: { type: String },
        avatar: { type: String },
        date: { type: String },
        message: { type: String },
        proposedDiscountPercent: { type: Number },
        status: { type: String },
      },
    ],
    solutionArchitect: {
      name: { type: String, default: "Vikram Malhotra" },
      role: { type: String, default: "Principal Solutions Architect" },
      avatar: { type: String, default: "" },
    },
    quotationNumber: { type: String, default: "" },
    demo: {
      platform: { type: String, default: "Google Meet" },
      meetingLink: { type: String, default: "" },
      scheduledDate: { type: String, default: "" },
      scheduledTime: { type: String, default: "" },
      status: { type: String, default: "Scheduled" },
      agenda: { type: String, default: "" },
      notes: { type: String, default: "" },
      pocUrl: { type: String, default: "" },
      pocStatus: { type: String, default: "Not Started" },
      recordingUrl: { type: String, default: "" },
    },
    checklist: [
      {
        id: { type: String },
        title: { type: String },
        category: { type: String },
        completed: { type: Boolean, default: false },
        notes: { type: String },
      },
    ],
    tasks: [
      {
        id: { type: String },
        title: { type: String },
        assignee: { type: String },
        dueDate: { type: String },
        status: { type: String, default: "Pending" },
        priority: { type: String, default: "Medium" },
      },
    ],
    devPhaseConverted: { type: Boolean, default: false },
    convertedToDevAt: { type: String },
    devProjectId: { type: String },
  },
  { timestamps: true }
);

export const Presales: Model<IPresalesDocument> =
  mongoose.models.Presales || mongoose.model<IPresalesDocument>("Presales", PresalesSchema);

export default Presales;
