import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { ProjectPreview } from "@/components/project-preview";
import { TechnologyTag } from "@/components/technology-tag";
import type { ProjectEntry } from "@/data/types";
import {
  projectCode,
  projectPreviewVariant,
  visibleEvidenceLinks,
} from "@/lib/content";
import { getProjectScreenshot } from "@/lib/project-screenshots";

export function ProjectCard({ project }: { project: ProjectEntry }) {
  const href = `/projects/${project.slug}`;
  const evidence = visibleEvidenceLinks(project)[0];
  const screenshot = getProjectScreenshot(project.slug);

  return (
    <article className="surface-card surface-card-interactive group flex h-full flex-col overflow-hidden rounded-xl">
      <ProjectPreview
        code={projectCode(project.slug)}
        label={project.title}
        variant={projectPreviewVariant(project.slug)}
        image={screenshot?.src}
        imageAlt={screenshot?.alt}
        imageFit={screenshot?.fit}
        imagePosition={screenshot?.position}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
            {project.role}
          </p>
          <time className="font-mono text-[0.68rem] text-muted">
            {project.dateLabel}
          </time>
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em]">
          <Link className="rounded-sm hover:text-primary-strong" href={href}>
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-pretty text-sm leading-6 text-muted-strong">
          {project.shortSummary}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((technology) => (
            <TechnologyTag key={technology}>{technology}</TechnologyTag>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary-strong hover:underline"
            aria-label={`Read case study: ${project.title}`}
          >
            Read case study <ArrowRight aria-hidden="true" size={16} />
          </Link>
          {evidence ? (
            <a
              href={evidence.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-muted-strong hover:text-primary-strong hover:underline"
            >
              {evidence.kind === "team-repository"
                ? "Team repository"
                : "Source"}
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
