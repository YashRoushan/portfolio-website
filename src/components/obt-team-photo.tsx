import Image from "next/image";

import teamPhoto from "@/assets/obt-it-analyst-team.jpg";

export function ObtTeamPhoto() {
  return (
    <figure className="my-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
      <Image
        src={teamPhoto}
        alt="Group photo accompanying the OBT IT Analyst collaboration section"
        placeholder="blur"
        sizes="(max-width: 1023px) calc(100vw - 2rem), 48rem"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-border p-5 sm:p-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.09em] text-secondary">
          Collaboration in practice
        </span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          Team collaboration
        </h3>
        <p className="mt-2 leading-7 text-muted-strong">
          This role involves listening to users, keeping shared context clear,
          and coordinating work across business and technical teams.
        </p>
      </figcaption>
    </figure>
  );
}
