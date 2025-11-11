'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { BarChart3, ShieldCheck, Sparkles, Trophy } from 'lucide-react'

const FEATURE_CALLOUTS = [
  {
    title: 'Supabase security',
    description: 'Magic link auth keeps Waterloo-only battles secure.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-time stats',
    description: 'Track WPM, accuracy, streaks, and personal bests live.',
    icon: BarChart3,
  },
  {
    title: 'Badges & leaderboards',
    description: 'Unlock warrior-to-diamond badges and climb the ranks.',
    icon: Trophy,
  },
  {
    title: 'Share achievements',
    description: 'One-click share cards to challenge classmates.',
    icon: Sparkles,
  },
]

type FeatureCardIcon = (typeof FEATURE_CALLOUTS)[number]['icon']

export default function Features(): JSX.Element {
  return (
    <section id="features" className="flex w-full flex-col items-center gap-8">
      <h2 className="text-title text-[42px]">Built for typists on a mission</h2>
      <p className="text-subtitle max-w-3xl">
        Everything you need to compete, measure, and win—engineered for UW students.
      </p>
      <div className="grid w-full gap-6 md:grid-cols-2">
        {FEATURE_CALLOUTS.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: FeatureCardIcon
}) {
  return (
    <GlassCard
      muted
      className="flex h-full flex-col gap-4 rounded-[18px] border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_8%)] p-6 text-left"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[hsl(0_0%_4%)] text-[hsl(51_100%_50%)]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-[hsl(0_0%_65%)]">{description}</p>
    </GlassCard>
  )
}

