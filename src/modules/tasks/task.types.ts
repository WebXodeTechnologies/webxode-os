export type TaskStatus = "backlog" | "todo" | "in_progress" | "in_review" | "blocked" | "done";

export type TaskPriority = "low" | "medium" | "high" | "critical";

export type TaskType = "feature" | "bug" | "refactor" | "security" | "chore" | "devops" | "design";

export type TeamSquad =
  | "All Teams"
  | "FinTech Squad"
  | "SaaS Core"
  | "DevSecOps & Cloud"
  | "Mobile & AI Guild"
  | "UI/UX Design Studio";

export interface Developer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  team: string;
  status: "active" | "in-meeting" | "reviewing" | "offline";
  activeTasksCount: number;
  maxCapacityPoints: number;
  currentPoints: number;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assigneeName?: string;
}

export interface TaskComment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  createdAt: string;
}

export interface TaskItem {
  id: string;
  taskCode: string; // e.g. "WX-101"
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  team: string;
  projectName: string;
  clientName: string;
  assignee: Developer;
  reviewer?: Developer;
  storyPoints: number;
  estimatedHours: number;
  loggedHours: number;
  dueDate: string;
  tags: string[];
  gitBranch?: string;
  pullRequest?: {
    url: string;
    number: number;
    title: string;
    status: "open" | "merged" | "draft";
  };
  subtasks: SubTask[];
  isBlocked?: boolean;
  blockedReason?: string;
  comments: TaskComment[];
  attachmentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuickTodo {
  id: string;
  title: string;
  completed: boolean;
  category: "Personal" | "Bugfix" | "Review" | "Client Note" | "Architecture";
  priority: "low" | "medium" | "high";
  dueTime?: string;
  createdAt: string;
}

export interface TaskReminder {
  id: string;
  title: string;
  description: string;
  dueIn: string;
  severity: "urgent" | "warning" | "info";
  taskId?: string;
  taskCode?: string;
  client?: string;
  type: "SLA Alert" | "Sprint Freeze" | "Demo Ready" | "Code Review SLA" | "Security Audit";
}

export interface MeetingCallLog {
  id: string;
  title: string;
  type:
    | "Client Sync"
    | "Daily Standup"
    | "Sprint Planning"
    | "Architecture Review"
    | "Sprint Retro"
    | "Incident Postmortem";
  client?: string;
  project?: string;
  date: string;
  time: string;
  duration: string;
  attendees: {
    name: string;
    role: string;
    avatar: string;
  }[];
  platform: "Google Meet" | "Zoom" | "Teams" | "Slack Huddle";
  meetLink: string;
  recordingUrl?: string;
  summary: string;
  actionItems: {
    id: string;
    text: string;
    done: boolean;
    owner: string;
  }[];
  relatedTaskCode?: string;
}

export interface ActivityLogItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  target: string;
  taskCode?: string;
  timestamp: string;
  type:
    | "status_change"
    | "pr_merged"
    | "task_created"
    | "comment"
    | "blocker_flagged"
    | "meeting_logged"
    | "todo_completed";
}
