"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Layers,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Palette,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ProjectDesignSpec } from "@/modules/projects/project.types";
import { addProjectDesignSpec, deleteProjectDesignSpec } from "@/server/actions/projects.actions";

interface ProjectFigmaTabProps {
  initialSpecs?: ProjectDesignSpec[];
  projectId: string;
  projectCode: string;
}

export function ProjectFigmaTab({
  initialSpecs = [],
  projectId,
  projectCode,
}: ProjectFigmaTabProps) {
  const [specs, setSpecs] = useState<ProjectDesignSpec[]>(initialSpecs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [prototypeUrl, setPrototypeUrl] = useState("");
  const [screenCount, setScreenCount] = useState(24);
  const [designerName, setDesignerName] = useState("");
  const [status, setStatus] = useState("UI Kit Ready");
  const [notes, setNotes] = useState("");

  const handleAddSpec = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !figmaUrl.trim()) {
      toast.error("Please provide both title and Figma URL.");
      return;
    }

    const newSpec: ProjectDesignSpec = {
      id: `ds_${Date.now()}`,
      title: title.trim(),
      figmaUrl: figmaUrl.trim(),
      prototypeUrl: prototypeUrl.trim() || undefined,
      screenCount: Number(screenCount),
      designerName: designerName.trim() || "Lead Designer",
      status,
      updatedAt: new Date().toISOString().split("T")[0],
      notes: notes.trim() || undefined,
    };

    setSpecs((prev) => [newSpec, ...prev]);
    setIsAddModalOpen(false);
    setTitle("");
    setFigmaUrl("");
    setPrototypeUrl("");
    setNotes("");
    toast.success("Figma design specification linked to project!");

    try {
      await addProjectDesignSpec(projectId, newSpec);
    } catch {
      // optimistic state retained
    }
  };

  const handleDeleteSpec = async (specId: string, specTitle: string) => {
    if (!confirm(`Remove Figma specification "${specTitle}"?`)) return;
    setSpecs((prev) => prev.filter((s) => s.id !== specId));
    toast.success("Design spec removed.");

    try {
      await deleteProjectDesignSpec(projectId, specId);
    } catch {
      // optimistic state retained
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "Client Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Design QA":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Prototype Review":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-black tracking-wider text-cyan-800 uppercase">
              UI/UX & Figma Workspace
            </span>
            <span className="text-xs font-bold text-slate-400">• {projectCode}</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Figma Design System & Interactive Prototypes
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Directly open live Figma boards, inspect screen artboards, and test interactive
            prototypes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>+ Add Figma File</span>
        </button>
      </div>

      {/* Design Specs Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specs.map((spec) => (
          <div
            key={spec.id}
            className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs transition-all hover:border-slate-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  {projectCode}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black ${getStatusBadge(
                    spec.status
                  )}`}
                >
                  {spec.status}
                </span>
              </div>

              <h3 className="mt-3 text-base leading-snug font-black text-slate-900">
                {spec.title}
              </h3>

              {spec.notes && (
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{spec.notes}</p>
              )}

              <div className="mt-4 flex items-center gap-3 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-slate-400" />
                  <span>
                    <strong className="text-slate-800">{spec.screenCount}</strong> Screens
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{spec.updatedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                  {spec.designerName?.charAt(0) || "D"}
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {spec.designerName || "Designer"}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDeleteSpec(spec.id, spec.title)}
                  className="cursor-pointer p-1.5 text-slate-400 transition-colors hover:text-rose-600"
                  title="Remove spec"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                {spec.prototypeUrl && (
                  <a
                    href={spec.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Prototype</span>
                  </a>
                )}

                {spec.figmaUrl && (
                  <a
                    href={spec.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-600"
                  >
                    <span>Open in Figma</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {specs.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 p-12 text-center">
            <Palette className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-2 text-sm font-bold text-slate-700">
              No Figma files linked to this project yet
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Click &quot;+ Add Figma File&quot; above to paste your Figma file URL and screen
              specifications.
            </p>
          </div>
        )}
      </div>

      {/* Add Figma Spec Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Link Figma Design Specification
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSpec} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Specification Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Core App UI Kit & Design System Tokens"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Figma File URL (External Link) *
                </label>
                <input
                  type="url"
                  required
                  value={figmaUrl}
                  onChange={(e) => setFigmaUrl(e.target.value)}
                  placeholder="https://www.figma.com/design/..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Interactive Prototype URL (Optional)
                </label>
                <input
                  type="url"
                  value={prototypeUrl}
                  onChange={(e) => setPrototypeUrl(e.target.value)}
                  placeholder="https://www.figma.com/proto/..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Screen Artboards</label>
                  <input
                    type="number"
                    value={screenCount}
                    onChange={(e) => setScreenCount(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Design Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Wireframes">Wireframes</option>
                    <option value="UI Kit Ready">UI Kit Ready</option>
                    <option value="Prototype Review">Prototype Review</option>
                    <option value="Design QA">Design QA</option>
                    <option value="Client Approved">Client Approved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Assigned Designer (Optional)
                </label>
                <input
                  type="text"
                  value={designerName}
                  onChange={(e) => setDesignerName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Design Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Design specs, color token updates, or review requirements..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  Save Specification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
