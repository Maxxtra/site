'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * All scroll-linked motion, on every page, driven from data attributes so the
 * markup stays server-rendered and readable:
 *
 *   [data-hero]            pinned hero; receives --hp (0..1) as it scrolls out
 *   [data-marquee="±n"]    horizontal drift, scrubbed to scroll
 *   [data-rise]            lines/blocks that rise into place once
 *   [data-drift="n"]       photos that travel n% slower than the page
 *
 * Everything here is enhancement. With JS off, or prefers-reduced-motion set,
 * the page is a complete static layout: nothing starts hidden in CSS.
 */
export function EditorialMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = document.querySelector<HTMLElement>('[data-hero]');
        if (hero) {
          // Scroll room is only added once we know we can animate through it.
          hero.classList.add('is-enhanced');
          ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
              hero.style.setProperty('--hp', self.progress.toFixed(4));
              hero.dataset.navTheme = self.progress > 0.09 ? 'dark' : 'light';
            },
          });
        }

        gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((el) => {
          const dir = Number(el.dataset.marquee) || -1;
          gsap.fromTo(
            el,
            { xPercent: dir < 0 ? 0 : -22 },
            {
              xPercent: dir < 0 ? -22 : 0,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
          gsap.from(el, {
            yPercent: 0,
            y: 44,
            autoAlpha: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
          const amount = Number(el.dataset.drift) || 8;
          gsap.fromTo(
            el,
            { yPercent: amount },
            {
              yPercent: -amount,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });

        return () => {
          hero?.classList.remove('is-enhanced');
          hero?.style.removeProperty('--hp');
        };
      });

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
