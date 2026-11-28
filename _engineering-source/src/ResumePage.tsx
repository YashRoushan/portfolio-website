import { ArrowLeft, ArrowUpRight, FileDown, Gamepad2, MapPin, Share2 } from "lucide-react";
import { ProfilePortrait, SiteFooter, SiteHeader } from "./components";
import { profile } from "./content";
import resume from "./resume.json";

type Entry = (typeof resume.experience)[number] & { projectSlug?: string };

function ResumeEntries({ entries }: { entries: Entry[] }) {
  return entries.map(({ title, context, period, points, projectSlug }) => {
    return (
      <div className="resume-entry" key={title + period}>
        <div className="resume-entry-heading">
          <h3>{projectSlug ? (
            <a href={`../work/${projectSlug}/`}>{title} <ArrowUpRight size={18} aria-hidden="true" /></a>
          ) : title}</h3>
          <span className="resume-period">{period}</span>
        </div>
        <p className="resume-entry-context">{context.replace(" | ", " · ")}</p>
        <ul>{points.map(point => <li key={point}>{point}</li>)}</ul>
      </div>
    );
  });
}

export function ResumePage({ shareUrl }: { shareUrl: string }) {
  const { contact } = resume;
  return (
    <>
      <SiteHeader prefix="../" current="resume" />
      <main id="main-content" className="resume-page container">
        <a href="../" className="text-link resume-back"><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio</a>
        <header className="resume-masthead">
          <div className="resume-identity">
            <h1>
              <span className="resume-kicker">Résumé</span>
              <span className="resume-name">{resume.name}</span>
            </h1>
            <p className="resume-byline">Software engineer <span><MapPin size={14} aria-hidden="true" /> {contact.location}</span></p>
          </div>
          <div className="resume-intro">
            <div className="resume-actions">
              <a href={`../${profile.resume}`} download className="button button-primary">
                <FileDown size={17} aria-hidden="true" /> Download PDF
              </a>
              <button type="button" data-share-resume className="button button-secondary requires-js">
                <Share2 size={16} aria-hidden="true" /> Share résumé
              </button>
            </div>
            <p className="resume-share-status" role="status" data-resume-share-status />
            <div className="resume-share-field" data-resume-share-field hidden>
              <label htmlFor="resume-share-url">Résumé link</label>
              <input id="resume-share-url" value={shareUrl} readOnly />
            </div>
          </div>
          <div className="resume-photo"><ProfilePortrait prefix="../" sizes="(max-width: 620px) 74px, 108px" /></div>
        </header>
        <address className="resume-contacts">
          <a href={`mailto:${profile.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a>
          <a href={profile.linkedin}>{contact.linkedin}<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={profile.github}>{contact.github}<ArrowUpRight size={14} aria-hidden="true" /></a>
        </address>
        <div className="resume-layout">
          <nav className="resume-index" aria-label="Résumé sections">
            <a href="#resume-experience">Experience</a>
            <a href="#resume-projects">Projects</a>
            <a href="#resume-skills">Technical skills</a>
            <a href="#resume-education">Education</a>
          </nav>
          <div className="resume-document">
            <section aria-labelledby="resume-experience">
              <h2 id="resume-experience">Experience</h2>
              <div className="resume-timeline"><ResumeEntries entries={resume.experience} /></div>
            </section>
            <section aria-labelledby="resume-projects">
              <h2 id="resume-projects">Projects</h2>
              <ResumeEntries entries={resume.projects} />
            </section>
            <section aria-labelledby="resume-skills">
              <h2 id="resume-skills">Technical skills</h2>
              <dl className="resume-skills">
                {resume.skills.map(({ label, value }) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </section>
            <section aria-labelledby="resume-education">
              <h2 id="resume-education">Education</h2>
              <ResumeEntries entries={resume.education} />
            </section>
            <details className="resume-snake" data-resume-snake>
              <summary><Gamepad2 size={19} aria-hidden="true" /> Play Snake</summary>
              <div data-snake-container />
              <a className="text-link" href="../demos/snake/" target="_blank" rel="noopener noreferrer" data-snake-link>
                Open Snake in a new tab <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </details>
          </div>
        </div>
      </main>
      <SiteFooter prefix="../" />
    </>
  );
}
