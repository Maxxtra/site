import { GalleryPage } from '@/components/gallery-page';
import { getGalleryPage } from '@/lib/gallery-pages';

export default function AboutMePage() {
  const page = getGalleryPage('about-me');

  if (!page) {
    return null;
  }

  return <GalleryPage page={page} />;
}
