"use client";

import React from "react";
import {
  Users,
  Mail,
  Plus,
  Ticket,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckSquare,
  FileText,
  Bell,
} from "lucide-react";

export function ClientBottomWidgets({ lead }: { lead?: any }) {
  return (
    <div className="mt-6 space-y-6 pb-20">
      {/* Contacts */}
      <div className="rounded-[2rem] border border-slate-100 bg-white p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-700">Contacts</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-indigo-600">
              <Mail className="h-3.5 w-3.5" /> Send Invitation
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-indigo-600">
              <Plus className="h-3.5 w-3.5" /> Add contact
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-emerald-600">
              <Plus className="h-3.5 w-3.5" /> Add referral
            </button>
          </div>
        </div>

        {/* Existing Primary Contact */}
        <div className="mb-4 flex flex-col justify-between gap-4 border-b border-slate-50 py-2 pb-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200 font-bold text-slate-500">
              {lead?.contactPerson ? lead.contactPerson.substring(0, 2).toUpperCase() : "U"}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-700">
                {lead?.contactPerson || "Emily Smith"}
              </div>
              <div className="text-xs font-semibold text-slate-400">Primary Contact</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Mail className="h-3.5 w-3.5 text-slate-400" /> {lead?.email || "No email"}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {lead?.phone || "No phone"}
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            {/* Gender symbols */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 12l8-8"></path>
              <path d="M16 4h4v4"></path>
            </svg>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="10" r="6"></circle>
              <path d="M12 16v6"></path>
              <path d="M9 19h6"></path>
            </svg>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-700">
              JD
            </div>
            <div>
              <div className="text-sm font-bold text-slate-700">John Doe</div>
              <div className="inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                Referral
              </div>
            </div>
          </div>
          <div className="text-xs font-semibold break-all text-slate-500 md:break-normal">
            john.doe@example.com
          </div>
          <div className="text-xs font-semibold whitespace-nowrap text-slate-500">+1 555-0198</div>
          <div className="text-xs font-medium text-slate-500 italic">Needs Custom Software Dev</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Tickets */}
        <div className="flex h-100 flex-col rounded-[2rem] border border-slate-100 bg-white p-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700">Tickets</h3>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-xs font-bold text-slate-500 transition hover:text-indigo-600">
                <Plus className="h-3.5 w-3.5" /> Add ticket
              </button>
              <button className="text-slate-400">
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
          </div>

          <div className="mb-4 flex gap-4 border-b border-slate-100 pb-2">
            <button className="-mb-2.25 border-b-2 border-indigo-500 pb-2 text-xs font-bold text-slate-800">
              Open
            </button>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600">
              Closed
            </button>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600">
              Overdue
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-lg border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-medium outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200"></div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="text-xs font-bold text-slate-700">Demo Client</div>
                  <div className="text-[10px] font-semibold text-slate-400">Yesterday</div>
                </div>
                <div className="mt-0.5 text-xs font-medium text-slate-500">
                  Can not open the design file.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
                DC
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="text-xs font-bold text-slate-700">Demo Client</div>
                  <div className="text-[10px] font-semibold text-slate-400">13-09-2026</div>
                </div>
                <div className="mt-0.5 text-xs font-medium text-slate-500">
                  How can I access my billing history?
                </div>
                <div className="mt-1.5 inline-block rounded bg-teal-100 px-1.5 py-0.5 text-[9px] font-bold text-teal-700">
                  Important
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="flex h-100 flex-col rounded-[2rem] border border-slate-100 bg-white p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700">Events</h3>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-xs font-bold text-slate-500 transition hover:text-indigo-600">
                <Plus className="h-3.5 w-3.5" /> Add event
              </button>
              <button className="text-slate-400">
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
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-1">
              <button className="rounded p-1 text-slate-400 hover:bg-slate-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="rounded p-1 text-slate-400 hover:bg-slate-50">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm font-bold text-slate-700">October 2026</div>
            <button className="text-xs font-semibold text-slate-400 hover:text-slate-600">
              today
            </button>
          </div>

          <div className="mb-6 flex justify-center gap-4 border-b border-slate-100 pb-2 text-xs font-semibold text-slate-400">
            <span className="-mb-2.25 border-b-2 border-indigo-500 pb-2 text-indigo-600">
              month
            </span>
            <span className="cursor-pointer hover:text-slate-600">week</span>
            <span className="cursor-pointer hover:text-slate-600">day</span>
            <span className="cursor-pointer hover:text-slate-600">list</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            <div className="pb-2 font-bold text-slate-700">Sun</div>
            <div className="pb-2 font-bold text-slate-700">Mon</div>
            <div className="pb-2 font-bold text-slate-700">Tue</div>
            <div className="pb-2 font-bold text-slate-700">Wed</div>
            <div className="pb-2 font-bold text-slate-700">Thu</div>
            <div className="pb-2 font-bold text-slate-700">Fri</div>
            <div className="pb-2 font-bold text-slate-700">Sat</div>

            {/* Empty days */}
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-300">27</div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-300">28</div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-300">29</div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-300">30</div>

            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">1</div>

            <div className="relative h-12 border-t border-slate-100 pt-1 text-slate-500">
              2
              <div className="absolute top-5 right-1 left-1 truncate rounded bg-teal-500 px-1 text-left text-[9px] font-bold text-white">
                Event Planning...
              </div>
            </div>

            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">3</div>

            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">4</div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">5</div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">6</div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">7</div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">8</div>
            <div className="relative h-12 border-t border-slate-100 pt-1 text-slate-500">
              9<div className="absolute top-5 right-1 left-1 h-4 rounded bg-amber-100"></div>
            </div>
            <div className="h-12 border-t border-slate-100 pt-1 text-slate-500">10</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Tasks Widget */}
        <div className="flex flex-col rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700">Tasks</h3>
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
          <button className="flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-indigo-600">
            <Plus className="h-3.5 w-3.5" /> Add task
          </button>
        </div>

        {/* Sticky Notes Widget */}
        <div className="relative flex flex-col rounded-[2rem] border border-amber-100 bg-amber-50/50 p-6 shadow-sm">
          <div className="absolute top-0 right-8 h-6 w-6 -translate-y-1/2 rotate-45 rounded-sm bg-amber-200/50" />
          <div className="relative z-10 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-bold text-amber-900">Sticky Notes</h3>
            </div>
            <button className="text-amber-400 hover:text-amber-600">
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
          <div className="mb-4 text-xs font-medium text-amber-800/70">
            Private meeting notes while on call.
          </div>
          <div className="mb-4 flex-1 space-y-3">
            <div className="rounded-xl border border-amber-200/50 bg-amber-100/50 p-3 text-xs font-medium text-amber-900">
              Discussed Q3 pricing tiers. They need the SLA documents by Friday.
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-100 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-200">
            <Plus className="h-3.5 w-3.5" /> Add quick note
          </button>
        </div>

        {/* Reminders Widget */}
        <div className="flex flex-col rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700">Reminders (Private)</h3>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-indigo-600">
            <Plus className="h-3.5 w-3.5" /> Add reminder
          </button>
        </div>
      </div>
    </div>
  );
}
