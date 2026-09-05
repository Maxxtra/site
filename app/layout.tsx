import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteLoader } from '@/components/site-loader';
import { SiteNav } from '@/components/site-nav';
import { siteConfig, sameAsProfiles } from '@/lib/site-config';
import { featuredAwards } from '@/lib/awards';
import { researchDirections } from '@/lib/research';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.positioning,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  // NOTE: no `alternates.canonical` here on purpose. A canonical set on the
  // root layout is inherited by every route, which previously made all
  // sub-pages declare the homepage as their canonical — telling Google they
  // were duplicates. Each page now sets its own.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    firstName: 'Costin-Alexandru',
    lastName: 'Deonise',
    locale: 'en_US',
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.positioning,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.positioning,
    images: [siteConfig.ogImage],
  },
  icons: { icon: '/favicon.svg' },
  // Google Search Console: paste the token here after creating the property.
  // Left unset deliberately — an invented token would fail verification.
  // verification: { google: 'YOUR-TOKEN' },
};

const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

const upb = {
  '@type': 'CollegeOrUniversity',
  name: 'National University of Science and Technology POLITEHNICA Bucharest',
  alternateName: 'POLITEHNICA Bucharest',
  sameAs: 'https://upb.ro/',
};

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: siteConfig.name,
  alternateName: [...siteConfig.alternateNames],
  givenName: 'Costin-Alexandru',
  familyName: 'Deonise',
  url: `${siteConfig.url}/`,
  mainEntityOfPage: { '@id': WEBSITE_ID },
  image: `${siteConfig.url}${siteConfig.portrait}`,
  description: siteConfig.positioning,
  email: `mailto:${siteConfig.email}`,
  jobTitle: ['Chief Technology Officer', 'Associate Lecturer', 'AI & Distributed Systems Researcher'],
  worksFor: [
    { '@type': 'Organization', name: 'Qflex Technologies' },
    { ...upb },
  ],
  affiliation: { ...upb },
  alumniOf: [
    { ...upb },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Oxford',
      sameAs: 'https://www.ox.ac.uk/',
    },
  ],
  knowsAbout: [
    ...researchDirections.map((d) => d.title),
    'Automatic Differentiation',
    'Parallel and Distributed Computing',
    'Machine Learning',
    'Natural Language Processing',
  ],
  award: featuredAwards.map((a) => `${a.title} (${a.org}, ${a.year})`),
  knowsLanguage: ['en', 'ro'],
  nationality: { '@type': 'Country', name: 'Romania' },
  sameAs: sameAsProfiles,
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${siteConfig.url}/`,
  name: siteConfig.name,
  inLanguage: 'en',
  description: siteConfig.positioning,
  // Ties the site to the person entity so both resolve to one identity.
  publisher: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
  about: { '@id': PERSON_ID },
  copyrightHolder: { '@id': PERSON_ID },
};

const graph = { '@context': 'https://schema.org', '@graph': [person, website] };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Emitted into the static HTML at build time, so crawlers see it
            without executing JavaScript. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
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
