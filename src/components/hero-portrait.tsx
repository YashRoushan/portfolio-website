import Image from "next/image";

import profileImage from "@/assets/yash-roushan-profile.jpeg";

export function HeroPortrait() {
  return (
    <figure className="relative mx-auto w-full max-w-[34rem]">
      <div
        className="absolute -inset-3 rounded-[1.4rem] bg-gradient-to-br from-primary/15 via-transparent to-secondary/15 blur-xl"
        aria-hidden="true"
      />
      <div className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
        <Image
          src={profileImage}
          alt="Yash Roushan"
          fill
          preload
          placeholder="blur"
          sizes="(max-width: 1023px) calc(100vw - 2rem), 34rem"
          className="object-cover object-center"
        />

        <svg
          viewBox="0 0 560 420"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g fill="none" stroke="rgba(255, 255, 255, 0.72)" strokeWidth="1.25">
            <path d="M18 96 H78 L112 62" />
            <path d="M18 116 H96" strokeDasharray="5 7" />
            <path d="M542 74 H492 L466 100" />
            <path d="M542 94 H510" strokeDasharray="5 7" />
          </g>
          <g fill="var(--secondary)">
            <circle cx="18" cy="96" r="3" />
            <circle cx="112" cy="62" r="3" />
            <circle cx="466" cy="100" r="3" />
          </g>
          <g fill="var(--primary)">
            <circle cx="96" cy="116" r="2.5" />
            <circle cx="542" cy="74" r="3" />
          </g>
        </svg>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111f]/85 via-transparent via-45% to-transparent"
          aria-hidden="true"
        />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#07111f]/65 px-3 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md sm:left-5 sm:top-5">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
          </span>
          Open to full-time roles
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
          <div>
            <p className="text-xl font-semibold tracking-tight sm:text-2xl">
              Yash Roushan
            </p>
            <p className="mt-1 text-sm text-white/80">
              IT &amp; Software Professional
            </p>
          </div>
          <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/75 sm:block">
            Halifax · NS
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
