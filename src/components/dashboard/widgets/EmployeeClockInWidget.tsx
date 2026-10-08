"use client";

import React, { useState, useEffect } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { Clock, Play, Square, Coffee, CheckCircle, Calendar, ShieldCheck } from "lucide-react";

export function EmployeeClockInWidget() {
  const [clockedIn, setClockedIn] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [clockInTime, setClockInTime] = useState("09:15 AM");
  const [elapsedSeconds, setElapsedSeconds] = useState(24150); // ~6h 42m

  useEffect(() => {
    let interval: any;
    if (clockedIn && !onBreak) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockedIn, onBreak]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
  };

  const handleClockToggle = () => {
    if (clockedIn) {
      setClockedIn(false);
      setOnBreak(false);
    } else {
      setClockedIn(true);
      const now = new Date();
      setClockInTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    }
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Employee Attendance & Shift Clock-In"
        subtitle="Workplace shift tracker, break management, and weekly hours"
        badge={clockedIn ? (onBreak ? "On Break" : "Shift Active") : "Clocked Out"}
        badgeVariant={clockedIn ? (onBreak ? "warning" : "success") : "default"}
      />

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Clock Status & Timer */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
              clockedIn
                ? onBreak
                  ? "border-amber-200 bg-amber-100 text-amber-700"
                  : "border-emerald-200 bg-emerald-100 text-emerald-700"
                : "border-slate-300 bg-slate-200 text-slate-600"
            }`}
          >
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Current Shift</span>
              <span className="text-xs font-semibold text-slate-400">
                • Clocked in {clockInTime}
              </span>
            </div>
            <h3 className="font-mono text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {clockedIn ? formatTimer(elapsedSeconds) : "00h 00m 00s"}
            </h3>
          </div>
        </div>

        {/* Right: Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          {clockedIn && (
            <button
              type="button"
              onClick={() => setOnBreak(!onBreak)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition active:scale-95 ${
                onBreak
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              <Coffee className="h-4 w-4" />
              <span>{onBreak ? "End Break" : "Take Break"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleClockToggle}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md transition active:scale-95 ${
              clockedIn
                ? "bg-rose-600 shadow-rose-200 hover:bg-rose-700"
                : "bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700"
            }`}
          >
            {clockedIn ? (
              <Square className="h-4 w-4 fill-white" />
            ) : (
              <Play className="h-4 w-4 fill-white" />
            )}
            <span>{clockedIn ? "Clock Out" : "Clock In Now"}</span>
          </button>
        </div>
      </div>

      {/* Attendance Stats Footer */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs">
        <div className="rounded-xl border border-slate-100 bg-white p-2">
          <p className="font-semibold text-slate-400">Weekly Total</p>
          <p className="font-bold text-slate-800">38.5 hrs</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-2">
          <p className="font-semibold text-slate-400">Punctuality</p>
          <p className="font-bold text-emerald-600">98.2% On-Time</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-2">
          <p className="font-semibold text-slate-400">Overtime</p>
          <p className="font-bold text-indigo-600">+2.5 hrs</p>
        </div>
      </div>
    </WidgetCard>
  );
}
