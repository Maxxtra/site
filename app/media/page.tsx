import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { EditorialMotion } from '@/components/editorial/motion';
import { Plate } from '@/components/editorial/plate';
import { Copy, pad } from '@/components/editorial/copy';
import { mediaItems } from '@/lib/media';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = pageMetadata({
  path: '/media/',
  title: 'Media & Public Activity',
  description:
    "Press coverage and public activity involving Costin-Alexandru Deonise: Romania's 2026 International Olympiad in AI delegation, the AlphaZ FIRST Robotics team, and earlier student leadership in Argeș county.",
  ogType: 'website',
});

/*
 * Composition: an image head. The photograph opens the page, bleeding off the
 * left edge; the title and the lead story are set beside it, so the first
 * screen is already the coverage. The rest is a press ledger: a short note on
 * how entries were chosen, then one row per source, every row one link.
 */
export default function MediaPage() {
  const hero = mediaItems.find((m) => m.hero);
  const rest = mediaItems.filter((m) => !m.hero);
  // The lead item has no photograph of its own. The Astana team frame shows
  // the result it reports; the caption says what the photograph is.
  const leadPhoto = getPhoto(hero?.photoId ?? 'ioai-astana-2026-team');

  return (
    <main className="editorial page media">
      <EditorialMotion>
        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>

          <header className="page-head page-head--image press-head">
            <Plate photo={leadPhoto} className="press-head-plate" sizes="(min-width: 768px) 54vw, 100vw" priority />
            <div className="press-head-text">
              <p className="eyebrow">Media &amp; Public Activity</p>
              <h1 className="display" data-rise>
                Independent coverage, from a county student council to <em>Team Romania.</em>
              </h1>
              {hero && (
                <article className="press-lead-story" data-rise>
                  <p className="meta">
                    <span className="ledger-index">Lead</span>{' '}
                    {hero.source}, {hero.date}
                  </p>
                  <h2>
                    <Copy text={hero.title} />
                  </h2>
                  <p className="prose">
                    <Copy text={hero.blurb} />
                  </p>
                  <a href={hero.url} target="_blank" rel="noreferrer" className="mono-link">
                    Read source <span aria-hidden="true">↗</span>
                  </a>
                </article>
              )}
            </div>
          </header>

          <div className="page-grid" style={{ paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}>
            <div className="press-preface">
              <p className="page-tally">{pad(mediaItems.length)} entries</p>
              <p className="prose" data-rise>
                <Copy text="Every entry here is corroborated by an independently published source: national and local Romanian press, official competition results, or a publisher record. None of it is self-reported." />
              </p>
              <p className="meta">Ordered by outlet prominence: national, then regional and institutional, then niche.</p>
            </div>
            <ol className="press-list">
              {rest.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="press-row" data-rise>
                    <div className="press-source">
                      <span className="meta category">{item.category}</span>{' '}
                      <span className="meta">
                        {item.source}{' '}
                        <br />
                        {item.date}
                      </span>
                    </div>{' '}
                    <div>
                      <h3>
                        <Copy text={item.title} />
                      </h3>{' '}
                      <p className="prose">
                        <Copy text={item.blurb} />
                      </p>
                    </div>
                    <span className="work-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
