export const profile = {
  name: "Yash Roushan",
  role: "Software Engineer · Full-Stack Development · AI & Automation",
  email: "yashroushan@dal.ca",
  location: "Halifax, Nova Scotia",
  github: "https://github.com/YashRoushan",
  linkedin: "https://www.linkedin.com/in/yash-roushan-8636a1242/",
  resume: "Yash_Roushan_Resume.pdf",
};

export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  summary: string;
  stack: string[];
  repository: string;
  demo?: string;
  showcase?: { image: string; alt: string; action: string; width: number; height: number };
  preview: "portfolio" | "planner" | "helpdesk" | "scheduler";
  tone: string;
  challenge: string;
  decisions: { title: string; body: string }[];
  architecture: { title: string; detail: string }[];
  features: string[];
  notes: string;
}

export const stockDemoUrl = "https://yash-stock-portfolio-tracker.yashroushan.chatgpt.site";

export const projects: Project[] = [
  {
    slug: "stock-portfolio-tracker",
    name: "Stock Portfolio Tracker",
    category: "Full-stack application",
    description: "A transaction ledger that turns trades and fees into holdings, cost basis and profit/loss.",
    summary:
      "A full-stack application that turns buy and sell transactions into holdings, cost basis, dividends and portfolio performance.",
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "Docker"],
    repository: "https://github.com/YashRoushan/Stock-Portfolio-Tracker",
    demo: stockDemoUrl,
    showcase: {
      image: "stock-screen.webp", width: 1164, height: 422,
      alt: "Stock Atlas overview with the sample portfolio selected and its valuation, gains and dividends visible.",
      action: "Try with sample data",
    },
    preview: "portfolio",
    tone: "green",
    challenge:
      "A portfolio is more than a list of prices. Trades, fees and partial sales all change what a position is worth. The challenge was to make those relationships consistent from the database through to the dashboard.",
    decisions: [
      {
        title: "Start with the transactions",
        body: "Holdings are reconstructed from dated BUY and SELL records. Average-cost accounting separates realised gains from the unrealised performance of shares still held.",
      },
      {
        title: "Make the data model do its part",
        body: "PostgreSQL and Prisma model users, transactions and dividends. Monetary amounts use integer cents, with transaction fees included in the calculations.",
      },
      {
        title: "Separate price data from accounting",
        body: "Quote providers sit behind a common interface and a configurable 60-second cache. Portfolio calculations remain separate from the external market-data provider.",
      },
    ],
    architecture: [
      {
        title: "React + TypeScript",
        detail: "Dashboard, holdings and transactions",
      },
      {
        title: "Express API",
        detail: "JWT routes, Zod validation and quote cache",
      },
      {
        title: "PostgreSQL + Prisma",
        detail: "Users, trades and dividend records",
      },
    ],
    features: [
      "Transaction-based holdings and cost basis",
      "Realised and unrealised profit/loss",
      "Manual dividend records and allocation views",
      "JWT authentication and request validation",
      "Jest and Supertest integration tests",
      "Docker Compose for local services",
    ],
    notes:
      "The preview uses sample data. The source application runs locally with Docker and requires a configured quote provider for market prices. Its trend chart tracks cost basis by transaction date. Dividend records are entered manually.",
  },
  {
    slug: "task-planner",
    name: "Task Planner",
    category: "Full-stack productivity app",
    description: "Plan a week with a task board, checklists and a calendar in a private guest workspace.",
    summary: "A task board, calendar and completion dashboard share one set of tasks. Start with the guest workspace to try the full workflow.",
    stack: ["React", "TypeScript", "REST API", "D1"],
    repository: "https://github.com/YashRoushan/To-Do-App",
    demo: "https://yash-task-planner.yashroushan.chatgpt.site/",
    showcase: {
      image: "planner-screen.webp", width: 1090, height: 550,
      alt: "Task Planner board with example cards grouped under To do, In progress and Done.",
      action: "Try the guest workspace",
    },
    preview: "planner",
    tone: "copper",
    challenge: "Let visitors try a complete task workflow, save changes and return to it without creating an account or editing another visitor’s tasks.",
    architecture: [
      { title: "React interface", detail: "Board, calendar and completion views" },
      { title: "Workers REST API", detail: "Guest sessions and task operations" },
      { title: "D1 storage", detail: "Workspace tasks and their saved changes" },
    ],
    decisions: [
      { title: "Start with a populated board", body: "Example tasks make the three states visible on the first visit. A visitor can edit a card or create one from scratch." },
      { title: "Give each guest a workspace", body: "Changes belong to the guest session. Refreshing the board preserves its tasks." },
    ],
    features: ["Create and edit tasks", "Group cards by status", "Assign priorities and checklists", "Review due dates in the calendar"],
    notes: "The public edition runs on Cloudflare Workers and D1. The original repository includes the Node.js and MongoDB implementation.",
  },
  {
    slug: "local-it-help-desk",
    name: "Local IT Help Desk Chatbot",
    demo: "./demos/helpdesk/",
    category: "Applied AI · IT support",
    description: "A FastAPI assistant that checks campus resources before calling a local language model.",
    summary:
      "A browser-based help-desk assistant that combines curated technical resources with local language-model inference.",
    stack: ["Python", "FastAPI", "Ollama", "REST APIs"],
    repository: "https://github.com/YashRoushan/localchatbot",
    showcase: {
      image: "chat-screen.webp", width: 977, height: 486,
      alt: "The help desk answers an eduroam question with a link to Dalhousie wireless support.",
      action: "Ask a support question",
    },
    preview: "helpdesk",
    tone: "violet",
    challenge:
      "Common support questions benefit from a direct, relevant resource. More open-ended questions need a different path. The challenge was to combine both behaviours in one straightforward chat interface.",
    decisions: [
      {
        title: "Retrieve before generating",
        body: "Fuzzy intent matching checks a curated set of campus support resources first. Matching questions receive relevant links, and other requests are passed to a local Ollama model.",
      },
      {
        title: "Keep the interface focused",
        body: "FastAPI serves a single-column browser chat and a POST /chat endpoint. The interface brings the request, response and next useful resource into one conversation.",
      },
      {
        title: "Handle the operational edges",
        body: "An opaque session cookie scopes short-term context to one browser. The API expires idle sessions, supports conversation reset and serialises turns within each session while separate visitors can proceed concurrently.",
      },
    ],
    architecture: [
      {
        title: "Browser chat",
        detail: "A focused question-and-answer interface",
      },
      { title: "FastAPI", detail: "Intent matching and curated support links" },
      {
        title: "Ollama",
        detail: "Local model fallback for open-ended queries",
      },
    ],
    features: [
      "Browser chat interface",
      "Curated technical-resource retrieval",
      "Fuzzy intent matching",
      "Local Ollama inference",
      "Session-specific contextual memory and reset",
      "Configurable Ollama model",
      "Rate limiting, timeout handling and concurrent session tests",
    ],
    notes:
      "The public demo offers curated links and optional on-device language-model replies. The FastAPI source uses Ollama, with up to five turns in each process-local session and a 30-minute idle expiry. A Dockerfile packages the FastAPI version for an Ollama-backed host.",
  },
  {
    slug: "process-simulator",
    name: "Multi-Node Process Simulator",
    category: "Systems programming · University coursework",
    description: "C, threads and scheduling. An exploration of what happens beneath the application layer.",
    summary:
      "A C/POSIX coursework project exploring process scheduling and concurrent execution across simulated nodes.",
    stack: ["C", "POSIX threads", "Mutexes", "Priority queues"],
    repository: "https://github.com/YashRoushan/Operating_System_Simulator",
    preview: "scheduler",
    tone: "copper",
    challenge:
      "Multiple simulated nodes need to make scheduling decisions while contributing to one coherent result. The challenge was to coordinate concurrent execution and keep process-state transitions understandable.",
    decisions: [
      {
        title: "Model the work explicitly",
        body: "Each node tracks ready and blocked work using priority queues. Scheduling and process-state transitions are represented directly in C.",
      },
      {
        title: "Coordinate concurrent nodes",
        body: "POSIX threads execute simulated nodes. Mutexes protect shared results while the scheduler handles priority and pre-emption.",
      },
      {
        title: "Check against expected traces",
        body: "The repository includes input cases and expected process traces. These make it possible to compare scheduler behaviour across different workloads and thread counts.",
      },
    ],
    architecture: [
      {
        title: "Input workload",
        detail: "Process definitions and scheduling parameters",
      },
      {
        title: "Concurrent nodes",
        detail: "POSIX threads, ready and blocked queues",
      },
      {
        title: "Process trace",
        detail: "Synchronised results and expected-output cases",
      },
    ],
    features: [
      "Multi-node execution with POSIX threads",
      "Per-node ready and blocked queues",
      "Priority and pre-emptive scheduling",
      "Mutex-protected shared results",
      "Repository-supplied expected-output cases",
    ],
    notes:
      "University coursework built on supplied scaffolding. The repository records the implementation and test cases. It is a command-line C application.",
  },
];

export interface RepositoryProject {
  name: string;
  category: string;
  description: string;
  stack: string[];
  repository?: string;
  demo?: string;
  caseStudy?: string;
  note: string;
  icon: "tasks" | "mobile" | "weather" | "game" | "jobs" | "walk" | "chat" | "systems";
}

export const repositoryProjects: RepositoryProject[] = [
  {
    name: "Quick Cash",
    category: "Android marketplace · Team project",
    description: "Co-developed a short-term jobs app that connects employers posting work with applicants searching for listings.",
    stack: ["Java", "Android SDK", "Firebase", "Espresso"],
    note: "I contributed location-aware search, listing workflows, payment-form validation and Android UI tests. Built with Krutik Chaudhary and the project team.",
    icon: "mobile",
  },
  {
    name: "Multi-Node Process Simulator",
    category: "Systems programming · University coursework",
    description: "Simulate process scheduling across nodes with POSIX threads, priority queues and mutex-protected results.",
    stack: ["C", "POSIX threads", "Mutexes"],
    repository: "https://github.com/YashRoushan/Operating_System_Simulator",
    caseStudy: "./work/process-simulator/",
    note: "Command-line coursework with expected scheduling traces and supplied scaffolding.",
    icon: "systems",
  },
  {
    name: "Weather Explorer",
    category: "Live data & API integration",
    description: "Search cities worldwide for current conditions and a forecast, with Celsius and Fahrenheit views.",
    stack: ["React", "JavaScript", "NOAA", "Open-Meteo"],
    repository: "https://github.com/YashRoushan/weather-app",
    demo: "./demos/weather/",
    note: "Open-Meteo adds global coverage. Selected US cities retain NOAA station observations and forecasts.",
    icon: "weather",
  },
  {
    name: "Snake",
    category: "Interactive browser game",
    description: "A grid-based game built around a timed update loop, collision detection and a saved best score.",
    stack: ["JavaScript", "CSS Grid", "Browser storage"],
    repository: "https://github.com/YashRoushan/Snake_Game",
    demo: "./demos/snake/",
    note: "Playable with keyboard or touch controls. Pause and restart without reloading the page.",
    icon: "game",
  },
  {
    name: "Jobify",
    category: "MERN stack · Tutorial project",
    description: "A job-application tracker with authenticated CRUD, search, filters, pagination and application statistics.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    repository: "https://github.com/YashRoushan/Jobify-Project",
    note: "Course-based implementation. Requires a configured server and database to run locally.",
    icon: "jobs",
  },
  {
    name: "Walk Simulator",
    category: "Java · University coursework",
    description: "Explore random, spiral and breadcrumb walks through a desktop simulation with matrix and Markov-chain models.",
    stack: ["Java", "AWT", "Markov chains"],
    repository: "https://github.com/YashRoushan/Walk-Simulator",
    note: "Coursework extending supplied scaffolding, including an AWT view credited to Alex Brandt. Runs locally with Java.",
    icon: "walk",
  },
  {
    name: "Messaging UI Study",
    category: "Front-end interface exercise",
    description: "A React and Material UI layout exploring contact lists and the structure of a conversation screen.",
    stack: ["React", "Material UI", "CSS"],
    repository: "https://github.com/YashRoushan/WhatsApp-Demo-App",
    note: "A static interface study; messaging and search are not connected to a backend.",
    icon: "chat",
  },
];

export const experience = [
  {
    company: "Outlier AI",
    role: "AI Trainer & Coding Evaluator",
    period: "Sep 2026 — Present",
    location: "Remote · Freelance",
    points: [
      "Reviewed Java responses for correctness, algorithmic efficiency, reasoning and edge-case behaviour.",
      "Applied prompt engineering and evaluation rubrics to assess instruction-following.",
      "Compared model outputs and gave structured feedback on logical errors and unsupported claims.",
    ],
  },
  {
    company: "Irving Oil",
    role: "IT Analyst, Solutions",
    period: "Jan — Apr 2026",
    location: "Saint John, NB · Co-op",
    points: [
      "Mapped Azure migration dependencies across applications, network services and integration flows.",
      "Translated Paperless Pilot feedback into workflow issues and proposed fixes for technical stakeholders.",
      "Assessed application ownership, licensing and workflows for the Adobe-to-Tungsten migration.",
    ],
  },
  {
    company: "Irving Oil",
    role: "Network Analyst",
    period: "Sep 2025 — Jan 2026",
    location: "Saint John, NB · Co-op",
    points: [
      "Built 3 SolarWinds dashboards for incident triage and audited 319 Cisco ISE nodes.",
      "Investigated 29 systems and updated 37 network maps for infrastructure teams.",
      "Created two Azure cloud network maps and shared troubleshooting guidance with infrastructure teams.",
    ],
  },
  {
    company: "Empovation / Worsship",
    role: "Backend Developer",
    period: "Jun — Dec 2025",
    location: "Remote",
    points: [
      "Developed Node.js/Express REST APIs and SQL schemas for member records and scheduling.",
      "Connected React interfaces to SQL-backed services with request validation and error handling.",
      "Reviewed Git changes and resolved client-server issues with a remote team.",
    ],
  },
  {
    company: "Dalhousie University",
    role: "Technical Helpdesk Assistant",
    period: "Jan — Apr 2025",
    location: "Halifax, NS · Co-op",
    points: [
      "Diagnosed authentication, DHCP, AV and device incidents for students and staff.",
      "Automated support tasks with SQL and Power Automate.",
      "Wrote reusable troubleshooting and handover guidance.",
    ],
  },
  {
    company: "Dresma",
    role: "Data Analyst Intern",
    period: "Dec 2021 — Sep 2022",
    location: "Delhi, India",
    points: [
      "Built Excel and Power BI reports from product data for stakeholder reviews.",
      "Analysed product data and ETL workflows.",
    ],
  },
];

export const expertise = [
  {
    icon: "interface",
    title: "Front-end engineering",
    body: "Responsive React interfaces, typed components and dashboards that make complex data easier to use.",
    tags: "React · TypeScript · HTML · CSS",
    evidence: "Stock Portfolio Tracker",
    projectSlug: "stock-portfolio-tracker",
  },
  {
    icon: "server",
    title: "Back-end engineering",
    body: "REST services, request validation and the application logic that connects an interface to its data.",
    tags: "Node.js · Express · Python · FastAPI",
    evidence: "Help-desk API",
    projectSlug: "local-it-help-desk",
  },
  {
    icon: "database",
    title: "Databases",
    body: "Relational schemas, transaction records and queries shaped around the workflows they support.",
    tags: "PostgreSQL · SQL · Prisma",
    evidence: "Portfolio data modelling",
    projectSlug: "stock-portfolio-tracker",
  },
  {
    icon: "cloud",
    title: "Cloud & delivery",
    body: "Containerised local services and practical experience mapping application dependencies in Azure.",
    tags: "Docker · Azure · Git · Linux",
    evidence: "Azure work at Irving Oil",
    projectSlug: null,
  },
  {
    icon: "ai",
    title: "AI engineering",
    body: "Built a local LLM assistant with contextual memory, intent matching and resource retrieval. Evaluate model outputs using prompts, test cases and scoring rubrics.",
    tags: "Prompt engineering · Model evaluation · Ollama",
    evidence: "Local IT Help Desk Chatbot",
    projectSlug: "local-it-help-desk",
  },
  {
    icon: "network",
    title: "Enterprise systems & automation",
    body: "Built infrastructure dashboards, mapped Azure application dependencies and automated IT workflows with SQL and Power Automate.",
    tags: "SolarWinds · Azure · SQL · Power Automate",
    evidence: "Irving Oil & Dalhousie",
    projectSlug: null,
  },
];
