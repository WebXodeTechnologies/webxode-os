"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ActivityHeader } from "./ActivityHeader";
import { ActivityKpiOverview } from "./ActivityKpiOverview";
import { SalesActivityTimeline } from "./SalesActivityTimeline";
import { RepReviewScorecard } from "./RepReviewScorecard";
import { ClientRelationshipMatrix } from "./ClientRelationshipMatrix";
import { LogActivityModal } from "./LogActivityModal";
import { MonthEndReviewModal } from "./MonthEndReviewModal";
import { WEBXODE_SALES_REPS, INITIAL_WEBXODE_ACTIVITIES, SalesActivity } from "./types";

export function ActivityPageClient() {
  const [selectedRep, setSelectedRep] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("this_month");
  const [activities, setActivities] = useState<SalesActivity[]>(INITIAL_WEBXODE_ACTIVITIES);
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const handleToggleManagerReview = (id: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const nextState = !act.isManagerVerified;
          toast.success(nextState ? "Marked as Manager Verified" : "Marked as Pending Audit");
          return { ...act, isManagerVerified: nextState };
        }
        return act;
      })
    );
  };

  const handleAddManagerNote = (id: string, note: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          toast.success("Manager audit note updated!");
          return { ...act, managerNotes: note, isManagerVerified: true };
        }
        return act;
      })
    );
  };

  const handleAddActivity = (newActivity: SalesActivity) => {
    setActivities((prev) => [newActivity, ...prev]);
    toast.success("New sales activity logged successfully!");
  };

  const reviewReadinessScore = Math.round(
    WEBXODE_SALES_REPS.reduce((acc, r) => acc + r.auditScore, 0) / WEBXODE_SALES_REPS.length
  );

  return (
    <div className="min-h-screen space-y-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header Controls */}
      <ActivityHeader
        reps={WEBXODE_SALES_REPS}
        selectedRep={selectedRep}
        onRepChange={setSelectedRep}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onOpenLogModal={() => setIsLogModalOpen(true)}
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
        reviewReadinessScore={reviewReadinessScore}
      />

      {/* 2. Top Metric KPIs */}
      <ActivityKpiOverview
        activities={activities}
        reps={WEBXODE_SALES_REPS}
        selectedRep={selectedRep}
      />

      {/* 3. Sales Rep Performance Scorecards */}
      <RepReviewScorecard
        reps={WEBXODE_SALES_REPS}
        selectedRep={selectedRep}
        onSelectRep={setSelectedRep}
      />

      {/* 4. Live Activity Audit Stream & Lead Matrix Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Activity Audit Stream (2 cols) */}
        <div className="lg:col-span-2">
          <SalesActivityTimeline
            activities={activities}
            selectedRep={selectedRep}
            onToggleManagerReview={handleToggleManagerReview}
            onAddManagerNote={handleAddManagerNote}
          />
        </div>

        {/* Lead Account Health Matrix (1 col) */}
        <div>
          <ClientRelationshipMatrix selectedRep={selectedRep} />
        </div>
      </div>

      {/* 5. Modals */}
      <LogActivityModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        reps={WEBXODE_SALES_REPS}
        onAddActivity={handleAddActivity}
      />

      <MonthEndReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reps={WEBXODE_SALES_REPS}
        selectedRep={selectedRep}
        activities={activities}
      />
    </div>
  );
}
