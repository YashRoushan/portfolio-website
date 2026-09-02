import { Download, ExternalLink, FileText } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { ResumeDocument } from "@/components/resume-document";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Resume",
  description:
    "Accessible resume preview and PDF download for Yash Roushan, an IT and software professional based in Halifax, Nova Scotia.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <div className="resume-page-intro">
        <PageHero
          eyebrow="Resume"
          title="A concise view of the work"
          description="Read the accessible web overview below or download the selected PDF resume."
          actions={
            <>
              <a
                className="button-primary"
                href="/Yash-Roushan-Resume.pdf"
                download
              >
                <Download aria-hidden="true" size={17} /> Download PDF
              </a>
              <a
                className="button-secondary"
                href="/Yash-Roushan-Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink aria-hidden="true" size={16} /> Open PDF
              </a>
            </>
          }
          aside={
            <div className="surface-card rounded-2xl p-6">
              <FileText
                className="text-primary-strong"
                aria-hidden="true"
                size={28}
              />
              <p className="mt-5 font-semibold">Accessible fallback included</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                The full resume content is available as semantic HTML on this
                page, so the PDF is never the only way to read it.
              </p>
            </div>
          }
        />
      </div>

      <section
        className="container-shell py-10 sm:py-14"
        aria-labelledby="resume-preview-heading"
      >
        <div className="resume-page-intro mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Web resume</p>
            <h2
              id="resume-preview-heading"
              className="mt-3 text-2xl font-semibold tracking-tight"
            >
              Accessible preview
            </h2>
          </div>
          <p className="max-w-lg text-sm text-muted">
            Contact details use Yash&apos;s public job-search email. No private
            employer contact information is included.
          </p>
        </div>
        <ResumeDocument />
      </section>
    </>
  );
}
