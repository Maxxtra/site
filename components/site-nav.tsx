'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/lib/site-config';

const pages = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/experience', label: 'Experience' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/projects', label: 'Projects' },
  { href: '/awards', label: 'Awards' },
  { href: '/media', label: 'Media' },
  { href: '/about', label: 'About' },
];

const CV = '/Costin-Alexandru-Deonise-CV.pdf';

const elsewhere = [
  { label: 'Google Scholar', href: siteConfig.scholar },
  { label: 'GitHub', href: siteConfig.github },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'Email', href: `mailto:${siteConfig.email}` },
];

/** `trailingSlash: true` makes usePathname() return "/awards/", so compare
 *  against a slash-normalised form or the active state never matches. */
const normalise = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);

export function SiteNav() {
  const pathname = normalise(usePathname());
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(pathname === '/' ? 'light' : 'dark');
  const [atTop, setAtTop] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The bar has no background of its own, so it takes its colour from whichever
  // section is underneath it. Sections opt in with data-nav-theme; pages that
  // declare nothing (the inner pages) are dark.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setAtTop(window.scrollY < window.innerHeight * 0.35);
      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let next: 'light' | 'dark' = 'dark';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 40 && rect.bottom > 40) {
          next = section.dataset.navTheme === 'light' ? 'light' : 'dark';
          break;
        }
      }
      setTheme(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Modal behaviour: lock scroll, Escape closes, focus stays inside the panel
  // and returns to the toggle afterwards.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = 'hidden';
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []).concat(toggle ? [toggle] : []);
    panelRef.current?.querySelector<HTMLElement>('.menu-pages a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  const home = pathname === '/';

  return (
    <header className="nav" data-theme={open ? 'dark' : theme} data-open={open} data-top={home && atTop}>
      {/* On the homepage the hero already carries the name at masthead scale,
          so the wordmark only appears once that has scrolled away. */}
      <Link
        href="/"
        className="nav-wordmark"
        data-hidden={home && atTop && !open}
        tabIndex={home && atTop && !open ? -1 : undefined}
        aria-label={`${siteConfig.name}, home`}
        onClick={() => setOpen(false)}
      >
        <span className="nav-wordmark-first">Costin-Alexandru</span>{' '}
        <span className="nav-wordmark-last">Deonise</span>
      </Link>

      <div className="nav-actions">
        <a href={CV} className="nav-cv">
          CV{' '}
          <span aria-hidden="true">↓</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-label">{open ? 'Close' : 'Menu'}</span>
          <span className="nav-toggle-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div
        id="site-menu"
        ref={panelRef}
        className="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="menu-contours" aria-hidden="true" />

        <div className="menu-aside">
          <p className="menu-tagline">
            Researcher, engineer, <em>teacher, coach.</em>
          </p>
          <p className="menu-key">Elsewhere</p>
          <ul className="menu-links">
            <li>
              <a href={CV}>Curriculum vitae ↓</a>
            </li>
            {elsewhere.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="menu-pages" aria-label="Pages">
          <ul>
            {pages.map((page, i) => (
              <li key={page.href} style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={page.href}
                  aria-current={pathname === page.href ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="menu-number">{String(i).padStart(2, '0')}</span>{' '}
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
