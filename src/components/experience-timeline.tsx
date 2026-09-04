"use client";

import { useState } from "react";

import { ExperienceCard } from "@/components/experience-card";
import type { CapabilityId, ExperienceEntry } from "@/data/types";

type FilterId = "all" | CapabilityId;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "software-engineering", label: "Software" },
  { id: "cloud-enterprise", label: "Cloud and Enterprise Systems" },
  { id: "network-infrastructure", label: "Networking and Infrastructure" },
  { id: "data-automation", label: "Data and Automation" },
];

export function ExperienceTimeline({
  experiences,
}: {
  experiences: readonly ExperienceEntry[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const visible =
    activeFilter === "all"
      ? experiences
      : experiences.filter((experience) =>
          experience.capabilityCategories.includes(activeFilter),
        );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter experience"
        className="mb-8 flex flex-wrap gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`min-h-11 rounded-lg border px-3.5 py-2 text-sm font-medium ${
              activeFilter === filter.id
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-muted-strong hover:border-primary hover:bg-primary-soft hover:text-primary-strong"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} experience{" "}
        {visible.length === 1 ? "entry" : "entries"}.
      </p>

      <ol className="relative grid gap-6 before:absolute before:bottom-8 before:left-[0.45rem] before:top-8 before:hidden before:w-px before:bg-border md:before:block">
        {visible.map((experience) => (
          <li key={experience.slug} className="relative md:pl-10">
            <span
              className="absolute left-0 top-8 hidden size-4 rounded-full border-4 border-background bg-primary md:block"
              aria-hidden="true"
            />
            <ExperienceCard experience={experience} />
          </li>
        ))}
      </ol>
    </div>
  );
}
