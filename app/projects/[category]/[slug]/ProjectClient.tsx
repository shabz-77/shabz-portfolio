"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTransitionWipe } from "@/components/RouteTransition";
import {
  getProjectsByCategory,
  getProject,
  type CategoryKey,
  type Project,
} from "@/content/projects";

function normalizeCategory(raw: string | undefined): CategoryKey | null {
  const v = (raw ?? "").toLowerCase().trim();
  if (v === "automotive" || v === "auto" || v === "automotive-design")
    return "automotive";
  if (v === "livery" || v === "livery-design") return "livery";
  return null;
}

function NavCard({
  label,
  project,
  onClick,
}: {
  label: "Previous" | "Next";
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/6 text-left transition hover:border-white/20"
    >
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

      <div className="p-5">
        <div className="text-xs tracking-[0.25em] uppercase text-white/55">
          {label}
        </div>
        <div className="mt-2 text-xl md:text-2xl font-light uppercase tracking-tight text-white">
          {project.title}
        </div>
        <div className="mt-2 text-sm text-white/75">View project ↘</div>
      </div>
    </button>
  );
}

export default function ProjectClient({
  categoryParam,
  slugParam,
}: {
  categoryParam: string;
  slugParam: string;
}) {
  const router = useRouter();
  const { go } = useTransitionWipe();

  const category = useMemo(
    () => normalizeCategory(categoryParam),
    [categoryParam]
  );

  const project = useMemo(
    () => (category ? getProject(category, slugParam) : null),
    [category, slugParam]
  );

  const siblings = useMemo(
    () => (category ? getProjectsByCategory(category) : []),
    [category]
  );

  const idx = useMemo(
    () => siblings.findIndex((p) => p.slug === slugParam),
    [siblings, slugParam]
  );

  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  if (!category || !project) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-[900px] px-4 text-white/80">
          Project not found.
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-[1100px] px-4">
        <button
          onClick={() => go(router, `/projects/${project.category}`)}
          className="mt-10 text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white/80"
          type="button"
        >
          ← Back
        </button>

        <h1 className="mt-4 text-3xl md:text-5xl font-light uppercase tracking-tight text-white">
          {project.title}
        </h1>

        {/* gallery */}
        <div className="mt-10 grid gap-5">
          {project.images.map((src, i) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* prev/next */}
        <div className="mt-14 border-t border-white/12 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs tracking-[0.25em] uppercase text-white/55">
              More projects
            </div>

            <button
              type="button"
              onClick={() => go(router, `/projects/${project.category}`)}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/0 px-6 py-3 text-xs font-semibold tracking-[0.25em] uppercase text-white transition hover:border-white/28 active:scale-[0.98]"
            >
              Back to list <span className="opacity-70">↘</span>
            </button>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {prev ? (
              <NavCard
                label="Previous"
                project={prev}
                onClick={() =>
                  go(router, `/projects/${prev.category}/${prev.slug}`)
                }
              />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/4 p-6 text-white/50">
                No previous project.
              </div>
            )}

            {next ? (
              <NavCard
                label="Next"
                project={next}
                onClick={() =>
                  go(router, `/projects/${next.category}/${next.slug}`)
                }
              />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/4 p-6 text-white/50">
                No next project.
              </div>
            )}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </main>
  );
}
