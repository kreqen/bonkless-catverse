import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
import { CopyMint } from '@/components/copy-mint'
import { config } from '@/lib/config'
export const metadata = {
  title: 'Token',
  description:
    'Read the published information about the BONKLESS Solana meme brand and $BNKLS.',
}
export default function Token() {
  return (
    <section className="shell inner">
      <PageIntro label="SOLANA · $BNKLS" title="TOKEN INFO">
        Bonkless knows more about tuna than tokens. Here’s what this site can
        share about $BNKLS.
      </PageIntro>
      <section className="panel panel-body info-panel">
        <h2>Solana mint address</h2>
        {config.mint ? (
          <>
            <p>
              <code>{config.mint}</code>
            </p>
            <div className="actions">
              <a
                className="button lime"
                href={'https://explorer.solana.com/address/' + config.mint}
              >
                View on Solana Explorer
              </a>
              <CopyMint mint={config.mint} />
            </div>
          </>
        ) : (
          <p>There is no verified mint address published on this site.</p>
        )}
        <h2>Token details</h2>
        <p>
          This site has no verified figures for supply or holders and no
          verified audit or launch status to report.
        </p>
        <Link href="/catverse" className="button ghost">
          Visit the free Catverse
        </Link>
      </section>
    </section>
  )
}
