"use client";

import React, { useState } from "react";
import {
  Users,
  Mail,
  Plus,
  Ticket as TicketIcon,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckSquare,
  FileText,
  Bell,
  CheckCircle2,
  Clock,
  X,
  Trash2,
  Filter,
  UserPlus,
  PhoneCall,
  Sparkles,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface ClientBottomWidgetsProps {
  lead?: any;
}

export function ClientBottomWidgets({ lead }: ClientBottomWidgetsProps) {
  // =========================================================================
  // 1. CONTACTS & REFERRALS STATE
  // =========================================================================
  const [contacts, setContacts] = useState([
    {
      id: "c1",
      name: lead?.contactPerson || "Emily Smith",
      role: "Primary Contact & VP Tech",
      email: lead?.email || "emily.smith@client.com",
      phone: lead?.phone || "+91 98765 43210",
      isPrimary: true,
    },
  ]);

  const [referrals, setReferrals] = useState([
    {
      id: "r1",
      name: "John Doe",
      email: "john.doe@techenterprise.io",
      phone: "+91 91234 56789",
      note: "Needs Enterprise Custom ERP Software Solution",
      initials: "JD",
    },
  ]);

  // Modal States for Contacts
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddReferralModal, setShowAddReferralModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", role: "", email: "", phone: "" });
  const [newReferral, setNewReferral] = useState({ name: "", email: "", phone: "", note: "" });

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name.trim()) return;
    const added = {
      id: `c_${Date.now()}`,
      name: newContact.name,
      role: newContact.role || "Secondary Contact",
      email: newContact.email || "email@domain.com",
      phone: newContact.phone || "+91 90000 00000",
      isPrimary: false,
    };
    setContacts((prev) => [...prev, added]);
    setShowAddContactModal(false);
    setNewContact({ name: "", role: "", email: "", phone: "" });
    toast.success("Contact Added", {
      description: `${added.name} was added to client contacts.`,
    });
  };

  const handleAddReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReferral.name.trim()) return;
    const initials = newReferral.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const added = {
      id: `r_${Date.now()}`,
      name: newReferral.name,
      email: newReferral.email || "referral@domain.com",
      phone: newReferral.phone || "+91 90000 00000",
      note: newReferral.note || "New potential lead requirement",
      initials: initials || "REF",
    };
    setReferrals((prev) => [...prev, added]);
    setShowAddReferralModal(false);
    setNewReferral({ name: "", email: "", phone: "", note: "" });
    toast.success("Referral Added", {
      description: `New referral ${added.name} recorded successfully.`,
    });
  };

  const handleSendInvite = (email: string) => {
    toast.success("Invite Email Dispatched", {
      description: `Portal onboarding invitation sent to ${email}`,
    });
  };

  // =========================================================================
  // 2. TICKETS STATE & HANDLERS
  // =========================================================================
  const [ticketFilter, setTicketFilter] = useState<"Open" | "Closed" | "Overdue" | "All">("Open");
  const [ticketSearch, setTicketSearch] = useState("");
  const [tickets, setTickets] = useState([
    {
      id: "TK-101",
      subject: "Cannot open Figma design export file",
      client: lead?.companyName || "Demo Client",
      date: "Yesterday",
      status: "Open",
      priority: "High",
      tag: "Urgent Support",
    },
    {
      id: "TK-102",
      subject: "How can I access historical billing statements?",
      client: lead?.companyName || "Demo Client",
      date: "13-09-2026",
      status: "Open",
      priority: "Medium",
      tag: "Billing",
    },
    {
      id: "TK-103",
      subject: "API Integration Webhook setup request",
      client: lead?.companyName || "Demo Client",
      date: "02-10-2026",
      status: "Closed",
      priority: "Low",
      tag: "Feature Request",
    },
  ]);
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", priority: "Medium", tag: "General" });

  const handleAddTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject.trim()) return;
    const added = {
      id: `TK-${Math.floor(100 + Math.random() * 900)}`,
      subject: newTicket.subject,
      client: lead?.companyName || "Client",
      date: "Just now",
      status: "Open",
      priority: newTicket.priority,
      tag: newTicket.tag,
    };
    setTickets((prev) => [added, ...prev]);
    setTicketFilter("Open");
    setShowAddTicketModal(false);
    setNewTicket({ subject: "", priority: "Medium", tag: "General" });
    toast.success("Ticket Created", {
      description: `Ticket ${added.id} created for ${added.client}.`,
    });
  };

  const handleToggleTicketStatus = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "Open" ? "Closed" : "Open";
          toast.info(`Ticket ${t.id} status updated to ${nextStatus}`);
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesTab = ticketFilter === "All" || t.status === ticketFilter;
    const matchesQuery =
      t.subject.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      t.tag.toLowerCase().includes(ticketSearch.toLowerCase());
    return matchesTab && matchesQuery;
  });

  // =========================================================================
  // 3. CALENDAR EVENTS STATE & HANDLERS
  // =========================================================================
  const [calendarView, setCalendarView] = useState<"month" | "week" | "list">("month");
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // October (0-indexed)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [events, setEvents] = useState([
    {
      id: "ev1",
      title: "Project SLA Requirement Review",
      date: "2026-10-02",
      dayNumber: 2,
      time: "11:00 AM",
      category: "Meeting",
      bgClass: "bg-indigo-600 text-white",
    },
    {
      id: "ev2",
      title: "Q3 Sales Contract Signoff",
      date: "2026-10-09",
      dayNumber: 9,
      time: "03:30 PM",
      category: "Contract",
      bgClass: "bg-emerald-600 text-white",
    },
    {
      id: "ev3",
      title: "Weekly Tech Architecture Call",
      date: "2026-10-16",
      dayNumber: 16,
      time: "02:00 PM",
      category: "Demo",
      bgClass: "bg-purple-600 text-white",
    },
  ]);

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "2026-10-20",
    time: "10:00 AM",
    category: "Meeting",
  });

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(2026);
    setCurrentMonthIndex(9);
    toast.info("Navigated to Today");
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;
    const dayNum = parseInt(newEvent.date.split("-")[2] || "15", 10);
    const added = {
      id: `ev_${Date.now()}`,
      title: newEvent.title,
      date: newEvent.date,
      dayNumber: dayNum,
      time: newEvent.time,
      category: newEvent.category,
      bgClass: "bg-indigo-600 text-white",
    };
    setEvents((prev) => [...prev, added]);
    setShowAddEventModal(false);
    setNewEvent({ title: "", date: "2026-10-20", time: "10:00 AM", category: "Meeting" });
    toast.success("Calendar Event Added", {
      description: `"${added.title}" scheduled for ${added.date} at ${added.time}.`,
    });
  };

  // =========================================================================
  // 4. TASKS WIDGET STATE & HANDLERS
  // =========================================================================
  const [tasksFilter, setTasksFilter] = useState<"All" | "Pending" | "Completed">("All");
  const [tasks, setTasks] = useState([
    {
      id: "t1",
      title: "Prepare SOW and scope document draft",
      dueDate: "Oct 12",
      priority: "High",
      completed: false,
    },
    {
      id: "t2",
      title: "Schedule technical kickoff meeting",
      dueDate: "Oct 14",
      priority: "Medium",
      completed: false,
    },
    {
      id: "t3",
      title: "Send advance milestone invoice ₹1,50,000",
      dueDate: "Oct 15",
      priority: "High",
      completed: true,
    },
    {
      id: "t4",
      title: "Follow up on NDA signature status",
      dueDate: "Oct 18",
      priority: "Low",
      completed: false,
    },
  ]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", dueDate: "Oct 20", priority: "Medium" });

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((tk) => {
        if (tk.id === id) {
          const nextState = !tk.completed;
          toast.success(nextState ? "Task Completed!" : "Task Re-opened", {
            description: tk.title,
          });
          return { ...tk, completed: nextState };
        }
        return tk;
      })
    );
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    const added = {
      id: `task_${Date.now()}`,
      title: newTask.title,
      dueDate: newTask.dueDate || "Oct 25",
      priority: newTask.priority,
      completed: false,
    };
    setTasks((prev) => [added, ...prev]);
    setShowAddTaskModal(false);
    setNewTask({ title: "", dueDate: "Oct 20", priority: "Medium" });
    toast.success("Task Created", {
      description: `"${added.title}" added to client task list.`,
    });
  };

  const filteredTasksList = tasks.filter((tk) => {
    if (tasksFilter === "Pending") return !tk.completed;
    if (tasksFilter === "Completed") return tk.completed;
    return true;
  });

  // =========================================================================
  // 5. STICKY NOTES WIDGET STATE & HANDLERS
  // =========================================================================
  const [stickyNotes, setStickyNotes] = useState([
    {
      id: "sn1",
      content: "Discussed Q3 pricing tiers. Client requested custom SLA documents by Friday.",
      date: "Today, 11:30 AM",
      color: "bg-amber-100/90 border-amber-200 text-amber-950",
    },
    {
      id: "sn2",
      content: "Decision maker prefers bi-weekly progress demo calls over Slack updates.",
      date: "Yesterday",
      color: "bg-amber-100/90 border-amber-200 text-amber-950",
    },
  ]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    const added = {
      id: `sn_${Date.now()}`,
      content: newNoteContent,
      date: "Just now",
      color: "bg-amber-100/90 border-amber-200 text-amber-950",
    };
    setStickyNotes((prev) => [added, ...prev]);
    setShowAddNoteModal(false);
    setNewNoteContent("");
    toast.success("Sticky Note Added", {
      description: "Note saved safely to client workspace.",
    });
  };

  const handleDeleteNote = (id: string) => {
    setStickyNotes((prev) => prev.filter((n) => n.id !== id));
    toast.info("Sticky Note Removed");
  };

  // =========================================================================
  // 6. REMINDERS WIDGET STATE & HANDLERS
  // =========================================================================
  const [reminders, setReminders] = useState([
    {
      id: "rm1",
      text: "Send updated proposal deck to client CEO",
      time: "Today at 4:00 PM",
      completed: false,
    },
    {
      id: "rm2",
      text: "Confirm retainer renewal payment status",
      time: "Tomorrow at 10:00 AM",
      completed: false,
    },
    {
      id: "rm3",
      text: "Review sprint deliverables with Dev lead",
      time: "Oct 15 at 2:00 PM",
      completed: true,
    },
  ]);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newReminder, setNewReminder] = useState({ text: "", time: "Today at 5:00 PM" });

  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextVal = !r.completed;
          toast.success(nextVal ? "Reminder Completed" : "Reminder Reactivated");
          return { ...r, completed: nextVal };
        }
        return r;
      })
    );
  };

  const handleAddReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.text.trim()) return;
    const added = {
      id: `rm_${Date.now()}`,
      text: newReminder.text,
      time: newReminder.time || "Today at 5:00 PM",
      completed: false,
    };
    setReminders((prev) => [added, ...prev]);
    setShowAddReminderModal(false);
    setNewReminder({ text: "", time: "Today at 5:00 PM" });
    toast.success("Reminder Set", {
      description: `Reminder for "${added.text}" saved.`,
    });
  };

  // =========================================================================
  // RENDER COMPONENT
  // =========================================================================
  return (
    <div className="mt-6 space-y-6 pb-16">
      {/* ----------------------------------------------------------------- */}
      {/* CONTACTS & REFERRALS CONTAINER */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <Users className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Client Contacts & Referrals
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Key stakeholders and referral network
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSendInvite(contacts[0]?.email || "client@domain.com")}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-100"
            >
              <Mail className="h-3.5 w-3.5 text-indigo-600" /> Send Invite
            </button>
            <button
              type="button"
              onClick={() => setShowAddContactModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 shadow-2xs transition hover:bg-indigo-600 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Contact
            </button>
            <button
              type="button"
              onClick={() => setShowAddReferralModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 shadow-2xs transition hover:bg-emerald-600 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Referral
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-indigo-700 font-extrabold text-white shadow-xs">
                  {contact.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900">{contact.name}</span>
                    {contact.isPrimary && (
                      <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-extrabold text-indigo-700">
                        Primary Contact
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">{contact.role}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" /> {contact.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="h-3.5 w-3.5 text-slate-400" /> {contact.phone}
                </span>
                <button
                  type="button"
                  onClick={() => handleSendInvite(contact.email)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-indigo-600 transition hover:bg-indigo-50"
                >
                  Reach Out
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Referrals Section */}
        {referrals.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
              Active Referrals ({referrals.length})
            </h4>
            {referrals.map((ref) => (
              <div
                key={ref.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-emerald-100 bg-linear-to-r from-emerald-50/70 to-teal-50/50 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-xs font-extrabold text-white">
                    {ref.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">{ref.name}</span>
                      <span className="rounded-md bg-emerald-200/70 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                        Referral
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-600">{ref.note}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <span>{ref.email}</span>
                  <span>{ref.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 2-COLUMN GRID: TICKETS & EVENTS */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* TICKETS WIDGET */}
        <div className="flex h-110 flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600">
                <TicketIcon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Support Tickets</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddTicketModal(true)}
              className="flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 transition-all hover:bg-indigo-600 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Ticket
            </button>
          </div>

          {/* Ticket Filter Tabs */}
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex gap-2 text-xs font-bold">
              {(["Open", "Closed", "Overdue", "All"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTicketFilter(tab)}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    ticketFilter === tab
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Search */}
          <div className="relative mb-3">
            <Search className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              placeholder="Search tickets by subject or ID..."
              className="w-full rounded-xl border border-slate-200 py-1.5 pr-8 pl-3 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Ticket Scrollable List */}
          <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
            {filteredTickets.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center text-xs font-semibold text-slate-400">
                No tickets found under &quot;{ticketFilter}&quot;.
              </div>
            ) : (
              filteredTickets.map((t) => (
                <div
                  key={t.id}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 transition hover:border-indigo-200 hover:bg-white"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-extrabold text-indigo-600">
                        {t.id}
                      </span>
                      <span className="truncate text-xs font-bold text-slate-900">{t.subject}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span>{t.client}</span>
                      <span>•</span>
                      <span>{t.date}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleTicketStatus(t.id)}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold transition ${
                        t.status === "Open"
                          ? "bg-amber-100 text-amber-800 hover:bg-emerald-100 hover:text-emerald-800"
                          : "bg-emerald-100 text-emerald-800 hover:bg-amber-100 hover:text-amber-800"
                      }`}
                      title="Click to toggle Open/Closed status"
                    >
                      {t.status}
                    </button>
                    <span className="text-[10px] font-bold text-slate-400">{t.tag}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* CALENDAR EVENTS WIDGET */}
        <div className="flex h-110 flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Events & Meetings</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddEventModal(true)}
              className="flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 transition-all hover:bg-indigo-600 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Event
            </button>
          </div>

          {/* Month Header & Controls */}
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100"
                title="Previous Month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100"
                title="Next Month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <span className="ml-2 text-xs font-extrabold text-slate-900 sm:text-sm">
                {monthNames[currentMonthIndex]} {currentYear}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToday}
                className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-extrabold text-slate-700 hover:bg-slate-200"
              >
                Today
              </button>
              <div className="flex gap-1 rounded-lg bg-slate-100 p-0.5 text-[11px] font-bold">
                {(["month", "list"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setCalendarView(v)}
                    className={`rounded-md px-2 py-0.5 uppercase transition ${
                      calendarView === v ? "bg-white text-indigo-600 shadow-2xs" : "text-slate-500"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Month Grid View vs List View */}
          {calendarView === "month" ? (
            <div className="flex flex-1 flex-col justify-between">
              <div className="grid grid-cols-7 gap-1 pb-1 text-center text-[11px] font-extrabold text-slate-600">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
              <div className="grid flex-1 grid-cols-7 gap-1 text-center text-xs">
                {/* Previous month dummy days */}
                <div className="h-10 border-t border-slate-100 pt-1 text-slate-300">27</div>
                <div className="h-10 border-t border-slate-100 pt-1 text-slate-300">28</div>
                <div className="h-10 border-t border-slate-100 pt-1 text-slate-300">29</div>
                <div className="h-10 border-t border-slate-100 pt-1 text-slate-300">30</div>

                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                  24, 25, 26, 27, 28, 29, 30, 31,
                ].map((d) => {
                  const hasEv = events.find((e) => e.dayNumber === d);
                  return (
                    <div
                      key={d}
                      className={`relative h-10 rounded-lg border-t border-slate-100 pt-0.5 text-xs font-bold transition hover:bg-indigo-50/50 ${
                        hasEv ? "bg-indigo-50/90 text-indigo-700" : "text-slate-700"
                      }`}
                    >
                      {d}
                      {hasEv && (
                        <div
                          className="py-0.2 absolute inset-x-0.5 bottom-0.5 truncate rounded bg-indigo-600 px-1 text-[8px] font-extrabold text-white"
                          title={`${hasEv.title} (${hasEv.time})`}
                        >
                          {hasEv.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">{ev.title}</div>
                    <div className="text-[11px] font-semibold text-slate-500">
                      {ev.date} at {ev.time}
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-700">
                    {ev.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 3-COLUMN GRID: TASKS, STICKY NOTES, REMINDERS */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* TASKS WIDGET */}
        <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600">
                <CheckSquare className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Workspace Tasks</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Task
            </button>
          </div>

          {/* Task Filter Tabs */}
          <div className="mb-3 flex gap-1.5 border-b border-slate-100 pb-2 text-xs font-extrabold">
            {(["All", "Pending", "Completed"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setTasksFilter(tab)}
                className={`rounded-lg px-2 py-0.5 transition ${
                  tasksFilter === tab
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
            {filteredTasksList.map((tk) => (
              <div
                key={tk.id}
                onClick={() => handleToggleTask(tk.id)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 transition ${
                  tk.completed
                    ? "border-slate-100 bg-slate-50/50 opacity-60"
                    : "border-slate-200/80 bg-white shadow-2xs hover:border-indigo-200"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border ${
                      tk.completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {tk.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <span
                    className={`truncate text-xs font-bold ${
                      tk.completed ? "text-slate-400 line-through" : "text-slate-800"
                    }`}
                  >
                    {tk.title}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-extrabold text-slate-400">
                  {tk.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STICKY NOTES WIDGET */}
        <div className="relative flex flex-col rounded-3xl border border-amber-200 bg-linear-to-br from-amber-50/90 to-amber-100/60 p-6 shadow-xs">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm font-extrabold text-amber-950">Sticky Notes (Private)</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddNoteModal(true)}
              className="flex items-center gap-1 rounded-xl border border-amber-300 bg-amber-200/80 px-2.5 py-1 text-xs font-bold text-amber-900 transition hover:bg-amber-300"
            >
              <Plus className="h-3.5 w-3.5" /> Quick Note
            </button>
          </div>

          <div className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
            {stickyNotes.map((note) => (
              <div
                key={note.id}
                className="group relative rounded-2xl border border-amber-200/80 bg-white/90 p-3.5 text-xs font-medium text-amber-950 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2 right-2 hidden text-amber-400 transition group-hover:block hover:text-rose-600"
                  title="Delete Note"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <p className="pr-4 leading-relaxed font-semibold">{note.content}</p>
                <div className="mt-2 text-[10px] font-bold text-amber-600/80">{note.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* REMINDERS WIDGET */}
        <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600">
                <Bell className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Reminders</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddReminderModal(true)}
              className="flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>

          <div className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
            {reminders.map((rm) => (
              <div
                key={rm.id}
                onClick={() => handleToggleReminder(rm.id)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 transition ${
                  rm.completed
                    ? "border-slate-100 bg-slate-50/50 opacity-60"
                    : "border-slate-200/80 bg-white shadow-2xs hover:border-indigo-200"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border ${
                      rm.completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {rm.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <span
                    className={`truncate text-xs font-bold ${
                      rm.completed ? "text-slate-400 line-through" : "text-slate-800"
                    }`}
                  >
                    {rm.text}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-extrabold text-indigo-600">
                  {rm.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL DIALOGS FOR ALL BUTTONS */}
      {/* ========================================================================= */}

      {/* 1. ADD CONTACT MODAL */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Add New Client Contact</h3>
              <button
                onClick={() => setShowAddContactModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddContactSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Role / Title</label>
                <input
                  type="text"
                  placeholder="e.g. CTO / Technical Lead"
                  value={newContact.role}
                  onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  placeholder="alex@client.com"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD REFERRAL MODAL */}
      {showAddReferralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Add New Referral Lead</h3>
              <button
                onClick={() => setShowAddReferralModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddReferralSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Referral Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newReferral.name}
                  onChange={(e) => setNewReferral({ ...newReferral, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  placeholder="rahul@company.com"
                  value={newReferral.email}
                  onChange={(e) => setNewReferral({ ...newReferral, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Phone</label>
                <input
                  type="text"
                  placeholder="+91 99887 76655"
                  value={newReferral.phone}
                  onChange={(e) => setNewReferral({ ...newReferral, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Requirement / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Needs Custom Mobile App Dev"
                  value={newReferral.note}
                  onChange={(e) => setNewReferral({ ...newReferral, note: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-emerald-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReferralModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700"
                >
                  Save Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD TICKET MODAL */}
      {showAddTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Create Support Ticket</h3>
              <button
                onClick={() => setShowAddTicketModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddTicketSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Subject / Issue *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need assistance with SSL Certificate"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Category Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Bug / Billing"
                    value={newTicket.tag}
                    onChange={(e) => setNewTicket({ ...newTicket, tag: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTicketModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ADD CALENDAR EVENT MODAL */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Schedule Calendar Event</h3>
              <button
                onClick={() => setShowAddEventModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddEventSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sprint Review & Demo"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Time</label>
                  <input
                    type="text"
                    placeholder="10:00 AM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Event Type</label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Demo">Demo Call</option>
                  <option value="Contract">Contract Signing</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADD TASK MODAL */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Add Workspace Task</h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Send technical proposal PDF"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Due Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 20"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADD STICKY NOTE MODAL */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-amber-950">Add Sticky Note</h3>
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="text-amber-500 hover:text-amber-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddNoteSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-amber-900">Note Content *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Type call notes, pricing decisions, or private reminders..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-amber-300 bg-white p-3 text-xs font-medium text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddNoteModal(false)}
                  className="rounded-xl border border-amber-300 bg-white px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-amber-700"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ADD REMINDER MODAL */}
      {showAddReminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Set Private Reminder</h3>
              <button
                onClick={() => setShowAddReminderModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddReminderSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Reminder Text *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call client regarding payment clearance"
                  value={newReminder.text}
                  onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Time / Schedule</label>
                <input
                  type="text"
                  placeholder="e.g. Today at 5:00 PM"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-indigo-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReminderModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
