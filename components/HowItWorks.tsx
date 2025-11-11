'use client'

import { Mail, Rocket, Zap } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

const HOW_ITEMS = [
  {
    id: '01',
    title: 'Verify in seconds',
    description: 'Use your @uwaterloo.ca email. We keep it Warrior-only.',
    icon: Mail,
    footer: 'Takes 5 seconds',
  },
  {
    id: '02',
    title: 'Sprint together',
    description: 'Jump into real-time typing battles with live stats.',
    icon: Zap,
    footer: 'Arrives instantly',
  },
  {
    id: '03',
    title: 'Climb the board',
    description: 'Earn badges, bragging rights, and faculty dominance.',
    icon: Rocket,
    footer: 'Instant bragging rights',
  },
]

export default function HowItWorks(): JSX.Element {
  return (
    <section id="how-it-works" className="flex w-full flex-col items-center gap-8">
      <h2 className="text-title text-[42px]">How it works</h2>
      <p className="text-subtitle max-w-3xl">
        Sign up, sprint, and climb the leaderboard—all in under a minute.
      </p>
      <div className="grid w-full gap-6 md:grid-cols-3">
        {HOW_ITEMS.map((item) => (
          <GlassCard
            key={item.id}
            muted
            className="relative flex flex-col items-center gap-4 bg-[hsl(0_0%_10%)] p-8 text-center transition hover:border-[hsla(51_100%_50%_/_0.5)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-[hsl(51_100%_50%)] to-[hsl(45_100%_35%)] text-xl font-bold text-[hsl(0_0%_4%)] shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
              {item.id}
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[hsl(0_0%_4%)] text-[hsl(51_100%_50%)]">
              <item.icon className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-[hsl(0_0%_63%)]">{item.description}</p>
            <div className="mt-4 w-full border-t border-[hsl(0_0%_18%)] pt-4 text-xs uppercase tracking-[0.4em] text-[hsl(0_0%_47%)]">
              {item.footer}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}

