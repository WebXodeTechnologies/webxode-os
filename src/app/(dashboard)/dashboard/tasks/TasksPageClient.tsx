"use client";

import React, { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import {
  TaskItem,
  TaskStatus,
  QuickTodo,
  TaskReminder,
  MeetingCallLog,
  ActivityLogItem,
  Developer,
} from "@/modules/tasks/task.types";
import {
  MOCK_DEVELOPERS,
  INITIAL_TASKS,
  INITIAL_TODOS,
  INITIAL_REMINDERS,
  INITIAL_MEETING_LOGS,
  INITIAL_ACTIVITY_LOGS,
} from "@/modules/tasks/task.mock";

import { TaskHeader } from "@/components/tasks/TaskHeader";
import { TaskRemindersBanner } from "@/components/tasks/TaskRemindersBanner";
import { TaskFilterBar } from "@/components/tasks/TaskFilterBar";
import { TaskKanbanBoard } from "@/components/tasks/TaskKanbanBoard";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskCreateModal } from "@/components/tasks/TaskCreateModal";
import { TaskQuickTodoDrawer } from "@/components/tasks/TaskQuickTodoDrawer";
import { TaskMeetingLogsModal } from "@/components/tasks/TaskMeetingLogsModal";
import { TaskActivityTracker } from "@/components/tasks/TaskActivityTracker";
import { TaskTeamWorkloadView } from "@/components/tasks/TaskTeamWorkloadView";
import { TaskTableView } from "@/components/tasks/TaskTableView";

export function TasksPageClient() {
  // Main State
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [developers] = useState<Developer[]>(MOCK_DEVELOPERS);
  const [todos, setTodos] = useState<QuickTodo[]>(INITIAL_TODOS);
  const [reminders, setReminders] = useState<TaskReminder[]>(INITIAL_REMINDERS);
  const [meetings, setMeetings] = useState<MeetingCallLog[]>(INITIAL_MEETING_LOGS);
  const [activities, setActivities] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);

  // View Mode
  const [viewMode, setViewMode] = useState<"kanban" | "workload" | "table">("kanban");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeveloperId, setSelectedDeveloperId] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Modals & Drawers
  const [selectedTaskDetail, setSelectedTaskDetail] = useState<TaskItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalInitialStatus, setCreateModalInitialStatus] = useState<TaskStatus>("todo");
  const [isTodoDrawerOpen, setIsTodoDrawerOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isActivityDrawerOpen, setIsActivityDrawerOpen] = useState(false);

  // Extracted unique filter lists
  const teamsList = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.team))).filter(Boolean);
  }, [tasks]);

  const projectsList = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.projectName))).filter(Boolean);
  }, [tasks]);

  // Active Filter Count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedDeveloperId !== "All") count++;
    if (selectedTeam !== "All") count++;
    if (selectedProject !== "All") count++;
    if (selectedPriority !== "All") count++;
    if (selectedType !== "All") count++;
    return count;
  }, [
    searchQuery,
    selectedDeveloperId,
    selectedTeam,
    selectedProject,
    selectedPriority,
    selectedType,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDeveloperId("All");
    setSelectedTeam("All");
    setSelectedProject("All");
    setSelectedPriority("All");
    setSelectedType("All");
  };

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = task.taskCode.toLowerCase().includes(q);
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesClient = task.clientName.toLowerCase().includes(q);
        const matchesProject = task.projectName.toLowerCase().includes(q);
        const matchesTags = task.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesCode && !matchesTitle && !matchesClient && !matchesProject && !matchesTags) {
          return false;
        }
      }

      // Assignee
      if (selectedDeveloperId !== "All" && task.assignee.id !== selectedDeveloperId) {
        return false;
      }

      // Team
      if (selectedTeam !== "All" && task.team !== selectedTeam) {
        return false;
      }

      // Project
      if (selectedProject !== "All" && task.projectName !== selectedProject) {
        return false;
      }

      // Priority
      if (selectedPriority !== "All" && task.priority !== selectedPriority) {
        return false;
      }

      // Type
      if (selectedType !== "All" && task.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [
    tasks,
    searchQuery,
    selectedDeveloperId,
    selectedTeam,
    selectedProject,
    selectedPriority,
    selectedType,
  ]);

  // Handlers for Task Operations
  const handleMoveStatus = (taskId: string, newStatus: TaskStatus) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;

    const oldStatus = targetTask.status;
    if (oldStatus === newStatus) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus, updatedAt: "Just now" } : t))
    );

    // Keep detail modal updated if opened
    if (selectedTaskDetail?.id === taskId) {
      setSelectedTaskDetail((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // Add activity log
    const newActivity: ActivityLogItem = {
      id: `act-${Date.now()}`,
      user: {
        name: "Akash Mohan",
        avatar: MOCK_DEVELOPERS[0].avatar,
        role: "Lead Architect",
      },
      action: `advanced ${targetTask.taskCode} from ${oldStatus.replace("_", " ")} to ${newStatus.replace("_", " ")}`,
      target: targetTask.title,
      taskCode: targetTask.taskCode,
      timestamp: "Just now",
      type: "status_change",
    };
    setActivities((prev) => [newActivity, ...prev]);

    toast.success(`${targetTask.taskCode} moved to ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const updatedSubtasks = task.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        return { ...task, subtasks: updatedSubtasks };
      })
    );

    if (selectedTaskDetail?.id === taskId) {
      setSelectedTaskDetail((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          subtasks: prev.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        };
      });
    }

    toast.success("Subtask status updated");
  };

  const handleAddSubtask = (taskId: string, title: string) => {
    const newSubtask = {
      id: `st-${Date.now()}`,
      title,
      completed: false,
    };

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return { ...task, subtasks: [...task.subtasks, newSubtask] };
      })
    );

    if (selectedTaskDetail?.id === taskId) {
      setSelectedTaskDetail((prev) => {
        if (!prev) return null;
        return { ...prev, subtasks: [...prev.subtasks, newSubtask] };
      });
    }

    toast.success("Added subtask item");
  };

  const handleAddComment = (taskId: string, content: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      author: {
        name: "Akash Mohan",
        avatar: MOCK_DEVELOPERS[0].avatar,
        role: "Lead Architect",
      },
      content,
      createdAt: "Just now",
    };

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return { ...task, comments: [...(task.comments || []), newComment] };
      })
    );

    if (selectedTaskDetail?.id === taskId) {
      setSelectedTaskDetail((prev) => {
        if (!prev) return null;
        return { ...prev, comments: [...(prev.comments || []), newComment] };
      });
    }

    toast.success("Comment posted");
  };

  const handleToggleBlocker = (taskId: string, reason?: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;

    const willBeBlocked = !targetTask.isBlocked;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          isBlocked: willBeBlocked,
          status: willBeBlocked ? "blocked" : t.status === "blocked" ? "in_progress" : t.status,
          blockedReason: willBeBlocked
            ? reason || "Technical dependency impediment flagged"
            : undefined,
        };
      })
    );

    if (selectedTaskDetail?.id === taskId) {
      setSelectedTaskDetail((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          isBlocked: willBeBlocked,
          status: willBeBlocked
            ? "blocked"
            : prev.status === "blocked"
              ? "in_progress"
              : prev.status,
          blockedReason: willBeBlocked
            ? reason || "Technical dependency impediment flagged"
            : undefined,
        };
      });
    }

    // Add activity item
    const newActivity: ActivityLogItem = {
      id: `act-${Date.now()}`,
      user: {
        name: "Akash Mohan",
        avatar: MOCK_DEVELOPERS[0].avatar,
        role: "Lead Architect",
      },
      action: willBeBlocked ? "flagged deliverable as Blocker" : "resolved and cleared impediment",
      target: targetTask.title,
      taskCode: targetTask.taskCode,
      timestamp: "Just now",
      type: "blocker_flagged",
    };
    setActivities((prev) => [newActivity, ...prev]);

    if (willBeBlocked) {
      toast.error(`Impediment flagged on ${targetTask.taskCode}`);
    } else {
      toast.success(`Blocker resolved on ${targetTask.taskCode}`);
    }
  };

  const handleCreateTask = (newTaskData: Partial<TaskItem>) => {
    const fullTask: TaskItem = {
      id: `task-${Date.now()}`,
      taskCode: newTaskData.taskCode || `WX-${Math.floor(250 + Math.random() * 50)}`,
      title: newTaskData.title || "Untitled Deliverable",
      description: newTaskData.description || "",
      status: newTaskData.status || "todo",
      priority: newTaskData.priority || "medium",
      type: newTaskData.type || "feature",
      team: newTaskData.team || "FinTech Squad",
      projectName: newTaskData.projectName || "Apex Banking Core",
      clientName: newTaskData.clientName || "Apex Financial US",
      assignee: newTaskData.assignee || developers[0],
      reviewer: newTaskData.reviewer,
      storyPoints: newTaskData.storyPoints || 3,
      estimatedHours: newTaskData.estimatedHours || 12,
      loggedHours: 0,
      dueDate: newTaskData.dueDate || "2026-10-25",
      tags: newTaskData.tags || ["Feature"],
      gitBranch: newTaskData.gitBranch,
      subtasks: newTaskData.subtasks || [],
      comments: [],
      attachmentsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setTasks((prev) => [fullTask, ...prev]);

    // Activity log
    const newActivity: ActivityLogItem = {
      id: `act-${Date.now()}`,
      user: {
        name: "Akash Mohan",
        avatar: MOCK_DEVELOPERS[0].avatar,
        role: "Lead Architect",
      },
      action: "provisioned new deliverable",
      target: `${fullTask.taskCode}: ${fullTask.title}`,
      taskCode: fullTask.taskCode,
      timestamp: "Just now",
      type: "task_created",
    };
    setActivities((prev) => [newActivity, ...prev]);

    toast.success(`Deliverable ${fullTask.taskCode} logged to sprint`);
  };

  // Quick Add from Kanban Column Header
  const handleQuickAddColumn = (columnStatus: TaskStatus) => {
    setCreateModalInitialStatus(columnStatus);
    setIsCreateModalOpen(true);
  };

  // Quick To-Dos Handlers
  const handleToggleTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleAddTodo = (todoData: Partial<QuickTodo>) => {
    const newTodo: QuickTodo = {
      id: `todo-${Date.now()}`,
      title: todoData.title || "",
      completed: false,
      category: todoData.category || "Personal",
      priority: todoData.priority || "medium",
      dueTime: todoData.dueTime || "Today",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTodos((prev) => [newTodo, ...prev]);
    toast.success("To-Do added");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    toast.success("Item removed");
  };

  // Meeting Logs Handlers
  const handleToggleActionItem = (meetingId: string, actionId: string) => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id !== meetingId) return m;
        return {
          ...m,
          actionItems: m.actionItems.map((act) =>
            act.id === actionId ? { ...act, done: !act.done } : act
          ),
        };
      })
    );
    toast.success("Action item updated");
  };

  const handleLogMeeting = (meetingData: Partial<MeetingCallLog>) => {
    const fullMeeting: MeetingCallLog = {
      id: `meet-${Date.now()}`,
      title: meetingData.title || "Engineering Sync",
      type: meetingData.type || "Daily Standup",
      client: meetingData.client,
      project: meetingData.project,
      date: meetingData.date || new Date().toISOString().split("T")[0],
      time: meetingData.time || "10:00 AM",
      duration: meetingData.duration || "30m",
      attendees: meetingData.attendees || [],
      platform: meetingData.platform || "Google Meet",
      meetLink: meetingData.meetLink || "https://meet.google.com",
      summary: meetingData.summary || "",
      actionItems: meetingData.actionItems || [],
      relatedTaskCode: meetingData.relatedTaskCode,
    };

    setMeetings((prev) => [fullMeeting, ...prev]);

    // Add activity
    const newActivity: ActivityLogItem = {
      id: `act-${Date.now()}`,
      user: {
        name: "Akash Mohan",
        avatar: MOCK_DEVELOPERS[0].avatar,
        role: "Lead Architect",
      },
      action: "logged sync notes and action items",
      target: fullMeeting.title,
      taskCode: fullMeeting.relatedTaskCode,
      timestamp: "Just now",
      type: "meeting_logged",
    };
    setActivities((prev) => [newActivity, ...prev]);

    toast.success("Meeting call notes published");
  };

  // Jump to task by code
  const handleSelectTaskCode = (taskCode: string) => {
    const found = tasks.find((t) => t.taskCode === taskCode);
    if (found) {
      setSelectedTaskDetail(found);
    } else {
      setSearchQuery(taskCode);
    }
  };

  const pendingTodosCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="w-full space-y-6 pb-20">
      {/* 1. Header with Agile Sprint Stats & Actions */}
      <TaskHeader
        tasks={tasks}
        pendingTodosCount={pendingTodosCount}
        upcomingRemindersCount={reminders.length}
        meetingLogsCount={meetings.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenCreateModal={() => {
          setCreateModalInitialStatus("todo");
          setIsCreateModalOpen(true);
        }}
        onToggleTodoDrawer={() => setIsTodoDrawerOpen(true)}
        onOpenMeetingModal={() => setIsMeetingModalOpen(true)}
        onToggleActivityDrawer={() => setIsActivityDrawerOpen(true)}
      />

      {/* 2. Critical SLA & Sprint Freeze Reminders Banner */}
      <TaskRemindersBanner reminders={reminders} onSelectTaskCode={handleSelectTaskCode} />

      {/* 3. Filter Bar (Search, Developer Avatars, Squads, Projects, Priority) */}
      <TaskFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDeveloperId={selectedDeveloperId}
        onSelectDeveloper={setSelectedDeveloperId}
        developers={developers}
        selectedTeam={selectedTeam}
        onSelectTeam={setSelectedTeam}
        teams={teamsList}
        selectedPriority={selectedPriority}
        onSelectPriority={setSelectedPriority}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        projects={projectsList}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* 4. Active Main View (Kanban Board vs Team Workload vs Dense Table) */}
      {viewMode === "kanban" && (
        <TaskKanbanBoard
          tasks={filteredTasks}
          onOpenDetails={setSelectedTaskDetail}
          onMoveStatus={handleMoveStatus}
          onQuickAddTask={handleQuickAddColumn}
          onToggleBlocker={handleToggleBlocker}
        />
      )}

      {viewMode === "workload" && (
        <TaskTeamWorkloadView
          developers={developers}
          tasks={filteredTasks}
          onOpenDetails={setSelectedTaskDetail}
          onQuickAddTask={handleQuickAddColumn}
        />
      )}

      {viewMode === "table" && (
        <TaskTableView
          tasks={filteredTasks}
          onOpenDetails={setSelectedTaskDetail}
          onMoveStatus={handleMoveStatus}
        />
      )}

      {/* 5. Slide-overs & Modals */}
      {/* Detailed Task Modal */}
      {selectedTaskDetail && (
        <TaskDetailModal
          task={selectedTaskDetail}
          onClose={() => setSelectedTaskDetail(null)}
          onUpdateStatus={handleMoveStatus}
          onToggleSubtask={handleToggleSubtask}
          onAddSubtask={handleAddSubtask}
          onAddComment={handleAddComment}
          onToggleBlocker={handleToggleBlocker}
          developers={developers}
        />
      )}

      {/* Create Task Modal */}
      <TaskCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
        developers={developers}
        initialStatus={createModalInitialStatus}
      />

      {/* Personal Developer Quick To-Do Drawer */}
      <TaskQuickTodoDrawer
        isOpen={isTodoDrawerOpen}
        onClose={() => setIsTodoDrawerOpen(false)}
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onAddTodo={handleAddTodo}
        onDeleteTodo={handleDeleteTodo}
      />

      {/* Meeting & Call Logs Modal */}
      <TaskMeetingLogsModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        meetings={meetings}
        onToggleActionItem={handleToggleActionItem}
        onLogMeeting={handleLogMeeting}
        developers={developers}
      />

      {/* Live Activity Audit Trail Drawer */}
      <TaskActivityTracker
        isOpen={isActivityDrawerOpen}
        onClose={() => setIsActivityDrawerOpen(false)}
        activities={activities}
        onSelectTaskCode={handleSelectTaskCode}
      />
    </div>
  );
}
