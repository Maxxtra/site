import type { Metadata } from 'next';
import Link from 'next/link';
import { EditorialMotion } from '@/components/editorial/motion';
import { Plate } from '@/components/editorial/plate';
import { Copy, Lines, pad, splitTitle } from '@/components/editorial/copy';
import { Lattice } from '@/components/home/lattice';
import { siteConfig } from '@/lib/site-config';
import { publications } from '@/lib/publications';
import {
  featuredAwards,
  scssPlacements,
  internationalPrograms,
  competitionResults,
  roboticsAwards,
} from '@/lib/awards';
import { researchDirections } from '@/lib/research';
import { experience } from '@/lib/experience';
import { teaching } from '@/lib/teaching';
import { projects } from '@/lib/projects';
import { mediaItems } from '@/lib/media';
import { getPhoto } from '@/lib/photos';
import './home.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const highlights = [
  { title: 'Chief Technology Officer', description: 'Leading AI system delivery for enterprise clients at Qflex Technologies.' },
  { title: 'Doctoral Researcher', description: 'Parallel & Distributed Computer Systems, POLITEHNICA Bucharest.' },
  { title: 'Deputy Leader & Coach, IOAI', description: "Led Romania's AI Olympiad delegation to a 4th-place worldwide finish in 2026." },
  { title: '6 Publications', description: 'On scalable differentiation, privacy-preserving ML, and LLM systems.' },
  { title: 'Associate Lecturer', description: 'Labs and seminars for 1000+ students at POLITEHNICA Bucharest since 2022.' },
  { title: 'Robotics Mentor', description: 'Lead mentor for AlphaZ FRC #11141, a FIRST World Championship award winner.' },
];

const principles = [
  { title: 'Rigor before scale', body: 'Correctness and reproducibility come first. Scaling a wrong result just gets there faster.' },
  { title: 'Publish, then apply', body: 'Research earns its keep when it ships: from PDE solvers to production RAG pipelines.' },
  { title: 'Explain clearly', body: 'A concept isn’t understood until it survives labs and seminars with 1000+ students.' },
];

const awardCount =
  featuredAwards.length + scssPlacements.length + internationalPrograms.length + competitionResults.length + roboticsAwards.length;

const index = [
  { href: '/research', label: 'Research', count: researchDirections.length, description: 'Scalable differentiation, privacy-preserving ML, and LLM systems.' },
  { href: '/publications', label: 'Publications', count: publications.length, description: 'Six papers across journals, conferences, and a student scientific session.' },
  { href: '/experience', label: 'Experience', count: experience.length, description: 'From a software engineering internship to Chief Technology Officer.' },
  { href: '/teaching', label: 'Teaching', count: teaching.length, description: "Lecturing at POLITEHNICA and coaching Team Romania's AI Olympiad squad." },
  { href: '/projects', label: 'Projects', count: projects.length, description: 'AlgoTrack, AtlasRAG, distributed STDE, and AlphaZ robotics.' },
  { href: '/awards', label: 'Awards', count: awardCount, description: 'Scholarships, paper awards, and competition results.' },
  { href: '/media', label: 'Media', count: mediaItems.length, description: 'Independent press coverage and public activity.' },
  { href: '/about', label: 'About', description: 'Background, education, and contact details, with a downloadable CV.' },
];

export default function Home() {
  const portrait = getPhoto('costin-portrait');
  const featured = publications.filter((p) => p.highlight);
  const latest = [...publications].sort((a, b) => b.year - a.year)[0];
  const current = experience.filter((e) => e.end === 'Present');

  return (
    <main className="editorial home">
      <EditorialMotion>
        {/* ------------------------------------------------------------ HERO */}
        <section className="hero" data-hero data-nav-theme="light" aria-label="Introduction">
          <div className="hero-stage">
            <div className="contours hero-contours" aria-hidden="true" />

            {/* The heading's text content reads as the one canonical string
                "Costin-Alexandru Deonise"; the split is purely visual. */}
            <h1 className="hero-name">
              <span className="hero-name-first">Costin-Alexandru</span>{' '}
              <span className="hero-name-last">Deonise</span>
            </h1>

            {portrait && (
              // eslint-disable-next-line @next/next/no-img-element -- LCP element: must be a plain, immediately-decodable img
              <img
                id="hero-portrait"
                className="hero-portrait"
                src={portrait.cutoutSrc ?? portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                fetchPriority="high"
                decoding="async"
              />
            )}

            <Lattice
              className="hero-lattice"
              portraitSelector="#hero-portrait"
              matteSrc={portrait?.cutoutSrc ?? ''}
              progressSelector="[data-hero]"
            />

            <p className="module module--tagline">
              <span className="module-key">AI &amp; Distributed Systems</span>{' '}
              Researcher / Engineer
            </p>

            <div className="module module--current">
              <span className="module-key">
                <i>01</i> Current
              </span>
              <p>
                Doctoral Researcher{' '}
                <br />
                <span className="module-dim">POLITEHNICA Bucharest</span>
              </p>
              {current.map((role) => (
                <p key={role.slug}>
                  {role.role.split(',')[0]}{' '}
                  <br />
                  <span className="module-dim">{role.org}</span>
                </p>
              ))}
            </div>

            <div className="module module--ioai">
              <span className="module-key">
                <i>02</i> IOAI 2026
              </span>
              <p className="module-figure">
                {/* The space sits inside the superscript: at its small size it is
                    the same width as the old margin, so the figure looks
                    identical and copies as "4th worldwide". */}
                4<sup>th </sup>
                <span className="module-figure-label">worldwide</span>
              </p>
              <p>
                8/8 medals, Astana{' '}
                <br />
                <span className="module-dim">Deputy Leader &amp; National Team Coach</span>
              </p>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------- STATEMENT */}
        <section className="statement" data-nav-theme="dark">
          <div className="lines" aria-hidden="true">
            <div className="contours statement-contours" />
          </div>
          {/* Decorative: the same words are the real <h2> of the Trajectory section. */}
          <div className="marquee" aria-hidden="true">
            <span className="marquee-row marquee-row--serif" data-marquee="-1">
              Researcher, engineer, Researcher, engineer, Researcher, engineer, Researcher, engineer,
            </span>
            <span className="marquee-row" data-marquee="1">
              teacher, coach. teacher, coach. teacher, coach. teacher, coach. teacher, coach.
            </span>
            {/* Narrow screens: the whole phrase, set as a block. A scrubbed
                marquee only ever shows a word and a half at 390px. */}
            <p className="marquee-stack">
              <span className="marquee-stack-serif">Researcher,</span>
              <span>engineer,</span>
              <span className="marquee-stack-serif">teacher,</span>
              <span>coach.</span>
            </p>
          </div>

          <div className="statement-body">
            <h2 className="eyebrow" data-rise>
              Positioning
            </h2>
            <p className="statement-lede" data-rise>
              <Copy text={siteConfig.positioning} />
            </p>

            <aside className="statement-notes" aria-label="Research directions and latest publication">
              <div className="note" data-rise>
                <span className="module-key">Research</span>
                <ul>
                  {researchDirections.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/research#${d.slug}`}>{d.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={`/publications#${latest.slug}`} className="note note--latest" data-rise>
                <span className="module-key">Latest</span>{' '}
                <span className="module-title">{latest.title}</span>{' '}
                <span className="module-dim">
                  {latest.venue}{' '}
                  <br />
                  {latest.date ?? latest.year} ↗
                </span>
              </Link>
            </aside>

            <dl className="ledger">
              {highlights.map((item, i) => (
                <div key={item.title} className="ledger-row" data-rise>
                  <span className="ledger-index">{pad(i + 1)}</span>
                  <dt>{item.title}</dt>
                  <dd>
                    <Copy text={item.description} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------- SELECTED WORK */}
        <section className="work" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours work-contours" />
          </div>
          <header className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2 className="display" data-rise>
              Recent, <em>high-signal</em> results
            </h2>
          </header>

          <ol className="work-list">
            {featured.map((pub, i) => (
              <li key={pub.slug} data-rise>
                <Link href={`/publications#${pub.slug}`} className="work-row">
                  <span className="work-index">{pad(i + 1)}</span>{' '}
                  <div className="work-title">
                    {pub.awards && pub.awards.length > 0 && (
                      <p className="work-awards">
                        <Lines parts={pub.awards} />
                      </p>
                    )}
                    <h3>
                      <Copy text={pub.title} />
                    </h3>
                  </div>
                  {' '}
                  <span className="work-venue">
                    {pub.venue}, {pub.date ?? pub.year}
                  </span>
                  <span className="work-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <ul className="honours" aria-label="Featured awards">
            {featuredAwards.slice(0, 4).map((award) => (
              <li key={award.title} data-rise>
                <span className="honours-year">{award.year}</span>{' '}
                {/* "Title · Qualifier" in the data becomes two lines here. */}
                <Lines parts={splitTitle(award.title)} restClassName="honours-qualifier" />
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ TRAJECTORY */}
        <section className="trajectory" data-nav-theme="dark">
          <div className="lines" aria-hidden="true">
            <div className="contours trajectory-contours" />
          </div>
          <header className="section-head">
            <p className="eyebrow">Trajectory</p>
            <h2 className="display" data-rise>
              Researcher, engineer, <em>teacher, coach.</em>
            </h2>
          </header>

          <article className="chapter chapter--research">
            <p className="chapter-key">01 / Research</p>
            <h3 className="chapter-title" data-rise>
              Systems <em>that</em> scale
            </h3>
            <p className="chapter-text" data-rise>
              <Copy text="From distributed high-order differentiation on multi-GPU clusters to privacy-preserving inference: published research, not slideware." />
            </p>
            <Plate photo={getPhoto('conference-session')} className="plate--a" drift={6} sizes="(min-width: 900px) 34vw, 80vw" />
          </article>

          <article className="chapter chapter--engineering">
            <p className="chapter-key">02 / Engineering</p>
            <h3 className="chapter-title" data-rise>
              Production <em>AI</em> systems
            </h3>
            <div className="chapter-columns">
              <p data-rise>CTO at Qflex Technologies, leading AI system architecture and delivery for enterprise clients.</p>
              <p data-rise>
                <Copy text="Built production RAG, knowledge-graph extraction, and speech pipelines at the Research Institute and Bitdefender." />
              </p>
              <p data-rise>Built AlgoTrack end to end, a tutoring platform deployed and actively used in production.</p>
            </div>
          </article>

          <article className="chapter chapter--teaching">
            <p className="chapter-key">03 / Teaching</p>
            <h3 className="chapter-title" data-rise>
              Labs for 1000+ <em>students</em>
            </h3>
            <p className="chapter-text" data-rise>
              Associate Lecturer at POLITEHNICA Bucharest since 2022, across programming, parallel algorithms, and
              numerical methods.
            </p>
            <Plate photo={getPhoto('onia-national-camp-timisoara-1')} className="plate--b" drift={9} sizes="(min-width: 900px) 30vw, 70vw" />
            <Plate photo={getPhoto('graduation-diploma')} className="plate--c" drift={4} sizes="(min-width: 900px) 22vw, 56vw" />
          </article>

          <article className="chapter chapter--olympiad">
            <p className="chapter-key">04 / Olympiad Coaching</p>
            <h3 className="chapter-title" data-rise>
              Team <em>Romania</em> 4th worldwide
            </h3>
            <Plate photo={getPhoto('ioai-astana-2026-team')} className="plate--wide" drift={3} sizes="(min-width: 900px) 72vw, 100vw" />
          </article>
        </section>

        {/* ------------------------------------------------------ PRINCIPLES */}
        <section className="principles" data-nav-theme="light">
          <header className="section-head">
            <p className="eyebrow">How I work</p>
            <h2 className="display" data-rise>
              Three things I <em>don&rsquo;t</em> compromise on.
            </h2>
          </header>
          <div className="principles-list">
            {principles.map((principle, i) => (
              <article key={principle.title} data-rise>
                <span className="ledger-index">{pad(i + 1)}</span>
                <h3>{principle.title}</h3>
                <p>
                  <Copy text={principle.body} />
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- INDEX */}
        <nav className="index" data-nav-theme="light" aria-labelledby="index-heading">
          <div className="lines" aria-hidden="true">
            <div className="contours index-contours" />
          </div>
          <header className="section-head">
            <p className="eyebrow">Site structure</p>
            <h2 id="index-heading" className="sr-only">
              Explore
            </h2>
          </header>
          <ul className="index-list">
            {index.map((page, i) => (
              <li key={page.href}>
                <Link href={page.href} className="index-row">
                  <span className="index-number">{pad(i + 1)}</span>{' '}
                  <span className={i % 2 ? 'index-label index-label--serif' : 'index-label'}>{page.label}</span>{' '}
                  <span className="index-meta">
                    <span className="index-desc">
                      <Copy text={page.description} />
                    </span>{' '}
                    {page.count !== undefined && <span className="index-count">{pad(page.count)}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </EditorialMotion>
    </main>
  );
}
