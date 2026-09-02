import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { requiredRoutes } from "./routes";

for (const route of requiredRoutes) {
  test(`${route} has no detectable WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
