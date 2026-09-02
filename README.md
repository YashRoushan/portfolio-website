# Yash Roushan — portfolio

A recruiter-focused portfolio for Yash Roushan, built as a statically generated Next.js App Router site. The content connects software engineering, enterprise systems, networking, support, data, and automation through evidence-linked role and project case studies.

## Local setup

Requirements: Node.js 24 LTS and npm. The repository pins the expected major version in `.nvmrc` and `package.json`.

```bash
nvm use
npm ci
npx playwright install chromium
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the final public origin before evaluating canonical URLs, sitemap entries, Open Graph URLs, or structured data.

## Scripts

```bash
npm run dev          # local development server
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint, with zero warnings allowed
npm run typecheck    # strict TypeScript check
npm run format       # format tracked source and documentation
npm run format:check # verify formatting
npm run test:smoke   # route, metadata, navigation, theme, and asset checks
npm run test:a11y    # axe checks across every required page
npm run test:e2e     # complete Playwright suite, including visual captures
npm run verify       # formatting, lint, types, build, and all browser tests
```

Run `npm run build` before an individual Playwright command. The Playwright configuration serves the production build on `127.0.0.1:4173`. Visual runs write ignored screenshots to `artifacts/screenshots/` at 375, 768, 1024, and 1440 CSS pixels.

## Architecture

- `src/app/` contains static App Router pages, route metadata, sitemap, robots, manifest, and generated social/icon images.
- `src/data/` is the strongly typed content source for the profile, experience, projects, skills, and credentials.
- `src/components/` contains reusable server components plus the two small client components used for navigation and theme state.
- `src/lib/` contains content/link helpers, metadata construction, and public-origin handling.
- `public/Yash-Roushan-Resume.pdf` is the stable resume download.
- `CONTENT_REVIEW.md` separates publishable facts from items that still need confirmation or evidence.

The detail routes derive from the data arrays and use `generateStaticParams`; no CMS, database, analytics, or contact-form backend is required.

## Editing content

### Experience

Edit `src/data/experience.ts`. For a new role, first add its slug to `ExperienceSlug` in `src/data/types.ts`, then add a complete `ExperienceEntry`. Keep contributions factual, preserve confidentiality, and update related project/experience slugs. The index, detail route, static params, previous/next links, sitemap, and skills evidence can then reuse the entry.

### Projects

Edit `src/data/projects.ts`. Add a slug to `ProjectSlug` in `src/data/types.ts`, then add the typed project entry. Mark team ownership explicitly, and keep any link at `publicationStatus: "hold-for-review"` until its safety, availability, attribution, and destination are checked. Add the route to `tests/routes.ts` when it should become part of the permanent smoke matrix.

### Skills and credentials

Edit `src/data/skills.ts` only when a skill can link to a role or substantial project. Credential labels live in `src/data/credentials.ts`; keep them conservative until the exact title and issuer are confirmed. Record unresolved wording or evidence in `CONTENT_REVIEW.md`, not on the public page.

### Resume

Replace `public/Yash-Roushan-Resume.pdf` without changing its filename. The current PDF is the user-supplied `phreesia.pdf`, published under the site's stable download filename. Before future replacement, check:

- public email and phone/privacy choices;
- employer confidentiality and absence of internal data;
- selectable text, reading order, document language, title/author metadata, and working links;
- whether the PDF intentionally differs from the semantic HTML preview in `src/components/resume-document.tsx`.

Update the corresponding resume rows in `CONTENT_REVIEW.md` after approval.

### Authentic screenshots

Place approved images under `public/images/projects/<slug>/`. Remove location/device metadata and inspect the pixels for names, email, IDs, notifications, test credentials, or internal data. Confirm ownership and permission, provide accurate alt text and intrinsic dimensions, then render through `next/image`. Until that review is complete, retain the honest code-native preview panels; do not create a screenshot-like mock that implies a real shipped UI.

## Link verification

Check every external destination before publishing it:

1. Confirm the final URL and HTTP/browser behavior.
2. Check repository ownership and commit attribution.
3. Scan public code and history for credentials, tokens, private endpoints, personal data, and internal records.
4. Update `validationStatus`, `publicationStatus`, and the review note in the relevant data file.
5. Update `CONTENT_REVIEW.md`, then run `npm run verify`.

The test suite validates local routes and assets. Login-gated credential pages and third-party application behavior still require manual review.

## Deploying to Vercel

No Vercel project or credentials are committed. To deploy:

1. Push the repository to the intended Git provider and import it at <https://vercel.com/new>.
2. Keep the detected Next.js framework and npm build defaults.
3. Add `NEXT_PUBLIC_SITE_URL` with the final production origin in Production, Preview, and Development as appropriate.
4. Deploy, assign the production domain, update the environment value if the domain changed, and redeploy.
5. Verify `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, every case-study route, and `/Yash-Roushan-Resume.pdf` on the public URL.
6. Run the browser suite against the deployment or repeat Lighthouse checks under representative production conditions.

Do not deploy until the security and factual-review items in `CONTENT_REVIEW.md` have been resolved or consciously accepted.
