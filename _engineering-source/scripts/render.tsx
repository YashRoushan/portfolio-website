import { mkdir, writeFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { Home, CaseStudy, NotFound } from "../src/components";
import { profile, projects, type Project } from "../src/content";

const siteUrl = new URL(
  process.env.SITE_URL || "https://yashroushan.github.io/portfolio-website/engineering/",
);
if (!["http:", "https:"].includes(siteUrl.protocol))
  throw new Error("SITE_URL must be an HTTP(S) URL.");
if (!siteUrl.pathname.endsWith("/")) siteUrl.pathname += "/";
siteUrl.hash = "";
siteUrl.search = "";

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
const themeBootstrap = `(function(){document.documentElement.classList.add('has-js');try{var t=localStorage.getItem('yash-theme');document.documentElement.dataset.theme=(t==='dark'||t==='light')?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){}})()`;

async function page(
  path: string,
  title: string,
  description: string,
  content: ReactNode,
  prefix: string,
  noIndex = false,
  project?: Project,
) {
  const canonical = new URL(
    path === "index.html" ? "" : path.replace(/index\.html$/, ""),
    siteUrl,
  ).href;
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonical,
    name: title,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl.href}#yash-roushan`,
      name: profile.name,
      jobTitle: "Software Engineer",
      url: siteUrl.href,
      email: `mailto:${profile.email}`,
      sameAs: [profile.github, profile.linkedin],
      homeLocation: { "@type": "Place", name: "Halifax, Nova Scotia, Canada" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Dalhousie University",
      },
      knowsAbout: [
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "REST APIs",
        "PostgreSQL",
        "Docker",
      ],
    },
  };
  const webPage = { "@context": "https://schema.org", "@type": "WebPage", url: canonical, name: title };
  const schema = project ? {
    ...webPage,
    mainEntity: {
      "@type": "SoftwareSourceCode",
      name: project.name,
      description: project.summary,
      codeRepository: project.repository,
      author: { "@type": "Person", name: profile.name, url: siteUrl.href },
    },
  } : noIndex ? webPage : profileSchema;
  const html = `<!doctype html>
<html lang="en-CA" data-theme="dark">
<head>
  <meta charset="utf-8" />
  ${noIndex ? `<base href="${escape(siteUrl.pathname)}" />` : ""}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#111416" />
  <meta name="color-scheme" content="dark light" />
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}" />
  ${noIndex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${escape(canonical)}" />`}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_CA" />
  <meta property="og:site_name" content="Yash Roushan" />
  <meta property="og:title" content="${escape(title)}" />
  <meta property="og:description" content="${escape(description)}" />
  <meta property="og:url" content="${escape(canonical)}" />
  <meta property="og:image" content="${new URL("social-card.png", siteUrl).href}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Yash Roushan, Software Engineer and Full-Stack Developer, Halifax, Canada" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escape(title)}" />
  <meta name="twitter:description" content="${escape(description)}" />
  <meta name="twitter:image" content="${new URL("social-card.png", siteUrl).href}" />
  <link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg" />
  <link rel="apple-touch-icon" href="${prefix}apple-touch-icon.png" />
  <link rel="preload" as="font" href="${prefix}fonts/geist-latin.woff2" type="font/woff2" crossorigin />
  <script>${themeBootstrap}</script>
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  <script type="module" src="/src/main.ts"></script>
</head>
<body id="top">
  <a class="skip-link" href="#main-content">Skip to content</a>
  ${renderToStaticMarkup(content)}
</body>
</html>`;
  await mkdir(path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : ".", {
    recursive: true,
  });
  await writeFile(path, html);
}

await page(
  "index.html",
  "Yash Roushan — Software Engineer & Full-Stack Developer",
  "Software engineer in Halifax, Canada. Explore Yash Roushan’s React, TypeScript, Node.js and local AI projects, enterprise experience and case studies.",
  <Home />,
  "./",
);
for (const project of projects) {
  await page(
    `work/${project.slug}/index.html`,
    `${project.name} — Yash Roushan`,
    project.summary,
    <CaseStudy project={project} />,
    "../../",
    false,
    project,
  );
}
await page(
  "404.html",
  "Page unavailable — Yash Roushan",
  "Return to Yash Roushan’s software engineering portfolio.",
  <NotFound home={siteUrl.pathname} />,
  "./",
  true,
);
await mkdir("public", { recursive: true });
await writeFile(
  "public/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", siteUrl).href}\n`,
);
await writeFile(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["", ...projects.map((project) => `work/${project.slug}/`)].map((path) => `<url><loc>${escape(new URL(path, siteUrl).href)}</loc></url>`).join("")}</urlset>\n`,
);
await writeFile("public/.nojekyll", "");
console.log(
  `Generated portfolio and ${projects.length} case studies for ${siteUrl.href}`,
);
