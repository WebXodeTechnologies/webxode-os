export type WorkflowNodeStatus = "completed" | "in_progress" | "review" | "blocked" | "pending";

export type WorkflowStage =
  | "Architecture & Specs"
  | "UI/UX & Design System"
  | "Core Engineering & Dev"
  | "Cloud & DevSecOps"
  | "QA, UAT & Launch";

export interface WorkflowArtifact {
  type: "figma" | "github_pr" | "github_commit" | "docs" | "cloud" | "test";
  title: string;
  url: string;
}

export interface WorkflowActivityUpdate {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timestamp: string;
  message: string;
  progressAfter: number;
  statusAfter: WorkflowNodeStatus;
  deliverableUrl?: string;
  reviewComment?: string;
  reviewedBy?: string;
  isApproved?: boolean;
}

export interface WorkflowNode {
  id: string;
  stage: WorkflowStage;
  stageNumber: number;
  title: string;
  description: string;
  roleTag:
    | "Project Manager"
    | "Tech Lead"
    | "UI/UX Designer"
    | "Frontend Developer"
    | "Backend Developer"
    | "DevOps Engineer"
    | "QA Engineer";
  owner: {
    name: string;
    role: string;
    avatar: string;
    email?: string;
  };
  reviewer: {
    name: string;
    role: string;
    avatar: string;
  };
  status: WorkflowNodeStatus;
  progressPercent: number;
  dependencies: string[]; // Upstream node IDs
  estimatedHours: number;
  loggedHours: number;
  dueDate: string;
  artifacts: WorkflowArtifact[];
  activityUpdates: WorkflowActivityUpdate[];
  blocker?: {
    reason: string;
    flaggedAt: string;
    flaggedBy: string;
  };
}

export interface TeamMemberWorkItem {
  id: string;
  memberId: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  allocationPercent: number;
  currentTaskTitle: string;
  currentNodeId: string;
  currentPhase: string;
  progress: number;
  status: "active" | "reviewing" | "blocked" | "completed";
  lastUpdated: string;
  recentWorkLogs: {
    id: string;
    date: string;
    time: string;
    summary: string;
    deliverableUrl?: string;
    status: WorkflowNodeStatus;
    reportedTo: string;
    isApproved: boolean;
  }[];
}

export interface ProjectWorkflowData {
  projectId: string;
  projectCode: string;
  projectTitle: string;
  nodes: WorkflowNode[];
  teamMembers: TeamMemberWorkItem[];
}
