"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { MessageSquare, Send, Hash, Paperclip, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: string;
  channel: string;
  message: string;
  time: string;
  unread: boolean;
  avatarBg: string;
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
      avatarBg: "bg-purple-600",
    },
    {
      id: "2",
      sender: "Karthik Raja",
      channel: "engineering",
      message: "Staging environment deployed for Webxode OS v2 release candidate.",
      time: "45m ago",
      unread: true,
      avatarBg: "bg-blue-600",
    },
    {
      id: "3",
      sender: "Akash S M",
      channel: "sales",
      message: "Visual Bridge Foundation client meeting confirmed for 10:30 AM today.",
      time: "2h ago",
      unread: false,
      avatarBg: "bg-indigo-600",
    },
  ]);

  const [inputMsg, setInputMsg] = useState("");
  const [activeChannel, setActiveChannel] = useState("engineering");

  const channels = [
    { id: "engineering", name: "engineering", count: 2 },
    { id: "sales", name: "sales", count: 1 },
    { id: "design", name: "design", count: 1 },
    { id: "general", name: "general", count: 0 },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "Akash S M",
      channel: activeChannel,
      message: inputMsg.trim(),
      time: "Just now",
      unread: false,
      avatarBg: "bg-indigo-600",
    };
    setMessages([newMsg, ...messages]);
    setInputMsg("");
  };

  const filteredMessages = messages.filter((m) => m.channel === activeChannel);

  return (
    <WidgetCard>
      <WidgetHeader
        title="Live Team Chat & Workspace Snippets"
        subtitle="Real-time team messaging channels, announcements, and quick updates"
        badge="4 Active Channels"
        badgeVariant="indigo"
      />

      {/* Channel Switcher Pills */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-2xl bg-slate-100/80 p-1.5">
        {channels.map((ch) => {
          const isActive = activeChannel === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChannel(ch.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Hash className="h-3.5 w-3.5 opacity-70" />
              <span>{ch.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Timeline */}
      <div className="mb-4 max-h-60 space-y-3 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className={`group flex items-start gap-3 rounded-2xl border p-3.5 transition-all ${
                  msg.unread
                    ? "border-indigo-200 bg-indigo-50/40 text-slate-900 shadow-2xs"
                    : "border-slate-200/80 bg-slate-50/60 text-slate-800"
                }`}
              >
                {/* Sender Avatar Initials */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white shadow-xs ${msg.avatarBg}`}
                >
                  {msg.sender
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">{msg.sender}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{msg.time}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed font-medium text-slate-700 sm:text-sm">
                    {msg.message}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs font-semibold text-slate-400"
            >
              <MessageSquare className="mb-1 h-6 w-6 text-indigo-400" />
              <p>No messages in #{activeChannel} yet. Start the conversation!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Send Message Input Form */}
      <form onSubmit={handleSend} className="relative flex items-center gap-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder={`Message #${activeChannel}...`}
          className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 py-3 pr-12 pl-4 text-xs font-semibold text-slate-900 placeholder-slate-400 shadow-2xs transition focus:border-indigo-300 focus:bg-white focus:outline-none sm:text-sm"
        />

        <div className="absolute right-2 flex items-center gap-1">
          <button
            type="submit"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </WidgetCard>
  );
}
