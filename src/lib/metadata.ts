import type { Metadata } from "next";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataOptions): Metadata {
  const socialTitle = title.includes("Yash Roushan")
    ? title
    : `${title} | Yash Roushan`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_CA",
      url: path,
      siteName: "Yash Roushan Portfolio",
      title: socialTitle,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Yash Roushan — Software & Enterprise IT Professional",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
