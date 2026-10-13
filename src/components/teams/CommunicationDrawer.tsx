"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Mail, MessageSquare, CheckCircle2, Lock } from "lucide-react";
import { TeamMember } from "./TeamCard";

interface CommunicationDrawerProps {
  member: TeamMember | null;
  onClose: () => void;
  initialTab?: "chat" | "email";
}

export default function CommunicationDrawer({
  member,
  onClose,
  initialTab = "chat",
}: CommunicationDrawerProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "email">(initialTab);
  const [messageText, setMessageText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Sync tab when initialTab prop changes (e.g. user clicks Email button on a different card)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTab(initialTab);
    setMessageText("");
    setSentSuccess(false);
  }, [initialTab, member?.id]);

  if (!member) return null;

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSubmitting(true);
    if (activeTab === "email") {
      window.location.href = `mailto:${member.email}?subject=Internal Dispatch from Webxode OS&body=${encodeURIComponent(messageText)}`;
      setIsSubmitting(false);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setSentSuccess(true);
        setTimeout(() => {
          setSentSuccess(false);
          setMessageText("");
        }, 2500);
      }, 700);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── Drawer Header ─────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
          <h3 className="text-sm font-bold text-slate-900">
            {activeTab === "chat" ? "Internal Chat" : "Email Client"}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Recipient Card ─────────────────────────── */}
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-xs ${member.avatarBg}`}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{member.name}</p>
          <p className="truncate font-mono text-xs text-slate-500">{member.email}</p>
        </div>
      </div>

      {/* ── Tab Switcher ───────────────────────────── */}
      <div className="mt-4 flex rounded-xl border border-slate-200 bg-slate-100/70 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("chat")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition ${
            activeTab === "chat"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Internal Chat
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("email")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition ${
            activeTab === "email"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          Email Client
        </button>
      </div>

      {/* ── Body: Success or Form ─────────────────── */}
      <div className="mt-4 flex-1">
        {sentSuccess ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900">Message Dispatched!</h4>
              <p className="mt-1 text-xs text-emerald-700">
                Delivered securely to {member.name.split(" ")[0]}&apos;s queue.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  {activeTab === "chat" ? "Message" : "Email Body"}
                </label>
                <div className="flex items-center gap-1 text-[11px] text-indigo-600">
                  <Lock className="h-3 w-3" />
                  <span>Encrypted</span>
                </div>
              </div>
              <textarea
                rows={5}
                required
                placeholder={
                  activeTab === "chat"
                    ? `Write a message to ${member.name.split(" ")[0]}…`
                    : `Draft your email to ${member.email}…`
                }
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !messageText.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sending…</span>
                </>
              ) : activeTab === "chat" ? (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  <span>Open Mail App</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
