import type { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { teaching } from '@/lib/teaching';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  title: 'Teaching & Olympiads',
  description:
    "Costin-Alexandru Deonise's teaching and mentorship work: Associate Lecturer at POLITEHNICA Bucharest, national coach for Romania's IOAI delegation, and Olympiad committee service.",
};

const highlighted = teaching.filter((t) => t.highlight);
const committees = teaching.filter((t) => !t.highlight);
const heroPhoto = getPhoto('ioai-astana-2026-team');

export default function TeachingPage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <div className="mx-auto max-w-5xl">
        <p data-toc data-toc-depth="1" data-toc-title="Teaching & Olympiads" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Teaching &amp; Olympiads
        </p>
        <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          Education, mentorship, and technical leadership.
        </h1>
        <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
          1000+ students taught at POLITEHNICA Bucharest, and national-level mentorship through Romania&rsquo;s
          AI Olympiad program, from coaching the IOAI delegation to designing competition tasks.
        </p>

        {heroPhoto && (
          <figure className="relative -mx-6 mt-12 aspect-[16/9] overflow-hidden md:-mx-10 lg:-mx-16">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <figcaption className="absolute bottom-0 left-0 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
              {heroPhoto.caption}
            </figcaption>
          </figure>
        )}

        <div data-toc data-toc-depth="2" data-toc-title="Roles" className="mt-16 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {highlighted
              .filter((role) => role.photoId)
              .map((role) => {
                const photo = getPhoto(role.photoId!);
                return (
                  <article key={role.slug} className="flex flex-col border border-border bg-card text-card-foreground">
                    {photo && (
                      <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-border">
                        <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{role.period}</p>
                      <h2 className="mt-3 text-xl font-black uppercase leading-tight tracking-normal">{role.role}</h2>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">{role.org}</p>
                      <p className="mt-4 text-sm leading-7 text-foreground/80">{role.description}</p>
                      {role.certificateImage && (
                        <a
                          href={role.certificateImage}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary hover:underline"
                        >
                          View certificate
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlighted
              .filter((role) => !role.photoId)
              .map((role) => (
                <article key={role.slug} className="border border-border bg-card p-6 text-card-foreground">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{role.period}</p>
                  <h2 className="mt-3 text-xl font-black uppercase leading-tight tracking-normal">{role.role}</h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{role.org}</p>
                  <p className="mt-4 text-sm leading-7 text-foreground/80">{role.description}</p>
                </article>
              ))}
          </div>
        </div>

        <div
          data-toc
          data-toc-depth="2"
          data-toc-title="Committee &amp; review service"
          className="mt-16"
        >
          <h2 className="text-2xl font-black uppercase tracking-normal">Committee &amp; review service</h2>
          <div className="mt-6 divide-y divide-dashed divide-border border-y border-dashed border-border">
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
      </div>
    </main>
  );
}
