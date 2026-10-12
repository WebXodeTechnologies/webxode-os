"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ProjectNavHeader } from "@/components/projects/ProjectNavHeader";
import { SprintHeader } from "@/components/projects/sprints/SprintHeader";
import { SprintKanbanBoard } from "@/components/projects/sprints/SprintKanbanBoard";
import { SprintNewTaskModal } from "@/components/projects/sprints/SprintNewTaskModal";
import { SprintItem, SprintTaskItem } from "@/modules/projects/project.types";

interface SprintsPageClientProps {
  initialSprints: SprintItem[];
}

export function SprintsPageClient({ initialSprints }: SprintsPageClientProps) {
  const [sprints, setSprints] = useState<SprintItem[]>(initialSprints);
  const [activeSprintId, setActiveSprintId] = useState<string>(
    initialSprints[0]?.id || "sprint_101_4"
  );
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [targetColumnStatus, setTargetColumnStatus] = useState<SprintTaskItem["status"]>("Backlog");

  const currentSprint = sprints.find((s) => s.id === activeSprintId) || sprints[0];

  const handleAdvanceTaskStatus = (taskId: string) => {
    const statusFlow: SprintTaskItem["status"][] = [
      "Backlog",
      "Ready for Dev",
      "In Progress",
      "PR Review",
      "QA / Testing",
      "Done",
    ];

    setSprints((prevSprints) =>
      prevSprints.map((sprint) => {
        if (sprint.id !== activeSprintId) return sprint;

        const updatedTasks = sprint.tasks.map((task) => {
          if (task.id !== taskId) return task;
          const currIdx = statusFlow.indexOf(task.status);
          const nextStatus =
            currIdx < statusFlow.length - 1 ? statusFlow[currIdx + 1] : task.status;
          toast.success(`Task ${task.taskId} advanced to ${nextStatus}!`);
          return { ...task, status: nextStatus };
        });

        const completedPoints = updatedTasks
          .filter((t) => t.status === "Done")
          .reduce((sum, t) => sum + (t.storyPoints || 0), 0);

        return {
          ...sprint,
          tasks: updatedTasks,
          storyPointsCompleted: completedPoints,
        };
      })
    );
  };

  const handleCreateTask = (taskData: Partial<SprintTaskItem>) => {
    setSprints((prevSprints) =>
      prevSprints.map((sprint) => {
        if (sprint.id !== activeSprintId) return sprint;
        const newTask = taskData as SprintTaskItem;
        toast.success(`Task ${newTask.taskId} added to ${sprint.name}!`);
        return {
          ...sprint,
          tasks: [newTask, ...sprint.tasks],
          storyPointsTotal: sprint.storyPointsTotal + (newTask.storyPoints || 0),
        };
      })
    );
  };

  const handleOpenAddTaskModal = (status: SprintTaskItem["status"]) => {
    setTargetColumnStatus(status);
    setIsNewTaskModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Project Navigation Header */}
      <ProjectNavHeader
        totalProjectsCount={5}
        activeSprintsCount={sprints.length}
        healthyEnvsCount={11}
        onNewProject={() => {}}
      />

      {/* 2. Active Sprint Header */}
      {currentSprint && (
        <SprintHeader
          sprint={currentSprint}
          availableSprints={sprints}
          onSprintSelect={setActiveSprintId}
          onNewTask={() => handleOpenAddTaskModal("Backlog")}
        />
      )}

      {/* 3. 6-Column Kanban Board */}
      {currentSprint && (
        <SprintKanbanBoard
          tasks={currentSprint.tasks}
          onAdvanceTaskStatus={handleAdvanceTaskStatus}
          onAddTask={handleOpenAddTaskModal}
        />
      )}

      {/* 4. New Task Modal */}
      <SprintNewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        initialStatus={targetColumnStatus}
      />
    </div>
  );
}
