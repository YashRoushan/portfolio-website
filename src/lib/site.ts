const fallbackUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return fallbackUrl;

  const withProtocol = value.startsWith("http") ? value : `https://${value}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return fallbackUrl;
  }
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL,
);

export const publicEmail = "yashroushan@dal.ca";
export const emailHref = `mailto:${publicEmail}?subject=${encodeURIComponent("Portfolio inquiry for Yash Roushan")}`;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/yash-roushan-8636a1242/",
  github: "https://github.com/YashRoushan",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
