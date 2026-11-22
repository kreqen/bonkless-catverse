import { PageIntro } from '@/components/page-intro'
import { Comic } from '@/components/comic'
export const metadata = {
  title: 'Lore',
  description:
    'Read the illustrated story of Bonkless and his fictional roadmap.',
}
export default function Lore() {
  return (
    <section className="shell inner">
      <PageIntro label="AN ORANGE ORIGIN STORY" title="THE LORE">
        The Catverse began with a noise that sounded suspiciously like a can
        opener.
      </PageIntro>
      <Comic />
      <div className="roadmap">
        <h2>The completely fictional roadmap</h2>
        <ol>
          <li>
            <strong>Find the tuna</strong>
            <p>Follow the signal. Check all cupboards twice.</p>
          </li>
          <li>
            <strong>Negotiate with the pillow</strong>
            <p>Secure exclusive napping rights until dinner.</p>
          </li>
          <li>
            <strong>Touch keyboard</strong>
            <p>Send an unsolicited string of Zs to the entire galaxy.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}
