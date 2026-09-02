import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              {item.href && !last ? (
                <Link
                  className="rounded-sm hover:text-primary-strong hover:underline"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last ? <ChevronRight aria-hidden="true" size={13} /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
