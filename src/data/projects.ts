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
        publicationStatus: "publish",
        note: "This is a team repository owned by Krutik Chaudhary, not Yash Roushan's GitHub account.",
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
    displayOrder: 3,
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
    displayOrder: 4,
    featured: false,
  },
] as const satisfies readonly ProjectEntry[];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectSlugs = projects.map((project) => project.slug);

export function getProjectBySlug(slug: ProjectSlug): ProjectEntry | undefined {
  return projects.find((project) => project.slug === slug);
}
