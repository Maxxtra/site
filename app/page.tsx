import Link from 'next/link';
import {
  ArrowUpRight,
  Brain,
  BookOpen,
  CalendarDays,
  Code2,
  Fingerprint,
  GraduationCap,
  Lightbulb,
  Medal,
  Network,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const educationPages = [
  {
    href: '/concursuri',
    label: 'Concursuri',
    description: 'Etape, pregatire, imagini si rezultate pentru provocarile elevilor.',
    icon: Trophy,
  },
  {
    href: '/olimpiade',
    label: 'Olimpiade',
    description: 'Un parcurs clar pentru selectie, aprofundare, simulari si performanta.',
    icon: Medal,
  },
  {
    href: '/scoli-de-vara',
    label: 'Scoli de vara',
    description: 'Ateliere, proiecte, lucru pe echipe si momente vizuale din fiecare etapa.',
    icon: CalendarDays,
  },
  {
    href: '/materii',
    label: 'Materii',
    description: 'Disciplinele si modulele pe care le predai, explicate simplu si organizat.',
    icon: BookOpen,
  },
];

const principles = [
  {
    title: 'Claritate inainte de viteza',
    body: 'Elevii au nevoie sa inteleaga ce fac, nu doar sa bifeze exercitii.',
  },
  {
    title: 'Ritm adaptat',
    body: 'Pregatirea se construieste diferit pentru recuperare, aprofundare sau performanta.',
  },
  {
    title: 'Rezultate vizibile',
    body: 'Fiecare etapa poate avea poze, descrieri si concluzii pe care le poti actualiza.',
  },
];

const profileCards = [
  {
    title: 'Programare si logica',
    icon: Code2,
    description: 'Lucrez cu limbaje si concepte care antreneaza gandirea structurata.',
  },
  {
    title: 'Invatare aplicata',
    icon: Lightbulb,
    description: 'Pun accent pe exemple, exercitii si proiecte care fac teoria vizibila.',
  },
  {
    title: 'Pregatire pentru performanta',
    icon: Trophy,
    description: 'Construiesc parcursuri clare pentru concursuri, olimpiade si aprofundare.',
  },
  {
    title: 'Interese moderne',
    icon: Brain,
    description: 'AI, algoritmi, structuri de date si moduri diferite de a rezolva probleme.',
  },
  {
    title: 'Rigoare si siguranta',
    icon: Fingerprint,
    description: 'Elevii au nevoie de reguli clare, feedback calm si progres masurabil.',
  },
  {
    title: 'Conexiuni intre idei',
    icon: Network,
    description: 'Leg conceptele intre ele ca elevii sa inteleaga de ce conteaza.',
  },
];

const programmingSkills = [
  { label: 'C', value: 93 },
  { label: 'Python', value: 78 },
  { label: 'Java', value: 73 },
  { label: 'GoLang', value: 68 },
  { label: 'Racket', value: 58 },
  { label: 'Haskell', value: 48 },
  { label: 'Matlab', value: 38 },
];

const interests = [
  { label: 'Inteligenta Artificiala', value: 98 },
  { label: 'Invatare Automata', value: 93 },
  { label: 'Algoritmi si structuri de date', value: 88 },
  { label: 'Programare orientata pe obiecte', value: 78 },
  { label: 'Programare functionala', value: 68 },
  { label: 'Calcul paralel si distribuit', value: 48 },
];

function SkillMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="group border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-primary/70">
      <div className="flex items-center justify-between gap-5">
        <p className="text-lg font-medium text-white">{label}</p>
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#fd5200 ${value * 3.6}deg, rgba(255,255,255,0.12) 0deg)`,
          }}
        >
          <div className="grid h-11 w-11 place-items-center rounded-full bg-black text-xs font-bold text-white">
            {value}
          </div>
        </div>
      </div>
      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/45">
        Nivel orientativ
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DynamicIslandTOC selector="[data-toc]" />
      <section
        data-toc
        data-toc-depth="1"
        data-toc-title="About me"
        className="bg-black px-6 pt-36 pb-24 text-white md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-white/75">
                About me
              </p>
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.9] tracking-normal">
                Deonise
                <br />
                Costin
                <br />
                Alexandru
              </h1>
            </div>
            <div className="border border-white/15 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-xl leading-9 text-white/90">
                Sunt pasionat de programare, algoritmi si felul in care elevii ajung sa inteleaga
                concepte dificile prin exemple clare. Imi place sa construiesc contexte de invatare
                in care teoria, practica si curiozitatea lucreaza impreuna.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 divide-x divide-y divide-dashed divide-white/15 border border-dashed border-white/20 bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-3">
            {profileCards.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} className="text-white [&_p]:text-white/70" />
            ))}
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-[0.8fr_1fr]">
            <div className="border border-white/10 bg-white/[0.03] p-6 lg:p-8">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Harta competentelor
              </p>
              <h2 className="text-4xl font-black uppercase leading-tight tracking-normal md:text-5xl">
                Limbaje si interese, regandite ca profil de lucru.
              </h2>
              <p className="mt-6 leading-8 text-white/65">
                In loc de o lista clasica cu bare, zona aceasta arata ce folosesti, ce te
                intereseaza si unde se vede directia ta de dezvoltare.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
                <div className="border border-white/10 p-4">
                  <p className="text-3xl font-black text-primary">{programmingSkills.length}</p>
                  <p className="mt-2 uppercase tracking-[0.16em] text-white/50">Limbaje</p>
                </div>
                <div className="border border-white/10 p-4">
                  <p className="text-3xl font-black text-primary">{interests.length}</p>
                  <p className="mt-2 uppercase tracking-[0.16em] text-white/50">Interese</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <Code2 className="h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="text-2xl font-black uppercase tracking-normal">Limbaje</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {programmingSkills.map((skill) => (
                  <SkillMetric key={skill.label} {...skill} />
                ))}
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-center gap-4">
                  <Brain className="h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="text-2xl font-black uppercase tracking-normal">Interese</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {interests.map((interest) => (
                    <SkillMetric key={interest.label} {...interest} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-toc
        data-toc-depth="2"
        data-toc-title="Invatare cu sens"
        className="px-6 pt-36 pb-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Profesor, mentor, ghid pentru elevi
            </p>
            <h1 className="max-w-5xl text-[clamp(3.4rem,9vw,8.5rem)] font-black uppercase leading-[0.88] tracking-normal">
              Invatare cu sens, ritm si incredere.
            </h1>
          </div>

          <div className="border border-border bg-card p-6 text-card-foreground">
            <p className="text-lg leading-8 text-muted-foreground">
              Un site personal unde poti prezenta cine esti, ce predai, cum pregatesti elevii
              pentru concursuri si olimpiade si cum arata activitatile tale in imagini.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#zone"
                className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Vezi zonele
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#cum-lucrez"
                className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-accent"
              >
                Cum lucrez
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="zone"
        data-toc
        data-toc-depth="2"
        data-toc-title="Alege directia"
        className="px-6 pb-28 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Structura site-ului
              </p>
              <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">
                Alege directia
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-muted-foreground">
              Fiecare pagina pastreaza structura cu hero, galerie pe etape, detalii, features si
              Dynamic Island TOC pentru navigare.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {educationPages.map((page) => {
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
        data-toc-title="Principii"
        className="border-y border-border bg-card/60 px-6 py-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Inainte de efecte
            </p>
            <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">
              Site-ul trebuie sa te prezinte calm.
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
        id="cum-lucrez"
        data-toc
        data-toc-depth="2"
        data-toc-title="Cum lucrez"
        className="bg-black pt-24"
      >
        <div className="px-6 pb-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Sectiune story-scroll
            </p>
            <h2 className="max-w-4xl text-4xl font-black uppercase tracking-normal text-white md:text-6xl">
              Un parcurs vizual, dar doar dupa ce vizitatorul intelege unde a ajuns.
            </h2>
          </div>
        </div>

        <FlowArt aria-label="Cum lucrez cu elevii" className="bg-black">
          <FlowSection aria-label="Cine sunt" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">01 / Cine sunt</p>
              <GraduationCap className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              Profesor
              <br />
              Aproape
              <br />
              De elevi
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <p className="mt-auto max-w-[58ch] text-[clamp(1rem,2.2vw,1.8rem)] leading-relaxed text-white/75">
              Prima promisiune a site-ului este simpla: elevul sau parintele trebuie sa simta ca
              aici exista rabdare, structura si directie.
            </p>
          </FlowSection>

          <FlowSection aria-label="Cum predau" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">02 / Cum predau</p>
              <BookOpen className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              Clar
              <br />
              Aplicat
              <br />
              Uman
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <div className="grid gap-[3vw] md:grid-cols-3">
              <p className="leading-7 text-white/70">
                Explic conceptele pe pasi, cu exemple si intrebari care arata unde se rupe firul.
              </p>
              <p className="leading-7 text-white/70">
                Construiesc exercitiile gradual, de la siguranta la provocare.
              </p>
              <p className="leading-7 text-white/70">
                Folosesc feedback ca instrument de crestere, nu ca verdict.
              </p>
            </div>
          </FlowSection>

          <FlowSection aria-label="Pentru cine" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">03 / Pentru cine</p>
              <Users className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              Elevi
              <br />
              Care vor
              <br />
              Sa creasca
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <p className="max-w-[58ch] text-[clamp(1rem,2.2vw,1.8rem)] leading-relaxed text-white/75">
              Poate fi vorba despre recuperare, performanta, olimpiade, concursuri sau un proiect
              de vara. Important este ca parcursul sa fie clar si sustenabil.
            </p>
          </FlowSection>

          <FlowSection aria-label="Unde mergi mai departe" style={{ backgroundColor: '#000000', color: '#f7f2e8' }}>
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">04 / Mai departe</p>
              <ArrowUpRight className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <h2 className="text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.84] tracking-normal">
              Alege
              <br />
              Zona
              <br />
              Potrivita
            </h2>
            <hr className="my-[2vw] border-none border-t border-white/25" />
            <div className="mt-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {educationPages.map((page) => (
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
