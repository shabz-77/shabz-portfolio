"use client";

import Link from "next/link";

export default function HeaderClient() {
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

            {/* Right */}
            <nav className="flex items-center gap-6">
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

              {/* 3-dot button */}
              <button
                type="button"
                aria-label="Menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 transition"
                onClick={() => {
                  // later we can open an overlay menu here
                  console.log("menu");
                }}
              >
                <span className="text-lg leading-none">⋯</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
