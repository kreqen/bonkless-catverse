'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Download, X } from 'lucide-react'
import { artwork } from '@/lib/art'

export function Gallery() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<(typeof artwork)[number]>(artwork[0])
  const dialog = useRef<HTMLDialogElement>(null)
  return (
    <>
      <div className="filter-row" aria-label="Filter artwork">
        {['All', ...artwork.map((item) => item.category)].map((category) => (
          <button
            className="chip"
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {artwork
          .filter((item) => filter === 'All' || item.category === filter)
          .map((item) => (
            <article className="panel gallery-card" key={item.id}>
              <button
                className="art-button"
                aria-label={'Open ' + item.title}
                onClick={() => {
                  setSelected(item)
                  dialog.current?.showModal()
                }}
              >
                <Image
                  width={680}
                  height={680}
                  src={item.file}
                  alt={item.title}
                />
              </button>
              <div className="panel-body">
                <span className="eyebrow">{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
                <a
                  download
                  href={'/art/' + item.id + '-meme.png'}
                  className="button ghost"
                >
                  <Download size={18} /> Download meme
                </a>
              </div>
            </article>
          ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="lightbox-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
      >
        <div className="lightbox-inner">
          <button
            className="close-button"
            aria-label="Close lightbox"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
          <Image
            width={680}
            height={680}
            src={'/art/' + selected.id + '-meme.png'}
            alt={selected.title + '. ' + selected.copy}
          />
          <h2 id="lightbox-title">{selected.title}</h2>
        </div>
      </dialog>
    </>
  )
}
