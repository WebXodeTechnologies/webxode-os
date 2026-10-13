"use client";

import React, { useState } from "react";
import { X, AlertCircle, ChevronDown, LayersArrowUp, ArrowRightToLine } from "lucide-react";
import { Ticket } from "./TicketCard";

interface RaiseTicketModalProps {
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, "id" | "ticketCode" | "createdAt" | "slaHours">) => void;
}

const teamMembers = [
  { name: "Akash SM", dept: "Engineering" as const },
  { name: "Priya Sharma", dept: "Design" as const },
  { name: "Rahul Verma", dept: "Engineering" as const },
  { name: "Ananya Iyer", dept: "Sales" as const },
  { name: "Karthik Raja", dept: "Engineering" as const },
];

const clients = [
  "Aishwarya Art Gallery",
  "The Green Naturals",
  "Webxode Internal",
  "Kiran Jewellers",
  "Apex Fitness Studio",
  "TechNova Solutions",
  "BlueSky Retail",
];

export default function RaiseTicketModal({ onClose, onSubmit }: RaiseTicketModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    clientName: clients[0],
    priority: "P2 - Normal" as Ticket["priority"],
    type: "Bug" as Ticket["type"],
    status: "Open" as Ticket["status"],
    assignee: teamMembers[0].name,
    assigneeDept: teamMembers[0].dept,
    dueDate: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAssigneeChange = (name: string) => {
    const m = teamMembers.find((t) => t.name === name);
    setForm((f) => ({ ...f, assignee: name, assigneeDept: m?.dept ?? "Engineering" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit(form);
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(onClose, 1400);
    }, 700);
  };

  const priorityOptions: Ticket["priority"][] = [
    "P0 - Critical",
    "P1 - High",
    "P2 - Normal",
    "P3 - Low",
  ];

  const typeOptions: Ticket["type"][] = [
    "Bug",
    "Feature Request",
    "Performance",
    "Integration",
    "Design",
    "Sales",
  ];

  const priorityColors: Record<Ticket["priority"], string> = {
    "P0 - Critical": "border-rose-500 bg-rose-600 text-white shadow-rose-500/30",
    "P1 - High": "border-amber-500 bg-amber-500 text-white shadow-amber-500/30",
    "P2 - Normal": "border-blue-500 bg-blue-500 text-white shadow-blue-500/20",
    "P3 - Low": "border-slate-300 bg-slate-100 text-slate-600 shadow-none",
  };

  const typeEmoji: Record<Ticket["type"], string> = {
    Bug: "🐛",
    "Feature Request": "✨",
    Performance: "⚡",
    Integration: "🔗",
    Design: "🎨",
    Sales: "💼",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      {/* Modal */}
      <div className="animate-in fade-in zoom-in-95 relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white">
              <LayersArrowUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Raise a New Ticket</h2>
              <p className="text-[11px] text-indigo-200">Internal client issue tracker</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
              ✅
            </div>
            <h3 className="text-sm font-bold text-slate-900">Ticket Raised Successfully!</h3>
            <p className="text-xs text-slate-500">
              Your ticket has been created and assigned. The team will be notified.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex max-h-[75vh] flex-col gap-5 overflow-y-auto p-6"
          >
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Ticket Title <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Stripe webhook failing in production..."
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Description / Steps to Reproduce
              </label>
              <textarea
                rows={3}
                placeholder="Describe the issue, expected behavior, and any relevant logs or screenshots..."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
              />
            </div>

            {/* Row: Client + Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Client Account</label>
                <div className="relative">
                  <select
                    value={form.clientName}
                    onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-8 pl-3.5 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-3 right-2.5 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Ticket Type</label>
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, type: e.target.value as Ticket["type"] }))
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-8 pl-3.5 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
                  >
                    {typeOptions.map((t) => (
                      <option key={t} value={t}>
                        {typeEmoji[t]} {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-3 right-2.5 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Priority Pills */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700">Priority</label>
              <div className="grid grid-cols-4 gap-2">
                {priorityOptions.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, priority: p }))}
                    className={`rounded-xl border py-2 text-xs font-bold shadow-md transition ${
                      form.priority === p
                        ? priorityColors[p]
                        : "border-slate-200 bg-white text-slate-600 shadow-none hover:border-slate-300"
                    }`}
                  >
                    {p.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Row: Assignee + Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Assign To</label>
                <div className="relative">
                  <select
                    value={form.assignee}
                    onChange={(e) => handleAssigneeChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-8 pl-3.5 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-3 right-2.5 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Due Date (Optional)</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
                />
              </div>
            </div>

            {/* P0 Warning */}
            {form.priority === "P0 - Critical" && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                <p className="text-xs text-rose-700">
                  <span className="font-bold">P0 Critical</span> — This ticket will trigger an
                  immediate Slack alert and requires resolution within{" "}
                  <span className="font-bold">4 hours SLA</span>.
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center gap-3 border-t border-slate-100 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !form.title.trim()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Raising Ticket…</span>
                  </>
                ) : (
                  <>
                    <ArrowRightToLine className="h-4 w-4" />
                    <span>Raise Ticket</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
