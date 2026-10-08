"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { Plus, Trash2, Pin, Check } from "lucide-react";

interface StickyNote {
  id: string;
  content: string;
  color: "amber" | "indigo" | "emerald" | "rose";
  pinned: boolean;
  date: string;
}

export function StickyNotesWidget() {
  const [notes, setNotes] = useState<StickyNote[]>([
    {
      id: "1",
      content: "Follow up with Annai Agro for final SOW sign-off before 4 PM.",
      color: "amber",
      pinned: true,
      date: "Today, 10:30 AM",
    },
    {
      id: "2",
      content: "API rate limiting configuration for Webxode OS v2 release.",
      color: "indigo",
      pinned: true,
      date: "Yesterday",
    },
    {
      id: "3",
      content: "Send revised invoice #482 to Aishwarya Handicrafts.",
      color: "emerald",
      pinned: false,
      date: "Oct 6",
    },
  ]);

  const [newContent, setNewContent] = useState("");
  const [selectedColor, setSelectedColor] = useState<"amber" | "indigo" | "emerald" | "rose">(
    "amber"
  );

  const colorStyles = {
    amber: "bg-amber-50/90 border-amber-200/90 text-amber-950 hover:border-amber-300",
    indigo: "bg-indigo-50/90 border-indigo-200/90 text-indigo-950 hover:border-indigo-300",
    emerald: "bg-emerald-50/90 border-emerald-200/90 text-emerald-950 hover:border-emerald-300",
    rose: "bg-rose-50/90 border-rose-200/90 text-rose-950 hover:border-rose-300",
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    const newNote: StickyNote = {
      id: Date.now().toString(),
      content: newContent.trim(),
      color: selectedColor,
      pinned: false,
      date: "Just now",
    };
    setNotes([newNote, ...notes]);
    setNewContent("");
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Quick Scratchpad & Sticky Notes"
        subtitle="Instant reminders, quick thoughts, and pinned workspace notes"
        badge={`${notes.length} Notes`}
        badgeVariant="indigo"
      />

      {/* Input form to add quick note */}
      <form onSubmit={handleAddNote} className="mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Type a quick note or reminder..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-indigo-600 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>Note Color:</span>
          {(["amber", "indigo", "emerald", "rose"] as const).map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`h-5 w-5 rounded-full border border-black/10 transition ${
                color === "amber"
                  ? "bg-amber-300"
                  : color === "indigo"
                    ? "bg-indigo-300"
                    : color === "emerald"
                      ? "bg-emerald-300"
                      : "bg-rose-300"
              } ${selectedColor === color ? "ring-2 ring-slate-900 ring-offset-1" : ""}`}
            />
          ))}
        </div>
      </form>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`group relative flex flex-col justify-between rounded-2xl border p-4 shadow-xs transition-all ${colorStyles[note.color]}`}
          >
            <div>
              <div className="flex items-center justify-between text-xs opacity-60">
                <span className="font-semibold">{note.date}</span>
                <button
                  type="button"
                  onClick={() => handleTogglePin(note.id)}
                  title={note.pinned ? "Unpin note" : "Pin note"}
                  className="transition hover:opacity-100"
                >
                  <Pin
                    className={`h-3.5 w-3.5 ${note.pinned ? "fill-slate-900 text-slate-900" : ""}`}
                  />
                </button>
              </div>
              <p className="mt-2 text-xs leading-relaxed font-bold sm:text-sm">{note.content}</p>
            </div>

            <div className="mt-3 flex justify-end border-t border-black/5 pt-2">
              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                title="Delete note"
                className="opacity-40 transition hover:text-rose-600 hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
