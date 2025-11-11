'use client'

import { type ReactNode } from 'react'
import { Keyboard } from 'lucide-react'

export default function Footer(): JSX.Element {
  return (
    <footer className="border-t border-[hsl(0_0%_18%)] bg-[hsl(0_0%_4%)] py-10">
      <div className="section-shell grid max-w-6xl gap-8 text-sm text-[hsl(0_0%_65%)] md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[hsl(0_0%_8%)]">
              <Keyboard className="h-4 w-4 text-[hsl(51_100%_50%)]" />
            </div>
            <span className="font-semibold text-white">WaterlooType</span>
          </div>
          <p className="text-xs text-[hsl(0_0%_50%)]">Made with ⌨️ for Waterloo Warriors</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white">Links</span>
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#how-it-works">How It Works</FooterLink>
          <FooterLink href="#faq">FAQ</FooterLink>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white">Legal</span>
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="mailto:team@waterlootype.ca">Contact</FooterLink>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="transition hover:text-white focus-gold">
      {children}
    </a>
  )
}

