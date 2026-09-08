import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  ContactRound,
  Download,
  GraduationCap,
  Mail,
} from "lucide-react";
import Link from "next/link";

import { CapabilityPillar } from "@/components/capability-pillar";
import { ExperienceCard } from "@/components/experience-card";
import { HeroPortrait } from "@/components/hero-portrait";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { credentials, credentialsSectionTitle } from "@/data/credentials";
import { featuredExperiences } from "@/data/experience";
import { capabilityPillars, profile } from "@/data/profile";
import { homepageProjects } from "@/data/projects";
import { emailHref } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Yash Roushan | Software & Enterprise IT Professional",
  description:
    "Yash Roushan is a Halifax-based software and enterprise IT professional with experience in backend development, Azure migration support, network monitoring, workflow automation, and technical support.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="site-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="container-shell relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:py-24">
          <div className="reveal">
            <p className="eyebrow">{profile.hero.eyebrow}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {profile.hero.heading}
            </h1>
            <p className="mt-3 text-xl font-semibold text-primary-strong sm:text-2xl">
              {profile.hero.title}
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
              {profile.hero.statement}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button-primary" href="/experience">
                Explore my experience{" "}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <a
                className="button-secondary"
                href="/Yash-Roushan-Resume.pdf"
                download
              >
                <Download aria-hidden="true" size={17} /> Download resume
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-1">
              <a
                className="button-quiet"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 aria-hidden="true" size={17} /> GitHub
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
              <a
                className="button-quiet"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ContactRound aria-hidden="true" size={17} /> LinkedIn
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
              <a className="button-quiet" href={emailHref}>
                <Mail aria-hidden="true" size={17} /> Email
              </a>
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <HeroPortrait />
          </div>
        </div>

        <div className="border-t border-border bg-surface/70">
          <div className="container-shell grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              "User needs",
              "Application logic",
              "System visibility",
              "Clear documentation",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 px-4 py-4 sm:px-5"
              >
                <span className="font-mono text-xs font-semibold text-secondary">
                  0{index + 1}
                </span>
                <span className="text-sm font-medium text-muted-strong">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="container-shell section-shell"
        aria-labelledby="capabilities-heading"
      >
        <SectionHeading
          eyebrow="Capabilities"
          title="Four areas of technical experience"
          description="I connect user needs with software, data, cloud, and infrastructure work to make systems easier to operate, troubleshoot, and support."
          action={
            <Link className="button-secondary" href="/skills">
              Evidence-linked skills <ArrowRight aria-hidden="true" size={16} />
            </Link>
          }
        />
        <h2 id="capabilities-heading" className="sr-only">
          Capability pillars
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityPillars.map((pillar) => (
            <CapabilityPillar key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-shell section-shell">
          <SectionHeading
            eyebrow="Selected experience"
            title="Professional work across software and enterprise IT"
            description="Each case study explains my contribution, tools, troubleshooting approach, collaboration, and outcomes while keeping employer details confidential."
            action={
              <Link className="button-secondary" href="/experience">
                Complete timeline <ArrowRight aria-hidden="true" size={16} />
              </Link>
            }
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.slug} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <SectionHeading
          eyebrow="Selected projects"
          title="Projects with clear technical context"
          description="Each case study covers the problem, my contribution, technical decisions, testing, team attribution, and public evidence where available."
          action={
            <Link className="button-secondary" href="/projects">
              All projects <ArrowRight aria-hidden="true" size={16} />
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {homepageProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-shell section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-2xl border border-border bg-subtle p-6 sm:p-8">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary-strong">
              <GraduationCap aria-hidden="true" size={22} />
            </span>
            <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
              Education
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              {profile.education.degree}
            </h2>
            <p className="mt-2 text-muted-strong">
              {profile.education.institution}
            </p>
            <p className="mt-1 font-mono text-sm text-muted">
              {profile.education.location} · {profile.education.dateLabel}
            </p>
            <Link className="button-quiet mt-5 -ml-3" href="/about#education">
              Professional story and education{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </article>

          <div>
            <p className="eyebrow">Professional learning</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
              {credentialsSectionTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Verified course-completion records in networking, Azure
              fundamentals, and Python.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {credentials.map((credential) => (
                <li key={credential.id}>
                  <a
                    href={credential.href}
                    target="_blank"
                    rel="noreferrer"
                    className="surface-card surface-card-interactive flex h-full min-h-20 items-center justify-between gap-4 rounded-xl p-4"
                  >
                    <span>
                      <span className="block font-semibold">
                        {credential.publicLabel}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-muted">
                        {credential.learningPlatform}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="shrink-0 text-primary-strong"
                      aria-hidden="true"
                      size={17}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-primary-soft p-7 sm:p-10">
          <div
            className="site-grid pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
          />
          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">Let&apos;s connect</p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Available for full-time software and enterprise IT roles in
                Canada.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-strong">
                I bring experience across backend development, cloud and
                enterprise systems, network monitoring, workflow automation, and
                technical support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="button-primary"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowUpRight aria-hidden="true" size={16} />
              </a>
              <Link className="button-secondary" href="/contact">
                Contact options <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
