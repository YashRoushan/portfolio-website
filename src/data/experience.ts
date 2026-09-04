import type { ExperienceEntry, ExperienceSlug } from "./types";

const enterpriseConfidentialityNote =
  "This case study intentionally stays at a high level to respect employer confidentiality and protect internal systems and data.";

export const experiences = [
  {
    slug: "irving-oil-obt-it-analyst",
    company: "Irving Oil",
    role: "OBT IT Analyst",
    organizationOrTeam: "Irving Oil",
    employmentType: "Professional role",
    location: "Saint John, New Brunswick",
    startDate: "2026-01",
    endDate: "Present",
    dateLabel: "January 2026–Present",
    shortSummary:
      "Supports enterprise applications and migration work by connecting user feedback, technical dependencies, troubleshooting, cross-team coordination, and documentation.",
    capabilityCategories: [
      "cloud-enterprise",
      "data-automation",
      "business-technology",
    ],
    technologies: [
      "Microsoft Azure",
      "Enterprise applications",
      "Requirements gathering",
      "Stakeholder communication",
      "Troubleshooting",
      "Migration support",
      "Technical documentation",
    ],
    overview: [
      "I support enterprise applications and operational workflows, with an emphasis on modernization, migration support, system visibility, and dependable service.",
      "My work connects user feedback with the business and technical teams responsible for investigating issues, managing dependencies, and moving changes forward.",
    ],
    context: [
      "The role spans application support, workflow analysis, and migration activity. It requires a current understanding of ownership, integrations, dependencies, and the people affected by each change.",
      "Internal architecture, operational data, project names, licensing details, and implementation artifacts are intentionally excluded.",
    ],
    responsibilities: [
      "Support enterprise applications and operational workflows during modernization and migration initiatives.",
      "Gather feedback from end users and administrators and translate it into focused technical follow-up.",
      "Maintain documentation covering application ownership, integrations, dependencies, configurations, and support procedures.",
      "Investigate application data and workflow issues and coordinate resolution across business and technical teams.",
      "Track migration requirements and dependencies to support continuity during platform changes.",
    ],
    selectedContributions: [
      "Translate end-user and administrator feedback into focused application and workflow investigations.",
      "Maintain ownership, integration, dependency, and support documentation for enterprise migrations.",
      "Investigate application data and workflow issues and coordinate cross-team follow-up.",
    ],
    approachOrReasoning: [
      "Start with the user impact, then trace the application, data, integration, and infrastructure dependencies involved.",
      "Keep ownership, dependency, and support documentation current so teams share the same operating context.",
      "Coordinate early when resolution depends on another team's expertise or system ownership.",
    ],
    collaboration: [
      "Work with end users, administrators, business stakeholders, network teams, and application teams.",
      "Translate feedback into technical follow-up and keep shared documentation current.",
    ],
    outcomes: [
      "Support continuity during enterprise application and cloud migration work.",
      "Improve shared visibility into application ownership, dependencies, and support requirements.",
    ],
    challenges: [
      "Supporting active operational workflows while applications, ownership, integrations, and infrastructure dependencies change.",
      "Coordinating across teams with different ownership, priorities, and technical context.",
    ],
    lessons: [
      "Reliable enterprise support starts with understanding both the user workflow and its technical dependencies.",
      "Current ownership and dependency documentation makes troubleshooting and migration work more efficient.",
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
      "Supported accurate network monitoring through SolarWinds dashboards, node configuration and validation, Cisco ISE cleanup, troubleshooting, and cross-team requirements gathering.",
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
      "I supported network monitoring accuracy for infrastructure and service teams.",
      "The role combined hands-on node configuration and validation with requirements gathering, dashboard work, technical requests, and documentation.",
    ],
    context: [
      "Monitoring is useful only when the underlying node inventory, configuration, and presentation remain trustworthy. I worked across those layers using SolarWinds, Cisco ISE, and ServiceNow.",
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
      "Translated Service Desk and Cloud team requirements into SolarWinds dashboards and monitoring configurations.",
      "Configured, tested, and validated network nodes to support accurate monitoring coverage.",
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
      "Supported accurate monitoring coverage through node configuration, testing, and validation.",
      "Aligned monitoring views with Service Desk and Network team requirements.",
      "Supported Cisco ISE data quality by investigating and removing stale nodes.",
    ],
    challenges: [
      "Keeping monitoring information accurate as node inventory and configuration changed.",
      "Distinguishing dashboard symptoms from underlying inventory or configuration issues.",
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
    employmentType: "Professional role",
    location: "Remote",
    startDate: "2025-03",
    endDate: "2025-09",
    dateLabel: "March 2025–September 2025",
    shortSummary:
      "Developed Node.js services, REST APIs, and SQL schemas that connected React interfaces with centralized relational data.",
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
      "I worked on backend services and relational data foundations for an international organization in a distributed development environment.",
      "My contribution covered schema design, REST API development and integration, debugging, testing, requirements, and technical documentation.",
    ],
    context: [
      "The product required centralized data management and reliable connections between React interfaces, backend services, and a relational database.",
      "The public case study focuses on service, API, relational data, and collaboration contributions.",
    ],
    responsibilities: [
      "Developed Node.js services and SQL-backed data workflows for an international organization.",
      "Designed relational database schemas with attention to data integrity and maintainability.",
      "Developed, integrated, tested, and debugged REST APIs connecting React interfaces with backend services and relational data.",
      "Gathered requirements and participated in technical reviews with developers, designers, and stakeholders in a distributed Agile team.",
      "Documented technical decisions to support consistent implementation and maintenance.",
    ],
    selectedContributions: [
      "Built and debugged Node.js services and REST APIs that connected React interfaces to relational data.",
      "Designed and refined SQL schemas with data integrity and maintainability in mind.",
      "Recorded development decisions and participated in reviews across a distributed team.",
    ],
    approachOrReasoning: [
      "Model relational data carefully before exposing it through API behaviour.",
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
      "Backend reliability depends on treating schema design, API behaviour, integration testing, and documentation as connected work.",
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
      "Provided cross-platform technical support and improved internal workflows with SQL, Power Automate, Excel, and clear documentation.",
    capabilityCategories: [
      "data-automation",
      "network-infrastructure",
      "cloud-enterprise",
    ],
    technologies: [
      "Power Automate",
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
      "I supported faculty, staff, students, and researchers across devices, operating systems, networks, authentication, and applications.",
      "Alongside day-to-day support, I used SQL, Power Automate, Excel, and documentation to make recurring workflows easier to complete and support.",
    ],
    context: [
      "The university environment involved varied users, devices, operating systems, and technical needs. The role required structured troubleshooting, clear communication, and validation after each change.",
      "I balanced immediate support requests with improvements to recurring workflows and technical documentation.",
    ],
    responsibilities: [
      "Provided support across Windows, macOS, and Linux.",
      "Diagnosed hardware, software, device, network, authentication, and application issues.",
      "Imaged and configured devices, deployed software, and tested changes before handoff.",
      "Supported RT ticketing and LDAP-based systems.",
      "Developed SQL and Power Automate solutions for internal workflows.",
      "Created Excel dashboards and documented technical procedures.",
      "Gathered requirements and coordinated with faculty, staff, students, researchers, and IT colleagues.",
    ],
    selectedContributions: [
      "Diagnosed cross-platform hardware, software, network, authentication, and application issues for a varied university community.",
      "Developed SQL and Power Automate solutions for recurring internal workflows.",
      "Created Excel dashboards and technical documentation, and validated device imaging, configuration, and software deployments.",
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
      "Provided consistent cross-platform support for device, software, network, authentication, and Microsoft 365 issues.",
      "Turned operational requirements into SQL, Power Automate, Excel, and documentation improvements.",
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
      "My early professional experience connected data analysis with the application and operational workflows that depend on trustworthy information.",
      "I used Python and MySQL for analysis and validation, supported cleaning and transformation work, documented repeatable processes, and presented findings for technical and business audiences.",
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
