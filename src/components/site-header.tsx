import Link from "next/link";

import { SiteNavigation } from "@/components/site-navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-border bg-[var(--header)] backdrop-blur-xl">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg border border-primary bg-primary-soft font-mono text-xs font-bold text-primary-strong group-hover:bg-primary group-hover:text-white"
          >
            YR
          </span>
          <span className="hidden text-sm sm:inline">Yash Roushan</span>
          <span className="sr-only sm:hidden">Yash Roushan, </span>
          <span className="sr-only">home</span>
        </Link>

        <div className="flex items-center gap-2">
          <SiteNavigation />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
