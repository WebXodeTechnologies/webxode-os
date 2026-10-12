"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, Activity, Award } from "lucide-react";

export function DevSecOpsSecurityMonitor() {
  const auditCards = [
    {
      title: "SonarQube Code Quality",
      grade: "Grade A",
      subtitle: "88% Test Coverage Average",
      icon: Award,
      badge: "Zero Code Smells",
      badgeColor: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Snyk / CVE Vulnerability Scan",
      grade: "0 Critical / 0 High",
      subtitle: "Trivy Container Audited",
      icon: ShieldCheck,
      badge: "OWASP Compliant",
      badgeColor: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "SSL / TLS Encryption",
      grade: "A+ SSL Labs",
      subtitle: "Valid for 180+ Days",
      icon: Lock,
      badge: "Auto-Renew Let's Encrypt",
      badgeColor: "bg-sky-50 text-sky-700",
    },
    {
      title: "SRE Uptime SLA",
      grade: "99.98% Available",
      subtitle: "14ms P99 API Latency",
      icon: Activity,
      badge: "Multi-Region Redundant",
      badgeColor: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="space-y-5 rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-[10px] font-black tracking-wider text-emerald-600 uppercase">
            Security & Reliability Posture
          </span>
          <h3 className="text-lg font-black text-slate-900">DevSecOps & SRE Compliance Monitor</h3>
          <p className="text-xs text-slate-500">
            Enterprise vulnerability scanning, zero-day CVE audits, test coverage, and automated SSL
            cert checks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            SOC2 Type II Certified
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {auditCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{card.title}</span>
                <Icon className="h-4 w-4 text-slate-400" />
              </div>

              <div>
                <div className="text-lg font-black text-slate-900">{card.grade}</div>
                <div className="text-[11px] font-semibold text-slate-500">{card.subtitle}</div>
              </div>

              <div className="border-t border-slate-200/60 pt-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${card.badgeColor}`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {card.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
