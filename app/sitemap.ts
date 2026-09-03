import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

const routes = [
  '',
  'research',
  'publications',
  'experience',
  'teaching',
  'projects',
  'awards',
  'media',
  'about',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}/${route}`,
    lastModified: new Date(),
  }));
}
