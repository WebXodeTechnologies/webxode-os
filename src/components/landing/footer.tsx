import Link from "next/link";
import Image from "next/image";
import { Heart, Activity, Shield, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-900 bg-slate-950 py-16 text-slate-400">
      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-64 w-96 rounded-full bg-indigo-600/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-slate-900 pb-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-inner">
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Technologies Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Webxode <span className="text-indigo-400">OS</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              The internal business operating system for Webxode Technologies. Centralizing the
              complete agency lifecycle from lead generation to presales, project execution, and
              financial tracking.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>All Systems Operational • v2.0</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="mb-4 text-xs font-bold tracking-wider text-slate-200 uppercase">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1 transition-colors hover:text-white"
                >
                  Sales Pipeline{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1 transition-colors hover:text-white"
                >
                  Presales & Quotations{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1 transition-colors hover:text-white"
                >
                  Project Delivery Kanban{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1 transition-colors hover:text-white"
                >
                  Financial Intelligence{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold tracking-wider text-slate-200 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#features" className="transition-colors hover:text-white">
                  Features Overview
                </Link>
              </li>
              <li>
                <Link href="#modules" className="transition-colors hover:text-white">
                  Modules Showcase
                </Link>
              </li>
              <li>
                <Link href="#why-webxode" className="transition-colors hover:text-white">
                  Why Webxode OS
                </Link>
              </li>
              <li>
                <Link href="#faq" className="transition-colors hover:text-white">
                  FAQ & Answers
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise Access */}
          <div>
            <h4 className="mb-4 text-xs font-bold tracking-wider text-slate-200 uppercase">
              Operating Philosophy
            </h4>
            <p className="text-xs leading-relaxed text-slate-400 italic">
              &quot;Webxode OS is the operating system for how Webxode does business. Less data
              entry. Zero clutter. Immediate action.&quot;
            </p>
            <div className="mt-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-indigo-400 transition-all hover:border-indigo-500/50 hover:bg-slate-800"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Launch Admin Workspace</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 Webxode Technologies. All rights reserved.</span>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span>Crafted with</span>
            <Heart className="inline h-3.5 w-3.5 animate-pulse fill-rose-500 text-rose-500" />
            <span>for</span>
            <Link
              href="https://webxode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-300 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-white"
            >
              Webxode Technologies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
