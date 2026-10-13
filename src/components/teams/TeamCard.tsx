"use client";

import { Mail, MessageSquare, Building2 } from "lucide-react";

// Export the TeamMember interface here so other components can import it
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: "Active on Task" | "In a Meeting" | "Remote / Standby";
  avatarBg: string;
}

interface TeamCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember, mode: "chat" | "email") => void;
  isSelected: boolean;
}

const statusConfig: Record<TeamMember["status"], { dot: string; badge: string; label: string }> = {
  "Active on Task": {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "Active",
  },
  "Remote / Standby": {
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    label: "Remote",
  },
  "In a Meeting": {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Meeting",
  },
};

export default function TeamCard({ member, onSelect, isSelected }: TeamCardProps) {
  const status = statusConfig[member.status];
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 ${
        isSelected
          ? "border-indigo-400 shadow-md ring-2 shadow-indigo-100 ring-indigo-400/20"
          : "border-slate-200 shadow-xs"
      }`}
    >
      {/* Card Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Avatar Row */}
        <div className="flex items-start gap-3.5">
          {/* Avatar */}
          <div
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold shadow-sm ${member.avatarBg}`}
          >
            {initials}
            <span
              className={`absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white ${status.dot}`}
            />
          </div>

          {/* Name + Dept + Status */}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                {member.name}
              </h3>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status.badge}`}
              >
                {status.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3 w-3 shrink-0 text-slate-400" />
              <span className="truncate text-xs text-slate-500">{member.department}</span>
            </div>
          </div>
        </div>

        {/* Role */}
        <p className="line-clamp-2 min-h-10 text-sm leading-snug text-slate-600">{member.role}</p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-5 py-3.5">
        <span className="min-w-0 truncate font-mono text-xs text-slate-400">{member.email}</span>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={() => onSelect(member, "chat")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white active:scale-95"
            title="Internal Chat"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => onSelect(member, "email")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white active:scale-95"
            title="Send Email"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email</span>
          </button>
        </div>
      </div>
    </div>
  );
}
