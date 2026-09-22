'use client';

import { useState } from 'react';

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  caption: string;
  detail?: string;
  className?: string;
};

/**
 * A plate that plays. Only the poster loads until the viewer presses play;
 * the video element is created on demand, so nothing is preloaded.
 */
export function VideoPlate({ src, poster, width, height, caption, detail, className }: Props) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className={`plate video-plate ${className ?? ''}`}>
      {playing ? (
        <video src={src} poster={poster} controls autoPlay playsInline />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${caption}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export; intrinsic size kept explicit */}
          <img src={poster} alt="" width={width} height={height} loading="lazy" decoding="async" />
        </button>
      )}
      <figcaption>
        {caption}
        {detail && <span className="plate-detail"> {detail}</span>}
      </figcaption>
    </figure>
  );
}
