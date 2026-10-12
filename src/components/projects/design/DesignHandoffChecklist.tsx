"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, Smartphone, Monitor, Palette } from "lucide-react";
import { toast } from "react-hot-toast";

export function DesignHandoffChecklist() {
  const [items, setItems] = useState([
    {
      id: "chk_1",
      title: "Design Tokens & Variable Sync",
      desc: "Colors, typography scales, shadows, and radii exported to Tailwind config.",
      done: true,
      category: "Tokens",
    },
    {
      id: "chk_2",
      title: "Responsive Breakpoints Redlines",
      desc: "Mobile (390px), Tablet (820px), and Desktop (1440px) layout specifications verified.",
      done: true,
      category: "Layout",
    },
    {
      id: "chk_3",
      title: "WCAG 2.1 AA Accessibility & Contrast",
      desc: "All text and interactive controls maintain minimum 4.5:1 contrast in dark and light modes.",
      done: true,
      category: "a11y",
    },
    {
      id: "chk_4",
      title: "Micro-Animation & Transition Specs",
      desc: "Framer Motion easing curves, hover states, and modal transitions documented.",
      done: false,
      category: "Motion",
    },
    {
      id: "chk_5",
      title: "Asset Package & Vector SVGs",
      desc: "Optimized SVG iconography and responsive WebP image assets packed.",
      done: false,
      category: "Assets",
    },
  ]);

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.done;
          toast.success(`${item.title} marked as ${nextState ? "Completed" : "Pending"}`);
          return { ...item, done: nextState };
        }
        return item;
      })
    );
  };

  const completedCount = items.filter((i) => i.done).length;

  return (
    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <span className="text-[10px] font-black tracking-wider text-indigo-600 uppercase">
            Frontend Handoff Protocol
          </span>
          <h3 className="text-lg font-black text-slate-900">
            Corporate Design QA & Engineering Checklist
          </h3>
          <p className="text-xs text-slate-500">
            Pre-flight quality gates before UI components enter sprint development.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
            {completedCount} of {items.length} Gates Verified
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
              item.done
                ? "border-emerald-200 bg-emerald-50/40 text-emerald-950"
                : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-white"
            }`}
          >
            <CheckCircle2
              className={`mt-0.5 h-5 w-5 shrink-0 transition-colors ${
                item.done ? "text-emerald-600" : "text-slate-300"
              }`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold">{item.title}</h4>
                <span className="py-0.2 rounded border border-slate-200/60 bg-white/80 px-1.5 text-[9px] font-black text-slate-500">
                  {item.category}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
