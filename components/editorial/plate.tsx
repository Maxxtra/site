import type { Photo } from '@/lib/photos';

type Props = {
  photo: Photo | undefined;
  className?: string;
  /** Parallax amount in %, read by components/editorial/motion.tsx. */
  drift?: number;
  sizes: string;
  /** Above-the-fold plates decode eagerly; everything else lazily. */
  priority?: boolean;
  /** Caption override; defaults to the photo's own caption and detail line. */
  caption?: string;
  detail?: string;
};

/**
 * Editorial plate: a photograph with a two-line mono caption (what, then
 * where/when). Sizing comes from the photo's intrinsic dimensions so the page
 * never shifts while it loads. The crop is set by the page's stylesheet.
 */
export function Plate({ photo, className, drift, sizes, priority, caption, detail }: Props) {
  if (!photo) return null;
  const line = caption ?? photo.caption;
  const sub = detail ?? photo.detail;
  return (
    <figure className={`plate ${className ?? ''}`} data-drift={drift}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export: next/image is unoptimized here, and a plain img keeps intrinsic sizing explicit */}
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
      <figcaption>
        {line}
        {sub && <span className="plate-detail"> {sub}</span>}
      </figcaption>
    </figure>
  );
}
