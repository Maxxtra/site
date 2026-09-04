import type { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { StorySlides, StorySlide } from '@/components/ui/story-slides';
import { teaching } from '@/lib/teaching';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  title: 'Teaching & Olympiads',
  description:
    "Costin-Alexandru Deonise's teaching and mentorship work: Associate Lecturer at POLITEHNICA Bucharest, Deputy Leader and National Team Coach for Romania's IOAI delegation, and Olympiad committee service.",
};

const highlighted = teaching.filter((t) => t.highlight);
const committees = teaching.filter((t) => !t.highlight);
const heroPhoto = getPhoto('ioai-astana-2026-team');

export default function TeachingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DynamicIslandTOC selector="[data-toc]" />
      <StorySlides>
        {/* Intro */}
        <StorySlide index={0} className="px-6 md:px-10 lg:px-16">
          <p
            data-toc
            data-toc-depth="1"
            data-toc-title="Teaching & Olympiads"
            className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary"
          >
            Teaching &amp; Olympiads
          </p>
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
            Education, mentorship, and technical leadership.
          </h1>
          <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
            1000+ students taught at POLITEHNICA Bucharest, and national-level leadership through
            Romania&rsquo;s AI Olympiad program, from leading and coaching the IOAI delegation to designing
            competition tasks.
          </p>
        </StorySlide>

        {/* Full-bleed IOAI moment */}
        {heroPhoto && (
          <StorySlide index={1} className="story-slide--bleed">
            <figure className="relative h-[100svh] w-full">
              <Image src={heroPhoto.src} alt={heroPhoto.alt} fill className="object-cover" sizes="100vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <figcaption className="absolute bottom-10 left-0 w-full px-6 md:px-10 lg:px-16">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Team Romania</p>
                <p className="mt-2 max-w-2xl text-lg font-bold uppercase leading-tight tracking-normal text-white md:text-2xl">
                  {heroPhoto.caption}
                </p>
              </figcaption>
            </figure>
          </StorySlide>
        )}

        {/* One slide per headline role */}
        {highlighted.map((role, i) => {
          const photo = role.photoId ? getPhoto(role.photoId) : undefined;
          return (
            <StorySlide key={role.slug} id={role.slug} index={i + 2} className="px-6 md:px-10 lg:px-16">
              <article
                data-toc
                data-toc-depth="2"
                data-toc-title={role.role}
                className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]"
              >
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-sm font-bold tabular-nums text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{role.period}</p>
                  </div>
                  <h2 className="mt-4 text-2xl font-black uppercase leading-tight tracking-normal md:text-4xl">
                    {role.role}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{role.org}</p>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-foreground/80 md:text-base">
                    {role.description}
                  </p>
                  {role.certificateImage && (
                    <a
                      href={role.certificateImage}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary hover:underline"
                    >
                      View certificate
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>

                {photo && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-border">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 45vw, 100vw"
                    />
                  </div>
                )}
              </article>
            </StorySlide>
          );
        })}

        {/* Committee service stays a single dense slide, not one per line item */}
        <StorySlide index={highlighted.length + 2} className="px-6 md:px-10 lg:px-16">
          <div data-toc data-toc-depth="2" data-toc-title="Committee &amp; review service">
            <h2 className="text-2xl font-black uppercase tracking-normal md:text-4xl">
              Committee &amp; review service
            </h2>
            <div className="mt-8 divide-y divide-dashed divide-border border-y border-dashed border-border">
              {committees.map((role) => (
                <div key={role.slug} className="grid gap-2 py-5 sm:grid-cols-[1fr_2fr] sm:gap-6">
                  <div>
                    <p className="text-sm font-bold">{role.role}</p>
                    <p className="text-xs text-muted-foreground">{role.org}</p>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm leading-6 text-foreground/75">{role.description}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {role.certificateImage && (
                          <a
                            href={role.certificateImage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary hover:underline"
                          >
                            View certificate
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        )}
                        {role.links?.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-foreground/70 hover:text-primary hover:underline"
                          >
                            {link.label}
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      {role.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StorySlide>
      </StorySlides>
    </main>
  );
}
