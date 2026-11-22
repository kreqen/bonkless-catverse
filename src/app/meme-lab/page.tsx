import { PageIntro } from '@/components/page-intro'
import { MemeEditor } from '@/components/meme-editor'
export const metadata = {
  title: 'Meme Lab',
  description: 'Make a Bonkless meme and download it as a PNG.',
}
export default function MemeLab() {
  return (
    <section className="shell inner">
      <PageIntro label="THE CAPTION FACTORY" title="MEME LAB">
        Start with a Bonkless template, add your captions, and save the chaos as
        a PNG.
      </PageIntro>
      <MemeEditor />
    </section>
  )
}
