const form = document.querySelector("#chat-form");
const input = document.querySelector("#question");
const conversation = document.querySelector("#conversation");
const status = document.querySelector("#status");
const enable = document.querySelector("#enable-model");
const send = document.querySelector("#send");
const reset = document.querySelector("#reset");

const resources = [
  { pattern: /\b(password|csid)\b/i, title: "CSID account and password self-service", url: "https://csid.cs.dal.ca" },
  { pattern: /\b(eduroam|wi[- ]?fi|wireless)\b/i, title: "Dalhousie wireless support", url: "https://wireless.dal.ca" },
  { pattern: /\bvpn\b/i, title: "Dalhousie VPN", url: "https://vpn.dal.ca" },
  { pattern: /\b(printer|printing)\b/i, title: "Computer Science printing", url: "https://print.cs.dal.ca/" },
  { pattern: /\b(outlook|e-?mail)\b/i, title: "Outlook email", url: "https://outlook.office.com" },
];
const helpDesk = { title: "Computer Science Help Desk", url: "https://helpdesk.cs.dal.ca" };
let worker;
let modelReady = false;
let pendingQuestion;
let history = [];

function showTurn(label, text, link) {
  const turn = document.createElement("div");
  turn.className = label === "You" ? "turn visitor" : "turn";
  const author = document.createElement("small");
  author.textContent = label;
  const body = document.createElement("p");
  body.textContent = text;
  turn.append(author, body);
  if (link) {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.textContent = link.title;
    turn.append(anchor);
  }
  conversation.append(turn);
}

function remember(question, answer) {
  history = [
    ...history,
    { role: "user", content: question },
    { role: "assistant", content: answer },
  ].slice(-10);
}

function modelError() {
  worker?.terminate();
  worker = undefined;
  modelReady = false;
  pendingQuestion = undefined;
  enable.disabled = false;
  enable.textContent = "Enable on-device AI";
  send.disabled = reset.disabled = false;
  status.textContent = "The model is unavailable in this browser. Curated links are still available.";
}

enable.addEventListener("click", () => {
  enable.disabled = true;
  status.textContent = "Downloading the model…";
  try {
    worker = new Worker("./model-worker.js", { type: "module" });
    worker.addEventListener("error", modelError);
    worker.addEventListener("message", ({ data }) => {
      if (data.kind === "ready") {
        modelReady = true;
        enable.textContent = "On-device AI enabled";
        status.textContent = "Model ready.";
      } else if (data.kind === "progress") {
        status.textContent = "Downloading the model · " + data.percent + "%";
      } else if (data.kind === "answer") {
        showTurn("On-device AI", data.text);
        remember(pendingQuestion, data.text);
        pendingQuestion = undefined;
        send.disabled = reset.disabled = false;
        status.textContent = "";
        input.focus();
      } else {
        modelError();
      }
    });
    worker.postMessage({ kind: "load" });
  } catch {
    modelError();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question || send.disabled) return;
  input.value = "";
  showTurn("You", question);
  const resource = resources.find(({ pattern }) => pattern.test(question));
  if (resource) {
    showTurn("Curated resource", "Start with this support resource.", resource);
    remember(question, resource.title + ": " + resource.url);
  } else if (modelReady) {
    pendingQuestion = question;
    send.disabled = reset.disabled = true;
    status.textContent = "Generating a reply…";
    worker.postMessage({ kind: "ask", messages: [...history, { role: "user", content: question }] });
  } else {
    showTurn("Curated resource", "For open-ended questions, enable on-device AI or contact the help desk.", helpDesk);
  }
  input.focus();
});

reset.addEventListener("click", () => {
  history = [];
  conversation.replaceChildren();
  status.textContent = "Conversation reset.";
  input.focus();
});
