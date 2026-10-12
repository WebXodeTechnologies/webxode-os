"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ArrowUpRight,
  Calculator,
  ChevronRight,
  CheckCircle2,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  Video,
  FileText,
  Layers,
  Sparkles,
  PhoneCall,
  Check,
  Globe,
  Smartphone,
  Cloud,
  Megaphone,
  Palette,
  FileCode,
  TrendingUp,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { PresalesItem, ITServiceCategory, DemoPlatform } from "@/modules/presales/presales.types";

interface PresalesTableViewProps {
  items: PresalesItem[];
  onViewDetails: (item: PresalesItem) => void;
  onOpenCalculator: (item: PresalesItem) => void;
  onAdvanceStage: (item: PresalesItem) => void;
  onHandoffToProject: (item: PresalesItem) => void;
  onEditItem?: (item: PresalesItem) => void;
  onDeleteItem?: (item: PresalesItem) => void;
}

const stageBadgeStyles: Record<PresalesItem["stage"], string> = {
  Requirement: "bg-blue-50 text-blue-700 border-blue-200",
  Estimation: "bg-amber-50 text-amber-700 border-amber-200",
  Proposal: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Quotation: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Negotiation: "bg-purple-50 text-purple-700 border-purple-200",
  Approved: "bg-teal-50 text-teal-700 border-teal-200",
};

const serviceIcons: Record<string, React.ReactNode> = {
  "Web Development": <Globe className="h-3.5 w-3.5 text-blue-500" />,
  "App Development": <Smartphone className="h-3.5 w-3.5 text-emerald-500" />,
  "SaaS Development": <Cloud className="h-3.5 w-3.5 text-indigo-500" />,
  "Digital Marketing": <Megaphone className="h-3.5 w-3.5 text-amber-500" />,
  Branding: <Palette className="h-3.5 w-3.5 text-pink-500" />,
  "Content Creation": <FileCode className="h-3.5 w-3.5 text-purple-500" />,
  "Performance Marketing": <TrendingUp className="h-3.5 w-3.5 text-rose-500" />,
  Consulting: <Briefcase className="h-3.5 w-3.5 text-slate-600" />,
};

const serviceColors: Record<string, string> = {
  "Web Development": "bg-blue-50 text-blue-700 border-blue-200",
  "App Development": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "SaaS Development": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Digital Marketing": "bg-amber-50 text-amber-700 border-amber-200",
  Branding: "bg-pink-50 text-pink-700 border-pink-200",
  "Content Creation": "bg-purple-50 text-purple-700 border-purple-200",
  "Performance Marketing": "bg-rose-50 text-rose-700 border-rose-200",
  Consulting: "bg-slate-100 text-slate-700 border-slate-200",
};

export function PresalesTableView({
  items,
  onViewDetails,
  onOpenCalculator,
  onAdvanceStage,
  onHandoffToProject,
  onEditItem,
  onDeleteItem,
}: PresalesTableViewProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<PresalesItem | null>(null);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const confirmDelete = () => {
    if (itemToDelete && onDeleteItem) {
      onDeleteItem(itemToDelete);
      setItemToDelete(null);
    }
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/70 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
              <tr>
                <th className="py-4 pr-4 pl-6">Customer & Quote ID</th>
                <th className="px-4 py-4">IT Service Domain</th>
                <th className="px-4 py-4">Technical Demo Details</th>
                <th className="px-4 py-4">Presales Documents & Checklist</th>
                <th className="px-4 py-4">Commercial Quote</th>
                <th className="px-4 py-4">Lead Stage & Dev Status</th>
                <th className="py-4 pr-6 pl-4 text-right">Action Menu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">
                      No presales customer records match your filter.
                    </p>
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const itemId = item.id || item._id || "";
                  const category = item.serviceCategory || "Web Development";
                  const demo = item.demo;
                  const isMenuOpen = activeMenuId === itemId;

                  // Checklist completion
                  const totalChecks = item.checklist?.length || 6;
                  const completedChecks =
                    item.checklist?.filter((c) => c.completed).length ||
                    (item.stage === "Approved" ? 6 : item.stage === "Quotation" ? 4 : 2);

                  return (
                    <tr key={itemId} className="group transition-colors hover:bg-indigo-50/20">
                      {/* 1. CUSTOMER & QUOTE ID */}
                      <td className="py-4 pr-4 pl-6">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/presales/${itemId}` as any}
                            className="font-mono text-[11px] font-bold text-indigo-600 hover:underline"
                            title="Open Customer ID Page"
                          >
                            {item.quotationNumber || itemId}
                          </Link>
                          {item.salesLeadSource && (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500">
                              Sales Inbound
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/dashboard/presales/${itemId}` as any}
                          className="mt-0.5 block font-black text-slate-900 transition-colors group-hover:text-indigo-600"
                        >
                          {item.clientName}
                        </Link>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                          <span>{item.contactPerson}</span>
                          {item.clientCompany && (
                            <>
                              <span>•</span>
                              <span className="max-w-36 truncate text-slate-400">
                                {item.clientCompany}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* 2. IT SERVICE DOMAIN */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-bold ${
                            serviceColors[category] || "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {serviceIcons[category]}
                          <span>{category}</span>
                        </span>
                        <div className="mt-1 line-clamp-1 max-w-44 text-[11px] font-medium text-slate-500">
                          {item.title}
                        </div>
                      </td>

                      {/* 3. TECHNICAL DEMO DETAILS */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {demo?.platform ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                                  demo.platform === "Microsoft Teams"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                <Video className="h-3 w-3" />
                                <span>{demo.platform}</span>
                              </span>

                              {demo.meetingLink && (
                                <a
                                  href={demo.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800"
                                  title="Join Demo Meeting Link"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>

                            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              <span>{demo.scheduledDate || "Scheduled"}</span>
                              {demo.scheduledTime && (
                                <span className="text-slate-400">({demo.scheduledTime})</span>
                              )}
                            </div>

                            <div className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-slate-500">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  demo.status === "Completed" || demo.status === "POC Presented"
                                    ? "bg-emerald-500"
                                    : "bg-amber-500"
                                }`}
                              />
                              <span>{demo.status || "Demo Pending"}</span>
                              {demo.pocUrl && (
                                <span className="font-extrabold text-indigo-600">• POC Ready</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 italic">
                            Demo not scheduled yet
                          </div>
                        )}
                      </td>

                      {/* 4. PRESALES DOCUMENTS & CHECKLIST */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-lg border px-2 py-0.5 text-[10px] font-extrabold ${
                              item.documents?.some((d) => d.type === "Quotation")
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                            }`}
                          >
                            Quote
                          </span>
                          <span
                            className={`rounded-lg border px-2 py-0.5 text-[10px] font-extrabold ${
                              item.documents?.some((d) => d.type === "SOW")
                                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                            }`}
                          >
                            SOW
                          </span>
                        </div>

                        {/* Checklist progress bar */}
                        <div className="mt-2 w-32">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                            <span>Checklist</span>
                            <span>
                              {completedChecks}/{totalChecks}
                            </span>
                          </div>
                          <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-indigo-600 transition-all"
                              style={{
                                width: `${Math.round((completedChecks / totalChecks) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 5. COMMERCIAL QUOTE */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-black text-slate-900">
                          ₹{item.estimatedValue.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[11px] font-bold text-emerald-600">
                          {item.targetMarginPercent}% Margin
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.timelineWeeks} wks • {item.totalEffortHours} hrs
                        </div>
                      </td>

                      {/* 6. LEAD STAGE & DEV READINESS */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block rounded-xl border px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                            stageBadgeStyles[item.stage] || "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.stage}
                        </span>

                        {item.devPhaseConverted || item.stage === "Approved" ? (
                          <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-teal-700">
                            <CheckCircle2 className="h-3 w-3 text-teal-600" />
                            <span>In Dev Phase</span>
                          </div>
                        ) : (
                          <div className="mt-1 text-[10px] font-medium text-slate-400">
                            Pre-Dev Phase
                          </div>
                        )}
                      </td>

                      {/* 7. ACTION MENU */}
                      <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                        <div className="relative inline-flex items-center justify-end gap-1.5">
                          {/* EXPLORE ID PAGE BUTTON */}
                          <Link
                            href={`/dashboard/presales/${itemId}` as any}
                            title="Explore Customer ID Page Dossier"
                            className="flex cursor-pointer items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-2xs transition-all hover:bg-indigo-700"
                          >
                            <span>Explore ID</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>

                          {/* EDIT BUTTON */}
                          {onEditItem && (
                            <button
                              type="button"
                              onClick={() => onEditItem(item)}
                              title="Edit Customer Presales Data"
                              className="cursor-pointer rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition-all hover:bg-slate-50 hover:text-indigo-600"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                          )}

                          {/* 3-DOTS ACTION DROPDOWN */}
                          <button
                            type="button"
                            onClick={(e) => toggleMenu(itemId, e)}
                            title="More Actions"
                            className="cursor-pointer rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition-all hover:bg-slate-50"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>

                          {/* POPUP MENU */}
                          {isMenuOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setActiveMenuId(null)}
                              />
                              <div className="absolute top-10 right-0 z-50 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                                <Link
                                  href={`/dashboard/presales/${itemId}` as any}
                                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                  <ArrowUpRight className="h-3.5 w-3.5 text-indigo-500" />
                                  <span>Explore ID Page</span>
                                </Link>

                                {onEditItem && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      onEditItem(item);
                                    }}
                                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                  >
                                    <Edit2 className="h-3.5 w-3.5 text-blue-500" />
                                    <span>Update Details</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    onOpenCalculator(item);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                >
                                  <Calculator className="h-3.5 w-3.5 text-amber-500" />
                                  <span>Effort & Rate Calculator</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    onViewDetails(item);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                >
                                  <FileText className="h-3.5 w-3.5 text-purple-500" />
                                  <span>Quick Specs Modal</span>
                                </button>

                                <div className="my-1 h-px bg-slate-100" />

                                {item.stage !== "Approved" && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      onHandoffToProject(item);
                                    }}
                                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50"
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                                    <span>Convert to Dev Phase</span>
                                  </button>
                                )}

                                {onDeleteItem && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      setItemToDelete(item);
                                    }}
                                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                                  >
                                    <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                                    <span>Delete Record</span>
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-900">Delete Presales Record?</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Are you sure you want to delete the presales entry for{" "}
              <strong className="text-slate-800">{itemToDelete.clientName}</strong> (
              {itemToDelete.quotationNumber || itemToDelete.id})? This will remove all demo records,
              quote details, and SOW specifications.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="cursor-pointer rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-700"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
