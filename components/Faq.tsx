'use client'

import { GlassCard } from '@/components/ui/GlassCard'

const FAQ_ITEMS = [
  {
    question: 'Who can join WaterlooType?',
    answer: 'Any University of Waterloo student with a valid @uwaterloo.ca email address.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'Nope. WaterlooType runs in the browser and is optimized for both desktop and mobile.',
  },
  {
    question: 'How do the badges work?',
    answer: 'Crush higher WPM and accuracy thresholds to climb from Warrior to Diamond tiers.',
  },
]

export default function Faq(): JSX.Element {
  return (
    <section id="faq" className="flex w-full flex-col items-center gap-6">
      <h2 className="text-title text-[42px]">FAQ</h2>
      <div className="flex w-full flex-col gap-4">
        {FAQ_ITEMS.map((item) => (
          <GlassCard key={item.question} interactive={false} muted className="px-6 py-5 text-left">
            <h3 className="text-subtitle text-white">{item.question}</h3>
            <p className="text-content mt-2 text-[hsl(0_0%_70%)]">{item.answer}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}

