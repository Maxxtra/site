import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Download } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { siteConfig } from '@/lib/site-config';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Costin-Alexandru Deonise — background, education, and contact details, with a downloadable CV.',
};

const links = [
  { label: 'Email', href: `mailto:${siteConfig.email}` },
  { label: 'GitHub', href: siteConfig.github },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'Google Scholar', href: siteConfig.scholar },
  { label: 'AlgoTrack', href: siteConfig.algotrack },
];

export default function AboutPage() {
  const portrait = getPhoto('costin-portrait');
  const graduation = getPhoto('graduation-diploma');

  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-start">
          <div>
            <p data-toc data-toc-depth="1" data-toc-title="About" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
              About
            </p>
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-black uppercase leading-[0.95] tracking-normal">
              Costin-Alexandru
              <br />
              Deonise
            </h1>
            {portrait && (
              <div className="mt-8 aspect-square w-full max-w-xs overflow-hidden border border-border">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            )}
          </div>

          <div className="space-y-6 text-base leading-8 text-foreground/85 md:text-lg">
            <p>
              I&rsquo;m Chief Technology Officer at Qflex Technologies, where I lead the technical strategy and
              delivery of custom AI systems for enterprise clients. I&rsquo;m also a Parallel and Distributed
              Computer Systems Master&rsquo;s student and Associate Lecturer at the University POLITEHNICA of
              Bucharest, where I&rsquo;ve taught 1000+ students since 2022.
            </p>
            <p>
              My research spans scalable automatic differentiation, privacy-preserving machine learning, and LLM
              systems for structured language understanding — work built across roles at the Advanced Technology
              Institute and Bitdefender, and published across six peer-reviewed papers. In 2025 I attended the
              Oxford Machine Learning School at the University of Oxford.
            </p>

            {graduation && (
              <figure className="!my-10 -mx-6 md:-mx-0">
                <div className="aspect-[3/2] w-full overflow-hidden border border-border">
                  <Image
                    src={graduation.src}
                    alt={graduation.alt}
                    width={1600}
                    height={1067}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {graduation.caption}
                </figcaption>
              </figure>
            )}

            <p>
              In 2026 I served as national team coach for Romania&rsquo;s delegation to the International
              Olympiad in Artificial Intelligence, which placed 4th worldwide with 8/8 medals — the country&rsquo;s
              best result in the competition&rsquo;s history. I also mentor Team AlphaZ, a rookie FIRST Robotics
              Competition team that became the first Romanian team to win an award at a FIRST World Championship
              event.
            </p>
            <p>
              I grew up in Pitești, Argeș county, graduating Colegiul Național &ldquo;Ion C. Brătianu&rdquo; in
              2020. As a high-school student I was president of the County Council of Students of Argeș and an
              active member of the European Youth Parliament Romania, before studying Computer Science at
              POLITEHNICA Bucharest.
            </p>
          </div>
        </div>

        <div data-toc data-toc-depth="2" data-toc-title="CV &amp; contact" className="mt-16 border-t border-dashed border-border pt-10">
          <h2 className="text-2xl font-black uppercase tracking-normal">CV &amp; contact</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/Costin-Alexandru-Deonise-CV.pdf"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
