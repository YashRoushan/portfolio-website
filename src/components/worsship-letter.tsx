import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const letterParagraphs = [
  "I am pleased to write this letter in appreciation of Yash Roushan, who volunteered with Empovation / Worsship from June 2025 to December 2025.",
  "During his time with us, Yash consistently demonstrated commitment, responsibility, and a strong willingness to contribute meaningfully to a growing project. He approached his role with professionalism, curiosity, and a positive attitude, even in an early-stage environment that required flexibility and initiative.",
  "As a volunteer, Yash supported the team in areas such as backend support and product discussions. He showed the ability to work collaboratively, take feedback constructively, and follow through on assigned tasks.",
  "Early-stage projects like ours demand adaptability, and Yash rose to that challenge. His contributions helped move the project forward during a critical phase, and his efforts are genuinely appreciated.",
  "I fully understand and respect his decision to move on, and I am confident that Yash will be a valuable asset wherever he chooses to apply his skills next. I would gladly recommend them for opportunities that value dedication, teamwork, and a growth mindset.",
  "Please feel free to contact me if further information is required.",
] as const;

export function WorsshipLetter() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <figure>
        <figcaption className="border-b border-border p-5 sm:p-6">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            Letter of appreciation
          </h3>
          <p className="mt-2 text-muted-strong">
            Ganiyat Abe, Founder of Empovation, recognizes my volunteer
            contributions to Worsship in backend support and product
            discussions.
          </p>
          <p className="mt-2 text-sm text-muted">
            Period covered by the letter: June–December 2025.
          </p>
          <a
            className="button-secondary mt-4"
            href="/worsship-appreciation-letter.png"
            target="_blank"
            rel="noreferrer"
          >
            Open full-size letter
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </figcaption>
        <Image
          src="/worsship-appreciation-letter.png"
          unoptimized
          width={1536}
          height={1984}
          alt="Signed letter of appreciation from Ganiyat Abe at Empovation / Worsship. Read the letter text below."
          sizes="(max-width: 1023px) calc(100vw - 2rem), 48rem"
          className="h-auto w-full"
        />
      </figure>
      <details className="border-t border-border p-5 sm:p-6">
        <summary className="cursor-pointer font-semibold text-foreground">
          Read the letter text
        </summary>
        <blockquote className="mt-5 grid gap-4 text-muted-strong">
          <p>To Whom It May Concern,</p>
          {letterParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>Warm regards,</p>
          <p>
            Ganiyat Abe
            <br />
            Founder, Empovation
            <br />
            Product: Worsship
            <br />
            <a className="underline" href="mailto:hello@worsship.com">
              hello@worsship.com
            </a>
          </p>
        </blockquote>
      </details>
    </div>
  );
}
