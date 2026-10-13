"use client";

import React from "react";
import { Phone, Mail, Hash, Users } from "lucide-react";
import { toast } from "react-hot-toast";

interface ChatAreaHeaderProps {
  title: string;
  subtitle: string;
  isChannel: boolean;
  phone?: string;
  email?: string;
}

export function ChatAreaHeader({ title, subtitle, isChannel, phone, email }: ChatAreaHeaderProps) {
  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
      toast.success(`Initiating call to ${title}...`);
    } else {
      toast.error("Phone number not available for this channel.");
    }
  };

  const handleEmail = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
      toast.success(`Opening email client for ${title}...`);
    } else {
      toast.error("Email address not available.");
    }
  };

  return (
    <div className="flex items-center justify-between rounded-t-3xl border-b border-slate-100 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 font-black text-indigo-600">
          {isChannel ? <Hash className="h-5 w-5" /> : <Users className="h-5 w-5" />}
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-900">{title}</h2>
          <p className="text-[11px] font-semibold text-slate-500">{subtitle}</p>
        </div>
      </div>

      {!isChannel && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCall}
            title="Direct Audio / Video Call"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Call</span>
          </button>

          <button
            type="button"
            onClick={handleEmail}
            title="Instant Email"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mail</span>
          </button>
        </div>
      )}
    </div>
  );
}
