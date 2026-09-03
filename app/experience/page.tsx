import type { Metadata } from 'next';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import { experience } from '@/lib/experience';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    "Costin-Alexandru Deonise's work history: Chief Technology Officer at Qflex Technologies, AI engineering at the Research Institute and Bitdefender, and teaching at POLITEHNICA Bucharest.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-36 pb-32 text-foreground md:px-10 lg:px-16">
      <DynamicIslandTOC selector="[data-toc]" />
      <div className="mx-auto max-w-5xl">
        <p data-toc data-toc-depth="1" data-toc-title="Experience" className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary">
          Experience
        </p>
        <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal">
          From speech ML intern to CTO.
        </h1>

        <div className="mt-16 grid gap-0 divide-y divide-dashed divide-border border-y border-dashed border-border">
          {experience.map((role) => (
            <article key={role.slug} className="grid gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  {role.start} — {role.end}
                </p>
                <h2 className="mt-2 text-xl font-black uppercase leading-tight tracking-normal">{role.org}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {role.role} · {role.location}
                </p>
              </div>
              <ul className="space-y-3">
                {role.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-7 text-foreground/85 md:text-base">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
