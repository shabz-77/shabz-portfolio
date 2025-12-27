"use client";

import Image from "next/image";
import Link from "next/link";

const iconButton =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 transition hover:border-white/20 hover:bg-white/10";

export default function FooterLogos() {
  return (
    <div className="relative mt-24 pb-10">
      {/* Footer pill container */}
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="relative flex items-center justify-between rounded-full border border-white/12 bg-black/40 px-6 py-4 backdrop-blur-md">
          
          {/* Left — S77 Logo (Home) */}
          <Link href="/" aria-label="Home" className={iconButton}>
            <Image
              src="/images/logo/s77-logo.svg"
              alt="S77"
              width={18}
              height={18}
              className="opacity-90"
            />
          </Link>

          {/* Center — Instagram */}
          <a
            href="https://www.instagram.com/shabz77_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className={iconButton}
          >
            <Image
              src="/images/logo/instagram-logo.svg"
              alt="Instagram"
              width={18}
              height={18}
              className="opacity-90"
            />
          </a>

          {/* Right — LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shahbaaz-nilgiriwala/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={iconButton}
          >
            <Image
              src="/images/logo/linkedin-logo.svg"
              alt="LinkedIn"
              width={18}
              height={18}
              className="opacity-90"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
