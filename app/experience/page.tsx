import type { Metadata } from 'next';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { StorySlides, StorySlide } from '@/components/ui/story-slides';
import { experience } from '@/lib/experience';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    "Costin-Alexandru Deonise's work history: Chief Technology Officer at Qflex Technologies, AI engineering at the Research Institute and Bitdefender, and teaching at POLITEHNICA Bucharest.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DynamicIslandTOC selector="[data-toc]" />
      <StorySlides>
        <StorySlide index={0} className="px-6 md:px-10 lg:px-16">
          <p
            data-toc
            data-toc-depth="1"
            data-toc-title="Experience"
            className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary"
          >
            Experience
          </p>
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
            From speech ML intern to CTO.
          </h1>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {experience.length} roles &middot; scroll
          </p>
        </StorySlide>

        {experience.map((role, i) => (
          <StorySlide key={role.slug} id={role.slug} index={i + 1} className="px-6 md:px-10 lg:px-16">
            <article data-toc data-toc-depth="2" data-toc-title={role.org}>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-sm font-bold tabular-nums text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  {role.start} &ndash; {role.end}
                </p>
              </div>

              <h2 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-tight tracking-normal md:text-5xl">
                {role.org}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                {role.role} &middot; {role.location}
              </p>

              <ul className="mt-10 max-w-3xl space-y-4 border-t border-dashed border-border pt-8">
                {role.bullets.map((bullet, b) => (
                  <li key={b} className="flex gap-3 text-sm leading-7 text-foreground/85 md:text-base">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          </StorySlide>
        ))}
      </StorySlides>
    </main>
  );
}
