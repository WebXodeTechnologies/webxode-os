"use client";

import React, { useState } from "react";
import {
  Search,
  Upload,
  Plus,
  ChevronDown,
  UserPlus,
  CheckSquare,
  PhoneCall,
  AlertCircle,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_SOURCES = [
  "Referral",
  "Word of Mouth",
  "Website Lead",
  "Organic Lead",
  "Meta",
  "Google",
  "Other Platforms",
];

interface LeadsHeaderBlockProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAddMenuOpen: boolean;
  setIsAddMenuOpen: (isOpen: boolean) => void;
  handleOpenNewLead: () => void;
  handleOpenNewTask: () => void;
  handleOpenUpdateStatus: () => void;
  handleOpenImport: () => void;
  sourceFilter: string;
  setSourceFilter: (filter: string) => void;
  sourceStats: Record<string, number>;
}

export function LeadsHeaderBlock({
  searchQuery,
  setSearchQuery,
  isAddMenuOpen,
  setIsAddMenuOpen,
  handleOpenNewLead,
  handleOpenNewTask,
  handleOpenUpdateStatus,
  handleOpenImport,
  sourceFilter,
  setSourceFilter,
  sourceStats,
}: LeadsHeaderBlockProps) {
  const [isSourceFilterOpen, setIsSourceFilterOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-20 rounded-[2rem] border border-indigo-100/50 bg-linear-to-br from-indigo-50 via-white to-purple-50 p-8 shadow-sm md:p-10"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-300/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-300/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/50 px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-inner backdrop-blur-md"
          >
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
            Sales Operation Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl"
          >
            Leads{" "}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Engine
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-xl text-sm leading-relaxed font-medium text-slate-600"
          >
            Manage your complete sales pipeline, track active clients, book product demos, and
            monitor conversions in real-time.
          </motion.p>
        </div>

        {/* Actions & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full min-w-64 rounded-xl border border-slate-200 bg-white pr-4 pl-10 text-sm font-semibold text-slate-900 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSourceFilterOpen(!isSourceFilterOpen)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
            >
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">
                {sourceFilter === "All" ? "All Sources" : sourceFilter}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  isSourceFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isSourceFilterOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSourceFilterOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl"
                  >
                    <div className="max-h-64 scrollbar-thin scrollbar-thumb-slate-200 overflow-y-auto p-1.5">
                      <button
                        onClick={() => {
                          setSourceFilter("All");
                          setIsSourceFilterOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold transition-colors ${
                          sourceFilter === "All"
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        All Sources
                      </button>
                      {TARGET_SOURCES.map((src) => (
                        <button
                          key={src}
                          onClick={() => {
                            setSourceFilter(src);
                            setIsSourceFilterOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold transition-colors ${
                            sourceFilter === src
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{src}</span>
                          <span className="flex h-5 items-center justify-center rounded-md bg-slate-100 px-1.5 text-[10px] font-black text-slate-500">
                            {sourceStats[src] || 0}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Import Button */}
          <button
            onClick={handleOpenImport}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
          >
            <Upload className="h-4.5 w-4.5 text-indigo-500" />
            <span className="hidden sm:inline">Import</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-indigo-500 bg-indigo-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-95"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add New</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isAddMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isAddMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsAddMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl"
                  >
                    <div className="p-1.5">
                      <button
                        onClick={handleOpenNewLead}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <UserPlus className="h-4.5 w-4.5" />
                        Add Client Lead
                      </button>
                      <button
                        onClick={() => {
                          setIsAddMenuOpen(false);
                          handleOpenNewTask();
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <CheckSquare className="h-4.5 w-4.5" />
                        Add Task
                      </button>
                      <button
                        onClick={() => {
                          setIsAddMenuOpen(false);
                          handleOpenNewLead(); // Add Contact opens same modal as Add Client
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <PhoneCall className="h-4.5 w-4.5" />
                        Add Contact
                      </button>
                      <button
                        onClick={() => {
                          setIsAddMenuOpen(false);
                          handleOpenUpdateStatus();
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <AlertCircle className="h-4.5 w-4.5" />
                        Update Status
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
