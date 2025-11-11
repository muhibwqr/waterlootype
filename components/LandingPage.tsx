'use client'

import { useState, type ReactNode } from 'react'
import {
  Activity,
  ArrowRight,
  GraduationCap,
  Keyboard,
  Medal,
  Rocket,
  Share2,
  Shield,
  Sparkles,
  Trophy,
} from 'lucide-react'
import Auth from './Auth'
import { GlassCard } from '@/components/ui/GlassCard'

const FEATURES = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Supabase-Powered Security',
    description: 'Verify instantly with @uwaterloo.ca emails—no spambots, just Warriors.',
    tone: 'primary' as const,
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: 'Real-Time Typing Stats',
    description: 'Track live WPM, accuracy, and streak stats as you sprint through prompts.',
    tone: 'default' as const,
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: 'Leaderboard Glory',
    description: 'Climb ranks and unlock Diamond, Gold, and Bronze badges worth bragging about.',
    tone: 'default' as const,
  },
  {
    icon: <Share2 className="h-5 w-5" />,
    title: 'Shareable Wins',
    description: 'Post your best runs, challenge classmates, and spark a typing rivalry.',
    tone: 'accent' as const,
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Sign Up',
    description:
      'Create an account with your @uwaterloo.ca email. Add your program and faculty in seconds.',
  },
  {
    number: '02',
    title: 'Type & Track',
    description:
      'Fly through Waterloo-themed texts and get instant WPM, accuracy, and tier updates.',
  },
  {
    number: '03',
    title: 'Claim Your Spot',
    description:
      'Submit your score and watch the leaderboard react live. Flex your faculty dominance.',
  },
]

const TIERS = [
  { icon: <Shield className="h-5 w-5" />, title: 'Warrior', caption: 'Every typist starts here.' },
  { icon: <Medal className="h-5 w-5" />, title: 'Bronze', caption: '85+ WPM with solid accuracy.' },
  { icon: <Trophy className="h-5 w-5" />, title: 'Gold', caption: '110+ WPM and near-perfect focus.' },
  { icon: <Sparkles className="h-5 w-5" />, title: 'Diamond', caption: '140+ WPM, untouchable reflexes.' },
]

export default function LandingPage(): JSX.Element {
  const [showAuth, setShowAuth] = useState<boolean>(false)

  if (showAuth) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-black/60 backdrop-blur">
        <div className="section-shell flex max-w-5xl items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 shadow-lg shadow-blue-500/40">
              <Keyboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
                WaterlooType
              </p>
              <p className="text-sm text-slate-400">The typing test for UWaterloo Warriors</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className="hidden rounded-full border border-slate-700/60 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500/60 hover:text-white sm:block"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:scale-[1.03]"
            >
              <Rocket className="h-4 w-4" />
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="section-shell flex max-w-5xl flex-col items-center gap-20 pb-20 pt-14 text-center">
        <section className="flex w-full flex-col items-center gap-12">
          <div className="flex flex-col items-center">
            <div className="section-badge">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              Built for Warriors
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Fastest Fingers at Waterloo? Prove it on <span className="gradient-text">WaterlooType</span>!
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              Compete with fellow UW students in real-time typing tests, track your WPM and accuracy, and climb
              the leaderboard. Only @uwaterloo.ca emails can join.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-blue-500/40 transition hover:scale-[1.03]"
              >
                <Rocket className="h-5 w-5" />
                Sign Up with Waterloo Email
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-700/60 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-blue-500/60 hover:text-white"
              >
                Explore the experience
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-blue-200">
                <Shield className="h-4 w-4" />
                @uwaterloo.ca required
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-blue-200">
                <Sparkles className="h-4 w-4" />
                Free forever
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-blue-200">
                <Rocket className="h-4 w-4" />
                Built by Warriors
              </span>
            </div>
          </div>
          <HeroShowcase />
        </section>

        <section className="grid w-full max-w-4xl gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </section>

        <section className="grid w-full max-w-4xl gap-8 lg:grid-cols-2">
          <GlassCard muted className="p-8 text-center shadow-2xl shadow-blue-500/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300/70">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Launch in three quick steps</h2>
            <p className="mt-3 max-w-xl text-base text-slate-300">
              Log in with your UWaterloo email, crush a typing test, and share your spot with teammates.
              We’ll handle the stats, you bring the speed.
            </p>
            <div className="mt-10 space-y-6">
              {STEPS.map((step) => (
                <StepCard key={step.number} {...step} />
              ))}
            </div>
          </GlassCard>
          <GlassCard tone="primary" className="p-8 text-center shadow-2xl shadow-blue-500/15">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200/80">Tiers</p>
            <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Earn your badge</h3>
            <p className="mt-3 text-base text-slate-300">
              Every score unlocks a new tier. Keep improving to climb from Warrior to Diamond and make your
              faculty proud.
            </p>
            <div className="mt-8 space-y-4">
              {TIERS.map((tier) => (
                <TierCard key={tier.title} {...tier} />
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="w-full rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-indigo-600/20 p-12 text-center shadow-2xl shadow-blue-600/20">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to out-type every co-op hopeful on campus?
            </h3>
            <p className="mt-3 text-lg text-slate-200">
              Join the typing sprint Waterloo students talk about on the walk between E7 and DC. It’s fast,
              free, and fuelled by competition.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setShowAuth(true)}
                className="flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-blue-500/20 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-blue-500/30"
              >
                <Rocket className="h-5 w-5" />
                Start Typing Now
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="flex min-w-[220px] items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-blue-400/60 hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
                See Leaderboard
              </button>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-300/70">
              Only @uwaterloo.ca emails accepted • Free forever
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/60 bg-black/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} WaterlooType • Built by Waterloo Warriors</span>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-700" aria-hidden />
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HeroShowcase() {
  return (
    <div className="relative w-full max-w-3xl">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-600/25 via-blue-500/15 to-indigo-600/25 blur-3xl" />
      <GlassCard tone="primary" className="relative overflow-hidden p-6 text-sm text-slate-200 shadow-2xl shadow-blue-600/20">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900">
            <Keyboard className="h-5 w-5 text-blue-300" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">Live Test Spotlight</p>
            <p className="text-xs text-slate-400">UW campus energy</p>
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            Glass UI preview
          </span>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40 text-center">
          <div className="relative h-48">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Sample Run</p>
              <p className="text-lg font-semibold text-white">
                “Engineering squad sprinted to <span className="gradient-text">143 WPM</span> in 60 seconds.”
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
          <Stat label="Peak WPM" value="143" />
          <Stat label="Accuracy" value="98%" />
          <Stat label="Rank" value="Diamond" />
        </div>
      </GlassCard>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  tone,
}: {
  icon: ReactNode
  title: string
  description: string
  tone: 'default' | 'primary' | 'accent'
}) {
  return (
    <GlassCard tone={tone} className="group relative overflow-hidden p-7 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-blue-200">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
    </GlassCard>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <GlassCard muted className="flex flex-col items-center gap-5 p-5 text-center">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/40 via-blue-500/25 to-transparent text-sm font-semibold text-blue-100">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="mt-2 text-sm text-slate-300">{description}</p>
      </div>
    </GlassCard>
  )
}

function TierCard({
  icon,
  title,
  caption,
}: {
  icon: ReactNode
  title: string
  caption: string
}) {
  return (
    <GlassCard muted className="flex items-center gap-4 p-4 text-center sm:flex-col">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/70 text-blue-200">
        {icon}
      </div>
      <div>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="text-sm text-slate-300">{caption}</p>
      </div>
    </GlassCard>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-semibold text-white">{value}</div>
    </div>
  )
}

