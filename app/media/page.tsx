import type { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { StorySlides, StorySlide } from '@/components/ui/story-slides';
import { mediaItems } from '@/lib/media';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  alternates: { canonical: '/media/' },
  title: 'Media & Public Activity',
  description:
    "Press coverage and public activity involving Costin-Alexandru Deonise: Romania's 2026 International Olympiad in AI delegation, the AlphaZ FIRST Robotics team, and earlier student leadership in Argeș county.",
};

export default function MediaPage() {
  const hero = mediaItems.find((m) => m.hero);
  const rest = mediaItems.filter((m) => !m.hero);
  const heroPhoto = hero?.photoId ? getPhoto(hero.photoId) : undefined;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <DynamicIslandTOC selector="[data-toc]" />
      <StorySlides>
        <StorySlide index={0} className="px-6 md:px-10 lg:px-16">
        <p data-reveal data-toc data-toc-depth="1" data-toc-title="Media &amp; Public Activity" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Media &amp; Public Activity
        </p>
        <h1 data-reveal className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          Independent coverage, from a county student council to Team Romania.
        </h1>
        <p data-reveal className="mt-6 max-w-2xl leading-8 text-muted-foreground">
          Every entry here is corroborated by an independently published source: national and local Romanian
          press, official competition results, or a publisher record. None of it is self-reported. The rest
          run in descending order of press-outlet prominence.
        </p>

        </StorySlide>

        <StorySlide index={1} className="px-6 md:px-10 lg:px-16">
        {hero && (
          <a
            href={hero.url}
            target="_blank"
            rel="noreferrer"
            data-reveal
            data-toc
            data-toc-depth="2"
            data-toc-title="Featured"
            className="group grid gap-0 overflow-hidden border border-border bg-card text-card-foreground transition-colors hover:border-primary md:grid-cols-2"
          >
            {heroPhoto && (
              <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto">
                <Image src={heroPhoto.src} alt={heroPhoto.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            )}
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                {hero.source} · {hero.date}
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-normal md:text-3xl">
                {hero.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-foreground/75">{hero.blurb}</p>
              <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground/60 group-hover:text-primary">
                Read source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </a>
        )}

        </StorySlide>

        <StorySlide index={2} className="px-6 md:px-10 lg:px-16">
        <div data-toc data-toc-depth="2" data-toc-title="More coverage">
          <div className="divide-y divide-dashed divide-border border-y border-dashed border-border">
            {rest.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-2 py-5 transition-colors hover:bg-accent/40 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary">{item.category}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-foreground/90 group-hover:text-primary">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.blurb}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  {item.source} · {item.date}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
        </StorySlide>
      </StorySlides>
    </main>
  );
}
