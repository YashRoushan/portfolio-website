import type { ExperienceEntry, ExperienceSlug } from "./types";

const enterpriseConfidentialityNote =
  "This case study intentionally stays at a high level to respect employer confidentiality and protect internal systems and data.";

export const experiences = [
  {
    slug: "irving-oil-obt-it-analyst",
    company: "Irving Oil",
    role: "OBT IT Analyst",
    organizationOrTeam: "Operational Business Technology — Solutions",
    employmentType: "Professional experience",
    location: "Saint John, New Brunswick",
    startDate: "2026-01",
    endDate: "Present",
    dateLabel: "January 2026–Present",
    shortSummary:
      "Supporting enterprise modernization and reliable operational workflows by connecting user feedback, application dependencies, troubleshooting, and documentation.",
    capabilityCategories: [
      "cloud-enterprise",
      "data-automation",
      "business-technology",
    ],
    technologies: [
      "Microsoft Azure",
      "GE Meridium",
      "Enterprise applications",
      "Technical documentation",
      "Network maps",
      "Requirements gathering",
      "Stakeholder communication",
      "Troubleshooting",
      "Migration support",
    ],
    overview: [
      "Yash supports operational business technology used across enterprise workflows, with an emphasis on modernization, system visibility, and dependable support.",
      "His work connects end-user feedback with the application, network, and business teams responsible for resolving issues and moving systems forward.",
    ],
    context: [
      "The role spans operational applications, workflow support, and enterprise migration activity. That work requires a current understanding of ownership, integrations, dependencies, and the people affected by a change.",
      "Public detail is intentionally limited: internal architecture, operational data, licensing information, and implementation artifacts are not disclosed.",
    ],
    responsibilities: [
      "Supported enterprise technology used in a paperless operational workflow.",
      "Gathered feedback from drivers and administrators to identify application and workflow issues.",
      "Supported a Microsoft Azure migration by maintaining technical documentation, application dependencies, and network maps.",
      "Supported a document-processing platform migration by tracking application ownership, licensing requirements, integrations, and technical dependencies.",
      "Troubleshot operational data and workflow issues in GE Meridium.",
      "Worked as a liaison among business stakeholders, end users, network teams, and other technical teams.",
      "Documented system configurations, workflow transitions, dependencies, and support procedures.",
    ],
    selectedContributions: [
      "Connected feedback from drivers and administrators to concrete application and workflow investigation.",
      "Maintained dependency, ownership, integration, and network documentation used during enterprise migrations.",
      "Investigated GE Meridium data and workflow issues while coordinating with the teams needed to move the work forward.",
    ],
    approachOrReasoning: [
      "Start with the user or operational issue, then trace the application, data, integration, and network dependencies involved.",
      "Keep transition and support documentation current so technical and business teams have a shared view of the system.",
      "Escalate and coordinate across team boundaries when an issue depends on expertise or ownership elsewhere.",
    ],
    collaboration: [
      "Worked with drivers, administrators, business stakeholders, end users, network teams, and other technical teams.",
      "Translated feedback and requirements into clear technical follow-up while maintaining shared documentation.",
    ],
    outcomes: [
      "Supported continuity for operational workflows during enterprise application and cloud migration work.",
      "Maintained system and dependency visibility through documentation that teams could use for migration and support decisions.",
    ],
    challenges: [
      "Supporting active operational workflows while applications, ownership, integrations, and infrastructure dependencies were changing.",
      "Providing useful public context without exposing proprietary systems, operational data, or internal architecture.",
    ],
    lessons: [
      "Reliable enterprise support depends on understanding both the user workflow and the technical dependencies behind it.",
      "Clear ownership and dependency documentation makes cross-team troubleshooting and migration support more effective.",
    ],
    evidenceLinks: [],
    confidentialityNote: enterpriseConfidentialityNote,
    relatedProjects: [],
    relatedExperience: [
      "irving-oil-network-analyst-coop",
      "dalhousie-it-technical-assistant-coop",
    ],
    displayOrder: 1,
    featured: true,
  },
  {
    slug: "irving-oil-network-analyst-coop",
    company: "Irving Oil",
    role: "Network Analyst Co-op",
    organizationOrTeam: "IT Infrastructure — Network",
    employmentType: "Co-op",
    location: "Saint John, New Brunswick",
    startDate: "2025-09",
    endDate: "2026-01",
    dateLabel: "September 2025–January 2026",
    shortSummary:
      "Improved network observability through monitoring dashboards, node validation, authentication hygiene, troubleshooting, and cross-team requirements gathering.",
    capabilityCategories: ["network-infrastructure", "cloud-enterprise"],
    technologies: [
      "SolarWinds",
      "Cisco ISE",
      "ServiceNow",
      "Cisco networking",
      "Node configuration and validation",
      "Monitoring dashboards",
      "Vendor communication",
      "Technical documentation",
    ],
    overview: [
      "Yash supported network observability and monitoring accuracy for infrastructure and service teams.",
      "The role combined hands-on node configuration and validation with requirements gathering, dashboard work, technical requests, and documentation.",
    ],
    context: [
      "Monitoring is useful only when the underlying node inventory, configuration, and presentation remain trustworthy. Yash worked across those layers using SolarWinds, Cisco ISE, and ServiceNow.",
      "The case study omits internal dashboards, topology, identifiers, alerts, tickets, authentication data, and vendor records.",
    ],
    responsibilities: [
      "Designed or improved SolarWinds dashboards for Network and Service Desk teams.",
      "Added, configured, tested, and validated network nodes to maintain accurate monitoring coverage.",
      "Investigated and removed stale nodes from Cisco Identity Services Engine.",
      "Troubleshot monitoring and configuration issues using SolarWinds, Cisco ISE, and ServiceNow.",
      "Responded to technical requests from internal teams and vendors.",
      "Gathered requirements from Service Desk and Cloud teams and translated them into monitoring solutions.",
      "Documented configurations, findings, monitoring logic, and infrastructure changes.",
    ],
    selectedContributions: [
      "Translated Service Desk and Cloud team requirements into practical SolarWinds dashboard and monitoring work.",
      "Configured, tested, and validated nodes to support accurate monitoring coverage.",
      "Investigated stale Cisco ISE nodes and documented configuration findings and infrastructure changes.",
    ],
    approachOrReasoning: [
      "Validate node state and configuration before treating a dashboard symptom as the root problem.",
      "Gather requirements from the people using monitoring information, then organize the resulting view around their operational needs.",
      "Document monitoring logic and changes so later troubleshooting has reliable context.",
    ],
    collaboration: [
      "Worked with Network, Service Desk, and Cloud teams as well as vendors responding to technical requests.",
      "Combined requirements conversations with implementation, testing, validation, and documentation.",
    ],
    outcomes: [
      "Supported accurate network monitoring coverage through node configuration, testing, and validation.",
      "Helped Service Desk and Network teams access monitoring views shaped around their requirements.",
      "Supported authentication hygiene by investigating and removing stale Cisco ISE nodes.",
    ],
    challenges: [
      "Keeping monitoring information useful requires both accurate node configuration and views that match how support teams work.",
      "Troubleshooting had to account for monitoring, configuration, inventory, and request context without exposing sensitive infrastructure details.",
    ],
    lessons: [
      "Observability is a system: inventory quality, configuration, validation, dashboard design, and documentation reinforce one another.",
      "A monitoring solution becomes more useful when technical implementation begins with clear requirements from its users.",
    ],
    evidenceLinks: [],
    confidentialityNote: enterpriseConfidentialityNote,
    relatedProjects: [],
    relatedExperience: [
      "irving-oil-obt-it-analyst",
      "dalhousie-it-technical-assistant-coop",
    ],
    displayOrder: 2,
    featured: true,
  },
  {
    slug: "worsship-backend-developer",
    company: "Worsship",
    role: "Backend Developer",
    organizationOrTeam: "Worsship",
    employmentType: "Professional experience",
    location: "Remote",
    startDate: "2025-03",
    endDate: "2025-09",
    dateLabel: "March 2025–September 2025",
    shortSummary:
      "Developed Node.js, SQL, and REST API foundations that connected React interfaces with centralized relational data.",
    capabilityCategories: ["software-engineering", "data-automation"],
    technologies: [
      "JavaScript",
      "Node.js",
      "React",
      "SQL",
      "REST APIs",
      "Relational database design",
      "Git",
      "Agile collaboration",
    ],
    overview: [
      "Yash worked on backend services and relational data foundations for an international organization in a distributed development environment.",
      "His contribution covered schema design, REST API development and integration, debugging, testing, requirements, and technical documentation.",
    ],
    context: [
      "The product required centralized data management and reliable connections between React interfaces, backend services, and a relational database.",
      "The public case study focuses on service, API, relational data, and collaboration contributions.",
    ],
    responsibilities: [
      "Developed a scalable Node.js and SQL backend supporting centralized data management for an international organization.",
      "Designed and optimized relational database schemas with attention to data integrity.",
      "Developed, integrated, tested, debugged, and troubleshot REST APIs connecting React interfaces to backend services and databases.",
      "Collaborated with developers, designers, and stakeholders in a distributed Agile environment.",
      "Gathered requirements and participated in technical reviews.",
      "Documented development decisions to support consistency and maintainability.",
    ],
    selectedContributions: [
      "Built and debugged Node.js services and REST APIs that connected React interfaces to relational data.",
      "Designed and refined SQL schemas with data integrity and maintainability in mind.",
      "Recorded development decisions and participated in reviews across a distributed team.",
    ],
    approachOrReasoning: [
      "Model relational data carefully before exposing it through API behavior.",
      "Test connections across the interface, service, API, and database layers when diagnosing a problem.",
      "Document decisions so distributed collaborators can work from the same technical context.",
    ],
    collaboration: [
      "Worked with developers, designers, and stakeholders in a distributed Agile environment.",
      "Gathered requirements, participated in technical reviews, and documented decisions for the wider team.",
    ],
    outcomes: [
      "Delivered backend, API, and relational database functionality supporting centralized data management.",
      "Supported consistent implementation and maintenance through testing, troubleshooting, reviews, and documentation.",
    ],
    challenges: [
      "Maintaining data integrity across relational schemas, REST APIs, backend services, and consuming interfaces.",
      "Keeping technical decisions clear across a distributed product team.",
    ],
    lessons: [
      "Backend reliability depends on treating schema design, API behavior, integration testing, and documentation as connected work.",
      "Clear requirements and technical reviews reduce ambiguity in distributed development.",
    ],
    evidenceLinks: [],
    confidentialityNote:
      "No public repository or product link was supplied for this role. The case study is limited to the verified contribution summary.",
    relatedProjects: ["dalchess-code", "jobify-job-tracker"],
    relatedExperience: ["dresma-data-analyst-intern"],
    displayOrder: 3,
    featured: true,
  },
  {
    slug: "dalhousie-it-technical-assistant-coop",
    company: "Dalhousie University",
    role: "IT Technical Assistant Co-op",
    organizationOrTeam: "Dalhousie University",
    employmentType: "Co-op",
    location: "Halifax, Nova Scotia",
    startDate: "2025-01",
    endDate: "2025-04",
    dateLabel: "January 2025–April 2025",
    shortSummary:
      "Combined cross-platform technical support with SQL, Power Platform, and Excel workflow improvements for a varied university community.",
    capabilityCategories: [
      "data-automation",
      "network-infrastructure",
      "cloud-enterprise",
    ],
    technologies: [
      "Power Automate",
      "Power Apps",
      "SQL",
      "Excel",
      "RT ticketing",
      "LDAP",
      "Windows",
      "macOS",
      "Linux",
      "Microsoft 365",
      "Device imaging and configuration",
    ],
    overview: [
      "Yash supported faculty, staff, students, and researchers across hardware, software, devices, networks, authentication, and applications.",
      "Alongside day-to-day support, he used SQL, Power Automate, Power Apps, and Excel to improve internal workflows and make technical processes easier to follow.",
    ],
    context: [
      "A university support environment brings together many users, device types, operating systems, and technical needs. The role required practical troubleshooting, consistent communication, and careful validation after changes.",
      "The case study focuses on cross-platform support, workflow automation, reporting, and documentation.",
    ],
    responsibilities: [
      "Provided cross-platform support across Windows, macOS, and Linux.",
      "Troubleshot hardware, software, device, network, authentication, and application issues.",
      "Performed device imaging, configuration, software deployment, testing, and validation.",
      "Supported RT ticketing and LDAP-based systems.",
      "Developed SQL and Power Automate solutions for internal workflows.",
      "Created Excel dashboards and documented technical processes.",
      "Gathered requirements and collaborated with faculty, staff, students, researchers, and IT team members.",
      "Built or maintained Power Platform workflows and applications.",
    ],
    selectedContributions: [
      "Diagnosed cross-platform device, network, authentication, software, and application issues.",
      "Built or maintained SQL and Power Platform solutions for internal workflows.",
      "Created Excel dashboards and process documentation while supporting device imaging, deployment, testing, and validation.",
    ],
    approachOrReasoning: [
      "Understand the user's immediate need, isolate the affected layer, and validate the device or workflow after the change.",
      "Use automation where a repeated internal process can be made clearer and more consistent.",
      "Document procedures so recurring support work is easier to understand and repeat.",
    ],
    collaboration: [
      "Worked directly with faculty, staff, students, researchers, and IT team members.",
      "Gathered requirements, communicated during troubleshooting, and documented processes for ongoing support.",
    ],
    outcomes: [
      "Supported consistent technology service across Windows, macOS, Linux, Microsoft 365, device, network, and authentication needs.",
      "Translated operational requirements into SQL, Power Platform, Excel, and documentation work for internal workflows.",
    ],
    challenges: [
      "Supporting a broad user community across multiple operating systems while keeping diagnosis and communication clear.",
      "Balancing immediate support needs with repeatable workflow and documentation improvements.",
    ],
    lessons: [
      "Good technical support combines diagnosis with clear communication and validation from the user's perspective.",
      "Small automation and documentation improvements can make recurring operational work more consistent.",
    ],
    evidenceLinks: [],
    confidentialityNote:
      "Internal workflows, support records, user information, and system details are not included in this public case study.",
    relatedProjects: [],
    relatedExperience: [
      "irving-oil-network-analyst-coop",
      "irving-oil-obt-it-analyst",
    ],
    displayOrder: 4,
    featured: true,
  },
  {
    slug: "dresma-data-analyst-intern",
    company: "Dresma.ai",
    role: "Data Analyst Intern",
    organizationOrTeam: "Dresma.ai",
    employmentType: "Internship",
    location: "Delhi, India",
    startDate: "2021-12",
    endDate: "2022-09",
    dateLabel: "December 2021–September 2022",
    shortSummary:
      "Analyzed and validated data, investigated quality issues, documented ETL workflows, and communicated findings through Excel and Power BI reporting.",
    capabilityCategories: ["data-automation", "software-engineering"],
    technologies: [
      "Python",
      "MySQL",
      "SQL",
      "Excel",
      "Power BI",
      "JavaScript",
      "GitHub",
      "ETL documentation",
    ],
    overview: [
      "Yash's early professional experience connected data analysis with the application and operational workflows that depend on trustworthy information.",
      "He used Python and MySQL for analysis and validation, supported cleaning and transformation work, documented repeatable processes, and presented findings for technical and business audiences.",
    ],
    context: [
      "Reliable application workflows depend on data that is understood, checked, and transformed consistently. The role combined hands-on analysis with documentation and reporting.",
      "The work connected technical investigation with repeatable data processes and stakeholder-facing communication.",
    ],
    responsibilities: [
      "Analyzed and validated datasets using Python and MySQL.",
      "Identified and troubleshot data-quality issues.",
      "Supported data-cleaning, transformation, and reliable application workflows.",
      "Documented ETL processes, database workflows, and technical procedures.",
      "Created Excel and Power BI reports for technical and business stakeholders.",
      "Collaborated through Agile practices and GitHub-supported workflows.",
    ],
    selectedContributions: [
      "Used Python, MySQL, and SQL to analyze datasets and investigate quality issues.",
      "Documented ETL, database, and technical workflows so transformation work was easier to understand and repeat.",
      "Communicated findings to technical and business stakeholders through Excel and Power BI reports.",
    ],
    approachOrReasoning: [
      "Validate data before relying on it for an application workflow or report.",
      "Trace quality issues through cleaning, transformation, and database processes rather than treating them as isolated values.",
      "Pair analysis with documentation and reporting so both technical and business stakeholders can use the work.",
    ],
    collaboration: [
      "Worked with technical and business stakeholders and collaborated through Agile and GitHub-supported workflows.",
      "Used reports and technical documentation to make data findings and processes understandable across audiences.",
    ],
    outcomes: [
      "Supported reliable application workflows through data validation, cleaning, transformation, and quality investigation.",
      "Made data and ETL work easier to communicate through documented procedures and stakeholder-facing reports.",
    ],
    challenges: [
      "Identifying data-quality issues and making cleaning and transformation workflows repeatable.",
      "Communicating technical findings in forms useful to both technical and business stakeholders.",
    ],
    lessons: [
      "Data quality is operational work: validation, transformation, documentation, and communication all affect downstream reliability.",
      "A repeatable process is more useful when its reasoning and dependencies are documented clearly.",
    ],
    evidenceLinks: [
      {
        label: "Dresma",
        href: "https://www.dresma.com",
        kind: "company",
        validationStatus: "validated",
        publicationStatus: "publish",
      },
    ],
    confidentialityNote:
      "The case study does not include private datasets, client information, internal workflows, or proprietary implementation details.",
    relatedProjects: [],
    relatedExperience: ["worsship-backend-developer"],
    displayOrder: 5,
    featured: false,
  },
] as const satisfies readonly ExperienceEntry[];

export const featuredExperiences = experiences.filter(
  (experience) => experience.featured,
);

export const experienceSlugs = experiences.map((experience) => experience.slug);

export function getExperienceBySlug(
  slug: ExperienceSlug,
): ExperienceEntry | undefined {
  return experiences.find((experience) => experience.slug === slug);
}
