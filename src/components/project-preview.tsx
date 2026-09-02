type ProjectPreviewProps = {
  code: string;
  label: string;
  variant?: "blue" | "teal" | "violet" | "slate";
};

const gradients = {
  blue: "from-blue-600/20 via-blue-500/5 to-transparent",
  teal: "from-teal-600/20 via-teal-500/5 to-transparent",
  violet: "from-violet-600/20 via-violet-500/5 to-transparent",
  slate: "from-slate-500/20 via-slate-400/5 to-transparent",
};

export function ProjectPreview({
  code,
  label,
  variant = "blue",
}: ProjectPreviewProps) {
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden border-b border-border bg-gradient-to-br ${gradients[variant]} p-5`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 site-grid opacity-60" />
      <div className="relative flex h-full flex-col rounded-xl border border-border bg-surface/90 p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
          </div>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
            Project profile
          </span>
        </div>
        <div className="grid flex-1 place-items-center">
          <div className="text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-primary/30 bg-primary-soft font-mono text-lg font-bold text-primary-strong">
              {code}
            </span>
            <p className="mt-3 text-sm font-semibold">{label}</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_0.55fr] gap-2">
          <span className="h-2 rounded-full bg-primary/20" />
          <span className="h-2 rounded-full bg-secondary/25" />
        </div>
      </div>
    </div>
  );
}
