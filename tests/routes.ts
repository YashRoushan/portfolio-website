export const requiredRoutes = [
  "/",
  "/about",
  "/experience",
  "/experience/irving-oil-obt-it-analyst",
  "/experience/irving-oil-network-analyst-coop",
  "/experience/worsship-backend-developer",
  "/experience/dalhousie-it-technical-assistant-coop",
  "/experience/dresma-data-analyst-intern",
  "/projects",
  "/projects/dalchess-code",
  "/projects/jobify-job-tracker",
  "/projects/productivity-task-manager",
  "/projects/stock-portfolio-tracker",
  "/projects/multi-node-process-simulator",
  "/projects/quick-cash-marketplace",
  "/projects/dalhousie-combat-robotics",
  "/skills",
  "/resume",
  "/contact",
] as const;

export const majorRoutes = [
  "/",
  "/about",
  "/experience",
  "/experience/irving-oil-obt-it-analyst",
  "/projects",
  "/projects/dalchess-code",
  "/skills",
  "/resume",
  "/contact",
] as const;

export function screenshotName(route: string) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "--");
}
