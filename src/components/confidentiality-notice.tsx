import { ShieldCheck } from "lucide-react";

export function ConfidentialityNotice({ children }: { children?: string }) {
  return (
    <aside
      className="rounded-xl border border-secondary/35 bg-secondary-soft p-5"
      aria-label="Confidentiality note"
    >
      <div className="flex gap-3">
        <ShieldCheck
          className="mt-0.5 shrink-0 text-secondary"
          aria-hidden="true"
          size={20}
        />
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
            Confidentiality
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-strong">
            {children ??
              "This case study intentionally stays at a high level to respect employer confidentiality and protect internal systems and data."}
          </p>
        </div>
      </div>
    </aside>
  );
}
