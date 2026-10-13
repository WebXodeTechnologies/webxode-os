"use client";

import React from "react";
import { Smile } from "lucide-react";

export interface MessageItem {
  id: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  reactions: string[];
}

interface MessageBubbleListProps {
  messages: MessageItem[];
  onAddReaction: (messageId: string, emoji: string) => void;
}

export function MessageBubbleList({ messages, onAddReaction }: MessageBubbleListProps) {
  const quickEmojis = ["👍", "❤️", "🚀", "🔥", "🎉"];

  return (
    <div className="max-h-[calc(100vh-340px)] flex-1 space-y-4 overflow-y-auto bg-slate-50/50 p-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`group flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
        >
          <div className="mb-1 flex items-center gap-2 px-1">
            <span className="text-xs font-black text-slate-900">{msg.senderName}</span>
            <span className="py-0.2 rounded-md bg-slate-200 px-1.5 text-[9px] font-bold text-slate-600">
              {msg.senderRole}
            </span>
            <span className="text-[10px] font-semibold text-slate-400">{msg.timestamp}</span>
          </div>

          <div className="relative max-w-lg">
            <div
              className={`rounded-2xl px-4 py-3 text-xs font-semibold shadow-2xs ${
                msg.isMe
                  ? "rounded-br-xs bg-indigo-600 text-white"
                  : "rounded-bl-xs border border-slate-200/80 bg-white text-slate-800"
              }`}
            >
              {msg.text}
            </div>

            {/* Quick emoji reaction hover bar */}
            <div
              className={`absolute -top-3 ${msg.isMe ? "left-0" : "right-0"} z-10 hidden items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1 shadow-md group-hover:flex`}
            >
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => onAddReaction(msg.id, emoji)}
                  className="text-xs transition hover:scale-125"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Rendered Reactions */}
          {msg.reactions.length > 0 && (
            <div
              className={`mt-1.5 flex flex-wrap gap-1 ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              {msg.reactions.map((react, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[10px] shadow-2xs"
                >
                  {react}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
