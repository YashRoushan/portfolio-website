import type { StaticImageData } from "next/image";

import dalhousieCombatRobotics from "@/assets/dalhousie-combat-robotics.png";
import dalchessHomepage from "@/assets/dalchess-homepage.png";
import jobifyHomepage from "@/assets/jobify-homepage.png";
import multiNodeProcessSimulator from "@/assets/multi-node-process-simulator.png";
import productivityTaskManager from "@/assets/productivity-task-manager.png";
import quickCashHomepage from "@/assets/quick-cash-homepage.png";
import stockPortfolioTracker from "@/assets/stock-portfolio-tracker.png";
import type { ProjectSlug } from "@/data/types";

type ProjectScreenshot = {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly fit: "cover" | "contain";
  readonly position?: "center" | "top";
};

const projectScreenshots: Partial<Record<ProjectSlug, ProjectScreenshot>> = {
  "dalchess-code": {
    src: dalchessHomepage,
    alt: "Dalhousie Chess Club tournament page with search filters and three tournament cards",
    fit: "cover",
  },
  "jobify-job-tracker": {
    src: jobifyHomepage,
    alt: "Jobify homepage with the Job Tracking App introduction and registration options",
    fit: "cover",
  },
  "productivity-task-manager": {
    src: productivityTaskManager,
    alt: "Productivity Task Manager dashboard with completion metrics and charts",
    fit: "cover",
  },
  "stock-portfolio-tracker": {
    src: stockPortfolioTracker,
    alt: "Stock Atlas portfolio dashboard showing NVIDIA as the leading NVDA holding, performance metrics, a trend chart, and allocation",
    fit: "cover",
  },
  "multi-node-process-simulator": {
    src: multiNodeProcessSimulator,
    alt: "Terminal output from a two-node process-scheduling simulation",
    fit: "cover",
  },
  "quick-cash-marketplace": {
    src: quickCashHomepage,
    alt: "Quick Cash Android user dashboard with job, preference, payment, and statistics actions",
    fit: "cover",
    position: "top",
  },
  "dalhousie-combat-robotics": {
    src: dalhousieCombatRobotics,
    alt: "Dalhousie Combat Robotics Team public profile with the DCRT banner and team description",
    fit: "cover",
  },
};

export function getProjectScreenshot(
  slug: ProjectSlug,
): ProjectScreenshot | undefined {
  return projectScreenshots[slug];
}
