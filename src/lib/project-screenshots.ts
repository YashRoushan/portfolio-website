import type { StaticImageData } from "next/image";

import dalchessHomepage from "@/assets/dalchess-homepage.png";
import jobifyHomepage from "@/assets/jobify-homepage.png";
import quickCashHomepage from "@/assets/quick-cash-homepage.png";
import type { ProjectSlug } from "@/data/types";

type ProjectScreenshot = {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly fit: "cover" | "contain";
};

const projectScreenshots: Partial<Record<ProjectSlug, ProjectScreenshot>> = {
  "dalchess-code": {
    src: dalchessHomepage,
    alt: "Dalhousie Chess Club homepage with yellow navigation and the club name",
    fit: "cover",
  },
  "jobify-job-tracker": {
    src: jobifyHomepage,
    alt: "Jobify homepage with the Job Tracking App introduction and registration options",
    fit: "cover",
  },
  "quick-cash-marketplace": {
    src: quickCashHomepage,
    alt: "Quick Cash Android launch screen with login and registration options",
    fit: "cover",
  },
};

export function getProjectScreenshot(
  slug: ProjectSlug,
): ProjectScreenshot | undefined {
  return projectScreenshots[slug];
}
