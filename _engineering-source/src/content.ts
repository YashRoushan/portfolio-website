export const profile = {
  name: "Yash Roushan",
  role: "Software Engineer · Full-Stack Developer",
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
  art: { kind: "image"; file: string; alt: string } | { kind: "scheduler" };
  preview?: "portfolio" | "helpdesk" | "scheduler";
  tone: string;
  challenge: string;
  decisions: { title: string; body: string }[];
  architecture: { title: string; detail: string }[];
  features: string[];
  notes: string;
}

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
    art: {
      kind: "image",
      file: "stock-preview.svg",
      alt: "Illustrative sample portfolio showing holdings and cost basis",
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
    slug: "local-it-help-desk",
    name: "Local IT Help Desk Chatbot",
    category: "Local AI application",
    description: "A FastAPI assistant that checks campus resources before calling a local language model.",
    summary:
      "A browser-based help-desk assistant that combines curated technical resources with local language-model inference.",
    stack: ["Python", "FastAPI", "Ollama", "REST APIs"],
    repository: "https://github.com/YashRoushan/localchatbot",
    art: {
      kind: "image",
      file: "helpdesk-preview.svg",
      alt: "Example IT help-desk conversation about a CSID password reset",
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
        body: "The implementation includes rate limiting at six requests per minute per IP, a short in-process conversation buffer and error handling around the local model call.",
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
      "Short conversation context",
      "Rate limiting and error handling",
    ],
    notes:
      "The preview shows an example support flow. Run the repository locally with Ollama to use the model. The prototype stores a five-message buffer in process memory, shared across requests. Per-user conversation isolation would be a next step for multi-user deployment.",
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
    art: { kind: "scheduler" },
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

export const experience = [
  {
    company: "Irving Oil",
    role: "IT Analyst, Solutions",
    period: "Jan — Apr 2026",
    location: "Saint John, NB · Co-op",
    summary: "Connecting application requirements to the systems behind them.",
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
    summary:
      "Making enterprise infrastructure easier to understand and support.",
    points: [
      "Built three SolarWinds dashboards from Network, Service Desk and Cloud requirements to support incident triage.",
      "Audited 319 Cisco ISE nodes, investigated 29 systems and updated 37 network maps.",
      "Created two Azure cloud network maps and shared troubleshooting guidance with infrastructure teams.",
    ],
  },
  {
    company: "Empovation / Worsship",
    role: "Backend Developer",
    period: "Jun — Dec 2025",
    location: "Remote",
    summary:
      "Building the API and data layer for everyday organisational workflows.",
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
    summary:
      "Solving real technical problems for the people using the systems.",
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
    summary: "Turning product data into reports people could use.",
    points: [
      "Analysed product data and ETL workflows.",
      "Built Excel and Power BI reports to support stakeholder decisions.",
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
    title: "AI applications",
    body: "Local model integration, intent matching and resource retrieval for a focused support experience.",
    tags: "Ollama · FastAPI · Python",
    evidence: "Local IT Help Desk Chatbot",
    projectSlug: "local-it-help-desk",
  },
  {
    icon: "network",
    title: "Enterprise systems",
    body: "Infrastructure monitoring, network troubleshooting and workflow automation in working IT environments.",
    tags: "SolarWinds · Cisco ISE · Power Platform",
    evidence: "Irving Oil & Dalhousie",
    projectSlug: null,
  },
];
