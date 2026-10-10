"use client";

import React, { useState } from "react";
import { Mail, Send, X, Paperclip, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "@/lib/toast";

interface EmailComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetContact?: {
    name: string;
    email: string;
  } | null;
  onSendEmail: (emailData: any) => void;
}

const EMAIL_TEMPLATES = [
  {
    label: "Product Demo Followup",
    subject: "WebXode OS - Custom Enterprise Demo & SOW Summary",
    body: `Hi {{name}},\n\nThank you for joining our technical demo call earlier today. As discussed, I have attached our preliminary Statement of Work (SOW) draft for your review.\n\nPlease let me know if you have any questions or require adjustments before our next kickoff call.\n\nBest regards,\nSales & Solutions Team\nWebXode Technologies`,
  },
  {
    label: "SOW Estimate & Pricing Quote",
    subject: "Estimate Quote & Scope Breakdown for Project",
    body: `Hi {{name}},\n\nFollowing up on our discovery session, we have finalized the project cost estimate and feature scope breakdown.\n\nTotal Estimated Investment: ₹4,50,000 (INR)\nEstimated Delivery Timeline: 8 Weeks\n\nLooking forward to your signoff.\n\nBest regards,\nWebXode Sales Team`,
  },
  {
    label: "Discovery Call Confirmation",
    subject: "Confirmed: Discovery Meeting Call - WebXode Technologies",
    body: `Hi {{name}},\n\nThis email confirms our upcoming technical discovery meeting scheduled for tomorrow.\n\nGoogle Meet / Call Link: https://meet.google.com/xyz-abc-123\n\nSee you on the call!\n\nBest regards,\nWebXode Technologies`,
  },
  {
    label: "Cold Outreach & Intro",
    subject: "Custom ERP & Software Dev Solutions for Your Growth",
    body: `Hi {{name}},\n\nI noticed your team is scaling operations. At WebXode OS, we specialize in building custom web applications, mobile apps, and enterprise ERP solutions.\n\nWould you be open for a brief 10-minute intro call this week?\n\nBest regards,\nWebXode Sales Team`,
  },
];

export function EmailComposerModal({
  isOpen,
  onClose,
  targetContact,
  onSendEmail,
}: EmailComposerModalProps) {
  const recipientName = targetContact?.name || "Murugan P. (Annai Agro Tradings)";
  const recipientEmail = targetContact?.email || "annai.agro@client.com";

  const [selectedTemplate, setSelectedTemplate] = useState("Product Demo Followup");
  const [subject, setSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [body, setBody] = useState(EMAIL_TEMPLATES[0].body.replace("{{name}}", recipientName));

  const handleTemplateChange = (templateLabel: string) => {
    setSelectedTemplate(templateLabel);
    const tmpl = EMAIL_TEMPLATES.find((t) => t.label === templateLabel);
    if (tmpl) {
      setSubject(tmpl.subject);
      setBody(tmpl.body.replace("{{name}}", recipientName));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;

    onSendEmail({
      recipientName,
      recipientEmail,
      subject,
      body,
      template: selectedTemplate,
    });

    onClose();
    toast.success("Email Sent Successfully", {
      description: `Dispatched email to ${recipientEmail}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Compose Sales Email</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Recipient info & Template selector */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-slate-700">Recipient Email *</label>
            <input
              type="text"
              readOnly
              value={`${recipientName} <${recipientEmail}>`}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Email Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            >
              {EMAIL_TEMPLATES.map((t) => (
                <option key={t.label} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Subject Line *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. SOW Estimate & Proposal Summary"
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Email Body Message *</label>
            <textarea
              required
              rows={7}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-xs leading-relaxed font-medium outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => toast.info("Attachment added")}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600"
            >
              <Paperclip className="h-4 w-4" /> Attach File (SOW/Estimate PDF)
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
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-blue-700"
              >
                <Send className="h-3.5 w-3.5" /> Send Email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
