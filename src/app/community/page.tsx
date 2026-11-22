import Image from 'next/image'
import Link from 'next/link'
import { Download, MessageCircle, Send } from 'lucide-react'
import { PageIntro } from '@/components/page-intro'
import { config } from '@/lib/config'
export const metadata = {
  title: 'Community',
  description:
    'Find official Bonkless channels, download social art and get answers about the Catverse.',
}
export default function Community() {
  return (
    <section className="shell inner">
      <PageIntro label="BRING YOUR OWN TUNA" title="JOIN THE CHAOS">
        Send a meme to a friend or find Bonkless on his official channels.
      </PageIntro>
      <div className="feature-grid community-grid">
        <section className="panel panel-body">
          <h2>Official channels</h2>
          <div className="actions">
            {config.x && (
              <a className="button ghost" href={config.x.href}>
                <MessageCircle size={18} /> X
              </a>
            )}
            {config.telegram && (
              <a className="button ghost" href={config.telegram.href}>
                <Send size={18} /> Telegram
              </a>
            )}
          </div>
          {(!config.x || !config.telegram) && (
            <p>
              {!config.x && !config.telegram
                ? 'Official X and Telegram links haven’t been published here yet.'
                : 'The official ' +
                  (config.x ? 'Telegram' : 'X') +
                  ' link hasn’t been published here yet.'}
            </p>
          )}
        </section>
        <section className="panel panel-body">
          <h2>Social assets</h2>
          <Image
            className="sticker-sheet"
            src="/art/stickers.png"
            alt="Three Bonkless stickers featuring the orange tabby, a tuna can and a retro computer"
            width={1200}
            height={400}
            sizes="(max-width: 700px) 90vw, 40vw"
          />
          <div className="actions">
            <a className="button lime" href="/art/social.png" download>
              <Download size={18} /> Social banner
            </a>
            <a className="button ghost" href="/art/avatar.png" download>
              <Download size={18} /> Cat avatar
            </a>
            <a className="button ghost" href="/art/stickers.png" download>
              <Download size={18} /> Sticker sheet
            </a>
          </div>
        </section>
      </div>
      <section className="faq">
        <h2>FAQ</h2>
        <details>
          <summary>Do I need a wallet to play?</summary>
          <p>
            Anyone can <Link href="/catverse">visit the Catverse</Link> and play
            for free. Progress stays in your browser.
          </p>
        </details>
        <details>
          <summary>Can I download my meme?</summary>
          <p>
            Yes. The <Link href="/meme-lab">Meme Lab</Link> exports your picture
            and captions together as a PNG.
          </p>
        </details>
        <details>
          <summary>Where is the contract address?</summary>
          <p>
            Check the <Link href="/token">Token page</Link> for the latest
            details published by the project.
          </p>
        </details>
      </section>
    </section>
  )
}
