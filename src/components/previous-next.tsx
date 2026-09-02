import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type PageLink = { label: string; href: string };

export function PreviousNext({
  previous,
  next,
}: {
  previous?: PageLink;
  next?: PageLink;
}) {
  return (
    <nav
      aria-label="Previous and next case studies"
      className="grid gap-3 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="surface-card surface-card-interactive group rounded-xl p-5"
        >
          <span className="flex items-center gap-2 font-mono text-xs text-muted">
            <ArrowLeft aria-hidden="true" size={15} /> Previous
          </span>
          <span className="mt-2 block font-semibold group-hover:text-primary-strong">
            {previous.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="surface-card surface-card-interactive group rounded-xl p-5 text-left sm:text-right"
        >
          <span className="flex items-center gap-2 font-mono text-xs text-muted sm:justify-end">
            Next <ArrowRight aria-hidden="true" size={15} />
          </span>
          <span className="mt-2 block font-semibold group-hover:text-primary-strong">
            {next.label}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
