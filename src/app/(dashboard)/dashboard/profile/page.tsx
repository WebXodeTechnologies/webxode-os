// src/app/(dashboard)/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { toast } from "sonner";
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
    name: "AKASH",
    email: "admin@webxode.com",
    role: "admin",
    department: "Development",
    createdAt: new Date().toISOString(),
    bio: "Founder @ Webxode Technologies",
    phone: "+91 9345336311",
    location: "Namakkal",
    github: "https://github.com/ak220193",
    linkedin: "https://linkedin.com/in/akashsm-dev/",
    twitter: "https://x.com/akashsm_dev",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkAccents, setDarkAccents] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser((prev) => ({
            ...prev,
            name: data.user.name || prev.name,
            email: data.user.email || prev.email,
            role: data.user.role || prev.role,
            department: data.user.department || prev.department,
            createdAt: data.user.createdAt || prev.createdAt,
          }));
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
    <div className="mx-auto w-full max-w-7xl space-y-6 px-0 pb-2 transition-all min-[1920px]:max-w-[115rem] min-[2560px]:max-w-[140rem] sm:space-y-8 sm:px-2 sm:pb-4 md:px-4 lg:space-y-8 xl:max-w-360 xl:px-6 2xl:max-w-[100rem] 2xl:px-8">
      {/* Header Cover Banner & Admin Stats Strip */}
      <ProfileHeader user={user} onEditClick={() => setActiveTab("general")} />

      {/* Main Multi-Breakpoint Grid Layout across sm, md, lg (1024px laptop), xl, 2xl, 4xl */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:gap-8">
        {/* Navigation Sidebar (Mobile & Laptop Horizontal Pill Bar, Vertical Sidebar on XL+ Desktop) */}
        <div className="min-[2560px]:col-span-2 xl:col-span-3 2xl:col-span-3">
          <ProfileSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
        </div>

        {/* Active Tab Content Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm min-[2560px]:col-span-10 min-[2560px]:p-16 sm:p-6 lg:p-8 xl:col-span-9 xl:p-10 2xl:col-span-9 2xl:p-12">
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
  );
}
