import type { Metadata } from 'next';
import { EditorialMotion } from '@/components/editorial/motion';
import { Plate } from '@/components/editorial/plate';
import { VideoPlate } from '@/components/editorial/video-plate';
import { Copy, pad } from '@/components/editorial/copy';
import {
  featuredAwards,
  scssPlacements,
  internationalPrograms,
  competitionResults,
  roboticsAwards,
  type Award,
} from '@/lib/awards';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  alternates: { canonical: '/awards/' },
  title: 'Awards',
  description:
    'Scholarships, research paper awards, and competition results for Costin-Alexandru Deonise, including the Adobe Systems Romania Scholarship and Best Scientific Paper Award at POLITEHNICA Bucharest.',
};

const total =
  featuredAwards.length + scssPlacements.length + internationalPrograms.length + competitionResults.length + roboticsAwards.length;

/** "Title · Qualifier" in the data renders as title plus a lighter qualifier. */
function Split({ title }: { title: string }) {
  const [main, ...rest] = title.split(' · ');
  return (
    <>
      <Copy text={main} />
      {rest.length > 0 && (
        <>
          {' '}
          <span>
            <Copy text={rest.join(' · ')} />
          </span>
        </>
      )}
    </>
  );
}

function CertificateLink({ href, quiet }: { href: string; quiet?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={quiet ? 'mono-link mono-link--quiet' : 'mono-link'}>
      View certificate <span aria-hidden="true">↗</span>
    </a>
  );
}

function AwardGroup({ label, note, items, quiet }: { label: string; note?: string; items: Award[]; quiet?: boolean }) {
  return (
    <section className={`award-group${quiet ? ' award-group--quiet' : ''}`} aria-label={label}>
      <h2 className="margin-label">
        {label}
        {note && <small>{note}</small>}
      </h2>
      <ul className="award-list">
        {items.map((award) => (
          <li key={award.title + award.year}>
            <article className="award-row" data-rise>
              <div>
                <h3>
                  <Split title={award.title} />
                </h3>
                {award.org && <p className="org">{award.org}</p>}
                {award.certificateImage && (
                  <p className="links">
                    <CertificateLink href={award.certificateImage} quiet />
                  </p>
                )}
              </div>
              <p className="meta">{award.year}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

/*
 * Composition: the four featured honours open the page as full rows with the
 * year set large in didone. An ink band carries the two SCSS 2025 award
 * announcements as video plates. Then the remaining groups run as ledgers
 * with their label in the margin, ending with the earlier competition results
 * set quieter.
 */
export default function AwardsPage() {
  const impact = getPhoto('scss-2025-impact-prize');
  return (
    <main className="editorial page awards">
      <EditorialMotion>
        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <header className="page-head">
            <p className="eyebrow">Awards</p>
            <h1 className="display" data-rise>
              Scholarships, paper <em>awards,</em> and competition results.
            </h1>
            <p className="page-lede" data-rise>
              <Copy text="Two research scholarships and two paper prizes at POLITEHNICA Bucharest lead; behind them, four Student Scientific Communication Session placements, five international programs, three FIRST Robotics awards and nine earlier competition results." />
            </p>
            <p className="page-count">
              <b>{pad(total)}</b>
              entries
            </p>
          </header>

          <div className="page-grid" style={{ paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
            <ol className="featured-awards">
              {featuredAwards.map((award, i) => (
                <li key={award.title}>
                  <article className="featured-award" data-rise>
                    <span className="ledger-index">{pad(i + 1)}</span>
                    <h2>
                      <Copy text={award.title.split(' · ')[0]} />
                      {award.title.includes(' · ') && <span>{award.title.split(' · ').slice(1).join(' · ')}</span>}
                    </h2>
                    <div className="aside">
                      <p className="meta" style={{ opacity: 0.86 }}>
                        {award.org}
                      </p>
                      {award.description && (
                        <p className="prose" style={{ fontSize: '1.0625rem' }}>
                          <Copy text={award.description} />
                        </p>
                      )}
                      {award.certificateImage && <CertificateLink href={award.certificateImage} />}
                    </div>
                    <p className="year">{award.year}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="page-section page-section--ink award-band" data-nav-theme="dark" aria-labelledby="announcement">
          <div className="lines" aria-hidden="true">
            <div className="contours" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <div className="page-grid">
            <h2 id="announcement" className="display" data-rise>
              The <em>announcement,</em> on stage
            </h2>
            <p className="prose" data-rise>
              <Copy text="Footage from the on-stage announcement of the Best Scientific Paper and Most Impactful Paper awards at the POLITEHNICA Bucharest Students' Scientific Communications Session, 2025." />
            </p>
            <div className="video-pair">
              <VideoPlate
                src="/media/video/scss-2025-award-announcement-1.mp4"
                poster="/media/video/scss-2025-award-announcement-1-poster.jpg"
                width={1400}
                height={787}
                caption="Award announcement, SCSS 2025"
                detail="POLITEHNICA Bucharest"
              />
              <VideoPlate
                src="/media/video/scss-2025-award-announcement-2.mp4"
                poster="/media/video/scss-2025-award-announcement-2-poster.jpg"
                width={1400}
                height={787}
                caption="Award announcement, SCSS 2025"
                detail="POLITEHNICA Bucharest"
              />
            </div>
            {impact && (
              <Plate
                photo={impact}
                className="plate--document"
                sizes="(min-width: 768px) 30vw, 60vw"
                caption="Most Impactful Scientific Paper Award"
                detail="Engineering Domain, POLITEHNICA Bucharest, 2025"
              />
            )}
          </div>
        </section>

        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <div className="page-grid award-groups">
            <AwardGroup label="FIRST Robotics Competition" note="Team AlphaZ #11141, lead mentor" items={roboticsAwards} />
            <AwardGroup label="Student Scientific Communication Session" note="POLITEHNICA Bucharest" items={scssPlacements} />
            <AwardGroup label="Selected international programs" items={internationalPrograms} />
            <AwardGroup label="Earlier competition results" note="2017 – 2026" items={competitionResults} quiet />
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
