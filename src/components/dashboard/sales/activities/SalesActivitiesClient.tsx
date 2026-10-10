"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ActivityHeader } from "./ActivityHeader";
import { ActivityMetricsGrid } from "./ActivityMetricsGrid";
import { ActivityFilterToolbar } from "./ActivityFilterToolbar";
import { ActivityTimelineStream } from "./ActivityTimelineStream";
import {
  DateRangeFilter,
  ActivityFilterState,
  ActivityLogItem,
  INITIAL_METRICS,
  INITIAL_ACTIVITY_LOGS,
  MOCK_SALES_REPS,
} from "./types";

export const SalesActivitiesClient: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeFilter>("This Week");
  const [filters, setFilters] = useState<ActivityFilterState>({
    repId: "all",
    actionType: "all",
    dateRange: "This Week",
    searchQuery: "",
  });
  const [logs, setLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  // Filter logs based on repId, actionType, and searchQuery
  const filteredLogs = logs.filter((item) => {
    const matchesRep = filters.repId === "all" || item.repId === filters.repId;
    const matchesAction = filters.actionType === "all" || item.actionType === filters.actionType;
    const matchesSearch =
      filters.searchQuery === "" ||
      item.clientCompany.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      item.clientContact.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      item.repName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesRep && matchesAction && matchesSearch;
  });

  const handleToggleVerification = (id: string) => {
    setLogs((prev) =>
      prev.map((log) => {
        if (log.id === id) {
          const nextState = !log.isVerified;
          toast.success(
            nextState
              ? `Log #${id} verified by audit manager`
              : `Log #${id} marked as pending review`,
            {
              style: {
                borderRadius: "14px",
                background: "#0f172a",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "700",
              },
            }
          );
          return { ...log, isVerified: nextState };
        }
        return log;
      })
    );
  };

  const handleAddManagerNote = (id: string, note: string) => {
    setLogs((prev) =>
      prev.map((log) => {
        if (log.id === id) {
          return { ...log, managerNote: note, isVerified: true };
        }
        return log;
      })
    );
  };

  const handleExportCSV = () => {
    // Generate CSV string
    const headers =
      "Log ID,Rep Name,Client Company,Action Type,Outcome,Timestamp,Deal Value (INR)\n";
    const rows = filteredLogs
      .map(
        (l) =>
          `"${l.id}","${l.repName}","${l.clientCompany}","${l.actionType}","${l.outcome}","${l.timestamp}","${l.dealValueINR || 0}"`
      )
      .join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `sales_activity_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setFilters({
      repId: "all",
      actionType: "all",
      dateRange: selectedDateRange,
      searchQuery: "",
    });
    toast.success("Filters reset to default view", {
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "700",
      },
    });
  };

  return (
    <div className="min-h-screen space-y-6 p-4 sm:p-6 lg:p-8">
      {/* 1. Top Management Header Bar */}
      <ActivityHeader
        selectedDateRange={selectedDateRange}
        onDateRangeChange={(range) => {
          setSelectedDateRange(range);
          setFilters((prev) => ({ ...prev, dateRange: range }));
        }}
        onExportCSV={handleExportCSV}
        totalLogsCount={filteredLogs.length}
      />

      {/* 2. High-Impact Activity Metrics Scorecards */}
      <ActivityMetricsGrid metrics={metrics} />

      {/* 3. Advanced Activity Filter Toolbar */}
      <ActivityFilterToolbar
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={handleResetFilters}
        filteredCount={filteredLogs.length}
        totalCount={logs.length}
      />

      {/* 4. Chronological Audit Log Stream */}
      <ActivityTimelineStream
        logs={filteredLogs}
        onToggleVerification={handleToggleVerification}
        onAddManagerNote={handleAddManagerNote}
      />
    </div>
  );
};
