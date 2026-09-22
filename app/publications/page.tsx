import type { Metadata } from 'next';
import { EditorialMotion } from '@/components/editorial/motion';
import { Copy, pad } from '@/components/editorial/copy';
import { publications } from '@/lib/publications';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  alternates: { canonical: '/publications/' },
  title: 'Publications',
  description:
    'Peer-reviewed publications by Costin-Alexandru Deonise on scalable automatic differentiation, privacy-preserving machine learning, LLM systems, and speech processing.',
};

const sorted = [...publications].sort((a, b) => b.year - a.year);
const years = [...new Set(sorted.map((p) => p.year))];

/** The site owner's name in an author list, set heavier. */
function Authors({ names }: { names: string[] }) {
  return (
    <p className="paper-authors">
      {names.map((name, i) => (
        <span key={name}>
          {name === siteConfig.name ? <b>{name}</b> : name}
          {i < names.length - 1 ? ', ' : ''}
        </span>
      ))}
    </p>
  );
}

/*
 * Composition: the ink page of the site. The year runs down the left margin
 * as a didone numeral and the papers of that year sit beside it as rows,
 * newest first. Titles in didone, authors in grotesk, venue and links in mono.
 */
// Running number across all years, newest first.
const indexOf = (slug: string) => sorted.findIndex((p) => p.slug === slug) + 1;

export default function PublicationsPage() {
  return (
    <main className="editorial page publications">
      <EditorialMotion>
        <section className="page-section page-section--ink" data-nav-theme="dark">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <header className="page-head">
            <p className="eyebrow">Publications</p>
            <h1 className="display" data-rise>
              Peer-reviewed work on differentiation, privacy, and <em>language</em> systems.
            </h1>
            <p className="page-lede" data-rise>
              <Copy text="Six publications spanning scalable automatic differentiation, privacy-preserving machine learning, LLM-based language systems, and speech processing, listed newest first." />
            </p>
            <p className="page-count">
              <b>{pad(publications.length)}</b>
              papers
            </p>
          </header>

          <div style={{ paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}>
            {years.map((year) => (
              <section key={year} className="year-group" aria-label={`Published in ${year}`}>
                <p className="year-mark" aria-hidden="true">
                  {year}
                </p>
                <ol className="year-list">
                  {sorted
                    .filter((p) => p.year === year)
                    .map((pub) => {
                      return (
                        <li key={pub.slug} id={pub.slug}>
                          <article className="paper" data-rise>
                            <h2 className="paper-title">
                              <Copy text={pub.title} />
                            </h2>
                            <Authors names={pub.authors} />
                            <div className="paper-side">
                              <p className="ledger-index">{pad(indexOf(pub.slug))}</p>
                              {pub.awards && pub.awards.length > 0 && (
                                <p className="work-awards">
                                  {pub.awards.map((award) => (
                                    <span key={award}>{award}</span>
                                  ))}
                                </p>
                              )}
                              <p className="meta">
                                {pub.venue}
                                <br />
                                {pub.date ?? pub.year}
                              </p>
                              {(pub.doiUrl || pub.mirrorUrl) && (
                                <ul className="paper-links">
                                  {pub.doiUrl && (
                                    <li>
                                      <a href={pub.doiUrl} target="_blank" rel="noreferrer" className="mono-link">
                                        View paper <span aria-hidden="true">↗</span>
                                      </a>
                                    </li>
                                  )}
                                  {pub.mirrorUrl && (
                                    <li>
                                      <a href={pub.mirrorUrl} target="_blank" rel="noreferrer" className="mono-link mono-link--quiet">
                                        Mirror <span aria-hidden="true">↗</span>
                                      </a>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </article>
                        </li>
                      );
                    })}
                </ol>
              </section>
            ))}
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
