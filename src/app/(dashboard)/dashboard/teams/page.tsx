"use client";

import React, { useState } from "react";
import TeamCard, { TeamMember } from "@/components/teams/TeamCard";
import CommunicationDrawer from "@/components/teams/CommunicationDrawer";
import { Users, Search, Filter } from "lucide-react";

export default function TeamDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "email">("chat");

  const departments = [
    "All Departments",
    "Executive & Engineering",
    "Engineering",
    "Cloud Operations",
    "Sales & Marketing",
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Akash SM",
      role: "Founder & Lead Full-Stack Architect",
      department: "Executive & Engineering",
      email: "akash@webxode.com",
      status: "Active on Task",
      avatarBg: "bg-indigo-600 text-white",
    },
    {
      id: "2",
      name: "Priya Sharma",
      role: "Senior Frontend Developer & UI/UX Specialist",
      department: "Engineering",
      email: "priya.s@webxode.com",
      status: "Active on Task",
      avatarBg: "bg-blue-600 text-white",
    },
    {
      id: "3",
      name: "Rahul Verma",
      role: "DevOps & Cloud Infrastructure Engineer",
      department: "Cloud Operations",
      email: "rahul.v@webxode.com",
      status: "Remote / Standby",
      avatarBg: "bg-emerald-600 text-white",
    },
    {
      id: "4",
      name: "Ananya Iyer",
      role: "Digital Marketing & Meta Ads Strategist",
      department: "Sales & Marketing",
      email: "ananya.i@webxode.com",
      status: "In a Meeting",
      avatarBg: "bg-amber-600 text-white",
    },
    {
      id: "5",
      name: "Karthik Raja",
      role: "Backend & Database Administrator",
      department: "Engineering",
      email: "karthik.r@webxode.com",
      status: "Active on Task",
      avatarBg: "bg-purple-600 text-white",
    },
  ];

  const filteredMembers = teamMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept =
      selectedDepartment === "All Departments" || m.department === selectedDepartment;

    return matchesSearch && matchesDept;
  });

  const handleSelectMember = (member: TeamMember, mode: "chat" | "email") => {
    setSelectedMember(member);
    setActiveTab(mode);
  };

  const activeCount = teamMembers.filter((m) => m.status === "Active on Task").length;
  const meetingCount = teamMembers.filter((m) => m.status === "In a Meeting").length;
  const standbyCount = teamMembers.filter((m) => m.status === "Remote / Standby").length;

  return (
    <div className="flex flex-col gap-6">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs">
        {/* Title + Controls */}
        <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/25">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900">
                Company Team Directory
              </h1>
              <p className="mt-0.5 text-xs text-slate-500">
                Manage personnel, track availability &amp; dispatch communications
              </p>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-9 pl-4 text-xs font-medium text-slate-700 transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 focus:outline-none sm:w-auto"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute top-3 right-3 h-3.5 w-3.5 text-slate-400" />
            </div>

            <div className="relative sm:w-64">
              <Search className="absolute top-3 left-3.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, role, or department…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-xs text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/15 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Stat Pills */}
        <div className="flex flex-wrap gap-3 px-6 py-3.5">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2">
            <Users className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-700">{teamMembers.length}</span>
            <span className="text-xs text-slate-400">Members</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-700">{activeCount}</span>
            <span className="text-xs text-emerald-600">Active on Task</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold text-amber-700">{meetingCount}</span>
            <span className="text-xs text-amber-600">In a Meeting</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="text-xs font-semibold text-blue-700">{standbyCount}</span>
            <span className="text-xs text-blue-600">Remote / Standby</span>
          </div>
        </div>
      </div>

      {/* ── Content Grid ─────────────────────────────────────── */}
      <div
        className={`grid gap-5 ${selectedMember ? "grid-cols-1 lg:grid-cols-[1fr_360px]" : "grid-cols-1"}`}
      >
        {/* Team Cards */}
        <div>
          {filteredMembers.length > 0 ? (
            <div
              className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
                selectedMember ? "lg:grid-cols-2" : "lg:grid-cols-3"
              }`}
            >
              {filteredMembers.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  onSelect={handleSelectMember}
                  isSelected={selectedMember?.id === member.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Users className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-slate-800">No team members found</h3>
              <p className="max-w-xs text-xs text-slate-500">
                Try adjusting your search query or selecting a different department filter.
              </p>
            </div>
          )}
        </div>

        {/* Communication Panel */}
        {selectedMember && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <CommunicationDrawer
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
              initialTab={activeTab}
            />
          </div>
        )}
      </div>
    </div>
  );
}
