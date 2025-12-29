"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeaderClient() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[50]">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="mt-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
          <div className="flex items-center justify-between px-5 py-3">
            {/* Left */}
            <Link
              href="/"
              className="text-xs tracking-[0.25em] uppercase text-white/75 hover:text-white transition"
            >
              Home
            </Link>

            {/* Right - Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/projects"
                className="text-xs tracking-[0.25em] uppercase text-white/65 hover:text-white transition"
              >
                Projects
              </Link>

              <Link
                href="/#contact"
                className="text-xs tracking-[0.25em] uppercase text-white/65 hover:text-white transition"
              >
                Contact
              </Link>
            </nav>

            {/* Right - Mobile menu */}
            <div className="relative md:hidden" ref={menuRef}>
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={open}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 transition"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="text-lg leading-none">⋯</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md shadow-lg">
                  <Link
                    href="/projects"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-xs tracking-[0.25em] uppercase text-white/80 hover:bg-white/5 transition"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-xs tracking-[0.25em] uppercase text-white/80 hover:bg-white/5 transition"
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
