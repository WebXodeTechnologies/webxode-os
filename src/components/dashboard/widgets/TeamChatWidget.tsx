"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { MessageSquare, Send, Hash, User } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: string;
  channel: string;
  message: string;
  time: string;
  unread: boolean;
}

export function TeamChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Priya Sharma",
      channel: "design",
      message: "Figma prototypes for Annai Agro B2B dashboard updated!",
      time: "12m ago",
      unread: true,
    },
    {
      id: "2",
      sender: "Karthik Raja",
      channel: "engineering",
      message: "Staging environment deployed for Webxode OS v2 release candidate.",
      time: "45m ago",
      unread: true,
    },
    {
      id: "3",
      sender: "Akash M.",
      channel: "sales",
      message: "Visual Bridge Foundation client meeting confirmed for 10:30 AM tomorrow.",
      time: "2h ago",
      unread: false,
    },
  ]);

  const [inputMsg, setInputMsg] = useState("");
  const [activeChannel, setActiveChannel] = useState("engineering");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "Akash M. (You)",
      channel: activeChannel,
      message: inputMsg.trim(),
      time: "Just now",
      unread: false,
    };
    setMessages([newMsg, ...messages]);
    setInputMsg("");
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Live Team Chat & Workspace Snippets"
        subtitle="Real-time team messaging channels, announcements, and quick updates"
        badge="4 Active Channels"
        badgeVariant="indigo"
      />

      {/* Channel Switcher Pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["engineering", "sales", "design", "general"].map((ch) => (
          <button
            key={ch}
            type="button"
            onClick={() => setActiveChannel(ch)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              activeChannel === ch
                ? "bg-indigo-600 text-white shadow-xs"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Hash className="h-3.5 w-3.5" />
            <span>{ch}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Timeline */}
      <div className="mb-4 max-h-56 space-y-2.5 overflow-y-auto pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl border p-3 text-xs transition sm:text-sm ${
              msg.unread
                ? "border-indigo-200 bg-indigo-50/40 text-slate-900"
                : "border-slate-100 bg-slate-50/60 text-slate-800"
            }`}
          >
            <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1 text-slate-900">
                <User className="h-3.5 w-3.5 text-indigo-600" />
                {msg.sender}
              </span>
              <span className="font-semibold">
                #{msg.channel} • {msg.time}
              </span>
            </div>
            <p className="font-medium text-slate-800">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Send Message Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder={`Message #${activeChannel}...`}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center rounded-xl bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700 active:scale-95"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </WidgetCard>
  );
}
