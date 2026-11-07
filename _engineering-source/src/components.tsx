import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Copy,
  Cpu,
  Database,
  FileDown,
  GitBranch,
  Layers3,
  Menu,
  Monitor,
  Moon,
  Network,
  Sun,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import {
  experience,
  expertise,
  profile,
  projects,
  type Project,
} from "./content";

const iconProps = { size: 18, strokeWidth: 1.6, "aria-hidden": true } as const;

function Mark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="9" fill="currentColor" />
      <path
        d="m9 11 6 7v7m0-7 5-7m3 14V15h5"
        stroke="var(--on-accent)"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function SiteHeader({ prefix = "./" }: { prefix?: string }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href={prefix} aria-label="Yash Roushan, home">
          <Mark />
          <span>Yash Roushan</span>
        </a>
        <nav
          id="site-navigation"
          className="navigation"
          aria-label="Main navigation"
        >
          {["Work", "Expertise", "Experience", "About"].map((item) => (
            <a
              key={item}
              href={`${prefix}#${item.toLowerCase()}`}
              data-section={item.toLowerCase()}
            >
              {item}
            </a>
          ))}
          <a className="mobile-contact" href={`${prefix}#contact`}>
            Contact
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-toggle requires-js"
            type="button"
            aria-label="Switch to light theme"
            title="Switch colour theme"
            data-theme-toggle
          >
            <Sun {...iconProps} className="sun-icon" />
            <Moon {...iconProps} className="moon-icon" />
          </button>
          <a
            className="resume-button"
            href={`${prefix}${profile.resume}`}
            download
          >
            <span>Résumé</span>
            <ArrowUpRight {...iconProps} />
          </a>
          <button
            className="icon-button menu-toggle requires-js"
            type="button"
            aria-label="Open navigation"
            aria-expanded="false"
            aria-controls="site-navigation"
            data-menu-toggle
          >
            <Menu {...iconProps} className="menu-icon" />
            <X {...iconProps} className="close-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const caseHref = `./work/${project.slug}/`;
  if (project.art.kind === "scheduler") {
    return (
      <article className="systems-project reveal" style={{ gridColumn: "1 / -1", marginTop: 0 }}>
        <ProcessVisual />
        <div className="systems-copy">
          <p className="eyebrow">{project.category}</p>
          <h3><a href={caseHref}>{project.name}</a></h3>
          <p>{project.description}</p>
          <TagList tags={project.stack} />
        </div>
        <a className="round-link" href={caseHref} aria-label={`Read the ${project.name} case study`}>
          <ArrowUpRight size={24} aria-hidden="true" />
        </a>
      </article>
    );
  }
  return (
    <article className={`project-card reveal ${project.tone}`}>
      <a
        className="project-image"
        href={caseHref}
        aria-label={`Read the ${project.name} case study`}
      >
        <img
          src={`./art/${project.art.file}`}
          width="720"
          height="372"
          loading="lazy"
          decoding="async"
          alt={project.art.alt}
        />
        <span className="image-arrow">
          <ArrowUpRight size={22} aria-hidden="true" />
        </span>
      </a>
      <div className="project-body">
        <p className="eyebrow project-category">{project.category}</p>
        <h3>
          <a href={caseHref}>{project.name}</a>
        </h3>
        <p className="project-description">{project.description}</p>
        <TagList tags={project.stack} />
        <div className="project-actions">
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-demo-link">
              Try live demo <ArrowUpRight {...iconProps} />
            </a>
          ) : null}
          <a href={caseHref}>
            Read case study <ArrowRight {...iconProps} />
          </a>
          <a
            href={project.repository}
            className="subtle-link"
            aria-label={`${project.name} source on GitHub`}
          >
            <GitBranch {...iconProps} /> Source{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProcessVisual() {
  return (
    <div className="process-visual" aria-hidden="true">
      <div className="process-label">
        <Terminal size={15} /> process.scheduler
      </div>
      <div className="schedule-row">
        <span>node_01</span>
        <i className="running" />
        <i className="running" />
        <i className="blocked" />
        <i className="running" />
        <i className="running" />
      </div>
      <div className="schedule-row">
        <span>node_02</span>
        <i className="blocked" />
        <i className="running" />
        <i className="running" />
        <i className="running" />
        <i className="blocked" />
      </div>
      <div className="schedule-key">
        <span>
          <i className="running" /> Running
        </span>
        <span>
          <i className="blocked" /> Blocked
        </span>
        <span>Illustration</span>
      </div>
    </div>
  );
}

export function SiteFooter({ prefix = "./" }: { prefix?: string }) {
  return (
    <footer className="site-footer container">
      <a href={prefix} className="footer-brand">
        <Mark />
        <span>Yash Roushan</span>
      </a>
      <p>Built with care. Halifax, Canada.</p>
      <a href={`${prefix}#top`}>
        Back to top <ArrowUpRight {...iconProps} />
      </a>
    </footer>
  );
}

function Contact({ prefix = "./" }: { prefix?: string }) {
  return (
    <section
      id="contact"
      className="contact-section container reveal"
      aria-labelledby="contact-title"
    >
      <div className="contact-top">
        <p className="eyebrow">
          <span className="status-dot" /> Open to software engineering
          opportunities
        </p>
        <ArrowDownRight
          className="contact-arrow"
          size={52}
          strokeWidth={1}
          aria-hidden="true"
        />
      </div>
      <h2 id="contact-title">
        Let’s build something{" "}
        <br />
        <span className="muted">worth using.</span>
      </h2>
      <p className="contact-copy">
        Front-end, back-end and full-stack roles.
        <br />
        Based in Halifax. Open to opportunities across Canada.
      </p>
      <div className="email-row">
        <a href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight aria-hidden="true" size={26} />
        </a>
        <button
          type="button"
          className="icon-button copy-button requires-js"
          aria-label="Copy email address"
          data-copy-email={profile.email}
        >
          <Copy {...iconProps} />
        </button>
        <span
          className="copy-status"
          role="status"
          aria-live="polite"
          data-copy-status
        />
      </div>
      <div className="contact-links">
        <a href={profile.github}>
          <GitBranch {...iconProps} /> GitHub{" "}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a href={profile.linkedin}>
          LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a href={`${prefix}${profile.resume}`} download>
          <FileDown {...iconProps} /> Download résumé
        </a>
      </div>
    </section>
  );
}

export function Home() {
  const expertiseIcons: Record<string, ReactNode> = {
    interface: <Monitor />,
    server: <Code2 />,
    database: <Database />,
    cloud: <Cloud />,
    ai: <Cpu />,
    network: <Network />,
  };
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="accent-line" /> Software engineer · Full-stack
              developer
            </p>
            <h1 id="hero-title">
              Yash
              <br />
              Roushan<span className="accent">.</span>
            </h1>
            <p className="hero-statement">From interface to infrastructure.</p>
            <p className="hero-description">
              I build React interfaces, Node.js services and local AI tools that
              make complex systems easier to use.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View my work <ArrowDownRight size={19} aria-hidden="true" />
              </a>
              <a className="button button-quiet" href="#contact">
                Contact me <ArrowUpRight {...iconProps} />
              </a>
            </div>
            <div className="hero-location">
              <span className="status-dot" /> Halifax, Canada · Two Irving Oil co-ops
            </div>
          </div>
          <figure className="hero-art">
            <div className="art-grid" aria-hidden="true" />
            <picture>
              <source
                media="(max-width: 700px)"
                type="image/avif"
                srcSet="./art/compute-core-mobile.avif"
              />
              <source
                srcSet="./art/compute-core-small.webp 640w, ./art/compute-core.webp 1280w"
                sizes="(max-width: 700px) 90vw, (max-width: 1100px) 48vw, 570px"
                type="image/webp"
              />
              <img
                className="core-image"
                src="./art/compute-core.webp"
                width="1280"
                height="1080"
                fetchPriority="high"
                decoding="async"
                alt="Original exploded technical sculpture with a graphite interface layer, amber logic board and copper-contact foundation"
              />
            </picture>
            <span className="layer-label label-interface" aria-hidden="true">
              <i /> Interface
            </span>
            <span className="layer-label label-logic" aria-hidden="true">
              <i /> Logic
            </span>
            <span className="layer-label label-foundation" aria-hidden="true">
              <i /> Foundation
            </span>
            <figcaption>
              <span>
                <Layers3 size={14} aria-hidden="true" /> Anatomy of an application
              </span>
              <span>React · Node.js · Python</span>
            </figcaption>
          </figure>
        </section>
        <div className="hero-foot container">
          <p>Built 3 monitoring dashboards at Irving Oil</p>
          <a href="#work">
            Explore the work <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>

        <section
          className="section container"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Applications &amp; systems</p>
              <h2 id="work-title">
                Selected work<span className="accent">.</span>
              </h2>
            </div>
            <a
              className="text-link"
              href={`${profile.github}?tab=repositories`}
            >
              All repositories <ArrowUpRight {...iconProps} />
            </a>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section
          className="section expertise-section container"
          id="expertise"
          aria-labelledby="expertise-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Technical expertise</p>
              <h2 id="expertise-title">
                Across the stack<span className="accent">.</span>
              </h2>
            </div>
            <p className="section-intro">
              The interface, the services behind it,{" "}
              <br />
              and the environment it runs in.
            </p>
          </div>
          <div className="expertise-grid">
            {expertise.map((item, index) => (
              <article
                className={`expertise-card reveal expertise-${index}`}
                key={item.title}
              >
                <div className="expertise-icon" aria-hidden="true">
                  {expertiseIcons[item.icon]}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="expertise-bottom">
                  <p className="technical-label">{item.tags}</p>
                  <a
                    href={
                      item.projectSlug === null
                        ? "#experience"
                        : `./work/${item.projectSlug}/`
                    }
                  >
                    {item.evidence}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section container experience-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="experience-intro reveal">
            <p className="eyebrow">Career timeline</p>
            <h2 id="experience-title">
              Professional{" "}
              <br />
              experience<span className="accent">.</span>
            </h2>
            <p>
              At Irving Oil, I mapped cloud networks and built monitoring dashboards.
              At Dalhousie, I helped students and staff get back to work.
            </p>
            <div className="experience-metrics">
              <div>
                <strong>319</strong>
                <span>Cisco ISE nodes audited</span>
              </div>
              <div>
                <strong>37</strong>
                <span>Network maps updated</span>
              </div>
            </div>
            <p className="metric-source">Network Analyst · Irving Oil</p>
          </div>
          <div className="timeline">
            {experience.map((role, index) => (
              <details
                className="role reveal"
                key={`${role.company}-${role.role}`}
                open={index === 0 || index === 1}
              >
                <summary>
                  <div className="role-date">{role.period}</div>
                  <div className="role-heading">
                    <div>
                      <h3>{role.role}</h3>
                      <span>{role.company}</span>
                    </div>
                    <ChevronDown size={20} aria-hidden="true" />
                  </div>
                  <p>{role.summary}</p>
                </summary>
                <div className="role-details">
                  <p className="technical-label">{role.location}</p>
                  <ul>
                    {role.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="section container about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-title reveal">
            <p className="eyebrow">About me</p>
            <h2 id="about-title">
              Curious about{" "}
              <br />
              how it all works<span className="accent">.</span>
            </h2>
          </div>
          <div className="about-copy reveal">
            <p className="large-copy">
              I’m Yash, a Computer Science graduate from Dalhousie University. I
              like turning a complicated problem into software that feels
              straightforward to use.
            </p>
            <p>
              My work at Irving Oil and Dalhousie put me close to the people,
              dependencies and operational details behind real systems. My
              projects bring that perspective into the interface, API and
              database.
            </p>
            <p>
              I’m looking for a software engineering role where I can build
              useful things, collaborate with people who care about their craft
              and keep getting better at mine.
            </p>
            <div className="education">
              <div className="education-top">
                <span className="education-symbol" aria-hidden="true">
                  <Code2 size={20} />
                </span>
                <div>
                  <h3>Dalhousie University</h3>
                  <p>Bachelor of Computer Science · Graduated October 2026</p>
                </div>
              </div>
              <ul>
                <li>
                  <strong>
                    3.94<span> / 4.30</span>
                  </strong>
                  <span>GPA</span>
                </li>
                <li>Dean’s List</li>
                <li>Sexton Scholar</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="section container approach-section"
          aria-labelledby="approach-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">How I work</p>
              <h2 id="approach-title">
                Clear thinking. Careful building
                <span className="accent">.</span>
              </h2>
            </div>
          </div>
          <div className="approach-grid">
            {[
              {
                icon: <Workflow />,
                title: "Understand the problem",
                body: "Start with the workflow, the people using it and the constraints. Turn feedback into concrete requirements.",
              },
              {
                icon: <Layers3 />,
                title: "Design the connections",
                body: "Map the interface, API and data model together. Make dependencies and trade-offs explicit.",
              },
              {
                icon: <Code2 />,
                title: "Build in clear layers",
                body: "Keep components, services and persistence focused. Make the next change easier to understand.",
              },
              {
                icon: <Check />,
                title: "Verify, then improve",
                body: "Check complete workflows and failure states. Document decisions and make delivery repeatable.",
              },
            ].map((item) => (
              <article className="approach-card reveal" key={item.title}>
                <div className="approach-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

function PortfolioExample() {
  return (
    <div className="example-portfolio">
      <div className="example-header">
        <span>
          <Layers3 {...iconProps} /> Portfolio overview
        </span>
        <span className="technical-label">Sample data</span>
      </div>
      <div className="example-value">
        <p>Portfolio value</p>
        <strong>
          $2,160<span>.00</span>
        </strong>
        <span className="positive">+$160.00 unrealised P/L</span>
      </div>
      <div
        className="example-tabs"
        role="tablist"
        aria-label="Sample portfolio view"
      >
        <button
          id="tab-holdings"
          role="tab"
          aria-selected="true"
          aria-controls="panel-holdings"
          data-tab
        >
          Holdings
        </button>
        <button
          id="tab-transactions"
          role="tab"
          aria-selected="false"
          aria-controls="panel-transactions"
          tabIndex={-1}
          data-tab
        >
          Transactions
        </button>
      </div>
      <div
        id="panel-holdings"
        role="tabpanel"
        aria-labelledby="tab-holdings"
        tabIndex={0}
      >
        <table>
          <caption className="sr-only">
            Illustrative holdings at sample prices
          </caption>
          <thead>
            <tr>
              <th scope="col">Asset</th>
              <th scope="col">Shares</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">AAPL</th>
              <td>5</td>
              <td>$900.00</td>
            </tr>
            <tr>
              <th scope="row">MSFT</th>
              <td>3</td>
              <td>$1,260.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2} scope="row">
                Total
              </th>
              <td>$2,160.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div
        id="panel-transactions"
        role="tabpanel"
        aria-labelledby="tab-transactions"
        tabIndex={0}
        hidden
      >
        <table>
          <caption className="sr-only">
            Illustrative buy transactions with zero sample fees
          </caption>
          <thead>
            <tr>
              <th scope="col">Trade</th>
              <th scope="col">Shares</th>
              <th scope="col">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Buy AAPL</th>
              <td>5</td>
              <td>$800.00</td>
            </tr>
            <tr>
              <th scope="row">Buy MSFT</th>
              <td>3</td>
              <td>$1,200.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2} scope="row">
                Cost basis
              </th>
              <td>$2,000.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="example-note">
        Illustrative interface with fixed sample prices and zero fees.
      </p>
    </div>
  );
}

function ChatExample() {
  return (
    <div className="example-chat">
      <div className="example-header">
        <span>
          <Cpu {...iconProps} /> IT Help Desk
        </span>
        <span className="technical-label">Example flow</span>
      </div>
      <p className="chat-instruction">
        Choose a support question to explore the resource-first flow.
      </p>
      <div
        className="chat-options"
        role="group"
        aria-label="Example support questions"
      >
        <button type="button" data-chat-example="password" aria-pressed="true">
          Forgot password
        </button>
        <button type="button" data-chat-example="printer" aria-pressed="false">
          Printer setup
        </button>
        <button type="button" data-chat-example="booking" aria-pressed="false">
          Room booking
        </button>
      </div>
      <div className="chat-messages" aria-live="polite" aria-atomic="true">
        <div className="chat-user" data-chat-question>
          Forgot password
        </div>
        <div className="chat-assistant">
          <span className="assistant-icon" aria-hidden="true">
            <Cpu size={18} />
          </span>
          <div>
            <p data-chat-answer>
              The support resource for resetting a CSID password is the CSID
              account service.
            </p>
            <a data-chat-resource href="https://csid.cs.dal.ca">
              Open CSID account service{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="chat-route">
        <Check size={15} aria-hidden="true" /> Curated resource matched
        <span>FastAPI → resource link</span>
      </div>
      <p className="example-note">
        Preset responses from the repository’s resource mappings. Local
        inference runs when you start the project with Ollama.
      </p>
    </div>
  );
}

function ProcessExample() {
  return (
    <div className="example-process">
      <div className="example-header">
        <span>
          <Terminal {...iconProps} /> Scheduler trace
        </span>
        <span className="technical-label">Fixture 00</span>
      </div>
      <p className="chat-instruction">
        Node 01 · Process 1 · Step through the repository’s expected trace.
      </p>
      <div className="process-readout" aria-live="polite" aria-atomic="true">
        <span className="technical-label" data-process-tick>
          Tick 0
        </span>
        <strong data-process-state>Running</strong>
        <p data-process-description>
          The process enters the ready queue and begins execution.
        </p>
      </div>
      <div
        className="trace-progress"
        role="img"
        aria-label="Process trace progress, step 1 of 6"
        data-trace-progress
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i === 0 ? "active" : ""} />
        ))}
      </div>
      <div className="trace-controls">
        <button
          className="button button-secondary"
          data-process-reset
          type="button"
        >
          Reset
        </button>
        <button
          className="button button-primary"
          data-process-next
          type="button"
        >
          Next state <ArrowRight {...iconProps} />
        </button>
      </div>
      <p className="example-note">
        Expected-output trace from the supplied test fixture. Run the C source
        to execute the simulator.
      </p>
    </div>
  );
}

const casePreviews = {
  portfolio: {
    description: "Switch between sample holdings and their underlying transactions.",
    Example: PortfolioExample,
  },
  helpdesk: {
    description: "See how common support questions map to curated resources.",
    Example: ChatExample,
  },
  scheduler: {
    description: "Follow one process as the scheduler moves it between states.",
    Example: ProcessExample,
  },
};

export function CaseStudy({ project }: { project: Project }) {
  const preview = project.preview ? casePreviews[project.preview] : undefined;
  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = index >= 0 && projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;
  return (
    <>
      <SiteHeader prefix="../../" />
      <main id="main-content" className={`case-study ${project.tone}`}>
        <div className="container">
          <a className="back-link" href="../../#work">
            <ArrowLeft {...iconProps} /> Selected work
          </a>
          <header className="case-heading">
            <p className="eyebrow">{project.category}</p>
            <h1>
              {project.name}
              <span className="accent">.</span>
            </h1>
            <p>{project.summary}</p>
            <TagList tags={project.stack} />
            <div className="case-primary-actions">
              {project.demo ? (
                <a className="button button-primary" href={project.demo} target="_blank" rel="noopener noreferrer">
                  Try live demo <ArrowUpRight {...iconProps} />
                </a>
              ) : null}
              <a className={`button ${project.demo ? "button-secondary" : "button-primary"}`} href={project.repository}>
                <GitBranch {...iconProps} /> Explore the source{" "}
                <ArrowUpRight {...iconProps} />
              </a>
            </div>
          </header>
          <div className="case-art">
            {project.art.kind === "image" ? (
              <img
                src={`../../art/${project.art.file}`}
                width="720"
                height="372"
                alt={project.art.alt}
                fetchPriority="high"
              />
            ) : (
              <ProcessVisual />
            )}
          </div>
          <div className="case-content">
            <section className="case-section">
              <h2>The challenge</h2>
              <p className="large-copy">{project.challenge}</p>
            </section>
            <section className="case-section">
              <h2>System architecture</h2>
              <ol className="architecture-flow">
                {project.architecture.map((layer, i) => (
                  <li key={layer.title}>
                    <span className="architecture-icon" aria-hidden="true">
                      {i === 0 ? (
                        <Monitor />
                      ) : i === 1 ? (
                        <Code2 />
                      ) : (
                        <Database />
                      )}
                    </span>
                    <h3>{layer.title}</h3>
                    <p>{layer.detail}</p>
                    {i < project.architecture.length - 1 && (
                      <ArrowRight
                        className="flow-arrow"
                        size={20}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </section>
            <section className="case-section">
              <h2>Implementation decisions</h2>
              <div className="decisions">
                {project.decisions.map((decision) => (
                  <article key={decision.title}>
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                  </article>
                ))}
              </div>
            </section>
            {preview && (
              <section className="case-section preview-section">
                <div>
                  <p className="eyebrow">An interactive illustration</p>
                  <h2>Explore the flow</h2>
                  <p>{preview.description}</p>
                </div>
                <preview.Example />
              </section>
            )}
            <section className="case-section feature-section">
              <div>
                <h2>Implemented in the source</h2>
                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Check {...iconProps} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="engineering-note">
                <h3>Engineering notes</h3>
                <p>{project.notes}</p>
              </aside>
            </section>
            <div className="case-end">
              <a className="button button-primary" href={project.repository}>
                <GitBranch {...iconProps} /> View repository{" "}
                <ArrowUpRight {...iconProps} />
              </a>
              {next && (
                <a className="next-project" href={`../${next.slug}/`}>
                  <span>Next case study</span>
                  <strong>
                    {next.name} <ArrowRight {...iconProps} />
                  </strong>
                </a>
              )}
            </div>
          </div>
        </div>
        <Contact prefix="../../" />
      </main>
      <SiteFooter prefix="../../" />
    </>
  );
}

export function NotFound({ home = "/" }: { home?: string }) {
  return (
    <>
      <SiteHeader prefix={home} />
      <main id="main-content" className="not-found container">
        <p className="eyebrow">404 · Page unavailable</p>
        <h1>
          A different
          <br />
          starting point<span className="accent">.</span>
        </h1>
        <p>
          The page you’re looking for may have moved. Explore my selected work
          from the portfolio.
        </p>
        <a className="button button-primary" href={home}>
          Back to the portfolio <ArrowRight {...iconProps} />
        </a>
      </main>
      <SiteFooter prefix={home} />
    </>
  );
}
