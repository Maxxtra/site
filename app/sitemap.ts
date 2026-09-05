import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

// `trailingSlash: true` means the canonical URL of every route ends in "/".
// Listing the non-slash form made each sitemap entry cost a 301 hop.
const routes: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/research/', priority: 0.9 },
  { path: '/publications/', priority: 0.9 },
  { path: '/about/', priority: 0.8 },
  { path: '/experience/', priority: 0.8 },
  { path: '/teaching/', priority: 0.8 },
  { path: '/projects/', priority: 0.7 },
  { path: '/awards/', priority: 0.7 },
  { path: '/media/', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
