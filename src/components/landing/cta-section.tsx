import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200/80 bg-slate-50/50 py-24 text-center transition-colors duration-300 lg:py-32 dark:border-slate-900 dark:bg-slate-950">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-125 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-indigo-500/10 via-violet-500/10 to-pink-500/10 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-indigo-200/80 bg-linear-to-b from-indigo-50/90 via-white to-slate-50 p-8 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-14 dark:border-indigo-500/30 dark:from-indigo-950/40 dark:via-slate-900/80 dark:to-slate-950 dark:shadow-2xl dark:ring-white/10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-600 shadow-inner dark:border-indigo-500/40 dark:bg-indigo-600/20 dark:text-indigo-400">
            <Sparkles className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Ready to Supercharge Your Agency Operations?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-900 sm:text-lg dark:text-slate-300">
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:w-auto dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span>Request Admin Demo</span>
            </Link>
          </div>

          {/* Micro Features Strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-slate-200/80 pt-8 text-xs font-medium text-slate-900 dark:border-slate-800/80 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Role-Based Access Control</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Modular Next.js Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Real-Time Audit Logging</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
