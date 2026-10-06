"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* React Hot Toast Provider configured for top-center position */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(255, 255, 255, 0.96)",
            border: "1px solid rgba(226, 232, 240, 0.95)",
            color: "#0f172a",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
            borderRadius: "1rem",
            padding: "0.875rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: "600",
          },
          success: {
            iconTheme: {
              primary: "#6366f1",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
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

      {/* Right Content Column (Pinned Navbar + Scrollable Main Viewport) */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Main Viewport Container (Scrolling handled by inner page containers) */}
        <main data-lenis-prevent className="flex min-h-0 flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex min-h-0 w-full max-w-[105rem] flex-1 flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
