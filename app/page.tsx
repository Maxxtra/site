import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Cpu,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Medal,
  Rocket,
  Trophy,
} from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { FeatureCard } from '@/components/ui/grid-feature-cards';
import { siteConfig } from '@/lib/site-config';
import { publications } from '@/lib/publications';
import { featuredAwards } from '@/lib/awards';
import { getPhoto } from '@/lib/photos';

const primaryLinks = [
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'CV', href: '/Costin-Alexandru-Deonise-CV.pdf' },
  { label: 'Google Scholar', href: siteConfig.scholar },
  { label: 'GitHub', href: siteConfig.github },
];

const highlights = [
  {
    title: 'Chief Technology Officer',
    icon: Rocket,
    description: 'Leading AI system delivery for enterprise clients at Qflex Technologies.',
  },
  {
    title: 'PhD-track Researcher',
    icon: FlaskConical,
    description: 'Parallel & Distributed Computer Systems, POLITEHNICA Bucharest.',
  },
  {
    title: 'National Team Coach, IOAI',
    icon: Trophy,
    description: "Coached Romania's AI Olympiad delegation to a 4th-place worldwide finish in 2026.",
  },
  {
    title: '6 Publications',
    icon: BookOpen,
    description: 'On scalable differentiation, privacy-preserving ML, and LLM systems.',
  },
  {
    title: 'Associate Lecturer',
    icon: GraduationCap,
    description: '1000+ students taught at POLITEHNICA Bucharest since 2022.',
  },
  {
    title: 'Robotics Mentor',
    icon: Cpu,
    description: 'Lead mentor for AlphaZ FRC #11141, a FIRST World Championship award winner.',
  },
];

const directionPages = [
  {
    href: '/research',
    label: 'Research',
    description: 'Scalable differentiation, privacy-preserving ML, and LLM systems.',
    icon: FlaskConical,
  },
  {
    href: '/publications',
    label: 'Publications',
    description: 'Six peer-reviewed papers across journals and conferences.',
    icon: BookOpen,
  },
  {
    href: '/experience',
    label: 'Experience',
    description: 'From ML internships to Chief Technology Officer.',
    icon: Briefcase,
  },
  {
    href: '/teaching',
    label: 'Teaching & Olympiads',
    description: "Lecturing at POLITEHNICA and coaching Team Romania's AI Olympiad squad.",
    icon: Medal,
  },
  {
    href: '/projects',
    label: 'Projects',
    description: 'AlgoTrack, AtlasRAG, distributed STDE, and AlphaZ robotics.',
    icon: Cpu,
  },
  {
    href: '/awards',
    label: 'Awards',
    description: 'Scholarships, paper awards, and competition results.',
    icon: Award,
  },
];

const principles = [
  {
    title: 'Rigor before scale',
    body: 'Correctness and reproducibility come first — scaling a wrong result just gets there faster.',
  },
  {
    title: 'Publish, then apply',
    body: 'Research earns its keep when it ships: from PDE solvers to production RAG pipelines.',
  },
  {
    title: 'Explain clearly',
    body: 'A concept isn’t understood until it survives being taught to 1000 students.',
  },
];

export default function Home() {
  const featuredPublications = publications.filter((p) => p.highlight);
  const trajectoryPhoto = getPhoto('ioai-astana-2026-team');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <DynamicIslandTOC selector="[data-toc]" />

      <section
        data-toc
        data-toc-depth="1"
        data-toc-title="Costin-Alexandru Deonise"
        className="bg-black px-6 pt-36 pb-24 text-white md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-white/75">
                {siteConfig.tagline}
              </p>
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.9] tracking-normal">
                Costin
                <br />
                Alexandru
                <br />
                Deonise
              </h1>
            </div>
            <div className="border border-white/15 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-xl leading-9 text-white/90">{siteConfig.positioning}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {primaryLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 border border-white/25 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/85 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 divide-x divide-y divide-dashed divide-white/15 border border-dashed border-white/20 bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} className="text-white [&_p]:text-white/70" />
            ))}
          </div>
        </div>
      </section>

      <section
        data-toc
        data-toc-depth="2"
        data-toc-title="Selected work"
        className="px-6 pt-24 pb-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">Selected work</p>
              <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">Recent, high-signal results</h2>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {featuredPublications.map((pub) => (
              <Link
                key={pub.slug}
                href={`/publications#${pub.slug}`}
                className="group border border-border bg-card p-6 text-card-foreground transition-colors hover:border-primary"
              >
                {pub.awards && pub.awards.length > 0 && (
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    {pub.awards.join(' · ')}
                  </p>
                )}
                <h3 className="text-lg font-bold leading-snug">{pub.title}</h3>
                <p className="mt-2 text-sm italic text-muted-foreground">
                  {pub.venue}, {pub.date ?? pub.year}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredAwards.slice(0, 4).map((award) => (
              <div key={award.title} className="border border-dashed border-border p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{award.year}</p>
                <p className="mt-2 text-sm font-semibold leading-snug">{award.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="zone"
        data-toc
        data-toc-depth="2"
        data-toc-title="Explore"
        className="px-6 pb-28 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">Site structure</p>
              <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">Explore</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {directionPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group border border-border bg-card p-6 text-card-foreground transition-colors hover:border-primary"
                >
                  <div className="mb-12 flex items-start justify-between gap-6">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
                    <ArrowUpRight
                      className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-normal">{page.label}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{page.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-toc
        data-toc-depth="2"
        data-toc-title="Principles"
        className="border-y border-border bg-card/60 px-6 py-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">How I work</p>
            <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">
              Three things I don&rsquo;t compromise on.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="border-t border-border pt-5">
                <h3 className="text-xl font-black uppercase tracking-normal">{principle.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-toc
        data-toc-depth="2"
        data-toc-title="Trajectory"
        className="bg-black pt-24"
      >
        <div className="px-6 pb-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">Trajectory</p>
            <h2 className="max-w-4xl text-4xl font-black uppercase tracking-normal text-white md:text-6xl">
              Researcher, engineer, teacher, coach.
            </h2>
          </div>
        </div>

        <FlowArt aria-label="Research, engineering, teaching, and coaching trajectory" className="bg-black">
          <FlowSection aria-label="Research" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">01 / Research</p>
              <FlaskConical className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              Systems
              <br />
              That
              <br />
              Scale
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <p className="mt-auto max-w-[58ch] text-[clamp(1rem,2.2vw,1.8rem)] leading-relaxed text-white/75">
              From distributed high-order differentiation on multi-GPU clusters to privacy-preserving
              inference — published, peer-reviewed research, not slideware.
            </p>
          </FlowSection>

          <FlowSection aria-label="Engineering" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">02 / Engineering</p>
              <Rocket className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              Production
              <br />
              AI
              <br />
              Systems
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <div className="grid gap-[3vw] md:grid-cols-3">
              <p className="leading-7 text-white/70">
                CTO at Qflex Technologies, leading AI system architecture and delivery for enterprise clients.
              </p>
              <p className="leading-7 text-white/70">
                Built production RAG, knowledge-graph extraction, and speech pipelines at ATI and Bitdefender.
              </p>
              <p className="leading-7 text-white/70">
                Built AlgoTrack end to end — a tutoring platform deployed and in daily use.
              </p>
            </div>
          </FlowSection>

          <FlowSection aria-label="Teaching" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">03 / Teaching</p>
              <GraduationCap className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              1000+
              <br />
              Students
              <br />
              Taught
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <p className="mt-auto max-w-[58ch] text-[clamp(1rem,2.2vw,1.8rem)] leading-relaxed text-white/75">
              Associate Lecturer at POLITEHNICA Bucharest since 2022, across programming, parallel
              algorithms, and numerical methods.
            </p>
          </FlowSection>

          <FlowSection aria-label="Olympiad coaching" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            {trajectoryPhoto && (
              <div className="absolute inset-0 -z-10">
                <Image src={trajectoryPhoto.src} alt={trajectoryPhoto.alt} fill className="object-cover opacity-40" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50" />
              </div>
            )}
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">04 / Olympiad Coaching</p>
              <Trophy className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              Team
              <br />
              Romania
              <br />
              4th Worldwide
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <div className="mt-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {directionPages.slice(0, 4).map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="inline-flex items-center justify-between gap-3 border border-white/25 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {page.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </FlowSection>
        </FlowArt>
      </section>
    </main>
  );
}
