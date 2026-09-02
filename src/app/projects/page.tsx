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
        title="Projects with engineering context"
        description="Each project page explains the problem, Yash's contribution, technical decisions, debugging work, outcome, attribution, and any public evidence that is safe to share."
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
            The visual panels below are branded summaries, not product
            screenshots. No private employer imagery or invented interfaces are
            used.
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
