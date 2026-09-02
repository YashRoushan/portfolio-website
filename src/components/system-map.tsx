export function SystemMap() {
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-[34rem] overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 560 420" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id="signal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--secondary)" />
          </linearGradient>
          <pattern
            id="dots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="var(--border)" />
          </pattern>
        </defs>
        <rect width="560" height="420" rx="16" fill="url(#dots)" />

        <g fill="none" stroke="url(#signal)" strokeWidth="2" opacity="0.72">
          <path className="signal-path" d="M139 99 H280 V205" />
          <path className="signal-path signal-delay" d="M421 99 H280" />
          <path className="signal-path" d="M139 321 H280 V205" />
          <path className="signal-path signal-delay" d="M421 321 H280 V205" />
        </g>

        <g>
          <rect
            x="57"
            y="54"
            width="164"
            height="90"
            rx="14"
            fill="var(--surface-raised)"
            stroke="var(--border-strong)"
          />
          <circle cx="82" cy="78" r="6" fill="var(--primary)" />
          <text
            x="99"
            y="83"
            fill="var(--foreground)"
            fontSize="15"
            fontWeight="650"
          >
            Software
          </text>
          <text x="82" y="111" fill="var(--muted)" fontSize="12">
            interfaces · APIs
          </text>

          <rect
            x="339"
            y="54"
            width="164"
            height="90"
            rx="14"
            fill="var(--surface-raised)"
            stroke="var(--border-strong)"
          />
          <circle cx="364" cy="78" r="6" fill="var(--secondary)" />
          <text
            x="381"
            y="83"
            fill="var(--foreground)"
            fontSize="15"
            fontWeight="650"
          >
            Cloud
          </text>
          <text x="364" y="111" fill="var(--muted)" fontSize="12">
            systems · dependencies
          </text>

          <rect
            x="198"
            y="162"
            width="164"
            height="90"
            rx="14"
            fill="var(--primary-soft)"
            stroke="var(--primary)"
            strokeWidth="1.5"
          />
          <circle cx="223" cy="187" r="6" fill="var(--primary)" />
          <text
            x="240"
            y="192"
            fill="var(--foreground)"
            fontSize="15"
            fontWeight="700"
          >
            Reliable systems
          </text>
          <text x="223" y="220" fill="var(--muted-strong)" fontSize="12">
            observe · improve · support
          </text>

          <rect
            x="57"
            y="276"
            width="164"
            height="90"
            rx="14"
            fill="var(--surface-raised)"
            stroke="var(--border-strong)"
          />
          <circle cx="82" cy="300" r="6" fill="var(--secondary)" />
          <text
            x="99"
            y="305"
            fill="var(--foreground)"
            fontSize="15"
            fontWeight="650"
          >
            Networks
          </text>
          <text x="82" y="333" fill="var(--muted)" fontSize="12">
            monitoring · support
          </text>

          <rect
            x="339"
            y="276"
            width="164"
            height="90"
            rx="14"
            fill="var(--surface-raised)"
            stroke="var(--border-strong)"
          />
          <circle cx="364" cy="300" r="6" fill="var(--primary)" />
          <text
            x="381"
            y="305"
            fill="var(--foreground)"
            fontSize="15"
            fontWeight="650"
          >
            Data
          </text>
          <text x="364" y="333" fill="var(--muted)" fontSize="12">
            quality · automation
          </text>
        </g>
      </svg>
      <div className="absolute bottom-3 right-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
        Systems across layers
      </div>
    </div>
  );
}
