"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransitionWipe } from "@/components/RouteTransition";
import { projects } from "@/content/projects";

export default function ProjectsClient() {
  const router = useRouter();
  const { go } = useTransitionWipe();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((p) => (
        <button
          key={`${p.category}-${p.slug}`}
          type="button"
          onClick={() => go(router, `/projects/${p.category}/${p.slug}`)}
          className="group text-left rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={p.thumb}
              alt={p.title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="p-4">
            <div className="text-xs tracking-[0.25em] uppercase text-white/50">
              {p.category}
            </div>
            <div className="mt-2 text-lg text-white uppercase tracking-tight">
              {p.title}
            </div>

            <div className="mt-2 text-xs tracking-[0.25em] uppercase text-white/40">
              {p.comingSoon ? "Coming soon" : `${p.count} images`}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
