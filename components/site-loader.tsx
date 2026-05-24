'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const stickers = [
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#ffffff',
];

const faces = [
  { name: 'front', color: '#f5f5f5' },
  { name: 'back', color: '#d8d8d8' },
  { name: 'right', color: '#ededed' },
  { name: 'left', color: '#cfcfcf' },
  { name: 'top', color: '#ffffff' },
  { name: 'bottom', color: '#bdbdbd' },
];

export function SiteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setVisible(true);
    setLeaving(false);

    const leaveTimer = window.setTimeout(() => setLeaving(true), 1300);
    const removeTimer = window.setTimeout(() => setVisible(false), 1600);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, [pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`rubik-loader ${leaving ? 'rubik-loader--leaving' : ''}`} aria-label="Loading">
      <div className="rubik-scene" aria-hidden="true">
        <div className="rubik-cube">
          {faces.map((face) => (
            <div key={face.name} className={`rubik-face rubik-face--${face.name}`}>
              {stickers.map((_, index) => (
                <span key={index} style={{ backgroundColor: face.color }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
