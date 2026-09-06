import type { Metadata } from "next";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import {
  CaseStudyList,
  CaseStudyParagraphs,
  CaseStudySection,
} from "@/components/case-study-section";
import { ConfidentialityNotice } from "@/components/confidentiality-notice";
import { EvidenceLink } from "@/components/evidence-link";
import { ObtTeamPhoto } from "@/components/obt-team-photo";
import { PreviousNext } from "@/components/previous-next";
import { TechnologyTag } from "@/components/technology-tag";
import { WorsshipLetter } from "@/components/worsship-letter";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { categoryLabels, visibleEvidenceLinks } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata(
  props: PageProps<"/experience/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) return {};

  const title = `${experience.role} at ${experience.company}`;
  const path = `/experience/${experience.slug}`;
  return createPageMetadata({
    title,
    description: experience.shortSummary,
    path,
    type: "article",
  });
}

export default async function ExperienceDetailPage(
  props: PageProps<"/experience/[slug]">,
) {
  const { slug } = await props.params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();

  const index = experiences.findIndex((item) => item.slug === experience.slug);
  const previous = experiences[index - 1];
  const next = experiences[index + 1];
  const evidence = visibleEvidenceLinks(experience);
  const relatedExperiences = experience.relatedExperience
    .map((relatedSlug) => experiences.find((item) => item.slug === relatedSlug))
    .filter((item) => item !== undefined);
  const relatedProjects = experience.relatedProjects
    .map((relatedSlug) => projects.find((item) => item.slug === relatedSlug))
    .filter((item) => item !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${experience.role} at ${experience.company}`,
    description: experience.shortSummary,
    url: absoluteUrl(`/experience/${experience.slug}`),
    author: { "@type": "Person", name: "Yash Roushan" },
    about: experience.capabilityCategories.map(
      (category) => categoryLabels[category],
    ),
  };

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
          { name: experience.role, path: `/experience/${experience.slug}` },
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
              { label: "Experience", href: "/experience" },
              { label: experience.role },
            ]}
          />
          <Link className="button-quiet mt-5 -ml-3" href="/experience">
            <ArrowLeft aria-hidden="true" size={16} /> Back to experience
          </Link>
          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div>
              <p className="eyebrow">{experience.company}</p>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {experience.role}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-muted">
                {experience.shortSummary}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {experience.capabilityCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-md bg-secondary-soft px-2.5 py-1 text-xs font-semibold text-secondary"
                  >
                    {categoryLabels[category]}
                  </span>
                ))}
              </div>
            </div>

            <dl className="surface-card grid gap-4 rounded-xl p-5 text-sm">
              <div>
                <dt className="flex items-center gap-3 font-mono text-xs text-muted">
                  <Building2
                    className="shrink-0 text-primary-strong"
                    aria-hidden="true"
                    size={18}
                  />
                  Organization
                </dt>
                <dd className="mt-1 pl-[1.875rem] font-medium">
                  {experience.organizationOrTeam}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-3 font-mono text-xs text-muted">
                  <CalendarDays
                    className="shrink-0 text-primary-strong"
                    aria-hidden="true"
                    size={18}
                  />
                  Dates
                </dt>
                <dd className="mt-1 pl-[1.875rem] font-medium">
                  {experience.dateLabel}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-3 font-mono text-xs text-muted">
                  <MapPin
                    className="shrink-0 text-primary-strong"
                    aria-hidden="true"
                    size={18}
                  />
                  Location
                </dt>
                <dd className="mt-1 pl-[1.875rem] font-medium">
                  {experience.location}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-3 font-mono text-xs text-muted">
                  <Users
                    className="shrink-0 text-primary-strong"
                    aria-hidden="true"
                    size={18}
                  />
                  Experience type
                </dt>
                <dd className="mt-1 pl-[1.875rem] font-medium">
                  {experience.employmentType}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="container-shell py-4 sm:py-8">
        <CaseStudySection id="overview" number="01" title="Overview">
          <CaseStudyParagraphs paragraphs={experience.overview} />
        </CaseStudySection>

        <CaseStudySection id="context" number="02" title="Context">
          <CaseStudyParagraphs paragraphs={experience.context} />
        </CaseStudySection>

        <CaseStudySection
          id="contribution"
          number="03"
          title="What I contributed"
        >
          <CaseStudyList items={experience.selectedContributions} />
          <details className="mt-2 rounded-lg border border-border bg-subtle p-4">
            <summary className="cursor-pointer font-semibold text-foreground">
              Complete responsibility summary
            </summary>
            <div className="mt-4">
              <CaseStudyList items={experience.responsibilities} />
            </div>
          </details>
        </CaseStudySection>

        <CaseStudySection
          id="systems-tools"
          number="04"
          title="Tools and technologies"
        >
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((technology) => (
              <TechnologyTag key={technology}>{technology}</TechnologyTag>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection id="how-i-worked" number="05" title="How I worked">
          <h3 className="font-semibold text-foreground">
            Approach and reasoning
          </h3>
          <CaseStudyList items={experience.approachOrReasoning} />
          <h3 className="mt-3 font-semibold text-foreground">Collaboration</h3>
          <CaseStudyList items={experience.collaboration} />
          {experience.slug === "irving-oil-obt-it-analyst" ? (
            <ObtTeamPhoto />
          ) : null}
          <h3 className="mt-3 font-semibold text-foreground">Challenges</h3>
          <CaseStudyList items={experience.challenges} />
        </CaseStudySection>

        <CaseStudySection id="value" number="06" title="Outcomes">
          <CaseStudyList items={experience.outcomes} />
        </CaseStudySection>

        <CaseStudySection id="learning" number="07" title="What I learned">
          <CaseStudyList items={experience.lessons} />
        </CaseStudySection>

        <CaseStudySection
          id="evidence"
          number="08"
          title="Evidence and confidentiality"
        >
          {experience.slug === "worsship-backend-developer" ? (
            <WorsshipLetter />
          ) : null}
          <ConfidentialityNotice>
            {experience.confidentialityNote}
          </ConfidentialityNotice>
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
          title="Related experience and projects"
        >
          {relatedExperiences.length || relatedProjects.length ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {relatedExperiences.map((related) => (
                <li key={related.slug}>
                  <Link
                    className="surface-card surface-card-interactive block rounded-lg p-4 font-semibold text-primary-strong"
                    href={`/experience/${related.slug}`}
                  >
                    {related.role} · {related.company}
                  </Link>
                </li>
              ))}
              {relatedProjects.map((related) => (
                <li key={related.slug}>
                  <Link
                    className="surface-card surface-card-interactive block rounded-lg p-4 font-semibold text-primary-strong"
                    href={`/projects/${related.slug}`}
                  >
                    {related.title} · Project
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Explore the complete timeline and project index for adjacent work.
            </p>
          )}
        </CaseStudySection>

        <div className="border-t border-border py-10">
          <PreviousNext
            previous={
              previous
                ? {
                    label: `${previous.role} · ${previous.company}`,
                    href: `/experience/${previous.slug}`,
                  }
                : undefined
            }
            next={
              next
                ? {
                    label: `${next.role} · ${next.company}`,
                    href: `/experience/${next.slug}`,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </article>
  );
}
