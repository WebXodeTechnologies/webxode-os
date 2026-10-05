"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Play,
  ShieldCheck,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  Layers,
  Zap,
  Activity,
  BarChart3,
  Clock,
  ArrowUpRight,
} from "lucide-react";

// Live Animated Counter component counting up smoothly from zero
function AnimatedCounter({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic calculation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easedProgress * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "sales" | "presales" | "finance">(
    "overview",
  );

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Gradients & Ambient Glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -z-10 h-125 w-200 -translate-x-1/2 rounded-full bg-linear-to-tr from-indigo-600/20 via-violet-600/20 to-pink-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-100 w-100 rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[4rem_4rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Announcement Badge */}
        <div className="mb-6 inline-flex cursor-pointer items-center gap-3 rounded-full border border-indigo-200 bg-white/90 px-4 py-1.5 text-xs text-indigo-700 shadow-sm backdrop-blur-md transition-all hover:border-indigo-300 dark:border-indigo-500/30 dark:bg-slate-900/80 dark:text-indigo-300 dark:shadow-indigo-950/50 dark:hover:border-indigo-500/60">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Webxode OS 2.0 Engine
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="text-slate-500 dark:text-slate-400">Command & Control Workspace</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto max-w-5xl text-4xl leading-[1.12] font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
          One Operating System. <br />
          <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-300 dark:to-cyan-300">
            Zero Operational Chaos.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-900 sm:text-xl dark:text-slate-400">
          Centralize your agency lifecycle — from lead capture & presales quotes to agile project
          delivery and real-time financial margin tracking.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-[200%_auto] px-8 py-4 font-semibold text-white shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:bg-right hover:shadow-indigo-600/50 active:scale-[0.98] sm:w-auto"
          >
            <span>Launch OS Workspace</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#modules"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white/90 px-8 py-4 font-semibold text-slate-700 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 sm:w-auto dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Play className="h-4 w-4 fill-indigo-400/20 text-indigo-600 dark:text-indigo-400" />
            <span>Explore Live Modules</span>
          </Link>
        </div>

        {/* Interactive Dashboard Showcase Preview Frame */}
        <div className="relative mx-auto mt-14 max-w-6xl rounded-2xl border border-slate-800/90 bg-slate-950/90 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl sm:p-4">
          {/* Top Window Navigation Bar */}
          <div className="flex flex-col gap-3 border-b border-slate-800/80 px-2 pt-1 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between space-x-3 sm:justify-start">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/90" />
                <div className="h-3 w-3 rounded-full bg-amber-500/90" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/90" />
              </div>
              <span className="max-w-50 truncate font-mono text-[11px] text-slate-400 sm:max-w-none">
                https://os.webxode.com/dashboard/executive
              </span>
            </div>

            {/* Interactive Module Tab Switcher */}
            <div className="flex scrollbar-none items-center space-x-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Overview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sales")}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "sales"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Sales Pipeline</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("presales")}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "presales"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>Presales Engine</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("finance")}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "finance"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <DollarSign className="h-3.5 w-3.5" />
                <span>Financial Health</span>
              </button>
            </div>

            <div className="hidden items-center gap-2 font-mono text-xs text-slate-400 lg:flex">
              <Activity className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              <span>Real-time Sync</span>
            </div>
          </div>

          {/* Interactive Screen Display Container */}
          <div className="relative min-h-110 w-full overflow-hidden rounded-xl border border-slate-900 bg-slate-950 p-4 text-left sm:min-h-125 sm:p-6">
            {/* TAB 1: EXECUTIVE OVERVIEW DASHBOARD */}
            {activeTab === "overview" && (
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col gap-2 border-b border-slate-900 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2.5 text-base font-bold text-white sm:text-lg">
                      <span>Executive Command Center</span>
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                        Live Analytics
                      </span>
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Real-time revenue, active project velocity & pipeline health metrics
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-indigo-400">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>Last Synced: Just now</span>
                  </div>
                </div>

                {/* 4 KPI Metric Cards Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition-colors hover:border-indigo-500/30 sm:p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Monthly Revenue</span>
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xl font-black text-white sm:text-2xl">$84,200</div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span>+28.4%</span>
                      <span className="text-[10px] font-normal text-slate-500">vs last month</span>
                    </div>
                  </div>

                  <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition-colors hover:border-indigo-500/30 sm:p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Active Pipeline</span>
                      <Users className="h-3.5 w-3.5 text-indigo-400" />
                    </div>
                    <div className="text-xl font-black text-white sm:text-2xl">$482,000</div>
                    <div className="text-[11px] font-medium text-indigo-300">
                      32 Active Opportunities
                    </div>
                  </div>

                  <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition-colors hover:border-indigo-500/30 sm:p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Sprint QA Rate</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xl font-black text-white sm:text-2xl">98.4%</div>
                    <div className="text-[11px] font-medium text-emerald-400">
                      14 Sprints On Track
                    </div>
                  </div>

                  <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition-colors hover:border-indigo-500/30 sm:p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Net Operating Margin</span>
                      <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    </div>
                    <div className="text-xl font-black text-cyan-400 sm:text-2xl">62.5%</div>
                    <div className="text-[11px] font-normal text-slate-400">
                      Agency Benchmark: 50%
                    </div>
                  </div>
                </div>

                {/* Main Visual Section: Monthly Revenue Growth Bar Chart + Audit Stream */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 lg:col-span-8">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                          <span>Monthly Revenue & Cashflow Trajectory</span>
                          <span className="rounded bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] text-indigo-300">
                            Q1 - Q2 2026
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Automated invoice collection & milestone billing tracking
                        </p>
                      </div>
                      <div className="hidden items-center gap-3 font-mono text-xs sm:flex">
                        <span className="flex items-center gap-1.5 text-indigo-400">
                          <span className="h-2 w-2 rounded-full bg-indigo-500" /> Collected
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-400">
                          <span className="h-2 w-2 rounded-full bg-amber-400" /> Pending
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex h-40 items-end justify-between gap-2 border-b border-slate-800 px-2 pt-4 sm:gap-4">
                        <div className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <div className="font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                            $38k
                          </div>
                          <div className="h-[45%] w-full rounded-t-md bg-linear-to-t from-indigo-900 to-indigo-600 transition-all group-hover:brightness-125" />
                          <span className="font-mono text-[11px] text-slate-400">Nov</span>
                        </div>
                        <div className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <div className="font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                            $46k
                          </div>
                          <div className="h-[58%] w-full rounded-t-md bg-linear-to-t from-indigo-900 to-indigo-600 transition-all group-hover:brightness-125" />
                          <span className="font-mono text-[11px] text-slate-400">Dec</span>
                        </div>
                        <div className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <div className="font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                            $58k
                          </div>
                          <div className="h-[70%] w-full rounded-t-md bg-linear-to-t from-indigo-900 to-indigo-600 transition-all group-hover:brightness-125" />
                          <span className="font-mono text-[11px] text-slate-400">Jan</span>
                        </div>
                        <div className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <div className="font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                            $64k
                          </div>
                          <div className="h-[78%] w-full rounded-t-md bg-linear-to-t from-indigo-900 to-indigo-600 transition-all group-hover:brightness-125" />
                          <span className="font-mono text-[11px] text-slate-400">Feb</span>
                        </div>
                        <div className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <div className="font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                            $72k
                          </div>
                          <div className="h-[88%] w-full rounded-t-md bg-linear-to-t from-indigo-900 to-indigo-600 transition-all group-hover:brightness-125" />
                          <span className="font-mono text-[11px] text-slate-400">Mar</span>
                        </div>
                        <div className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <div className="font-mono text-[10px] font-bold text-emerald-400 opacity-100">
                            $84k
                          </div>
                          <div className="h-full w-full rounded-t-md bg-linear-to-t from-indigo-600 via-violet-500 to-emerald-400 shadow-lg shadow-indigo-500/20 transition-all" />
                          <span className="font-mono text-[11px] font-bold text-emerald-400">
                            Apr
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                      <span>Target Goal: $80,000/mo</span>
                      <span className="font-semibold text-emerald-400">105.2% Goal Attained</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 lg:col-span-4">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                        Live System Stream
                      </h4>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="space-y-1 rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                        <div className="flex justify-between font-semibold text-white">
                          <span>Quote #WX-894 Signed</span>
                          <span className="text-emerald-400">$29,000</span>
                        </div>
                        <div className="text-[11px] text-slate-400">CloudScale AI • 2 mins ago</div>
                      </div>

                      <div className="space-y-1 rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                        <div className="flex justify-between font-semibold text-white">
                          <span>Sprint 4 Verified</span>
                          <span className="text-indigo-400">QA Pass</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Next.js API Engine • 14 mins ago
                        </div>
                      </div>

                      <div className="space-y-1 rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                        <div className="flex justify-between font-semibold text-white">
                          <span>New Lead Qualified</span>
                          <span className="text-amber-400">$34,000</span>
                        </div>
                        <div className="text-[11px] text-slate-400">Apex Global • 1 hour ago</div>
                      </div>
                    </div>

                    <div className="flex cursor-pointer items-center justify-between border-t border-slate-800 pt-2 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300">
                      <span>View Full Audit Log</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SALES PIPELINE */}
            {activeTab === "sales" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-2 border-b border-slate-900 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-white">
                      <span>Sales & Lead Opportunities Kanban</span>
                      <span className="rounded bg-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                        28 Deals
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Automated pipeline stages with deal probability forecasting
                    </p>
                  </div>
                  <div className="font-mono text-xs text-indigo-400">Total Value: $248,500</div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs font-semibold text-slate-400">
                      <span>NEW LEADS</span>
                      <span className="text-slate-500">8</span>
                    </div>
                    <div className="space-y-1 rounded-lg border border-slate-800 bg-slate-950 p-3 transition-colors hover:border-indigo-500/40">
                      <div className="flex justify-between text-xs font-medium text-white">
                        <span>FinTech Platform Revamp</span>
                        <span className="font-mono text-emerald-400">$34,000</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Apex Global</span>
                        <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-400">
                          High Priority
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 rounded-lg border border-slate-800 bg-slate-950 p-3 transition-colors hover:border-indigo-500/40">
                      <div className="flex justify-between text-xs font-medium text-white">
                        <span>Healthcare Mobile App</span>
                        <span className="font-mono text-emerald-400">$22,000</span>
                      </div>
                      <div className="text-[11px] text-slate-400">MedTech Inc</div>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs font-semibold text-indigo-400">
                      <span>PRESALES SCOPING</span>
                      <span className="text-slate-500">12</span>
                    </div>
                    <div className="space-y-1 rounded-lg border border-indigo-500/30 bg-slate-950 p-3 shadow-md">
                      <div className="flex justify-between text-xs font-medium text-white">
                        <span>SaaS Operations Portal</span>
                        <span className="font-mono text-emerald-400">$58,000</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>CloudScale AI</span>
                        <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                          Quote Pending
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs font-semibold text-emerald-400">
                      <span>WON & HANDOVER</span>
                      <span className="text-slate-500">8</span>
                    </div>
                    <div className="space-y-1 rounded-lg border border-emerald-500/30 bg-slate-950 p-3">
                      <div className="flex justify-between text-xs font-medium text-white">
                        <span>E-Commerce Migration</span>
                        <span className="font-mono text-emerald-400">$45,000</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Ready for Kickoff</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRESALES ENGINE */}
            {activeTab === "presales" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-2 border-b border-slate-900 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-white">
                      <span>Quotation & Specification Engine</span>
                      <span className="rounded bg-violet-500/20 px-2.5 py-0.5 text-xs font-medium text-violet-300">
                        Approved
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Automated scope estimation, milestone pricing, & digital approval gates
                    </p>
                  </div>
                  <div className="font-mono text-xs text-emerald-400">Estimated Margin: 64%</div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className="text-xs font-semibold text-slate-300">MILESTONE BREAKDOWN</div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 p-2.5">
                        <span className="text-slate-300">
                          Phase 1: Discovery & Figma Prototypes
                        </span>
                        <span className="font-mono text-white">$6,500</span>
                      </div>
                      <div className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 p-2.5">
                        <span className="text-slate-300">
                          Phase 2: Next.js Frontend & API Integration
                        </span>
                        <span className="font-mono text-white">$18,000</span>
                      </div>
                      <div className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 p-2.5">
                        <span className="text-slate-300">Phase 3: QA Audit & Cloud Deployment</span>
                        <span className="font-mono text-white">$4,500</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <div>
                      <div className="mb-2 text-xs font-semibold text-slate-300">
                        PROPOSAL AUDIT & COMPLIANCE
                      </div>
                      <div className="mb-1.5 flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Scope validated by Technical Director</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Payment Terms: 40% Upfront, 60% Milestones</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
                      <span className="text-slate-400">Generated PDF Quote #WX-894</span>
                      <span className="text-sm font-bold text-indigo-400">Total: $29,000 USD</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: FINANCIAL HEALTH */}
            {activeTab === "finance" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-2 border-b border-slate-900 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-white">
                      <span>Real-time Financial Intelligence</span>
                      <span className="rounded bg-cyan-500/20 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                        +28.4% MoM Growth
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Revenue forecasts, outstanding invoices, profit margins & cashflow
                    </p>
                  </div>
                  <div className="font-mono text-xs text-emerald-400">Collected: $184,200</div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className="text-xs text-slate-400">MONTHLY REVENUE</div>
                    <div className="text-2xl font-black text-white">$84,200</div>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>+$14,200 vs last month</span>
                    </div>
                  </div>

                  <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className="text-xs text-slate-400">PENDING INVOICES</div>
                    <div className="text-2xl font-black text-amber-400">$18,500</div>
                    <div className="text-[11px] text-slate-400">3 invoices due in 7 days</div>
                  </div>

                  <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className="text-xs text-slate-400">NET OPERATING MARGIN</div>
                    <div className="text-2xl font-black text-indigo-400">62.5%</div>
                    <div className="text-[11px] text-indigo-300">Healthy agency benchmark</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Metrics Counter Strip with Spatial Glow & Animated Border */}
        <div className="group relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl bg-linear-to-r from-indigo-500/50 via-violet-500/40 to-indigo-500/50 p-px shadow-2xl shadow-indigo-950/60">
          {/* Subtle Ambient Glowing Glow Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-indigo-600/20 via-violet-600/20 to-cyan-500/20 opacity-75 blur-xl transition-opacity group-hover:opacity-100" />

          {/* Grid Container */}
          <div className="relative grid grid-cols-2 gap-4 rounded-[23px] bg-slate-950/90 p-5 backdrop-blur-2xl sm:grid-cols-4 sm:p-8 lg:gap-6">
            {/* Metric 1: Managed Pipeline */}
            <div className="group/item relative flex flex-col justify-between space-y-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-900/90 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Managed Pipeline
                </span>
                <TrendingUp className="h-4 w-4 text-indigo-400 transition-transform group-hover/item:scale-110" />
              </div>
              <p className="font-mono text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                <AnimatedCounter target={4.8} decimals={1} prefix="$" suffix="M+" />
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span>Live Deal Pipeline</span>
              </div>
            </div>

            {/* Metric 2: System Uptime */}
            <div className="group/item relative flex flex-col justify-between space-y-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-900/90 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  System Uptime
                </span>
                <ShieldCheck className="h-4 w-4 text-emerald-400 transition-transform group-hover/item:scale-110" />
              </div>
              <p className="font-mono text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                <AnimatedCounter target={99.9} decimals={1} suffix="%" />
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Zero-Downtime SLA</span>
              </div>
            </div>

            {/* Metric 3: Quote Turnaround */}
            <div className="group/item relative flex flex-col justify-between space-y-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 transition-all duration-300 hover:border-violet-500/50 hover:bg-slate-900/90 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Quote Turnaround
                </span>
                <Zap className="h-4 w-4 text-violet-400 transition-transform group-hover/item:scale-110" />
              </div>
              <p className="font-mono text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                <AnimatedCounter target={4} decimals={0} suffix="x" />{" "}
                <span className="text-xs font-normal text-slate-300">Faster</span>
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-indigo-300">
                <span>15 Min Scope Build</span>
              </div>
            </div>

            {/* Metric 4: Dropped Opportunities */}
            <div className="group/item relative flex flex-col justify-between space-y-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Dropped Deals
                </span>
                <CheckCircle2 className="h-4 w-4 text-cyan-400 transition-transform group-hover/item:scale-110" />
              </div>
              <p className="font-mono text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                0
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>100% Lead Retention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
