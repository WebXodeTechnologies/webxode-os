// src/components/landing/navbar.tsx
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logos/webxodelogocropped-removebg-preview.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden">
              <Image
                src={logo}
                alt="Webxode Technologies Logo"
                unoptimized
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-semibold tracking-normal text-slate-900">
                Webxode OS
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-900 md:flex">
          <Link href="/features" className="transition-colors hover:text-slate-900">
            Features
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-slate-900">
            Pricing
          </Link>
          <Link href="/about" className="transition-colors hover:text-slate-900">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-slate-900">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-slate-900 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            Launch OS
          </Link>
        </div>
      </div>
    </header>
  );
}
