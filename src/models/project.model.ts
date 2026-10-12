import mongoose, { Schema, Document, Model } from "mongoose";
import { ProjectItem } from "@/modules/projects/project.types";

export interface IProjectDocument extends Omit<ProjectItem, "id" | "_id">, Document {}

const ProjectTeamMemberSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String },
    email: { type: String },
    allocationPercent: { type: Number, default: 100 },
  },
  { _id: false }
);

const ProjectRepositorySchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    url: { type: String, required: true },
    branch: { type: String, default: "main" },
    provider: { type: String, default: "github" },
    lastCommitSha: { type: String },
    lastCommitMessage: { type: String },
    openPrCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProjectEnvironmentSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: String, default: "Healthy" },
    lastDeployed: { type: String },
    releaseTag: { type: String, default: "v1.0.0" },
    cloudProvider: { type: String, default: "AWS" },
    region: { type: String, default: "us-east-1" },
    uptimePercent: { type: Number, default: 99.9 },
  },
  { _id: false }
);

const ProjectDesignSpecSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    figmaUrl: { type: String },
    prototypeUrl: { type: String },
    status: { type: String, default: "Wireframes" },
    screenCount: { type: Number, default: 0 },
    designerName: { type: String },
    updatedAt: { type: String },
    notes: { type: String },
  },
  { _id: false }
);

const ProjectCloudResourceSchema = new Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, default: "AWS" },
    type: { type: String, required: true },
    name: { type: String, required: true },
    resourceId: { type: String, required: true },
    region: { type: String, default: "us-east-1" },
    status: { type: String, default: "Running" },
    purpose: { type: String, required: true },
    costPerMonth: { type: Number, default: 0 },
    details: { type: String },
  },
  { _id: false }
);

const ProjectDevOpsItemSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, default: "Infrastructure" },
    status: { type: String, default: "In Progress" },
    updatedBy: { type: String, required: true },
    date: { type: String, required: true },
    notes: { type: String },
  },
  { _id: false }
);

const ProjectDiscussionNoteSchema = new Schema(
  {
    id: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, default: "Developer" },
    avatar: { type: String },
    text: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  { _id: false }
);

const ProjectMilestoneSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    targetDate: { type: String },
    completedDate: { type: String },
    status: { type: String, default: "Pending" },
    signOffBy: { type: String },
  },
  { _id: false }
);

const ProjectDevSecOpsSchema = new Schema(
  {
    securityScore: { type: String, default: "A" },
    openCvesCount: { type: Number, default: 0 },
    criticalVulnerabilities: { type: Number, default: 0 },
    highVulnerabilities: { type: Number, default: 0 },
    sonarQubeRating: { type: String, default: "A" },
    testCoveragePercent: { type: Number, default: 85 },
    sslDaysRemaining: { type: Number, default: 90 },
    uptimePercentage: { type: Number, default: 99.95 },
    targetSlaPercent: { type: Number, default: 99.9 },
    p99LatencyMs: { type: Number, default: 24 },
    lastBackupDate: { type: String, default: "Daily at 02:00 UTC" },
    complianceTags: [{ type: String }],
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProjectDocument>(
  {
    projectCode: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    clientName: { type: String, required: true, index: true },
    clientContactPerson: { type: String },
    clientEmail: { type: String },
    presalesId: { type: String, index: true },
    serviceCategory: {
      type: String,
      required: true,
      enum: ["webdev", "mobile", "saas", "cloud_devops", "uiux", "consulting", "ai_data"],
      default: "webdev",
    },
    phase: {
      type: String,
      required: true,
      enum: ["Discovery", "In Development", "QA & UAT", "Staging", "Production", "Maintenance"],
      default: "In Development",
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["On Track", "At Risk", "Delayed", "Completed"],
      default: "On Track",
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    summary: { type: String, required: true },

    budgetHours: { type: Number, default: 0 },
    consumedHours: { type: Number, default: 0 },
    contractValue: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    hourlyRate: { type: Number, default: 85 },
    startDate: { type: String, required: true },
    targetLaunchDate: { type: String, required: true },

    techStack: [{ type: String }],
    repositories: [ProjectRepositorySchema],
    designSpecs: [ProjectDesignSpecSchema],
    environments: [ProjectEnvironmentSchema],
    cloudResources: [ProjectCloudResourceSchema],
    devopsLogs: [ProjectDevOpsItemSchema],
    discussions: [ProjectDiscussionNoteSchema],

    devSecOps: { type: ProjectDevSecOpsSchema, default: () => ({}) },
    milestones: [ProjectMilestoneSchema],
    teamMembers: [ProjectTeamMemberSchema],

    projectManager: { type: String, required: true },
    techLead: { type: String, required: true },
    leadDesigner: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Project: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default Project;
