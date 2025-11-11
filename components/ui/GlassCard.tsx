'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type GlassCardTone = 'default' | 'primary' | 'accent'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: GlassCardTone
  muted?: boolean
  interactive?: boolean
}

const toneStyles: Record<GlassCardTone, string> = {
  default: 'bg-[#2d2d2d] border-[#404040]',
  primary: 'bg-gradient-to-br from-[#2d2d2d] via-[#262626] to-[#1f1f1f] border-[#ffb300]/35',
  accent: 'bg-gradient-to-br from-[#ffb300]/18 via-[#ff8f00]/12 to-[#2a2a2a] border-[#ffb300]/30',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { className, tone = 'default', muted = false, interactive = true, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'glass',
        interactive && 'hover-lift',
        muted ? 'border-[#404040] bg-[#262626]' : toneStyles[tone],
        className
      )}
      {...props}
    />
  )
})

