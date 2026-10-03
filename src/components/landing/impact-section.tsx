import { TrendingUp, Clock, ShieldCheck, Zap, CheckCircle, BarChart, Award } from "lucide-react";

const impactMetrics = [
  {
    value: "75%",
    label: "Reduction in Presales Turnaround",
    description: "Scope requirements & generate approved quotes in 15 minutes instead of 2 days.",
    icon: Clock,
  },
  {
    value: "100%",
    label: "Lead & Revenue Tracking",
    description: "Zero dropped opportunities or forgotten client follow-ups across your pipeline.",
    icon: ShieldCheck,
  },
  {
    value: "3.2x",
    label: "Faster Milestone Signoffs",
    description:
      "Standardized QA verification checklists ensure zero rework before client delivery.",
    icon: Zap,
  },
  {
    value: "+34%",
    label: "Average Profit Margin Lift",
    description: "Real-time margin alerts prevent underpriced proposals and scope creep leakage.",
    icon: TrendingUp,
  },
];

export function ImpactSection() {
  return (
    <section id="impact" className="relative border-t border-slate-900 bg-slate-950 py-24 lg:py-32">
      {/* Background Accent */}
      <div className="pointer-events-none absolute right-1/3 bottom-0 -z-10 h-100 w-125 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-400">
            <Award className="h-3.5 w-3.5" />
            <span>MEASURABLE BUSINESS IMPACT</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Built for High-Growth Tech Agencies
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            See how centralizing operations with Webxode OS drives efficiency, profitability, and
            speed.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-900/80 hover:shadow-xl"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-indigo-400 transition-all group-hover:scale-110 group-hover:text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-black text-white transition-colors group-hover:text-indigo-300 sm:text-4xl">
                    {item.value}
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-slate-200">{item.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
