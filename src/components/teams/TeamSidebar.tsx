"use client";

import { useState } from "react";
import { Search, MessageSquare, ShieldCheck, Circle } from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  status: "online" | "busy" | "offline";
  unreadCount?: number;
}

interface TeamSidebarProps {
  members: Member[];
  selectedMemberId: string;
  onSelectMember: (id: string) => void;
}

export default function TeamSidebar({
  members,
  selectedMemberId,
  onSelectMember,
}: TeamSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="flex h-full w-80 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Header & Search */}
      <div className="border-b border-zinc-800 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <MessageSquare className="h-5 w-5 text-indigo-400" />
          Internal Channels
        </h2>
        <div className="relative">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search teammates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pr-4 pl-9 text-sm text-zinc-200 placeholder-zinc-500 transition focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Member List */}
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {filteredMembers.map((member) => {
          const isSelected = member.id === selectedMemberId;
          return (
            <button
              key={member.id}
              onClick={() => onSelectMember(member.id)}
              className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition ${
                isSelected
                  ? "border border-indigo-500/30 bg-indigo-600/10 text-white"
                  : "border border-transparent text-zinc-300 hover:bg-zinc-900/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/20 font-semibold text-indigo-300">
                    {member.name.charAt(0)}
                  </div>
                  <Circle
                    className={`absolute right-0 bottom-0 h-3 w-3 fill-current ${
                      member.status === "online"
                        ? "text-emerald-500"
                        : member.status === "busy"
                          ? "text-amber-500"
                          : "text-zinc-500"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="text-sm leading-tight font-medium">{member.name}</h4>
                  <span className="text-xs text-zinc-500">{member.role}</span>
                </div>
              </div>
              {member.unreadCount && member.unreadCount > 0 ? (
                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
                  {member.unreadCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
