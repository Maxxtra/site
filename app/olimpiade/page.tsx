import { GalleryPage } from '@/components/gallery-page';
import { getGalleryPage } from '@/lib/gallery-pages';

export default function OlimpiadePage() {
  const page = getGalleryPage('olimpiade');

  if (!page) {
    return null;
  }

  return <GalleryPage page={page} />;
}
