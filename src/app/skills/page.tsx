import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { capabilityPillars } from "@/data/profile";
import { getSkillsForCapability } from "@/data/skills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Skills",
  description:
    "Evidence-linked capability matrix for Yash Roushan across software engineering, enterprise systems, networking, data, automation, and technical collaboration.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="Evidence-linked capability matrix"
        title="Skills demonstrated in context"
        description="Each skill is linked to the professional role or substantial project where I used it, giving recruiters concrete context instead of self-ratings."
        aside={
          <div className="surface-card rounded-2xl p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
              Evidence language
            </p>
            <ul className="mt-5 grid gap-3 text-sm text-muted-strong">
              <li className="flex gap-2.5">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-secondary"
                  aria-hidden="true"
                  size={17}
                />{" "}
                Used in professional work
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-secondary"
                  aria-hidden="true"
                  size={17}
                />{" "}
                Used in a substantial project
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-secondary"
                  aria-hidden="true"
                  size={17}
                />{" "}
                Coursework or foundational exposure, when evidenced
              </li>
            </ul>
          </div>
        }
      />

      <nav
        aria-label="Capability sections"
        className="border-b border-border bg-surface"
      >
        <ul className="container-shell flex snap-x gap-2 overflow-x-auto py-3">
          {capabilityPillars.map((pillar) => (
            <li key={pillar.id} className="shrink-0 snap-start">
              <a className="button-quiet" href={`#${pillar.id}`}>
                {pillar.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-shell py-4 sm:py-8">
        {capabilityPillars.map((pillar, pillarIndex) => {
          const pillarSkills = getSkillsForCapability(pillar.id);
          return (
            <section
              key={pillar.id}
              id={pillar.id}
              aria-labelledby={`${pillar.id}-heading`}
              className="scroll-mt-28 border-b border-border py-12 last:border-b-0 sm:py-16"
            >
              <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
                <div>
                  <p className="font-mono text-xs font-semibold text-secondary">
                    0{pillarIndex + 1}
                  </p>
                  <h2
                    id={`${pillar.id}-heading`}
                    className="mt-3 text-2xl font-semibold tracking-tight"
                  >
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {pillar.summary}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {pillarSkills.map((skill) => (
                    <article
                      key={`${pillar.id}-${skill.id}`}
                      className="surface-card rounded-xl p-5"
                    >
                      <h3 className="text-lg font-semibold tracking-tight">
                        {skill.name}
                      </h3>
                      <p className="mt-2 text-xs font-semibold text-secondary">
                        {skill.usage}
                      </p>
                      <ul className="mt-4 grid gap-3">
                        {skill.evidence.map((evidence) => (
                          <li key={`${skill.id}-${evidence.href}`}>
                            <Link
                              href={evidence.href}
                              className="group block rounded-lg border border-border bg-subtle p-3 hover:border-primary"
                            >
                              <span className="flex items-center justify-between gap-2 text-sm font-semibold text-primary-strong group-hover:underline">
                                {evidence.label}
                                <ArrowRight
                                  className="shrink-0"
                                  aria-hidden="true"
                                  size={14}
                                />
                              </span>
                              <span className="mt-1.5 block text-xs leading-5 text-muted">
                                {evidence.context}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
