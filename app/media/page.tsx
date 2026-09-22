import type { Metadata } from 'next';
import { EditorialMotion } from '@/components/editorial/motion';
import { Plate } from '@/components/editorial/plate';
import { Copy, pad } from '@/components/editorial/copy';
import { mediaItems } from '@/lib/media';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  alternates: { canonical: '/media/' },
  title: 'Media & Public Activity',
  description:
    "Press coverage and public activity involving Costin-Alexandru Deonise: Romania's 2026 International Olympiad in AI delegation, the AlphaZ FIRST Robotics team, and earlier student leadership in Argeș county.",
};

/*
 * Composition: the lead story runs as a spread, its photograph bleeding off
 * the left edge with the source, title and blurb set beside it. The rest is
 * a press ledger: source and date in the margin, the headline and blurb
 * beside them, an arrow at the edge. Every row is one link.
 */
export default function MediaPage() {
  const hero = mediaItems.find((m) => m.hero);
  const rest = mediaItems.filter((m) => !m.hero);
  // The lead item has no photograph of its own; the Astana team frame is the
  // subject of the coverage it opens.
  const leadPhoto = getPhoto(hero?.photoId ?? 'ioai-astana-2026-team');

  return (
    <main className="editorial page media">
      <EditorialMotion>
        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <header className="page-head">
            <p className="eyebrow">Media &amp; Public Activity</p>
            <h1 className="display" data-rise>
              Independent coverage, from a county student council to <em>Team Romania.</em>
            </h1>
            <p className="page-lede" data-rise>
              <Copy text="Every entry here is corroborated by an independently published source: national and local Romanian press, official competition results, or a publisher record. None of it is self-reported." />
            </p>
            <p className="page-count">
              <b>{pad(mediaItems.length)}</b>
              sources
            </p>
          </header>

          {hero && (
            <article className="page-grid press-lead">
              <Plate photo={leadPhoto} drift={4} sizes="(min-width: 768px) 58vw, 100vw" priority />
              <div className="press-lead-text">
                <p className="meta">
                  <span className="ledger-index">Lead</span>
                  {'  '}
                  {hero.source}, {hero.date}
                </p>
                <h2 data-rise>
                  <Copy text={hero.title} />
                </h2>
                <p className="prose" data-rise>
                  <Copy text={hero.blurb} />
                </p>
                <a href={hero.url} target="_blank" rel="noreferrer" className="mono-link">
                  Read source <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          )}

          <div className="page-grid" style={{ paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}>
            <ol className="press-list">
              {rest.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="press-row" data-rise>
                    <div className="press-source">
                      <span className="meta category">{item.category}</span>
                      <span className="meta">
                        {item.source}
                        <br />
                        {item.date}
                      </span>
                    </div>
                    <div>
                      <h3>
                        <Copy text={item.title} />
                      </h3>
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
            <p className="press-note meta">
              Ordered by outlet prominence: national, then regional and institutional, then niche.
            </p>
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
