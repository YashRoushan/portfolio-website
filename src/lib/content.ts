import type {
  CapabilityId,
  ExperienceCategory,
  ExperienceEntry,
  ProjectEntry,
} from "@/data/types";

export const capabilityLabels: Record<CapabilityId, string> = {
  "software-engineering": "Software Engineering",
  "cloud-enterprise": "Cloud and Enterprise Systems",
  "network-infrastructure": "Networking and Infrastructure",
  "data-automation": "Data and Automation",
};

export const categoryLabels: Record<ExperienceCategory, string> = {
  ...capabilityLabels,
  "business-technology": "Business Technology",
};

export function visibleEvidenceLinks(item: ExperienceEntry | ProjectEntry) {
  return item.evidenceLinks.filter(
    (link) => link.publicationStatus === "publish",
  );
}

export function projectPreviewVariant(slug: ProjectEntry["slug"]) {
  const variants = {
    "dalchess-code": "blue",
    "jobify-job-tracker": "teal",
    "quick-cash-marketplace": "violet",
    "dalhousie-combat-robotics": "slate",
  } as const;
  return variants[slug];
}

export function projectCode(slug: ProjectEntry["slug"]) {
  const codes = {
    "dalchess-code": "DC",
    "jobify-job-tracker": "JF",
    "quick-cash-marketplace": "QC",
    "dalhousie-combat-robotics": "DCR",
  } as const;
  return codes[slug];
}
