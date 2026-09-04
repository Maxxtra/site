'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  /** Elements matching this selector rise into place as they enter the viewport. */
  selector?: string;
  className?: string;
};

/**
 * Extends the homepage FlowArt "slides moving upward" language to standard
 * content pages: each major section rises and fades into place on entry.
 *
 * Deliberately a reveal rather than FlowArt's pinned/rotating panels — pinning
 * assumes full-viewport slides and would trap scrolling on variable-height
 * content like publication lists.
 *
 * Uses IntersectionObserver rather than GSAP ScrollTrigger: the motion is a
 * simple one-shot transition, and IO has no dependency on trigger positions
 * being recomputed after fonts/images settle, which is what left above-the-fold
 * sections stuck invisible.
 *
 * Fail-safe by construction: the markup renders fully visible, and the hiding
 * class is only added by this effect. If JS never runs, everything stays
 * readable. The class is applied in a layout effect (pre-paint), so there is
 * no flash of already-visible content.
 */
export function ScrollReveal({ children, selector = '[data-reveal]', className }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0 || prefersReduced) return;

    if (typeof IntersectionObserver === 'undefined') return;

    targets.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    targets.forEach((el) => io.observe(el));

    // Safety net: if the observer never delivers (unexpected environment,
    // suspended callbacks, etc.), reveal everything rather than leave content
    // stranded at opacity 0. Only fires while the page is actually visible, so
    // it does not pre-empt the animation for someone opening a background tab.
    const failsafe = window.setTimeout(() => {
      if (document.visibilityState !== 'visible') return;
      targets.forEach((el) => el.classList.add('reveal-visible'));
      io.disconnect();
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      // Leave nothing hidden if this unmounts mid-transition.
      targets.forEach((el) => el.classList.remove('reveal', 'reveal-visible'));
    };
  }, [selector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
