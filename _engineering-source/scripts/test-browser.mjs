import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(resolve(process.env.PORTFOLIO_QA_DEPS, "package.json"));
const { chromium, expect } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");
const site = process.env.PORTFOLIO_QA_URL;
const browser = await chromium.launch({ channel: "chrome" });

async function heading(page, name) {
  await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
}

async function visit(page, url) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  assert.ok(response?.ok(), url + " returned HTTP " + response?.status());
}

async function pageTest(name, verify, viewport = { width: 1440, height: 1000 }) {
  const context = await browser.newContext({ viewport });
  try {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await verify(page);
    assert.deepEqual(errors, [], "Uncaught browser errors");
    console.log("PASS " + name);
  } finally {
    await context.close();
  }
}

async function a11y(page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  assert.deepEqual(violations.map(({ id, nodes }) => ({
    id, elements: nodes.map(({ target }) => target),
  })), [], "WCAG 2.1 AA automated accessibility findings");
}

async function fitsViewport(page) {
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - window.innerWidth
  );
  assert.ok(overflow <= 1, "Horizontal overflow: " + overflow + "px");
}

async function portfolio(page, mobile) {
  await visit(page, site);
  await heading(page, /Yash\s*Roushan/);
  await expect(page.getByText("Software Engineer · Full-Stack Development · AI & Automation", { exact: true })).toBeVisible();
  if (mobile) {
    const menu = page.getByRole("button", { name: /^(Open|Close) navigation$/ });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Work" }).click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
  await expect(page.getByRole("heading", { name: "Quick Cash" })).toBeVisible();
  await fitsViewport(page);
  const image = page.locator(".core-image");
  await expect.poll(() => image.evaluate((node) => node.currentSrc)).toMatch(mobile ? /compute-core-mobile\.avif$/ : /compute-core(?:-small)?\.webp$/);
  await a11y(page);
  await visit(page, site + "resume/");
  await heading(page, /Résumé/);
  await expect(page.getByRole("heading", { name: "AI Trainer & Coding Evaluator" })).toBeVisible();
  const download = page.getByRole("link", { name: "Download PDF" });
  const pdf = await page.request.get(new URL(await download.getAttribute("href"), page.url()).href);
  assert.ok(pdf.ok() && (await pdf.body()).subarray(0, 5).toString() === "%PDF-");
  await fitsViewport(page);
  await a11y(page);
}

async function snake(page) {
  await visit(page, site + "demos/snake/");
  await page.getByRole("button", { name: "Start game" }).click();
  await expect(page.getByRole("status")).toHaveText("Game in progress.");
  const board = page.getByRole("application");
  const startRow = await board.locator(".head").evaluate((node) => node.style.gridRowStart);
  await board.press("ArrowUp");
  await expect.poll(() => board.locator(".head").evaluate((node) => node.style.gridRowStart)).not.toBe(startRow);
  await board.press("Space");
  await expect(page.getByRole("status")).toHaveText("Game paused.");
  await page.getByRole("button", { name: "Restart" }).click();
  await expect(page.getByRole("status")).toHaveText("Game in progress.");
}

async function weather(page) {
  await page.route("https://geocoding-api.open-meteo.com/**", (route) => route.fulfill({
    json: { results: [{ id: 2643743, name: "London", country: "United Kingdom", admin1: "England", latitude: 51.51, longitude: -0.13 }] },
  }));
  await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({
    json: {
      timezone: "UTC",
      current: { time: 1794830400, temperature_2m: 7, weather_code: 3, is_day: 1 },
      daily: { time: [1794787200], temperature_2m_max: [9], temperature_2m_min: [2], weather_code: [3], precipitation_probability_max: [12] },
    },
  }));
  await visit(page, site + "demos/weather/");
  await heading(page, "Weather Explorer");
  await expect(page.getByText("Halifax, NS", { exact: true })).toBeVisible();
  const search = page.getByRole("combobox", { name: "Search cities worldwide" });
  await search.fill("London");
  await expect(page.getByRole("option", { name: /London.*United Kingdom/ })).toBeVisible();
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(page.getByText("London, United Kingdom", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Extended forecast" })).toBeVisible();
  await page.getByRole("button", { name: "°F" }).click();
  await expect(page.locator(".big-temp")).toHaveText("45°F");
  await fitsViewport(page);
  await a11y(page);
}

async function helpdesk(page) {
  await page.route("**/demos/helpdesk/model-worker.js", (route) => route.fulfill({
    contentType: "text/javascript",
    body: 'self.onmessage = ({data}) => self.postMessage(data.kind === "load" ? {kind: "ready"} : {kind: "answer", text: "Model received " + data.messages.length + " message(s)."});',
  }));
  await visit(page, site + "work/local-it-help-desk/");
  const link = page.getByRole("link", { name: "Try live demo" });
  await visit(page, new URL(await link.getAttribute("href"), page.url()).href);
  await heading(page, "IT Help Desk Chatbot");
  const input = page.getByLabel("IT question");
  const chat = page.getByRole("log");
  await input.fill("reset my CSID password");
  await input.press("Enter");
  await expect(chat.getByRole("link", { name: "CSID account and password self-service" })).toBeVisible();
  await page.getByRole("button", { name: "Enable on-device AI" }).click();
  await expect(page.getByRole("status")).toHaveText("Model ready.");
  await input.fill("External monitor problem");
  await input.press("Enter");
  await expect(chat.getByText("Model received 3 message(s).")).toBeVisible();
  await page.getByRole("button", { name: "Reset conversation" }).click();
  await expect(chat.locator(".turn")).toHaveCount(0);
  await input.fill("<img src=x onerror=alert(1)>");
  await input.press("Enter");
  await expect(chat.getByText("Model received 1 message(s).")).toBeVisible();
  await expect(chat.locator("img")).toHaveCount(0);
  await fitsViewport(page);
  await a11y(page);
}

async function stock(page) {
  await visit(page, "https://yash-stock-portfolio-tracker.yashroushan.chatgpt.site/");
  const guest = page.waitForResponse((response) => response.url().endsWith("/api/auth/demo"));
  await page.getByRole("button", { name: "Try the demo" }).click();
  const session = await guest;
  assert.ok(session.ok(), "Stock guest login failed");
  const { token } = await session.json();
  const origin = new URL(page.url()).origin;
  const headers = { Authorization: "Bearer " + token };
  await heading(page, "Your portfolios");
  await expect(page.getByRole("button", { name: "Sample portfolio" })).toBeVisible();
  const list = await page.request.get(origin + "/api/portfolios", { headers });
  assert.ok(list.ok(), "Could not load portfolios");
  const { portfolios } = await list.json();
  const id = portfolios.find(({ name }) => name === "Sample portfolio").id;
  const summary = await page.request.get(origin + "/api/portfolios/" + id + "/summary", { headers });
  assert.ok(summary.ok(), "Could not load portfolio calculations");
  const data = await summary.json();
  assert.ok(data.summary.holdings.length > 0, "Sample holdings are missing");
  const trade = await page.request.post(origin + "/api/transactions", {
    headers,
    data: { portfolioId: id, ticker: "AAPL", type: "BUY", quantity: 1, price: 200, occurredAt: new Date().toISOString() },
  });
  assert.equal(trade.status(), 201, "Could not save a trade in the expiring demo workspace");
  const records = await page.request.get(origin + "/api/transactions?portfolioId=" + id, { headers });
  assert.ok(records.ok() && (await records.json()).transactions.some(
    ({ ticker, quantity, priceCents }) => ticker === "AAPL" && quantity === 1 && priceCents === 20000,
  ), "Saved trade is missing from the ledger");
}

async function tasks(page) {
  await visit(page, "https://yash-task-planner.yashroushan.chatgpt.site/");
  const guest = page.waitForResponse((response) => response.url().endsWith("/api/v1/auth/demo"));
  await page.getByRole("button", { name: "Try the demo" }).click();
  const session = await guest;
  assert.ok(session.ok(), "Task Planner guest login failed");
  const { accessToken } = await session.json();
  const origin = new URL(page.url()).origin;
  const headers = { Authorization: "Bearer " + accessToken };
  const name = "Portfolio QA task";
  try {
    await page.waitForURL("**/app/tasks");
    await heading(page, "Tasks");
    await page.getByRole("button", { name: "New Task" }).click();
    await page.getByLabel("Title", { exact: true }).fill(name);
    await page.getByRole("button", { name: "Create Task" }).click();
    await expect(page.getByText(name, { exact: true })).toBeVisible();
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByText(name, { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Edit " + name }).click();
    await page.getByLabel("Title", { exact: true }).fill(name + " edited");
    await page.getByRole("button", { name: "Update Task" }).click();
    await expect(page.getByText(name + " edited", { exact: true })).toBeVisible();
  } finally {
    await page.request.post(origin + "/api/v1/auth/logout", { headers });
  }
}

async function liveWeather(page) {
  const network = [];
  const domain = (request) => new URL(request.url()).hostname.endsWith(".open-meteo.com");
  page.on("requestfailed", (request) => {
    if (domain(request)) network.push(new URL(request.url()).hostname + " " + request.failure()?.errorText);
  });
  page.on("response", (response) => {
    if (domain(response)) network.push(new URL(response.url()).hostname + " HTTP " + response.status());
  });
  await visit(page, site + "demos/weather/");
  try {
    await expect(page.getByText("Halifax, NS", { exact: true })).toBeVisible({ timeout: 20000 });
    const search = page.getByRole("combobox", { name: "Search cities worldwide" });
    await search.fill("London");
    await page.getByRole("option", { name: /London.*United Kingdom/ }).first().click({ timeout: 18000 });
    await expect(page.getByText("London, United Kingdom", { exact: true })).toBeVisible({ timeout: 20000 });
  } catch (error) {
    console.error("Open-Meteo requests:", network);
    console.error("Weather UI status:", await page.locator(".status").allTextContents());
    throw error;
  }
}

async function liveModel(page) {
  await visit(page, site + "demos/helpdesk/");
  await page.getByRole("button", { name: "Enable on-device AI" }).click();
  await expect(page.getByRole("status")).toHaveText("Model ready.", { timeout: 120000 });
  const input = page.getByLabel("IT question");
  await input.fill("How can I troubleshoot a blank external monitor?");
  await input.press("Enter");
  await expect(page.getByRole("log").locator(".turn").last()).toContainText("On-device AI", { timeout: 90000 });
}

try {
  if (process.argv.includes("--live")) {
    const results = await Promise.allSettled([
      pageTest("Live Stock Tracker guest, holdings and stored trade", stock),
      pageTest("Live Task Planner guest, task creation, saved reload and edit", tasks),
      pageTest("Live weather geocoding and forecasts", liveWeather),
      pageTest("Real browser model download and inference", liveModel),
    ]);
    const failures = results.filter((result) => result.status === "rejected");
    for (const failure of failures) console.error(failure.reason);
    if (failures.length) process.exitCode = 1;
  } else {
    const mobile = { width: 375, height: 812 };
    const checks = [
      ["Desktop portfolio and résumé accessibility at 1440px", (page) => portfolio(page, false)],
      ["Mobile navigation, layout and accessibility at 375px", (page) => portfolio(page, true), mobile],
      ["Snake start, keyboard steering, pause and restart", snake],
      ["Weather search, keyboard selection and units", weather, mobile],
      ["Help-desk link lookup, simulated model, reset and safe text rendering", helpdesk, mobile],
    ];
    for (const [name, verify, viewport] of checks) {
      try {
        await pageTest(name, verify, viewport);
      } catch (error) {
        console.error("FAIL " + name, error);
        process.exitCode = 1;
      }
    }
  }
} finally {
  await browser.close();
}
