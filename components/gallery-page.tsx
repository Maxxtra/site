import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { Gallery4 } from '@/components/ui/gallery4';
import { GalleryPageFeatures } from '@/components/gallery-page-features';
import type { GalleryPage as GalleryPageData } from '@/lib/gallery-pages';

type GalleryPageProps = {
  page: GalleryPageData;
};

export function GalleryPage({ page }: GalleryPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DynamicIslandTOC selector="[data-toc]" />
      <section className="px-6 py-10 md:px-10 lg:px-16">
        <nav className="mb-20 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Acasa
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.52fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
              {page.eyebrow}
            </p>
            <h1
              data-toc
              data-toc-depth="1"
              data-toc-title={page.label}
              className="max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.86] tracking-normal"
            >
              {page.title}
            </h1>
          </div>
          <div className="border border-border bg-card p-6 text-card-foreground">
            <p className="text-lg leading-8 text-muted-foreground">{page.description}</p>
            <a
              href="#galerie"
              className="mt-8 inline-flex items-center gap-2 border border-primary px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Vezi galeria
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="galerie" data-toc data-toc-depth="2" data-toc-title={page.galleryTitle}>
        <Gallery4
          title={page.galleryTitle}
          description={page.galleryDescription}
          items={page.items}
        />
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16" data-toc data-toc-depth="2" data-toc-title="Etape detaliate">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {page.items.map((item, index) => (
            <article key={item.id} id={item.href.replace('#', '')} className="border-t border-border pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-4 text-2xl font-black uppercase tracking-normal">{item.title}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-toc data-toc-depth="2" data-toc-title={page.featuresTitle}>
        <GalleryPageFeatures
          eyebrow={page.featuresEyebrow}
          title={page.featuresTitle}
          features={page.features}
        />
      </section>
    </main>
  );
}
