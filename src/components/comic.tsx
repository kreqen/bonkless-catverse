'use client'
import { useState } from 'react'
import Image from 'next/image'
import { artwork } from '@/lib/art'

const chapters = [
  {
    title: 'The noise from space',
    dialogue: 'Psssst.',
    copy: 'A crack echoed across the Catverse. Bonkless mistook the birth of a galaxy for someone opening lunch.',
  },
  {
    title: 'A brief intermission',
    dialogue: 'I’ll investigate after one nap.',
    copy: 'Three moons rose. Three moons set. The investigation did not advance.',
  },
  {
    title: 'The big discovery',
    dialogue: 'Where do I put the fish?',
    copy: 'The terminal said CONNECT. Bonkless pressed his forehead against the screen. Connection established.',
  },
]
export function Comic() {
  const [chapter, setChapter] = useState(0)
  const entry = chapters[chapter]
  return (
    <section className="panel comic">
      <div className="comic-art">
        <Image
          src={artwork[chapter].file}
          width={680}
          height={680}
          alt={artwork[chapter].title}
        />
        <span className="speech">{entry.dialogue}</span>
      </div>
      <div className="panel-body comic-copy">
        <p className="eyebrow">
          PANEL {chapter + 1} OF {chapters.length}
        </p>
        <div aria-live="polite">
          <h2>{entry.title}</h2>
          <p>{entry.copy}</p>
        </div>
        <div className="actions">
          <button
            className="button ghost"
            disabled={chapter === 0}
            onClick={() => setChapter(chapter - 1)}
          >
            Previous panel
          </button>
          <button
            className="button lime"
            disabled={chapter === chapters.length - 1}
            onClick={() => setChapter(chapter + 1)}
          >
            Next panel
          </button>
        </div>
      </div>
    </section>
  )
}
