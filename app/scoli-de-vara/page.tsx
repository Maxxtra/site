import { GalleryPage } from '@/components/gallery-page';
import { getGalleryPage } from '@/lib/gallery-pages';

export default function ScoliDeVaraPage() {
  const page = getGalleryPage('scoli-de-vara');

  if (!page) {
    return null;
  }

  return <GalleryPage page={page} />;
}
