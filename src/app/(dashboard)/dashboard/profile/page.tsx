// src/app/(dashboard)/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { toast } from "@/lib/toast";
import { UserProfile } from "@/components/profile/types";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { GeneralInfoTab } from "@/components/profile/tabs/general-info-tab";
import { TimelineTab } from "@/components/profile/tabs/timeline-tab";
import { SocialTab } from "@/components/profile/tabs/social-tab";
import { SecurityTab } from "@/components/profile/tabs/security-tab";
import { JobTab } from "@/components/profile/tabs/job-tab";
import { ProjectsTab } from "@/components/profile/tabs/projects-tab";
import { FilesTab } from "@/components/profile/tabs/files-tab";
import { TimesheetsTab } from "@/components/profile/tabs/timesheets-tab";
import { LeaveTab } from "@/components/profile/tabs/leave-tab";
import { ExpensesTab } from "@/components/profile/tabs/expenses-tab";
import { PreferencesTab } from "@/components/profile/tabs/preferences-tab";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    role: "user",
    department: "development",
    createdAt: new Date().toISOString(),
    bio: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkAccents, setDarkAccents] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        // Handle both standard { user: ... } and direct user object responses
        const userData = data?.user || data;
        if (userData) {
          setUser({
            name: userData.name || "Team Member",
            email: userData.email || "",
            role: userData.role || "user",
            department: userData.department || "development",
            createdAt: userData.createdAt || new Date().toISOString(),
            bio: userData.bio || "",
            phone: userData.phone || "",
            location: userData.location || "",
            github: userData.github || "",
            linkedin: userData.linkedin || "",
            twitter: userData.twitter || "",
          });

          // Sync secondary states if present in user document
          if (userData.security?.twoFactorEnabled !== undefined) {
            setTwoFactorEnabled(userData.security.twoFactorEnabled);
          }
          if (userData.preferences?.emailAlerts !== undefined) {
            setEmailAlerts(userData.preferences.emailAlerts);
          }
          if (userData.preferences?.darkAccents !== undefined) {
            setDarkAccents(userData.preferences.darkAccents);
          }
        }
      })
      .catch(() => {
        toast.error("Failed to sync profile data");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          department: user.department,
          phone: user.phone,
          location: user.location,
          bio: user.bio,
          github: user.github,
          linkedin: user.linkedin,
          twitter: user.twitter,
        }),
      });

      const contentType = res.headers.get("content-type");
      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.error || `Failed to update profile (Status ${res.status})`);
      }

      if (data?.user) {
        setUser((prev) => ({
          ...prev,
          name: data.user.name || prev.name,
          department: data.user.department || prev.department,
          phone: data.user.phone ?? prev.phone,
          location: data.user.location ?? prev.location,
          bio: data.user.bio ?? prev.bio,
          github: data.user.github ?? prev.github,
          linkedin: data.user.linkedin ?? prev.linkedin,
          twitter: data.user.twitter ?? prev.twitter,
        }));
      }

      toast.success("Profile Updated Successfully", {
        description: "Your Webxode OS administrative parameters are synchronized.",
      });
    } catch (error: any) {
      toast.error("Update failed", { description: error.message || "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex animate-pulse items-center gap-3 text-sm font-semibold text-slate-500">
          <Activity className="h-5 w-5 animate-spin text-indigo-600" />
          <span>Loading admin profile workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-1 flex-col space-y-4 px-3 pb-2 transition-all xl:max-w-360 xl:px-8">
      {/* Header Cover Banner & Admin Stats Strip (Stays static at top) */}
      <div className="shrink-0">
        <ProfileHeader user={user} onEditClick={() => setActiveTab("general")} />
      </div>

      {/* Main Multi-Breakpoint Grid Layout */}
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_1fr] gap-6 xl:grid-cols-12 xl:grid-rows-none xl:gap-8">
        {/* Navigation Sidebar (Sticky horizontal pill bar on mobile/laptop, pinned vertical sidebar on desktop) */}
        <div
          data-lenis-prevent
          className="shrink-0 xl:col-span-3 xl:h-full xl:min-h-0 xl:overflow-y-auto 2xl:col-span-3"
        >
          <ProfileSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
        </div>

        {/* Active Tab Content Card with Internal Mouse Wheel Scrollbar */}
        <div className="flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm xl:col-span-9">
          <div
            data-lenis-prevent
            className="min-h-0 flex-1 touch-pan-y scrollbar-thin scrollbar-thumb-slate-200 overflow-y-auto overscroll-contain p-4 hover:scrollbar-thumb-slate-300 sm:p-6 xl:p-8"
          >
            {activeTab === "general" && (
              <GeneralInfoTab
                user={user}
                onChangeUser={setUser}
                onSave={handleSave}
                saving={saving}
              />
            )}

            {activeTab === "timeline" && <TimelineTab />}

            {activeTab === "social" && (
              <SocialTab user={user} onChangeUser={setUser} onSave={handleSave} saving={saving} />
            )}

            {activeTab === "account" && (
              <SecurityTab
                twoFactorEnabled={twoFactorEnabled}
                onToggleTwoFactor={() => {
                  setTwoFactorEnabled(!twoFactorEnabled);
                  toast.success(twoFactorEnabled ? "2FA Disabled" : "2FA Enabled");
                }}
              />
            )}

            {activeTab === "job" && <JobTab />}

            {activeTab === "projects" && <ProjectsTab />}

            {activeTab === "files" && <FilesTab />}

            {(activeTab === "timesheets" || activeTab === "timecards") && <TimesheetsTab />}

            {activeTab === "leave" && <LeaveTab />}

            {activeTab === "expenses" && <ExpensesTab />}

            {(activeTab === "preferences" || activeTab === "menu") && (
              <PreferencesTab
                darkAccents={darkAccents}
                onToggleDarkAccents={() => setDarkAccents(!darkAccents)}
                emailAlerts={emailAlerts}
                onToggleEmailAlerts={() => setEmailAlerts(!emailAlerts)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
