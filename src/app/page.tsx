import Image from 'next/image'
import Link from 'next/link'
import { Cat, Fish, Gamepad2, Images, PawPrint, Sparkles } from 'lucide-react'
import { Portal } from '@/components/portal'

const destinations = [
  {
    href: '/catverse',
    label: 'Catverse',
    text: 'Feed, pet and play with Bonkless in his space lounge.',
    art: '/art/lunar-lounge.webp',
    icon: Gamepad2,
  },
  {
    href: '/meme-lab',
    label: 'Meme Lab',
    text: 'Caption the chaos and export your own PNG.',
    art: '/art/terminal.png',
    icon: Sparkles,
  },
  {
    href: '/lore',
    label: 'The Lore',
    text: 'Find out how a tuna signal started it all.',
    art: '/art/tuna-signal.png',
    icon: Fish,
  },
  {
    href: '/gallery',
    label: 'Gallery',
    text: 'Collect original memes and share your favorites.',
    art: '/art/nap-mode.png',
    icon: Images,
  },
] as const

export default function Home() {
  return (
    <div className="brand-home">
      <section className="shell launch-cover">
        <div className="launch-copy">
          <span className="eyebrow">
            <Cat size={19} /> A SOLANA MEME CAT
          </span>
          <h1>
            NO PLAN. <em>JUST CAT.</em>
          </h1>
          <p>
            Bonkless wandered into crypto looking for a can of tuna. Now he has
            his own corner of the internet.
          </p>
          <div className="actions">
            <Link className="button lime" href="/catverse">
              <PawPrint size={19} /> Enter the Catverse
            </Link>
            <Link className="button ghost" href="#explore">
              Explore the project
            </Link>
          </div>
        </div>
        <div className="launch-scene">
          <Portal />
        </div>
      </section>

      <section className="launch-strip">
        <div className="shell launch-strip-inner">
          <Link href="/catverse">
            <Fish size={24} /> Play with Bonkless
          </Link>
          <Link href="/meme-lab">
            <Sparkles size={24} /> Make a meme
          </Link>
          <Link href="/community">
            <PawPrint size={24} /> Meet the community
          </Link>
        </div>
      </section>

      <section className="shell launch-ecosystem" id="explore">
        <div className="launch-heading">
          <h2>
            Explore the
            <br />
            Catverse.
          </h2>
          <p>Play, make something ridiculous, or see how Bonkless got here.</p>
        </div>
        <div className="launch-grid">
          {destinations.map(({ href, label, text, art, icon: Icon }) => (
            <Link className="launch-card" href={href} key={href}>
              <div className="launch-card-art">
                <Image
                  src={art}
                  alt=""
                  fill
                  sizes="(max-width: 740px) 100vw, (max-width: 1000px) 50vw, 25vw"
                />
              </div>
              <div className="launch-card-body">
                <h3>
                  <Icon size={22} />
                  {label}
                </h3>
                <p>{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell launch-community">
        <Image
          src="/art/stickers.png"
          alt="Bonkless, a tuna can and a CRT sticker"
          width={1200}
          height={400}
          sizes="(max-width: 740px) 100vw, 45vw"
        />
        <div>
          <h2>Bring your own tuna.</h2>
          <p>
            Grab the sticker pack, find community links, or get the facts about
            $BNKLS.
          </p>
          <div className="actions">
            <Link className="button lime" href="/community">
              Community &amp; stickers
            </Link>
            <Link className="button ghost" href="/token">
              Token info
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
