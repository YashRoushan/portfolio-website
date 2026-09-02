import { expect, test } from "@playwright/test";

import { majorRoutes, screenshotName } from "./routes";

const viewports = [
  { label: "mobile-375", width: 375, height: 812 },
  { label: "tablet-768", width: 768, height: 1024 },
  { label: "laptop-1024", width: 1024, height: 900 },
  { label: "desktop-1440", width: 1440, height: 1000 },
] as const;

for (const viewport of viewports) {
  for (const route of majorRoutes) {
    test(`${route} visual audit at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(0);
      await page.screenshot({
        path: `artifacts/screenshots/${viewport.label}/${screenshotName(route)}.png`,
        fullPage: true,
      });
    });
  }
}

test("home dark theme visual audit", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() =>
    localStorage.setItem("theme-preference", "dark"),
  );
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.screenshot({
    path: "artifacts/screenshots/desktop-1440/home-dark.png",
    fullPage: true,
  });
});
