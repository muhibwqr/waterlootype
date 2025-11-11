'use client'

import { type ReactNode } from 'react'
import { ChevronsDown, Rocket, Sparkles, Zap, Keyboard } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

type HeroProps = {
  onSignUpClick: () => void
}

export default function Hero({ onSignUpClick }: HeroProps): JSX.Element {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center gap-10 overflow-hidden rounded-[24px] border border-[hsl(0_0%_25%)] bg-[hsla(0_0%_6%_/_0.85)] p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute top-1/4 -left-32 h-80 w-80 rounded-full bg-[hsla(51_100%_50%_/_0.18)] blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-[hsla(217_94%_70%_/_0.18)] blur-3xl animate-pulse-slow delay-1000" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsla(51,100%,50%,0.12),transparent_70%)]" aria-hidden />

      <div className="relative flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_10%)] px-4 py-2 text-sm text-[hsl(0_0%_88%)] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(51_100%_50%)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(51_100%_50%)]" />
          </span>
          <span>1,247 Warriors typing now</span>
        </div>

        <h1 className="text-title">
          <span className="animate-gradient gradient-text">Type Faster.</span>
          <br />
          <span className="text-[hsl(51_100%_50%)]">Beat Waterloo.</span>
        </h1>

        <p className="text-subtitle max-w-3xl text-[hsl(0_0%_88%)]">
          Real-time typing races, competitive leaderboards, and exclusive badges for{' '}
          <span className="font-semibold text-[hsl(51_100%_50%)]">UWaterloo students only.</span>
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <button onClick={onSignUpClick} className="btn-gold focus-gold px-8 py-4 text-base">
            Start Racing Now
          </button>
          <button
            onClick={onSignUpClick}
            className="focus-gold relative inline-flex items-center justify-center gap-2 rounded-[12px] border-2 border-[hsl(0_0%_25%)] px-8 py-4 text-base font-semibold text-[hsl(0_0%_88%)] transition hover:border-[hsl(51_100%_50%)] hover:text-[hsl(51_100%_50%)]"
          >
            Watch Demo →
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[hsl(0_0%_63%)]">
          <Badge icon={<Zap className="h-4 w-4 text-[hsl(51_100%_50%)]" />} label="~30s onboarding" />
          <Badge icon={<Sparkles className="h-4 w-4 text-[hsl(51_100%_50%)]" />} label="100% free" />
          <Badge icon={<Rocket className="h-4 w-4 text-[hsl(51_100%_50%)]" />} label="UWaterloo verified" />
        </div>
      </div>

      <HeroShowcase />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[hsl(0_0%_63%)]">
        <ChevronsDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  )
}

function Badge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function HeroShowcase() {
  return (
    <GlassCard tone="primary" className="relative w-full max-w-3xl overflow-hidden bg-[hsl(0_0%_10%)] p-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[hsl(0_0%_4%)]">
          <Keyboard className="h-5 w-5 text-[hsl(51_100%_50%)]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Live Test Spotlight</p>
          <p className="text-xs text-[hsl(0_0%_63%)]">UW campus energy in 60 seconds</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[16px] border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_4%)]">
        <div className="relative h-48">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[hsl(0_0%_63%)]">Sample Run</p>
            <p className="text-lg font-semibold text-white">
              “Engineering squad peaked at <span className="gradient-text">143 WPM</span> with 98% accuracy.”
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-[hsl(0_0%_88%)]">
        <Stat label="Peak WPM" value="143" />
        <Stat label="Accuracy" value="98%" />
        <Stat label="Badge" value="Diamond" />
      </div>
    </GlassCard>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_4%)] p-4">
      <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(0_0%_63%)]">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  )
}

