'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Acasa' },
  { href: '/about-me', label: 'About me' },
  { href: '/concursuri', label: 'Concursuri' },
  { href: '/olimpiade', label: 'Olimpiade' },
  { href: '/scoli-de-vara', label: 'Scoli de vara' },
  { href: '/materii', label: 'Materii' },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-1/2 top-4 z-[9000] w-[min(calc(100vw-2rem),900px)] -translate-x-1/2 border border-white/10 bg-black/80 px-3 py-3 text-white shadow-2xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-center gap-2">
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
    </nav>
  );
}
