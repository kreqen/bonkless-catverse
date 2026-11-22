import type { Metadata } from 'next'
import Link from 'next/link'
import { Cat, PawPrint } from 'lucide-react'
import { config, routes } from '@/lib/config'
import { Navigation } from '@/components/navigation'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: config.site,
  title: {
    default: 'BONKLESS CATVERSE — No Plan. Just Cat.',
    template: '%s | BONKLESS CATVERSE',
  },
  description:
    'Meet an orange cat with a soft spot for tuna, naps and memes. Play in the Catverse and make your own memes.',
  openGraph: {
    title: 'BONKLESS CATVERSE',
    description: 'No plan. Just cat.',
    type: 'website',
    ...(config.site ? { url: config.site, images: ['/art/social.png'] } : {}),
  },
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="shell nav-wrap">
            <Link className="brand" href="/" aria-label="Bonkless home">
              <span className="brand-icon">
                <Cat size={22} strokeWidth={2.6} />
              </span>
              BONKLESS<span className="brand-period">.</span>
            </Link>
            <Navigation />
            <Link className="header-cta" href="/community">
              JOIN THE CHAOS <PawPrint size={15} />
            </Link>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="shell footer-wrap">
            <Link className="brand" href="/">
              <Cat size={23} /> BONKLESS<span className="brand-period">.</span>
            </Link>
            <p>No plan. Just cat.</p>
            <nav aria-label="Footer">
              {routes.map(([href, title]) => (
                <Link href={href} key={href}>
                  {title}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  )
}
