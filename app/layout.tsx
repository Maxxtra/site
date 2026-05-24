import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteLoader } from '@/components/site-loader';
import { SiteNav } from '@/components/site-nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Story Scroll Demo',
  description: 'Demo site for FlowArt story scroll animation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteLoader />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
