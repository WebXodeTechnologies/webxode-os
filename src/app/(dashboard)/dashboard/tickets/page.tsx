"use client";

import React, { useState } from "react";
import TicketHeader from "@/components/tickets/TicketHeader";
import TicketCard, { Ticket } from "@/components/tickets/TicketCard";
import TicketTableView from "@/components/tickets/TicketTableView";
import TicketDetailDrawer from "@/components/tickets/TicketDetailDrawer";
import RaiseTicketModal from "@/components/tickets/RaiseTicketModal";
import { Users, LifeBuoy } from "lucide-react";

// ── Seed Tickets ──────────────────────────────────────────────────────────────
const SEED_TICKETS: Ticket[] = [
  {
    id: "1",
    ticketCode: "#WX-1042",
    title: "Stripe Webhook signature verification failing in production",
    description:
      "Production payments breaking — all webhook events are returning 400 signature mismatch. Revenue impact.",
    clientName: "Aishwarya Art Gallery",
    priority: "P0 - Critical",
    status: "Open",
    type: "Bug",
    assignee: "Akash SM",
    assigneeDept: "Engineering",
    createdAt: "10 mins ago",
    dueDate: "2026-10-13",
    slaHours: 4,
  },
  {
    id: "2",
    ticketCode: "#WX-1041",
    title: "Add bulk product upload CSV parser for inventory module",
    description:
      "Client needs to upload 500+ SKUs at once. Current UI only supports single product creation.",
    clientName: "The Green Naturals",
    priority: "P1 - High",
    status: "In Progress",
    type: "Feature Request",
    assignee: "Priya Sharma",
    assigneeDept: "Engineering",
    createdAt: "2 hrs ago",
    dueDate: "2026-10-15",
    slaHours: 24,
  },
  {
    id: "3",
    ticketCode: "#WX-1040",
    title: "Meta Ads CAPI token rotation sync breaking conversion tracking",
    description:
      "Server-side conversion events stopped firing after token rotation. Need to re-sync CAPI config.",
    clientName: "Webxode Internal",
    priority: "P1 - High",
    status: "Waiting on Client",
    type: "Integration",
    assignee: "Ananya Iyer",
    assigneeDept: "Sales",
    createdAt: "Yesterday",
    slaHours: 12,
  },
  {
    id: "4",
    ticketCode: "#WX-1039",
    title: "Homepage hero section mobile viewport layout broken below 375px",
    description:
      "iPhone SE users see CTA button overflowing the hero card. Designer reported by client.",
    clientName: "Kiran Jewellers",
    priority: "P2 - Normal",
    status: "In Progress",
    type: "Design",
    assignee: "Priya Sharma",
    assigneeDept: "Design",
    createdAt: "2 days ago",
    dueDate: "2026-10-16",
    slaHours: 48,
  },
  {
    id: "5",
    ticketCode: "#WX-1038",
    title: "Admin dashboard page load exceeding 8s on slow 4G connections",
    description:
      "Lighthouse performance score is 34. Bundle size needs splitting and image lazy-loading.",
    clientName: "Apex Fitness Studio",
    priority: "P1 - High",
    status: "Open",
    type: "Performance",
    assignee: "Rahul Verma",
    assigneeDept: "Engineering",
    createdAt: "3 days ago",
    slaHours: 16,
  },
  {
    id: "6",
    ticketCode: "#WX-1037",
    title: "GST invoice PDF auto-generation not attaching to order confirmation email",
    description:
      "Woocommerce order webhook fires but PDF attachment is missing from the outgoing email template.",
    clientName: "The Green Naturals",
    priority: "P2 - Normal",
    status: "Open",
    type: "Bug",
    assignee: "Karthik Raja",
    assigneeDept: "Engineering",
    createdAt: "4 days ago",
    slaHours: 48,
  },
  {
    id: "7",
    ticketCode: "#WX-1036",
    title: "Presales deck for enterprise SaaS package — Q4 pitch",
    description:
      "Needs tailored deck for TechNova Solutions enterprise RFP. Include case studies and ROI projections.",
    clientName: "TechNova Solutions",
    priority: "P2 - Normal",
    status: "In Progress",
    type: "Sales",
    assignee: "Ananya Iyer",
    assigneeDept: "Presales",
    createdAt: "5 days ago",
    dueDate: "2026-10-18",
    slaHours: 72,
  },
  {
    id: "8",
    ticketCode: "#WX-1035",
    title: "Razorpay Payment Gateway integration — sandbox to production migration",
    description:
      "Test credentials working. Need to switch to production API keys and test live transactions.",
    clientName: "BlueSky Retail",
    priority: "P3 - Low",
    status: "Resolved",
    type: "Integration",
    assignee: "Karthik Raja",
    assigneeDept: "Engineering",
    createdAt: "1 week ago",
    slaHours: 96,
  },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(SEED_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedType, setSelectedType] = useState("All Types");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = tickets.filter((t) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      t.ticketCode.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.clientName.toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q);

    const matchPriority = selectedPriority === "All Priorities" || t.priority === selectedPriority;
    const matchStatus = selectedStatus === "All Statuses" || t.status === selectedStatus;
    const matchType = selectedType === "All Types" || t.type === selectedType;

    return matchSearch && matchPriority && matchStatus && matchType;
  });

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    inProgress: tickets.filter((t) => t.status === "In Progress").length,
    waiting: tickets.filter((t) => t.status === "Waiting on Client").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
  };

  // ── New Ticket Handler ──────────────────────────────────────────────────────
  const handleNewTicket = (data: Omit<Ticket, "id" | "ticketCode" | "createdAt" | "slaHours">) => {
    const newTicket: Ticket = {
      ...data,
      id: String(Date.now()),
      ticketCode: `#WX-${1043 + tickets.length}`,
      createdAt: "Just now",
      slaHours: data.priority === "P0 - Critical" ? 4 : data.priority === "P1 - High" ? 16 : 48,
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* ── Header Panel ────────────────────────────────── */}
      <TicketHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onRaiseTicket={() => setShowModal(true)}
        stats={stats}
      />

      {/* ── Main Content Grid ────────────────────────────── */}
      <div
        className={`grid gap-5 ${
          selectedTicket ? "grid-cols-1 lg:grid-cols-[1fr_380px]" : "grid-cols-1"
        }`}
      >
        {/* ── Ticket List ─────────────────────────────────── */}
        <div>
          {viewMode === "card" ? (
            <>
              {filtered.length > 0 ? (
                <div
                  className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
                    selectedTicket ? "lg:grid-cols-2" : "lg:grid-cols-3"
                  }`}
                >
                  {filtered.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onSelect={setSelectedTicket}
                      isSelected={selectedTicket?.id === ticket.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    🎫
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold text-slate-800">No tickets found</h3>
                  <p className="max-w-xs text-xs text-slate-500">
                    Try adjusting your filters, or raise a new ticket using the button above.
                  </p>
                </div>
              )}
            </>
          ) : (
            <TicketTableView
              tickets={filtered}
              selectedTicket={selectedTicket}
              onSelect={setSelectedTicket}
            />
          )}
        </div>

        {/* ── Detail Panel ────────────────────────────────── */}
        {selectedTicket && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <TicketDetailDrawer ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
          </div>
        )}
      </div>

      {/* ── Raise Ticket Modal ──────────────────────────── */}
      {showModal && (
        <RaiseTicketModal onClose={() => setShowModal(false)} onSubmit={handleNewTicket} />
      )}
    </div>
  );
}
