import { Code2, Database, MonitorSmartphone } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Selected software projects by Yash Roushan spanning full-stack web applications, REST APIs, data persistence, Android development, and team web work.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected technical work"
        title="Software projects and contributions"
        description="Each case study explains the problem, my contribution, technical decisions, testing and debugging, outcomes, team attribution, and public evidence where available."
        aside={
          <div className="surface-card grid gap-4 rounded-2xl p-6">
            {[
              { icon: Code2, label: "Frontend and backend" },
              { icon: Database, label: "APIs and data persistence" },
              { icon: MonitorSmartphone, label: "Web and mobile interfaces" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-sm font-medium text-muted-strong"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary-strong">
                  <Icon aria-hidden="true" size={18} />
                </span>
                {label}
              </div>
            ))}
          </div>
        }
      />

      <section
        className="container-shell section-shell"
        aria-labelledby="project-list-heading"
      >
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow">Project index</p>
          <h2
            id="project-list-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.035em]"
          >
            Software, data, and interface work
          </h2>
          <p className="mt-4 text-muted">
            These projects span full-stack web development, Android development,
            REST APIs, databases, testing, and team collaboration.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
