import {
  Users,
  FileText,
  Workflow,
  CheckCircle2,
  BarChart3,
  Zap,
  ArrowUpRight,
} from "lucide-react";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText;
  badge: string;
  span: string;
  accent: string;
  highlight: string;
}

const mainFeatures: FeatureItem[] = [
  {
    id: "presales",
    title: "Standardized Presales & Instant Quotations",
    description:
      "Transform loose requirements into structured solution plans, milestone estimates, and client proposals in minutes with built-in margin validation.",
    icon: FileText,
    badge: "Core Engine",
    span: "col-span-1 md:col-span-2",
    accent: "from-indigo-500/20 to-violet-500/5",
    highlight: "4x Faster Quote Delivery",
  },
  {
    id: "crm",
    title: "Zero-Friction Sales CRM",
    description:
      "Track every lead, deal stage, and follow-up without manual spreadsheet overhead.",
    icon: Users,
    badge: "Lead Engine",
    span: "col-span-1",
    accent: "from-blue-500/20 to-indigo-500/5",
    highlight: "100% Pipeline Visibility",
  },
  {
    id: "projects",
    title: "Milestone-Based Project Delivery",
    description:
      "Automatically transition won deals into project workspaces with milestones, sprint boards, and QA verification gates.",
    icon: Workflow,
    badge: "Execution",
    span: "col-span-1",
    accent: "from-violet-500/20 to-purple-500/5",
    highlight: "Zero Missed Deadlines",
  },
  {
    id: "finance",
    title: "Financial Intelligence & Cashflow",
    description:
      "Get real-time insights into net operating margins, upcoming invoice milestone dates, and team resource utilization.",
    icon: BarChart3,
    badge: "Finance",
    span: "col-span-1 md:col-span-2",
    accent: "from-cyan-500/20 to-blue-500/5",
    highlight: "Zero Revenue Leakage",
  },
];

function FeaturePreview({ featureId }: { featureId: string }) {
  switch (featureId) {
    case "presales":
      return (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 font-mono text-xs text-slate-300 shadow-inner">
          <div className="flex justify-between border-b border-slate-900 pb-2 text-indigo-400">
            <span>Quote #WX-2026-91</span>
            <span>Status: Approved</span>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Scope: Next.js SaaS Web App</span>
            <span className="text-emerald-400">Margin: 62%</span>
          </div>
          <div className="flex justify-between items-center text-white pt-1">
            <span>Final Fixed Price</span>
            <span className="text-base font-bold text-emerald-400">$32,500</span>
          </div>
        </div>
      );

    case "crm":
      return (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs">
            <span className="text-slate-200">Qualify Phase</span>
            <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-indigo-300">12 Deals</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-xs text-emerald-400">
            <span>Closed Won</span>
            <span className="font-bold">$148,000</span>
          </div>
        </div>
      );

    case "projects":
      return (
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Sprint 3 Progress</span>
            <span className="text-indigo-400">84%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950 border border-slate-800">
            <div className="h-2 rounded-full bg-indigo-500 w-[84%]"></div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>QA Test Suite Passed</span>
          </div>
        </div>
      );

    case "finance":
      return (
        <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 space-y-1">
            <div className="text-[10px] text-slate-500">COLLECTED REVENUE</div>
            <div className="text-lg font-bold text-emerald-400">$184,500</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 space-y-1">
            <div className="text-[10px] text-slate-500">PENDING MILESTONES</div>
            <div className="text-lg font-bold text-amber-400">$38,200</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative border-t border-slate-900 bg-slate-950 py-24 lg:py-32">
      {/* Glow Effect */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 -z-10 h-112.5 w-112.5 rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
            <Zap className="h-3.5 w-3.5" />
            <span>OPERATIONAL EXCELLENCE</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Engineered to Eliminate Friction & Complexity
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg leading-relaxed">
            Replace disconnected spreadsheets, fragmented chat messages, and manual follow-ups with an integrated engine built specifically for modern tech agencies.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {mainFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-indigo-950/50 ${feat.span}`}
              >
                {/* Subtle Background Radial Gradient */}
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-br ${feat.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`}
                />

                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-400">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {feat.description}
                  </p>

                  {/* Feature Interactive/Visual Preview */}
                  <FeaturePreview featureId={feat.id} />
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-800/60 pt-4 text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{feat.highlight}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
