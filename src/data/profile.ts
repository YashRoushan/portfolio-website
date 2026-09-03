import type {
  CapabilityPillar,
  ContactMethod,
  NavigationItem,
  ProfileData,
} from "./types";

export const profile = {
  name: "Yash Roushan",
  monogram: "YR",
  title: "Software & Enterprise IT Professional",
  location: "Halifax, Nova Scotia, Canada",
  availability: "Open to full-time technology roles",
  email: "yashroushan@dal.ca",
  linkedinUrl: "https://www.linkedin.com/in/yash-roushan-8636a1242/",
  githubUrl: "https://github.com/YashRoushan",
  hero: {
    eyebrow: "Halifax, Nova Scotia · Open to full-time technology roles",
    heading: "Yash Roushan",
    title: "Software & Enterprise IT Professional",
    statement:
      "I build and support reliable systems across full-stack software, cloud platforms, enterprise applications, automation, and network infrastructure.",
  },
  professionalStory: [
    "My experience has grown across connected layers of technology: data quality and repeatable workflows, full-stack and backend development, user-facing IT support, automation, network observability, and enterprise application modernization.",
    "That range is cumulative. It helps me follow a system from user needs and application logic through data, cloud dependencies, network visibility, troubleshooting, and the documentation that keeps teams aligned.",
    "I am completing a Bachelor of Computer Science at Dalhousie University and seeking full-time technology roles where reliable delivery, clear communication, and practical problem-solving matter.",
  ],
  principles: [
    "Reliability",
    "Clarity",
    "Documentation",
    "Learning",
    "Collaboration",
  ],
  beyondTechnology:
    "Beyond technology, I enjoy reading and exploring different genres of books.",
  education: {
    institution: "Dalhousie University",
    degree: "Bachelor of Computer Science",
    location: "Halifax, Nova Scotia",
    dateLabel: "2022–2026",
    startDate: "2022-09",
    endDate: "2026-09",
    academicAreas: [
      "Data structures and algorithms",
      "Databases and server-side programming",
      "Web and mobile development",
      "Java, Python, and software engineering",
      "Networking and cloud fundamentals",
    ],
  },
  community: [
    {
      organization: "Dalhousie University",
      role: "Course Representative, Server-Side Scripting (CSCI 2170)",
      dateLabel: "September 2023–December 2023",
      startDate: "2023-09",
      endDate: "2023-12",
      summary:
        "Gathered, documented, and communicated student feedback and requirements to support course improvement and faculty-student collaboration.",
    },
  ],
} as const satisfies ProfileData;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const contactMethods = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-roushan-8636a1242/",
    description: "Connect with Yash professionally on LinkedIn.",
    priority: 1,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:yashroushan@dal.ca?subject=Portfolio%20inquiry%20for%20Yash%20Roushan",
    description:
      "Email Yash about a technology role or professional conversation.",
    priority: 2,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/YashRoushan",
    description: "Review Yash's public code and repositories.",
    priority: 3,
    external: true,
  },
  {
    id: "resume",
    label: "Resume",
    href: "/resume",
    description: "View Yash's resume overview and download options.",
    priority: 4,
    external: false,
  },
] as const satisfies readonly ContactMethod[];

export const capabilityPillars = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    summary:
      "Frontend, backend, API, database, debugging, testing, and deployment work across professional roles and substantial projects.",
    href: "/skills#software-engineering",
  },
  {
    id: "cloud-enterprise",
    title: "Cloud and Enterprise Systems",
    summary:
      "Enterprise application support, Azure migration dependencies, requirements gathering, troubleshooting, and clear technical documentation.",
    href: "/skills#cloud-enterprise",
  },
  {
    id: "network-infrastructure",
    title: "Networking and Infrastructure",
    summary:
      "Monitoring, node validation, network authentication hygiene, cross-platform support, and structured incident troubleshooting.",
    href: "/skills#network-infrastructure",
  },
  {
    id: "data-automation",
    title: "Data and Automation",
    summary:
      "Relational data, workflow automation, reporting, ETL documentation, and data-quality analysis grounded in real work.",
    href: "/skills#data-automation",
  },
] as const satisfies readonly CapabilityPillar[];

export const closingStatement =
  "Building reliable technology across software, cloud, and infrastructure.";
