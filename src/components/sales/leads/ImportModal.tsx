"use client";

import React, { useState, useRef } from "react";
import { X, UploadCloud, FileSpreadsheet, Download, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        droppedFile.type === "text/csv" ||
        droppedFile.name.endsWith(".xlsx") ||
        droppedFile.name.endsWith(".csv")
      ) {
        setFile(droppedFile);
      } else {
        toast.error("Please upload a valid Excel (.xlsx) or CSV file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownloadSample = () => {
    toast.success("Sample template downloaded successfully!");
  };

  const handleImport = () => {
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }

    // Simulate importing logic
    toast.success("Data imported successfully!");
    onImport([]); // In a real app, parse the file and pass data here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-50 flex w-full max-w-2xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-900/5"
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-linear-to-r from-blue-950 via-slate-900 to-indigo-900 px-8 py-6">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-wide text-white">Import Clients</h2>
                  <p className="mt-1 text-xs font-medium text-blue-200">
                    Upload your data via Excel or CSV
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-blue-100 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Drag and Drop Zone */}
              <div className="flex-1">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : file
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-slate-100"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    className="hidden"
                  />

                  {file ? (
                    <>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-bold text-slate-700">{file.name}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {(file.size / 1024).toFixed(2)} KB • Ready to import
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
                        <UploadCloud className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-bold text-slate-700">
                        Click to upload or drag and drop
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        XLSX, XLS, or CSV (max. 10MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Info / Schema Box */}
              <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 md:w-64">
                <h3 className="mb-2 text-sm font-bold text-indigo-900">Required Columns</h3>
                <ul className="mb-4 list-disc space-y-2 pl-4 text-xs font-medium text-slate-600">
                  <li>Type (Organization/Person)</li>
                  <li>Company Name</li>
                  <li>Contact Person</li>
                  <li>Email</li>
                  <li>Phone</li>
                  <li>Lead Source</li>
                </ul>
                <button
                  onClick={handleDownloadSample}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
                >
                  <Download className="h-4 w-4" /> Download Sample
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-8 py-5">
            <button
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-[14px] font-bold text-slate-600 transition hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!file}
              className={`rounded-xl px-8 py-2.5 text-[14px] font-black text-white shadow-lg transition active:scale-95 ${
                file
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 shadow-blue-600/30 hover:opacity-90"
                  : "cursor-not-allowed bg-slate-300 shadow-none"
              }`}
            >
              Import Data
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
