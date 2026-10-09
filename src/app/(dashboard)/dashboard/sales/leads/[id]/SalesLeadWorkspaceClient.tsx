"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { LeadFunnelTracker } from "@/components/sales/LeadFunnelTracker";
import { LeadTaskChecklist } from "@/components/sales/LeadTaskChecklist";
import { LeadInteractionLog } from "@/components/sales/LeadInteractionLog";
import { PresalesHandoffCard } from "@/components/sales/PresalesHandoffCard";
import { CallManager } from "@/components/sales/CallManager";
import { DemoScheduler } from "@/components/sales/DemoScheduler";
import {
  updateLeadStage,
  addLeadActivity,
  addLeadTask,
  toggleLeadTask,
} from "@/server/actions/sales.actions";

interface SalesLeadWorkspaceClientProps {
  leadId: string;
  initialLead: any;
  initialActivities: any[];
}

export function SalesLeadWorkspaceClient({
  leadId,
  initialLead,
  initialActivities,
}: SalesLeadWorkspaceClientProps) {
  const router = useRouter();

  const [currentStage, setCurrentStage] = useState(initialLead?.stage || "Enquiry");

  const handleStageChange = async (newStage: string) => {
    setCurrentStage(newStage);
    const result = await updateLeadStage(leadId, newStage);
    if (result.success) {
      toast.success(`Lead stage updated to ${newStage}`);
    } else {
      toast.error("Failed to update stage");
      setCurrentStage(initialLead?.stage);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    // Optimistic or rely on server action
    const task = initialLead.tasks.find((t: any) => t._id === taskId);
    if (task) {
      const result = await toggleLeadTask(leadId, taskId, !task.completed);
      if (result.success) toast.success("Task updated");
    }
  };

  const handleAddTask = async (title: string, dueDate: string) => {
    const result = await addLeadTask(leadId, title, new Date(dueDate));
    if (result.success) toast.success("Task added");
  };

  const handleAddComment = async (text: string, type: "Call" | "Mail" | "Note") => {
    const result = await addLeadActivity(leadId, type, text);
    if (result.success) toast.success("Activity logged");
  };

  const handleDemoSchedule = async (type: string, date: string, time: string) => {
    await addLeadActivity(leadId, "Note", `Scheduled a ${type} Demo on ${date} at ${time}.`);
    await handleStageChange("Proposal"); // Or Demo Booked/Qualified based on exact blueprint transition
  };

  if (!initialLead) {
    return <div className="p-8 text-center text-slate-500">Lead not found or invalid ID.</div>;
  }

  // Map activities for the component
  const comments = initialActivities.map((act) => ({
    id: act._id,
    author: "User", // Would map to actual user
    type: act.type,
    text: act.content,
    timestamp: new Date(act.createdAt).toLocaleString(),
  }));

  // Map tasks
  const tasks = initialLead.tasks.map((t: any) => ({
    id: t._id?.toString() || t.title,
    title: t.title,
    completed: t.completed,
    dueDate: new Date(t.dueDate).toLocaleDateString(),
  }));

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/sales")}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Master Pipeline</span>
        </button>

        <button
          onClick={async () => {
            await handleStageChange("Dead");
            router.push("/dashboard/sales");
          }}
          className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Mark as Lost/Dead</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white">
            {initialLead.companyName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{initialLead.companyName}</h1>
              <span className="font-mono text-xs font-bold text-slate-400">
                ({leadId.substring(0, 6)})
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              {initialLead.contactPerson} • {initialLead.phone}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Sales Stage
          </span>
          <p className="mt-1 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700 uppercase">
            {currentStage}
          </p>
        </div>
      </div>

      <LeadFunnelTracker currentStage={currentStage} onStageChange={handleStageChange} />

      {/* Grid: 3 Columns for full sales operations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Communications & Booking */}
        <div className="space-y-6">
          <CallManager />
          <DemoScheduler onSchedule={handleDemoSchedule} />
        </div>

        {/* Column 2: Task Management */}
        <div className="space-y-6">
          <LeadTaskChecklist
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />
          <PresalesHandoffCard
            onSendToPresales={async () => {
              // Creating a presales case will be handled by a presales action later, for now we update stage
              await handleStageChange("Proposal");
              toast.success("Lead successfully handed over to Presales.");
            }}
            onBoardToDev={() => {
              toast.error(
                "Invalid action. Must go through Presales and Financial confirmation first."
              );
            }}
          />
        </div>

        {/* Column 3: Nurturing History */}
        <div className="space-y-6">
          <LeadInteractionLog comments={comments} onAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
}
