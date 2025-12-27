"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.25 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex items-center justify-between py-6">
              <div className="text-xs tracking-[0.25em] uppercase opacity-85">
                Menu
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-xs tracking-[0.2em] uppercase"
              >
                Close
              </button>
            </div>

            <div className="mt-10 grid gap-6">
              <Link onClick={onClose} href="/" className="text-3xl md:text-5xl tracking-tight">
                Home
              </Link>
              <Link onClick={onClose} href="/projects" className="text-3xl md:text-5xl tracking-tight">
                Portfolio
              </Link>
              <Link onClick={onClose} href="/#about" className="text-3xl md:text-5xl tracking-tight">
                About
              </Link>
              <Link onClick={onClose} href="/#contact" className="text-3xl md:text-5xl tracking-tight">
                Contact
              </Link>
            </div>

            <div className="mt-16 text-sm text-[var(--muted)]">
              Minimal. Fast. Mobile-first.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
