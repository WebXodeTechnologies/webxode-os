"use client";

import React, { useState } from "react";
import { Send, Smile, Paperclip } from "lucide-react";

interface MessageInputBarProps {
  onSendMessage: (text: string) => void;
}

export function MessageInputBar({ onSendMessage }: MessageInputBarProps) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ["😀", "🚀", "🔥", "👍", "💡", "🎉", "❤️", "⚡", "💻", "✅"];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
    setShowEmojiPicker(false);
  };

  const addEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
  };

  return (
    <div className="relative rounded-b-3xl border-t border-slate-100 bg-white p-4">
      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-20 flex w-64 flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          {emojis.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => addEmoji(e)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-base transition hover:bg-slate-100"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100"
          title="Insert Emoji"
        >
          <Smile className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100"
          title="Attach File"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message to internal team (Dev, Finance, Sales)..."
          className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-indigo-500"
        />

        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
