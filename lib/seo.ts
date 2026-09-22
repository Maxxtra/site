import type { Metadata } from 'next';
import { siteConfig } from './site-config';

type PageMeta = {
  /** Route path, with the trailing slash the build emits. Canonical and og:url. */
  path: string;
  /** Page title without the site-name suffix. Omit on the homepage, which uses the default. */
  title?: string;
  description: string;
  /** 'profile' only for pages that are about the person; everything else is a website page. */
  ogType?: 'website' | 'profile';
};

/**
 * Per-page metadata.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's object outright, and a page that sets none inherits the layout's
 * *explicit* og:url/og:title/og:description rather than its own. That is why
 * every inner page used to advertise the homepage URL and title to crawlers
 * and social cards. Building both objects here keeps each page honest.
 */
export function pageMetadata({ path, title, description, ogType = 'website' }: PageMeta): Metadata {
  const url = `${siteConfig.url}${path}`;
  const social = title ? `${title} · ${siteConfig.name}` : siteConfig.defaultTitle;
  const images = [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} — ${siteConfig.tagline}`,
    },
  ];

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      title: social,
      description,
      images,
      ...(ogType === 'profile' ? { firstName: 'Costin-Alexandru', lastName: 'Deonise' } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: social,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
