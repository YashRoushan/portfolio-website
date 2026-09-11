"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useRef, useState } from "react";
import type { FormEvent } from "react";

type SubmissionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setSubmission({ status: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.message ??
            "Your message could not be sent. Please try again shortly.",
        );
      }

      formRef.current?.reset();
      setSubmission({
        status: "success",
        message: "Message sent. Thank you—I’ll reply as soon as I can.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="surface-card rounded-2xl p-5 sm:p-7"
      aria-labelledby="contact-form-heading"
    >
      <div className="flex items-start justify-between gap-5 border-b border-border pb-5">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
            Direct message
          </p>
          <h2
            id="contact-form-heading"
            className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
          >
            Send me a message
          </h2>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-strong">
          <Send aria-hidden="true" size={20} />
        </span>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted">
        All fields are required. Your message will be delivered directly to my
        inbox.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-muted-strong">
          Your name
          <input
            className={fieldClassName}
            type="text"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            placeholder="Jane Smith"
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="text-sm font-semibold text-muted-strong">
          Email address
          <input
            className={fieldClassName}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            placeholder="jane@company.com"
            required
            disabled={isSubmitting}
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold text-muted-strong">
        Subject
        <input
          className={fieldClassName}
          type="text"
          name="subject"
          autoComplete="off"
          minLength={3}
          maxLength={120}
          placeholder="Full-time software opportunity"
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="mt-5 block text-sm font-semibold text-muted-strong">
        Message
        <textarea
          className={`${fieldClassName} min-h-40 resize-y`}
          name="message"
          minLength={10}
          maxLength={3000}
          placeholder="Tell me about the role, team, and main area of focus."
          required
          disabled={isSubmitting}
        />
      </label>

      <div
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {submission.status !== "idle" ? (
        <div
          className={`mt-5 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
            submission.status === "success"
              ? "border-secondary/40 bg-secondary-soft text-muted-strong"
              : "border-red-500/40 bg-red-500/10 text-muted-strong"
          }`}
          role={submission.status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {submission.status === "success" ? (
            <CheckCircle2
              className="mt-0.5 shrink-0 text-secondary"
              aria-hidden="true"
              size={18}
            />
          ) : (
            <AlertCircle
              className="mt-0.5 shrink-0 text-red-500"
              aria-hidden="true"
              size={18}
            />
          )}
          <p>{submission.message}</p>
        </div>
      ) : null}

      <button
        type="submit"
        className="button-primary mt-6 min-w-40 disabled:cursor-wait disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle
              className="animate-spin"
              aria-hidden="true"
              size={17}
            />
            Sending…
          </>
        ) : (
          <>
            Send message <Send aria-hidden="true" size={16} />
          </>
        )}
      </button>
    </form>
  );
}
