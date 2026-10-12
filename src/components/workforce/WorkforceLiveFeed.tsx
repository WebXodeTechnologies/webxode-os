"use client";

import React from "react";
import Image from "next/image";
import {
  GitPullRequest,
  Palette,
  Cloud,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Send,
  AlertTriangle,
} from "lucide-react";

interface LiveFeedItem {
  id: string;
  contributorName: string;
  role: string;
  avatar: string;
  projectName: string;
  projectCode: string;
  timeAgo: string;
  summary: string;
  deliverableUrl?: string;
  reportedTo: string;
  status: "approved" | "pending_review" | "blocked";
}

const DEMO_LIVE_FEEDS: LiveFeedItem[] = [
  {
    id: "feed_1",
    contributorName: "Alex Rivera",
    role: "Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    projectName: "Next.js 15 Enterprise B2B Freight Platform",
    projectCode: "PRJ-CORP-101",
    timeAgo: "12 mins ago",
    summary:
      "Submitted PR #348: Real-time WebSocket canvas orderbook ticker with dynamic 60fps smoothing and memory benchmark reports.",
    deliverableUrl: "https://github.com/webxode/globallogistics-web/pull/348",
    reportedTo: "Tech Lead (David Chen)",
    status: "approved",
  },
  {
    id: "feed_2",
    contributorName: "Elena Rostova",
    role: "UI/UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    projectName: "AI Agent Intelligence Workspace",
    projectCode: "PRJ-AI-202",
    timeAgo: "35 mins ago",
    summary:
      "Exported Design System 3.0 Glass Tokens to JSON. Finalized 42 component variants in Figma with 7:1 dark mode contrast compliance.",
    deliverableUrl: "https://figma.com/design/sample-logistics-tokens",
    reportedTo: "Project Manager (Sarah Jenkins)",
    status: "approved",
  },
  {
    id: "feed_3",
    contributorName: "Tariq Mansoor",
    role: "Backend Developer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    projectName: "Next.js 15 Enterprise B2B Freight Platform",
    projectCode: "PRJ-CORP-101",
    timeAgo: "1 hour ago",
    summary:
      "Implemented distributed Redis redlock with 500ms lease expiration to prevent race conditions during concurrent shipment dispatches.",
    deliverableUrl: "https://github.com/webxode/logistics-routing-api/pull/112",
    reportedTo: "Tech Lead (David Chen)",
    status: "pending_review",
  },
  {
    id: "feed_4",
    contributorName: "Viktor Vane",
    role: "DevOps Engineer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    projectName: "High-Frequency Fintech Settlement Engine",
    projectCode: "PRJ-FIN-303",
    timeAgo: "2 hours ago",
    summary:
      "Provisioned multi-region AWS EKS clusters via Terraform v1.8 with automated rollback gates and CloudWatch P99 latency alerts.",
    deliverableUrl: "https://github.com/webxode/infra-terraform/pull/89",
    reportedTo: "Tech Lead (David Chen)",
    status: "approved",
  },
  {
    id: "feed_5",
    contributorName: "Maya Lin",
    role: "QA Engineer",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    projectName: "Next.js 15 Enterprise B2B Freight Platform",
    projectCode: "PRJ-CORP-101",
    timeAgo: "3 hours ago",
    summary:
      "Executed Playwright automated cross-browser test suite across Chromium, WebKit, and Firefox. 128 tests passed with 0 flaky failures.",
    deliverableUrl: "https://playwright-reports.webxode.internal/run-9481",
    reportedTo: "Project Manager (Sarah Jenkins)",
    status: "approved",
  },
];

interface WorkforceLiveFeedProps {
  onOpenUpdateModal?: () => void;
}

export function WorkforceLiveFeed({ onOpenUpdateModal }: WorkforceLiveFeedProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-slate-900">
            Real-Time Contributor Activity & Direct Lead Transmissions
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Live stream of pull requests, Figma prototypes, and work items reported by developers &
            designers
          </p>
        </div>

        {onOpenUpdateModal && (
          <button
            type="button"
            onClick={onOpenUpdateModal}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-indigo-600"
          >
            <Send className="h-3.5 w-3.5" />
            <span>+ Submit Work Update</span>
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {DEMO_LIVE_FEEDS.map((item) => (
          <div key={item.id} className="py-4 first:pt-2 last:pb-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl ring-2 ring-slate-100">
                  <Image
                    src={item.avatar}
                    alt={item.contributorName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-slate-900">
                      {item.contributorName}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                      {item.role}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-600">
                      [{item.projectCode}] {item.projectName}
                    </span>
                    <span className="text-[11px] text-slate-400">• {item.timeAgo}</span>
                  </div>

                  <p className="text-xs leading-relaxed font-medium text-slate-700">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                      Direct Report: <strong className="text-slate-900">{item.reportedTo}</strong>
                    </span>

                    {item.status === "approved" ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        Signed Off by Lead
                      </span>
                    ) : item.status === "pending_review" ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 font-bold text-amber-700">
                        <Clock className="h-3 w-3 text-amber-600" />
                        Pending Lead Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 font-bold text-rose-700">
                        <AlertTriangle className="h-3 w-3 text-rose-600" />
                        Blocker Escalated
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {item.deliverableUrl && (
                <a
                  href={item.deliverableUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 sm:mt-0"
                >
                  <span>Deliverable</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
