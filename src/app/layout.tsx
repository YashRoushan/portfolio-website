import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import { AmbientNetwork } from "@/components/ambient-network";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, publicEmail, siteUrl, socialLinks } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Portfolio of Yash Roushan, a Halifax-based IT and software professional with experience in full-stack development, Azure and enterprise systems, network monitoring, automation, and technical support.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yash Roushan | IT & Software Professional",
    template: "%s | Yash Roushan",
  },
  description,
  applicationName: "Yash Roushan Portfolio",
  authors: [{ name: "Yash Roushan" }],
  creator: "Yash Roushan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Yash Roushan Portfolio",
    title: "Yash Roushan | IT & Software Professional",
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Yash Roushan — IT & Software Professional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Roushan | IT & Software Professional",
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0F1C" },
  ],
};

const themeScript = `
  (() => {
    try {
      const preference = localStorage.getItem('theme-preference') || 'system';
      const resolved = preference === 'system'
        ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : preference;
      document.documentElement.dataset.themePreference = preference;
      document.documentElement.dataset.theme = resolved;
    } catch (_) {}
  })();
`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: "Yash Roushan",
    jobTitle: "IT & Software Professional",
    url: absoluteUrl("/"),
    email: `mailto:${publicEmail}`,
    sameAs: [socialLinks.linkedin, socialLinks.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Halifax",
      addressRegion: "Nova Scotia",
      addressCountry: "CA",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dalhousie University",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: "Yash Roushan Portfolio",
    url: absoluteUrl("/"),
    inLanguage: "en-CA",
    about: { "@id": absoluteUrl("/#person") },
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${geistSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <AmbientNetwork />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="skip-link fixed left-3 top-3 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 font-semibold text-white focus:translate-y-0"
        >
          Skip to main content
        </a>
        <div className="site-frame flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
