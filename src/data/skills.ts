import type {
  CapabilityId,
  SkillEntry,
  SkillGroup,
  SkillReviewItem,
} from "./types";

export const skillGroupOrder = [
  "Programming and web",
  "Data and databases",
  "Cloud and automation",
  "Networking and systems",
  "Ways of working",
] as const satisfies readonly SkillGroup[];

export const skills = [
  {
    id: "javascript",
    name: "JavaScript",
    group: "Programming and web",
    capabilityCategories: ["software-engineering", "data-automation"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context: "Node.js services and REST API development.",
      },
      {
        label: "DalChess Code",
        href: "/projects/dalchess-code",
        context: "Full-stack tournament administration functionality.",
      },
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context: "Data and application workflow support.",
      },
    ],
  },
  {
    id: "java",
    name: "Java",
    group: "Programming and web",
    capabilityCategories: ["software-engineering"],
    usage: "Used in a substantial project",
    evidence: [
      {
        label: "Quick Cash",
        href: "/projects/quick-cash-marketplace",
        context: "Android marketplace development in Android Studio.",
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    group: "Programming and web",
    capabilityCategories: ["data-automation", "software-engineering"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context:
          "Dataset analysis, validation, and data-quality investigation.",
      },
    ],
  },
  {
    id: "react",
    name: "React",
    group: "Programming and web",
    capabilityCategories: ["software-engineering"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context:
          "Integrated backend services and REST APIs with React interfaces.",
      },
      {
        label: "DalChess Code",
        href: "/projects/dalchess-code",
        context: "Administrative dashboards and tournament interfaces.",
      },
      {
        label: "Jobify",
        href: "/projects/jobify-job-tracker",
        context: "Responsive job-tracking interfaces.",
      },
    ],
  },
  {
    id: "node-js",
    name: "Node.js",
    group: "Programming and web",
    capabilityCategories: ["software-engineering"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context: "Backend services supporting centralized data management.",
      },
      {
        label: "DalChess Code",
        href: "/projects/dalchess-code",
        context: "Backend and API functionality.",
      },
      {
        label: "Jobify",
        href: "/projects/jobify-job-tracker",
        context: "Backend services for a full-stack application.",
      },
    ],
  },
  {
    id: "express-js",
    name: "Express.js",
    group: "Programming and web",
    capabilityCategories: ["software-engineering"],
    usage: "Used in a substantial project",
    evidence: [
      {
        label: "Jobify",
        href: "/projects/jobify-job-tracker",
        context: "REST services for job-tracking workflows.",
      },
    ],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    group: "Programming and web",
    capabilityCategories: ["software-engineering"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context: "Developed, integrated, tested, and debugged REST APIs.",
      },
      {
        label: "DalChess Code",
        href: "/projects/dalchess-code",
        context:
          "API development and debugging across a full-stack application.",
      },
      {
        label: "Jobify",
        href: "/projects/jobify-job-tracker",
        context:
          "Connected React interfaces with Node.js and Express.js services.",
      },
    ],
  },
  {
    id: "relational-database-design",
    name: "Relational database design",
    group: "Data and databases",
    capabilityCategories: ["software-engineering", "data-automation"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context:
          "Designed and optimized SQL schemas with attention to data integrity.",
      },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    group: "Data and databases",
    capabilityCategories: ["software-engineering", "data-automation"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context: "Relational schema and backend development.",
      },
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context: "Internal workflow solutions.",
      },
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context: "Dataset analysis, validation, and database workflows.",
      },
    ],
  },
  {
    id: "mysql",
    name: "MySQL",
    group: "Data and databases",
    capabilityCategories: ["data-automation"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context:
          "Dataset analysis, validation, and data-quality investigation.",
      },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    group: "Data and databases",
    capabilityCategories: ["software-engineering", "data-automation"],
    usage: "Used in a substantial project",
    evidence: [
      {
        label: "Jobify",
        href: "/projects/jobify-job-tracker",
        context: "Persistent storage for CRUD job-tracking workflows.",
      },
    ],
  },
  {
    id: "firebase",
    name: "Firebase",
    group: "Data and databases",
    capabilityCategories: ["software-engineering", "data-automation"],
    usage: "Used in a substantial project",
    evidence: [
      {
        label: "Quick Cash",
        href: "/projects/quick-cash-marketplace",
        context:
          "Firebase Realtime Database and cloud-backed marketplace data.",
      },
    ],
  },
  {
    id: "microsoft-azure",
    name: "Microsoft Azure",
    group: "Cloud and automation",
    capabilityCategories: ["cloud-enterprise"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — OBT IT Analyst",
        href: "/experience/irving-oil-obt-it-analyst",
        context:
          "Migration support, dependencies, network maps, and documentation.",
      },
    ],
  },
  {
    id: "power-automate",
    name: "Power Automate",
    group: "Cloud and automation",
    capabilityCategories: ["data-automation", "cloud-enterprise"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context: "Developed or maintained solutions for internal workflows.",
      },
    ],
  },
  {
    id: "power-apps",
    name: "Power Apps",
    group: "Cloud and automation",
    capabilityCategories: ["data-automation", "cloud-enterprise"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context:
          "Built or maintained Power Platform workflows and applications.",
      },
    ],
  },
  {
    id: "power-bi",
    name: "Power BI",
    group: "Cloud and automation",
    capabilityCategories: ["data-automation"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context: "Reports for technical and business stakeholders.",
      },
    ],
  },
  {
    id: "excel",
    name: "Excel",
    group: "Cloud and automation",
    capabilityCategories: ["data-automation"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context: "Created operational dashboards.",
      },
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context: "Reports for technical and business stakeholders.",
      },
    ],
  },
  {
    id: "cisco-networking",
    name: "Cisco networking",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context:
          "Network monitoring, configuration, validation, and troubleshooting.",
      },
    ],
  },
  {
    id: "solarwinds",
    name: "SolarWinds",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context: "Dashboards, monitoring, node configuration, and validation.",
      },
    ],
  },
  {
    id: "cisco-ise",
    name: "Cisco ISE",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context: "Investigated and removed stale nodes.",
      },
    ],
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure", "cloud-enterprise"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context:
          "Technical requests and monitoring or configuration troubleshooting.",
      },
    ],
  },
  {
    id: "rt-ticketing",
    name: "RT ticketing",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure", "cloud-enterprise"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context: "User-facing technical support workflows.",
      },
    ],
  },
  {
    id: "ldap",
    name: "LDAP",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure", "cloud-enterprise"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context: "Support for LDAP-based systems and authentication issues.",
      },
    ],
  },
  {
    id: "windows",
    name: "Windows",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context:
          "Cross-platform support, imaging, configuration, and deployment.",
      },
    ],
  },
  {
    id: "macos",
    name: "macOS",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context: "Cross-platform device and application support.",
      },
    ],
  },
  {
    id: "linux",
    name: "Linux",
    group: "Networking and systems",
    capabilityCategories: ["network-infrastructure"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context: "Cross-platform device, software, and application support.",
      },
    ],
  },
  {
    id: "git-github",
    name: "Git and GitHub",
    group: "Ways of working",
    capabilityCategories: ["software-engineering"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context: "Distributed development and technical review.",
      },
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context: "GitHub-supported collaboration workflows.",
      },
      {
        label: "DalChess Code",
        href: "/projects/dalchess-code",
        context: "Public project branch on GitHub.",
      },
    ],
  },
  {
    id: "technical-documentation",
    name: "Technical documentation",
    group: "Ways of working",
    capabilityCategories: [
      "software-engineering",
      "cloud-enterprise",
      "network-infrastructure",
      "data-automation",
    ],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — OBT IT Analyst",
        href: "/experience/irving-oil-obt-it-analyst",
        context:
          "Configurations, dependencies, workflow transitions, and support procedures.",
      },
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context:
          "Monitoring logic, configurations, findings, and infrastructure changes.",
      },
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context: "ETL, database, and technical workflows.",
      },
    ],
  },
  {
    id: "requirements-gathering",
    name: "Requirements gathering",
    group: "Ways of working",
    capabilityCategories: [
      "software-engineering",
      "cloud-enterprise",
      "network-infrastructure",
      "data-automation",
    ],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — OBT IT Analyst",
        href: "/experience/irving-oil-obt-it-analyst",
        context:
          "Connected driver, administrator, and stakeholder feedback to technical action.",
      },
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context:
          "Translated Service Desk and Cloud needs into monitoring solutions.",
      },
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context: "Requirements and technical reviews in a distributed team.",
      },
    ],
  },
  {
    id: "troubleshooting",
    name: "Troubleshooting",
    group: "Ways of working",
    capabilityCategories: [
      "software-engineering",
      "cloud-enterprise",
      "network-infrastructure",
      "data-automation",
    ],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — OBT IT Analyst",
        href: "/experience/irving-oil-obt-it-analyst",
        context: "Operational application, data, and workflow issues.",
      },
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context: "Monitoring and network configuration issues.",
      },
      {
        label: "Dalhousie — IT Technical Assistant Co-op",
        href: "/experience/dalhousie-it-technical-assistant-coop",
        context:
          "Hardware, software, device, network, authentication, and application issues.",
      },
    ],
  },
  {
    id: "stakeholder-vendor-communication",
    name: "Stakeholder and vendor communication",
    group: "Ways of working",
    capabilityCategories: ["cloud-enterprise", "network-infrastructure"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Irving Oil — OBT IT Analyst",
        href: "/experience/irving-oil-obt-it-analyst",
        context:
          "Liaison work across business, end-user, network, and technical teams.",
      },
      {
        label: "Irving Oil — Network Analyst Co-op",
        href: "/experience/irving-oil-network-analyst-coop",
        context:
          "Requests and requirements involving internal teams and vendors.",
      },
    ],
  },
  {
    id: "agile-collaboration",
    name: "Agile collaboration",
    group: "Ways of working",
    capabilityCategories: ["software-engineering", "data-automation"],
    usage: "Used in production or professional work",
    evidence: [
      {
        label: "Worsship — Backend Developer",
        href: "/experience/worsship-backend-developer",
        context:
          "Distributed collaboration with developers, designers, and stakeholders.",
      },
      {
        label: "Dresma.ai — Data Analyst Intern",
        href: "/experience/dresma-data-analyst-intern",
        context: "Agile and GitHub-supported workflows.",
      },
    ],
  },
] as const satisfies readonly SkillEntry[];

export const skillsRequiringReview = [
  {
    id: "c-sharp",
    name: "C#",
    suppliedCategory: "Primary",
    reason:
      "No supplied role or featured project identifies where C# was used.",
  },
  {
    id: "c",
    name: "C",
    suppliedCategory: "Primary",
    reason: "No supplied role or featured project identifies where C was used.",
  },
  {
    id: "html-css",
    name: "HTML and CSS",
    suppliedCategory: "Primary",
    reason:
      "The earlier academic portfolio that could provide direct evidence is not available for review.",
  },
  {
    id: "sql-server",
    name: "SQL Server",
    suppliedCategory: "Primary",
    reason:
      "Professional SQL use is supplied, but the database vendor is not identified as SQL Server.",
  },
  {
    id: "google-cloud-platform",
    name: "Google Cloud Platform",
    suppliedCategory: "Primary",
    reason:
      "No supplied role or featured project identifies where Google Cloud Platform was used.",
  },
  {
    id: "docker",
    name: "Docker",
    suppliedCategory: "Primary",
    reason:
      "No supplied role or featured project identifies where Docker was used.",
  },
  {
    id: "powershell",
    name: "PowerShell",
    suppliedCategory: "Primary",
    reason:
      "No supplied role or featured project identifies where PowerShell was used.",
  },
  ...[
    "TypeScript",
    "Next.js",
    "AWS",
    ".NET Framework",
    "Angular",
    "PHP",
    "Django",
    "Golang",
    "jQuery",
    "Jenkins",
    "Tableau",
  ].map(
    (name) =>
      ({
        id: name.toLowerCase().replaceAll(".", "dot-").replaceAll(" ", "-"),
        name,
        suppliedCategory: "Secondary or verification-dependent",
        reason:
          "Meaningful use is not confirmed by the supplied role or featured-project evidence.",
      }) satisfies SkillReviewItem,
  ),
] as const satisfies readonly SkillReviewItem[];

export function getSkillsForCapability(
  capability: CapabilityId,
): readonly SkillEntry[] {
  return skills.filter((skill) =>
    (skill.capabilityCategories as readonly CapabilityId[]).includes(
      capability,
    ),
  );
}

export function getSkillsByGroup(group: SkillGroup): readonly SkillEntry[] {
  return skills.filter((skill) => skill.group === group);
}
