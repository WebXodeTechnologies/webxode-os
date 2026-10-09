"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { LeadFunnelTracker } from "@/components/sales/LeadFunnelTracker";
import { LeadTaskChecklist } from "@/components/sales/LeadTaskChecklist";
import { LeadInteractionLog } from "@/components/sales/LeadInteractionLog";
import { PresalesHandoffCard } from "@/components/sales/PresalesHandoffCard";

interface CommentItem {
  id: string;
  author: string;
  type: "Call" | "Mail" | "Note";
  text: string;
  timestamp: string;
}

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export default function ClientDetailWorkspace() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;

  const [currentStage, setCurrentStage] = useState("Qualification");
  const [tasks, setTasks] = useState([
    {
      id: "t1",
      title: "Business model inquiry & scoping call",
      completed: true,
      dueDate: "2026-10-04",
    },
    { id: "t2", title: "Non-technical demo completed", completed: true, dueDate: "2026-10-05" },
    {
      id: "t3",
      title: "Client discovery document preparation",
      completed: false,
      dueDate: "2026-10-12",
    },
  ]);

  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: "c1",
      author: "Akash S M",
      type: "Call",
      text: "Discussed custom supply chain module and GST invoicing requirements.",
      timestamp: "Yesterday, 4:15 PM",
    },
  ]);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
    toast.success("Task status updated!");
  };

  const handleAddTask = (title: string, dueDate: string) => {
    setTasks((prev) => [...prev, { id: `t-${Date.now()}`, title, completed: false, dueDate }]);
    toast.success("New task added to checklist!");
  };

  const handleAddComment = (text: string, type: "Call" | "Mail" | "Note") => {
    setComments((prev) => [
      { id: `c-${Date.now()}`, author: "Akash S M", type, text, timestamp: "Just now" },
      ...prev,
    ]);
    toast.success("Interaction note logged successfully!");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard/sales")}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sales Pipeline</span>
        </button>

        <button
          type="button"
          onClick={() => {
            toast.success("Lead removed.");
            router.push("/dashboard/sales");
          }}
          className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Lead</span>
        </button>
      </div>

      {/* Client Profile Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-black text-white">
            AA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900">Annai Agro Tradings</h1>
              <span className="font-mono text-xs font-bold text-slate-400">
                ({leadId || "LEAD-401"})
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Murugan P. (+91 97890 44221) • GST: 33AABCA1234F1ZP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 uppercase">
            {currentStage}
          </span>
        </div>
      </div>

      {/* Visual Funnel Stage Tracker */}
      <LeadFunnelTracker currentStage={currentStage} onStageChange={setCurrentStage} />

      {/* Grid: Tasks & Interactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <LeadTaskChecklist
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />
          <LeadInteractionLog comments={comments} onAddComment={handleAddComment} />
        </div>

        <div className="space-y-6">
          <PresalesHandoffCard
            onSendToPresales={() => {
              setCurrentStage("Presales Handover");
              toast.success("Discovery records successfully transmitted to Presales team!");
            }}
            onBoardToDev={() => {
              setCurrentStage("Dev Phase Onboarding");
              toast.success(
                "Lead successfully onboarded to Development Phase & Project Initiation!"
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
