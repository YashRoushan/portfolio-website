import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="site-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className={`container-shell relative grid gap-10 py-16 sm:py-20 ${aside ? "lg:grid-cols-[1fr_0.7fr] lg:items-center" : ""}`}
      >
        <div className="max-w-3xl reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
            {description}
          </p>
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
        {aside ? <div className="reveal reveal-delay-1">{aside}</div> : null}
      </div>
    </section>
  );
}
