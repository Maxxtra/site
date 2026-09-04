import Image from 'next/image';

type PortraitRevealProps = {
  src: string;
  alt: string;
  /** Small label shown in the HUD readout on hover. */
  readout?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Hero portrait with a cybernetic hover reveal.
 *
 * The "robot" layer is not a second photograph: it is the same real portrait
 * put through a duotone/edge CSS treatment with a scanline + grid + HUD
 * overlay, so nothing about the subject is fabricated. Revealed with an upward
 * wipe to echo the site's slide-up motion language.
 *
 * Deliberately pure CSS (no state, no effects): it renders identically on the
 * server, cannot cause a hydration mismatch, and the hover styles are gated
 * behind `(hover: hover)` in globals.css so touch devices never get a stuck
 * hover state. Both layers are absolutely positioned in a fixed-ratio box, so
 * there is no layout shift.
 */
export function PortraitReveal({
  src,
  alt,
  readout = 'SYSTEMS / AI',
  className,
  priority,
}: PortraitRevealProps) {
  return (
    <div className={`portrait-frame ${className ?? ''}`}>
      <div className="portrait-media">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 320px, 60vw"
          className="portrait-base"
          priority={priority}
        />

        {/* Decorative cybernetic layer. aria-hidden: it conveys no new info. */}
        <div className="portrait-cyber" aria-hidden="true">
          <Image src={src} alt="" fill sizes="(min-width: 1024px) 320px, 60vw" className="portrait-cyber-img" />
          <span className="portrait-grid" />
          <span className="portrait-scan" />
          <span className="portrait-reticle" />
          <span className="portrait-corner portrait-corner--tl" />
          <span className="portrait-corner portrait-corner--tr" />
          <span className="portrait-corner portrait-corner--bl" />
          <span className="portrait-corner portrait-corner--br" />
          <span className="portrait-readout">{readout}</span>
        </div>
      </div>
    </div>
  );
}
