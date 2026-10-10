"use client";

import React from "react";
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  Calendar,
  Globe,
  CheckSquare,
  FileText,
  Bell,
  UserPlus,
} from "lucide-react";

export function ClientRightSidebar({ lead }: { lead?: any }) {
  return (
    <div className="w-full shrink-0 space-y-4">
      {/* Client Info Widget */}
      <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-700">Client Info</h3>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700">Organization</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <div className="h-4 w-4 text-purple-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
            </div>
            <div>
              <span className="inline-block rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                Corporate
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <div className="h-4 w-4 text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-600">VIP</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-xs font-bold text-slate-500">
                {lead?.contactPerson ? lead.contactPerson.substring(0, 2).toUpperCase() : "U"}
              </div>
              <div className="text-xs font-bold text-slate-700">
                {lead?.contactPerson || "Manager"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <UserPlus className="mt-0.5 h-4 w-4 text-slate-400" />
            <button className="text-xs font-semibold text-slate-400 transition hover:text-indigo-600">
              Add Managers
            </button>
          </div>

          <div className="flex items-start gap-3 border-t border-slate-100 pt-4">
            <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
            <div className="text-xs leading-relaxed font-semibold text-slate-500">
              {lead?.address || "Address not provided"}
              <br />
              {lead?.city && lead?.state ? `${lead.city}, ${lead.state}` : ""}
              {lead?.country ? `, ${lead.country}` : ""}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-slate-400" />
            <div className="text-xs font-semibold text-slate-500">{lead?.phone || "No phone"}</div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-slate-400" />
            <div className="text-xs font-semibold text-slate-500">24-08-2026 12:00:00 am</div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4 text-slate-400" />
            <div className="text-xs font-semibold text-slate-500">
              {lead?.website || "No website"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
