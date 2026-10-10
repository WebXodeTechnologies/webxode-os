"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Folder,
  FileText,
  Upload,
  Download,
  Search,
  Plus,
  FileCode,
  FileSpreadsheet,
  X,
  Trash2,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientFilesTabProps {
  lead?: any;
}

export function ClientFilesTab({ lead }: ClientFilesTabProps) {
  const companyName = lead?.companyName || "Annai Agro Tradings";

  const [files, setFiles] = useState([
    {
      id: "f1",
      name: "Client_Discovery_Notes_Meeting.docx",
      category: "Notes",
      size: "2.4 MB",
      addedBy: "Akash S M",
      date: "04 Oct 2026",
      type: "DOCX",
    },
    {
      id: "f2",
      name: "Project_SOW_Final_Signed_Copy.pdf",
      category: "SOW",
      size: "4.8 MB",
      addedBy: "Legal Team",
      date: "02 Oct 2026",
      type: "PDF",
    },
    {
      id: "f3",
      name: "Master_Service_Agreement_Signed.pdf",
      category: "Agreements",
      size: "3.1 MB",
      addedBy: "Emily Smith",
      date: "06 Oct 2026",
      type: "PDF",
    },
    {
      id: "f4",
      name: "ERP_UI_UX_Wireframes_Figma.pdf",
      category: "Design",
      size: "12.5 MB",
      addedBy: "Priya R",
      date: "28 Sep 2026",
      type: "PDF",
    },
  ]);

  const [filterCat, setFilterCat] = useState("All");
  const [search, setSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFile, setNewFile] = useState({ name: "", category: "SOW" });

  const handleDownload = (filename: string) => {
    toast.success("Downloading File", {
      description: `Downloading ${filename}...`,
    });
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.info("File Removed from Workspace");
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFile.name.trim()) return;

    const added = {
      id: `f_${Date.now()}`,
      name: newFile.name,
      category: newFile.category,
      size: "1.8 MB",
      addedBy: "You",
      date: "Today",
      type: newFile.name.endsWith(".pdf") ? "PDF" : "DOCX",
    };

    setFiles((prev) => [added, ...prev]);
    setShowUploadModal(false);
    setNewFile({ name: "", category: "SOW" });
    toast.success("File Uploaded", {
      description: `${added.name} uploaded to client repository.`,
    });
  };

  const filteredFiles = files.filter((f) => {
    const matchesCat = filterCat === "All" || f.category === filterCat;
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-2xs">
              <Folder className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Client Documents & Files</h2>
              <p className="text-xs font-semibold text-slate-500">
                Meeting notes, SOW documents & signed agreements for{" "}
                <span className="font-extrabold text-indigo-600">{companyName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Upload className="h-4 w-4" /> Upload Document
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-4">
          <div className="flex scrollbar-none overflow-x-auto gap-2">
            {["All", "SOW", "Agreements", "Notes", "Design"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCat(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  filterCat === cat
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
              placeholder="Search files..."
              className="w-full rounded-xl border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-semibold outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Files Grid / List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {filteredFiles.map((f) => (
          <div
            key={f.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition hover:border-indigo-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 font-extrabold text-indigo-700 text-xs">
                {f.type}
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-extrabold text-slate-900">{f.name}</div>
                <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                  <span>{f.size}</span>
                  <span>•</span>
                  <span>{f.addedBy}</span>
                  <span>•</span>
                  <span>{f.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleDownload(f.name)}
                className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100 transition"
                title="Download file"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteFile(f.id)}
                className="rounded-xl p-2 text-slate-400 hover:text-rose-600 transition"
                title="Delete file"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Upload Client Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master_SLA_Contract_v2.pdf"
                  value={newFile.name}
                  onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={newFile.category}
                  onChange={(e) => setNewFile({ ...newFile, category: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                >
                  <option value="SOW">SOW</option>
                  <option value="Agreements">Agreements</option>
                  <option value="Notes">Notes</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
