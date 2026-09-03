import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { researchDirections } from '@/lib/research';
import { publications } from '@/lib/publications';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research directions pursued by Costin-Alexandru Deonise: scalable high-order automatic differentiation, privacy-preserving machine learning, and LLM systems for structured language understanding.',
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <div className="mx-auto max-w-5xl">
        <p data-toc data-toc-depth="1" data-toc-title="Research" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Research
        </p>
        <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          Scalable differentiation, private inference, and structured language.
        </h1>
        <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
          Parallel and Distributed Computer Systems research at POLITEHNICA Bucharest, applied AI engineering at
          the Advanced Technology Institute, and production ML at Bitdefender — four directions, spanning
          published results and ongoing work.
        </p>

        <div className="mt-16 space-y-20">
          {researchDirections.map((dir) => {
            const related = dir.relatedPublications
              .map((slug) => publications.find((p) => p.slug === slug))
              .filter(Boolean);

            return (
              <article
                key={dir.slug}
                id={dir.slug}
                data-toc
                data-toc-depth="2"
                data-toc-title={dir.title}
                className="border-t border-dashed border-border pt-10"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={
                      dir.status === 'published'
                        ? 'border border-primary/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary'
                        : 'border border-border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground'
                    }
                  >
                    {dir.status === 'published' ? 'Published' : 'Ongoing'}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {dir.period}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-normal md:text-4xl">
                  {dir.title}
                </h2>

                <div className="mt-8 grid gap-8 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Problem</p>
                    <p className="mt-2 text-sm leading-7 text-foreground/80">{dir.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Approach</p>
                    <p className="mt-2 text-sm leading-7 text-foreground/80">{dir.approach}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Result</p>
                    <p className="mt-2 text-sm leading-7 text-foreground/80">{dir.result}</p>
                  </div>
                </div>

                {related.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {related.map(
                      (pub) =>
                        pub && (
                          <a
                            key={pub.slug}
                            href={`/publications#${pub.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:text-primary"
                          >
                            {pub.venue} ({pub.year})
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        ),
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
