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
      "I build software and support cloud platforms, enterprise applications, automation workflows, and network infrastructure, with a focus on reliability, troubleshooting, and clear documentation.",
  },
  professionalStory: [
    "My experience spans backend and full-stack development, enterprise application support, workflow automation, network monitoring, data analysis, and cross-platform technical support.",
    "Across those roles, I have gathered requirements, traced issues across applications, data, cloud, and network dependencies, coordinated with technical and business teams, and documented what others need to operate and change systems reliably.",
    "I am completing a Bachelor of Computer Science at Dalhousie University and seeking full-time software and enterprise IT roles where practical problem-solving, clear communication, and dependable delivery matter.",
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
    description: "Connect with me professionally on LinkedIn.",
    priority: 1,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:yashroushan@dal.ca?subject=Portfolio%20inquiry%20for%20Yash%20Roushan",
    description:
      "Email me about a technology role or professional conversation.",
    priority: 2,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/YashRoushan",
    description: "View my public code and repositories.",
    priority: 3,
    external: true,
  },
  {
    id: "resume",
    label: "Resume",
    href: "/resume",
    description: "View my web resume or download the PDF.",
    priority: 4,
    external: false,
  },
] as const satisfies readonly ContactMethod[];

export const capabilityPillars = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    summary:
      "Full-stack and backend development spanning React, Node.js, REST APIs, databases, testing, debugging, and deployment.",
    href: "/skills#software-engineering",
  },
  {
    id: "cloud-enterprise",
    title: "Cloud and Enterprise Systems",
    summary:
      "Enterprise application support, Azure migration support, requirements gathering, troubleshooting, and technical documentation.",
    href: "/skills#cloud-enterprise",
  },
  {
    id: "network-infrastructure",
    title: "Networking and Infrastructure",
    summary:
      "Network monitoring, node configuration and validation, authentication systems, cross-platform support, and incident troubleshooting.",
    href: "/skills#network-infrastructure",
  },
  {
    id: "data-automation",
    title: "Data and Automation",
    summary:
      "SQL, workflow automation, reporting, ETL documentation, and data-quality analysis from professional work.",
    href: "/skills#data-automation",
  },
] as const satisfies readonly CapabilityPillar[];

export const closingStatement =
  "Software development and enterprise IT experience across cloud, automation, networking, and support.";
