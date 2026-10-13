"use client";

import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  const quickReplies = [
    "✅ Resolved & Verified",
    "🔍 Checking the logs now",
    "🚀 Deploying fix to staging",
    "💡 Let's discuss on call",
  ];

  return (
    <div className="flex flex-col gap-3 border-t border-zinc-800 bg-zinc-950 p-4">
      {/* Quick Replies Row */}
      <div className="flex scrollbar-none items-center gap-2 overflow-x-auto pb-1">
        {quickReplies.map((reply, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(reply)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs whitespace-nowrap text-zinc-300 transition hover:bg-zinc-800"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-zinc-400 transition hover:text-zinc-200"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          placeholder="Type your message or doubt resolution..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 transition focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="button"
          className="rounded-lg p-2 text-zinc-400 transition hover:text-zinc-200"
        >
          <Smile className="h-5 w-5" />
        </button>
        <button
          type="submit"
          className="flex items-center justify-center rounded-xl bg-indigo-600 p-3 text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
