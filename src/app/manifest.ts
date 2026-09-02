import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yash Roushan — IT & Software Professional",
    short_name: "Yash Roushan",
    description:
      "Portfolio spanning software, cloud, enterprise systems, automation, and network infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F8FA",
    theme_color: "#1D4ED8",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
