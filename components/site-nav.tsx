'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';

const links = [
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

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentLabel = links.find((l) => l.href === pathname)?.label ?? 'Menu';

  return (
    <nav className="fixed left-1/2 top-4 z-[9000] w-[min(calc(100vw-2rem),960px)] -translate-x-1/2 border border-white/10 bg-black/80 text-white shadow-2xl backdrop-blur-md">
      {/* Desktop / tablet: all links visible */}
      <div className="hidden flex-wrap items-center justify-center gap-1 px-3 py-3 sm:flex">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors',
                active ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10 hover:text-white',
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile: collapsed toggle */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="flex w-full items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-[0.14em]"
        >
          {currentLabel}
          {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        </button>
        {open && (
          <div id="mobile-nav-panel" className="grid grid-cols-2 gap-1 border-t border-white/10 p-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-3 py-2.5 text-center text-xs font-bold uppercase tracking-[0.14em] transition-colors',
                    active ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
