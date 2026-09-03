import { siteConfig } from '@/lib/site-config';

const contactLinks = [
  { label: 'Email', href: `mailto:${siteConfig.email}` },
  { label: 'GitHub', href: siteConfig.github },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'Google Scholar', href: siteConfig.scholar },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black px-6 pt-16 pb-32 text-white md:px-10 md:pb-40 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">Get in touch</p>
          <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">Let&rsquo;s talk.</h2>
          <p className="mt-4 max-w-md leading-7 text-white/60">
            Open to research collaboration, technical advising, and speaking on AI systems, distributed
            computing, and Olympiad-level AI education.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="border border-white/20 px-4 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white/75 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-7xl text-xs uppercase tracking-[0.18em] text-white/30">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
