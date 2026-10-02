"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 p-1.5 shadow-inner transition-transform group-hover:scale-105 group-hover:border-indigo-500/50">
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Technologies Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-indigo-300">
                  Webxode <span className="font-extrabold text-indigo-400">OS</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                  Enterprise v2.0
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 text-sm font-medium text-slate-300 md:flex">
            <Link href="#features" className="transition-colors hover:text-indigo-400">
              Features
            </Link>
            <Link href="#modules" className="transition-colors hover:text-indigo-400">
              Modules
            </Link>
            <Link href="#why-webxode" className="transition-colors hover:text-indigo-400">
              Why OS
            </Link>
            <Link href="#impact" className="transition-colors hover:text-indigo-400">
              Impact
            </Link>
            <Link href="#faq" className="transition-colors hover:text-indigo-400">
              FAQ
            </Link>
          </nav>

          {/* Desktop Action Cluster */}
          <div className="hidden items-center space-x-2 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
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

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-200 shadow-inner transition-colors hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Modal (Mounted only when open to prevent horizontal whitespace) */}
      {mobileMenuOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex h-full w-full flex-col bg-slate-950 text-white duration-150 md:hidden">
          {/* Drawer Top Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-950 px-4 sm:px-6">
            <Link
              href="/"
              onClick={() => {
                if (typeof document !== "undefined") document.body.style.overflow = "";
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3"
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-inner">
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Technologies Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white">
                  Webxode <span className="font-extrabold text-indigo-400">OS</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                  Enterprise v2.0
                </span>
              </div>
            </Link>

            {/* High Contrast Red Close Button */}
            <button
              type="button"
              onClick={() => {
                if (typeof document !== "undefined") document.body.style.overflow = "";
                setMobileMenuOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-400 shadow-md transition-all hover:border-rose-500 hover:bg-rose-500 hover:text-white focus:outline-none active:scale-95"
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
              className="group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-indigo-500/40 hover:bg-slate-900 hover:text-indigo-400"
            >
              <span>Features</span>
              <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
            </a>

            <a
              href="#modules"
              onClick={(e) => handleNavClick(e, "#modules")}
              className="group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-indigo-500/40 hover:bg-slate-900 hover:text-indigo-400"
            >
              <span>Modules Showcase</span>
              <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
            </a>

            <a
              href="#why-webxode"
              onClick={(e) => handleNavClick(e, "#why-webxode")}
              className="group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-indigo-500/40 hover:bg-slate-900 hover:text-indigo-400"
            >
              <span>Why Webxode OS</span>
              <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
            </a>

            <a
              href="#impact"
              onClick={(e) => handleNavClick(e, "#impact")}
              className="group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-indigo-500/40 hover:bg-slate-900 hover:text-indigo-400"
            >
              <span>Impact & ROI</span>
              <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
            </a>

            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "#faq")}
              className="group flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-indigo-500/40 hover:bg-slate-900 hover:text-indigo-400"
            >
              <span>FAQ</span>
              <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
            </a>
          </div>

          {/* Drawer Fixed Footer Cluster */}
          <div className="shrink-0 space-y-3 border-t border-slate-800/80 bg-slate-950 px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400">
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
                className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 text-center text-sm font-semibold text-slate-200 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
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
