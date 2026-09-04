import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Full-section vertical storytelling.
 *
 * Each slide is `position: sticky; top: 0`, so it holds the viewport while the
 * next slide scrolls up and covers it — the deck/"slide rises over slide"
 * behaviour, rather than an element-level fade. Slides are opaque and stack via
 * ascending z-index so the incoming panel genuinely occludes the outgoing one.
 *
 * Chosen over GSAP ScrollTrigger pinning because it is pure CSS: no scroll
 * hijacking, no measurement, no layout thrash, and native scrolling stays
 * intact — so browser back, anchors, deep links, refresh and keyboard
 * navigation all behave normally. A slide whose content exceeds the viewport
 * simply scrolls as usual instead of trapping the reader.
 */
export function StorySlides({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('story-slides', className)}>{children}</div>;
}

export function StorySlide({
  children,
  className,
  /** Ascending order controls stacking; later slides cover earlier ones. */
  index = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  id?: string;
}) {
  return (
    <section id={id} className={cn('story-slide', className)} style={{ zIndex: index + 1 }}>
      <div className="story-slide-inner">{children}</div>
    </section>
  );
}
