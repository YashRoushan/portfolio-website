import type { MetadataRoute } from "next";

import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/resume",
    "/contact",
  ];
  const experienceRoutes = experiences.map(
    (experience) => `/experience/${experience.slug}`,
  );
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  return [...coreRoutes, ...experienceRoutes, ...projectRoutes].map((path) => ({
    url: absoluteUrl(path || "/"),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
