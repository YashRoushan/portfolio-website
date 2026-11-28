import "./styles.css";
import "./resume.css";

const root = document.documentElement;
root.classList.add("has-js");
const themeButton = document.querySelector<HTMLButtonElement>(
  "[data-theme-toggle]",
);
const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

function setTheme(theme: string) {
  root.dataset.theme = theme;
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
  themeButton?.setAttribute("aria-label", label);
  themeButton?.setAttribute("title", label);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#111416" : "#f7f6f2");
}

setTheme(root.dataset.theme || "dark");
themeButton?.addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  try {
    localStorage.setItem("yash-theme", theme);
  } catch {
    /* The theme remains usable when storage is unavailable. */
  }
});
systemTheme.addEventListener("change", (event) => {
  try {
    if (!localStorage.getItem("yash-theme"))
      setTheme(event.matches ? "light" : "dark");
  } catch {
    setTheme(event.matches ? "light" : "dark");
  }
});

const menuButton =
  document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const navigation = document.querySelector<HTMLElement>("#site-navigation");
function closeMenu() {
  root.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
}
menuButton?.addEventListener("click", () => {
  const isOpen = root.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
});
navigation
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => {
    if (!root.classList.contains("menu-open")) return;
    closeMenu();
    if (link.pathname !== window.location.pathname || !link.hash) return;
    const section = document.getElementById(link.hash.slice(1));
    if (!section) return;
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  }));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && root.classList.contains("menu-open")) {
    closeMenu();
    menuButton?.focus();
  }
});
document.addEventListener("click", (event) => {
  if (
    event.target instanceof Node &&
    !document.querySelector(".site-header")?.contains(event.target)
  )
    closeMenu();
});
window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);

const copyButton =
  document.querySelector<HTMLButtonElement>("[data-copy-email]");
const copyStatus = document.querySelector<HTMLElement>("[data-copy-status]");
let copyTimer: ReturnType<typeof setTimeout> | undefined;
copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.copyEmail || "");
    copyButton.setAttribute("aria-label", "Email copied");
    if (copyStatus) copyStatus.textContent = "Email copied";
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyButton.setAttribute("aria-label", "Copy email address");
      if (copyStatus) copyStatus.textContent = "";
    }, 3000);
  } catch {
    if (copyStatus)
      copyStatus.textContent = "Select the email address to copy it.";
  }
});

const shareResume = document.querySelector<HTMLButtonElement>("[data-share-resume]");
const resumeShareField = document.querySelector<HTMLElement>("[data-resume-share-field]");
const resumeShareUrl = document.querySelector<HTMLInputElement>("#resume-share-url");
const resumeShareStatus = document.querySelector<HTMLElement>("[data-resume-share-status]");

shareResume?.addEventListener("click", async () => {
  if (!resumeShareUrl || !resumeShareField || !resumeShareStatus) return;
  const url = resumeShareUrl.value;
  resumeShareStatus.textContent = "";
  resumeShareField.hidden = true;
  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title: "Yash Roushan — Résumé", url });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    resumeShareStatus.textContent = "Résumé link copied.";
  } catch {
    resumeShareStatus.textContent = "Copy the link below to share the résumé.";
    resumeShareField.hidden = false;
    resumeShareUrl.focus();
    resumeShareUrl.select();
  }
});

const snakeDetails = document.querySelector<HTMLDetailsElement>("[data-resume-snake]");
const snakeContainer = snakeDetails?.querySelector<HTMLElement>("[data-snake-container]");
const snakeLink = snakeDetails?.querySelector<HTMLAnchorElement>("[data-snake-link]");
if (snakeDetails && snakeContainer && snakeLink) {
  let frame: HTMLIFrameElement | undefined;
  let observer: ResizeObserver | undefined;
  snakeDetails.addEventListener("toggle", () => {
    if (!snakeDetails.open) {
      observer?.disconnect();
      frame?.remove();
      frame = undefined;
      return;
    }
    if (frame) return;
    const game = document.createElement("iframe");
    game.title = "Snake game";
    game.src = snakeLink.href;
    game.addEventListener("load", () => {
      const body = game.contentDocument?.body;
      if (!body || frame !== game) return;
      const resize = () => {
        game.style.height = Math.ceil(body.getBoundingClientRect().height) + "px";
      };
      observer?.disconnect();
      observer = new ResizeObserver(resize);
      observer.observe(body);
      resize();
    });
    frame = game;
    snakeContainer.append(game);
  });
}

const tabs = [...document.querySelectorAll<HTMLButtonElement>("[data-tab]")];
const purchase = document.querySelector<HTMLInputElement>("[data-sample-trade]");
purchase?.addEventListener("change", () => {
  const shares = purchase.checked ? 6 : 5;
  const appleBasis = 800 + (shares - 5) * 180;
  const appleValue = shares * 180;
  const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const fields = {
    "[data-apple-shares]": String(shares),
    "[data-apple-value]": usd.format(appleValue),
    "[data-portfolio-value]": usd.format(appleValue + 1260),
    "[data-portfolio-basis]": usd.format(appleBasis + 1200),
    "[data-average-cost]": `AAPL average cost per share: ${usd.format(appleBasis / shares)}`,
  };
  for (const [selector, value] of Object.entries(fields)) {
    document.querySelectorAll(selector).forEach(node => { node.textContent = value; });
  }
  const tradeRow = document.querySelector<HTMLTableRowElement>("[data-extra-trade]");
  if (tradeRow) tradeRow.hidden = !purchase.checked;
});

const plannerTasks = document.querySelectorAll<HTMLInputElement>("[data-planner-task]");
const plannerProgress = document.querySelector("[data-planner-progress]");
plannerTasks.forEach(task => task.addEventListener("change", () => {
  const complete = Array.from(plannerTasks).filter(item => item.checked).length;
  if (plannerProgress) plannerProgress.textContent = `${complete} of ${plannerTasks.length} tasks complete`;
}));

function activateTab(tab: HTMLButtonElement) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(
      item.getAttribute("aria-controls") || "",
    );
    if (panel) panel.hidden = !selected;
  }
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    const destinations: Record<string, number> = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    const destination = destinations[event.key];
    if (destination === undefined) return;
    event.preventDefault();
    activateTab(tabs[destination]);
    tabs[destination].focus();
  });
});

const supportExamples: Record<
  string,
  { question: string; answer: string; resource: string; url: string }
> = {
  password: {
    question: "Forgot password",
    answer:
      "The support resource for resetting a CSID password is the CSID account service.",
    resource: "Open CSID account service",
    url: "https://csid.cs.dal.ca",
  },
  printer: {
    question: "Printer setup",
    answer:
      "The mapped resource for printing support is the Computer Science print service.",
    resource: "Open Computer Science printing",
    url: "https://print.cs.dal.ca/",
  },
  booking: {
    question: "Room booking",
    answer:
      "The mapped resource for reserving a campus room is the Dalhousie booking service.",
    resource: "Open campus bookings",
    url: "https://campusbookings.dal.ca/p/",
  },
};
document
  .querySelectorAll<HTMLButtonElement>("[data-chat-example]")
  .forEach((button) =>
    button.addEventListener("click", () => {
      const example = supportExamples[button.dataset.chatExample || ""];
      if (!example) return;
      document
        .querySelectorAll("[data-chat-example]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      const question = document.querySelector("[data-chat-question]");
      const answer = document.querySelector("[data-chat-answer]");
      const resource = document.querySelector<HTMLAnchorElement>(
        "[data-chat-resource]",
      );
      if (question) question.textContent = example.question;
      if (answer) answer.textContent = example.answer;
      if (resource) {
        resource.href = example.url;
        resource.textContent = `${example.resource} ↗`;
      }
    }),
  );

const processStates = [
  {
    tick: 0,
    state: "Running",
    description: "The process enters the ready queue and begins execution.",
  },
  {
    tick: 4,
    state: "Blocked",
    description: "The process pauses while its blocking operation completes.",
  },
  {
    tick: 7,
    state: "Running",
    description: "The process becomes ready again and resumes execution.",
  },
  {
    tick: 11,
    state: "Blocked",
    description: "A second blocking operation pauses the process.",
  },
  {
    tick: 13,
    state: "Running",
    description: "The process returns to the CPU for its final run.",
  },
  {
    tick: 16,
    state: "Finished",
    description:
      "The trace ends with 11 ticks running, 5 blocked and 0 waiting.",
  },
];
const processNext = document.querySelector<HTMLButtonElement>(
  "[data-process-next]",
);
let processIndex = 0;
function showProcessState() {
  const state = processStates[processIndex];
  const tickLabel = document.querySelector("[data-process-tick]");
  const stateLabel = document.querySelector("[data-process-state]");
  const description = document.querySelector("[data-process-description]");
  const progress = document.querySelector("[data-trace-progress]");
  if (tickLabel) tickLabel.textContent = `Tick ${state.tick}`;
  if (stateLabel) stateLabel.textContent = state.state;
  if (description) description.textContent = state.description;
  progress?.setAttribute(
    "aria-label",
    `Process trace progress, step ${processIndex + 1} of ${processStates.length}`,
  );
  progress
    ?.querySelectorAll("span")
    .forEach((bar, index) =>
      bar.classList.toggle("active", index <= processIndex),
    );
  if (processNext)
    processNext.disabled = processIndex === processStates.length - 1;
}
processNext?.addEventListener("click", () => {
  processIndex = Math.min(processIndex + 1, processStates.length - 1);
  showProcessState();
});
document
  .querySelector("[data-process-reset]")
  ?.addEventListener("click", () => {
    processIndex = 0;
    showProcessState();
  });

const caseIndex = document.querySelector(".case-index");
caseIndex?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return;
  const section = document.getElementById(event.target.hash.slice(1));
  const heading = section?.querySelector("h2");
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
});

const projectIndex = document.querySelector(".project-index");
if (projectIndex) {
  const links = [...projectIndex.querySelectorAll("a")];
  const cards = links.map(link => document.getElementById(link.hash.slice(1))!);
  const header = document.querySelector(".site-header");
  let scheduled = false;
  function updateProject() {
    scheduled = false;
    const readingLine = (header?.getBoundingClientRect().bottom ?? 0) + window.innerHeight * 0.2;
    let current = 0;
    for (let i = 1; i < cards.length; i++) {
      if (cards[i].getBoundingClientRect().top <= readingLine) current = i;
    }
    links.forEach((link, i) => {
      if (i === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateProject);
  }
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("pageshow", scheduleUpdate);
  updateProject();
}

if ("IntersectionObserver" in window) {
  const sections = [
    ...document.querySelectorAll<HTMLElement>("main > section[id]"),
  ];
  const navLinks = [
    ...document.querySelectorAll<HTMLAnchorElement>("[data-section]"),
  ];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.dataset.section === entry.target.id)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
  );
  if (document.getElementById("work"))
    sections.forEach((section) => sectionObserver.observe(section));

  if (window.matchMedia("(min-width: 701px) and (prefers-reduced-motion: no-preference)").matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.boundingClientRect.top > 0)
            entry.target.classList.add("is-entering");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));
  }
}
