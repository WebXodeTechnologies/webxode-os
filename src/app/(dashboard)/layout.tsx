"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sonner Toast Provider configured for Upscaled Light Dashboard Theme */}
      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.96)",
            border: "1px solid rgba(226, 232, 240, 0.95)",
            color: "#0f172a",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
            borderRadius: "1rem",
            padding: "1rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: "600",
          },
        }}
      />

      {/* Sidebar Component (Desktop Sticky + Mobile Drawer) */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="mx-auto w-full max-w-[1700px] flex-1 p-4 sm:p-6 lg:p-6 xl:p-8 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
