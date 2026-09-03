import type { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { mediaItems, type MediaItem } from '@/lib/media';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  title: 'Media & Public Activity',
  description:
    "Press coverage and public activity involving Costin-Alexandru Deonise: Romania's 2026 International Olympiad in AI delegation, the AlphaZ FIRST Robotics team, and earlier student leadership in Argeș county.",
};

const categoryOrder: MediaItem['category'][] = [
  'Olympiads & Education',
  'Leadership & Community',
  'Media',
  'Research & Academia',
  'Earlier Years',
];

export default function MediaPage() {
  const featured = mediaItems.filter((m) => m.featured);
  const byCategory = categoryOrder
    .map((category) => ({ category, items: mediaItems.filter((m) => m.category === category) }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <div className="mx-auto max-w-5xl">
        <p data-toc data-toc-depth="1" data-toc-title="Media &amp; Public Activity" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Media &amp; Public Activity
        </p>
        <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          Independent coverage, from a county student council to Team Romania.
        </h1>
        <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
          Every entry here is corroborated by an independently published source — national and local Romanian
          press, official competition results, or a publisher record — not self-reported.
        </p>

        {featured.length > 0 && (
          <div data-toc data-toc-depth="2" data-toc-title="Featured" className="mt-16 grid gap-4 sm:grid-cols-2">
            {featured.map((item) => (
              <MediaCard key={item.url} item={item} />
            ))}
          </div>
        )}

        {byCategory.map(({ category, items }) => (
          <div key={category} data-toc data-toc-depth="2" data-toc-title={category} className="mt-16">
            <h2 className="text-2xl font-black uppercase tracking-normal">{category}</h2>
            <div className="mt-4 divide-y divide-dashed divide-border border-y border-dashed border-border">
              {items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-2 py-5 transition-colors hover:bg-accent/40 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                >
                  <div>
                    <p className="text-sm font-semibold leading-6 text-foreground/90 group-hover:text-primary">
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
        ))}
      </div>
    </main>
  );
}

function MediaCard({ item }: { item: MediaItem }) {
  const photo = item.photoId ? getPhoto(item.photoId) : undefined;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col border border-border bg-card text-card-foreground transition-colors hover:border-primary"
    >
      {photo && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
          <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
        </div>
      )}
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          {item.source} · {item.date}
        </p>
        <h3 className="mt-3 text-lg font-black uppercase leading-tight tracking-normal">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-foreground/75">{item.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground/60 group-hover:text-primary">
          Read source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
