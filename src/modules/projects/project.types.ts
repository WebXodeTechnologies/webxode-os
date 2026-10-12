export type ProjectPhase =
  "Discovery" | "In Development" | "QA & UAT" | "Staging" | "Production" | "Maintenance";

export type ProjectHealthStatus = "On Track" | "At Risk" | "Delayed" | "Completed";

export type ProjectServiceCategory =
  "webdev" | "mobile" | "saas" | "cloud_devops" | "uiux" | "consulting" | "ai_data";

export interface ProjectTeamMember {
  id?: string;
  name: string;
  role:
    | "Project Manager"
    | "Tech Lead"
    | "Frontend Developer"
    | "Backend Developer"
    | "UI/UX Designer"
    | "Cloud Architect"
    | "DevOps Engineer"
    | "SRE"
    | "DevSecOps"
    | "QA Engineer"
    | string;
  avatar?: string;
  email?: string;
  allocationPercent?: number;
}

export interface ProjectRepository {
  id?: string;
  name: string;
  url: string;
  branch: string;
  provider: "github" | "gitlab" | "bitbucket";
  lastCommitSha?: string;
  lastCommitMessage?: string;
  openPrCount?: number;
}

export interface ProjectEnvironment {
  name: "Development" | "Staging / UAT" | "Production" | string;
  url: string;
  status: "Healthy" | "Deploying" | "Offline" | "Degraded";
  lastDeployed: string;
  releaseTag: string;
  cloudProvider: "AWS" | "GCP" | "Azure" | "DigitalOcean" | "Kubernetes" | "Vercel" | string;
  region: string;
  uptimePercent: number;
}

export interface ProjectDesignSpec {
  id: string;
  title: string;
  figmaUrl?: string;
  prototypeUrl?: string;
  status:
    "Wireframes" | "UI Kit Ready" | "Prototype Review" | "Design QA" | "Client Approved" | string;
  screenCount: number;
  designerName?: string;
  updatedAt: string;
  notes?: string;
}

export interface ProjectCloudResource {
  id: string;
  provider: "AWS" | "GCP" | "Azure" | "DigitalOcean" | "Kubernetes";
  type:
    | "EC2 Compute"
    | "S3 Storage"
    | "RDS Database"
    | "CloudFront / CDN"
    | "EKS Kubernetes"
    | "Lambda / Serverless"
    | "Redis ElastiCache";
  name: string;
  resourceId: string;
  region: string;
  status: "Running" | "Provisioned" | "Stopped" | "Terminated";
  purpose: string;
  costPerMonth?: number;
  details?: string;
}

export interface ProjectDevOpsItem {
  id: string;
  title: string;
  category: "CI/CD" | "Infrastructure" | "Security / SSL" | "Monitoring / SLA" | "Deployment";
  status: "Completed" | "In Progress" | "Pending";
  updatedBy: string;
  date: string;
  notes?: string;
}

export interface ProjectDiscussionNote {
  id: string;
  author: string;
  role: string;
  avatar?: string;
  text: string;
  createdAt: string;
}

export interface ProjectDevSecOps {
  securityScore: "A" | "B" | "C" | "D";
  openCvesCount: number;
  criticalVulnerabilities: number;
  highVulnerabilities: number;
  sonarQubeRating: "A" | "B" | "C";
  testCoveragePercent: number;
  sslDaysRemaining: number;
  uptimePercentage: number;
  targetSlaPercent?: number;
  p99LatencyMs?: number;
  lastBackupDate?: string;
  complianceTags: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  completedDate?: string;
  status: "Pending" | "In Progress" | "Completed" | "Delayed";
  signOffBy?: string;
}

export interface ProjectItem {
  id: string;
  _id?: string;
  projectCode: string; // e.g., "PRJ-CORP-101"
  title: string;
  clientName: string;
  clientContactPerson?: string;
  clientEmail?: string;
  presalesId?: string;
  serviceCategory: ProjectServiceCategory;
  phase: ProjectPhase;
  status: ProjectHealthStatus;
  progress: number; // 0 to 100
  summary: string;

  // Budget & Hours
  budgetHours: number;
  consumedHours: number;
  contractValue: number;
  currency: string;
  hourlyRate: number;
  startDate: string;
  targetLaunchDate: string;

  // Tech Stack & Repositories
  techStack: string[];
  repositories: ProjectRepository[];

  // Design Specs
  designSpecs: ProjectDesignSpec[];

  // Cloud & DevOps Environments & Resources
  environments: ProjectEnvironment[];
  cloudResources?: ProjectCloudResource[];
  devopsLogs?: ProjectDevOpsItem[];

  // Project Discussions / Notes
  discussions?: ProjectDiscussionNote[];

  // DevSecOps & Quality
  devSecOps: ProjectDevSecOps;

  // Milestones
  milestones: ProjectMilestone[];

  // Team
  teamMembers: ProjectTeamMember[];
  projectManager: string;
  techLead: string;
  leadDesigner?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface SprintTaskItem {
  id: string;
  taskId: string; // e.g., "PRJ-101-T24"
  title: string;
  description: string;
  roleTag: "Frontend" | "Backend" | "DevOps" | "UI/UX" | "DevSecOps" | "Cloud" | "QA";
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Backlog" | "Ready for Dev" | "In Progress" | "PR Review" | "QA / Testing" | "Done";
  assignee: string;
  assigneeRole: string;
  storyPoints: number;
  estimatedHours: number;
  prUrl?: string;
  commitSha?: string;
  isBlocker?: boolean;
  blockerReason?: string;
  dueDate: string;
}

export interface SprintItem {
  id: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  sprintNumber: number;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: "Planning" | "Active" | "Review" | "Completed";
  storyPointsTotal: number;
  storyPointsCompleted: number;
  tasks: SprintTaskItem[];
}

export interface DevOpsPipelineRun {
  id: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  pipelineId: string;
  branch: string;
  commitMessage: string;
  author: string;
  status: "Success" | "Running" | "Failed" | "Queued";
  durationSeconds: number;
  environment: "Development" | "Staging / UAT" | "Production";
  startedAt: string;
  stageSteps: { name: string; status: "Success" | "Running" | "Failed" | "Pending" }[];
}

export interface ProjectsDashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  onTrackRatePercent: number;
  totalBudgetHours: number;
  totalConsumedHours: number;
  totalContractValue: number;
  environmentsHealthyCount: number;
  environmentsTotalCount: number;
  criticalBlockersCount: number;
  securityGradeAvg: string;
}
