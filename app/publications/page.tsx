import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { publications } from '@/lib/publications';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Peer-reviewed publications by Costin-Alexandru Deonise on scalable automatic differentiation, privacy-preserving machine learning, LLM systems, and speech processing.',
};

const sorted = [...publications].sort((a, b) => b.year - a.year);

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <ScrollReveal className="mx-auto max-w-5xl">
        <p data-toc data-toc-depth="1" data-toc-title="Publications" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Publications
        </p>
        <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          Peer-reviewed work on differentiation, privacy, and language systems.
        </h1>
        <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
          Six publications spanning scalable automatic differentiation, privacy-preserving machine learning,
          LLM-based language systems, and speech processing, listed newest first.
        </p>

        <ol className="mt-16 divide-y divide-dashed divide-border border-y border-dashed border-border">
          {sorted.map((pub) => (
            <li key={pub.slug} id={pub.slug} data-reveal className="py-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="flex-1">
                  {pub.awards && pub.awards.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {pub.awards.map((award) => (
                        <span
                          key={award}
                          className="border border-primary/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-xl font-bold leading-snug md:text-2xl">{pub.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pub.authors.join(', ')}</p>
                  <p className="mt-1 text-sm font-medium italic text-foreground/80">
                    {pub.venue}
                    {pub.date ? `, ${pub.date}` : `, ${pub.year}`}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 md:items-end">
                  {pub.doiUrl && (
                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:text-primary"
                    >
                      View paper <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {pub.mirrorUrl && (
                    <a
                      href={pub.mirrorUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
                    >
                      Mirror <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </main>
  );
}
