import type { Metadata } from 'next';
import { EditorialMotion } from '@/components/editorial/motion';
import { Plate } from '@/components/editorial/plate';
import { Copy, pad } from '@/components/editorial/copy';
import { teaching } from '@/lib/teaching';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  alternates: { canonical: '/teaching/' },
  title: 'Teaching & Olympiads',
  description:
    "Costin-Alexandru Deonise's teaching and mentorship work: Associate Lecturer at POLITEHNICA Bucharest, Deputy Leader and National Team Coach for Romania's IOAI delegation, and Olympiad committee service.",
};

const highlighted = teaching.filter((t) => t.highlight);
const committees = teaching.filter((t) => !t.highlight);

/* Each headline role gets its own spread; the class picks the composition. */
const spread: Record<string, string> = {
  'ioai-national-coach': 'teaching-role--ioai',
  'upb-associate-lecturer': 'teaching-role--lecturer',
  'mlsp-trainer-organizer': 'teaching-role--mlsp',
  'alphaz-frc-mentor': 'teaching-role--alphaz',
};

/* The chapter titles, with the role's own words. */
const titles: Record<string, React.ReactNode> = {
  'ioai-national-coach': (
    <>
      Team <em>Romania,</em> 4th worldwide
    </>
  ),
  'upb-associate-lecturer': (
    <>
      Labs for 1000+ <em>students</em>
    </>
  ),
  'mlsp-trainer-organizer': (
    <>
      Summer <em>program,</em> three editions
    </>
  ),
  'alphaz-frc-mentor': (
    <>
      Rookie <em>All-Star,</em> Houston
    </>
  ),
};

/*
 * Composition: the page opens on paper, then the Astana team photograph runs
 * edge to edge. The four headline roles follow on ink, each as its own spread
 * (the camp talk and the AlphaZ trophy carry their photographs), and the
 * committee and review service closes on paper as a dense ledger.
 */
export default function TeachingPage() {
  const team = getPhoto('ioai-astana-2026-team');
  return (
    <main className="editorial page teaching">
      <EditorialMotion>
        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <header className="page-head page-head--statement">
            <p className="eyebrow">Teaching &amp; Olympiads</p>
            <h1 className="display" data-rise>
              Education, mentorship, and technical <em>leadership.</em>
            </h1>
            <p className="page-lede" data-rise>
              <Copy text="Labs and seminars for 1000+ students at POLITEHNICA Bucharest, and national-level leadership through Romania's AI Olympiad program, from leading and coaching the IOAI delegation to designing competition tasks." />
            </p>
            <p className="page-count">
              <b>{pad(teaching.length)}</b> roles
            </p>
          </header>
          <Plate photo={team} className="bleed" drift={3} sizes="100vw" priority />
        </section>

        <section className="page-section page-section--ink teaching-roles" data-nav-theme="dark" aria-label="Headline roles">
          <div className="lines" aria-hidden="true">
            <div className="contours" style={{ transform: 'scaleX(-1)' }} />
          </div>
          {highlighted.map((role, i) => {
            const photo = role.photoId ? getPhoto(role.photoId) : undefined;
            const cls = spread[role.slug] ?? '';
            return (
              <article key={role.slug} id={role.slug} className={`chapter teaching-role ${cls}`}>
                <p className="chapter-key">
                  {pad(i + 1)} / {role.period}
                </p>
                <h2 className="chapter-title" data-rise>
                  {titles[role.slug] ?? role.role}
                </h2>
                <div className="teaching-body">
                  <p className="role-title" data-rise>
                    {role.role}
                  </p>
                  <p className="meta">{role.org}</p>
                  <p className="chapter-text" data-rise>
                    <Copy text={role.description} />
                  </p>
                  {(role.certificateImage || role.links) && (
                    <ul className="link-row">
                      {role.certificateImage && (
                        <li>
                          <a href={role.certificateImage} target="_blank" rel="noreferrer" className="mono-link">
                            View certificate <span aria-hidden="true">↗</span>
                          </a>
                        </li>
                      )}
                      {role.links?.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} target="_blank" rel="noreferrer" className="mono-link mono-link--quiet">
                            {link.label} <span aria-hidden="true">↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {photo && (
                  <Plate photo={photo} drift={role.slug === 'alphaz-frc-mentor' ? 5 : 4} sizes="(min-width: 768px) 40vw, 100vw" />
                )}
              </article>
            );
          })}
        </section>

        <section className="page-section service" data-nav-theme="light">
          <div className="page-grid">
            <h2 className="display" data-rise>
              Committee &amp; review <em>service</em>
            </h2>
            <ol className="service-list">
              {committees.map((role) => (
                <li key={role.slug} id={role.slug}>
                  <article className="service-row" data-rise>
                    <span className="ledger-index" aria-hidden="true">
                      {pad(highlighted.length + committees.indexOf(role) + 1)}
                    </span>
                    <div>
                      <h3>{role.role}</h3>
                      <p className="org">{role.org}</p>
                    </div>
                    <div>
                      <p className="prose">
                        <Copy text={role.description} />
                      </p>
                      {(role.certificateImage || role.links) && (
                        <ul className="link-row" style={{ marginTop: '0.8rem' }}>
                          {role.certificateImage && (
                            <li>
                              <a href={role.certificateImage} target="_blank" rel="noreferrer" className="mono-link">
                                View certificate <span aria-hidden="true">↗</span>
                              </a>
                            </li>
                          )}
                          {role.links?.map((link) => (
                            <li key={link.href}>
                              <a href={link.href} target="_blank" rel="noreferrer" className="mono-link mono-link--quiet">
                                {link.label} <span aria-hidden="true">↗</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <p className="meta">{role.period}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
