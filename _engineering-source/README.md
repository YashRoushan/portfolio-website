# Yash Roushan · Engineering portfolio

[Open the portfolio](https://yashroushan.github.io/portfolio-website/engineering/) · [Source on `main`](https://github.com/YashRoushan/portfolio-website/tree/main/_engineering-source)

The homepage features three running applications with real screenshots, followed by professional experience. Each case study opens with an interactive sample.

| Case study | Source repository |
| --- | --- |
| [Stock Portfolio Tracker](https://yashroushan.github.io/portfolio-website/engineering/work/stock-portfolio-tracker/) | [Stock-Portfolio-Tracker](https://github.com/YashRoushan/Stock-Portfolio-Tracker) |
| [Task Planner](https://yashroushan.github.io/portfolio-website/engineering/work/task-planner/) | [To-Do-App](https://github.com/YashRoushan/To-Do-App) |
| [Local IT Help Desk Chatbot](https://yashroushan.github.io/portfolio-website/engineering/work/local-it-help-desk/) | [localchatbot](https://github.com/YashRoushan/localchatbot) |
| [Multi-Node Process Simulator](https://yashroushan.github.io/portfolio-website/engineering/work/process-simulator/) | [Operating_System_Simulator](https://github.com/YashRoushan/Operating_System_Simulator) |

## Additional projects and live demos

| Project | Source | Hosting |
| --- | --- | --- |
| Local IT Help Desk Chatbot | [localchatbot](https://github.com/YashRoushan/localchatbot) | [Browser demo](https://yashroushan.github.io/portfolio-website/engineering/demos/helpdesk/) with curated links and optional on-device inference |
| Stock Portfolio Tracker | [Stock-Portfolio-Tracker](https://github.com/YashRoushan/Stock-Portfolio-Tracker) | [Cloudflare Workers/D1 demo](https://yash-stock-portfolio-tracker.yashroushan.chatgpt.site/) with clearly labelled sample prices |
| Task Planner | [To-Do-App](https://github.com/YashRoushan/To-Do-App) | [Cloudflare Workers/D1 guest app](https://yash-task-planner.yashroushan.chatgpt.site/) |
| Weather Explorer | [weather-app](https://github.com/YashRoushan/weather-app) | [Static React demo](https://yashroushan.github.io/portfolio-website/engineering/demos/weather/) using NOAA and Open-Meteo for global coverage |
| Snake | [Snake_Game](https://github.com/YashRoushan/Snake_Game) | [Static browser game](https://yashroushan.github.io/portfolio-website/engineering/demos/snake/) |
| Jobify | [Jobify-Project](https://github.com/YashRoushan/Jobify-Project) | Tutorial-based MERN application; source and local setup |
| Walk Simulator | [Walk-Simulator](https://github.com/YashRoushan/Walk-Simulator) | Java/AWT coursework; source and desktop execution |
| Messaging UI Study | [WhatsApp-Demo-App](https://github.com/YashRoushan/WhatsApp-Demo-App) | Static interface exercise; no messaging backend |

The original Node/MongoDB task-manager source remains in its repository; the hosted edition uses a documented Worker/D1 adapter. Weather Explorer uses public providers with visible attribution. The help-desk browser demo optionally downloads a model for local inference. The separate FastAPI and Ollama implementation can run from its repository.

## Run locally

Use Node.js 22.12 or later, Python 3, `pdflatex` with Latin Modern, and the Poppler utilities. On Ubuntu, install `texlive-latex-extra`, `texlive-fonts-recommended`, `lmodern` and `poppler-utils`. From a checkout of `YashRoushan/portfolio-website`:

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
| Résumé page and PDF | Edit [`resume.tex`](resume.tex) and the matching HTML transcript in [`src/resume.json`](src/resume.json). The build compiles the PDF and checks its page count, text and margins. |
| Illustrations and preview images | [`public/art/`](public/art/) and the [artwork notes](artwork/README.md) |

When adding a project, give it a unique slug, its verified repository URL, implementation details and descriptive artwork in `src/content.ts`. Keep the optional interactive preview unset unless it illustrates that specific project. The build renders a static case-study URL for each entry.

The smaller cards use `repositoryProjects` in that same file. Add a `demo` URL only after the application is published and tested; omit it for source-only entries. Preserve coursework and tutorial attribution.

Snake is vendored in `public/demos/snake/`. Weather Explorer is compiled by Vite from `demos/weather/`, based on the weather-app hosted edition. The buildless help-desk browser demo lives in `public/demos/helpdesk/`.

## Publish on GitHub Pages

On the host repository’s `main` branch, `_engineering-source/` contains the editable project and `engineering/` contains its generated output. The existing GitHub Pages configuration publishes the root of `main` through its built-in Pages workflow; the repository’s Pages root directs visitors to the engineering portfolio.

The host workflow template is [`deployment/engineering-portfolio.yml`](deployment/engineering-portfolio.yml). Its active copy lives at `.github/workflows/engineering-portfolio.yml` in the host repository root. It builds and verifies the source, then synchronises only the marked `engineering/` directory. Leave the existing Pages publishing source in place.

For a manual release, run the production build and verification above. From `_engineering-source/`, the following command checks the output directory’s ownership marker before copying the complete build, including hidden files. The trailing slashes matter: only the contents of `engineering/` are replaced.

```sh
cmp public/portfolio-output.txt ../engineering/portfolio-output.txt &&
  rsync -a --delete --filter='P /assets/*' dist/ ../engineering/
```

The filter keeps fingerprinted bundles available for visitors who receive cached HTML from a prior release. From the repository root, review the diff, commit the intended source and `engineering/` changes, then push to `main` so Pages can publish them. Never copy `dist/` over the host repository root.

The source directory’s [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) is a separate recipe for using this project as the root of its **own** repository. It deploys the entire Pages artifact and must not replace the host workflow.
