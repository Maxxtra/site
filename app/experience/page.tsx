import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { EditorialMotion } from '@/components/editorial/motion';
import { Copy, pad } from '@/components/editorial/copy';
import { experience } from '@/lib/experience';

export const metadata: Metadata = pageMetadata({
  path: '/experience/',
  title: 'Experience',
  description:
    "Costin-Alexandru Deonise's work history: Chief Technology Officer at Qflex Technologies, AI engineering at the Research Institute and Bitdefender, and teaching at POLITEHNICA Bucharest.",
  ogType: 'website',
});

/*
 * Composition: a ledger of roles, newest first. Dates and place sit in the
 * margin; the organisation is the display line, the title beneath it in
 * didone italic, and the work in a short ruled list, indented so each entry
 * steps in from the one above.
 */
export default function ExperiencePage() {
  return (
    <main className="editorial page experience">
      <EditorialMotion>
        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <header className="page-head page-head--statement">
            <p className="eyebrow">Experience</p>
            <h1 className="display" data-rise>
              From software <em>intern</em> to CTO.
            </h1>
            <p className="page-lede" data-rise>
              <Copy text="Seven roles across production AI, applied research and teaching: Qflex Technologies, the University POLITEHNICA of Bucharest, the Research Institute, Bitdefender and Orion Innovation." />
            </p>
            <p className="page-count">
              <b>{pad(experience.length)}</b> roles
            </p>
          </header>

          <div style={{ paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}>
            {experience.map((role, i) => (
              <article key={role.slug} id={role.slug} className="role">
                <div className="role-when">
                  <span className="ledger-index">{pad(i + 1)}</span>
                  <p className="meta" style={{ opacity: 1 }}>
                    {role.start} — {role.end}
                  </p>
                  <p className="meta">{role.location}</p>
                </div>
                <h2 className="role-org" data-rise>
                  <Copy text={role.org} />
                </h2>
                <p className="role-title" data-rise>
                  {role.role}
                </p>
                <ul className="role-bullets">
                  {role.bullets.map((bullet, b) => (
                    <li key={b} data-rise>
                      <Copy text={bullet} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
