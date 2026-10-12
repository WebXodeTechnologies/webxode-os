"use client";

import React, { useState } from "react";
import {
  Users,
  Mail,
  ShieldCheck,
  Code,
  Palette,
  Cloud,
  Plus,
  Trash2,
  Terminal,
  Sparkles,
  CheckCircle2,
  X,
  UserCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ProjectItem, ProjectTeamMember } from "@/modules/projects/project.types";
import { addProjectTeamMember, deleteProjectTeamMember } from "@/server/actions/projects.actions";

interface ProjectTeamRosterTabProps {
  project: ProjectItem;
  onUpdateProject?: (updated: ProjectItem) => void;
}

const AVAILABLE_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Tech Lead",
  "UI/UX Designer",
  "Cloud & DevOps Architect",
  "DevSecOps Engineer",
  "QA Automation Engineer",
  "Product Manager",
  "Mobile Developer",
];

export function ProjectTeamRosterTab({ project, onUpdateProject }: ProjectTeamRosterTabProps) {
  const projectId = project.id || project._id || project.projectCode;
  const [members, setMembers] = useState<ProjectTeamMember[]>(project.teamMembers || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("All");

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [email, setEmail] = useState("");
  const [allocationPercent, setAllocationPercent] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRoleIcon = (roleName: string) => {
    if (roleName.includes("Design") || roleName.includes("UI")) return Palette;
    if (roleName.includes("Cloud") || roleName.includes("DevOps")) return Cloud;
    if (roleName.includes("Security") || roleName.includes("DevSecOps")) return ShieldCheck;
    if (roleName.includes("Lead") || roleName.includes("Manager")) return UserCheck;
    return Code;
  };

  const getRoleBadgeStyle = (roleName: string) => {
    if (roleName.includes("Design") || roleName.includes("UI"))
      return "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200";
    if (roleName.includes("Cloud") || roleName.includes("DevOps"))
      return "bg-sky-50 text-sky-700 border-sky-200";
    if (roleName.includes("Security") || roleName.includes("DevSecOps"))
      return "bg-rose-50 text-rose-700 border-rose-200";
    if (roleName.includes("Lead") || roleName.includes("Manager"))
      return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-indigo-50 text-indigo-700 border-indigo-200";
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Engineer or designer name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const newMember: ProjectTeamMember = {
        id: `tm_${Date.now()}`,
        name: name.trim(),
        role,
        email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, ".")}@webxode.com`,
        allocationPercent: Number(allocationPercent) || 100,
      };

      const res = await addProjectTeamMember(projectId, newMember);
      if (res.success) {
        setMembers((prev) => [...prev, newMember]);
        if (onUpdateProject && res.project) {
          onUpdateProject(res.project);
        }
        toast.success(`${newMember.name} (${newMember.role}) allocated to project!`);
        setIsAddModalOpen(false);
        setName("");
        setEmail("");
        setAllocationPercent(100);
      } else {
        toast.error(res.error || "Failed to allocate team member");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to allocate engineer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove ${memberName} from this project roster?`)) {
      return;
    }

    try {
      const res = await deleteProjectTeamMember(projectId, memberId);
      if (res.success) {
        setMembers((prev) => prev.filter((m) => m.id !== memberId && m.name !== memberId));
        if (onUpdateProject && res.project) {
          onUpdateProject(res.project);
        }
        toast.success(`Removed ${memberName} from project roster`);
      } else {
        toast.error(res.error || "Failed to remove member");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to remove member");
    }
  };

  const filteredMembers = members.filter((m) => {
    if (filterRole === "All") return true;
    if (filterRole === "Developers")
      return (
        m.role.includes("Developer") ||
        m.role.includes("Frontend") ||
        m.role.includes("Backend") ||
        m.role.includes("Fullstack")
      );
    if (filterRole === "Designers") return m.role.includes("Design") || m.role.includes("UI");
    if (filterRole === "Cloud/DevOps")
      return m.role.includes("Cloud") || m.role.includes("DevOps") || m.role.includes("Security");
    if (filterRole === "Leads") return m.role.includes("Lead") || m.role.includes("Manager");
    return true;
  });

  return (
    <div className="space-y-6 rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      {/* Header bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black tracking-wider text-indigo-600 uppercase">
              Workforce Allocation Matrix
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
              {members.length} Assigned
            </span>
          </div>
          <h3 className="mt-1 text-xl font-black text-slate-900">Engineering & Design Roster</h3>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            Manage assigned Frontend/Backend developers, Tech Leads, Cloud/DevOps architects, and
            optional UI/UX designers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Allocate Engineer / Designer</span>
          </button>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["All", "Developers", "Designers", "Cloud/DevOps", "Leads"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilterRole(f)}
            className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              filterRole === f
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Member Cards Grid */}
      {filteredMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100/70 text-indigo-600 shadow-inner">
            <Users className="h-7 w-7" />
          </div>
          <h4 className="text-sm font-black text-slate-900">No Personnel Found</h4>
          <p className="mt-1 mb-5 max-w-md text-xs font-medium text-slate-500">
            No developers or designers have been allocated under this view yet. Add your frontend
            developers, backend engineers, or optional UI/UX designers to staff this delivery.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Allocate First Engineer</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member, idx) => {
            const Icon = getRoleIcon(member.role);
            const badgeStyle = getRoleBadgeStyle(member.role);
            const uniqueKey = member.id
              ? `${member.id}_${idx}`
              : `tm_${member.name}_${member.role}_${idx}`;
            const memberId = member.id || member.name;

            return (
              <div
                key={uniqueKey}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white shadow-xs">
                        {member.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h4 className="text-sm leading-tight font-black text-slate-900">
                          {member.name}
                        </h4>
                        <div
                          className={`mt-1 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-bold ${badgeStyle}`}
                        >
                          <Icon className="h-3 w-3" />
                          <span>{member.role}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMember(memberId, member.name)}
                      className="cursor-pointer rounded-lg p-1.5 text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-600"
                      title="Remove from roster"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {member.email && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Mail className="h-3 w-3 text-slate-400" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-semibold text-slate-500">Active</span>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-700">
                    {member.allocationPercent || 100}% Allocation
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs">
          <div className="animate-in fade-in zoom-in-95 w-full max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black tracking-wider text-indigo-600 uppercase">
                  Staffing & Engineering Allocation
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Allocate Engineer or Designer
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Assigned Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-indigo-600 focus:outline-hidden"
                >
                  {AVAILABLE_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r} {r === "UI/UX Designer" ? "(Optional)" : ""}
                    </option>
                  ))}
                </select>
                {role === "UI/UX Designer" && (
                  <p className="mt-1 text-[11px] font-semibold text-fuchsia-600">
                    ℹ️ UI/UX Designer is optional — developers can lead with Webxode UI kit.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Company Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vikram@webxode.com"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-hidden"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Allocation Percentage: {allocationPercent}%
                  </label>
                  <span className="text-[10px] font-bold text-slate-400">
                    {allocationPercent === 100 ? "Full-time (100%)" : `${allocationPercent}% time`}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="10"
                  value={allocationPercent}
                  onChange={(e) => setAllocationPercent(Number(e.target.value))}
                  className="w-full cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Allocating..." : "Allocate to Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
