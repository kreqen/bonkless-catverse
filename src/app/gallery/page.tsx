import { PageIntro } from '@/components/page-intro'
import { Gallery } from '@/components/gallery'
export const metadata = {
  title: 'Gallery',
  description: 'Browse and download original Bonkless memes.',
}
export default function GalleryPage() {
  return (
    <section className="shell inner">
      <PageIntro label="THE BONKLESS ARCHIVE" title="GALLERY">
        Original sightings of the orange menace. Open a favorite or download it
        for your group chat.
      </PageIntro>
      <Gallery />
    </section>
  )
}
