import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { projects } from '@/lib/projects';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects by Costin-Alexandru Deonise: AlgoTrack, AtlasRAG, a multi-GPU JAX implementation of STDE, AlphaZ FRC robotics, and anti-money-laundering detection.',
};

function ProjectBody({ project }: { project: (typeof projects)[number] }) {
  const secondaryPhotos = (project.secondaryPhotoIds ?? []).map(getPhoto).filter(Boolean);

  return (
    <div className="flex flex-1 flex-col p-6 lg:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{project.period}</p>
      <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-normal">{project.title}</h2>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{project.summary}</p>

      <ul className="mt-5 space-y-2.5">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-6 text-foreground/70">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>

      {secondaryPhotos.length > 0 && (
        <div className="mt-5 flex gap-3 overflow-x-auto">
          {secondaryPhotos.map(
            (photo) =>
              photo && (
                <figure key={photo.id} className="w-40 shrink-0">
                  <div className="relative aspect-[3/2] overflow-hidden border border-border">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="160px" />
                  </div>
                  <figcaption className="mt-1.5 text-[10px] uppercase leading-tight tracking-[0.08em] text-muted-foreground">
                    {photo.caption}
                  </figcaption>
                </figure>
              ),
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="border border-border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      {project.links && project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4 border-t border-dashed border-border pt-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:text-primary"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <ScrollReveal className="mx-auto max-w-5xl">
        <p data-toc data-toc-depth="1" data-toc-title="Projects" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Projects
        </p>
        <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          Selected builds, from production platforms to competition robots.
        </h1>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const photo = project.photoId ? getPhoto(project.photoId) : undefined;

            if (photo) {
              return (
                <article
                  key={project.slug}
                  id={project.slug}
                  data-reveal
                  className="grid border border-border bg-card text-card-foreground sm:grid-cols-[0.85fr_1.15fr] md:col-span-2"
                >
                  <div className="relative min-h-[280px]">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(min-width: 640px) 40vw, 100vw" />
                  </div>
                  <ProjectBody project={project} />
                </article>
              );
            }

            return (
              <article
                key={project.slug}
                id={project.slug}
                data-reveal
                className="flex flex-col border border-border bg-card text-card-foreground"
              >
                <ProjectBody project={project} />
              </article>
            );
          })}
        </div>
      </ScrollReveal>
    </main>
  );
}
