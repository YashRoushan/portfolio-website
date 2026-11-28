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
  FileText,
  GitBranch,
  BriefcaseBusiness,
  CloudSun,
  Footprints,
  Gamepad2,
  ListChecks,
  MessageSquare,
  Layers3,
  Menu,
  Monitor,
  Moon,
  Network,
  Sun,
  Smartphone,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import {
  experience,
  expertise,
  profile,
  projects,
  repositoryProjects,
  type Project,
  type RepositoryProject,
} from "./content";

const iconProps = { size: 18, strokeWidth: 1.6, "aria-hidden": true } as const;

function Mark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 36 36"
      width="36"
      height="36"
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

export function ProfilePortrait({ prefix = "./", sizes }: { prefix?: string; sizes: string }) {
  const path = prefix + "portraits/yash-";
  return (
    <img
      className="profile-portrait"
      src={path + "700.webp"}
      srcSet={path + "360.webp 360w, " + path + "700.webp 700w"}
      sizes={sizes}
      width={700}
      height={875}
      alt="Yash Roushan in a navy suit on stone steps"
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  );
}

export function SiteHeader({ prefix = "./", current = "" }: { prefix?: string; current?: "work" | "resume" | "" }) {
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
          {["About", "Work", "Experience", "Expertise"].map((item) => (
            <a
              key={item}
              href={`${prefix}#${item.toLowerCase()}`}
              data-section={item.toLowerCase()}
              aria-current={current === "work" && item === "Work" ? "location" : undefined}
            >
              {item}
            </a>
          ))}
          <a href={`${prefix}#contact`} data-section="contact">
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
            href={`${prefix}resume/`}
            aria-current={current === "resume" ? "page" : undefined}
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
  const screen = project.showcase;
  if (!screen || !project.demo) return null;
  const caseHref = `./work/${project.slug}/`;
  const isDashboard = project.preview === "portfolio";
  return (
    <article id={project.slug} aria-labelledby={project.slug + "-title"} tabIndex={-1} className={`project-card featured-project ${project.tone}`}>
      {isDashboard && (
        <header className="featured-heading">
          <h3 id={project.slug + "-title"}>{project.name}</h3>
          <p>{project.category}</p>
        </header>
      )}
      <figure className={isDashboard ? "product-window" : `product-still still-${project.preview}`}>
        <picture>
          {isDashboard && <source media="(max-width: 620px)" srcSet="./art/stock-chart.webp" width="740" height="325" />}
          <img src={`./art/${screen.image}`} width={screen.width} height={screen.height}
            alt={screen.alt} loading={isDashboard ? "eager" : "lazy"} decoding="async" />
        </picture>
      </figure>
      <div className="project-body">
        {!isDashboard && (
          <>
            <p className="eyebrow project-category">{project.category}</p>
            <h3 id={project.slug + "-title"}>{project.name}</h3>
          </>
        )}
        <p className="project-description">{project.description}</p>
        <TagList tags={project.stack} />
        <div className="featured-actions">
          <a className="button button-primary" href={project.demo}>
            {screen.action} <ArrowUpRight {...iconProps} />
          </a>
          <div className="featured-links">
            <a href={caseHref} aria-label={`Read the ${project.name} case study`}>Case study <ArrowRight size={15} aria-hidden="true" /></a>
            <a href={project.repository} aria-label={`${project.name} source on GitHub`}>Source <GitBranch size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

function RepositoryCard({ project }: { project: RepositoryProject }) {
  const Icon = {
    tasks: ListChecks,
    mobile: Smartphone,
    weather: CloudSun,
    game: Gamepad2,
    jobs: BriefcaseBusiness,
    walk: Footprints,
    chat: MessageSquare,
    systems: Terminal,
  }[project.icon];

  return (
    <article className="repository-card reveal">
      <div className="repository-card-top">
        <span className="repository-icon"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
      </div>
      <p className="eyebrow">{project.category}</p>
      <h3>{project.name}</h3>
      <p className="repository-description">{project.description}</p>
      <TagList tags={project.stack} />
      <p className="repository-note">{project.note}</p>
      {(project.demo || project.caseStudy || project.repository) && (
        <div className="repository-actions">
          {project.demo && <a className="repository-demo" href={project.demo} target={project.demo.startsWith("./") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={`Open ${project.name} live demo`}>Open demo <ArrowUpRight {...iconProps} /></a>}
          {project.caseStudy && <a href={project.caseStudy}>Read case study <ArrowRight {...iconProps} /></a>}
          {project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} source on GitHub`}>View source <GitBranch size={16} aria-hidden="true" /></a>}
        </div>
      )}
    </article>
  );
}

export function SiteFooter({ prefix = "./" }: { prefix?: string }) {
  return (
    <footer className="site-footer container">
      <a href={prefix} className="footer-brand">
        <Mark />
        <span>Yash Roushan</span>
      </a>
      <p>{profile.location}</p>
      <a href="#top">
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
        Full-stack development, AI engineering, automation and enterprise software.
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
        <a href={`${prefix}resume/`}>
          <FileText {...iconProps} /> View résumé
        </a>
      </div>
    </section>
  );
}

export function Home() {
  const featuredProjects = projects.filter(project => project.showcase);
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
      <main id="main-content" tabIndex={-1}>
        <section id="about" className="portrait-intro container" aria-labelledby="about-title">
          <div className="intro-portrait">
            <ProfilePortrait sizes="(max-width: 620px) 65vw, (max-width: 1100px) 42vw, 520px" />
          </div>
          <div className="intro-copy">
            <div className="intro-identity">
              <p id="about-title" className="eyebrow">About me</p>
              <h1 id="hero-title">Yash Roushan<span className="accent">.</span></h1>
            </div>
            <p className="intro-statement">I’m a full-stack engineer in Halifax building web apps and AI tools.</p>
            <div className="intro-actions">
              <a className="button button-primary" href="#work">View selected work <ArrowDownRight {...iconProps} /></a>
              <a className="text-link" href="#background">My background <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
        <section
          className="section container scroll-chapter"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="chapter-heading">
            <h2 id="work-title">
              Selected work<span className="accent">.</span>
            </h2>
            <nav className="project-index" aria-label="Featured projects">
              {featuredProjects.map(project => (
                <a key={project.slug} href={`#${project.slug}`}>{project.name}</a>
              ))}
            </nav>
          </div>
          <div className="featured-grid">
            {featuredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
            <div className="work-collection-links">
              <a className="text-link" href="#more-projects">
                Coursework & experiments <ArrowDown {...iconProps} />
              </a>
              <a className="text-link" href={`${profile.github}?tab=repositories`}>
                All repositories <ArrowUpRight {...iconProps} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="section container scroll-chapter"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="chapter-heading">
            <h2 id="experience-title">Professional experience<span className="accent">.</span></h2>

            <div className="experience-metrics">
              <div>
                <strong>319</strong>
                <span>Cisco ISE nodes audited</span>
              </div>
              <div>
                <strong>3</strong>
                <span>SolarWinds dashboards built</span>
              </div>
            </div>
            <p className="metric-source">Network Analyst · Irving Oil</p>
          </div>
          <div className="timeline">
            {experience.map(role => (
              <details
                className="role reveal"
                key={`${role.company}-${role.role}`}
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
                  <p>{role.points[0]}</p>
                </summary>
                <div className="role-details">
                  <p className="technical-label">{role.location}</p>
                  <ul>
                    {role.points.slice(1).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="section container scroll-chapter"
          id="expertise"
          aria-labelledby="expertise-title"
        >
          <div className="chapter-heading">
            <h2 id="expertise-title">
              Technical expertise<span className="accent">.</span>
            </h2>
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

        <section className="section container scroll-chapter" id="more-projects" aria-labelledby="more-projects-title">
          <div className="chapter-heading"><h2 id="more-projects-title">Coursework &amp; experiments<span className="accent">.</span></h2></div>
          <details className="coursework-disclosure">
            <summary>
              <span><span className="when-closed">Show</span><span className="when-open">Hide</span> {repositoryProjects.length} coursework projects</span>
              <ChevronDown {...iconProps} />
            </summary>
            <div className="repository-grid">
              {repositoryProjects.map(project => <RepositoryCard key={project.name} project={project} />)}
            </div>
          </details>
        </section>

        <section
          className="section container about-section"
          id="background"
          aria-labelledby="background-title"
        >
          <div className="about-copy reveal">
            <h2 id="background-title">Background &amp; education<span className="accent">.</span></h2>
            <p className="large-copy">
              I like making complicated software feel straightforward to use.
            </p>
            <p>
              At Irving Oil, I traced the network and cloud dependencies behind
              everyday tools. At Dalhousie, I worked directly with the people who
              needed those tools to work. Both experiences shape how I design
              interfaces, build APIs and test what happens when something fails.
            </p>
            <a className="text-link about-resume-link" href="./resume/">
              View my résumé <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="education">
            <div className="education-top">
              <span className="education-symbol" aria-hidden="true"><Code2 size={20} /></span>
              <div>
                <h3>Dalhousie University</h3>
                <p>Bachelor of Computer Science · Completed September 2026</p>
                <p>Convocation October 2026</p>
              </div>
            </div>
            <ul>
              <li>
                <strong>3.94<span> / 4.30</span></strong>
                <span>GPA</span>
              </li>
              <li>Dean’s List</li>
              <li>Sexton Scholar</li>
            </ul>
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
        <strong data-portfolio-value>$2,160.00</strong>
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
              <td data-apple-shares>5</td>
              <td data-apple-value>$900.00</td>
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
              <td data-portfolio-value>$2,160.00</td>
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
            <tr data-extra-trade hidden>
              <th scope="row">Buy AAPL</th><td>1</td><td>$180.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2} scope="row">
                Cost basis
              </th>
              <td data-portfolio-basis>$2,000.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="sample-purchase">
        <label><input type="checkbox" data-sample-trade /> Buy 1 more AAPL share at $180</label>
        <p role="status" data-average-cost>AAPL average cost per share: $160.00</p>
      </div>
      <p className="example-note">Sample USD prices. Trades in this preview carry zero fees.</p>
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

function PlannerExample() {
  return (
    <div className="example-chat planner-example">
      <div className="example-header"><span><ListChecks {...iconProps} /> My tasks</span><span className="technical-label">Sample board</span></div>
      <p className="chat-instruction">Check off the work as you finish it.</p>
      <fieldset className="planner-checklist">
        <legend className="sr-only">Tasks for this week</legend>
        {["Review the API design", "Plan the week", "Read one chapter"].map((task, index) => (
          <label key={task}><input type="checkbox" data-planner-task defaultChecked={index === 0} /><span>{task}</span></label>
        ))}
      </fieldset>
      <p className="planner-progress" role="status" data-planner-progress>1 of 3 tasks complete</p>
    </div>
  );
}

const casePreviews = {
  portfolio: PortfolioExample,
  planner: PlannerExample,
  helpdesk: ChatExample,
  scheduler: ProcessExample,
};

export function CaseStudy({ project }: { project: Project }) {
  const Preview = casePreviews[project.preview];
  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = index >= 0 && projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;
  const sections = [
    { id: "preview", title: "Interactive preview" },
    { id: "challenge", title: "The challenge" },
    { id: "architecture", title: "Architecture" },
    { id: "decisions", title: "Implementation" },
    { id: "features", title: "Features & notes" },
  ];
  return (
    <>
      <SiteHeader prefix="../../" current="work" />
      <main id="main-content" className={`case-study ${project.tone}`}>
        <div className="container">
          <a className="back-link" href="../../#work">
            <ArrowLeft {...iconProps} /> Selected work
          </a>
          <div className="case-summary">
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
                  <a className="button button-primary" href={project.demo.startsWith("./") ? "../../" + project.demo.slice(2) : project.demo} target={project.demo.startsWith("./") ? undefined : "_blank"} rel="noopener noreferrer">
                    Try live demo <ArrowUpRight {...iconProps} />
                  </a>
                ) : null}
                <a className={`button ${project.demo ? "button-secondary" : "button-primary"}`} href={project.repository}>
                  <GitBranch {...iconProps} /> Explore the source{" "}
                  <ArrowUpRight {...iconProps} />
                </a>
              </div>
            </header>
            <section className="opening-preview" id="preview" aria-labelledby="preview-title">
              <h2 id="preview-title" className="eyebrow">Interactive preview</h2>
              <Preview />
            </section>
          </div>
          <div className="case-reading">
            <nav className="case-index" aria-label="In this case study">
              <p>In this case study</p>
              <ul>
                {sections.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
              </ul>
            </nav>
            <div className="case-content">
              <section className="case-section" id="challenge">
                <h2>The challenge</h2>
                <p className="large-copy">{project.challenge}</p>
              </section>
              <section className="case-section" id="architecture">
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
              <section className="case-section" id="decisions">
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
              <section className="case-section feature-section" id="features">
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
        <p className="eyebrow">404</p>
        <h1>Page not found<span className="accent">.</span></h1>
        <p>The address may have changed. Continue to the portfolio or open my résumé.</p>
        <div className="page-actions">
          <a className="button button-primary" href={home}>
            Back to the portfolio <ArrowRight {...iconProps} />
          </a>
          <a className="button button-secondary" href={`${home}resume/`}>View résumé</a>
        </div>
      </main>
      <SiteFooter prefix={home} />
    </>
  );
}
