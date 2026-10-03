"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle2,
  Activity,
  Zap,
  Layers,
  Shield,
  Globe,
  BarChart3,
  Users,
  LogIn,
  UserPlus,
  RotateCcw,
  Star,
} from "lucide-react";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  activeTab: "login" | "register" | "forgot-password";
}

export function AuthWrapper({ children, title, subtitle, activeTab }: AuthWrapperProps) {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<"workspace" | "insights" | "security">(
    "workspace",
  );

  // Auto-cycle showcase tabs for smooth subtle animation
  useEffect(() => {
    const tabs: ("workspace" | "insights" | "security")[] = ["workspace", "insights", "security"];
    const interval = setInterval(() => {
      setActiveShowcaseTab((prev) => {
        const nextIndex = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030712] p-4 font-sans text-slate-100 sm:p-6 lg:p-10">
      {/* Ambient Animated Light Orbs */}
      <div className="animate-pulse-glow pointer-events-none absolute -top-48 -right-48 h-162.5 w-162.5 rounded-full bg-linear-to-br from-indigo-600/25 via-violet-600/15 to-transparent blur-[150px]" />
      <div className="animate-pulse-glow pointer-events-none absolute -bottom-48 -left-48 h-162.5 w-162.5 rounded-full bg-linear-to-tl from-cyan-500/25 via-blue-600/15 to-transparent blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[180px]" />

      {/* Subtle Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Side Desktop Stage — Generic Interactive Workspace Feature Showcase */}
          <div className="hidden lg:col-span-6 lg:block xl:col-span-7">
            <div className="relative space-y-6 pr-6">
              {/* Top Highlight Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-500/10 backdrop-blur-md">
                <Sparkles className="h-4 w-4 animate-pulse text-indigo-400" />
                <span>Modern All-in-One Business Platform</span>
              </div>

              {/* Inspiring Headline */}
              <div className="space-y-3">
                <h2 className="text-3xl leading-tight font-black tracking-tight text-white xl:text-4xl">
                  Everything you need to <br />
                  <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                    grow your business effortlessly
                  </span>
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-slate-400">
                  Empower your team with an intuitive workspace designed for speed, collaboration,
                  and seamless operations.
                </p>
              </div>

              {/* Interactive Showcase Card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/85 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl">
                {/* Showcase Header & Tab Switcher */}
                <div className="mb-5 flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Platform Highlights
                    </span>
                  </div>

                  <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveShowcaseTab("workspace")}
                      className={`rounded-lg px-3 py-1 transition-all ${
                        activeShowcaseTab === "workspace"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Workspace
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveShowcaseTab("insights")}
                      className={`rounded-lg px-3 py-1 transition-all ${
                        activeShowcaseTab === "insights"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Analytics
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveShowcaseTab("security")}
                      className={`rounded-lg px-3 py-1 transition-all ${
                        activeShowcaseTab === "security"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Security
                    </button>
                  </div>
                </div>

                {/* Tab 1: Smart Workspace */}
                {activeShowcaseTab === "workspace" && (
                  <div className="animate-in fade-in space-y-4 duration-300">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-indigo-300">
                        <Zap className="mb-1.5 h-5 w-5 text-indigo-400" />
                        <div className="text-xs font-bold text-white">Lightning Fast</div>
                        <div className="mt-0.5 text-[11px] text-indigo-300/80">
                          Accelerated tools
                        </div>
                      </div>

                      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4 text-purple-300">
                        <Users className="mb-1.5 h-5 w-5 text-purple-400" />
                        <div className="text-xs font-bold text-white">Team Hub</div>
                        <div className="mt-0.5 text-[11px] text-purple-300/80">Real-time sync</div>
                      </div>

                      <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-cyan-300">
                        <Layers className="mb-1.5 h-5 w-5 text-cyan-400" />
                        <div className="text-xs font-bold text-white">All-In-One</div>
                        <div className="mt-0.5 text-[11px] text-cyan-300/80">Unified tools</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                          <Activity className="h-4.5 w-4.5 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">System Status</h4>
                          <p className="text-[11px] text-slate-400">
                            All services running smoothly & secure
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
                        99.9% Operational
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Analytics & Insights */}
                {activeShowcaseTab === "insights" && (
                  <div className="animate-in fade-in space-y-4 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                        <BarChart3 className="mb-2 h-5 w-5 text-indigo-400" />
                        <h4 className="text-xs font-bold text-white">Visual Analytics</h4>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Clear dashboards for instant clarity.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                        <Globe className="mb-2 h-5 w-5 text-cyan-400" />
                        <h4 className="text-xs font-bold text-white">Global Access</h4>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Work securely from any device, anywhere.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                      <div className="flex justify-between text-xs font-semibold text-slate-300">
                        <span>Workflow Efficiency</span>
                        <span className="font-bold text-indigo-400">98% Optimized</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900">
                        <div className="h-full w-[94%] rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Security & Peace of Mind */}
                {activeShowcaseTab === "security" && (
                  <div className="animate-in fade-in space-y-4 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                        <Shield className="mb-2 h-5 w-5 text-emerald-400" />
                        <h4 className="text-xs font-bold text-white">Protected Data</h4>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Encrypted user sessions and privacy safety.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                        <CheckCircle2 className="mb-2 h-5 w-5 text-indigo-400" />
                        <h4 className="text-xs font-bold text-white">Smart Permissions</h4>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Role-based controls for your organization.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-indigo-200">
                      <div className="flex items-center gap-2.5 text-xs font-semibold">
                        <Image
                          src="/logos/webxodelogocropped-removebg-preview.png"
                          alt="Webxode Logo"
                          width={18}
                          height={18}
                          className="h-4.5 w-4.5 object-contain"
                        />
                        <span>SSL Encrypted & Protected Session</span>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-300">Verified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Copyright */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Trusted & Secure Business Infrastructure</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Webxode OS © {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Auth Form Container */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Glowing Gradient Border Frame */}
            <div className="relative rounded-3xl bg-linear-to-b from-indigo-500/40 via-slate-800/40 to-cyan-500/30 p-px shadow-2xl shadow-indigo-950/50 transition-all duration-300">
              {/* Inner Frosted Glass Card */}
              <div className="glass-container relative overflow-hidden rounded-[23px] p-6 sm:p-8">
                {/* Subtle Shimmer Beam Header */}
                <div className="pointer-events-none absolute top-0 right-0 left-0 h-0.5 bg-linear-to-r from-transparent via-indigo-400 to-transparent opacity-80" />

                {/* Top Brand & Status Header with Official Company Logo */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-5">
                  <Link href={"/" as any} className="group flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] bg-white p-1">
                        <Image
                          src="/logos/webxodelogocropped-removebg-preview.png"
                          alt="Webxode Logo"
                          width={36}
                          height={36}
                          className="h-full w-full object-contain drop-shadow filter"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="flex items-center gap-1.5 text-lg font-black tracking-tight text-white">
                        WEBXODE{" "}
                        <span className="rounded-md border border-indigo-500/40 bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-extrabold tracking-widest text-indigo-300">
                          OS
                        </span>
                      </span>
                      <span className="block text-[11px] font-medium text-slate-400">
                        Business Platform
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400 shadow-inner">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span>ONLINE</span>
                  </div>
                </div>

                {/* Animated Navigation Tabs */}
                <div className="mb-7 grid grid-cols-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-1.5 backdrop-blur-md">
                  <Link
                    href={"/login" as any}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-center text-xs font-bold transition-all duration-200 ${
                      activeTab === "login"
                        ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg ring-1 shadow-indigo-600/30 ring-white/20"
                        : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                    }`}
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href={"/register" as any}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-center text-xs font-bold transition-all duration-200 ${
                      activeTab === "register"
                        ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg ring-1 shadow-indigo-600/30 ring-white/20"
                        : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                    }`}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Register</span>
                  </Link>
                  <Link
                    href={"/forgot-password" as any}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-center text-xs font-bold transition-all duration-200 ${
                      activeTab === "forgot-password"
                        ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg ring-1 shadow-indigo-600/30 ring-white/20"
                        : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                    }`}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </Link>
                </div>

                {/* Form Title & Subtitle */}
                <div className="mb-6 space-y-1.5">
                  <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {title}
                  </h1>
                  <p className="text-xs leading-relaxed font-normal text-slate-400">{subtitle}</p>
                </div>

                {/* Form Children Content */}
                {children}

                {/* Security Footer Trust Ribbon */}
                <div className="mt-8 border-t border-slate-800/80 pt-4 text-center">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-white px-3 py-1 text-[11px] font-medium text-black">
                    <Image
                      src="/logos/webxodelogocropped-removebg-preview.png"
                      alt="Webxode Logo"
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5 object-contain"
                    />
                    <span className="font-medium">
                      Secure Encrypted Session • Protected Workspace
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
