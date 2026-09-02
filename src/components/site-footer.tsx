import {
  ArrowUpRight,
  Code2,
  ContactRound,
  FileText,
  Mail,
} from "lucide-react";
import Link from "next/link";

import { emailHref, publicEmail, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-border bg-surface">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold"
          >
            <span className="grid size-8 place-items-center rounded-md bg-primary-soft font-mono text-[0.68rem] font-bold text-primary-strong">
              YR
            </span>
            Yash Roushan
          </Link>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Building reliable technology across software, cloud, and
            infrastructure.
          </p>
          <p className="mt-5 font-mono text-xs text-muted">
            Halifax, Nova Scotia · Open to full-time technology roles
          </p>
        </div>

        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-2">
            <li>
              <a
                className="button-quiet"
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <ContactRound aria-hidden="true" size={17} /> LinkedIn
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            </li>
            <li>
              <a className="button-quiet" href={emailHref}>
                <Mail aria-hidden="true" size={17} /> {publicEmail}
              </a>
            </li>
            <li>
              <a
                className="button-quiet"
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 aria-hidden="true" size={17} /> GitHub
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            </li>
            <li>
              <Link className="button-quiet" href="/resume">
                <FileText aria-hidden="true" size={17} /> Resume
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container-shell flex flex-wrap justify-between gap-2 py-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Yash Roushan</p>
          <p>Designed for clarity, accessibility, and fast reading.</p>
        </div>
      </div>
    </footer>
  );
}
