'use client'

import { Keyboard } from 'lucide-react'
import { useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
]

type NavigationProps = {
  onSignUpClick: () => void
}

export default function Navigation({ onSignUpClick }: NavigationProps): JSX.Element {
  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(0_0%_25%)] bg-[hsla(0_0%_4%_/_0.85)] backdrop-blur-xl">
      <nav className="section-shell flex h-16 max-w-6xl items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 focus-gold">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(0_0%_10%)] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
            <Keyboard className="h-5 w-5 text-[hsl(51_100%_50%)]" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-[hsl(51_100%_50%)] to-white bg-clip-text text-transparent">
            WaterlooType
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-[hsl(0_0%_88%)] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[hsl(51_100%_50%)] focus-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onSignUpClick}
            className="rounded-full border border-[hsl(51_100%_50%)] px-5 py-2 text-sm font-semibold text-[hsl(51_100%_50%)] transition-all duration-200 hover:bg-[hsl(51_100%_50%)] hover:text-[hsl(0_0%_4%)] hover:shadow-[0_8px_24px_rgba(255,215,0,0.35)] focus-gold"
          >
            Sign In
          </button>
          <button onClick={onSignUpClick} className="btn-gold focus-gold px-6 py-2 text-sm">
            Get Started
          </button>
        </div>

        <button
          onClick={onSignUpClick}
          className="btn-gold focus-gold px-4 py-2 text-xs md:hidden"
        >
          Join now
        </button>
      </nav>
    </header>
  )
}

