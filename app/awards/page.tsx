import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { VideoPlayer } from '@/components/ui/video-player';
import {
  featuredAwards,
  scssPlacements,
  internationalPrograms,
  competitionResults,
  roboticsAwards,
  type Award,
} from '@/lib/awards';

export const metadata: Metadata = {
  title: 'Awards',
  description:
    'Scholarships, research paper awards, and competition results for Costin-Alexandru Deonise, including the Adobe Systems Romania Scholarship and Best Scientific Paper Award at POLITEHNICA Bucharest.',
};

function CertificateLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:text-primary"
    >
      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
      View certificate
    </a>
  );
}

function AwardRow({ award }: { award: Award }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <p className="text-sm font-semibold leading-6 text-foreground/90">{award.title}</p>
        {award.org && <p className="text-xs text-muted-foreground">{award.org}</p>}
        {award.certificateImage && <CertificateLink href={award.certificateImage} />}
      </div>
      <span className="shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
        {award.year}
      </span>
    </div>
  );
}

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <ScrollReveal className="mx-auto max-w-5xl">
        <p data-reveal data-toc data-toc-depth="1" data-toc-title="Awards" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Awards
        </p>
        <h1 data-reveal className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          Scholarships, paper awards, and competition results.
        </h1>

        <div data-reveal data-toc data-toc-depth="2" data-toc-title="Scholarships & paper awards" className="mt-16 grid gap-4 sm:grid-cols-2">
          {featuredAwards.map((award) => (
            <article key={award.title} className="border border-border bg-card p-6 text-card-foreground">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{award.year}</p>
              <h2 className="mt-2 text-lg font-black uppercase leading-tight tracking-normal">{award.title}</h2>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{award.org}</p>
              {award.description && (
                <p className="mt-3 text-sm leading-6 text-foreground/75">{award.description}</p>
              )}
              {award.certificateImage && <CertificateLink href={award.certificateImage} />}
            </article>
          ))}
        </div>

        <div data-reveal data-toc data-toc-depth="2" data-toc-title="Award announcement" className="mt-16">
          <h2 className="text-2xl font-black uppercase tracking-normal">Award announcement</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Footage from the on-stage announcement of the Best Scientific Paper and Most Impactful Paper awards
            at the POLITEHNICA Bucharest Students&rsquo; Scientific Communications Session, 2025.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <VideoPlayer
              src="/media/video/scss-2025-award-announcement-1.mp4"
              poster="/media/video/scss-2025-award-announcement-1-poster.jpg"
              caption="Award announcement, SCSS 2025, POLITEHNICA Bucharest"
            />
            <VideoPlayer
              src="/media/video/scss-2025-award-announcement-2.mp4"
              poster="/media/video/scss-2025-award-announcement-2-poster.jpg"
              caption="Award announcement, SCSS 2025, POLITEHNICA Bucharest"
            />
          </div>
        </div>

        <div data-reveal data-toc data-toc-depth="2" data-toc-title="Robotics" className="mt-16">
          <h2 className="text-2xl font-black uppercase tracking-normal">FIRST Robotics Competition</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {roboticsAwards.map((award) => (
              <article key={award.title} className="border border-border bg-card p-5 text-card-foreground">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{award.year}</p>
                <h3 className="mt-2 text-sm font-bold leading-snug">{award.title}</h3>
                {award.description && (
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{award.description}</p>
                )}
                {award.certificateImage && <CertificateLink href={award.certificateImage} />}
              </article>
            ))}
          </div>
        </div>

        <div data-reveal data-toc data-toc-depth="2" data-toc-title="Student Scientific Communication Session" className="mt-16">
          <h2 className="text-2xl font-black uppercase tracking-normal">Student Scientific Communication Session</h2>
          <div className="mt-2 divide-y divide-dashed divide-border border-y border-dashed border-border">
            {scssPlacements.map((a) => (
              <AwardRow key={a.title} award={a} />
            ))}
          </div>
        </div>

        <div data-reveal data-toc data-toc-depth="2" data-toc-title="Selected international programs" className="mt-16">
          <h2 className="text-2xl font-black uppercase tracking-normal">Selected international programs</h2>
          <div className="mt-2 divide-y divide-dashed divide-border border-y border-dashed border-border">
            {internationalPrograms.map((a) => (
              <AwardRow key={a.title} award={a} />
            ))}
          </div>
        </div>

        <details data-reveal data-toc data-toc-depth="2" data-toc-title="Earlier competition results" className="mt-16 group">
          <summary className="cursor-pointer text-2xl font-black uppercase tracking-normal transition-colors hover:text-primary">
            Earlier competition results
          </summary>
          <div className="mt-4 divide-y divide-dashed divide-border border-y border-dashed border-border">
            {competitionResults.map((a) => (
              <AwardRow key={a.title} award={a} />
            ))}
          </div>
        </details>
      </ScrollReveal>
    </main>
  );
}
