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
    "productivity-task-manager": "violet",
    "stock-portfolio-tracker": "teal",
    "multi-node-process-simulator": "slate",
    "quick-cash-marketplace": "violet",
    "dalhousie-combat-robotics": "slate",
  } as const;
  return variants[slug];
}

export function projectCode(slug: ProjectEntry["slug"]) {
  const codes = {
    "dalchess-code": "DC",
    "jobify-job-tracker": "JF",
    "productivity-task-manager": "PT",
    "stock-portfolio-tracker": "SP",
    "multi-node-process-simulator": "OS",
    "quick-cash-marketplace": "QC",
    "dalhousie-combat-robotics": "DCR",
  } as const;
  return codes[slug];
}
