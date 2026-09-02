import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SystemMap } from "@/components/system-map";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";
import { emailHref } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "The professional story, education, and working principles of Yash Roushan, an IT and software professional based in Halifax, Nova Scotia.",
  path: "/about",
});

const progression = [
  {
    label: "Data and workflows",
    text: "Early professional work at Dresma.ai connected data quality, repeatable ETL documentation, reporting, and reliable application workflows.",
    href: "/experience/dresma-data-analyst-intern",
  },
  {
    label: "Software development",
    text: "Full-stack projects and backend work added APIs, relational data modeling, frontend integration, debugging, testing, and distributed collaboration.",
    href: "/experience/worsship-backend-developer",
  },
  {
    label: "Support and automation",
    text: "At Dalhousie, user-facing IT support expanded into cross-platform troubleshooting, Power Platform workflows, SQL, reporting, and documentation.",
    href: "/experience/dalhousie-it-technical-assistant-coop",
  },
  {
    label: "Network observability",
    text: "Network work at Irving Oil added monitoring accuracy, node validation, authentication hygiene, dashboard requirements, and structured troubleshooting.",
    href: "/experience/irving-oil-network-analyst-coop",
  },
  {
    label: "Enterprise systems",
    text: "The current role brings those layers together through enterprise application support, cloud migration dependencies, workflow analysis, and cross-team coordination.",
    href: "/experience/irving-oil-obt-it-analyst",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Professional story"
        title="Breadth built layer by layer"
        description="Yash's range is cumulative: each role has added another part of the same systems view—from users and requirements to applications, data, automation, cloud dependencies, and network visibility."
        actions={
          <>
            <Link className="button-primary" href="/experience">
              Explore experience <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className="button-secondary" href="/projects">
              View projects
            </Link>
          </>
        }
        aside={<SystemMap />}
      />

      <section className="container-shell section-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">The through-line</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Understand the whole system, then make it easier to rely on
          </h2>
        </div>
        <div className="grid gap-5 text-pretty text-lg leading-8 text-muted-strong">
          {profile.professionalStory.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-shell section-shell">
          <SectionHeading
            eyebrow="Progression"
            title="Five stages, one connected practice"
            description="The work moves from information quality to application behavior, user support, infrastructure visibility, and enterprise change."
          />
          <ol className="grid gap-4 lg:grid-cols-5">
            {progression.map((step, index) => (
              <li
                key={step.label}
                className="surface-card flex h-full flex-col rounded-xl p-5"
              >
                <span className="font-mono text-xs font-semibold text-secondary">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {step.label}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {step.text}
                </p>
                <Link
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary-strong hover:underline"
                  href={step.href}
                >
                  Read case study <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="container-shell section-shell"
        aria-labelledby="principles-heading"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">How I work</p>
            <h2
              id="principles-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em]"
            >
              Professional principles
            </h2>
            <p className="mt-4 text-muted">
              Practical habits that carry across software delivery, technical
              support, and enterprise change.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.principles.map((principle) => (
              <li
                key={principle}
                className="surface-card flex min-h-20 items-center gap-3 rounded-xl p-4 font-semibold"
              >
                <CheckCircle2
                  className="shrink-0 text-secondary"
                  aria-hidden="true"
                  size={19}
                />
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="education"
        className="scroll-mt-28 border-y border-border bg-surface"
      >
        <div className="container-shell section-shell grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-subtle p-6 sm:p-8">
            <GraduationCap
              className="text-primary-strong"
              aria-hidden="true"
              size={28}
            />
            <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
              Education
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              {profile.education.degree}
            </h2>
            <p className="mt-2 text-muted-strong">
              {profile.education.institution}
            </p>
            <p className="mt-1 font-mono text-sm text-muted">
              {profile.education.location} · {profile.education.dateLabel}
            </p>
            <h3 className="mt-6 font-semibold">Relevant academic areas</h3>
            <ul className="mt-3 grid gap-2 pl-5 text-sm text-muted marker:text-secondary">
              {profile.education.academicAreas.map((area) => (
                <li key={area} className="list-disc">
                  {area}
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-6">
            <article className="surface-card rounded-2xl p-6 sm:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
                Student representation
              </p>
              <h2 className="mt-3 text-xl font-semibold">
                {profile.community[0].role}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {profile.community[0].organization} ·{" "}
                {profile.community[0].dateLabel}
              </p>
              <p className="mt-4 leading-7 text-muted-strong">
                {profile.community[0].summary}
              </p>
            </article>
            <article className="surface-card rounded-2xl p-6 sm:p-8">
              <BookOpen
                className="text-secondary"
                aria-hidden="true"
                size={25}
              />
              <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
                Beyond technology
              </p>
              <p className="mt-3 text-lg text-muted-strong">
                {profile.beyondTechnology}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="rounded-2xl border border-border bg-subtle p-7 sm:p-9">
          <h2 className="text-3xl font-semibold tracking-[-0.035em]">
            Continue the conversation
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            View the complete record, inspect public code, or reach Yash
            directly about a full-time technology role.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button-primary" href="/resume">
              Resume <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <a
              className="button-secondary"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <a className="button-secondary" href={emailHref}>
              Email Yash
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
