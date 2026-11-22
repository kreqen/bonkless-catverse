'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { artwork } from '@/lib/art'

function caption(
  ctx: CanvasRenderingContext2D,
  text: string,
  bottom: boolean,
  color: string,
) {
  const clean = text.trim().toUpperCase()
  if (!clean) return
  let fontSize = 46
  let rows: string[]
  do {
    rows = []
    ctx.font = `900 ${fontSize}px Arial, sans-serif`
    let current = ''
    for (const char of clean) {
      if (ctx.measureText(current + char).width > 615) {
        const split = current.lastIndexOf(' ')
        rows.push((split > 0 ? current.slice(0, split) : current).trim())
        current = (split > 0 ? current.slice(split + 1) : '') + char
      } else current += char
    }
    if (current.trim()) rows.push(current.trim())
    if (rows.length * (fontSize + 3) <= 228 || fontSize === 22) break
    fontSize -= 4
  } while (true)
  const lineHeight = fontSize + 3
  const start = bottom ? 634 - (rows.length - 1) * lineHeight : 48
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  ctx.lineWidth = Math.max(4, fontSize / 5)
  ctx.strokeStyle = '#181027'
  ctx.fillStyle = color
  rows.forEach((line, index) => {
    const y = start + index * lineHeight
    ctx.strokeText(line, 340, y)
    ctx.fillText(line, 340, y)
  })
}

export function MemeEditor() {
  const [template, setTemplate] = useState<(typeof artwork)[number]>(artwork[0])
  const [top, setTop] = useState('I HEARD A CAN OPEN')
  const [bottom, setBottom] = useState('')
  const [color, setColor] = useState('#ffffff')
  const [loaded, setLoaded] = useState<{
    path: string
    image: HTMLImageElement
  }>()
  const [error, setError] = useState('')
  const canvas = useRef<HTMLCanvasElement>(null)
  const ready = loaded?.path === template.file

  useEffect(() => {
    const image = new window.Image()
    image.onload = () => {
      setLoaded({ path: template.file, image })
      setError('')
    }
    image.onerror = () =>
      setError('This picture could not load. Choose another template.')
    image.src = template.file
    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [template.file])

  useEffect(() => {
    const context = canvas.current?.getContext('2d')
    if (!context || !loaded || !ready) return
    context.drawImage(loaded.image, 0, 0, 680, 680)
    caption(context, top, false, color)
    caption(context, bottom, true, color)
  }, [loaded, ready, top, bottom, color])

  function download() {
    canvas.current?.toBlob((blob) => {
      if (!blob) {
        setError('PNG export failed. Try again.')
        return
      }
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'bonkless-' + template.id + '.png'
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }, 'image/png')
  }

  return (
    <div className="feature-grid editor-grid">
      <section className="panel panel-body">
        <h2>Make it yours</h2>
        <fieldset>
          <legend>Template</legend>
          <div className="templates">
            {artwork.map((item) => (
              <button
                className="template"
                key={item.id}
                aria-pressed={item.id === template.id}
                onClick={() => setTemplate(item)}
              >
                <Image src={item.file} width={88} height={88} alt="" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          Top text{' '}
          <input
            value={top}
            maxLength={85}
            onChange={(e) => setTop(e.target.value)}
          />
        </label>
        <label>
          Bottom text{' '}
          <input
            value={bottom}
            maxLength={85}
            onChange={(e) => setBottom(e.target.value)}
          />
        </label>
        <label className="color-field">
          Text color{' '}
          <input
            aria-label="Text color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <button className="button lime" disabled={!ready} onClick={download}>
          <Download size={18} /> Download PNG
        </button>
        {error && <p role="alert">{error}</p>}
      </section>
      <section className="panel panel-body preview">
        <h2>Preview</h2>
        <div aria-busy={!ready}>
          <canvas
            ref={canvas}
            width={680}
            height={680}
            aria-label={[template.title, top, bottom]
              .filter(Boolean)
              .join('. ')}
            role="img"
          />
        </div>
      </section>
    </div>
  )
}
