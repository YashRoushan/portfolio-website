import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Code2, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import {
  CaseStudyList,
  CaseStudySection,
} from "@/components/case-study-section";
import { EvidenceLink } from "@/components/evidence-link";
import { PreviousNext } from "@/components/previous-next";
import { ProjectPreview } from "@/components/project-preview";
import { TechnologyTag } from "@/components/technology-tag";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import {
  capabilityLabels,
  projectCode,
  projectPreviewVariant,
  visibleEvidenceLinks,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const path = `/projects/${project.slug}`;
  return createPageMetadata({
    title: project.title,
    description: project.shortSummary,
    path,
    type: "article",
  });
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const evidence = visibleEvidenceLinks(project);
  const relatedExperience = project.relatedExperience
    .map((relatedSlug) => experiences.find((item) => item.slug === relatedSlug))
    .filter((item) => item !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortSummary,
    url: absoluteUrl(`/projects/${project.slug}`),
    creator: { "@type": "Person", name: "Yash Roushan" },
    keywords: project.technologies.join(", "),
  };

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden border-b border-border">
        <div
          className="site-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="container-shell relative py-10 sm:py-14">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />
          <Link className="button-quiet mt-5 -ml-3" href="/projects">
            <ArrowLeft aria-hidden="true" size={16} /> Back to projects
          </Link>

          <div className="mt-7 grid gap-9 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">{project.role}</p>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-muted">
                {project.shortSummary}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.capabilityCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-md bg-secondary-soft px-2.5 py-1 text-xs font-semibold text-secondary"
                  >
                    {capabilityLabels[category]}
                  </span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
              <ProjectPreview
                code={projectCode(project.slug)}
                label={project.title}
                variant={projectPreviewVariant(project.slug)}
              />
              <dl className="grid gap-3 border-t border-border p-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="flex items-center gap-1.5 font-mono text-xs text-muted">
                    <CalendarDays aria-hidden="true" size={14} /> Dates
                  </dt>
                  <dd className="mt-1 font-medium">{project.dateLabel}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 font-mono text-xs text-muted">
                    <Code2 aria-hidden="true" size={14} /> Role
                  </dt>
                  <dd className="mt-1 font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 font-mono text-xs text-muted">
                    <Users aria-hidden="true" size={14} /> Attribution
                  </dt>
                  <dd className="mt-1 font-medium">See case study</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <div className="container-shell py-4 sm:py-8">
        <CaseStudySection id="problem" number="01" title="Problem statement">
          <p>{project.problemStatement}</p>
        </CaseStudySection>

        <CaseStudySection id="contribution" number="02" title="My contribution">
          <CaseStudyList items={project.contribution} />
        </CaseStudySection>

        <CaseStudySection id="features" number="03" title="Key features">
          <CaseStudyList items={project.keyFeatures} />
        </CaseStudySection>

        <CaseStudySection
          id="decisions"
          number="04"
          title="Engineering decisions"
        >
          <CaseStudyList items={project.engineeringDecisions} />
        </CaseStudySection>

        <CaseStudySection
          id="testing"
          number="05"
          title="Testing and debugging"
        >
          <CaseStudyList items={project.testingAndDebugging} />
        </CaseStudySection>

        <CaseStudySection id="outcome" number="06" title="Outcome">
          <CaseStudyList items={project.outcomes} />
        </CaseStudySection>

        <CaseStudySection
          id="technologies"
          number="07"
          title="Technologies and related skills"
        >
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <TechnologyTag key={technology}>{technology}</TechnologyTag>
            ))}
          </div>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {project.relatedSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection
          id="evidence"
          number="08"
          title="Evidence and attribution"
        >
          <div className="rounded-xl border border-secondary/35 bg-secondary-soft p-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
              Team attribution
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-strong">
              {project.teamAttribution}
            </p>
          </div>
          {evidence.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {evidence.map((link) => (
                <EvidenceLink key={link.href} link={link} />
              ))}
            </div>
          ) : null}
        </CaseStudySection>

        <CaseStudySection
          id="related"
          number="09"
          title="Related professional experience"
        >
          {relatedExperience.length ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {relatedExperience.map((related) => (
                <li key={related.slug}>
                  <Link
                    className="surface-card surface-card-interactive block rounded-lg p-4 font-semibold text-primary-strong"
                    href={`/experience/${related.slug}`}
                  >
                    {related.role} · {related.company}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              See the complete experience timeline for professional context
              across software, systems, and support.
            </p>
          )}
        </CaseStudySection>

        <div className="border-t border-border py-10">
          <PreviousNext
            previous={
              previous
                ? { label: previous.title, href: `/projects/${previous.slug}` }
                : undefined
            }
            next={
              next
                ? { label: next.title, href: `/projects/${next.slug}` }
                : undefined
            }
          />
        </div>
      </div>
    </article>
  );
}
