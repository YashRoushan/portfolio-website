import type { ProjectEntry, ProjectSlug } from "./types";

export const projects = [
  {
    slug: "dalchess-code",
    title: "DalChess Code",
    role: "Junior Software Developer",
    startDate: "2024-04",
    endDate: "2024-09",
    dateLabel: "April 2024–September 2024",
    shortSummary:
      "A team-built full-stack application for tournament registration, administration, standings, pairings, and data management.",
    problemStatement:
      "Tournament administrators needed interfaces for monitoring and working with tournament data while keeping the application, API, and database behaviour reliable.",
    capabilityCategories: ["software-engineering", "data-automation"],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "JavaScript",
      "MySQL",
      "REST APIs",
    ],
    contribution: [
      "Contributed full-stack features to a team-built tournament administration application.",
      "Worked on tournament registration, administrative CRUD workflows, data displays, and standings and pairings interfaces.",
      "Gathered stakeholder requirements and developed and debugged frontend, REST API, backend, and database behaviour.",
      "Supported reliability through cross-layer troubleshooting, responsive fixes, and documentation.",
    ],
    keyFeatures: [
      "Tournament administration workflows",
      "Administrative dashboards and CRUD workflows",
      "Tournament registration, standings, pairings, and data displays",
      "React interfaces connected to Express.js, REST API, and MySQL layers",
    ],
    engineeringDecisions: [
      "Separated interface, service, API, and relational data responsibilities across a full-stack application.",
      "Used stakeholder requirements to guide administrative data views and workflow behaviour.",
      "Documented behaviour and decisions while troubleshooting across application layers.",
    ],
    testingAndDebugging: [
      "Developed and debugged API, backend, database, and data-display functionality.",
      "Used troubleshooting and documentation to support application reliability.",
    ],
    outcomes: [
      "Contributed tournament administration interfaces and data workflows across the React, Node.js, REST API, and MySQL stack.",
      "Supported maintenance through troubleshooting and technical documentation.",
    ],
    evidenceLinks: [
      {
        label: "View the DalChess Code branch on GitHub",
        href: "https://github.com/YashRoushan/Dal-Chess-Club/tree/DCC-323-YR-shiftPairingsSpreadsheet",
        kind: "repository",
        validationStatus: "validated",
        publicationStatus: "hold-for-review",
        note: "The supplied public branch exists but exposes hard-coded credentials and internal connection details. Keep the link private until credentials are rotated or revoked and Git history is scrubbed.",
      },
    ],
    teamAttribution:
      "Team project; Yash Roushan contributed full-stack features as Junior Software Developer. The repository is multi-author, and its history remains the source of truth for individual code authorship.",
    relatedSkills: [
      "React",
      "Node.js",
      "JavaScript",
      "SQL",
      "REST APIs",
      "Requirements gathering",
      "Troubleshooting",
      "Technical documentation",
    ],
    relatedExperience: ["worsship-backend-developer"],
    displayOrder: 1,
    featured: true,
  },
  {
    slug: "jobify-job-tracker",
    title: "Jobify",
    role: "Full-Stack Developer",
    startDate: "2023-09",
    endDate: "2023-12",
    dateLabel: "September 2023–December 2023",
    shortSummary:
      "A full-stack job-tracking application with responsive interfaces, user accounts, CRUD workflows, REST services, and persistent MongoDB storage.",
    problemStatement:
      "Job seekers needed a persistent application for recording, reviewing, updating, and removing job-tracking information.",
    capabilityCategories: ["software-engineering", "data-automation"],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Render",
    ],
    contribution: [
      "Built a full-stack job-tracking application.",
      "Implemented CRUD functionality and persistent MongoDB storage.",
      "Created responsive interfaces, user-account behaviour, and backend services.",
      "Tested and debugged frontend, backend, REST API, user-account, and database behaviour.",
      "Deployed the application to Render.",
    ],
    keyFeatures: [
      "Create, read, update, and delete job records",
      "Persistent MongoDB data storage",
      "Responsive React interfaces",
      "Node.js and Express.js REST services",
      "User accounts",
    ],
    engineeringDecisions: [
      "Used a React client with Node.js and Express.js services to separate interface and backend responsibilities.",
      "Stored application records in MongoDB so job-tracking data persisted across sessions.",
      "Deployed the full-stack application on Render.",
    ],
    testingAndDebugging: [
      "Tested and debugged the frontend, backend, REST API, user-account workflows, and database behaviour.",
      "Checked CRUD workflows across the interface, service, and persistence layers.",
    ],
    outcomes: [
      "Delivered a working full-stack application for persistent job tracking and account-based use.",
      "Connected responsive interfaces with REST services and MongoDB-backed CRUD workflows.",
    ],
    evidenceLinks: [
      {
        label: "Open the Jobify deployment",
        href: "https://jobify-q02g.onrender.com",
        kind: "live-site",
        validationStatus: "validated",
        publicationStatus: "publish",
        note: "Validated on September 2, 2026. The Render deployment may take longer than 30 seconds to wake from a cold start.",
      },
    ],
    teamAttribution: "Yash Roushan — Full-Stack Developer",
    relatedSkills: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Testing and debugging",
      "Deployment",
    ],
    relatedExperience: ["worsship-backend-developer"],
    displayOrder: 2,
    featured: true,
  },
  {
    slug: "productivity-task-manager",
    title: "Productivity Task Manager",
    role: "Full-Stack Developer",
    startDate: "2025-11",
    endDate: "2025-11",
    dateLabel: "November 2025",
    shortSummary:
      "A TypeScript MERN application for task planning, calendar scheduling, recurring work, reminders, focus sessions, and productivity analytics.",
    problemStatement:
      "Students needed one place to capture coursework quickly, organize priorities and tags, schedule work, and review completion patterns.",
    capabilityCategories: ["software-engineering", "data-automation"],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "React Query",
      "Zustand",
      "FullCalendar",
    ],
    contribution: [
      "Structured the codebase as npm workspaces with separate React and Express applications.",
      "Implemented account workflows with access and refresh tokens, password hashing, protected routes, rate limiting, and Zod validation.",
      "Built task, tag, checklist, recurrence, reminder, calendar, and drag-and-drop status workflows.",
      "Added a quick-add parser for dates, priorities, tags, all-day tasks, and descriptions.",
      "Connected dashboard analytics and CSV export to MongoDB-backed task activity.",
    ],
    keyFeatures: [
      "Kanban-style task management with priorities, tags, and checklists",
      "Day, week, and month calendar views",
      "Recurring tasks, reminders, and focus sessions",
      "Quick-add task parsing",
      "Completion, workload, and tag analytics with CSV export",
    ],
    engineeringDecisions: [
      "Used React Query for server-backed data and Zustand for focused client state such as authentication, theme, and interface preferences.",
      "Modeled recurrence, scheduling, checklists, tags, and user ownership in MongoDB with indexes for common status and due-date queries.",
      "Separated routes, controllers, schemas, models, middleware, and services in the API workspace.",
    ],
    testingAndDebugging: [
      "Added Jest and Supertest cases for registration, login, invalid email input, and rejected credentials.",
      "Used shared query invalidation to keep task, calendar, and analytics views synchronized after updates.",
    ],
    outcomes: [
      "Produced an end-to-end task-management codebase spanning planning, scheduling, focus, reminder, and reporting workflows.",
      "Combined typed frontend and backend modules in one workspace with documented local and Docker setup paths.",
    ],
    evidenceLinks: [
      {
        label: "View the Productivity Task Manager on GitHub",
        href: "https://github.com/YashRoushan/To-Do-App",
        kind: "repository",
        validationStatus: "validated",
        publicationStatus: "publish",
        note: "Repository inspected on September 8, 2026. Its API JavaScript bundle succeeds, but declaration generation currently reports missing CORS types and a port typing error; dependency updates are also required.",
      },
    ],
    teamAttribution:
      "Personal project; the public repository is owned by Yash Roushan and attributes its commit to Yash Roushan.",
    relatedSkills: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Testing and debugging",
    ],
    relatedExperience: ["worsship-backend-developer"],
    displayOrder: 3,
    featured: false,
  },
  {
    slug: "stock-portfolio-tracker",
    title: "Stock Portfolio Tracker",
    role: "Full-Stack Developer",
    startDate: "2026-01",
    endDate: "2026-01",
    dateLabel: "January 2026",
    shortSummary:
      "A full-stack TypeScript application for recording portfolio transactions, calculating holdings, retrieving market prices, and visualizing allocation and performance data.",
    problemStatement:
      "Individual investors needed a structured way to separate portfolios, record buys, sells, and dividends, and review position-level and portfolio-level calculations.",
    capabilityCategories: ["software-engineering", "data-automation"],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Recharts",
      "Docker Compose",
    ],
    contribution: [
      "Built separate React and Express applications backed by a PostgreSQL and Prisma data model.",
      "Implemented authenticated portfolio, transaction, dividend, price, and summary endpoints.",
      "Calculated quantities, average cost, cost basis, realized and unrealized changes, dividends, and allocation from transaction data.",
      "Added interchangeable market-data providers with a configurable server-side quote cache.",
      "Created protected dashboard and portfolio interfaces with trend and allocation charts.",
    ],
    keyFeatures: [
      "Multiple portfolios with user-scoped access",
      "Buy, sell, and dividend records",
      "Holding and portfolio summaries",
      "Cached market-price retrieval",
      "Trend and allocation visualizations",
    ],
    engineeringDecisions: [
      "Stored monetary values as integer cents and share quantities as database decimals to make calculation choices explicit.",
      "Separated market-data access behind a provider interface so Alpha Vantage and Financial Modeling Prep can be configured independently.",
      "Used Docker Compose to describe the frontend, API, and PostgreSQL development environment.",
    ],
    testingAndDebugging: [
      "Added Jest and Supertest scenarios for account access and the create-portfolio, add-transaction, and summary workflow.",
      "Documented that the current trend series uses cost basis when historical market-price data is unavailable.",
    ],
    outcomes: [
      "Produced a modular portfolio-tracking codebase covering account access, persistence, market-data integration, financial calculations, and visualization.",
      "Kept provider limitations and the simplified historical series explicit in the repository documentation.",
    ],
    evidenceLinks: [
      {
        label: "View the Stock Portfolio Tracker on GitHub",
        href: "https://github.com/YashRoushan/Stock-Portfolio-Tracker",
        kind: "repository",
        validationStatus: "validated",
        publicationStatus: "publish",
        note: "Repository inspected on September 8, 2026. It contains placeholder screenshot files, and its current backend TypeScript and frontend PostCSS configurations require fixes before a clean production build.",
      },
    ],
    teamAttribution:
      "Personal project; the public repository is owned by Yash Roushan and attributes its commit to Yash Roushan.",
    relatedSkills: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST APIs",
      "Docker Compose",
    ],
    relatedExperience: ["worsship-backend-developer"],
    displayOrder: 4,
    featured: false,
  },
  {
    slug: "multi-node-process-simulator",
    title: "Multi-Node Process Simulator",
    role: "Systems Programming Developer",
    startDate: "2024-07",
    endDate: "2024-07",
    dateLabel: "July 2024",
    shortSummary:
      "A C-based operating-system simulator for running process workloads across multiple nodes with priorities, time quanta, blocking, preemption, and execution statistics.",
    problemStatement:
      "The simulator needed to coordinate independent node schedules while preserving ready, blocked, running, and finished process state and reporting consistent timing results.",
    capabilityCategories: ["software-engineering"],
    technologies: [
      "C",
      "POSIX threads",
      "Mutexes",
      "Priority queues",
      "Make",
      "Shell testing",
    ],
    contribution: [
      "Extended the coursework simulator with thread-based execution for configurable processing nodes.",
      "Maintained per-node ready and blocked queues, clock state, process identifiers, and CPU quantum settings.",
      "Used mutexes around shared queues and finished-process results to reduce destructive concurrent access.",
      "Worked with priority, shortest-job-first, blocking, preemption, and process-timing behaviour.",
    ],
    keyFeatures: [
      "Configurable node and process counts",
      "Ready, running, blocked, and finished states",
      "Priority and shortest-job-first scheduling",
      "CPU quantum and preemption handling",
      "Run, block, and wait-time reporting",
    ],
    engineeringDecisions: [
      "Kept queue and clock state per node while protecting the shared finished queue separately.",
      "Used priority queues for ready work, wake-up ordering, and deterministic final statistics.",
      "Separated program-context parsing, queue operations, process simulation, and orchestration into focused C modules.",
    ],
    testingAndDebugging: [
      "Included ten input and expected-output fixtures covering one to sixteen threads and as many as sixty-four processes.",
      "Compiled the repository with GCC and matched all ten expected outputs during the portfolio review.",
    ],
    outcomes: [
      "Produced consistent process-state and timing output across the repository's single-node and multi-node fixtures.",
      "Demonstrated systems-programming work with scheduling, shared state, synchronization, and deterministic verification.",
    ],
    evidenceLinks: [
      {
        label: "View the Multi-Node Process Simulator on GitHub",
        href: "https://github.com/YashRoushan/Operating_System_Simulator",
        kind: "repository",
        validationStatus: "validated",
        publicationStatus: "publish",
        note: "Compiled and checked against all ten repository fixtures on September 8, 2026. Several files explicitly credit Dr. Alex Brodsky as the author of supplied course code, so the case study limits Yash's attribution to the multi-node, locking, and process-model changes identified in the repository.",
      },
    ],
    teamAttribution:
      "Coursework project built from supplied code credited in the repository to Dr. Alex Brodsky. Yash's documented work focuses on multi-node execution, synchronization, and adapting the process model.",
    relatedSkills: [
      "C",
      "POSIX threads",
      "Concurrency",
      "Priority queues",
      "Testing and debugging",
    ],
    relatedExperience: [],
    displayOrder: 5,
    featured: false,
  },
  {
    slug: "quick-cash-marketplace",
    title: "Quick Cash",
    role: "Mobile App Developer",
    startDate: "2024-01",
    endDate: "2024-04",
    dateLabel: "January 2024–April 2024",
    shortSummary:
      "A team-built Android marketplace application using Java and Firebase Realtime Database.",
    problemStatement:
      "The project explored mobile marketplace workflows for creating, viewing, and managing listings in an Android application.",
    capabilityCategories: ["software-engineering", "data-automation"],
    technologies: ["Android Studio", "Java", "Firebase Realtime Database"],
    contribution: [
      "Contributed to a team-built Android marketplace application.",
      "Built dashboard and navigation interfaces and added UI tests.",
      "Implemented location detection, Firebase-backed job-posting persistence, and preference storage and retrieval.",
      "Added credit-card and CVV validation and refactored related code.",
      "Collaborated on user-facing flows, testing, and debugging.",
    ],
    keyFeatures: [
      "Android marketplace workflows",
      "Firebase-backed listing data",
      "Dashboard and navigation interfaces",
      "Location and preference features",
    ],
    engineeringDecisions: [
      "Used Firebase Realtime Database for shared marketplace data.",
      "Built the Android application in Java using Android Studio.",
    ],
    testingAndDebugging: [
      "Added UI tests for dashboard and navigation behaviour.",
      "Tested user-facing flows and refactored credit-card and CVV validation.",
    ],
    outcomes: [
      "Contributed Android marketplace features across interface, location, persistence, preference, and validation workflows.",
      "Added UI coverage and refactored validation logic.",
    ],
    evidenceLinks: [
      {
        label: "View the Quick Cash team repository on GitHub",
        href: "https://github.com/KrutikChaudhary/Android-Quick-Cash",
        kind: "team-repository",
        validationStatus: "validated",
        publicationStatus: "hold-for-review",
        note: "This team repository is owned by Krutik Chaudhary and currently exposes credential files. Keep the link private until those credentials are revoked or rotated and removed from Git history.",
      },
    ],
    teamAttribution:
      "Team project; the linked repository is owned by Krutik Chaudhary. Yash contributed as Mobile App Developer.",
    relatedSkills: [
      "Java",
      "Android Studio",
      "Firebase Realtime Database",
      "Mobile interface design",
      "Testing and debugging",
    ],
    relatedExperience: [],
    displayOrder: 6,
    featured: true,
  },
  {
    slug: "dalhousie-combat-robotics",
    title: "Dalhousie Combat Robotics",
    role: "Software Team Member",
    startDate: "2024-09",
    endDate: "Present",
    dateLabel: "September 2024–Present",
    shortSummary:
      "Maintaining the team website through content updates, registration and announcement support, troubleshooting, code review, and team coordination.",
    problemStatement:
      "The team needs a maintained web presence for registrations, announcements, blogs, and other public updates.",
    capabilityCategories: ["software-engineering"],
    technologies: [
      "Web development",
      "Content updates",
      "Technical troubleshooting",
      "Code review",
      "Team collaboration",
    ],
    contribution: [
      "Maintained the team website and supported blogs, registrations, and announcements.",
      "Collaborated on web-infrastructure troubleshooting, updates, code review, and implementation-risk decisions.",
    ],
    keyFeatures: [
      "Team blogs and announcements",
      "Registration-related web content",
      "Ongoing website updates and maintenance",
    ],
    engineeringDecisions: [
      "Considered maintainability and implementation risk when reviewing website updates.",
      "Used team review and troubleshooting to support changes to the public web presence.",
    ],
    testingAndDebugging: [
      "Troubleshot website and web-infrastructure issues as part of the software team.",
      "Participated in code review and risk-mitigation decisions around updates.",
    ],
    outcomes: [
      "Kept the team web presence current for blogs, registrations, and announcements.",
      "Supported ongoing maintenance through troubleshooting, collaborative updates, and review.",
    ],
    evidenceLinks: [],
    teamAttribution:
      "Team project; Yash contributes as a Software Team Member.",
    relatedSkills: [
      "Web development",
      "Technical troubleshooting",
      "Code review",
      "Team collaboration",
    ],
    relatedExperience: [],
    displayOrder: 7,
    featured: false,
  },
] as const satisfies readonly ProjectEntry[];

export const featuredProjects = projects.filter((project) => project.featured);

export const homepageProjects = projects.filter(
  (project) => project.slug !== "dalhousie-combat-robotics",
);

export const projectSlugs = projects.map((project) => project.slug);

export function getProjectBySlug(slug: ProjectSlug): ProjectEntry | undefined {
  return projects.find((project) => project.slug === slug);
}
