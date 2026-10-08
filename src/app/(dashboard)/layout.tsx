"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="fixed flex h-screen w-full overflow-auto bg-slate-50/80 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* React Hot Toast Provider */}
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
        }}
      />

      {/* Sidebar Component */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Right Content Column with Smooth Scrollable Main Container */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 focus:outline-none sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[110rem] space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
