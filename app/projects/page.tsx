"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransitionWipe } from "@/components/RouteTransition";

function CategoryCard({
  title,
  href,
  thumbSrc,
}: {
  title: string;
  href: string;
  thumbSrc: string;
}) {
  const router = useRouter();
  const { go } = useTransitionWipe();

  return (
    <button
      onClick={() => go(router, href)}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 text-left transition hover:border-white/25"
    >
      <div className="relative aspect-[12/5] w-full">
        <Image
          src={thumbSrc}
          alt={title}
          fill
          className="object-cover opacity-100 group-hover:opacity-100 transition"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />

        {/* MUCH lighter overlay (for readability without killing the image) */}
        <div className="absolute inset-0 bg-black/15" />

        {/* subtle highlight for “pop” */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <div className="text-xs tracking-[0.25em] uppercase text-white/70">
          Category
        </div>
        <div className="mt-3 text-2xl md:text-3xl font-light uppercase tracking-tight text-white">
          {title}
        </div>
        <div className="mt-2 text-sm text-white/80">View projects ↘</div>
      </div>
    </button>
  );
}

export default function ProjectsIndexPage() {
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-[1100px] px-4">
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <CategoryCard
            title="Automotive Design"
            href="/projects/automotive"
            thumbSrc="/images/categories/automotive.jpg"
          />
          <CategoryCard
            title="Livery Design"
            href="/projects/livery"
            thumbSrc="/images/categories/livery.jpg"
          />
        </div>

        <div className="h-20" />
      </div>
    </main>
  );
}
