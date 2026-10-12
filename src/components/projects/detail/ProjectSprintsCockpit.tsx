"use client";

import React, { useState } from "react";
import {
  GitPullRequest,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Target,
  Zap,
  Trash2,
  ChevronRight,
  Filter,
  ExternalLink,
  AlertOctagon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { SprintItem, SprintTaskItem } from "@/modules/projects/project.types";

interface ProjectSprintsCockpitProps {
  initialSprint?: SprintItem;
  projectId: string;
  projectCode: string;
}

export function ProjectSprintsCockpit({
  initialSprint,
  projectId,
  projectCode,
}: ProjectSprintsCockpitProps) {
  const [sprint, setSprint] = useState<SprintItem>(() => {
    if (initialSprint) return initialSprint;
    const now = new Date();
    const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    return {
      id: `sprint_${now.getTime()}`,
      projectId,
      projectCode,
      projectTitle: "Active Project",
      sprintNumber: 1,
      name: "Sprint 1: Core Architecture & Setup",
      goal: "Setup basic architecture, repo CI/CD pipelines, and initial schema MVP.",
      startDate: now.toISOString().split("T")[0],
      endDate: twoWeeksLater.toISOString().split("T")[0],
      status: "Active",
      storyPointsTotal: 0,
      storyPointsCompleted: 0,
      tasks: [],
    };
  });

  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isNewSprintModalOpen, setIsNewSprintModalOpen] = useState(false);

  // New task form fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskRole, setTaskRole] = useState<SprintTaskItem["roleTag"]>("Frontend");
  const [taskPriority, setTaskPriority] = useState<SprintTaskItem["priority"]>("Medium");
  const [taskStatus, setTaskStatus] = useState<SprintTaskItem["status"]>("In Progress");
  const [taskAssignee, setTaskAssignee] = useState("Alex Rivera");
  const [taskPoints, setTaskPoints] = useState(3);
  const [taskPrUrl, setTaskPrUrl] = useState("");

  // New sprint form fields
  const [newSprintName, setNewSprintName] = useState("");
  const [newSprintGoal, setNewSprintGoal] = useState("");
  const [newSprintEnd, setNewSprintEnd] = useState("");

  const columns: { title: string; status: SprintTaskItem["status"]; color: string }[] = [
    { title: "Backlog", status: "Backlog", color: "bg-slate-400" },
    { title: "Ready for Dev", status: "Ready for Dev", color: "bg-sky-500" },
    { title: "In Progress", status: "In Progress", color: "bg-indigo-600" },
    { title: "PR Review", status: "PR Review", color: "bg-purple-600" },
    { title: "Done", status: "Done", color: "bg-emerald-500" },
  ];

  const handleAdvanceStatus = (taskId: string) => {
    const statusFlow: SprintTaskItem["status"][] = [
      "Backlog",
      "Ready for Dev",
      "In Progress",
      "PR Review",
      "QA / Testing",
      "Done",
    ];

    setSprint((prev) => {
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const curIdx = statusFlow.indexOf(t.status);
        const nextStatus = curIdx < statusFlow.length - 1 ? statusFlow[curIdx + 1] : t.status;
        toast.success(`Task advanced to ${nextStatus}!`);
        return { ...t, status: nextStatus };
      });

      const completed = updatedTasks
        .filter((t) => t.status === "Done")
        .reduce((sum, t) => sum + (t.storyPoints || 0), 0);

      return {
        ...prev,
        tasks: updatedTasks,
        storyPointsCompleted: completed,
      };
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setSprint((prev) => {
      const updated = prev.tasks.filter((t) => t.id !== taskId);
      const total = updated.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
      const completed = updated
        .filter((t) => t.status === "Done")
        .reduce((sum, t) => sum + (t.storyPoints || 0), 0);

      toast.success("Task deleted from sprint.");
      return {
        ...prev,
        tasks: updated,
        storyPointsTotal: total,
        storyPointsCompleted: completed,
      };
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: SprintTaskItem = {
      id: `task_${Date.now()}`,
      taskId: `${projectCode.replace("PRJ-", "")}-T${Math.floor(100 + Math.random() * 900)}`,
      title: taskTitle.trim(),
      description: "",
      roleTag: taskRole,
      priority: taskPriority,
      status: taskStatus,
      assignee: taskAssignee.trim(),
      assigneeRole: taskRole === "UI/UX" ? "Designer" : "Developer",
      storyPoints: Number(taskPoints),
      estimatedHours: Number(taskPoints) * 3,
      prUrl: taskPrUrl.trim() || undefined,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    };

    setSprint((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
      storyPointsTotal: prev.storyPointsTotal + newTask.storyPoints,
      storyPointsCompleted:
        newTask.status === "Done"
          ? prev.storyPointsCompleted + newTask.storyPoints
          : prev.storyPointsCompleted,
    }));

    setIsTaskModalOpen(false);
    setTaskTitle("");
    setTaskPrUrl("");
    toast.success(`Task ${newTask.taskId} created and added to ${sprint.name}!`);
  };

  const handleCreateSprint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSprintName.trim()) return;

    setSprint({
      id: `sprint_${Date.now()}`,
      projectId,
      projectCode,
      projectTitle: "Active Project",
      sprintNumber: sprint.sprintNumber + 1,
      name: newSprintName.trim(),
      goal: newSprintGoal.trim() || "Complete planned sprint deliverables.",
      startDate: new Date().toISOString().split("T")[0],
      endDate:
        newSprintEnd || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "Active",
      storyPointsTotal: 0,
      storyPointsCompleted: 0,
      tasks: [],
    });

    setIsNewSprintModalOpen(false);
    setNewSprintName("");
    setNewSprintGoal("");
    toast.success("New active sprint cycle initiated!");
  };

  const filteredTasks =
    selectedRole === "All" ? sprint.tasks : sprint.tasks.filter((t) => t.roleTag === selectedRole);

  const completionPercent = sprint.storyPointsTotal
    ? Math.round((sprint.storyPointsCompleted / sprint.storyPointsTotal) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Sprint Header Banner */}
      <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black tracking-wider text-indigo-700 uppercase">
                Sprint Execution
              </span>
              <span className="text-xs font-bold text-slate-400">• {projectCode}</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                Sprint #{sprint.sprintNumber}
              </span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{sprint.name}</h2>

            <div className="flex max-w-2xl items-start gap-2 text-xs text-slate-600">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
              <p>
                <strong className="text-slate-800">Sprint Goal:</strong> {sprint.goal}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {sprint.startDate} → {sprint.endDate}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>
                  <strong className="text-slate-900">{sprint.storyPointsCompleted}</strong> of{" "}
                  <strong className="text-slate-900">{sprint.storyPointsTotal}</strong> Story Points
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="w-full sm:w-48 lg:text-right">
              <div className="flex items-center justify-between gap-2 text-xs font-bold lg:justify-end">
                <span className="text-slate-500">Sprint Burndown</span>
                <span className="font-black text-slate-900">{completionPercent}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsNewSprintModalOpen(true)}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                + New Sprint
              </button>

              <button
                type="button"
                onClick={() => setIsTaskModalOpen(true)}
                className="flex cursor-pointer items-center gap-1.5 rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Sprint Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Role Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-600">Filter Tasks by Role:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Frontend", "Backend", "DevOps", "UI/UX", "QA"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedRole === role
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Column Interactive Kanban Board */}
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status);
          const colPoints = colTasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);

          return (
            <div
              key={col.status}
              className="flex min-h-115 flex-col rounded-3xl border border-slate-200/80 bg-slate-50/70 p-3 shadow-2xs"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.color}`} />
                  <h3 className="text-xs font-black text-slate-800">{col.title}</h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-slate-500">
                  <span className="rounded-full bg-slate-200/80 px-2 py-0.5">
                    {colTasks.length}
                  </span>
                  <span>({colPoints}pt)</span>
                </div>
              </div>

              <div className="mt-3 flex flex-1 flex-col gap-2.5">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group space-y-2 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs transition-all hover:border-slate-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-black text-slate-400">
                        {task.taskId}
                      </span>
                      <span className="py-0.2 rounded bg-slate-100 px-1.5 text-[9px] font-bold text-slate-600">
                        {task.roleTag}
                      </span>
                    </div>

                    <h4 className="line-clamp-2 text-xs leading-snug font-bold text-slate-900">
                      {task.title}
                    </h4>

                    {task.prUrl && (
                      <a
                        href={task.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        <GitPullRequest className="h-2.5 w-2.5" />
                        <span>PR Link</span>
                        <ExternalLink className="h-2 w-2" />
                      </a>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                      <span className="font-semibold text-slate-500">{task.assignee}</span>
                      <div className="flex items-center gap-1">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-700">
                          {task.storyPoints}pt
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.id)}
                          className="cursor-pointer p-1 text-slate-300 transition-colors hover:text-rose-600"
                          title="Delete task"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                        {task.status !== "Done" && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceStatus(task.id)}
                            className="cursor-pointer p-1 text-slate-400 transition-colors hover:text-indigo-600"
                            title="Move to next stage"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="my-auto py-8 text-center text-[11px] font-semibold text-slate-400">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Add Task to {sprint.name}</h3>
              <button
                type="button"
                onClick={() => setIsTaskModalOpen(false)}
                className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Task Title *</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Implement WebSocket reconnection retry"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Role Tag</label>
                  <select
                    value={taskRole}
                    onChange={(e) => setTaskRole(e.target.value as any)}
                    className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps">DevOps</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="QA">QA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Initial Status</label>
                  <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value as any)}
                    className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="Ready for Dev">Ready for Dev</option>
                    <option value="In Progress">In Progress</option>
                    <option value="PR Review">PR Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Assignee Name</label>
                  <input
                    type="text"
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Story Points</label>
                  <input
                    type="number"
                    min={1}
                    max={21}
                    value={taskPoints}
                    onChange={(e) => setTaskPoints(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">PR URL (Optional)</label>
                <input
                  type="url"
                  value={taskPrUrl}
                  onChange={(e) => setTaskPrUrl(e.target.value)}
                  placeholder="https://github.com/.../pull/12"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Sprint Modal */}
      {isNewSprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Initiate Next Sprint</h3>
              <button
                type="button"
                onClick={() => setIsNewSprintModalOpen(false)}
                className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSprint} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Sprint Name *</label>
                <input
                  type="text"
                  required
                  value={newSprintName}
                  onChange={(e) => setNewSprintName(e.target.value)}
                  placeholder={`Sprint ${sprint.sprintNumber + 1}: Feature Release`}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Sprint Goal</label>
                <textarea
                  rows={2}
                  value={newSprintGoal}
                  onChange={(e) => setNewSprintGoal(e.target.value)}
                  placeholder="Key milestone or feature deliverables for this sprint..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">End Date</label>
                <input
                  type="date"
                  value={newSprintEnd}
                  onChange={(e) => setNewSprintEnd(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewSprintModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  Start Sprint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
