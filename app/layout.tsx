import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteLoader } from '@/components/site-loader';
import { SiteNav } from '@/components/site-nav';
import { siteConfig } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.positioning,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.positioning,
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.positioning,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle: 'Chief Technology Officer',
  worksFor: {
    '@type': 'Organization',
    name: 'Qflex Technologies',
  },
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'University POLITEHNICA of Bucharest',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University POLITEHNICA of Bucharest',
  },
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.scholar],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <SiteLoader />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
