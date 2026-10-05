import { XCircle, CheckCircle2, Zap, AlertTriangle, ShieldCheck } from "lucide-react";

export function WhyWebxodeSection() {
  return (
    <section
      id="why-webxode"
      className="relative border-t border-slate-200/80 bg-slate-50/50 py-24 transition-colors duration-300 lg:py-32 dark:border-slate-900 dark:bg-slate-950"
    >
      {/* Background Lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-100 w-175 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[150px] dark:bg-indigo-600/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Zap className="h-3.5 w-3.5" />
            <span>THE UNIFIED ADVANTAGE</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Why Switch to Webxode OS?
          </h2>
          <p className="mt-4 text-base text-slate-900 sm:text-lg dark:text-slate-400">
            Stop juggling disconnected spreadsheets, WhatsApp threads, and siloed software tools.
            Bring your entire agency operations into one single source of truth.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Legacy Fragmented Tools Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-200 bg-linear-to-b from-rose-50/80 to-white p-8 shadow-md backdrop-blur-md dark:border-rose-900/40 dark:from-rose-950/20 dark:to-slate-950 dark:shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-rose-200 pb-4 dark:border-rose-900/30">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      The Fragmented Workflow
                    </h3>
                    <p className="text-xs text-rose-700 dark:text-rose-300/80">
                      Disconnected SaaS tools & manual overhead
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
                  High Risk & Chaos
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    ✕
                  </span>
                  <span>
                    Leads tracked across messy Excel sheets with zero clear ownership or follow-up
                    schedules.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    ✕
                  </span>
                  <span>
                    Client requirement discussions lost in WhatsApp chats and disjointed email
                    threads.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    ✕
                  </span>
                  <span>
                    Founder dependency required to manually coordinate project updates and approve
                    quotes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    ✕
                  </span>
                  <span>
                    Zero real-time visibility into project margin risks, developer bandwidth, or
                    overdue invoices.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-rose-200 pt-4 font-mono text-xs font-semibold text-rose-600 dark:border-rose-900/30 dark:text-rose-400/80">
              Result: Revenue leaks, missed deadlines, & burned-out team members.
            </div>
          </div>

          {/* Webxode OS Engine Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-300 bg-linear-to-b from-indigo-50/80 to-white p-8 shadow-xl ring-1 ring-indigo-300 backdrop-blur-md dark:border-indigo-500/40 dark:from-indigo-950/30 dark:to-slate-950 dark:shadow-2xl dark:ring-indigo-500/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-indigo-200 pb-4 dark:border-indigo-500/20">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      The Webxode OS Platform
                    </h3>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300">
                      Centralized operating system for growth
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                  Maximum Control
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">
                      One Central Source of Truth:
                    </strong>{" "}
                    Leads, presales quotes, sprint boards, and finance integrated in one system.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">
                      Clear Accountability:
                    </strong>{" "}
                    Every lead, milestone, and task has an explicit owner and full audit trail.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">Founder Autonomy:</strong>{" "}
                    Standardized quotation templates and automated QA checks allow your team to
                    operate systematically.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">Action-First UX:</strong>{" "}
                    Real-time financial health dashboards with immediate executive visibility.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-indigo-200 pt-4 font-mono text-xs font-semibold text-emerald-700 dark:border-indigo-500/20 dark:text-emerald-400">
              Result: Predictable cashflow, 4x faster execution, & 100% operational clarity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
