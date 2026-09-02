import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { TechnologyTag } from "@/components/technology-tag";
import type { ExperienceEntry } from "@/data/types";
import { categoryLabels } from "@/lib/content";

export function ExperienceCard({
  experience,
}: {
  experience: ExperienceEntry;
}) {
  const href = `/experience/${experience.slug}`;

  return (
    <article className="surface-card surface-card-interactive group h-full rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
            {experience.company}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
            <Link className="rounded-sm hover:text-primary-strong" href={href}>
              {experience.role}
            </Link>
          </h3>
        </div>
        <time className="rounded-md bg-subtle px-2.5 py-1 font-mono text-[0.68rem] text-muted-strong">
          {experience.dateLabel}
        </time>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
        <MapPin aria-hidden="true" size={15} /> {experience.location}
      </p>
      <p className="mt-4 text-pretty text-sm leading-6 text-muted-strong">
        {experience.shortSummary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Capability areas">
        {experience.capabilityCategories.slice(0, 3).map((category) => (
          <li key={category} className="text-xs font-medium text-secondary">
            {categoryLabels[category]}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {experience.technologies.slice(0, 5).map((technology) => (
          <TechnologyTag key={technology}>{technology}</TechnologyTag>
        ))}
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary-strong hover:underline"
        aria-label={`Read case study: ${experience.role} at ${experience.company}`}
      >
        Read case study <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </article>
  );
}
