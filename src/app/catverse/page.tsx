import { PageIntro } from '@/components/page-intro'
import { Room } from '@/components/room'
export const metadata = {
  title: 'Catverse',
  description: 'Feed, pet and nap with Bonkless in his interactive room.',
}
export default function Catverse() {
  return (
    <section className="shell inner">
      <PageIntro label="THE CAT ROOM" title="THE CATVERSE">
        Bonkless has cleared his schedule for tuna, scritches and naps.
      </PageIntro>
      <Room />
    </section>
  )
}
