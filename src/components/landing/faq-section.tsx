"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "What makes Webxode OS different from generic CRMs like HubSpot or Salesforce?",
    answer:
      "Generic CRMs only track leads and email threads. Webxode OS is an end-to-end Agency Operating System engineered specifically for tech agencies and software companies. It unifies the entire business lifecycle—connecting lead acquisition directly to presales technical scoping, milestone pricing, sprint execution, QA verification, developer utilization, and real-time net operating margin tracking in one seamless engine.",
  },
  {
    question: "How does Webxode OS prevent underpriced proposals & profit leakage?",
    answer:
      "Instead of guessing quotes in Word or Excel, Webxode OS calculates presales scope items against real-time developer hourly costs and required margin thresholds. Before any proposal is dispatched to a client, Webxode OS runs an automated profit audit and requires Technical Director sign-off if estimated margins fall below your agency's target benchmark (e.g., 55%).",
  },
  {
    question: "What happens automatically when a sales deal is marked as 'Closed Won'?",
    answer:
      "The moment a deal is won or a quote is digitally signed by a client, Webxode OS automatically provisions a dedicated project workspace. All milestone deliverables, estimated sprint hours, and technical scope items are instantly populated into the engineering team's execution board—eliminating manual handoffs and forgotten project requirements.",
  },
  {
    question: "Can we configure strict Role-Based Access Control (RBAC) across teams?",
    answer:
      "Yes. Webxode OS enforces granular departmental permissions. Software developers see their assigned tasks and sprint backlogs; Sales Executives manage pipeline leads and follow-ups; Presales Engineers access scope builders; while Executives & Founders maintain exclusive visibility over company revenue, net operating margins, and cashflow analytics.",
  },
  {
    question: "How does Webxode OS streamline client billing & invoice milestone collection?",
    answer:
      "Project milestones are directly linked to contract payment terms. When a sprint milestone passes QA verification, Webxode OS triggers an invoice notification, alerts the finance team, and updates real-time cashflow projections—ensuring zero unpaid or forgotten deliverables.",
  },
  {
    question: "Can Webxode OS be self-hosted or integrated with our internal cloud infrastructure?",
    answer:
      "Engineered as a high-performance modular monolith using Next.js, TypeScript, MongoDB, and Redis, Webxode OS can be easily deployed on Vercel, AWS, Docker containers, or internal agency servers with enterprise-grade encryption and automated database backups.",
  },
  {
    question: "How fast can our agency team onboard and centralize operations?",
    answer:
      "Onboarding takes less than 15 minutes. You can import existing client data, customize pipeline stage rules, assign team roles, and begin generating profit-checked proposals immediately without complex IT setup.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative border-t border-slate-900 bg-slate-950 py-24 lg:py-32">
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[170px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>EXPERT KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Everything you need to know about Webxode OS architecture, presales automation, project
            execution, and enterprise security.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-500/40 bg-slate-900/80 shadow-xl shadow-indigo-950/30"
                    : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span
                    className={`pr-4 text-base font-bold transition-colors sm:text-lg ${isOpen ? "text-indigo-300" : "text-white"}`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "border-slate-800 bg-slate-950 text-slate-400"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-1 border-t border-slate-800/60 px-6 pt-0 pb-6 text-sm leading-relaxed text-slate-300">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
