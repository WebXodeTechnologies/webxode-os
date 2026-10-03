import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-slate-900 bg-slate-950 py-24 text-center lg:py-32">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-125 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-indigo-600/20 via-violet-600/20 to-pink-500/10 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-indigo-500/30 bg-linear-to-b from-indigo-950/40 via-slate-900/80 to-slate-950 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl sm:p-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/40 bg-indigo-600/20 text-indigo-400 shadow-inner">
            <Sparkles className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to Supercharge Your Agency Operations?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Join Webxode Technologies in operating at peak efficiency. Centralize sales, presales,
            project execution, and financial tracking in one unified workspace.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-[200%_auto] px-8 py-4 font-bold text-white shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:bg-right hover:shadow-indigo-600/50 active:scale-95 sm:w-auto"
            >
              <span>Launch OS Workspace</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-8 py-4 font-semibold text-slate-300 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white sm:w-auto"
            >
              <span>Request Admin Demo</span>
            </Link>
          </div>

          {/* Micro Features Strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-slate-800/80 pt-8 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Role-Based Access Control</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Modular Next.js Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Real-Time Audit Logging</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
