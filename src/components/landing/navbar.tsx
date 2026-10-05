"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useMarketingTheme } from "./theme-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useMarketingTheme();

  const isDark = theme === "dark";

  // Lock background scrolling when full-screen mobile menu drawer is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [mobileMenuOpen]);

  // Handle ESC key press to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (typeof document !== "undefined") {
          document.body.style.overflow = "";
        }
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Smooth scroll and drawer close handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    }
  };

  return (
    <>
      {/* Sticky Top Header */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300 ${
          isDark
            ? "border-slate-800/80 bg-slate-950/85 text-white"
            : "border-slate-200/80 bg-white/85 text-slate-900 shadow-2xs"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="group flex items-center space-x-3">
              <div
                className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border p-1.5 shadow-xs transition-transform group-hover:scale-105 ${
                  isDark
                    ? "border-slate-800 bg-slate-900/90 group-hover:border-indigo-500/50"
                    : "border-slate-200 bg-white group-hover:border-indigo-300"
                }`}
              >
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Technologies Logo"
                  width={50}
                  height={50}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-base font-bold tracking-tight transition-colors ${
                    isDark
                      ? "text-white group-hover:text-indigo-300"
                      : "text-slate-900 group-hover:text-indigo-600"
                  }`}
                >
                  Webxode <span className="font-extrabold text-indigo-500">OS</span>
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wider uppercase ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Enterprise v2.0
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden items-center space-x-6 text-sm font-semibold md:flex ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            <Link
              href="#features"
              className={`transition-colors ${isDark ? "hover:text-indigo-400" : "hover:text-indigo-600"}`}
            >
              Features
            </Link>
            <Link
              href="#modules"
              className={`transition-colors ${isDark ? "hover:text-indigo-400" : "hover:text-indigo-600"}`}
            >
              Modules
            </Link>
            <Link
              href="#why-webxode"
              className={`transition-colors ${isDark ? "hover:text-indigo-400" : "hover:text-indigo-600"}`}
            >
              Why OS
            </Link>
            <Link
              href="#impact"
              className={`transition-colors ${isDark ? "hover:text-indigo-400" : "hover:text-indigo-600"}`}
            >
              Impact
            </Link>
            <Link
              href="#faq"
              className={`transition-colors ${isDark ? "hover:text-indigo-400" : "hover:text-indigo-600"}`}
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Action Cluster + Theme Toggle */}
          <div className="hidden items-center space-x-3 md:flex">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 ${
                  isDark
                    ? "border-slate-800 bg-slate-900 text-amber-400 hover:border-amber-400/50 hover:bg-slate-800"
                    : "border-slate-200 bg-slate-100 text-indigo-600 hover:border-indigo-300 hover:bg-slate-200"
                }`}
                title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            <Link
              href="/login"
              className={`text-sm font-semibold transition-colors ${
                isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-600/40 active:scale-95"
            >
              <span>Launch OS</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Right Cluster (Theme Toggle + Hamburger) */}
          <div className="flex items-center space-x-2 md:hidden">
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  isDark
                    ? "border-slate-800 bg-slate-900 text-amber-400"
                    : "border-slate-200 bg-slate-100 text-indigo-600"
                }`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                isDark
                  ? "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"
                  : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Modal */}
      {mobileMenuOpen && (
        <div
          className={`animate-in fade-in fixed inset-0 z-50 flex h-full w-full flex-col duration-150 md:hidden ${
            isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
          }`}
        >
          {/* Drawer Top Header */}
          <div
            className={`flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6 ${
              isDark ? "border-slate-800/80 bg-slate-950" : "border-slate-200 bg-white"
            }`}
          >
            <Link
              href="/"
              onClick={() => {
                if (typeof document !== "undefined") document.body.style.overflow = "";
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3"
            >
              <div
                className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border p-1.5 shadow-xs ${
                  isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-100"
                }`}
              >
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Technologies Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  Webxode <span className="font-extrabold text-indigo-500">OS</span>
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wider uppercase ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Enterprise v2.0
                </span>
              </div>
            </Link>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                if (typeof document !== "undefined") document.body.style.overflow = "";
                setMobileMenuOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-500 shadow-xs transition-all hover:bg-rose-500 hover:text-white active:scale-95"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-8 sm:px-6">
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "#features")}
              className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all ${
                isDark
                  ? "text-slate-200 hover:bg-slate-900 hover:text-indigo-400"
                  : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
              }`}
            >
              <span>Features</span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#modules"
              onClick={(e) => handleNavClick(e, "#modules")}
              className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all ${
                isDark
                  ? "text-slate-200 hover:bg-slate-900 hover:text-indigo-400"
                  : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
              }`}
            >
              <span>Modules Showcase</span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#why-webxode"
              onClick={(e) => handleNavClick(e, "#why-webxode")}
              className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all ${
                isDark
                  ? "text-slate-200 hover:bg-slate-900 hover:text-indigo-400"
                  : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
              }`}
            >
              <span>Why Webxode OS</span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#impact"
              onClick={(e) => handleNavClick(e, "#impact")}
              className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all ${
                isDark
                  ? "text-slate-200 hover:bg-slate-900 hover:text-indigo-400"
                  : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
              }`}
            >
              <span>Impact & ROI</span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "#faq")}
              className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all ${
                isDark
                  ? "text-slate-200 hover:bg-slate-900 hover:text-indigo-400"
                  : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
              }`}
            >
              <span>FAQ</span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Drawer Fixed Footer Cluster */}
          <div
            className={`shrink-0 space-y-3 border-t px-4 py-5 sm:px-6 ${
              isDark ? "border-slate-800/80 bg-slate-950" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs font-semibold">System Operational</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">99.9% Uptime</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/login"
                onClick={() => {
                  if (typeof document !== "undefined") document.body.style.overflow = "";
                  setMobileMenuOpen(false);
                }}
                className={`w-full rounded-xl border py-3 text-center text-sm font-semibold transition-all ${
                  isDark
                    ? "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Sign In
              </Link>

              <Link
                href="/dashboard"
                onClick={() => {
                  if (typeof document !== "undefined") document.body.style.overflow = "";
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98]"
              >
                <span>Launch OS</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
