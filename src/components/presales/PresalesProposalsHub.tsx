"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Search,
  Building,
  User,
  ExternalLink,
  Plus,
  Eye,
  Calendar,
  AlertCircle,
  Clock,
  ArrowRight,
  FolderOpen,
  FileCode,
  FileSpreadsheet,
  Check,
  Globe,
  Smartphone,
  Cloud,
} from "lucide-react";
import { PresalesItem, PresalesDocument, PresalesDocType } from "@/modules/presales/presales.types";
import {
  uploadClientDocument,
  deleteClientDocument,
  convertPresalesToDevPhase,
} from "@/server/actions/presales.actions";

interface PresalesProposalsHubProps {
  initialItems: PresalesItem[];
}

const DOCUMENT_TYPES: PresalesDocType[] = [
  "SOW",
  "Checklist",
  "PRD",
  "BRD",
  "Architecture",
  "Quotation",
  "Contract",
  "Proposal",
];

const docTypeBadgeColors: Record<PresalesDocType, string> = {
  SOW: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Checklist: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PRD: "bg-purple-50 text-purple-700 border-purple-200",
  BRD: "bg-blue-50 text-blue-700 border-blue-200",
  Architecture: "bg-amber-50 text-amber-700 border-amber-200",
  Quotation: "bg-teal-50 text-teal-700 border-teal-200",
  Contract: "bg-rose-50 text-rose-700 border-rose-200",
  Proposal: "bg-violet-50 text-violet-700 border-violet-200",
  SRS: "bg-slate-100 text-slate-700 border-slate-200",
};

export function PresalesProposalsHub({ initialItems }: PresalesProposalsHubProps) {
  const [items, setItems] = useState<PresalesItem[]>(initialItems);
  const [selectedClientId, setSelectedClientId] = useState<string>(
    initialItems.length > 0 ? initialItems[0].id || initialItems[0]._id! : ""
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Upload Form state
  const [uploadDocType, setUploadDocType] = useState<PresalesDocType>("SOW");
  const [docTitle, setDocTitle] = useState("");
  const [docVersion, setDocVersion] = useState("v1.0");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Active selected client
  const activeClient =
    items.find((i) => i.id === selectedClientId || i._id === selectedClientId) || items[0];

  // Filter clients for selector
  const filteredClients = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      item.clientName.toLowerCase().includes(q) ||
      item.serviceCategory?.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q)
    );
  });

  // Handle file selection from PC
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  // Upload Document From PC
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeClient) return;
    if (!selectedFile && !docTitle) {
      toast.error("Please select a file from your PC or enter document title.");
      return;
    }

    setIsUploading(true);

    const fileSizeStr = selectedFile
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      : "1.2 MB";

    const newDoc: PresalesDocument = {
      id: `doc-${Date.now()}`,
      title:
        docTitle.trim() ||
        selectedFile?.name ||
        `${uploadDocType}_Document_${activeClient.clientName}`,
      type: uploadDocType,
      version: docVersion || "v1.0",
      updatedAt: new Date().toISOString().split("T")[0],
      size: fileSizeStr,
      status: "Review",
      uploadedFromPc: true,
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
    };

    const targetId = activeClient.id || activeClient._id!;

    // Optimistically update
    setItems(
      items.map((i) => {
        if (i.id === targetId || i._id === targetId) {
          return {
            ...i,
            documents: [newDoc, ...(i.documents || [])],
          };
        }
        return i;
      })
    );

    toast.success(`Uploaded ${newDoc.title} from PC for ${activeClient.clientName}!`);

    // Reset upload form
    setSelectedFile(null);
    setDocTitle("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsUploading(false);

    try {
      await uploadClientDocument(targetId, newDoc);
    } catch {
      // optimistic state retained
    }
  };

  // Delete Document
  const handleDeleteDoc = async (docId: string, docTitle: string) => {
    if (!activeClient) return;
    const targetId = activeClient.id || activeClient._id!;

    setItems(
      items.map((i) => {
        if (i.id === targetId || i._id === targetId) {
          return {
            ...i,
            documents: (i.documents || []).filter((d) => d.id !== docId),
          };
        }
        return i;
      })
    );

    toast.success(`Removed ${docTitle}`);

    try {
      await deleteClientDocument(targetId, docId);
    } catch {
      // optimistic retained
    }
  };

  // Handoff to Development Phase
  const handleConvertToDev = async () => {
    if (!activeClient) return;
    const targetId = activeClient.id || activeClient._id!;

    setItems(
      items.map((i) =>
        i.id === targetId || i._id === targetId
          ? {
              ...i,
              stage: "Approved",
              devPhaseConverted: true,
              convertedToDevAt: new Date().toISOString(),
            }
          : i
      )
    );

    toast.success(
      `🎉 ${activeClient.clientName} SOW & Documents confirmed! Transmitted to Project Delivery & Engineering boards!`
    );

    try {
      await convertPresalesToDevPhase(targetId);
    } catch {
      // optimistic retained
    }
  };

  // Pre-generate standard SOW document
  const handleGenerateTemplate = (type: PresalesDocType) => {
    if (!activeClient) return;
    const targetId = activeClient.id || activeClient._id!;

    const generatedDoc: PresalesDocument = {
      id: `doc-${Date.now()}`,
      title: `${type}_${activeClient.clientName.replace(/\s+/g, "_")}_Template.pdf`,
      type,
      version: "v1.0",
      updatedAt: new Date().toISOString().split("T")[0],
      size: "2.5 MB",
      status: "Draft",
      uploadedFromPc: false,
    };

    setItems(
      items.map((i) => {
        if (i.id === targetId || i._id === targetId) {
          return {
            ...i,
            documents: [generatedDoc, ...(i.documents || [])],
          };
        }
        return i;
      })
    );

    toast.success(`Standard ${type} draft document created for ${activeClient.clientName}!`);

    uploadClientDocument(targetId, generatedDoc).catch(() => {});
  };

  // Metrics
  const totalDocsCount = items.reduce((acc, curr) => acc + (curr.documents?.length || 0), 0);
  const clientsWithSow = items.filter((i) => i.documents?.some((d) => d.type === "SOW")).length;

  return (
    <div className="space-y-8 pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-indigo-200/70 bg-linear-to-r from-indigo-50/80 via-white to-blue-50/40 p-8 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-indigo-300 bg-indigo-100 px-3 py-1 text-[10px] font-black tracking-wider text-indigo-900 uppercase">
                Phase 3 • Documentation Hub
              </span>
              <span className="text-xs font-bold text-slate-400">• Webxode OS</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Proposals, SOW & Client Document Management
            </h1>
            <p className="max-w-2xl text-xs leading-relaxed font-medium text-slate-600">
              Following estimation approval, manage formal Statements of Work (SOW), pre-development
              checklists, PRDs, BRDs, and architectural contracts. Upload final signed files
              directly from your PC and track documentation progress for each client separately.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={"/dashboard/presales/estimates" as any}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50"
            >
              <span>View Approved Estimates</span>
            </Link>

            <Link
              href={"/dashboard/presales" as any}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700"
            >
              <span>Presales Overview Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase">
              Total Client Documents
            </span>
            <p className="mt-1 text-3xl font-black text-slate-900">{totalDocsCount}</p>
            <p className="text-[11px] text-slate-500">SOW, PRD, BRD, and Checklists archived</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FolderOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-3xl border border-emerald-200/80 bg-emerald-50/30 p-6 shadow-xs">
          <div>
            <span className="text-[10px] font-black text-emerald-800 uppercase">
              SOW Documents Ready
            </span>
            <p className="mt-1 text-3xl font-black text-emerald-950">
              {clientsWithSow} of {items.length}
            </p>
            <p className="text-[11px] font-bold text-emerald-700">
              Clients with prepared or executed SOW
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <FileCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-3xl border border-purple-200/80 bg-purple-50/30 p-6 shadow-xs">
          <div>
            <span className="text-[10px] font-black text-purple-800 uppercase">
              Ready for Dev Kickoff
            </span>
            <p className="mt-1 text-3xl font-black text-purple-950">
              {items.filter((i) => i.devPhaseConverted || i.stage === "Approved").length}
            </p>
            <p className="text-[11px] font-bold text-purple-700">
              Handed off to Engineering sprints
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 3. MAIN SPLIT INTERFACE: CLIENT SELECTOR (LEFT) + DOCUMENTATION DOSSIER (RIGHT) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: CLIENT LIST (TRACK EACH CLIENT SEPARATELY) */}
        <div className="space-y-4 lg:col-span-4">
          <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-black tracking-wider text-slate-500 uppercase">
                Clients in Presales ({filteredClients.length})
              </span>
              <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                Track Separately
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients..."
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-3 pl-9 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Client Cards List */}
            <div className="max-h-150 space-y-2 overflow-y-auto pr-1">
              {filteredClients.map((client) => {
                const cId = client.id || client._id!;
                const isSelected = cId === selectedClientId;
                const docCount = client.documents?.length || 0;
                const hasSow = client.documents?.some((d) => d.type === "SOW");

                return (
                  <div
                    key={cId}
                    onClick={() => setSelectedClientId(cId)}
                    className={`group cursor-pointer rounded-2xl border p-3.5 transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/60 shadow-xs"
                        : "border-slate-200/70 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-slate-400">
                        {client.quotationNumber || cId}
                      </span>
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          hasSow ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {hasSow ? "SOW Ready" : "Drafting"}
                      </span>
                    </div>

                    <p
                      className={`mt-1 text-xs font-black ${isSelected ? "text-indigo-950" : "text-slate-900"}`}
                    >
                      {client.clientName}
                    </p>
                    <p className="truncate text-[11px] font-medium text-slate-500">
                      {client.title}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-100/80 pt-2 text-[10px]">
                      <span className="font-semibold text-slate-500">{docCount} documents</span>
                      <span className="font-bold text-indigo-700">
                        ₹{(client.estimatedValue / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CLIENT'S DOCUMENTATION DOSSIER & UPLOAD FROM PC */}
        {activeClient && (
          <div className="space-y-6 lg:col-span-8">
            {/* CLIENT DOSSIER HEADER */}
            <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[11px] font-bold text-indigo-700">
                      {activeClient.quotationNumber || activeClient.id}
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                      {activeClient.serviceCategory || "Web Development"}
                    </span>
                    <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700 uppercase">
                      Stage: {activeClient.stage}
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    {activeClient.clientName}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-slate-600">
                    {activeClient.title} • {activeClient.contactPerson}{" "}
                    {activeClient.clientCompany && `(${activeClient.clientCompany})`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/dashboard/presales/${activeClient.id || activeClient._id!}` as any}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
                  >
                    <span>Customer 360° Page</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </Link>

                  {!activeClient.devPhaseConverted && activeClient.stage !== "Approved" && (
                    <button
                      type="button"
                      onClick={handleConvertToDev}
                      className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Handoff to Dev Phase</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Template Preparation Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="mr-1 text-[11px] font-bold text-slate-400 uppercase">
                  Draft Templates:
                </span>
                <button
                  type="button"
                  onClick={() => handleGenerateTemplate("SOW")}
                  className="cursor-pointer rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-1.5 text-xs font-bold text-indigo-700 transition-colors hover:bg-indigo-100"
                >
                  + Generate SOW Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerateTemplate("Checklist")}
                  className="cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                >
                  + Generate Checklist Spec
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerateTemplate("PRD")}
                  className="cursor-pointer rounded-xl border border-purple-200 bg-purple-50/60 px-3 py-1.5 text-xs font-bold text-purple-700 transition-colors hover:bg-purple-100"
                >
                  + Generate PRD Document
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerateTemplate("BRD")}
                  className="cursor-pointer rounded-xl border border-blue-200 bg-blue-50/60 px-3 py-1.5 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  + Generate BRD Document
                </button>
              </div>
            </div>

            {/* UPLOAD FROM PC METHOD CONTAINER */}
            <div className="space-y-5 rounded-3xl border border-indigo-200/80 bg-linear-to-b from-indigo-50/40 via-white to-white p-7 shadow-xs">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">
                      Upload Document From PC
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500">
                      Upload executed SOW, checklist, PRD, BRD, or client sign-off files directly
                      from your computer.
                    </p>
                  </div>
                </div>
                <span className="rounded-lg bg-indigo-100 px-2.5 py-1 text-[10px] font-black text-indigo-800 uppercase">
                  Local File Uploader
                </span>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Document Type Selector */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Document Type *</label>
                    <select
                      value={uploadDocType}
                      onChange={(e) => setUploadDocType(e.target.value as PresalesDocType)}
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                    >
                      {DOCUMENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Document Title</label>
                    <input
                      type="text"
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      placeholder="e.g. SOW_Executed_Signed"
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Version */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Version Tag</label>
                    <input
                      type="text"
                      value={docVersion}
                      onChange={(e) => setDocVersion(e.target.value)}
                      placeholder="e.g. v1.0, v2.1"
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* PC File Drag & Drop / Input Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group cursor-pointer rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/20 p-6 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50/40"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.png,.jpg"
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-xs transition-transform group-hover:scale-110">
                      <Upload className="h-5 w-5" />
                    </div>
                    {selectedFile ? (
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-indigo-700">
                          Selected: {selectedFile.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to attach
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-700">
                          Click to browse and upload file from your PC
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Supports PDF, DOCX, XLSX, ZIP up to 50MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload & Attach to {activeClient.clientName}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* CLIENT DOCUMENTS REPOSITORY TABLE */}
            <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    Documents Repository for {activeClient.clientName} (
                    {activeClient.documents?.length || 0})
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  SOW, PRD, BRD & Checklists
                </span>
              </div>

              {!activeClient.documents || activeClient.documents.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  <p>No documents attached for this client yet.</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Use the form above to upload from PC or click a draft template.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase">
                      <tr>
                        <th className="py-2.5 pr-4 pl-2">Document Name</th>
                        <th className="px-4 py-2.5">Doc Type</th>
                        <th className="px-4 py-2.5">Version</th>
                        <th className="px-4 py-2.5">Size / Date</th>
                        <th className="px-4 py-2.5">Source</th>
                        <th className="py-2.5 pr-2 pl-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeClient.documents.map((doc) => (
                        <tr key={doc.id} className="group hover:bg-slate-50/50">
                          <td className="py-3 pr-4 pl-2 font-bold text-slate-800">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 shrink-0 text-indigo-500" />
                              <span className="max-w-56 truncate">{doc.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`rounded-lg border px-2 py-0.5 text-[10px] font-black uppercase ${
                                docTypeBadgeColors[doc.type] || "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {doc.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-[11px] whitespace-nowrap text-slate-500">
                            {doc.version || "v1.0"}
                          </td>
                          <td className="px-4 py-3 text-[11px] whitespace-nowrap text-slate-500">
                            <span>{doc.size || "1.5 MB"}</span> • <span>{doc.updatedAt}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-[10px] font-bold text-slate-500">
                              {doc.uploadedFromPc ? "PC Upload" : "System Draft"}
                            </span>
                          </td>
                          <td className="py-3 pr-2 pl-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Download link / button */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (doc.fileUrl) {
                                    window.open(doc.fileUrl, "_blank");
                                  } else {
                                    toast.success(`Downloading ${doc.title}...`);
                                  }
                                }}
                                title="Download Document"
                                className="cursor-pointer rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 shadow-2xs hover:bg-slate-50"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </button>

                              {/* Delete button */}
                              <button
                                type="button"
                                onClick={() => handleDeleteDoc(doc.id, doc.title)}
                                title="Remove Document"
                                className="cursor-pointer rounded-lg border border-slate-200 bg-white p-1.5 text-rose-500 shadow-2xs hover:bg-rose-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
