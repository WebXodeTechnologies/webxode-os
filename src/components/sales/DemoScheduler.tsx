"use client";

import React, { useState } from "react";
import { Calendar, Clock, Video, Users, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface DemoSchedulerProps {
  onSchedule: (type: string, date: string, time: string) => void;
}

export function DemoScheduler({ onSchedule }: DemoSchedulerProps) {
  const [demoType, setDemoType] = useState<"Technical" | "Non-Technical">("Non-Technical");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = () => {
    if (!date || !time) {
      toast.error("Please select both date and time for the demo.");
      return;
    }
    onSchedule(demoType, date, time);
    toast.success(`${demoType} Demo successfully booked!`);
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <div>
        <h3 className="text-sm font-black text-slate-900">Demo Booking Engine</h3>
        <p className="text-xs font-semibold text-slate-500">
          Schedule requirements gathering or technical architecture walkthroughs
        </p>
      </div>

      <div className="flex rounded-2xl bg-slate-100 p-1">
        {(["Non-Technical", "Technical"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setDemoType(type)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all ${
              demoType === type
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {type === "Technical" ? <Video className="h-4 w-4" /> : <Users className="h-4 w-4" />}
            {type} Demo
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs font-semibold focus:outline-indigo-500"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Time
          </label>
          <div className="relative">
            <Clock className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs font-semibold focus:outline-indigo-500"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBook}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-indigo-700 active:scale-95"
      >
        <CheckCircle2 className="h-4 w-4" />
        Book {demoType} Demo
      </button>
    </div>
  );
}
