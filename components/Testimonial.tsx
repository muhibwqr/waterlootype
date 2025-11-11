'use client'

import { Sparkles, Star } from 'lucide-react'

export default function Testimonial(): JSX.Element {
  return (
    <section
      id="testimonial"
      className="flex w-full flex-col items-center gap-8 rounded-[24px] border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_6%)] p-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <Sparkles className="h-8 w-8 text-[hsl(51_100%_50%)]" />
      <p className="text-subtitle max-w-3xl italic text-[hsl(0_0%_88%)]">
        “WaterlooType turned late-night study sessions into competitive typing sprints. We keep the leaderboard open in E7
        just to see who can steal Diamond next.”
      </p>
      <div className="flex items-center gap-2 text-sm text-[hsl(0_0%_63%)]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} className="h-5 w-5 fill-[hsl(51_100%_50%)] text-[hsl(51_100%_50%)]" />
        ))}
      </div>
      <p className="text-content text-sm text-[hsl(0_0%_65%)]">— Anonymous Diamond Tier Grinder, E7</p>
    </section>
  )
}

