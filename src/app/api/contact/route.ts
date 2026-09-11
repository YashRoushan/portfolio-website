const MAX_BODY_LENGTH = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const rateLimitEntries = new Map<string, RateLimitEntry>();

function jsonResponse(message: string, status: number, headers?: HeadersInit) {
  return Response.json(
    { message },
    {
      status,
      headers: { "Cache-Control": "no-store", ...headers },
    },
  );
}

function getStringField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateSubmission(value: unknown): ContactSubmission | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const record = value as Record<string, unknown>;
  const name = getStringField(record.name);
  const email = getStringField(record.email).toLowerCase();
  const subject = getStringField(record.subject).replace(/[\r\n]+/g, " ");
  const message = getStringField(record.message);

  if (
    name.length < 2 ||
    name.length > 80 ||
    email.length > 254 ||
    subject.length < 3 ||
    subject.length > 120 ||
    message.length < 10 ||
    message.length > 3000
  ) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return { name, email, subject, message };
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    request.headers.get("x-real-ip")?.trim() ||
    forwardedFor?.split(",")[0]?.trim() ||
    null
  );
}

function getRateLimitRetryAfter(clientIdentifier: string | null) {
  if (!clientIdentifier) return 0;

  const now = Date.now();
  const current = rateLimitEntries.get(clientIdentifier);

  if (!current || current.resetAt <= now) {
    rateLimitEntries.set(clientIdentifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return 0;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  }

  current.count += 1;
  return 0;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const requestHost = forwardedHost || request.headers.get("host")?.trim();
  if (!requestHost) return false;

  try {
    return new URL(origin).host === requestHost;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return jsonResponse("This request could not be accepted.", 403);
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return jsonResponse("Send the form as JSON.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_LENGTH) {
    return jsonResponse("The message is too large.", 413);
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_LENGTH) {
      return jsonResponse("The message is too large.", 413);
    }
    payload = JSON.parse(body);
  } catch {
    return jsonResponse("The form submission was not valid.", 400);
  }

  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    getStringField((payload as Record<string, unknown>).website)
  ) {
    return jsonResponse("Message sent.", 200);
  }

  const submission = validateSubmission(payload);
  if (!submission) {
    return jsonResponse(
      "Check each field and enter a valid email address before sending.",
      400,
    );
  }

  const retryAfter = getRateLimitRetryAfter(getClientIdentifier(request));
  if (retryAfter > 0) {
    return jsonResponse(
      "Too many messages were sent from this connection. Please try again later.",
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient =
    process.env.CONTACT_TO_EMAIL?.trim() || "yashroushan@dal.ca";
  const sender =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Yash Roushan Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return jsonResponse(
      "The contact form is temporarily unavailable. Please email yashroushan@dal.ca.",
      503,
    );
  }

  const text = [
    "New message from Yash Roushan's portfolio",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Subject: ${submission.subject}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: submission.email,
        subject: `[Portfolio] ${submission.subject}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Contact email delivery failed", {
        status: response.status,
      });
      return jsonResponse(
        "Your message could not be delivered. Please try again shortly.",
        502,
      );
    }
  } catch (error) {
    console.error("Contact email delivery failed", {
      cause: error instanceof Error ? error.name : "UnknownError",
    });
    return jsonResponse(
      "Your message could not be delivered. Please try again shortly.",
      502,
    );
  }

  return jsonResponse("Message sent.", 200);
}
