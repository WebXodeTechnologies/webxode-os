"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Search,
  Rocket,
  PhoneCall,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Plus,
  Send,
} from "lucide-react";

interface TeamQuickActionProps {
  onActionTrigger: (actionTitle: string, payload?: string) => void;
}

export default function TeamQuickAction({ onActionTrigger }: TeamQuickActionProps) {
  const [customInput, setCustomInput] = useState("");
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const actions = [
    {
      title: "Resolved & Verified",
      description: "Mark current task/bug as tested and closed",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
      color: "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300",
      payload: "✅ Status Update: Issue Resolved & Verified in staging.",
    },
    {
      title: "Checking Logs",
      description: "Inspect server, Sentry, or container logs",
      icon: <Search className="h-4 w-4 text-amber-400" />,
      color: "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-300",
      payload: "🔍 Investigating production logs and trace IDs now.",
    },
    {
      title: "Deploying to Staging",
      description: "Trigger CI/CD pipeline push to preview",
      icon: <Rocket className="h-4 w-4 text-indigo-400" />,
      color: "border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300",
      payload: "🚀 Initiating deployment to staging environment.",
    },
    {
      title: "Urgent Bridge Call",
      description: "Request immediate voice/video huddle",
      icon: <PhoneCall className="h-4 w-4 text-rose-400" />,
      color: "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-300",
      payload: "📞 Urgent: Please join the emergency bridge call.",
    },
    {
      title: "Security Alert",
      description: "Flag potential vulnerability or auth anomaly",
      icon: <ShieldCheck className="h-4 w-4 text-cyan-400" />,
      color: "border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-300",
      payload: "🛡️ Security review triggered: Verifying access controls and tokens.",
    },
    {
      title: "Hotfix Required",
      description: "Escalate critical production blocker",
      icon: <AlertTriangle className="h-4 w-4 text-orange-400" />,
      color: "border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 text-orange-300",
      payload: "⚠️ Critical Blocker: Preparing immediate hotfix patch.",
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onActionTrigger("Custom Operational Dispatch", customInput);
    setCustomInput("");
    setIsCustomOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-600/10 p-2 text-indigo-400">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-200">Team Quick Actions</h3>
            <p className="text-xs text-zinc-500">
              Instant workflow triggers for engineering & sales ops
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsCustomOpen(!isCustomOpen)}
          className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-zinc-800"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Custom Dispatch</span>
        </button>
      </div>

      {/* Custom Input Drawer (Conditionally Opened) */}
      {isCustomOpen && (
        <form
          onSubmit={handleCustomSubmit}
          className="animate-in fade-in zoom-in-95 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 duration-150"
        >
          <input
            type="text"
            placeholder="Type custom operational dispatch message..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="flex-1 border-none bg-transparent px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-indigo-600 p-2 text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      )}

      {/* Action Grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => onActionTrigger(action.title, action.payload)}
            className={`group flex flex-col items-start rounded-xl border p-3 text-left transition duration-200 ${action.color}`}
          >
            <div className="mb-1.5 flex w-full items-center justify-between">
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-1.5 transition-transform group-hover:scale-105">
                {action.icon}
              </div>
              <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase group-hover:text-zinc-400">
                Dispatch
              </span>
            </div>
            <span className="mb-0.5 text-xs font-semibold text-zinc-200">{action.title}</span>
            <span className="line-clamp-1 text-[11px] text-zinc-400">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
