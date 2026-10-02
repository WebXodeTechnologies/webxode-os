import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 py-16">
      {/* Subtle ambient lighting effect */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-96 rounded-full bg-indigo-600/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-slate-900 pb-12 md:grid-cols-5">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden">
                <Image
                  src="/logos/webxodelogocropped-removebg-preview.png"
                  alt="Webxode Technologies Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">Webxode OS</span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              The internal business operations platform for Webxode Technologies. Centralizing the
              complete lifecycle from lead generation to project delivery and revenue tracking.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Platform
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li>
                <Link
                  href="/sales"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  Sales Pipeline{" "}
                  <span className="text-slate-600 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/presales"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  Presales & Quotations{" "}
                  <span className="text-slate-600 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  Project Delivery{" "}
                  <span className="text-slate-600 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/finance"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  Financial Visibility{" "}
                  <span className="text-slate-600 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/workforce"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  Workforce Management{" "}
                  <span className="text-slate-600 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Company
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About Webxode
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition-colors hover:text-white">
                  System Login
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 font-medium text-indigo-400/90 transition-colors hover:text-indigo-400"
                >
                  Workspace Access →
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture Details */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Operating Philosophy
            </h4>
            <p className="text-xs leading-relaxed text-slate-400 italic">
              &quot;Webxode OS is the operating system for how Webxode does business. Less data.
              Less clicking. More action.&quot;
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 font-mono text-[11px] text-slate-300 shadow-inner">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
              <span>Webxode OS • V1</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 Webxode Technologies. All rights reserved.</span>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span>Developed with</span>
            <Heart className="inline h-3.5 w-3.5 animate-pulse fill-rose-500 text-rose-500" />
            <span>by</span>
            <Link
              href="https://www.webxode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-300 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-white"
            >
              Webxode Technologies
            </Link>
          </div>

          <span className="font-mono text-[11px] tracking-wide text-slate-500">
            Architect for the future. Build for the present.
          </span>
        </div>
      </div>
    </footer>
  );
}
