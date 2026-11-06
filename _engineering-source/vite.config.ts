import { defineConfig } from "vite";
import { resolve } from "node:path";
import { projects } from "./src/content";

export default defineConfig({
  base: "./",
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        home: resolve("index.html"),
        notFound: resolve("404.html"),
        ...Object.fromEntries(
          projects.map((project) => [
            project.slug,
            resolve(`work/${project.slug}/index.html`),
          ]),
        ),
      },
    },
  },
});
