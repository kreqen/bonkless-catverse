'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { routes } from '@/lib/config'
export function Navigation() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="main-navigation"
        aria-label="Main"
        className={'main-nav' + (open ? ' is-open' : '')}
      >
        {routes.map(([href, title]) => (
          <Link
            key={href}
            href={href}
            aria-current={path === href ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  )
}
