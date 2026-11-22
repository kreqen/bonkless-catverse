import Link from 'next/link'
import {
  Cat,
  Clapperboard,
  Fish,
  Images,
  BookOpen,
  PawPrint,
  Sparkles,
  Orbit,
  Gamepad2,
} from 'lucide-react'
import { Portal } from '@/components/portal'

const destinations = [
  {
    href: '/catverse',
    label: 'CATVERSE',
    text: 'Feed him tuna. Give him scritches. Respect the nap.',
    icon: Gamepad2,
    color: 'green',
  },
  {
    href: '/meme-lab',
    label: 'MEME LAB',
    text: 'Make questionable art with an excellent cat.',
    icon: Clapperboard,
    color: 'pink',
  },
  {
    href: '/lore',
    label: 'THE LORE',
    text: 'One orange cat. Zero idea how he got here.',
    icon: BookOpen,
    color: 'orange',
  },
  {
    href: '/gallery',
    label: 'GALLERY',
    text: 'Take home a little piece of the chaos.',
    icon: Images,
    color: 'blue',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-art">
          <Portal />
        </div>
        <div className="shell hero-wrap">
          <div className="hero-copy">
            <span className="eyebrow hero-badge">
              <span /> THE SOLANA MEME CAT
            </span>
            <h1>
              NO PLAN.
              <br />
              <em>JUST CAT.</em>
            </h1>
            <p>
              Meet Bonkless. One orange cat, zero crypto knowledge, and an
              unreasonable amount of tuna.
            </p>
            <div className="actions">
              <Link className="button lime" href="/catverse">
                <PawPrint size={19} /> Enter the Catverse
              </Link>
              <Link className="button ghost" href="/meme-lab">
                <Sparkles size={18} /> Make a Meme
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="ticker">
        <div className="ticker-content" aria-label="Tuna, naps and memes">
          <span>
            <Fish /> TUNA FIRST
          </span>
          <span>
            <Sparkles /> NO PLAN. JUST CAT.
          </span>
          <span>
            <Orbit /> THE CATVERSE
          </span>
          <span>
            <Cat /> NAP SEASON
          </span>
          <span>
            <PawPrint /> $BNKLS
          </span>
        </div>
      </div>
      <section className="shell destinations">
        <div className="section-heading">
          <span className="eyebrow">
            <Sparkles size={15} /> PICK YOUR PORTAL
          </span>
          <h2>THE CATVERSE</h2>
        </div>
        <div className="destination-grid">
          {destinations.map(({ href, label, text, icon: Icon, color }) => (
            <Link className={'destination ' + color} href={href} key={href}>
              <span className="destination-icon">
                <Icon size={25} />
              </span>
              <h3>{label}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
