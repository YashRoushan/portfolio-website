import { ExternalLink } from "lucide-react";

import type { EvidenceLink as EvidenceLinkData } from "@/data/types";

export function EvidenceLink({ link }: { link: EvidenceLinkData }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="surface-card surface-card-interactive flex min-h-14 items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm font-semibold text-primary-strong"
    >
      <span>{link.label}</span>
      <ExternalLink aria-hidden="true" className="shrink-0" size={16} />
    </a>
  );
}
