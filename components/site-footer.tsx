import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const contactLinks = [
  { label: 'Email', href: `mailto:${siteConfig.email}` },
  { label: 'GitHub', href: siteConfig.github },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'Google Scholar', href: siteConfig.scholar },
];

const pages = [
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'Experience', href: '/experience' },
  { label: 'Teaching', href: '/teaching' },
  { label: 'Projects', href: '/projects' },
  { label: 'Awards', href: '/awards' },
  { label: 'Media', href: '/media' },
  { label: 'About', href: '/about' },
];

export function SiteFooter() {
  return (
    <footer className="footer" data-nav-theme="dark">
      <div className="footer-contours" aria-hidden="true" />

      <div className="footer-lead">
        <p className="footer-key">Get in touch</p>
        <h2 className="footer-title">
          Let&rsquo;s <em>talk.</em>
        </h2>
        <p className="footer-text">
          Open to research collaboration, technical advising, and speaking on AI systems, distributed computing, and
          Olympiad-level AI education.
        </p>
        <a href={`mailto:${siteConfig.email}`} className="footer-cta">
          {siteConfig.email}
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-columns">
        <nav aria-label="Footer pages">
          <p className="footer-key">Pages</p>
          <ul>
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href}>{page.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer-key">Elsewhere</p>
          <ul>
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/Costin-Alexandru-Deonise-CV.pdf">CV</a>
            </li>
          </ul>
        </div>
      </div>

      <p className="footer-legal">
        © {new Date().getFullYear()} {siteConfig.name}
        <span>Bucharest, RO</span>
      </p>
    </footer>
  );
}
