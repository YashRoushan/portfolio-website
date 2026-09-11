import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  ContactRound,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { contactMethods, profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Yash Roushan about full-time software, IT, cloud, enterprise systems, infrastructure, support, data, or automation roles in Canada.",
  path: "/contact",
});

const icons = {
  linkedin: ContactRound,
  email: Mail,
  github: Code2,
  resume: FileText,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact me about full-time roles"
        description="I am seeking full-time software and enterprise IT roles in Canada, including work in cloud, networking, automation, and technical support."
        aside={
          <div className="surface-card rounded-2xl p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
              Based in
            </p>
            <p className="mt-3 flex items-center gap-2 font-semibold">
              <MapPin
                className="text-primary-strong"
                aria-hidden="true"
                size={19}
              />{" "}
              {profile.location}
            </p>
            <p className="mt-4 border-t border-border pt-4 text-sm text-muted">
              {profile.availability}
            </p>
          </div>
        }
      />

      <section
        className="container-shell section-shell"
        aria-labelledby="contact-section-heading"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Reach out</p>
            <h2
              id="contact-section-heading"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              Start the conversation here
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-7 text-muted">
              Share the position title, team, and main area of focus. The form
              sends your message to my inbox, so you can contact me without
              opening an email app.
            </p>

            <div className="mt-7 rounded-xl border border-border bg-subtle p-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
                Direct email
              </p>
              <a
                className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-strong hover:underline"
                href={`mailto:${profile.email}`}
              >
                <Mail aria-hidden="true" size={17} /> {profile.email}
              </a>
              <p className="mt-2 text-sm leading-6 text-muted">
                You can still email me directly if that is more convenient.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section
        className="border-t border-border bg-surface"
        aria-labelledby="contact-options-heading"
      >
        <div className="container-shell py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Other ways to connect</p>
            <h2
              id="contact-options-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em]"
            >
              Professional links and documents
            </h2>
            <p className="mt-4 text-muted">
              Connect on LinkedIn, review my public work, or download my resume.
            </p>
          </div>

          <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => {
              const Icon = icons[method.id];
              const content = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary-strong">
                      <Icon aria-hidden="true" size={21} />
                    </span>
                    <span className="font-mono text-xs text-muted">
                      0{method.priority}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {method.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                    {method.description}
                  </p>
                  <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-strong group-hover:underline">
                    {method.id === "resume"
                      ? "View resume"
                      : `Open ${method.label}`}
                    {method.external ? (
                      <ArrowUpRight aria-hidden="true" size={15} />
                    ) : (
                      <ArrowRight aria-hidden="true" size={15} />
                    )}
                  </span>
                </>
              );

              return (
                <li key={method.id}>
                  {method.external ? (
                    <a
                      href={method.href}
                      target={method.id === "email" ? undefined : "_blank"}
                      rel={method.id === "email" ? undefined : "noreferrer"}
                      className="surface-card surface-card-interactive group flex h-full flex-col rounded-xl p-5"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={method.href}
                      className="surface-card surface-card-interactive group flex h-full flex-col rounded-xl p-5"
                    >
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
