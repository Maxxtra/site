'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

type VideoPlayerProps = {
  src: string;
  poster: string;
  caption: string;
  className?: string;
};

// No autoplay, no preload of the video itself — only the poster loads until
// the viewer explicitly presses play.
export function VideoPlayer({ src, poster, caption, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      <div className="relative aspect-video w-full overflow-hidden border border-border bg-black">
        {playing ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block h-full w-full"
            aria-label={`Play video: ${caption}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt={caption} className="h-full w-full object-cover" loading="lazy" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-105">
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
