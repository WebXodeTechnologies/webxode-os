"use client";

import React, { useState } from "react";
import { MessageSquare, PhoneCall, Mail, Send } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  type: "Call" | "Mail" | "Note";
  text: string;
  timestamp: string;
}

interface LeadInteractionLogProps {
  comments: Comment[];
  onAddComment: (text: string, type: "Call" | "Mail" | "Note") => void;
}

export function LeadInteractionLog({ comments, onAddComment }: LeadInteractionLogProps) {
  const [text, setText] = useState("");
  const [type, setType] = useState<"Call" | "Mail" | "Note">("Note");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    onAddComment(text, type);
    setText("");
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <h3 className="text-sm font-black text-slate-900">Interaction History & Comments Log</h3>

      <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
        {comments.map((c) => (
          <div
            key={c.id}
            className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50 p-3.5"
          >
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="flex items-center gap-1.5 text-indigo-600">
                {c.type === "Call" && <PhoneCall className="h-3 w-3" />}
                {c.type === "Mail" && <Mail className="h-3 w-3" />}
                {c.type === "Note" && <MessageSquare className="h-3 w-3" />}
                <span>
                  {c.author} ({c.type})
                </span>
              </span>
              <span className="text-slate-400">{c.timestamp}</span>
            </div>
            <p className="text-xs font-semibold text-slate-700">{c.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border-t border-slate-100 pt-2">
        <div className="flex items-center gap-2">
          {(["Note", "Call", "Mail"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition ${type === t ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type comment or call summary..."
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-indigo-500"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
          >
            <Send className="h-4 w-4" />
            <span>Post</span>
          </button>
        </div>
      </form>
    </div>
  );
}
