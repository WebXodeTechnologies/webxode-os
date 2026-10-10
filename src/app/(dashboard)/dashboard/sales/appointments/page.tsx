"use client";

import React, { useState } from "react";
import {
  AppointmentsHeader,
  ClientOption,
} from "@/components/sales/appointments/AppointmentsHeader";
import {
  AppointmentsCalendarView,
  AppointmentEvent,
} from "@/components/sales/appointments/AppointmentsCalendarView";
import { AppointmentsAgendaList } from "@/components/sales/appointments/AppointmentsAgendaList";
import { BookAppointmentModal } from "@/components/sales/appointments/BookAppointmentModal";
import { EventDetailsModal } from "@/components/sales/appointments/EventDetailsModal";
import { toast } from "@/lib/toast";

const CLIENTS: ClientOption[] = [
  { id: "1", name: "Murugan P.", company: "Annai Agro Tradings" },
  { id: "2", name: "Priya Sundaram", company: "Kovai Silk Textiles" },
  { id: "3", name: "Vikram Sethi", company: "Zenith Tech Labs" },
  { id: "4", name: "Rajesh Kumar", company: "Sri Ram Logistics" },
  { id: "5", name: "Meenakshi R.", company: "Heritage Handlooms" },
  { id: "6", name: "Deepak Verma", company: "Apex Industrial Solutions" },
];

const INITIAL_EVENTS: AppointmentEvent[] = [
  {
    id: "evt-101",
    clientId: "1",
    clientName: "Murugan P.",
    company: "Annai Agro Tradings",
    title: "B2B SaaS Platform Product Demo & Technical Q&A",
    date: "2026-10-10",
    time: "11:30 AM",
    duration: "45 mins",
    type: "Product Demo",
    status: "Scheduled",
    location: "Google Meet",
    meetingUrl: "https://meet.google.com/wbx-annai-demo",
    notes: "Demonstrate inventory management, GST invoice generation, and custom order workflows.",
    assignedRep: "Karthik Raja",
  },
  {
    id: "evt-102",
    clientId: "2",
    clientName: "Priya Sundaram",
    company: "Kovai Silk Textiles",
    title: "Discovery Call: Flutter Mobile App Architecture & SOW",
    date: "2026-10-10",
    time: "02:00 PM",
    duration: "30 mins",
    type: "Discovery Call",
    status: "Scheduled",
    location: "Google Meet",
    meetingUrl: "https://meet.google.com/wbx-kovai-app",
    notes:
      "Discuss e-commerce mobile app features, push notifications, and payment gateway options.",
    assignedRep: "Ananya M.",
  },
  {
    id: "evt-103",
    clientId: "3",
    clientName: "Vikram Sethi",
    company: "Zenith Tech Labs",
    title: "Contract Review & Milestone Sign-off Sync",
    date: "2026-10-14",
    time: "10:00 AM",
    duration: "60 mins",
    type: "Contract Review",
    status: "Scheduled",
    location: "Google Meet",
    meetingUrl: "https://meet.google.com/wbx-zenith-contract",
    notes: "Finalize payment schedules and NDA agreement clauses.",
    assignedRep: "Siddharth V.",
  },
  {
    id: "evt-104",
    clientId: "4",
    clientName: "Rajesh Kumar",
    company: "Sri Ram Logistics",
    title: "Fleet Tracking Integration Check-in Call",
    date: "2026-10-16",
    time: "04:00 PM",
    duration: "30 mins",
    type: "Follow-up Call",
    status: "Scheduled",
    location: "Phone Call",
    notes: "Review API documentation provided for GPS device integration.",
    assignedRep: "Karthik Raja",
  },
  {
    id: "evt-105",
    clientId: "5",
    clientName: "Meenakshi R.",
    company: "Heritage Handlooms",
    title: "Reminder: Send Revised Quotation for Shopify Theme",
    date: "2026-10-18",
    time: "11:00 AM",
    duration: "15 mins",
    type: "Reminder",
    status: "Scheduled",
    location: "Internal Reminder",
    notes: "Prepare proposal draft for custom theme redesign.",
    assignedRep: "Ananya M.",
  },
  {
    id: "evt-106",
    clientId: "6",
    clientName: "Deepak Verma",
    company: "Apex Industrial Solutions",
    title: "Post-Onboarding Follow-up & Sprint Review",
    date: "2026-10-22",
    time: "03:30 PM",
    duration: "45 mins",
    type: "Product Demo",
    status: "Scheduled",
    location: "Google Meet",
    meetingUrl: "https://meet.google.com/wbx-apex-sync",
    notes: "Review Sprint 1 deliverables with IT head.",
    assignedRep: "Siddharth V.",
  },
];

export default function AppointmentsPage() {
  const [events, setEvents] = useState<AppointmentEvent[]>(INITIAL_EVENTS);
  const [selectedClientId, setSelectedClientId] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"month" | "agenda">("month");

  // Date Navigation State
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // October (0-indexed: 9)

  // Modal States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null);
  const [prefilledDateToBook, setPrefilledDateToBook] = useState<string | undefined>(undefined);

  // Month Text
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
  const currentDateText = `${monthNames[currentMonth]} ${currentYear}`;

  const handlePrevDate = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextDate = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(9); // October
  };

  // Filtered Events by Selected Client
  const visibleEvents = events.filter((evt) => {
    if (selectedClientId === "all") return true;
    return evt.clientId === selectedClientId;
  });

  // Calculate Stats
  const totalThisMonth = visibleEvents.length;
  const upcomingCalls = visibleEvents.filter(
    (e) => e.type === "Discovery Call" || e.type === "Follow-up Call"
  ).length;
  const demosScheduled = visibleEvents.filter((e) => e.type === "Product Demo").length;
  const remindersCount = visibleEvents.filter((e) => e.type === "Reminder").length;

  // Handlers
  const handleToggleStatus = (id: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === id) {
          const newStatus = evt.status === "Completed" ? "Scheduled" : "Completed";
          toast.success(`Event ${newStatus === "Completed" ? "Completed" : "Re-opened"}`, {
            description: evt.title,
          });
          return { ...evt, status: newStatus };
        }
        return evt;
      })
    );
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
    toast.success("Event Deleted");
  };

  const handleSaveAppointment = (eventData: any) => {
    const newEvt: AppointmentEvent = {
      id: `evt-${Date.now().toString().slice(-4)}`,
      clientId: eventData.clientId,
      clientName: eventData.clientName,
      company: eventData.company,
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      duration: eventData.duration,
      type: eventData.type,
      status: "Scheduled",
      location: eventData.location,
      meetingUrl: eventData.meetingUrl,
      notes: eventData.notes,
      assignedRep: "Karthik Raja",
    };

    setEvents([newEvt, ...events]);
  };

  const handleSelectDateToBook = (dateStr: string) => {
    setPrefilledDateToBook(dateStr);
    setIsBookModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Appointments Header & Filter Bar */}
      <AppointmentsHeader
        clients={CLIENTS}
        selectedClientId={selectedClientId}
        onSelectClient={setSelectedClientId}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        currentDateText={currentDateText}
        onPrevDate={handlePrevDate}
        onNextDate={handleNextDate}
        onToday={handleToday}
        onBookAppointment={() => {
          setPrefilledDateToBook(undefined);
          setIsBookModalOpen(true);
        }}
        onQuickLogEvent={() => {
          setPrefilledDateToBook("2026-10-10");
          setIsBookModalOpen(true);
        }}
        stats={{
          totalThisMonth,
          upcomingCalls,
          demosScheduled,
          remindersCount,
        }}
      />

      {/* Main View Mode Content (Month Grid vs Agenda List) */}
      {viewMode === "month" ? (
        <AppointmentsCalendarView
          currentYear={currentYear}
          currentMonth={currentMonth}
          events={visibleEvents}
          onSelectEvent={(evt) => {
            setSelectedEvent(evt);
            setIsDetailsModalOpen(true);
          }}
          onSelectDateToBook={handleSelectDateToBook}
        />
      ) : (
        <AppointmentsAgendaList
          events={visibleEvents}
          onSelectEvent={(evt) => {
            setSelectedEvent(evt);
            setIsDetailsModalOpen(true);
          }}
          onToggleStatus={handleToggleStatus}
          onDeleteEvent={handleDeleteEvent}
          onBookAppointment={() => {
            setPrefilledDateToBook(undefined);
            setIsBookModalOpen(true);
          }}
        />
      )}

      {/* Modals */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        clients={CLIENTS}
        prefilledDate={prefilledDateToBook}
        onSaveAppointment={handleSaveAppointment}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={selectedEvent}
        onToggleStatus={handleToggleStatus}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}
