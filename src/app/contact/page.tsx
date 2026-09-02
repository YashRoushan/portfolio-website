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
        title="Start a professional conversation"
        description="Yash is seeking full-time technology roles in Canada across software engineering, enterprise IT, cloud, networking, technical support, data, and automation."
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
        aria-labelledby="contact-options-heading"
      >
        <div className="max-w-2xl">
          <p className="eyebrow">Direct options</p>
          <h2
            id="contact-options-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.035em]"
          >
            Choose the channel that fits
          </h2>
          <p className="mt-4 text-muted">
            LinkedIn is the preferred professional contact. Email is the fastest
            direct alternative. No form is used, so nothing is collected or
            stored by this website.
          </p>
        </div>

        <ol className="mt-9 grid gap-4 sm:grid-cols-2">
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
                    className="surface-card surface-card-interactive group flex h-full flex-col rounded-xl p-6"
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    href={method.href}
                    className="surface-card surface-card-interactive group flex h-full flex-col rounded-xl p-6"
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-shell py-12 sm:py-16">
          <p className="eyebrow">Useful context</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em]">
            Include the role, team, and what you would like to discuss
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            A short note with the position title and relevant area—software,
            enterprise systems, networking, support, data, or automation—makes
            it easy to start with the right context.
          </p>
        </div>
      </section>
    </>
  );
}
