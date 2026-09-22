import type { Metadata } from 'next';
import { EditorialMotion } from '@/components/editorial/motion';
import { Plate } from '@/components/editorial/plate';
import { Copy } from '@/components/editorial/copy';
import { siteConfig } from '@/lib/site-config';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  alternates: { canonical: '/about/' },
  title: 'About',
  description:
    'About Costin-Alexandru Deonise: background, education, and contact details, with a downloadable CV.',
};

const contacts = [
  { label: 'Download CV', href: '/Costin-Alexandru-Deonise-CV.pdf', note: 'PDF' },
  { label: 'Email', href: `mailto:${siteConfig.email}`, note: siteConfig.email },
  { label: 'Google Scholar', href: siteConfig.scholar, note: 'Publications' },
  { label: 'GitHub', href: siteConfig.github, note: 'Maxxtra' },
  { label: 'LinkedIn', href: siteConfig.linkedin, note: 'Profile' },
  { label: 'AlgoTrack', href: siteConfig.algotrack, note: 'algotrack.deonise.ro' },
];

/*
 * Composition: an image head. The graded cutout from the homepage stands on
 * the paper ground in front of the Capri print, the two overlapping like a
 * portrait and a snapshot on a desk; the name and positioning sit beside
 * them. The biography opens with one large didone paragraph and continues as
 * running text. The graduation photograph bleeds right; contact closes.
 */
export default function AboutPage() {
  const portrait = getPhoto('costin-portrait');
  const capri = getPhoto('costin-capri');
  const graduation = getPhoto('graduation-diploma');

  return (
    <main className="editorial page about">
      <EditorialMotion>
        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>

          <header className="page-head page-head--image about-head">
            <p className="eyebrow">About</p>
            <h1 className="display" data-rise>
              Costin-Alexandru <em>Deonise</em>
            </h1>
            <p className="page-lede" data-rise>
              Doctoral Researcher at POLITEHNICA Bucharest, CTO at Qflex Technologies, and Deputy Leader and National
              Team Coach of Romania&rsquo;s AI Olympiad delegation.
            </p>

            <div className="about-prints">
              {portrait && (
                <figure className="about-cutout">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export; the graded cutout from the homepage hero */}
                  <img
                    src={portrait.cutoutSrc ?? portrait.src}
                    alt={portrait.alt}
                    width={portrait.width}
                    height={portrait.height}
                    fetchPriority="high"
                    decoding="async"
                  />
                </figure>
              )}
              <Plate photo={capri} className="about-print" drift={5} sizes="(min-width: 768px) 24vw, 46vw" />
            </div>
          </header>

          <div className="page-grid about-bio">
            <p className="about-bio-lead" data-rise>
              I&rsquo;m Costin-Alexandru Deonise, usually just Alex Deonise in day-to-day work. I&rsquo;m Chief
              Technology Officer at Qflex Technologies, where I lead the technical strategy and delivery of custom AI
              systems for enterprise clients.
            </p>
            <div className="about-bio-text">
              <p data-rise>
                I&rsquo;m also an Associate Lecturer at the University POLITEHNICA of Bucharest, where I&rsquo;ve led
                labs and seminars for 1000+ students since 2022. After my Master&rsquo;s in Parallel and Distributed
                Computer Systems (2024&ndash;2026), I was admitted to the doctoral program there with a scholarship and a
                10/10 admission average.
              </p>
              <p data-rise>
                <Copy text="My research spans scalable automatic differentiation, privacy-preserving machine learning, and LLM systems for structured language understanding. That work spans roles at the Research Institute and Bitdefender, and is published across six papers. In 2025 I attended the Oxford Machine Learning School at the University of Oxford." />
              </p>
              <p data-rise>
                In 2026 I served as Deputy Leader and National Team Coach for Romania&rsquo;s delegation to the
                International Olympiad in Artificial Intelligence, which placed 4th worldwide with 8/8 medals, the
                country&rsquo;s best result in the competition&rsquo;s history. I also mentor Team AlphaZ, a rookie FIRST
                Robotics Competition team that became the first Romanian team to win an award at a FIRST World
                Championship event.
              </p>
              <p data-rise>
                I grew up in Pitești, Argeș county, graduating Colegiul Național &ldquo;Ion C. Brătianu&rdquo; in 2020.
                As a high-school student I was president of the County Council of Students of Argeș and an active member
                of the European Youth Parliament Romania, before studying Computer Science at POLITEHNICA Bucharest.
              </p>
            </div>

            <Plate photo={graduation} className="about-figure" drift={4} sizes="(min-width: 768px) 84vw, 100vw" />
          </div>
        </section>

        <section className="page-section contact" data-nav-theme="light" aria-labelledby="contact-heading">
          <div className="lines" aria-hidden="true">
            <div className="contours" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <div className="page-grid">
            <h2 id="contact-heading" className="display" data-rise>
              CV &amp; <em>contact</em>
            </h2>
            <ul className="contact-list">
              {contacts.map((c) => (
                <li key={c.label} data-rise>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {c.label}{' '}
                    <span>{c.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
