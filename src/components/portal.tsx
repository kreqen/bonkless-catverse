'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useSyncExternalStore, useState } from 'react'
import { Box, Image as ImageIcon } from 'lucide-react'
const illustrations = {
  idle: {
    src: '/art/hero.webp',
    alt: 'Glossy orange tabby beside a floating tuna can and a vintage computer under violet stars',
  },
  feed: { src: '/art/tuna-signal.png', alt: 'Bonkless holds an open tuna can' },
  pet: { src: '/art/hero.webp', alt: 'Bonkless smiles beneath a violet sky' },
  nap: {
    src: '/art/nap-mode.png',
    alt: 'Bonkless sleeps on a lilac crescent moon',
  },
} as const
const Scene = dynamic(() => import('./cat-scene'), { ssr: false })
const query = '(prefers-reduced-motion: reduce), (max-width: 700px)'
const motionQuery = '(prefers-reduced-motion: reduce)'
const listen = (query: string) => (notify: () => void) => {
  const media = matchMedia(query)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
const subscribe = listen(query)
const subscribeMotion = listen(motionQuery)
const snapshot = () => matchMedia(query).matches
const motionSnapshot = () => matchMedia(motionQuery).matches

export function Portal({
  pose = 'idle',
  room = false,
}: {
  pose?: 'idle' | 'feed' | 'pet' | 'nap'
  room?: boolean
}) {
  const fallback = useSyncExternalStore(subscribe, snapshot, () => true)
  const still = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    () => true,
  )
  const [choice, setChoice] = useState<boolean | null>(null)
  const active = choice ?? (room && !fallback)
  const illustration = illustrations[room && !active ? pose : 'idle']
  return (
    <div
      className={
        'portal' + (room ? ' room-portal' : '') + (active ? ' live-portal' : '')
      }
    >
      <Image
        src={illustration.src}
        alt={illustration.alt}
        fill
        sizes={
          room
            ? '(max-width: 800px) 100vw, 55vw'
            : '(max-width: 800px) 100vw, 64vw'
        }
        priority={!room}
        className="portal-art"
      />
      {active && <Scene pose={pose} room={room} still={still} />}
      <button
        type="button"
        className="scene-toggle"
        aria-pressed={active}
        onClick={() => setChoice(!active)}
      >
        {active ? <ImageIcon size={16} /> : <Box size={16} />}{' '}
        {active ? 'Illustrated view' : 'Explore in 3D'}
      </button>
    </div>
  )
}
