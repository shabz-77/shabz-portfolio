"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTransitionWipe } from "@/components/RouteTransition";
import { getProjectsByCategory, type CategoryKey, type Project } from "@/content/projects";

function normalizeCategory(raw: string | undefined): CategoryKey | null {
  const v = (raw ?? "").toLowerCase().trim();
  if (v === "automotive" || v === "auto" || v === "automotive-design") return "automotive";
  if (v === "livery" || v === "livery-design") return "livery";
  return null;
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/6 text-left transition hover:border-white/20"
    >
      {/* slightly shorter than category cards */}
      <div className="relative aspect-[12/5] w-full">
        <Image
          src={project.thumb}
          alt={project.title}
          fill
          className="object-cover opacity-95 group-hover:opacity-100 transition"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/12" />
      </div>

      <div className="p-6">
        <div className="text-2xl md:text-3xl font-light uppercase tracking-tight text-white">
          {project.title}
        </div>

        <div className="mt-2 text-sm text-white/75">
          {project.comingSoon ? "Under development ↘" : "View project ↘"}
        </div>
      </div>
    </button>
  );
}

export default function CategoryClient({ categoryParam }: { categoryParam: string }) {
  const router = useRouter();
  const { go } = useTransitionWipe();

  const category = useMemo(() => normalizeCategory(categoryParam), [categoryParam]);

  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  if (!category) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-[900px] px-4 text-white/80">
          Category not found.
        </div>
      </main>
    );
  }

  const title = category === "automotive" ? "Automotive Design" : "Livery Design";
  const list = getProjectsByCategory(category);

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-[1100px] px-4">
        <button
          onClick={() => go(router, "/projects")}
          className="mt-10 text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white/80"
          type="button"
        >
          ← Back
        </button>

        <h1 className="mt-4 text-3xl md:text-5xl font-light uppercase tracking-tight text-white">
          {title}
        </h1>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {list.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              onClick={() => {
                if (p.comingSoon) {
                  setComingSoonOpen(true);
                  return;
                }
                go(router, `/projects/${p.category}/${p.slug}`);
              }}
            />
          ))}
        </div>

        <div className="h-20" />
      </div>

      {/* Coming soon popup */}
      <AnimatePresence>
        {comingSoonOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/65"
              onClick={() => setComingSoonOpen(false)}
            />
            <motion.div
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[520px] rounded-2xl border border-white/14 bg-[#0b0b0b] p-6 text-white"
            >
              <div className="text-xs tracking-[0.25em] uppercase text-white/60">
                Coming soon
              </div>
              <div className="mt-3 text-xl md:text-2xl font-light uppercase tracking-tight">
                This project is under development
              </div>
              <div className="mt-3 text-sm text-white/80 leading-relaxed">
                It will be released late April.
              </div>

              <button
                type="button"
                onClick={() => setComingSoonOpen(false)}
                className="mt-6 inline-flex rounded-full border border-white/18 px-5 py-3 text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white"
              >
                Close ↘
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
