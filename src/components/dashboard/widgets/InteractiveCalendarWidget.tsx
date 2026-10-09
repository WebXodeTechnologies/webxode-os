"use client";

import React, { useState } from "react";
import { WidgetCard } from "../common/WidgetCard";
import { WidgetHeader } from "../common/WidgetHeader";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus } from "lucide-react";

export function InteractiveCalendarWidget() {
  const [selectedDate, setSelectedDate] = useState<number>(8);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // October 2026 starts on Thursday (offset 4)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 4;

  const eventsMap: Record<number, { title: string; type: string; color: string }[]> = {
    8: [
      { title: "Visual Bridge Discovery Call", type: "Client", color: "bg-blue-500" },
      { title: "Sprint Sync & Code Review", type: "Engineering", color: "bg-purple-500" },
    ],
    10: [{ title: "Annai Agro Quotation Sign-off", type: "Sales", color: "bg-emerald-500" }],
    15: [{ title: "Aishwarya Arts Milestone #3 Release", type: "Delivery", color: "bg-rose-500" }],
    20: [{ title: "Monthly Financial Audit & Payroll", type: "Finance", color: "bg-amber-500" }],
  };

  return (
    <WidgetCard>
      <WidgetHeader
        title="Workspace Calendar & Events"
        subtitle="Month schedule, milestone deadlines, and client meetings"
        badge="October 2026"
        badgeVariant="indigo"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 Cols: Month Calendar Grid */}
        <div className="space-y-3 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-sm font-extrabold text-slate-900">October 2026</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg border border-slate-200 p-1 text-slate-500 hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 p-1 text-slate-500 hover:bg-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold">
            {/* Blank offsets */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`blank-${i}`} className="h-9 w-full"></div>
            ))}

            {daysInMonth.map((day) => {
              const isToday = day === 8;
              const isSelected = day === selectedDate;
              const hasEvents = !!eventsMap[day];

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={`relative flex h-9 w-full flex-col items-center justify-center rounded-xl transition ${
                    isToday
                      ? "bg-indigo-600 font-black text-white shadow-xs"
                      : isSelected
                        ? "bg-slate-200 text-slate-900"
                        : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{day}</span>
                  {hasEvents && (
                    <span
                      className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${
                        isToday ? "bg-white" : "bg-indigo-600"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Selected Date Schedule */}
        <div className="border-t border-slate-100 pt-4 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
              Schedule for Oct {selectedDate}, 2026
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {eventsMap[selectedDate] ? (
              eventsMap[selectedDate].map((evt, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs transition hover:bg-white sm:text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${evt.color}`}></span>
                    <span className="font-bold text-slate-900">{evt.title}</span>
                  </div>
                  <span className="mt-1 block text-xs font-semibold text-slate-500">
                    {evt.type} Event
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs font-semibold text-slate-400">
                <p>No events scheduled for Oct {selectedDate}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
