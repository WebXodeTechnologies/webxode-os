"use client";

import React, { useState } from "react";
import { X, Send, Clock, User, Tag, Building2, MessageSquare, Zap } from "lucide-react";
import { Ticket, priorityConfig, statusConfig, typeConfig } from "./TicketCard";

interface Comment {
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isSystem?: boolean;
}

interface TicketDetailDrawerProps {
  ticket: Ticket | null;
  onClose: () => void;
  onStatusChange?: (id: string, status: Ticket["status"]) => void;
}

const quickActions = [
  {
    label: "✅ Verify & Close",
    text: "Issue verified in staging — marking as Resolved.",
    color: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
  {
    label: "🔍 Checking Logs",
    text: "Currently investigating server/Sentry logs.",
    color: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
  },
  {
    label: "🚀 Deploying Fix",
    text: "Hotfix branch pushed — triggering staging deploy.",
    color: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  },
  {
    label: "📞 Awaiting Client",
    text: "Waiting for client confirmation / access credentials.",
    color: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
  },
];

export default function TicketDetailDrawer({
  ticket,
  onClose,
  onStatusChange,
}: TicketDetailDrawerProps) {
  // Track previous ticket ID to detect ticket switches and reset state during render
  // (React-recommended pattern: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  const [prevTicketId, setPrevTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [sending, setSending] = useState(false);

  if (ticket?.id !== prevTicketId) {
    setPrevTicketId(ticket?.id ?? null);
    setReplyText("");
    setComments(
      ticket
        ? [
            {
              sender: "System Bot",
              avatar: "🤖",
              text: `Ticket ${ticket.ticketCode} created and routed to ${ticket.assignee}.`,
              time: ticket.createdAt,
              isSystem: true,
            },
          ]
        : []
    );
  }

  if (!ticket) return null;

  const pConfig = priorityConfig[ticket.priority];
  const sConfig = statusConfig[ticket.status];
  const tConfig = typeConfig[ticket.type];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);
    setTimeout(() => {
      setComments((prev) => [
        ...prev,
        {
          sender: "Akash SM",
          avatar: "AS",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setReplyText("");
      setSending(false);
    }, 400);
  };

  const handleQuickAction = (text: string) => {
    setComments((prev) => [
      ...prev,
      {
        sender: "⚡ System Dispatch",
        avatar: "⚡",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isSystem: true,
      },
    ]);
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ───────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 font-mono text-xs font-bold text-indigo-600">
              {ticket.ticketCode}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${pConfig.badge}`}
            >
              {pConfig.label}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${sConfig.badge}`}
            >
              {sConfig.label}
            </span>
          </div>
          <h3 className="mt-2 line-clamp-2 text-sm leading-snug font-bold text-slate-900">
            {ticket.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Meta Info Grid ─────────────────────────── */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { icon: Building2, label: "Client", value: ticket.clientName },
          { icon: User, label: "Assignee", value: ticket.assignee },
          { icon: Tag, label: "Type", value: `${tConfig.icon} ${ticket.type}` },
          { icon: Clock, label: "SLA", value: `${ticket.slaHours}h remaining` },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-0.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
          >
            <div className="flex items-center gap-1.5">
              <Icon className="h-3 w-3 text-slate-400" />
              <span className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                {label}
              </span>
            </div>
            <span className="truncate text-xs font-semibold text-slate-800">{value}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      {ticket.description && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3">
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            Description
          </p>
          <p className="text-xs leading-relaxed text-slate-700">{ticket.description}</p>
        </div>
      )}

      {/* ── Quick Actions ──────────────────────────── */}
      <div className="mt-4">
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
          <Zap className="h-3 w-3" /> Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {quickActions.map((qa) => (
            <button
              key={qa.label}
              onClick={() => handleQuickAction(qa.text)}
              className={`rounded-xl border p-2.5 text-left text-[11px] font-semibold transition ${qa.color}`}
            >
              {qa.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Activity Stream ────────────────────────── */}
      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        <p className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
          <MessageSquare className="h-3 w-3" /> Activity
        </p>
        {comments.map((c, i) => (
          <div key={i} className={`flex gap-2.5 ${c.isSystem ? "opacity-70" : ""}`}>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
              {c.avatar.length <= 2 ? c.avatar : c.avatar.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-800">{c.sender}</span>
                <span className="font-mono text-[9px] text-slate-400">{c.time}</span>
              </div>
              <p
                className={`text-xs leading-relaxed ${c.isSystem ? "text-slate-400 italic" : "text-slate-700"}`}
              >
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Reply Form ─────────────────────────────── */}
      <form
        onSubmit={handleSend}
        className="mt-4 flex shrink-0 flex-col gap-2 border-t border-slate-100 pt-3"
      >
        <textarea
          rows={2}
          placeholder="Add a note or client response..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
        />
        <button
          type="submit"
          disabled={sending || !replyText.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50"
        >
          {sending ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {sending ? "Sending…" : "Send Response"}
        </button>
      </form>
    </div>
  );
}
