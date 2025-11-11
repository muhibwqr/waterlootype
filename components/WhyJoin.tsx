'use client'

import { BarChart3, Lock, Trophy, Zap } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

const WHY_ITEMS = [
  {
    title: 'Live Typing Sprints',
    description: 'Head-to-head battles tuned for the Waterloo grind.',
    icon: Zap,
  },
  {
    title: 'Badges & Rankings',
    description: 'Unlock Diamond, Gold, and more as you improve.',
    icon: Trophy,
  },
  {
    title: 'Track Performance',
    description: 'Monitor WPM, accuracy, streaks, and improvements.',
    icon: BarChart3,
  },
  {
    title: '100% Free & Secure',
    description: 'Supabase auth plus IAM best practices keep it safe.',
    icon: Lock,
  },
]

export default function WhyJoin(): JSX.Element {
  return (
    <section id="why-join" className="flex w-full flex-col items-center gap-10">
      <GlassCard interactive={false} className="w-full max-w-3xl bg-[hsl(0_0%_10%)] p-12 text-center">
        <h2 className="text-title text-[42px]">Why Join WaterlooType?</h2>
        <p className="mt-4 text-subtitle text-[hsl(0_0%_88%)]">
          Join hundreds of Warriors pushing their WPM, sharing wins, and unlocking badges—without leaving the browser.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {WHY_ITEMS.map((item) => (
            <BenefitCard key={item.title} {...item} />
          ))}
        </div>
      </GlassCard>
    </section>
  )
}

function BenefitCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: typeof Zap
}) {
  return (
    <GlassCard
      muted
      className="flex h-full flex-col gap-4 rounded-[18px] border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_6%)] p-6 text-left"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[hsl(0_0%_4%)] text-[hsl(51_100%_50%)]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-[hsl(0_0%_65%)]">{description}</p>
    </GlassCard>
  )
}

