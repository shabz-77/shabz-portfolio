"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useTransitionWipe } from "@/components/RouteTransition";
import { getProject, type CategoryKey } from "@/content/projects";

function normalizeCategory(raw: string): CategoryKey | null {
  const v = (raw || "").toLowerCase().trim();
  if (v === "automotive" || v === "auto" || v === "automotive-design") return "automotive";
  if (v === "livery" || v === "livery-design") return "livery";
  return null;
}

export default function ProjectPage() {
  const params = useParams<{ category?: string; slug?: string }>();
  const router = useRouter();
  const { go } = useTransitionWipe();

  const category = normalizeCategory(params.category ?? "");
  const slug = (params.slug ?? "").toLowerCase().trim();

  if (!category || !slug) {
    return (
      <main className="pt-24">
        <div className="mx-auto max-w-[900px] px-4 text-white/80">
          Project not found.
        </div>
      </main>
    );
  }

  const project = getProject(category, slug);

  if (!project) {
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
      <div className="mx-auto max-w-[1000px] px-4">
        <button
          onClick={() => go(router, `/projects/${project.category}`)}
          className="mt-10 text-xs tracking-[0.25em] uppercase text-white/50 hover:text-white/70"
        >
          ← Back
        </button>

        <h1 className="mt-4 text-3xl md:text-5xl font-light uppercase tracking-tight text-white">
          {project.title}
        </h1>

        <div className="mt-10 grid gap-6">
          {project.images.map((src, i) => (
            <div key={src} className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="relative w-full" style={{ aspectRatio: "2400 / 1000" }}>
                <Image
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1000px"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="h-20" />
      </div>
    </main>
  );
}
