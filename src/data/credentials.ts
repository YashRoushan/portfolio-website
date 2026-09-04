import type { CredentialEntry } from "./types";

export const credentialsSectionTitle =
  "Certifications and Professional Learning";

export const credentials = [
  {
    id: "cisco-networking-learning",
    publicLabel:
      "Cisco Certified Network Associate (CCNA) v1.1 (200-301) Cert Prep — course completion",
    suppliedLabel: "Cisco Certified Network Associate",
    learningPlatform: "LinkedIn Learning · Certificate of Completion",
    href: "https://www.linkedin.com/learning/certificates/164283fa8ac6b3b76424fb44d2228b6045f474babfec7bd35ce818a4b6477998?u=2205113",
    verificationStatus: "verified",
    reviewNote:
      "Verified as a LinkedIn Learning course-completion record earned by Yash Roushan. It is not evidence of an official Cisco CCNA certification.",
  },
  {
    id: "azure-fundamentals-learning",
    publicLabel:
      "Microsoft Azure Fundamentals (AZ-900) Cert Prep by Microsoft Press — course completion",
    suppliedLabel: "Microsoft Azure Fundamentals (AZ-900)",
    learningPlatform: "LinkedIn Learning · Certificate of Completion",
    href: "https://www.linkedin.com/learning/certificates/bdd57dd7851d08a0e9a249cbaec86003175fb8f5ae2987fbbe38a59565fb6e8e?trk=share_certificate",
    verificationStatus: "verified",
    reviewNote:
      "Verified as a LinkedIn Learning course-completion record earned by Yash Roushan. It is not evidence of the official Microsoft AZ-900 certification.",
  },
  {
    id: "python-learning",
    publicLabel: "Python Data Structures",
    suppliedLabel: "Python",
    learningPlatform: "Coursera · University of Michigan",
    href: "https://www.coursera.org/account/accomplishments/verify/BZZVD8L2UQGY",
    verificationStatus: "verified",
    reviewNote:
      "Verified as a non-credit University of Michigan course completed through Coursera by Yash Roushan on May 13, 2022.",
  },
] as const satisfies readonly CredentialEntry[];
