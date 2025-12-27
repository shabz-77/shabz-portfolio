"use client";

import Link from "next/link";
import { useState } from "react";
import MenuOverlay from "@/components/MenuOverlay";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mt-3 flex items-center justify-between rounded-full border border-[var(--line)] bg-black/30 px-4 py-3 backdrop-blur">
            <Link href="/" className="text-xs tracking-[0.25em] uppercase opacity-90">
              SHAHBAAZ NILGIRIWALA
            </Link>

            <nav className="hidden items-center gap-6 text-xs tracking-[0.22em] uppercase opacity-85 md:flex">
              <Link href="/#services" className="hover:opacity-100">Services</Link>
              <Link href="/#about" className="hover:opacity-100">About</Link>
              <Link href="/projects" className="hover:opacity-100">Portfolio</Link>

              <Link
                href="/#contact"
                className="ml-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-black"
              >
                CONTACT <span className="text-black/70">↘</span>
              </Link>

              <button
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)]"
                aria-label="Open menu"
              >
                <span className="text-lg leading-none">•••</span>
              </button>
            </nav>

            {/* Mobile: only menu button */}
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] md:hidden"
              aria-label="Open menu"
            >
              <span className="text-lg leading-none">•••</span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
