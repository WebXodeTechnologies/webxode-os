"use client";

import React, { useState } from "react";
import { Eye, Edit2, Trash2, Building2 } from "lucide-react";
import { LeadItem } from "../LeadCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeadsTableProps {
  leads: LeadItem[];
  onViewLead: (lead: LeadItem) => void;
  onEditLead: (lead: LeadItem) => void;
  onDeleteLead: (leadId: string) => void;
}

export function LeadsTable({ leads, onViewLead, onEditLead, onDeleteLead }: LeadsTableProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent overflow-x-auto">
          <Table className="w-full min-w-375 text-left text-sm whitespace-nowrap">
            <TableHeader className="border-b border-slate-100 bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  S No
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Client name
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Type
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Company name
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Email address
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  City
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  State
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Zipcode
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Country
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Phone
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Website
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  GST/VAT Number
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Currency
                </TableHead>
                <TableHead className="h-auto px-6 py-4 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Currency Symbol
                </TableHead>
                <TableHead className="sticky right-0 z-10 h-auto bg-slate-50 px-6 py-4 text-right text-[11px] font-extrabold tracking-widest text-slate-500 uppercase shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {leads.map((lead, index) => {
                return (
                  <TableRow
                    key={lead.id}
                    className="group border-b-0 transition-colors hover:bg-indigo-50/30"
                  >
                    <TableCell className="px-6 py-4 font-semibold text-slate-600">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold text-slate-700">
                      {lead.contactPerson || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold text-slate-600">Lead</TableCell>
                    <TableCell className="px-6 py-4 font-black text-slate-900">
                      {lead.companyName || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.email || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.address || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.city || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.state || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.zipcode || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.country || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-700">
                      {lead.phone || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.website || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.hasGst ? lead.gstin || "Registered" : "Unregistered"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.currency || "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-slate-500">
                      {lead.currencySymbol || "-"}
                    </TableCell>

                    {/* Sticky Actions Column */}
                    <TableCell className="sticky right-0 z-10 bg-white px-6 py-4 text-right shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.02)] transition-colors group-hover:bg-indigo-50/30">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onViewLead(lead)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEditLead(lead)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                          title="Edit Lead"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(lead.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              {leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={15} className="h-50 px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Building2 className="mb-3 h-12 w-12 text-slate-200" />
                      <p className="text-sm font-bold text-slate-600">No client records found.</p>
                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        Add a new client to get started.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setDeleteConfirmId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-101 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <Trash2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-black text-slate-900">Delete Client Lead?</h3>
                <p className="text-sm font-semibold text-slate-500">
                  Are you sure you want to delete this lead? This action cannot be undone and will
                  remove all associated tasks and history.
                </p>
                <div className="mt-6 flex w-full gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onDeleteLead(deleteConfirmId);
                      setDeleteConfirmId(null);
                    }}
                    className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-rose-700"
                  >
                    Delete Lead
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
