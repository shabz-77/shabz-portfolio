"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransitionWipe } from "@/components/RouteTransition";
import FooterLogos from "@/components/FooterLogos";
import ContactForm from "@/components/ContactForm";

function HeroBG({
  src,
  mobileFocus = "35% 50%",
  desktopFocus = "50% 50%",
  overlayOpacity = 0.35,
}: {
  src: string;
  mobileFocus?: string;
  desktopFocus?: string;
  overlayOpacity?: number;
}) {
  return (
    <div className="absolute inset-0 -z-10">
      {/* mobile */}
      <Image
        src={src}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        style={{ objectPosition: mobileFocus }}
      />

      {/* md+ */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={src}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: desktopFocus }}
        />
      </div>

      {/* overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />
    </div>
  );
}

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
      className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/6 text-left transition hover:border-white/20"
      type="button"
    >
      <div className="relative aspect-[12/6] w-full">
        <Image
          src={thumbSrc}
          alt={title}
          fill
          className="object-cover opacity-95 group-hover:opacity-100 transition"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/12" />
      </div>

      <div className="p-6">
        <div className="mt-1 text-2xl md:text-3xl font-light uppercase tracking-tight text-white">
          {title}
        </div>
        <div className="mt-2 text-sm text-white/75">View projects ↘</div>
      </div>
    </button>
  );
}

export default function HomeClient() {
  const router = useRouter();
  const { go } = useTransitionWipe();

  return (
    <main className="vignette">
      {/* HERO TOP */}
      <section className="relative min-h-[92vh] pt-24">
        <HeroBG
          src="/images/hero-top.jpg"
          mobileFocus="35% 50%"
          desktopFocus="50% 50%"
          overlayOpacity={0.35}
        />

        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mt-16 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-white">
              Automotive Designer
            </h1>

            <p className="mt-6 max-w-xl text-sm md:text-base text-white/80 leading-relaxed">
              3D design, livery system, and interactive experiences
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => go(router, "/projects")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-semibold tracking-[0.25em] text-black uppercase transition active:scale-[0.98]"
                type="button"
              >
                Projects <span className="text-black/70">↘</span>
              </button>

              <button
                onClick={() => go(router, "/#contact")}
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/0 px-7 py-4 text-xs font-semibold tracking-[0.25em] uppercase text-white transition hover:border-white/28 active:scale-[0.98]"
                type="button"
              >
                Contact <span className="opacity-70">↘</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-[1100px] px-4 py-20">
        <div className="text-xs tracking-[0.25em] uppercase text-white/55">
          Portfolio
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
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
      </section>

      {/* HERO BOTTOM */}
      <section id="contact" className="relative">
        <HeroBG
          src="/images/hero-bottom.jpg"
          mobileFocus="30% 50%"
          desktopFocus="50% 50%"
          overlayOpacity={0.5}
        />

        <div className="mx-auto max-w-[1200px] px-4 py-20">
          <div className="flex flex-col items-start gap-4 border-t border-white/12 pt-14">
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-white">
              Let’s build something
            </h2>

            <p className="max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              I started by sketching cars. Today, I design visual systems — from
              concept to interactive configurators.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[800px]">
            <ContactForm />
          </div>
        </div>

        <FooterLogos />
      </section>
    </main>
  );
}
