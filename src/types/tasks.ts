export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus = "Todo" | "In Progress" | "Review" | "Done";

export interface WorkspaceTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  project?: string;
  isReminder?: boolean;
}
