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
  default: 'bg-white/5 border-white/10',
  primary: 'bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-cyan-500/10 border-blue-400/30',
  accent: 'bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-teal-500/10 border-emerald-400/30',
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
        muted ? 'border-white/5 bg-white/[0.03]' : toneStyles[tone],
        className
      )}
      {...props}
    />
  )
})

