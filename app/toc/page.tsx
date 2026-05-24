import Link from 'next/link';
import { ArrowLeft, Database, Globe2, Layers, RadioTower } from 'lucide-react';
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc';

const callouts = [
  {
    icon: Globe2,
    title: 'Static first',
    body: 'The earliest websites were simple documents, but that simplicity gave the web its durable foundation.',
  },
  {
    icon: Database,
    title: 'Data joins the page',
    body: 'Server rendering connected pages to databases, accounts, commerce, and publishing tools.',
  },
  {
    icon: Layers,
    title: 'Apps arrive',
    body: 'Client-side frameworks made browsers feel more like operating systems for product interfaces.',
  },
  {
    icon: RadioTower,
    title: 'The edge era',
    body: 'Modern architectures move compute closer to users while preserving rich interaction.',
  },
];

export default function TocDemoPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      <DynamicIslandTOC />

      <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Story scroll demo
        </Link>

        <article className="mx-auto flex flex-col gap-8">
          <header className="mb-10 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Dynamic Island TOC
            </p>
            <h1 className="text-4xl font-extrabold tracking-normal sm:text-5xl">
              The Evolution of Web Architecture
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              From static HTML pages to edge computing, dynamic islands, and interfaces that feel
              alive.
            </p>
          </header>

          <p className="text-lg leading-8 text-foreground/80">
            The web has evolved at a breakneck pace. What started as simple hyperlinked text
            documents has transformed into rich, immersive applications that rival desktop
            software. This demo gives the table of contents enough real structure to track as you
            scroll.
          </p>

          <section className="grid gap-4 sm:grid-cols-2">
            {callouts.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border border-border bg-foreground/[0.03] p-5">
                  <Icon className="mb-6 h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <h2 data-toc-ignore className="text-xl font-black uppercase tracking-normal">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                </div>
              );
            })}
          </section>

          <h2 className="mt-12 text-3xl font-black tracking-normal">The Early Days: Static HTML</h2>
          <p className="text-lg leading-8 text-foreground/80">
            In the beginning, the web was read-only. Servers hosted flat HTML files and served them
            to browsers upon request. There was no account state, no real-time personalization, and
            no application shell waiting to hydrate.
          </p>
          <div className="flex h-40 items-center justify-center border border-border bg-muted/30 text-muted-foreground">
            Decorative CSS-only placeholder
          </div>
          <p className="text-lg leading-8 text-foreground/80">
            Webmasters manually edited files. If the footer changed on one hundred pages, one
            hundred pages had to be touched. It was blunt, but it was also incredibly legible.
          </p>

          <h3 className="text-2xl font-black tracking-normal">The Role of Webmasters</h3>
          <p className="text-lg leading-8 text-foreground/80">
            The webmaster was part designer, part sysadmin, part content editor. They uploaded
            files, watched links, and kept small islands of the internet alive by hand.
          </p>

          <h2 className="mt-12 text-3xl font-black tracking-normal">The Rise of Dynamic Content</h2>
          <p className="text-lg leading-8 text-foreground/80">
            As the web grew, pages needed to react to users. Server-side rendering let languages
            like PHP, Perl, and Java stitch HTML together on demand with data pulled from relational
            databases.
          </p>

          <h3 className="text-2xl font-black tracking-normal">Server-Side Rendering in the 2000s</h3>
          <p className="text-lg leading-8 text-foreground/80">
            With SSR, every click often meant a full page reload. The server did the heavy lifting,
            but users gained forums, shopping carts, dashboards, and CMS-driven publishing.
          </p>

          <h4 className="text-xl font-black tracking-normal">The Database Bottleneck</h4>
          <p className="text-lg leading-8 text-foreground/80">
            At scale, databases became the pressure point. Caching layers, query tuning, and
            careful server configuration became everyday architecture concerns.
          </p>

          <h2
            data-toc-title="The SPA Revolution"
            className="mt-12 text-3xl font-black tracking-normal"
          >
            The Paradigm Shift to Client-Side Rendering and Single Page Applications
          </h2>
          <p className="text-lg leading-8 text-foreground/80">
            This heading is intentionally long, but the TOC uses the shorter `data-toc-title`
            attribute. Client-side rendering moved more UI work into the browser and made
            interfaces feel continuous.
          </p>

          <h3 className="text-2xl font-black tracking-normal">AJAX Changes Everything</h3>
          <p className="text-lg leading-8 text-foreground/80">
            AJAX allowed pages to fetch data without full refreshes. Frameworks eventually turned
            that pattern into full application runtimes.
          </p>
          <div className="flex h-64 flex-col items-center justify-center border border-border bg-muted/30 p-6 text-center text-muted-foreground">
            <p>Scroll further to test TOC scroll spy tracking.</p>
            <p className="mt-4 text-sm">The active item should keep changing.</p>
          </div>

          <div
            data-toc
            data-toc-depth="2"
            data-toc-title="The Modern Era: Edge Computing"
            className="my-8 border border-foreground/10 bg-foreground/5 p-8"
          >
            <h3 className="mt-0 text-2xl font-bold">This box is registered in the TOC</h3>
            <p className="mb-0 mt-4 text-muted-foreground">
              It uses `data-toc`, `data-toc-depth`, and `data-toc-title`, so complex UI blocks can
              behave like navigable headings.
            </p>
          </div>

          <p className="text-lg leading-8 text-foreground/80">
            Today, compute is moving closer to users. Edge functions, serverless infrastructure,
            and distributed data stores blur the boundary between frontend and backend work.
          </p>

          <h4 className="text-xl font-black tracking-normal">Hydration and Resumability</h4>
          <p className="text-lg leading-8 text-foreground/80">
            Modern teams are more careful about how much JavaScript reaches the client. Hydration,
            partial hydration, and resumability all try to keep interactivity sharp without flooding
            the browser.
          </p>
          <p className="text-lg leading-8 text-foreground/80">
            In a way, the web came full circle: back to delivering meaningful HTML early, but now
            with far more expressive client-side interaction layered on top.
          </p>

          <hr className="my-12 border-border" />

          <h2 data-toc-ignore className="text-center text-3xl font-black">
            Join My Newsletter
          </h2>
          <p className="text-center text-muted-foreground">
            This section uses `data-toc-ignore`, so it will not appear in the dynamic island menu.
          </p>
          <div className="mb-24 mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="hello@example.com"
              className="border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            <button className="bg-foreground px-5 py-3 font-medium text-background transition-opacity hover:opacity-85">
              Subscribe
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
