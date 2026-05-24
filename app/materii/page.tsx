import { GalleryPage } from '@/components/gallery-page';
import { getGalleryPage } from '@/lib/gallery-pages';

export default function MateriiPage() {
  const page = getGalleryPage('materii');

  if (!page) {
    return null;
  }

  return <GalleryPage page={page} />;
}
