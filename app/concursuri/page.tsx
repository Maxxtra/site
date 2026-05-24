import { GalleryPage } from '@/components/gallery-page';
import { getGalleryPage } from '@/lib/gallery-pages';

export default function ConcursuriPage() {
  const page = getGalleryPage('concursuri');

  if (!page) {
    return null;
  }

  return <GalleryPage page={page} />;
}
