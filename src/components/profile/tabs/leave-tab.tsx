// src/components/profile/tabs/leave-tab.tsx
"use client";

import { useState } from "react";
import {
  Coffee,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  Users,
  Search,
  ChevronDown,
  Check,
  XCircle,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { getDefaultAvatar } from "@/lib/avatars";
import { toast } from "sonner";

interface EmployeeLeaveData {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  quotas: {
    paid: { used: number; total: number };
    sick: { used: number; total: number };
    casual: { used: number; total: number };
  };
  history: {
    id: string;
    type: string;
    dates: string;
    days: string;
    status: "Approved" | "Pending Approval" | "Rejected";
    manager: string;
  }[];
}

const EMPLOYEES_LEAVE_DATA: EmployeeLeaveData[] = [
  {
    id: "EMP-106",
    name: "Priya Sharma",
    title: "Senior Full Stack Engineering Lead",
    department: "Engineering",
    email: "priya@webxode.com",
    quotas: {
      paid: { used: 14, total: 20 },
      sick: { used: 0, total: 5 },
      casual: { used: 3, total: 4 },
    },
    history: [
      {
        id: "LR-401",
        type: "Annual Vacation",
        dates: "Aug 12 - Aug 16, 2026",
        days: "5 Days",
        status: "Approved",
        manager: "AKASH",
      },
      {
        id: "LR-388",
        type: "Casual Leave",
        dates: "Jun 02, 2026",
        days: "1 Day",
        status: "Approved",
        manager: "AKASH",
      },
      {
        id: "LR-350",
        type: "Annual Vacation",
        dates: "Mar 20 - Mar 22, 2026",
        days: "3 Days",
        status: "Approved",
        manager: "AKASH",
      },
    ],
  },
  {
    id: "EMP-107",
    name: "David Chen",
    title: "Lead UI/UX Product Designer",
    department: "UI/UX Design",
    email: "david@webxode.com",
    quotas: {
      paid: { used: 8, total: 20 },
      sick: { used: 2, total: 5 },
      casual: { used: 1, total: 4 },
    },
    history: [
      {
        id: "LR-420",
        type: "Design Conference Leave",
        dates: "Oct 10 - Oct 12, 2026",
        days: "3 Days",
        status: "Pending Approval",
        manager: "AKASH",
      },
      {
        id: "LR-392",
        type: "Medical Leave",
        dates: "Jul 15, 2026",
        days: "1 Day",
        status: "Approved",
        manager: "AKASH",
      },
    ],
  },
  {
    id: "EMP-108",
    name: "Marcus Vance",
    title: "DevOps & Cloud Lead",
    department: "Infrastructure",
    email: "marcus@webxode.com",
    quotas: {
      paid: { used: 18, total: 20 },
      sick: { used: 4, total: 5 },
      casual: { used: 4, total: 4 },
    },
    history: [
      {
        id: "LR-425",
        type: "Annual Leave",
        dates: "Oct 04 - Oct 08, 2026",
        days: "5 Days",
        status: "Approved",
        manager: "AKASH",
      },
      {
        id: "LR-410",
        type: "Medical Recovery",
        dates: "Sep 01 - Sep 03, 2026",
        days: "3 Days",
        status: "Approved",
        manager: "AKASH",
      },
    ],
  },
  {
    id: "EMP-101",
    name: "Arun Kumar",
    title: "Head of Sales & Growth",
    department: "Sales",
    email: "arun@webxode.com",
    quotas: {
      paid: { used: 10, total: 20 },
      sick: { used: 1, total: 5 },
      casual: { used: 2, total: 4 },
    },
    history: [
      {
        id: "LR-395",
        type: "Client Onsite Visit Leave",
        dates: "Jul 28 - Jul 30, 2026",
        days: "3 Days",
        status: "Approved",
        manager: "AKASH",
      },
    ],
  },
  {
    id: "EMP-102",
    name: "Kavya Nair",
    title: "Senior Presales Architect",
    department: "Presales",
    email: "kavya@webxode.com",
    quotas: {
      paid: { used: 5, total: 20 },
      sick: { used: 0, total: 5 },
      casual: { used: 1, total: 4 },
    },
    history: [
      {
        id: "LR-360",
        type: "Personal Leave",
        dates: "May 10, 2026",
        days: "1 Day",
        status: "Approved",
        manager: "AKASH",
      },
    ],
  },
];

export function LeaveTab() {
  const [selectedEmpId, setSelectedEmpId] = useState<string>(EMPLOYEES_LEAVE_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedEmployee =
    EMPLOYEES_LEAVE_DATA.find((e) => e.id === selectedEmpId) || EMPLOYEES_LEAVE_DATA[0];

  const filteredEmployees = EMPLOYEES_LEAVE_DATA.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (historyId: string) => {
    toast.success("Leave Request Approved", {
      description: `Ref ${historyId} for ${selectedEmployee.name} is now marked as Approved.`,
    });
  };

  const handleReject = (historyId: string) => {
    toast.error("Leave Request Rejected", {
      description: `Ref ${historyId} for ${selectedEmployee.name} has been rejected.`,
    });
  };

  const avatar = getDefaultAvatar("user", selectedEmployee.department, selectedEmployee.name);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Employee Leave & Absence Manager</h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Select any team employee to view their annual vacation quota, medical leaves, and
            approve/reject leave requests.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.success("Leave Report Exported", {
              description: `Exported dossier for ${selectedEmployee.name}`,
            })
          }
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] sm:text-sm"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Export Absence Dossier</span>
        </button>
      </div>

      {/* Employee Selector Bar */}
      <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs sm:p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <span className="text-xs font-bold tracking-wide text-slate-900 uppercase">
              Select Team Employee:
            </span>
          </div>

          <div className="relative min-w-50 sm:min-w-65">
            <Search className="absolute top-2 left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employee..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Employee Avatar Pills Selector (Horizontal scroll) */}
        <div className="flex scrollbar-none items-center gap-2.5 overflow-x-auto pb-1">
          {filteredEmployees.map((emp) => {
            const isSelected = emp.id === selectedEmpId;
            const empAvatar = getDefaultAvatar("user", emp.department, emp.name);
            return (
              <button
                key={emp.id}
                type="button"
                onClick={() => setSelectedEmpId(emp.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-3.5 py-2 text-xs font-bold transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md ring-2 shadow-indigo-600/25 ring-indigo-600/20"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100">
                  <Image
                    src={empAvatar.imageUrl}
                    alt={emp.name}
                    width={28}
                    height={28}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>{emp.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${isSelected ? "bg-indigo-500/30 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {emp.department}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Employee Profile Header Card */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/90 bg-linear-to-r from-white via-indigo-50/40 to-slate-50 p-5 shadow-2xs sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div
            className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${avatar.bgClass} border border-slate-200 shadow-2xs`}
          >
            <Image
              src={avatar.imageUrl}
              alt={selectedEmployee.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900 sm:text-lg">
                {selectedEmployee.name}
              </h3>
              <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                {selectedEmployee.department}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 sm:text-sm">
              {selectedEmployee.title} • {selectedEmployee.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <button
            type="button"
            onClick={() =>
              toast.info("Grant Leave Days", {
                description: `Adding leave quota for ${selectedEmployee.name}`,
              })
            }
            className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 transition-colors hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4" />
            <span>Grant Leave Days</span>
          </button>
        </div>
      </div>

      {/* Selected Employee Quota Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Paid Annual Leave */}
        <div className="space-y-3 rounded-3xl border border-indigo-200 bg-indigo-50/70 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700">Paid Annual Leave</span>
            <span className="text-xs font-extrabold text-indigo-950">
              {selectedEmployee.quotas.paid.total - selectedEmployee.quotas.paid.used} days left
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {selectedEmployee.quotas.paid.used}{" "}
            <span className="text-xs font-bold text-slate-500">
              / {selectedEmployee.quotas.paid.total} Days Used
            </span>
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-200/40 bg-white/80">
            <div
              className="h-full bg-indigo-600"
              style={{
                width: `${Math.round((selectedEmployee.quotas.paid.used / selectedEmployee.quotas.paid.total) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Sick & Medical Leave */}
        <div className="space-y-3 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">Sick & Medical Leave</span>
            <span className="text-xs font-extrabold text-emerald-950">
              {selectedEmployee.quotas.sick.total - selectedEmployee.quotas.sick.used} days left
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {selectedEmployee.quotas.sick.used}{" "}
            <span className="text-xs font-bold text-slate-500">
              / {selectedEmployee.quotas.sick.total} Days Used
            </span>
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-200/40 bg-white/80">
            <div
              className="h-full bg-emerald-600"
              style={{
                width: `${Math.round((selectedEmployee.quotas.sick.used / selectedEmployee.quotas.sick.total) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Casual & Floating Leave */}
        <div className="space-y-3 rounded-3xl border border-purple-200 bg-purple-50/70 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700">Casual & Floating Leave</span>
            <span className="text-xs font-extrabold text-purple-950">
              {selectedEmployee.quotas.casual.total - selectedEmployee.quotas.casual.used} days left
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {selectedEmployee.quotas.casual.used}{" "}
            <span className="text-xs font-bold text-slate-500">
              / {selectedEmployee.quotas.casual.total} Days Used
            </span>
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-200/40 bg-white/80">
            <div
              className="h-full bg-purple-600"
              style={{
                width: `${Math.round((selectedEmployee.quotas.casual.used / selectedEmployee.quotas.casual.total) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Selected Employee Leave Application & Approval History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
            {selectedEmployee.name}&apos;s Leave Applications & History
          </h3>
          <span className="text-xs font-semibold text-slate-500">2026 Fiscal Year</span>
        </div>

        <div className="space-y-3">
          {selectedEmployee.history.map((item) => {
            const isPending = item.status === "Pending Approval";
            const isApproved = item.status === "Approved";
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-colors hover:border-indigo-200 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 sm:text-sm">{item.type}</p>
                    <p className="text-[11px] font-medium text-slate-500">
                      Ref: {item.id} • Dates: {item.dates} ({item.days})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleApprove(item.id)}
                        className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(item.id)}
                        className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-slate-400">
                        Approved by {item.manager}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-extrabold ${
                          isApproved
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-rose-200 bg-rose-50 text-rose-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
