export type InternalPath = "/" | `/${string}`;
export type ExternalUrl = `https://${string}`;
export type MailtoUrl = `mailto:${string}`;
export type LinkHref = InternalPath | ExternalUrl | MailtoUrl;

export type YearMonth = `${number}-${
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"}`;

export type CapabilityId =
  | "software-engineering"
  | "cloud-enterprise"
  | "network-infrastructure"
  | "data-automation";

export type ExperienceCategory = CapabilityId | "business-technology";

export type ExperienceSlug =
  | "irving-oil-obt-it-analyst"
  | "irving-oil-network-analyst-coop"
  | "worsship-backend-developer"
  | "dalhousie-it-technical-assistant-coop"
  | "dresma-data-analyst-intern";

export type ProjectSlug =
  | "dalchess-code"
  | "jobify-job-tracker"
  | "quick-cash-marketplace"
  | "dalhousie-combat-robotics";

export type EvidenceKind =
  | "company"
  | "credential"
  | "live-site"
  | "professional-profile"
  | "repository"
  | "team-repository";

export type LinkValidationStatus =
  "provided" | "validated" | "requires-validation" | "unavailable";

export interface EvidenceLink {
  readonly label: string;
  readonly href: ExternalUrl;
  readonly kind: EvidenceKind;
  readonly validationStatus: LinkValidationStatus;
  readonly publicationStatus: "publish" | "hold-for-review";
  readonly note?: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: InternalPath;
}

export interface ContactMethod {
  readonly id: "linkedin" | "email" | "github" | "resume";
  readonly label: string;
  readonly href: LinkHref;
  readonly description: string;
  readonly priority: number;
  readonly external: boolean;
}

export interface EducationEntry {
  readonly institution: string;
  readonly degree: string;
  readonly location: string;
  readonly dateLabel: string;
  readonly startDate: YearMonth;
  readonly endDate: YearMonth;
  readonly academicAreas: readonly string[];
}

export interface CommunityEntry {
  readonly organization: string;
  readonly role: string;
  readonly dateLabel: string;
  readonly startDate: YearMonth;
  readonly endDate: YearMonth | "Present";
  readonly summary: string;
}

export interface CapabilityPillar {
  readonly id: CapabilityId;
  readonly title: string;
  readonly summary: string;
  readonly href: InternalPath;
}

export interface ProfileData {
  readonly name: string;
  readonly monogram: string;
  readonly title: string;
  readonly location: string;
  readonly availability: string;
  readonly email: string;
  readonly linkedinUrl: ExternalUrl;
  readonly githubUrl: ExternalUrl;
  readonly hero: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly title: string;
    readonly statement: string;
  };
  readonly professionalStory: readonly string[];
  readonly principles: readonly string[];
  readonly beyondTechnology: string;
  readonly education: EducationEntry;
  readonly community: readonly CommunityEntry[];
}

export interface ExperienceEntry {
  readonly slug: ExperienceSlug;
  readonly company: string;
  readonly role: string;
  readonly organizationOrTeam: string;
  readonly employmentType: "Co-op" | "Internship" | "Professional experience";
  readonly location: string;
  readonly startDate: YearMonth;
  readonly endDate: YearMonth | "Present";
  readonly dateLabel: string;
  readonly shortSummary: string;
  readonly capabilityCategories: readonly ExperienceCategory[];
  readonly technologies: readonly string[];
  readonly overview: readonly string[];
  readonly context: readonly string[];
  readonly responsibilities: readonly string[];
  readonly selectedContributions: readonly string[];
  readonly approachOrReasoning: readonly string[];
  readonly collaboration: readonly string[];
  readonly outcomes: readonly string[];
  readonly challenges: readonly string[];
  readonly lessons: readonly string[];
  readonly evidenceLinks: readonly EvidenceLink[];
  readonly confidentialityNote: string;
  readonly relatedProjects: readonly ProjectSlug[];
  readonly relatedExperience: readonly ExperienceSlug[];
  readonly displayOrder: number;
  readonly featured: boolean;
}

export interface ProjectEntry {
  readonly slug: ProjectSlug;
  readonly title: string;
  readonly role: string;
  readonly startDate: YearMonth;
  readonly endDate: YearMonth | "Present";
  readonly dateLabel: string;
  readonly shortSummary: string;
  readonly problemStatement: string;
  readonly capabilityCategories: readonly CapabilityId[];
  readonly technologies: readonly string[];
  readonly contribution: readonly string[];
  readonly keyFeatures: readonly string[];
  readonly engineeringDecisions: readonly string[];
  readonly testingAndDebugging: readonly string[];
  readonly outcomes: readonly string[];
  readonly evidenceLinks: readonly EvidenceLink[];
  readonly teamAttribution: string;
  readonly relatedSkills: readonly string[];
  readonly relatedExperience: readonly ExperienceSlug[];
  readonly displayOrder: number;
  readonly featured: boolean;
}

export type SkillUsage =
  | "Used in production or professional work"
  | "Used in a substantial project"
  | "Coursework or foundational exposure";

export type SkillGroup =
  | "Programming and web"
  | "Data and databases"
  | "Cloud and automation"
  | "Networking and systems"
  | "Ways of working";

export interface SkillEvidence {
  readonly label: string;
  readonly href: InternalPath;
  readonly context: string;
}

export interface SkillEntry {
  readonly id: string;
  readonly name: string;
  readonly group: SkillGroup;
  readonly capabilityCategories: readonly CapabilityId[];
  readonly usage: SkillUsage;
  readonly evidence: readonly SkillEvidence[];
}

export interface SkillReviewItem {
  readonly id: string;
  readonly name: string;
  readonly suppliedCategory: "Primary" | "Secondary or verification-dependent";
  readonly reason: string;
}

export type CredentialVerificationStatus =
  "link-provided-title-unconfirmed" | "verified";

export interface CredentialEntry {
  readonly id: string;
  readonly publicLabel: string;
  readonly suppliedLabel: string;
  readonly learningPlatform: string;
  readonly href: ExternalUrl;
  readonly verificationStatus: CredentialVerificationStatus;
  readonly reviewNote: string;
}
