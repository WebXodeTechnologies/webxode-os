"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  IndianRupee,
  FileSignature,
  Building2,
  Clock,
  Send,
  X,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientContractsTabProps {
  lead?: any;
  onMoveToDev?: () => void;
}

export function ClientContractsTab({ lead, onMoveToDev }: ClientContractsTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [contracts, setContracts] = useState([
    {
      id: "CTR-2026-99",
      title: "Master Software Development Agreement & IP Assignment",
      status: "Client Signed",
      signedBy: lead?.contactPerson || "Emily Smith",
      signedDate: "06 Oct 2026",
      value: 770000,
      devPhaseMoved: true,
      startDate: "01 Oct 2026",
      endDate: "30 Sep 2027",
    },
    {
      id: "CTR-2026-104",
      title: "24/7 Cloud Support & SLA Contract",
      status: "Pending Signature",
      signedBy: "Pending Client CEO Signoff",
      signedDate: "Awaiting",
      value: 120000,
      devPhaseMoved: false,
      startDate: "15 Oct 2026",
      endDate: "14 Oct 2027",
    },
  ]);

  const handleMoveToDevPhase = (ctrId: string) => {
    setContracts((prev) => prev.map((c) => (c.id === ctrId ? { ...c, devPhaseMoved: true } : c)));
    toast.success("Moved to Dev Phase!", {
      description: `Client demo signed off. Project & contract ${ctrId} transitioned to Engineering Dev team.`,
    });
    onMoveToDev?.();
  };

  const handleSendReminder = (title: string) => {
    toast.success("Signature Reminder Sent", {
      description: `e-Signature link for "${title}" resent to client.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Header */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-2xs">
              <FileSignature className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Legal Contracts & Dev Handoff</h2>
              <p className="text-xs font-semibold text-slate-500">
                Agreements on approval & transition to engineering dev phase for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Legal Compliance Verified
            </span>
          </div>
        </div>
      </div>

      {/* Contracts List Cards */}
      <div className="space-y-6">
        {contracts.map((c) => (
          <div
            key={c.id}
            className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-indigo-600">{c.id}</span>
                  <h3 className="text-base font-extrabold text-slate-900">{c.title}</h3>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                  <span>Signee: {c.signedBy}</span>
                  <span>•</span>
                  <span>Date: {c.signedDate}</span>
                  <span>•</span>
                  <span>
                    Contract Period: {c.startDate} to {c.endDate}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    c.status === "Client Signed"
                      ? "border border-emerald-200 bg-emerald-100 text-emerald-800"
                      : "border border-amber-200 bg-amber-100 text-amber-800"
                  }`}
                >
                  {c.status}
                </span>

                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">
                    ₹{c.value.toLocaleString("en-IN")}
                  </div>
                </div>

                {c.status === "Client Signed" ? (
                  <button
                    type="button"
                    onClick={() => handleMoveToDevPhase(c.id)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                  >
                    <span>Moved to Dev Phase</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendReminder(c.title)}
                    className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-100"
                  >
                    <Send className="h-3.5 w-3.5" /> Remind Signee
                  </button>
                )}
              </div>
            </div>

            {/* Dev Phase Handoff Banner */}
            {c.devPhaseMoved && (
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs font-semibold text-emerald-950">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  Demo completion & contract signature verified! Client workspace successfully moved
                  to Engineering Dev Phase.
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
