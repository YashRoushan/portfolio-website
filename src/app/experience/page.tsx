import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageHero } from "@/components/page-hero";
import { experiences } from "@/data/experience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "Professional timeline for Yash Roushan across enterprise systems, network monitoring, backend development, technical support, data, and automation.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Professional timeline"
        title="Software, systems, and support"
        description="My experience spans backend development, technical support, network monitoring, workflow automation, and enterprise application support. Each role includes a detailed case study."
        aside={
          <div className="surface-card rounded-2xl p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
              What each case study covers
            </p>
            <ol className="mt-5 grid gap-3 text-sm text-muted-strong">
              <li className="flex gap-3">
                <span className="font-mono text-primary-strong">01</span> Role
                and contribution
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-primary-strong">02</span> Tools
                and technical context
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-primary-strong">03</span>
                Outcomes, learning, and evidence
              </li>
            </ol>
          </div>
        }
      />
      <section
        className="container-shell section-shell"
        aria-labelledby="experience-list-heading"
      >
        <h2 id="experience-list-heading" className="sr-only">
          Complete professional timeline
        </h2>
        <ExperienceTimeline experiences={experiences} />
      </section>
    </>
  );
}
