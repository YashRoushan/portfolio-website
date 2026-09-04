import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-shell grid min-h-[65vh] place-items-center py-20 text-center">
      <div className="max-w-xl">
        <p className="font-mono text-sm font-semibold text-secondary">
          404 · Route not found
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          This path is not part of the system
        </h1>
        <p className="mt-5 text-muted">
          The page may have moved, or the address may be incomplete. Return home
          to continue exploring my work.
        </p>
        <Link className="button-primary mt-8" href="/">
          <ArrowLeft aria-hidden="true" size={16} /> Return home
        </Link>
      </div>
    </section>
  );
}
