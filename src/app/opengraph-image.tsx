import { ImageResponse } from "next/og";

export const alt = "Yash Roushan — Software & Enterprise IT Professional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0A0F1C",
        color: "#F8FAFC",
        padding: "72px 82px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.15,
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630">
          <defs>
            <pattern
              id="og-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="og-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#60A5FA" />
              <stop offset="1" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#og-grid)" />
          <path
            d="M730 120 H945 V245 H1080"
            fill="none"
            stroke="url(#og-line)"
            strokeWidth="4"
          />
          <path
            d="M760 500 H930 V390 H1090"
            fill="none"
            stroke="url(#og-line)"
            strokeWidth="4"
          />
          <circle cx="945" cy="245" r="9" fill="#60A5FA" />
          <circle cx="930" cy="390" r="9" fill="#2DD4BF" />
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "62px",
            height: "62px",
            borderRadius: "14px",
            border: "2px solid #60A5FA",
            background: "#132B4D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#93C5FD",
            fontSize: "22px",
            fontWeight: 800,
          }}
        >
          YR
        </div>
        <div style={{ display: "flex", fontSize: "22px", color: "#A7B0BF" }}>
          Halifax, Nova Scotia · Open to full-time technology roles
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "74px",
            lineHeight: 1,
            fontWeight: 750,
            letterSpacing: "-3px",
          }}
        >
          Yash Roushan
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            fontSize: "34px",
            fontWeight: 650,
            color: "#60A5FA",
          }}
        >
          Software &amp; Enterprise IT Professional
        </div>
      </div>

      <div style={{ display: "flex", gap: "14px", position: "relative" }}>
        {[
          "Software",
          "Cloud & enterprise",
          "Networks",
          "Data & automation",
        ].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              border: "1px solid #263247",
              borderRadius: "8px",
              padding: "10px 15px",
              fontSize: "18px",
              color: "#D3D9E2",
              background: "#111827",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
