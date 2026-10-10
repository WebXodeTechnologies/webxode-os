"use client";

import React, { useState, useEffect } from "react";
import { Mail, X, Send, Sparkles, Paperclip, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { FollowUpItem } from "./FollowUpsTable";

interface FollowUpEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: FollowUpItem | null;
  onSendEmail: (id: string, subject: string, body: string) => void;
}

const TEMPLATES = [
  {
    name: "SOW & Proposal Follow-up",
    subject: "Follow-up regarding WebXode Scope of Work & Quotation",
    body: (name: string, company: string) =>
      `Hi ${name},\n\nI hope you're having a great week!\n\nI'm following up to see if you had a chance to review the project scope & proposal we sent for ${company}.\n\nWe would love to get your feedback and answer any questions you or your team might have. Are you available for a quick 10-minute catch-up call this week?\n\nBest regards,\nWebXode Technologies Team`,
  },
  {
    name: "Post-Demo Check-in",
    subject: "Checking in after our product demo",
    body: (name: string, company: string) =>
      `Hi ${name},\n\nThank you for taking the time for our demo session earlier.\n\nI wanted to check if you have any follow-up questions regarding the custom feature breakdown or technical architecture for ${company}.\n\nLet me know if you would like me to prepare an updated estimate.\n\nWarm regards,\nWebXode Technologies Team`,
  },
  {
    name: "Contract Signature Reminder",
    subject: "Reminder: WebXode Service Agreement Signature",
    body: (name: string, company: string) =>
      `Hi ${name},\n\nJust a gentle reminder regarding the service agreement sent for ${company}.\n\nOnce signed, our technical team will kick off sprint planning and milestone setup immediately.\n\nPlease let me know if you need any adjustments to the agreement terms.\n\nBest regards,\nWebXode Technologies Team`,
  },
];

export function FollowUpEmailModal({
  isOpen,
  onClose,
  selectedItem,
  onSendEmail,
}: FollowUpEmailModalProps) {
  const [prevItemId, setPrevItemId] = useState<string | null>(null);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (selectedItem && selectedItem.id !== prevItemId) {
    setPrevItemId(selectedItem.id);
    const tpl = TEMPLATES[0];
    setSubject(tpl.subject);
    setEmailBody(tpl.body(selectedItem.contactName, selectedItem.company));
  }

  if (!isOpen || !selectedItem) return null;

  const handleApplyTemplate = (idx: number) => {
    setTemplateIndex(idx);
    const tpl = TEMPLATES[idx];
    setSubject(tpl.subject);
    setEmailBody(tpl.body(selectedItem.contactName, selectedItem.company));
    toast.info(`Applied '${tpl.name}' template`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !emailBody.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      onSendEmail(selectedItem.id, subject, emailBody);
      setIsSending(false);
      toast.success("Follow-up Email Sent", {
        description: `Dispatched follow-up mail to ${selectedItem.email}`,
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-600">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Compose Follow-up Email</h3>
              <p className="text-xs font-semibold text-slate-500">
                To: {selectedItem.contactName} &lt;{selectedItem.email}&gt;
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Templates selector */}
        <div>
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Quick Sales Templates:
          </span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {TEMPLATES.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                onClick={() => handleApplyTemplate(idx)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                  templateIndex === idx
                    ? "border-purple-300 bg-purple-50 text-purple-700 shadow-2xs"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <Sparkles className="mr-1 inline h-3 w-3" /> {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-slate-700">Subject Line *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Email Message *</label>
            <textarea
              rows={7}
              required
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-xs leading-relaxed font-medium text-slate-800 outline-none focus:border-indigo-600"
            />
          </div>

          {/* Attachments & Actions Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => toast.info("Proposal PDF attached automatically")}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              <Paperclip className="h-4 w-4" /> Attach Proposal / Scope Document
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" /> {isSending ? "Sending..." : "Dispatch Email"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
