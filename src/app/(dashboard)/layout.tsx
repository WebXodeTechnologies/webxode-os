"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sonner Toast Provider configured for Light Dashboard Theme */}
      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(226, 232, 240, 0.9)",
            color: "#0f172a",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
          },
        }}
      />

      {/* Sidebar Component (Desktop Sticky + Mobile Drawer) */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
