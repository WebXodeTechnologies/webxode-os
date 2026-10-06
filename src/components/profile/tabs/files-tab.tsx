// src/components/profile/tabs/files-tab.tsx
"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Upload,
  Search,
  FileCode,
  FileSpreadsheet,
  Image as ImageIcon,
  Share2,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

export function FilesTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const files = [
    {
      name: "SOW_Standard_Template_2026.pdf",
      size: "2.4 MB",
      date: "Oct 02, 2026",
      type: "pdf",
      category: "Legal & SOW",
    },
    {
      name: "WebXode_Brand_Guidelines_v3.pdf",
      size: "14.8 MB",
      date: "Sep 28, 2026",
      type: "pdf",
      category: "Design",
    },
    {
      name: "Q3_Financial_Audit_Report.xlsx",
      size: "1.1 MB",
      date: "Aug 15, 2026",
      type: "sheet",
      category: "Finance",
    },
    {
      name: "System_Architecture_Diagram.png",
      size: "4.5 MB",
      date: "Jul 10, 2026",
      type: "image",
      category: "Engineering",
    },
    {
      name: "Deployment_Security_Keys.enc",
      size: "420 KB",
      date: "Jun 04, 2026",
      type: "code",
      category: "DevOps",
    },
  ];

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case "sheet":
        return <FileSpreadsheet className="h-5 w-5 text-emerald-600" />;
      case "image":
        return <ImageIcon className="h-5 w-5 text-purple-600" />;
      case "code":
        return <FileCode className="h-5 w-5 text-cyan-600" />;
      default:
        return <FileText className="h-5 w-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Documents & Corporate Attachments</h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Secure cloud repository files, signed proposals, and architectural diagrams.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.info("Upload File", { description: "Select document from computer." })
          }
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 sm:text-sm"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by file name or category..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pr-4 pl-10 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none sm:text-sm"
        />
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredFiles.map((file, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all hover:border-indigo-200 hover:shadow-xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100">
                  {getFileIcon(file.type)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                    {file.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] font-medium text-slate-400">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                {file.category}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() =>
                  toast.info("File Preview", { description: `Previewing ${file.name}` })
                }
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-600"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toast.success("Share Link Copied", { description: file.name })}
                  className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
                  title="Share Link"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toast.success("Downloading File", { description: file.name })}
                  className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
