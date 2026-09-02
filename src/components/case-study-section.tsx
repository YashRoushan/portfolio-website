import type { ReactNode } from "react";

export function CaseStudySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-t border-border py-9 sm:py-11"
    >
      <div className="grid gap-5 lg:grid-cols-[11rem_1fr]">
        <div>
          <p className="font-mono text-xs font-semibold text-secondary">
            {number}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-2 text-xl font-semibold tracking-tight"
          >
            {title}
          </h2>
        </div>
        <div className="prose-case grid max-w-3xl gap-4 leading-7">
          {children}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyList({ items }: { items: readonly string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function CaseStudyParagraphs({
  paragraphs,
}: {
  paragraphs: readonly string[];
}) {
  return paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}
