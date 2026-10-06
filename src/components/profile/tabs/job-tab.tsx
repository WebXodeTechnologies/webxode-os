// src/components/profile/tabs/job-tab.tsx
"use client";

import { useState } from "react";
import {
  Briefcase,
  Building2,
  Users2,
  ShieldCheck,
  Calendar,
  MapPin,
  Mail,
  MessageSquare,
  Ticket,
  Search,
  Filter,
  X,
  Sparkles,
  ChevronRight,
  Phone,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { getDefaultAvatar } from "@/lib/avatars";
import { toast } from "sonner";

interface Employee {
  id: string;
  name: string;
  title: string;
  department: "sales" | "presales" | "hr" | "engineering" | "design";
  departmentLabel: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "In Meeting" | "On Leave";
  projectsCount: number;
  badgeBg: string;
  avatarBgClass: string;
}

const EMPLOYEES: Employee[] = [
  {
    id: "EMP-101",
    name: "Arun Kumar",
    title: "Head of Sales & Growth",
    department: "sales",
    departmentLabel: "Sales",
    email: "arun@webxode.com",
    phone: "+91 98765 43210",
    location: "Chennai, India",
    status: "Active",
    projectsCount: 8,
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    avatarBgClass: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "EMP-102",
    name: "Kavya Nair",
    title: "Senior Presales & Solutions Architect",
    department: "presales",
    departmentLabel: "Presales",
    email: "kavya@webxode.com",
    phone: "+91 98765 43211",
    location: "Bengaluru, India",
    status: "Active",
    projectsCount: 12,
    badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
    avatarBgClass: "bg-purple-100 text-purple-700",
  },
  {
    id: "EMP-103",
    name: "Rohan Verma",
    title: "Enterprise Account Executive",
    department: "sales",
    departmentLabel: "Sales",
    email: "rohan@webxode.com",
    phone: "+91 98765 43212",
    location: "Mumbai, India",
    status: "In Meeting",
    projectsCount: 6,
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    avatarBgClass: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "EMP-104",
    name: "Meera Krishnan",
    title: "VP of HR & People Operations",
    department: "hr",
    departmentLabel: "Human Resources",
    email: "meera@webxode.com",
    phone: "+91 98765 43213",
    location: "Namakkal, HQ",
    status: "Active",
    projectsCount: 4,
    badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
    avatarBgClass: "bg-rose-100 text-rose-700",
  },
  {
    id: "EMP-105",
    name: "Siddharth Rao",
    title: "Technical Talent Acquisition Lead",
    department: "hr",
    departmentLabel: "Human Resources",
    email: "siddharth@webxode.com",
    phone: "+91 98765 43214",
    location: "Hyderabad, India",
    status: "Active",
    projectsCount: 5,
    badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
    avatarBgClass: "bg-rose-100 text-rose-700",
  },
  {
    id: "EMP-106",
    name: "Priya Sharma",
    title: "Senior Full Stack Engineering Lead",
    department: "engineering",
    departmentLabel: "Engineering",
    email: "priya@webxode.com",
    phone: "+91 98765 43215",
    location: "Namakkal, HQ",
    status: "Active",
    projectsCount: 14,
    badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
    avatarBgClass: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "EMP-107",
    name: "David Chen",
    title: "Lead UI/UX Product Designer",
    department: "design",
    departmentLabel: "UI/UX Design",
    email: "david@webxode.com",
    phone: "+91 98765 43216",
    location: "San Francisco, CA",
    status: "Active",
    projectsCount: 9,
    badgeBg: "bg-cyan-100 text-cyan-800 border-cyan-200",
    avatarBgClass: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "EMP-108",
    name: "Marcus Vance",
    title: "DevOps & Cloud Infrastructure Lead",
    department: "engineering",
    departmentLabel: "Engineering",
    email: "marcus@webxode.com",
    phone: "+91 98765 43217",
    location: "London, UK",
    status: "On Leave",
    projectsCount: 11,
    badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
    avatarBgClass: "bg-indigo-100 text-indigo-700",
  },
];

export function JobTab() {
  const [activeDeptFilter, setActiveDeptFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const deptCategories = [
    { id: "all", label: "All Workforce" },
    { id: "sales", label: "Sales" },
    { id: "presales", label: "Presales" },
    { id: "hr", label: "Human Resources (HR)" },
    { id: "engineering", label: "Engineering" },
    { id: "design", label: "UI/UX Design" },
  ];

  const filteredEmployees = EMPLOYEES.filter((emp) => {
    const matchesDept = activeDeptFilter === "all" || emp.department === activeDeptFilter;
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleOpenChat = (emp: Employee) => {
    toast.success(`Chat Channel Initiated`, {
      description: `Opening direct message session with ${emp.name} (${emp.title}).`,
    });
  };

  const handleCreateTicket = (emp: Employee) => {
    toast.info(`Support Ticket Assigned`, {
      description: `Creating new internal task ticket assigned to ${emp.name}.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Job Position, Hierarchy & Team Workforce
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            View departmental employees across Sales, Presales, HR, and Engineering. Connect
            directly via Chat, Ticket, or Email.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700">
            {EMPLOYEES.length} Active Employees
          </span>
        </div>
      </div>

      {/* Primary Key Executive Role Summary Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-slate-400 uppercase">
                Your Designated Role
              </p>
              <p className="truncate text-xs font-extrabold text-slate-900 sm:text-sm">
                Lead Enterprise Architect
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-slate-400 uppercase">
                Your Department
              </p>
              <p className="truncate text-xs font-extrabold text-slate-900 sm:text-sm">
                Development & Engineering
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-2xs sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Users2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-slate-400 uppercase">
                Hierarchy Supervision
              </p>
              <p className="truncate text-xs font-extrabold text-slate-900 sm:text-sm">
                12 Engineers & Leads
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Department Filter Pills */}
          <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1">
            {deptCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveDeptFilter(cat.id)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeDeptFilter === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative flex min-w-55 items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, email..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pr-4 pl-10 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Employee Workforce Directory Cards Grid across sm, md, lg, xl, 2xl */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredEmployees.map((emp) => {
          const avatar = getDefaultAvatar("user", emp.department, emp.name);
          return (
            <div
              key={emp.id}
              className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-sm"
            >
              {/* Employee Meta Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${avatar.bgClass} border border-slate-200 shadow-2xs`}
                    >
                      <Image
                        src={avatar.imageUrl}
                        alt={emp.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3
                        onClick={() => setSelectedEmployee(emp)}
                        className="cursor-pointer truncate text-sm font-extrabold text-slate-900 transition-colors hover:text-indigo-600"
                      >
                        {emp.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs font-semibold text-slate-500">
                        {emp.title}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${emp.badgeBg} shrink-0`}
                  >
                    {emp.departmentLabel}
                  </span>
                </div>

                <div className="space-y-1 pt-1 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                    <span>{emp.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar: Chat, Ticket, Mail */}
              <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => handleOpenChat(emp)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-2 py-2 text-xs font-bold text-indigo-700 shadow-2xs transition-all hover:bg-indigo-600 hover:text-white"
                  title="Open live chat channel"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCreateTicket(emp)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/80 px-2 py-2 text-xs font-bold text-purple-700 shadow-2xs transition-all hover:bg-purple-600 hover:text-white"
                  title="Create or assign support ticket"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  <span>Ticket</span>
                </button>

                <a
                  href={`mailto:${emp.email}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-200"
                  title="Send direct email"
                >
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  <span>Mail</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="space-y-2 py-12 text-center text-slate-500">
          <Users2 className="mx-auto h-8 w-8 text-slate-300" />
          <p className="text-sm font-bold text-slate-800">No employees found</p>
          <p className="text-xs text-slate-400">
            Try adjusting your department filter or search terms.
          </p>
        </div>
      )}

      {/* Employee Quick Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="animate-in zoom-in-95 relative w-full max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl duration-150">
            <button
              onClick={() => setSelectedEmployee(null)}
              className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-indigo-50">
                <Image
                  src={
                    getDefaultAvatar("user", selectedEmployee.department, selectedEmployee.name)
                      .imageUrl
                  }
                  alt={selectedEmployee.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{selectedEmployee.name}</h3>
                <p className="text-xs font-bold text-indigo-600">{selectedEmployee.title}</p>
                <span
                  className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-extrabold ${selectedEmployee.badgeBg}`}
                >
                  {selectedEmployee.departmentLabel} Department
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-b border-slate-100 py-3 text-xs text-slate-600">
              <p>
                <strong>Employee ID:</strong> {selectedEmployee.id}
              </p>
              <p>
                <strong>Email Address:</strong> {selectedEmployee.email}
              </p>
              <p>
                <strong>Direct Phone:</strong> {selectedEmployee.phone}
              </p>
              <p>
                <strong>Workstation:</strong> {selectedEmployee.location}
              </p>
              <p>
                <strong>Active Sprint Deliverables:</strong> {selectedEmployee.projectsCount}{" "}
                projects
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleOpenChat(selectedEmployee);
                  setSelectedEmployee(null);
                }}
                className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20"
              >
                Initiate Chat
              </button>
              <button
                onClick={() => {
                  handleCreateTicket(selectedEmployee);
                  setSelectedEmployee(null);
                }}
                className="flex-1 rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/20"
              >
                Assign Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
