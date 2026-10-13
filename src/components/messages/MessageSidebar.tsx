"use client";

import React from "react";
import { Hash, Lock, Users, Circle, Search } from "lucide-react";

export interface ChatThread {
  id: string;
  name: string;
  type: "channel" | "dm";
  department?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface MessageSidebarProps {
  threads: ChatThread[];
  activeThreadId: string;
  onSelectThread: (id: string) => void;
}

export function MessageSidebar({ threads, activeThreadId, onSelectThread }: MessageSidebarProps) {
  const channels = threads.filter((t) => t.type === "channel");
  const dms = threads.filter((t) => t.type === "dm");

  return (
    <aside className="flex w-full shrink-0 flex-col rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs lg:w-72">
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-black text-slate-900">Internal Messenger</h2>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Webxode OS Real-time
          </p>
        </div>
        <span
          className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500"
          title="Socket.io Connected"
        />
      </div>

      <div className="max-h-[calc(100vh-240px)] space-y-4 overflow-y-auto pr-1">
        {/* Channels */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            Team Channels
          </p>
          <div className="space-y-1">
            {channels.map((c) => {
              const isActive = c.id === activeThreadId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectThread(c.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Hash className="h-3.5 w-3.5 opacity-70" />
                    <span>{c.name}</span>
                  </span>
                  {c.unreadCount ? (
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-black ${isActive ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-700"}`}
                    >
                      {c.unreadCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Direct Messages */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            Internal Members (Dev & Finance)
          </p>
          <div className="space-y-1">
            {dms.map((dm) => {
              const isActive = dm.id === activeThreadId;
              return (
                <button
                  key={dm.id}
                  type="button"
                  onClick={() => onSelectThread(dm.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span className="relative flex h-2 w-2">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${dm.isOnline ? "animate-ping bg-emerald-400" : "bg-slate-300"}`}
                      />
                      <span
                        className={`relative inline-flex h-2 w-2 rounded-full ${dm.isOnline ? "bg-emerald-500" : "bg-slate-300"}`}
                      />
                    </span>
                    <span className="truncate">{dm.name}</span>
                  </span>
                  <span
                    className={`text-[10px] opacity-70 ${isActive ? "text-indigo-100" : "text-slate-400"}`}
                  >
                    {dm.department}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
