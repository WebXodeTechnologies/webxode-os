"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Plus,
  Search,
  CheckSquare,
  ArrowRight,
  Globe,
  Smartphone,
  Megaphone,
  PhoneCall,
  Laptop,
  Cloud,
  Bot,
  Calendar,
  IndianRupee,
  MoreVertical,
  X,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientProjectsTabProps {
  lead?: any;
  onNavigateToTasks?: (projectId?: string) => void;
}

export function ClientProjectsTab({ lead, onNavigateToTasks }: ClientProjectsTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";
  const clientName = lead?.contactPerson || "Emily Smith";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: "PRJ-901",
      name: "Enterprise ERP & Supply Chain Web Platform",
      serviceCategory: "Web Dev",
      status: "In Progress",
      budget: 450000,
      tasksCount: 12,
      pendingTasks: 5,
      deliveryDate: "15 Nov 2026",
      leadOwner: "Akash S M",
      icon: Globe,
    },
    {
      id: "PRJ-902",
      name: "iOS & Android Farmer Mobile Application",
      serviceCategory: "Mobile App",
      status: "Planning",
      budget: 320000,
      tasksCount: 8,
      pendingTasks: 6,
      deliveryDate: "30 Dec 2026",
      leadOwner: "Priya R",
      icon: Smartphone,
    },
    {
      id: "PRJ-903",
      name: "Q4 Digital Marketing & SEO Lead Campaign",
      serviceCategory: "Digital Marketing",
      status: "Active",
      budget: 120000,
      tasksCount: 5,
      pendingTasks: 2,
      deliveryDate: "31 Oct 2026",
      leadOwner: "Vikram Mehta",
      icon: Megaphone,
    },
    {
      id: "PRJ-904",
      name: "Executive Architecture & Tech Consulting Call Series",
      serviceCategory: "Consulting Call",
      status: "Completed",
      budget: 90000,
      tasksCount: 4,
      pendingTasks: 0,
      deliveryDate: "05 Oct 2026",
      leadOwner: "Akash S M",
      icon: PhoneCall,
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    serviceCategory: "Web Dev",
    budget: "250000",
    deliveryDate: "2026-12-01",
  });

  const categories = ["All", "Web Dev", "Mobile App", "Digital Marketing", "Consulting Call"];

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    let IconComp = Globe;
    if (newProject.serviceCategory === "Mobile App") IconComp = Smartphone;
    if (newProject.serviceCategory === "Digital Marketing") IconComp = Megaphone;
    if (newProject.serviceCategory === "Consulting Call") IconComp = PhoneCall;

    const added = {
      id: `PRJ-${Math.floor(905 + Math.random() * 90)}`,
      name: newProject.name,
      serviceCategory: newProject.serviceCategory,
      status: "Planning",
      budget: parseFloat(newProject.budget) || 200000,
      tasksCount: 4,
      pendingTasks: 4,
      deliveryDate: newProject.deliveryDate,
      leadOwner: "You",
      icon: IconComp,
    };

    setProjects((prev) => [added, ...prev]);
    setShowAddProjectModal(false);
    setNewProject({
      name: "",
      serviceCategory: "Web Dev",
      budget: "250000",
      deliveryDate: "2026-12-01",
    });
    toast.success("Project Added", {
      description: `New ${added.serviceCategory} project created for ${companyName}.`,
    });
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.serviceCategory === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.serviceCategory.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header Bar */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-2xs">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Client Projects & Services</h2>
              <p className="text-xs font-semibold text-slate-500">
                Active development, marketing & consulting deliverables for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddProjectModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-98"
          >
            <Plus className="h-4 w-4" /> Add New Project
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex scrollbar-none gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-56">
            <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name..."
              className="w-full rounded-xl border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-semibold outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>

      {/* Projects Table View */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/90 bg-slate-50/80 text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3.5">Project & Code</th>
                <th className="px-6 py-3.5">Client & Company</th>
                <th className="px-6 py-3.5">Service Type</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Budget (₹)</th>
                <th className="px-6 py-3.5">Tasks</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredProjects.map((p) => {
                const IconComp = p.icon;
                return (
                  <motion.tr
                    key={p.id}
                    whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
                    transition={{ duration: 0.15 }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-indigo-600">
                          <IconComp className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900">{p.name}</div>
                          <div className="font-mono text-[10px] text-slate-400">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-slate-900">{clientName}</div>
                      <div className="text-[11px] text-slate-500">{companyName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-extrabold text-indigo-700">
                        {p.serviceCategory}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                          p.status === "In Progress"
                            ? "border border-amber-200 bg-amber-50 text-amber-700"
                            : p.status === "Active"
                              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                              : p.status === "Completed"
                                ? "border border-blue-200 bg-blue-50 text-blue-700"
                                : "border border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">
                      ₹{p.budget.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => onNavigateToTasks?.(p.id)}
                        className="group flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-2.5 py-1 text-[11px] font-extrabold text-indigo-700 transition-all hover:bg-indigo-600 hover:text-white"
                        title="Click to view all tasks for this project"
                      >
                        <CheckSquare className="h-3.5 w-3.5" />
                        <span>{p.pendingTasks} Pending</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onNavigateToTasks?.(p.id)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-100"
                      >
                        View Tasks →
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Add New Client Project</h3>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddProjectSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom Mobile App & Cloud API"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Service Category</label>
                  <select
                    value={newProject.serviceCategory}
                    onChange={(e) =>
                      setNewProject({ ...newProject, serviceCategory: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Consulting Call">Consulting Call</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Cloud DevOps">Cloud DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Budget (INR ₹)</label>
                  <input
                    type="number"
                    placeholder="250000"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Target Delivery Date</label>
                <input
                  type="date"
                  value={newProject.deliveryDate}
                  onChange={(e) => setNewProject({ ...newProject, deliveryDate: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
