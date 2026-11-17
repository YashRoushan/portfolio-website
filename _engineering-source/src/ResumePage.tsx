import { ArrowLeft, ArrowUpRight, FileDown, Gamepad2, Share2 } from "lucide-react";
import { SiteFooter, SiteHeader } from "./components";
import { profile } from "./content";
import resume from "./resume.json";

type Entry = (typeof resume.experience)[number];

function ResumeEntries({ entries }: { entries: Entry[] }) {
  return entries.map(({ title, context, period, points }) => (
    <div className="resume-entry" key={`${title}-${period}`}>
      <div className="resume-entry-heading">
        <h4>{title}</h4>
        <p className="resume-period">{period}</p>
      </div>
      <p className="resume-entry-context">{context}</p>
      {points.length > 0 && <ul>{points.map(point => <li key={point}>{point}</li>)}</ul>}
    </div>
  ));
}

export function ResumePage({ shareUrl }: { shareUrl: string }) {
  const { contact } = resume;
  return (
    <>
      <SiteHeader prefix="../" current="resume" />
      <main id="main-content" className="resume-page container">
        <a href="../" className="text-link"><ArrowLeft size={17} aria-hidden="true" /> Back to portfolio</a>
        <header className="resume-page-header">
          <div>
            <h1>Résumé<span className="accent">.</span></h1>
          </div>
          <div className="resume-actions">
            <a href={`../${profile.resume}`} download className="button button-primary">
              <FileDown size={18} aria-hidden="true" /> Download PDF
            </a>
            <button type="button" data-share-resume className="button button-secondary requires-js">
              <Share2 size={18} aria-hidden="true" /> Share résumé
            </button>
          </div>
        </header>
        <p className="resume-share-status" role="status" data-resume-share-status />
        <div className="resume-share-field" data-resume-share-field hidden>
          <label htmlFor="resume-share-url">Résumé link</label>
          <input id="resume-share-url" value={shareUrl} readOnly />
        </div>

        <nav className="resume-index" aria-label="Résumé sections">
          <a href="#resume-education">Education</a>
          <a href="#resume-skills">Technical skills</a>
          <a href="#resume-experience">Experience</a>
          <a href="#resume-projects">Projects</a>
        </nav>
        <article className="resume-document" aria-labelledby="resume-name">
          <header className="resume-document-header">
            <h2 id="resume-name">{resume.name}</h2>
            <address>
              <span>{contact.location}</span>
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a>
              <a href={`mailto:${profile.email}`}>{contact.email}</a>
              <a href={profile.linkedin}>{contact.linkedin}</a>
              <a href={profile.github}>{contact.github}</a>
              <a href="../">Portfolio</a>
            </address>
          </header>
          <section aria-labelledby="resume-education">
            <h3 id="resume-education">Education</h3>
            <ResumeEntries entries={resume.education} />
          </section>
          <section aria-labelledby="resume-skills">
            <h3 id="resume-skills">Technical Skills</h3>
            <dl className="resume-skills">
              {resume.skills.map(({ label, value }) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="resume-experience">
            <h3 id="resume-experience">Experience</h3>
            <ResumeEntries entries={resume.experience} />
          </section>
          <section aria-labelledby="resume-projects">
            <h3 id="resume-projects">Projects</h3>
            <ResumeEntries entries={resume.projects} />
          </section>
        </article>

        <details className="resume-snake" data-resume-snake>
          <summary><Gamepad2 size={19} aria-hidden="true" /> Play Snake</summary>
          <div data-snake-container />
          <a className="text-link" href="../demos/snake/" target="_blank" rel="noopener noreferrer" data-snake-link>
            Open Snake in a new tab <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </details>
      </main>
      <SiteFooter prefix="../" />
    </>
  );
}
