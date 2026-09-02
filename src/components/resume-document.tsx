import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { skills } from "@/data/skills";

export function ResumeDocument() {
  const skillNames = skills.map((skill) => skill.name);

  return (
    <article
      className="resume-document mx-auto max-w-[8.5in] border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-9 lg:p-12"
      aria-label="Resume preview for Yash Roushan"
    >
      <header className="border-b-2 border-primary pb-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {profile.name}
            </h2>
            <p className="mt-1 text-lg font-semibold text-primary-strong">
              {profile.title}
            </p>
          </div>
          <address className="not-italic text-sm leading-6 text-muted sm:text-right">
            <p>{profile.location}</p>
            <p>
              <a
                className="hover:text-primary-strong hover:underline"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </p>
            <p>
              <a
                className="hover:text-primary-strong hover:underline"
                href={profile.linkedinUrl}
              >
                linkedin.com/in/yash-roushan-8636a1242
              </a>
            </p>
            <p>
              <a
                className="hover:text-primary-strong hover:underline"
                href={profile.githubUrl}
              >
                github.com/YashRoushan
              </a>
            </p>
          </address>
        </div>
      </header>

      <section
        className="resume-section mt-6"
        aria-labelledby="resume-summary-heading"
      >
        <h3 id="resume-summary-heading" className="resume-heading">
          Professional summary
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-strong">
          {profile.hero.statement} Experience spans user support, application
          logic, relational data, automation, enterprise dependencies, network
          monitoring, troubleshooting, and technical documentation.
        </p>
      </section>

      <section
        className="resume-section mt-6"
        aria-labelledby="resume-skills-heading"
      >
        <h3 id="resume-skills-heading" className="resume-heading">
          Technical capabilities
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-strong">
          {skillNames.join(" · ")}
        </p>
      </section>

      <section
        className="resume-section mt-6"
        aria-labelledby="resume-experience-heading"
      >
        <h3 id="resume-experience-heading" className="resume-heading">
          Professional experience
        </h3>
        <div className="mt-3 grid gap-5">
          {experiences.map((experience) => (
            <article key={experience.slug} className="break-inside-avoid">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div>
                  <h4 className="font-semibold">
                    {experience.role} · {experience.company}
                  </h4>
                  <p className="text-xs text-muted">
                    {experience.organizationOrTeam} · {experience.location}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-xs text-muted">
                  {experience.dateLabel}
                </p>
              </div>
              <ul className="mt-2 grid gap-1 pl-5 text-sm leading-5 text-muted-strong marker:text-secondary">
                {experience.selectedContributions
                  .slice(0, 2)
                  .map((contribution) => (
                    <li key={contribution} className="list-disc">
                      {contribution}
                    </li>
                  ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        className="resume-section mt-6"
        aria-labelledby="resume-projects-heading"
      >
        <h3 id="resume-projects-heading" className="resume-heading">
          Selected projects
        </h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="break-inside-avoid">
              <div className="flex justify-between gap-3">
                <h4 className="font-semibold">{project.title}</h4>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {project.dateLabel}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-secondary">
                {project.role}
              </p>
              <p className="mt-1 text-sm leading-5 text-muted-strong">
                {project.shortSummary}
              </p>
              <p className="mt-1 font-mono text-[0.68rem] leading-5 text-muted">
                {project.technologies.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="resume-section mt-6 break-inside-avoid"
        aria-labelledby="resume-education-heading"
      >
        <h3 id="resume-education-heading" className="resume-heading">
          Education
        </h3>
        <div className="mt-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
          <div>
            <h4 className="font-semibold">{profile.education.degree}</h4>
            <p className="text-sm text-muted-strong">
              {profile.education.institution} · {profile.education.location}
            </p>
          </div>
          <p className="font-mono text-xs text-muted">
            {profile.education.dateLabel}
          </p>
        </div>
      </section>
    </article>
  );
}
