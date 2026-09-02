import {
  ArrowRight,
  Braces,
  CloudCog,
  DatabaseZap,
  Network,
} from "lucide-react";
import Link from "next/link";

import type { CapabilityPillar as CapabilityPillarData } from "@/data/types";

const icons = {
  "software-engineering": Braces,
  "cloud-enterprise": CloudCog,
  "network-infrastructure": Network,
  "data-automation": DatabaseZap,
};

export function CapabilityPillar({ pillar }: { pillar: CapabilityPillarData }) {
  const Icon = icons[pillar.id];
  return (
    <article className="surface-card surface-card-interactive group flex h-full flex-col rounded-xl p-5 sm:p-6">
      <span className="grid size-10 place-items-center rounded-lg bg-primary-soft text-primary-strong">
        <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">
        {pillar.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">
        {pillar.summary}
      </p>
      <Link
        href={pillar.href}
        className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-md text-sm font-semibold text-primary-strong hover:underline"
        aria-label={`View evidence for ${pillar.title}`}
      >
        View evidence <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </article>
  );
}
