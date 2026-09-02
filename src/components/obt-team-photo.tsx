import Image from "next/image";

import teamPhoto from "@/assets/obt-it-analyst-team.jpg";

export function ObtTeamPhoto() {
  return (
    <figure className="my-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
      <Image
        src={teamPhoto}
        alt="Yash Roushan with six OBT IT teammates seated together around a restaurant table"
        placeholder="blur"
        sizes="(max-width: 1023px) calc(100vw - 2rem), 48rem"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-border p-5 sm:p-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.09em] text-secondary">
          Collaboration in practice
        </span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          My OBT IT Analyst team
        </h3>
        <p className="mt-2 leading-7 text-muted-strong">
          Much of this role involves talking with people and coordinating work
          across business and technical teams—listening carefully, keeping
          context aligned, and helping shared work move forward.
        </p>
      </figcaption>
    </figure>
  );
}
