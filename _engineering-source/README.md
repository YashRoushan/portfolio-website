# Yash Roushan · Engineering portfolio

[Open the portfolio](https://yashroushan.github.io/portfolio-website/engineering/) · [Source on `main`](https://github.com/YashRoushan/portfolio-website/tree/main/_engineering-source)

The portfolio pairs Yash’s engineering experience with three project case studies. Each case study has its own static page and links to the implementation. The illustrated examples on the site do not connect to the underlying applications.

| Case study | Source repository |
| --- | --- |
| [Stock Portfolio Tracker](https://yashroushan.github.io/portfolio-website/engineering/work/stock-portfolio-tracker/) | [Stock-Portfolio-Tracker](https://github.com/YashRoushan/Stock-Portfolio-Tracker) |
| [Local IT Help Desk Chatbot](https://yashroushan.github.io/portfolio-website/engineering/work/local-it-help-desk/) | [localchatbot](https://github.com/YashRoushan/localchatbot) |
| [Multi-Node Process Simulator](https://yashroushan.github.io/portfolio-website/engineering/work/process-simulator/) | [Operating_System_Simulator](https://github.com/YashRoushan/Operating_System_Simulator) |

## Run locally

Use Node.js 22.12 or later. From a checkout of `YashRoushan/portfolio-website`:

```sh
cd _engineering-source
npm ci
export SITE_URL=https://yashroushan.github.io/portfolio-website/engineering/
npm run build
npm run verify
npm run preview
```

Open the local URL printed by Vite. `build` type-checks the source, renders the pages to HTML and writes the production site to `dist/`. `verify` checks the built HTML, local links and fragments, structured data, résumé and required assets. `SITE_URL` sets the public address used in canonical links, sharing metadata and the sitemap; keep the full `/portfolio-website/engineering/` path when building for production.

For editing, stop the preview and run `npm start`. This renders the pages once, then starts the Vite development server. Restart it after changing page content or templates to regenerate the HTML.

## Edit the site

| Change | Source |
| --- | --- |
| Profile, contact links, projects, experience and expertise | [`src/content.ts`](src/content.ts). Each project’s `slug` becomes its `work/<slug>/` URL. |
| Home page and case-study layouts | [`src/components.tsx`](src/components.tsx) |
| Styles and browser interactions | [`src/styles.css`](src/styles.css) and [`src/main.ts`](src/main.ts) |
| Document titles, metadata, sitemap and page generation | [`scripts/render.tsx`](scripts/render.tsx) |
| Downloadable résumé | Replace [`public/Yash_Roushan_Resume.pdf`](public/Yash_Roushan_Resume.pdf) using the same filename. |
| Illustrations and preview images | [`public/art/`](public/art/) and the [artwork notes](artwork/README.md) |

When adding a project, give it a unique slug, its verified repository URL, implementation details and descriptive artwork in `src/content.ts`. Keep the optional interactive preview unset unless it illustrates that specific project. The build renders a static case-study URL for each entry.

## Publish on GitHub Pages

On the host repository’s `main` branch, `_engineering-source/` contains the editable project and `engineering/` contains its generated output. The existing GitHub Pages configuration publishes the root of `main` through its built-in Pages workflow; the original portfolio remains at `/portfolio-website/`.

The host workflow template is [`deployment/engineering-portfolio.yml`](deployment/engineering-portfolio.yml). Its active copy lives at `.github/workflows/engineering-portfolio.yml` in the host repository root. It builds and verifies the source, then synchronises only the marked `engineering/` directory. Leave the existing Pages publishing source in place.

For a manual release, run the production build and verification above. From `_engineering-source/`, the following command checks the output directory’s ownership marker before copying the complete build, including hidden files. The trailing slashes matter: only the contents of `engineering/` are replaced.

```sh
cmp public/portfolio-output.txt ../engineering/portfolio-output.txt &&
  rsync -a --delete dist/ ../engineering/
```

From the repository root, review the diff, commit the intended source and `engineering/` changes, then push to `main` so Pages can publish them. Never copy `dist/` over the host repository root.

The source directory’s [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) is a separate recipe for using this project as the root of its **own** repository. It deploys the entire Pages artifact and must not replace the host workflow.
