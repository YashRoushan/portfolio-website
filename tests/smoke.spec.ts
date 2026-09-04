import { expect, test } from "@playwright/test";

import { requiredRoutes } from "./routes";

for (const route of requiredRoutes) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.title()).not.toBe("");
    expect(consoleErrors, `console errors on ${route}`).toEqual([]);
    expect(pageErrors, `page errors on ${route}`).toEqual([]);
  });
}

test("all required internal routes and public assets respond", async ({
  request,
}) => {
  for (const route of requiredRoutes) {
    const response = await request.get(route);
    expect(response.ok(), `${route} returned ${response.status()}`).toBe(true);
  }

  for (const asset of [
    "/Yash-Roushan-Resume.pdf",
    "/sitemap.xml",
    "/robots.txt",
    "/manifest.webmanifest",
    "/opengraph-image",
    "/icon",
    "/apple-icon",
  ]) {
    const response = await request.get(asset);
    expect(response.ok(), `${asset} returned ${response.status()}`).toBe(true);
  }
});

test("resume is a stable PDF download", async ({ request }) => {
  const response = await request.get("/Yash-Roushan-Resume.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).byteLength).toBeGreaterThan(50_000);
});

test("OBT case study presents the team collaboration photo", async ({
  page,
}) => {
  await page.goto("/experience/irving-oil-obt-it-analyst");
  await expect(
    page.getByRole("heading", { name: "Team collaboration" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: "Group photo accompanying the OBT IT Analyst collaboration section",
    }),
  ).toBeVisible();

  await page.goto("/experience/irving-oil-network-analyst-coop");
  await expect(
    page.getByRole("heading", { name: "Team collaboration" }),
  ).toHaveCount(0);
});

test("metadata, social image, and structured data are present", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/experience",
    "/experience/irving-oil-obt-it-analyst",
    "/projects/dalchess-code",
  ]) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /\/opengraph-image$/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  }

  await page.goto("/");
  expect(await validJsonLdEntityCount(page)).toBeGreaterThanOrEqual(2);
  await page.goto("/projects/dalchess-code");
  expect(await validJsonLdEntityCount(page)).toBeGreaterThanOrEqual(4);
});

async function validJsonLdEntityCount(page: import("@playwright/test").Page) {
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  return blocks.reduce((count, block) => {
    expect(() => JSON.parse(block)).not.toThrow();
    const value: unknown = JSON.parse(block);
    return count + (Array.isArray(value) ? value.length : 1);
  }, 0);
}

test("mobile menu manages focus and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
  await expect(menuButton).toHaveAccessibleName("Open navigation menu");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile primary" })
      .getByRole("link", { name: "Home" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();
});

test("theme preference cycles and survives navigation", async ({ page }) => {
  await page.goto("/");
  const switcher = page.getByRole("button", { name: /^Theme:/ });
  await expect(switcher).toHaveAttribute("aria-label", /Theme: system/);
  await switcher.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(
    await page.evaluate(() => localStorage.getItem("theme-preference")),
  ).toBe("light");
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("reduced motion removes meaningful animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page
    .locator(".reveal")
    .first()
    .evaluate((element) => getComputedStyle(element).animationDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
});

for (const width of [375, 768, 1024, 1440]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
