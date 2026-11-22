'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useSyncExternalStore, useState } from 'react'
import {
  Box,
  Fish,
  Heart,
  Image as ImageIcon,
  Moon,
  Sparkles,
} from 'lucide-react'
const illustrations = {
  idle: {
    src: '/art/hero.webp',
    alt: 'Glossy orange tabby beside a floating tuna can and a vintage computer under violet stars',
  },
  feed: { src: '/art/tuna-signal.png', alt: 'Bonkless holds an open tuna can' },
  nap: {
    src: '/art/nap-mode.png',
    alt: 'Bonkless sleeps on a lilac crescent moon',
  },
} as const
const Scene = dynamic(() => import('./cat-scene'), { ssr: false })
const motionQuery = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (notify: () => void) => {
  const media = matchMedia(motionQuery)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
const motionSnapshot = () => matchMedia(motionQuery).matches
const roomArt = {
  src: '/art/lunar-lounge.webp',
  alt: 'Bonkless lounges by the porthole in a violet space apartment',
}
const effects = { feed: Fish, pet: Heart, nap: Moon }
const mood = {
  idle: 'On standby for tuna',
  feed: 'Snack time',
  pet: 'Purring',
  nap: 'Dozing',
}

export function Portal({
  pose = 'idle',
  room = false,
  interaction = 0,
}: {
  pose?: 'idle' | 'feed' | 'pet' | 'nap'
  room?: boolean
  interaction?: number
}) {
  const still = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    () => true,
  )
  const [choice, setChoice] = useState(false)
  const active = choice
  const illustration = room
    ? !active && (pose === 'feed' || pose === 'nap')
      ? illustrations[pose]
      : roomArt
    : illustrations.idle
  const Effect = pose === 'idle' ? undefined : effects[pose]
  return (
    <div
      className={
        'portal' + (room ? ' room-portal' : '') + (active ? ' live-portal' : '')
      }
    >
      <Image
        key={illustration.src}
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
      <div className="stage-atmosphere" aria-hidden="true" />
      {active && <Scene pose={pose} room={room} still={still} />}
      {room && (
        <div className="stage-label">
          <Sparkles size={16} /> {mood[pose]}
        </div>
      )}
      {room && Effect && !still && (
        <div
          className={'reaction-effects ' + pose}
          key={interaction}
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Effect key={i} size={28} />
          ))}
        </div>
      )}
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
